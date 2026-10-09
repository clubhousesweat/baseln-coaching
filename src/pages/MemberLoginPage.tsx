import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../utils/analytics';

interface MemberLoginPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const MemberLoginPage: React.FC<MemberLoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [requested, setRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    trackEvent('member_login_attempt', { email_domain: email.split('@')[1] || 'unknown' });
    setTimeout(() => {
      setIsSubmitting(false);
      setRequested(true);
    }, 400);
  };

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-12">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">BASELN CLIENT PORTAL</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.04] uppercase">
            <span className="block">SECURE CLIENT</span>
            <span className="block text-smoke-300 italic font-normal">ACCESS &amp; SIGN IN.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-paper-300 font-light leading-relaxed max-w-xl">
            Active BASELN coaching clients access their private Training Room, programme records, weekly check-ins and direct feedback from Aian here.
          </p>
        </div>

        <div className="bg-charcoal-900 border border-white/10 rounded-sm p-6 sm:p-10 shadow-2xl space-y-8">
          {requested ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-smoke-500/20 flex items-center justify-center text-smoke-300">
                <CheckCircle2 size={26} />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">Access link requested.</h2>
              <p className="text-sm text-paper-200 font-light leading-relaxed">
                If <span className="text-white font-mono">{email}</span> matches an active client account, your secure one-time access link has been dispatched to your inbox.
              </p>
              <div className="p-4 bg-charcoal-850 border border-white/5 rounded text-xs text-paper-400 leading-relaxed">
                Need immediate assistance or updating your client email? Contact Aian directly at{' '}
                <a href="mailto:aian@baseln.co" className="text-smoke-400 underline underline-offset-2">aian@baseln.co</a>.
              </div>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setRequested(false)}
                  className="text-xs uppercase tracking-widest font-semibold text-paper-300 hover:text-white"
                >
                  Use a different email
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/training-room')}
                  className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white"
                >
                  View Training Room preview →
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-smoke-400">
                <Lock size={14} />
                <span>Client Authentication</span>
              </div>

              <div>
                <label htmlFor="member-email" className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  Client email address <span className="text-smoke-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="member-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    autoComplete="email"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 disabled:opacity-60 text-charcoal-950 rounded-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Requesting secure link…' : 'Send secure access link'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="pt-4 border-t border-white/5 space-y-3 text-xs text-paper-400 font-light">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-smoke-400 shrink-0 mt-0.5" />
                  <span>Single-session passwordless sign-in protects client health, programming and training records.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail size={16} className="text-smoke-400 shrink-0 mt-0.5" />
                  <span>First-time clients receive invitation links upon completion of the BASELN onboarding assessment.</span>
                </div>
              </div>
            </form>
          )}

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-paper-400">
            <span>Not yet a private coaching client?</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/training-room')}
                className="text-paper-300 hover:text-white underline underline-offset-4"
              >
                Explore Training Room preview
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/online/register')}
                className="text-smoke-400 hover:text-smoke-300 font-semibold uppercase tracking-wider"
              >
                Apply for coaching →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
