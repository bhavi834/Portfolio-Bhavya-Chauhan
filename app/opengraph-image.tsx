import { ImageResponse } from 'next/og';
export const alt = 'Bhavya Chauhan | Software Developer and AI/ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: '#101113', color: '#efeee9', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px 90px', justifyContent: 'center' }}><div style={{ color: '#8aaef1', fontSize: 20, letterSpacing: 5, marginBottom: 35 }}>SOFTWARE DEVELOPER / AI & ML ENGINEER</div><div style={{ fontSize: 100, letterSpacing: -5 }}>Bhavya Chauhan.</div><div style={{ fontSize: 28, color: '#a1a8b4', marginTop: 32 }}>Thoughtful interfaces. Useful intelligence.</div><div style={{ marginTop: 65, borderTop: '1px solid #363b44', paddingTop: 23, color: '#8aaef1', fontSize: 18 }}>SELECTED WORK & EXPERIENCE</div></div>, size);
}
