import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const { NextRequest } = require('next/server');
const source = ts.transpileModule(readFileSync(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const good = () => ({ name: 'Test Visitor', email: 'visitor@example.com', subject: 'Portfolio enquiry', message: 'A valid test message for the contact form.', website: '', startedAt: Date.now() - 5000 });
function handler(env = {}, fetchImpl = async () => { throw new Error('Unexpected email request'); }) {
  const module = { exports: {} };
  vm.runInNewContext(source, { exports: module.exports, require, process: { env }, Buffer, AbortSignal, URL, fetch: fetchImpl });
  return module.exports.POST;
}
function request(data = good(), headers = {}) {
  return new NextRequest('http://localhost:3000/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'http://localhost:3000', ...headers }, body: typeof data === 'string' ? data : JSON.stringify(data) });
}
test('missing configuration returns an honest setup error', async () => {
  const response = await handler()(request()); assert.equal(response.status, 503); assert.match((await response.json()).error, /RESEND_API_KEY/);
});
test('rejects malformed, oversized and cross-origin requests', async () => {
  assert.equal((await handler()(request('{'))).status, 400);
  assert.equal((await handler()(request('x'.repeat(17000)))).status, 413);
  assert.equal((await handler()(request(good(), { origin: 'https://untrusted.example' }))).status, 403);
  assert.equal((await handler()(request(good(), { 'content-type': 'text/plain' }))).status, 415);
});
test('rejects invalid fields and spam before contacting Resend', async () => {
  for (const value of [{ email: 'bad@address' }, { subject: 'x\r\nBcc: attack@example.com' }, { name: '' }, { message: 'short' }, { website: 'spam.example' }, { startedAt: Date.now() }, { startedAt: Date.now() + 5000 }, { name: { nested: true } }]) {
    assert.equal((await handler()(request({ ...good(), ...value }))).status, 400);
  }
});
test('limits repeated attempts', async () => {
  const post = handler(); for (let i = 0; i < 5; i++) await post(request());
  const response = await post(request()); assert.equal(response.status, 429); assert.ok(Number(response.headers.get('retry-after')) > 0);
});
test('sends validated plain text to the fixed recipient with a reply-to address', async () => {
  let sent;
  const post = handler({ RESEND_API_KEY: 'test-only-key', RESEND_FROM_EMAIL: 'Portfolio <hello@example.com>' }, async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails'); sent = JSON.parse(options.body);
    return Response.json({ id: 'mock-delivery-id' });
  });
  const response = await post(request({ ...good(), message: '<script>not executable</script>' }));
  assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
  assert.deepEqual(sent.to, ['bhavyachauhan3112@gmail.com']); assert.equal(sent.reply_to, 'visitor@example.com'); assert.equal(sent.html, undefined); assert.match(sent.text, /<script>/);
});
test('never claims success for provider errors, malformed responses or network failures', async () => {
  for (const send of [async () => Response.json({ message: 'secret provider detail' }, { status: 401 }), async () => Response.json({}), async () => { throw new Error('secret provider detail'); }]) {
    const response = await handler({ RESEND_API_KEY: 'test-only-key', RESEND_FROM_EMAIL: 'hello@example.com' }, send)(request());
    assert.equal(response.status, 502); assert.doesNotMatch(JSON.stringify(await response.json()), /secret provider detail/);
  }
});
