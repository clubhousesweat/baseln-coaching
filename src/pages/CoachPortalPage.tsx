import React, { useState } from 'react';
import { ShieldAlert, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachPortalPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const CoachPortalPage: React.FC<CoachPortalPageProps> = ({ onNavigate }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setError(true);
    setSubmitted(true);
  };

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[640px] mx-auto px-5 sm:px-8 py-16">
        <div className="p-8 sm:p-10 bg-charcoal-900 border border-white/10 rounded-sm shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-smoke-500/10 border border-smoke-400/20 flex items-center justify-center text-smoke-300">
              <Lock size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-smoke-400 block">INTERNAL CONTROL</span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white">Coach Portal</h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-paper-300 font-light leading-relaxed">
            Restricted access for Aian McLennan and authorized BASELN operational personnel. Client coaching logs, assessment dossiers and programme authoring are protected by hardware key and two-factor credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="coach-key" className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                Operational Security Key
              </label>
              <input
                id="coach-key"
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter coach access token"
                className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 font-mono tracking-widest transition-colors"
              />
            </div>

            {error && submitted && (
              <div role="alert" className="p-3 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded flex items-center gap-2.5">
                <ShieldAlert size={16} className="text-red-400 shrink-0" />
                <span>Authentication challenge requires secondary hardware key verification.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Authenticate Session</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-paper-400">
            <span>BASELN Operations</span>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-white underline underline-offset-4"
            >
              Return to public site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
