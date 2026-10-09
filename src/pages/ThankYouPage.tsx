import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface ThankYouPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigate }) => {
  const [leadReceipt, setLeadReceipt] = useState<{ leadId?: number; receivedAt?: string } | null>(null);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('baseln_last_lead_receipt');
      if (cached) {
        setLeadReceipt(JSON.parse(cached));
      }
    } catch {
      // optional receipt data
    }
  }, []);

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12">
        <div className="mb-9">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">BASELN / ENQUIRY CONFIRMATION</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.04] uppercase mb-4">
            <span className="block">ENQUIRY</span>
            <span className="block text-smoke-300 italic font-normal">CONFIRMED.</span>
          </h1>
          <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed max-w-2xl">
            Your private coaching enquiry has been recorded in the BASELN intake queue.
          </p>
        </div>

        <div className="p-8 sm:p-12 bg-charcoal-900 border border-smoke-500/30 rounded-sm space-y-6 shadow-2xl animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-smoke-500/20 flex items-center justify-center text-smoke-300">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Enquiry received.</h2>
            {leadReceipt?.leadId && (
              <span className="inline-block text-xs font-mono text-smoke-400 bg-smoke-500/10 px-2.5 py-1 rounded border border-smoke-500/20">
                Reference ID #{leadReceipt.leadId}
              </span>
            )}
          </div>

          <div className="p-5 bg-charcoal-850 border border-white/5 rounded-sm">
            <p className="text-sm text-paper-200 font-light leading-relaxed">
              “Received. Aian will review your brief and contact you about the next step.”
            </p>
          </div>

          <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">
            Aian reviews every enquiry personally within one business day. If BASELN is a fit, he will explain the next appropriate step and what coaching could look like before you decide whether to start.
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-sm transition-colors"
            >
              Return home
            </button>
            <button
              onClick={() => onNavigate('/coaching')}
              className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>Explore coaching inclusions</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
