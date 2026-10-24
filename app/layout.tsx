import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Bhavya Chauhan | Software Developer & AI/ML', description: 'Portfolio of Bhavya Chauhan — software development, AI/ML, computer vision and full-stack engineering.' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
