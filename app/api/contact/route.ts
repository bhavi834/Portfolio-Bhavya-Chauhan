import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
const LIMIT = 16_384;
const WINDOW = 10 * 60 * 1000;
// Best-effort per-instance protection. Use Vercel Firewall for a distributed limit.
const attempts = new Map<string, { count: number; until: number }>();
const reply = (error: string, status: number, headers?: Record<string, string>) => NextResponse.json({ error }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expected = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : request.nextUrl.origin;
  if (origin && origin !== expected && origin !== request.nextUrl.origin) return reply('This request is not allowed.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply('Please submit the contact form as JSON.', 415);
  if (Number(request.headers.get('content-length')) > LIMIT) return reply('Your message is too large.', 413);

  const now = Date.now();
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  // Vercel overwrites this header at the edge. Do not trust arbitrary forwarded IPs elsewhere.
  const identity = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'local';
  const key = createHash('sha256').update(identity).digest('hex');
  const previous = attempts.get(key);
  if (previous && previous.count >= 5) return reply('Too many attempts. Please wait ten minutes or email me directly.', 429, { 'Retry-After': String(Math.ceil((previous.until - now) / 1000)) });
  if (!previous && attempts.size >= 10000) return reply('The contact service is busy. Please email me directly.', 503);
  attempts.set(key, { count: (previous?.count || 0) + 1, until: previous?.until || now + WINDOW });

  let data: Record<string, unknown>;
  try {
    // Bound the actual stream as Content-Length is not trustworthy.
    const reader = request.body?.getReader();
    if (!reader) return reply('A message is required.', 400);
    const chunks: Uint8Array[] = []; let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > LIMIT) { await reader.cancel(); return reply('Your message is too large.', 413); }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply('Invalid form data.', 400);
  } catch { return reply('Invalid form data. Please try again.', 400); }

  if (typeof data.website !== 'string' || data.website.trim() !== '') return reply('The form could not be submitted.', 400);
  if (typeof data.startedAt !== 'number' || !Number.isFinite(data.startedAt) || now - data.startedAt < 2500 || now - data.startedAt > 24 * 60 * 60 * 1000) return reply('Please take a moment to complete the form, then try again. Refresh if this page has been open for a day.', 400);
  const read = (field: string) => typeof data[field] === 'string' ? (data[field] as string).trim() : '';
  const name = read('name'), email = read('email'), subject = read('subject'), message = read('message');
  if (name.length < 2 || name.length > 80 || /[\r\n\x00-\x1f]/.test(name)) return reply('Please enter a name between 2 and 80 characters.', 400);
  if (email.length > 254 || !/^[A-Z0-9.!#$%&'*+\-/=?^_`{|}~]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(email)) return reply('Please enter a valid email address.', 400);
  if (subject.length < 3 || subject.length > 120 || /[\r\n\x00-\x1f]/.test(subject)) return reply('Please enter a subject between 3 and 120 characters.', 400);
  if (message.length < 10 || message.length > 5000 || /\x00/.test(message)) return reply('Please enter a message between 10 and 5,000 characters.', 400);
  const apiKey = process.env.RESEND_API_KEY, from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return reply('Email delivery is not configured. The site owner must set RESEND_API_KEY and RESEND_FROM_EMAIL. Please email bhavyachauhan3112@gmail.com directly.', 503);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ from, to: ['bhavyachauhan3112@gmail.com'], reply_to: email, subject: `Portfolio enquiry: ${subject}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` }),
    });
    if (!response.ok) return reply('Email delivery is temporarily unavailable. Please email me directly.', 502);
    const result = await response.json();
    if (typeof result.id !== 'string' || !result.id) return reply('Delivery could not be confirmed. Please email me directly.', 502);
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return reply('Email delivery could not be confirmed. Please try again later or email me directly.', 502); }
}
