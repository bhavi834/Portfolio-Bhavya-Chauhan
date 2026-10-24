import { mkdir, writeFile } from 'node:fs/promises';
const icons = ['python','pytorch','opencv','php','javascript','mysql','cplusplus','c','numpy','pandas','apachespark','react','nextjs','laravel','fastapi','flask','git','linux'];
await mkdir('public/logos', { recursive: true });
const results = await Promise.allSettled(icons.map(async name => {
  const url = `https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/${name}/${name}-original.svg`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const svg = await response.text();
  if (!svg.includes('<svg') || /<script|onload=/.test(svg)) throw new Error(`Invalid SVG: ${name}`);
  await writeFile(`public/logos/${name}.svg`, svg);
  console.log(`Saved ${name}`);
}));
const license = await fetch('https://raw.githubusercontent.com/devicons/devicon/v2.17.0/LICENSE');
if (license.ok) await writeFile('public/logos/DEVICON-LICENSE.txt', await license.text());
for (const result of results) if (result.status === 'rejected') console.error(result.reason);
if (results.some(r => r.status === 'rejected')) process.exitCode = 1;
