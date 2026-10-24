'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';

export function ContactForm({ configured }: { configured: boolean }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const startedAt = useRef(Date.now());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'loading') return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setState('loading'); setMessage('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, startedAt: startedAt.current }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try email instead.');
      setState('success'); setMessage('Your message has been sent. Thanks for reaching out!'); form.reset(); startedAt.current = Date.now();
    } catch (error) { setState('error'); setMessage(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'The request timed out. Please try again or email me directly.'); }
  }
  return <form className="contact-form" onSubmit={submit} aria-label="Contact Bhavya">
    <div className="form-row"><label htmlFor="name">Name<input id="name" name="name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={80} /></label><label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label></div>
    <label htmlFor="subject">Subject<input id="subject" name="subject" placeholder="What would you like to discuss?" required minLength={3} maxLength={120} /></label>
    <label htmlFor="message">Message<textarea id="message" name="message" placeholder="Tell me a little about it..." required minLength={10} maxLength={5000} rows={5} /></label>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {!configured && <p className="setup-note">The contact form is awaiting email setup. Please use the direct email link for now.</p>}
    <div className="form-bottom"><span>Your message goes straight to my inbox.</span><button className="button primary" disabled={!configured || state === 'loading'} type="submit">{state === 'loading' ? <>Sending <LoaderCircle className="spinner" size={16} /></> : <>Send message <ArrowUpRight size={16} /></>}</button></div>
    <p className={`form-status ${state}`} role="status" aria-live="polite">{state === 'success' && <CheckCircle2 size={16} />}{message}</p>
  </form>;
}
