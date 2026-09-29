import React from 'react';
import { PageRoute } from '../types';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms'; onNavigate: (path: PageRoute) => void }> = ({ type, onNavigate }) => {
  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12">
        <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
          BASELN LEGAL & GOVERNANCE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight uppercase mb-8">
          {type === 'privacy' ? 'Privacy Notice & Data Policy' : 'Coaching Terms of Service'}
        </h1>

        <div className="space-y-6 text-sm text-paper-300 font-light leading-relaxed bg-charcoal-900 p-8 sm:p-10 border border-white/10 rounded-sm">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>1. Data Collection & Use:</strong> When you submit an application to BASELN, we collect your name, contact information, country/time zone, training background, and physical objectives. This information is used solely to evaluate coaching fit and communicate with you regarding your private coaching proposal.
              </p>
              <p>
                <strong>2. Health & Medical Information:</strong> We do not ask for or store sensitive clinical records, medical diagnoses, or pathological test data on our public site. Any physical limitations shared during coaching onboarding are kept strictly confidential and used solely to tailor exercise prescriptions.
              </p>
              <p>
                <strong>3. Storage & Third Parties:</strong> Your contact details are never rented, sold, or shared with third-party advertisers or external marketing platforms. All communication is managed directly between you and Aian McLennan.
              </p>
              <p>
                <strong>4. Right to Deletion:</strong> You may request the review, update, or deletion of your enquiry data at any time by emailing{' '}
                <a href="mailto:aian@baseln.co" className="text-smoke-400 underline underline-offset-4">
                  aian@baseln.co
                </a>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Private Coaching Relationship:</strong> BASELN provides private physical training prescriptions, nutrition coaching guidance, and accountability led by Aian McLennan. Coaching begins with the six-week BASELN / 6 phase.
              </p>
              <p>
                <strong>2. Health & Exercise Safety:</strong> Exercise involves inherent physical risks. Clients acknowledge they are in suitable physical condition for resistance and cardiovascular training, or have obtained appropriate clearance from their medical practitioner. BASELN does not provide medical treatment or rehabilitation services.
              </p>
              <p>
                <strong>3. Commercial Commitment & Renewals:</strong> BASELN / 6 is a defined six-week engagement. Ongoing private coaching continues post-review upon mutual agreement under confirmed commercial terms.
              </p>
              <p>
                <strong>4. Communication Boundaries:</strong> Direct coach contact is provided via your private thread. Aian responds to workout queries and footage reviews within 24 business hours during working days.
              </p>
            </>
          )}

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white"
            >
              ← Back to Home
            </button>
            <button
              onClick={() => onNavigate('/apply')}
              className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-sm"
            >
              Start Coaching Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
