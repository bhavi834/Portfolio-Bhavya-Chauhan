'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#projects'], ['Skills', '#skills']];
export function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus(); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [open]);
  return <header className="site-header"><nav className="wrap nav" aria-label="Main navigation"><a className="logo" href="#home" aria-label="Bhavya Chauhan, home" onClick={() => setOpen(false)}>bc<span>.</span></a><div className="desktop-nav">{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</div><a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} /></a><button id="menu-toggle" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></nav><div id="mobile-navigation" className="mobile-nav" hidden={!open}>{links.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}<ArrowUpRight size={16} /></a>)}<a href="#background" onClick={() => setOpen(false)}>Background<ArrowUpRight size={16} /></a></div></header>;
}
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { y: [16, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}>{children}</motion.div>;
}
export function HeroArt() {
  return <div className="hero-art" aria-hidden="true"><div className="hero-art-top"><span>IDEA → SYSTEM</span><span className="art-coordinates">28.61° N / 77.20° E</span></div><div className="orbital-field"><div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner" /><div className="orbital-axis axis-one" /><div className="orbital-axis axis-two" /><div className="orbital-core"><span>bc<span className="blue">.</span></span></div><span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-label label-one">interface</span><span className="orbit-label label-two">intelligence</span><span className="orbit-label label-three">engineering</span></div><div className="hero-art-bottom"><span>THINK. BUILD. REFINE.</span><span className="small-cross">+</span></div></div>;
}
