import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

const inclusions = [
  'Individual programming',
  'Home or gym',
  'Demonstrations and technique',
  'Progress tracking',
  'Personal nutrition structure',
  'Flexible food choices',
  'Shopping and eating-out guidance',
  'Food and habit tracking',
  'Sleep, stress and recovery',
  'Direct access to Aian',
  'Accountability',
  'Progress reviews',
  'Zoom conversations',
  'Training Room and community',
];

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: 'Is this suitable if I’m new or returning to training?',
      a: 'Yes. Aian starts with your current ability, routine, training history and the practical constraints that matter. The work is shaped for where you are now—not an arbitrary fitness test.',
    },
    {
      q: 'Can I train at home?',
      a: 'Yes. Coaching can work around a commercial gym, boutique facility, garage setup or a considered home kit. Aian writes for the equipment you actually have and the environment where you can train consistently.',
    },
    {
      q: 'How does nutrition coaching work?',
      a: 'The level of structure matches the goal. It may start with reliable meal patterns and protein, or become more detailed where useful. Travel, restaurants and normal life stay part of the conversation.',
    },
    {
      q: 'How do I contact Aian?',
      a: 'Your programme, session records, progress and feedback live in your private Training Room. Use WhatsApp for timely questions and updates, and scheduled Zoom conversations for assessment, review and deeper discussion. Relevant technique footage can be submitted through the portal or WhatsApp.',
    },
    {
      q: 'What happens after the first six weeks?',
      a: 'You review the work together: what was completed, what the relevant measures show and what needs attention next. If ongoing coaching is right, the same private relationship carries forward with a clearer understanding of what works for you.',
    },
    {
      q: 'What does coaching cost?',
      a: 'The six-week investment and ongoing coaching terms are explained before you decide to begin. Sending an enquiry does not commit you or take payment.',
    },
  ];

  const apply = () => {
    onNavigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24">
      <section className="bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-center">
            <div className="order-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">BASELN / PRIVATE COACHING</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-light text-white leading-[1.02]"><span className="block">PRIVATE COACHING.</span><span className="block italic text-smoke-300">The full experience.</span></h1>
              <p className="max-w-xl text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed">Individually designed training, practical nutrition guidance and direct support from Aian McLennan.</p>
              <button onClick={apply} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"><span>Apply to work with Aian</span><ArrowRight size={16} /></button>
            </div>
            <figure className="order-2 h-[250px] sm:h-[330px] lg:h-[460px] overflow-hidden rounded-sm bg-charcoal-850">
              <img src="/media/baseln-team-coaching.png" alt="BASELN coaching team in the training space" className="w-full h-full object-cover object-center grayscale contrast-110" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight">WHAT’S INCLUDED</h2>
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3 sm:gap-y-4">
            {inclusions.map((item) => <div key={item} className="flex items-start gap-3 text-base sm:text-[17px] text-paper-100 font-normal leading-snug"><Check size={16} strokeWidth={2} className="text-smoke-400 shrink-0 mt-0.5" aria-hidden="true" /><span>{item}</span></div>)}
          </div>
          <p className="mt-8 sm:mt-10 text-base sm:text-lg text-paper-300 font-light leading-relaxed">Stay in contact through your private Training Room, WhatsApp and scheduled Zoom conversations.</p>
        </div>
      </section>

      <section className="bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl border-t border-white/10 pt-8 sm:pt-10">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU START</span>
            <p className="text-base sm:text-lg text-paper-200 font-light leading-relaxed">Begin with a conversation and assessment, then start your individual training programme. Your first coaching block runs for six weeks, with regular feedback and reviews. At the end, you and Aian review your progress and discuss the next block.</p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight">QUESTIONS?</h2>
          <div className="mt-7 border-t border-white/10">
            {faqItems.map((item, index) => <div key={item.q} className="border-b border-white/10"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full py-5 sm:py-6 text-left flex items-start justify-between gap-5 hover:text-smoke-300 transition-colors focus:outline-none" aria-expanded={openFaq === index}><span className="text-base sm:text-lg font-semibold text-white leading-snug">{item.q}</span><ChevronDown size={19} className={`text-smoke-400 shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <div className="pb-6 pr-8 text-base text-paper-300 font-light leading-relaxed">{item.a}</div>}</div>)}
          </div>
          <button onClick={apply} className="inline-flex items-center gap-3 mt-9 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"><span>Apply to work with Aian</span><ArrowRight size={16} /></button>
        </div>
      </section>
    </div>
  );
};
