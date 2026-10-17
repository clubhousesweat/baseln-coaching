import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachPortalPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const CoachPortalPage: React.FC<CoachPortalPageProps> = ({ onNavigate }) => (
  <div className="pt-24 min-h-[80vh] bg-charcoal-950 pb-16">
    <div className="max-w-[640px] mx-auto px-5 sm:px-8 py-16">
      <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-4">BASELN / OPERATIONS</span>
      <h1 className="font-serif text-3xl sm:text-4xl text-white">Coach access</h1>
      <p className="mt-6 py-6 border-y border-white/10 text-base text-paper-300 leading-relaxed">The coach portal is not connected on this website yet. Use your existing coaching tools to manage clients and applications.</p>
      <button type="button" onClick={() => onNavigate('/')} className="mt-7 inline-flex items-center gap-3 py-3 text-xs uppercase tracking-widest font-semibold text-smoke-300 hover:text-white"><ArrowLeft size={16} aria-hidden="true" />Return to BASELN</button>
    </div>
  </div>
);
