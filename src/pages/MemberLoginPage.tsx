import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { PageRoute } from '../types';

interface MemberLoginPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const MemberLoginPage: React.FC<MemberLoginPageProps> = ({ onNavigate }) => (
  <div className="pt-24 min-h-[80vh] bg-charcoal-950 pb-16">
    <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-4">BASELN / CLIENT ACCESS</span>
      <h1 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">YOUR COACHING.<br /><span className="italic text-smoke-300">Your space.</span></h1>
      <div className="mt-8 border-y border-white/10 py-8 space-y-6">
        <p className="text-base text-paper-200 leading-relaxed">Online sign-in is not available on this website yet. If you are an existing client, use the access details provided by Aian or contact him for help.</p>
        <a href="mailto:aian@baseln.co?subject=BASELN%20client%20access" className="inline-flex items-center gap-3 px-6 py-4 bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold rounded-sm"><Mail size={16} aria-hidden="true" />Contact Aian for access</a>
        <p className="text-sm text-paper-400 leading-relaxed">You can explore a sample Training Room below. It contains example sessions and feedback.</p>
        <button type="button" onClick={() => onNavigate('/training-room')} className="inline-flex items-center gap-3 py-3 text-sm text-smoke-300 hover:text-white">View Training Room preview <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-sm text-paper-300">Interested in private coaching?</span>
        <button type="button" onClick={() => onNavigate('/online/register')} className="inline-flex items-center gap-2 py-3 text-xs uppercase tracking-widest font-semibold text-smoke-300 hover:text-white">Apply for coaching <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </div>
  </div>
);
