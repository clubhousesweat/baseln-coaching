import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => (
  <section className="min-h-[70dvh] bg-charcoal-900 pt-32 pb-16 sm:pt-40 sm:pb-24">
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
      <div className="max-w-3xl border-t border-white/10 pt-7 sm:pt-10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-smoke-400">CONTACT BASELN</p>
        <h1 className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] font-light text-white uppercase">Start with the right conversation.</h1>
        <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-paper-300 font-light">
          If you are considering private coaching, the application gives Aian the context needed for a useful first conversation.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <article className="border border-white/10 bg-charcoal-950 p-7 sm:p-9">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-smoke-400">PRIVATE COACHING</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl leading-tight font-light text-white">Tell Aian what you want to achieve.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper-300">Your application starts a conversation. It does not commit you or take payment.</p>
          <button
            type="button"
            onClick={() => onNavigate('/online/register')}
            className="mt-8 inline-flex min-h-12 items-center gap-3 bg-smoke-500 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-950 transition-colors hover:bg-smoke-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Apply for coaching <ArrowRight size={16} aria-hidden="true" />
          </button>
        </article>

        <article className="border-t border-white/10 pt-7 sm:pt-9 lg:pt-7">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-smoke-400">OTHER ENQUIRIES</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl leading-tight font-light text-white">Email Aian directly.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper-300">For an existing coaching question, a partnership enquiry or another matter not covered by the application, email Aian. Please do not include sensitive health information in an email.</p>
          <a
            href="mailto:aian@baseln.co"
            onClick={() => trackEvent('email_click', { recipient: 'aian@baseln.co', placement: 'contact_page' })}
            className="mt-8 inline-flex min-h-12 items-center border-b border-smoke-500 text-base font-medium text-smoke-300 transition-colors hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-smoke-500"
          >
            aian@baseln.co
          </a>
        </article>
      </div>
    </div>
  </section>
);
