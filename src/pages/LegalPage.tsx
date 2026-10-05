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

const LAST_UPDATED = '5 October 2026';

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
    body: <>We use information to assess coaching fit, respond to an enquiry, deliver and support coaching, manage programme records and communications, process a payment where applicable, meet legal obligations and protect the security of BASELN’s services. We do not sell or rent personal information to advertisers.</>,
  },
  {
    heading: '4. Payments and service providers',
    body: <>Where an online payment is offered, payment details are handled by the payment provider, FastSpring. BASELN does not receive or store full card details. We may also use carefully selected service providers for email, website hosting, programme delivery, communications and administration. Those providers may process information on our behalf only as needed to provide their service.</>,
  },
  {
    heading: '5. Overseas processing',
    body: <>Some technology and payment providers may process information outside Australia. Where this occurs, BASELN takes reasonable steps to use providers with appropriate privacy and security arrangements for the service they provide.</>,
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
    heading: '4. Fees and payments',
    body: <>The applicable coaching fee, payment timing and what is included are confirmed before you decide to proceed. Where payment is available online, FastSpring processes the transaction as BASELN’s payment provider. A payment does not create an ongoing coaching commitment beyond the agreed coaching period unless you and BASELN agree otherwise in writing.</>,
  },
  {
    heading: '5. Cancellation and refunds',
    body: <>The <a href="/refund-policy" className="text-smoke-300 underline underline-offset-4">Refund &amp; Cancellation Policy</a> forms part of these terms. Except for rights that cannot be excluded under the Australian Consumer Law, payments for BASELN / 6 are non-refundable after payment. A request supported by a valid medical certificate received within 24 hours of payment will be assessed individually, case by case. Providing a certificate does not guarantee a refund.</>,
  },
  {
    heading: '6. Changes, pauses and continuation',
    body: <>If your circumstances change, contact BASELN promptly. BASELN may discuss a practical adjustment where appropriate, but any pause, extension, credit or other variation is at BASELN’s discretion unless required by law. Ongoing coaching after the initial six weeks is available only by mutual agreement under the confirmed terms at that time.</>,
  },
  {
    heading: '7. Consumer rights',
    body: <>Nothing in these terms excludes, restricts or modifies any consumer guarantee, remedy or other right that cannot lawfully be excluded under the Australian Consumer Law or other applicable law.</>,
  },
];

const refundSections: LegalSection[] = [
  {
    heading: '1. BASELN / 6 commitment',
    body: <>BASELN / 6 is a defined six-week private coaching commitment. Once payment is made, BASELN allocates coaching preparation, programme design and service capacity to the agreed coaching period.</>,
  },
  {
    heading: '2. Standard position',
    body: <>Except for rights that cannot be excluded under the Australian Consumer Law, payments are non-refundable and the service cannot be cancelled after payment.</>,
  },
  {
    heading: '3. Medical-certificate requests',
    body: <>BASELN will consider an exception request only where a valid medical certificate is provided to <a href="mailto:aian@baseln.co" className="text-smoke-300 underline underline-offset-4">aian@baseln.co</a> within 24 hours of payment. Requests meeting these conditions are assessed individually, case by case. A valid certificate does not automatically entitle you to a refund, credit, deferral or other outcome. BASELN will confirm its decision in writing.</>,
  },
  {
    heading: '4. Australian Consumer Law',
    body: <>This policy does not exclude, restrict or modify any consumer guarantee, remedy or other right that cannot lawfully be excluded under the Australian Consumer Law or other applicable law.</>,
  },
  {
    heading: '5. How to contact BASELN',
    body: <>Include your full name, the date of payment, the coaching service purchased and the relevant supporting document when you email <a href="mailto:aian@baseln.co" className="text-smoke-300 underline underline-offset-4">aian@baseln.co</a>. Do not send more medical information than is reasonably necessary to support your request.</>,
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
    title: 'Refund & Cancellation Policy',
    intro: 'The policy that applies to BASELN / 6 payments, cancellation requests and medical-certificate exceptions.',
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
          <button onClick={() => onNavigate('/apply')} className="w-fit text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-5 py-3 rounded-sm transition-colors">Start Coaching Enquiry</button>
        </div>
      </div>
    </div>
  );
};
