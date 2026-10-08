import React from 'react';
import { PageRoute } from '../types';

export type LegalPageType = 'privacy' | 'terms' | 'refund-policy' | 'training-disclaimer';

interface LegalPageProps {
  type: LegalPageType;
  onNavigate: (path: PageRoute) => void;
}

interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

const LAST_UPDATED = '9 October 2026';

const privacySections: LegalSection[] = [
  {
    heading: '1. Who this notice applies to',
    body: <>This notice explains how BASELN, operated by Aian McLennan, handles personal information collected through this website, an enquiry, coaching onboarding or the delivery of private coaching.</>,
  },
  {
    heading: '2. Information we collect',
    body: <>Depending on how you interact with BASELN, this may include your name, email address, phone number, country or time zone, coaching objective, training background, availability and communications with us. If you choose to share information relevant to exercise participation, such as an injury, limitation or health concern, we handle it as sensitive information and use it only where it is relevant to your coaching or safety.</>,
  },
  {
    heading: '3. Why we use your information',
    body: <>We use information to assess coaching fit, respond to an enquiry, deliver and support coaching, manage programme records and communications, meet legal obligations and protect the security of BASELN’s services. We do not sell or rent personal information to advertisers.</>,
  },
  {
    heading: '4. Service providers',
    body: <>We use carefully selected service providers for email, website hosting, programme delivery, communications and administration. Those providers may process information on our behalf only as needed to provide their service.</>,
  },
  {
    heading: '5. Overseas processing',
    body: <>Some technology providers may process information outside Australia. Where this occurs, BASELN takes reasonable steps to use providers with appropriate privacy and security arrangements for the service they provide.</>,
  },
  {
    heading: '6. Access, correction and complaints',
    body: <>You may ask to access or correct your personal information, or raise a privacy concern, by emailing <a href="mailto:aian@baseln.co" className="text-smoke-300 underline underline-offset-4">aian@baseln.co</a>. BASELN will respond within a reasonable period. If a concern cannot be resolved directly, you may contact the Office of the Australian Information Commissioner.</>,
  },
  {
    heading: '7. Marketing',
    body: <>BASELN does not add you to marketing communications merely because you submit an enquiry. If you separately choose to receive marketing, you can opt out at any time using the contact details above.</>,
  },
];

const termsSections: LegalSection[] = [
  {
    heading: '1. The coaching service',
    body: <>BASELN provides private online coaching led by Aian McLennan. BASELN / 6 is a defined six-week opening coaching phase. The exact coaching scope, start date, inclusions and any continuation arrangements are confirmed with you before coaching begins.</>,
  },
  {
    heading: '2. Client responsibility and exercise safety',
    body: <>Exercise carries inherent risk. You are responsible for providing accurate information about anything that may affect safe participation, working within your capability and seeking advice from an appropriately qualified health professional where needed. BASELN does not diagnose, treat or rehabilitate medical conditions and does not replace medical, allied-health or dietetic care.</>,
  },
  {
    heading: '3. Programme delivery and communication',
    body: <>Your programme, session records, progress and feedback are managed through the BASELN Training Room. Timely questions and updates may be handled through WhatsApp, with scheduled Zoom conversations used where agreed. Weekly structured reviews and the six-week review are part of the BASELN / 6 coaching process. Response timing and any scheduled calls are agreed during onboarding and may vary with the nature of the request.</>,
  },
  {
    heading: '4. Fees and payment arrangements',
    body: <>BASELN does not publish a coaching price or take payment through this website. The six-week investment, any ongoing coaching terms and the payment arrangements that apply to you are explained before you choose whether to begin. Sending an application is not a purchase, does not commit you and does not take payment.</>,
  },
  {
    heading: '5. Confirmation, changes and cancellation',
    body: <>Before coaching begins, BASELN will confirm the agreed service period, inclusions and applicable cancellation or change arrangements with you in writing. The <a href="/refund-policy" className="text-smoke-300 underline underline-offset-4">Refund &amp; Cancellation Information</a> page provides general information about this process. Nothing in these terms limits rights that cannot lawfully be excluded under the Australian Consumer Law.</>,
  },
  {
    heading: '6. Changes, pauses and continuation',
    body: <>If your circumstances change, contact BASELN promptly. BASELN may discuss a practical adjustment where appropriate. Ongoing coaching after the initial six weeks is available only by mutual agreement under the terms confirmed for that next period.</>,
  },
  {
    heading: '7. Consumer rights',
    body: <>Nothing in these terms excludes, restricts or modifies any consumer guarantee, remedy or other right that cannot lawfully be excluded under the Australian Consumer Law or other applicable law.</>,
  },
];

const refundSections: LegalSection[] = [
  {
    heading: '1. Before coaching begins',
    body: <>BASELN does not take payment through this website. Before coaching begins, any fees, payment arrangements and the cancellation or variation terms relevant to the agreed coaching service are confirmed with you in writing.</>,
  },
  {
    heading: '2. Australian Consumer Law',
    body: <>Nothing on this page excludes, restricts or modifies any consumer guarantee, remedy or other right that cannot lawfully be excluded under the Australian Consumer Law or other applicable law.</>,
  },
  {
    heading: '3. Contact BASELN',
    body: <>For a question about an agreed coaching arrangement, email <a href="mailto:aian@baseln.co" className="text-smoke-300 underline underline-offset-4">aian@baseln.co</a>. Please provide only the information reasonably needed for BASELN to identify the arrangement and respond.</>,
  },
];

const disclaimerSections: LegalSection[] = [
  {
    heading: '1. General coaching information only',
    body: <>BASELN provides general exercise instruction, training programming, practical nutrition guidance and coaching support. Information on this site and in coaching communications is educational and coaching-based; it is not medical, physiotherapy, psychological, dietetic or other healthcare advice.</>,
  },
  {
    heading: '2. Get appropriate professional advice',
    body: <>Speak with a suitably qualified health professional before starting or changing an exercise or nutrition programme if you are pregnant, have an injury, illness, medical condition, are taking medication that may affect exercise, or have any concern about participating safely.</>,
  },
  {
    heading: '3. Stop where necessary',
    body: <>Stop training and seek appropriate medical assistance if you experience chest pain, faintness, unusual shortness of breath, severe pain or another concerning symptom. Do not continue an exercise that causes pain or feels unsafe.</>,
  },
  {
    heading: '4. Individual responsibility',
    body: <>You are responsible for choosing a suitable training environment, using equipment safely, following instructions within your ability and sharing relevant information with BASELN. Coaching is tailored using the information available, but outcomes and responses to training vary between individuals and cannot be guaranteed.</>,
  },
];

const pageContent: Record<LegalPageType, { eyebrow: string; title: string; intro: string; sections: LegalSection[] }> = {
  privacy: {
    eyebrow: 'BASELN LEGAL & GOVERNANCE',
    title: 'Privacy Notice',
    intro: 'How BASELN collects, uses and protects personal information.',
    sections: privacySections,
  },
  terms: {
    eyebrow: 'BASELN LEGAL & GOVERNANCE',
    title: 'Coaching Terms',
    intro: 'The practical terms that apply to private online coaching with BASELN.',
    sections: termsSections,
  },
  'refund-policy': {
    eyebrow: 'BASELN LEGAL & GOVERNANCE',
    title: 'Refund & Cancellation Information',
    intro: 'How cancellation arrangements and consumer rights are confirmed before coaching begins.',
    sections: refundSections,
  },
  'training-disclaimer': {
    eyebrow: 'BASELN LEGAL & GOVERNANCE',
    title: 'Health & Training Disclaimer',
    intro: 'Important safety information about participating in exercise and receiving coaching guidance.',
    sections: disclaimerSections,
  },
};

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const page = pageContent[type];

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <header className="max-w-3xl mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">{page.eyebrow}</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[0.98] uppercase">{page.title}</h1>
          <p className="mt-5 text-base sm:text-lg text-paper-300 font-light leading-relaxed">{page.intro}</p>
          <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.16em] text-paper-400">Last updated: {LAST_UPDATED}</p>
        </header>

        <article className="bg-charcoal-900 border border-white/10 divide-y divide-white/10">
          {page.sections.map((section) => (
            <section key={section.heading} className="p-6 sm:p-8 lg:p-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">{section.heading}</h2>
              <div className="mt-4 text-sm sm:text-base text-paper-300 font-light leading-relaxed">{section.body}</div>
            </section>
          ))}
        </article>

        <div className="mt-8 pt-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button onClick={() => onNavigate('/')} className="w-fit text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors">← Back to Home</button>
          <button onClick={() => onNavigate('/online/register')} className="w-fit text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-5 py-3 rounded-sm transition-colors">Start Coaching Enquiry</button>
        </div>
      </div>
    </div>
  );
};
