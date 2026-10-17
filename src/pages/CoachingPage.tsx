import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

const baselineFields = [
  { title: 'YOUR OBJECTIVE', copy: 'What do you actually want to change?' },
  { title: 'YOUR TRAINING', copy: 'Experience, current ability, strengths, weaknesses and training history.' },
  { title: 'YOUR WEEK', copy: 'Work, family, travel, available days and realistic session duration.' },
  { title: 'YOUR BODY', copy: 'Relevant measurements, photographs, injuries, limitations and starting markers.' },
  { title: 'YOUR NUTRITION', copy: 'Current habits, preferences, previous approaches and what needs attention.' },
  { title: 'YOUR COACHING', copy: 'Where you need direction, accountability, technical help or simply somebody making better decisions.' },
];

const baseSixIncludes = [
  'Detailed assessment and personal priorities',
  'Tailored strength and conditioning',
  'Nutrition and body-composition guidance',
  'Weekly progress reviews and adjustments',
  'Technique feedback and video analysis',
  'Direct communication with Aian',
  'Practical habits, recovery and accountability',
  'Progress review and ongoing coaching priorities',
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
      a: 'BASELN / 6 is the starting phase of ongoing private coaching. At six weeks, you review your progress with Aian and agree the next priorities. Your programming, feedback and support continue under the coaching terms agreed before you start.',
    },
    {
      q: 'What does coaching cost?',
      a: 'The six-week investment and ongoing coaching terms are explained before you decide to begin. Sending an enquiry does not commit you or take payment.',
    },
  ];

  const apply = () => {
    onNavigate('/online/register');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24">
      <section className="bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-center">
            <div className="order-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">BASELN / PRIVATE COACHING</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-light text-white leading-[1.02]">
                <span className="block">PRIVATE COACHING.</span>
                <span className="block italic text-smoke-300">The full experience.</span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed">
                Individually designed training, practical nutrition guidance and direct support from Aian McLennan.
              </p>
              <button onClick={apply} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all">
                <span>Apply to work with Aian</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <figure className="order-2 h-[250px] sm:h-[330px] lg:h-[460px] overflow-hidden rounded-sm bg-charcoal-850">
              <img src="/media/baseln-team-coaching.png" alt="BASELN coaching team in the training space" className="w-full h-full object-cover object-center grayscale contrast-110" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900 border-b border-white/5 py-14 sm:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">BEFORE WEEK 01</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-[1.02]">FIRST, WE NEED TO KNOW WHAT WE’RE WORKING WITH.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl text-base sm:text-lg text-paper-200 font-light leading-relaxed space-y-4">
                <p>Before training begins, you complete a detailed assessment and speak with Aian. Your goals, training history, equipment and routine shape the starting programme and nutrition guidance.</p>
              </div>
              <div className="mt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2">
                {baselineFields.map((field, index) => (
                  <div key={field.title} className={`py-6 pr-4 ${index % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'} border-b border-white/10`}>
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-smoke-400 block mb-2">{field.title}</span>
                    <p className="text-base text-paper-100 leading-relaxed">{field.copy}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C7D5D7] text-charcoal-950 border-b border-charcoal-950/15 py-14 sm:py-16 lg:py-20">
        <div className="absolute -right-4 bottom-[-4rem] font-serif text-[220px] sm:text-[320px] leading-none text-charcoal-950/[0.07] select-none pointer-events-none">/ 6</div>
        <div className="relative max-w-[1080px] mx-auto px-5 sm:px-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-charcoal-950/65 block mb-4">BASELN / 6</span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-9 lg:gap-x-14 items-end">
            <div className="lg:col-span-7"><h2 className="font-serif text-4xl sm:text-5xl md:text-[60px] font-light leading-[0.95]">YOUR FIRST SIX WEEKS.</h2></div>
            <p className="lg:col-span-5 text-base sm:text-lg text-charcoal-950/75 leading-relaxed">The beginning of ongoing private coaching. Establish your starting point, put the work into practice and adjust as you progress.</p>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-14 border-t border-charcoal-950/20 pt-6 sm:pt-8">
            {baseSixIncludes.map((item, index) => (
              <div key={item} className="flex items-start gap-3 py-2.5 text-base sm:text-lg leading-snug">
                <span className="font-mono text-xs text-charcoal-950/55 pt-1">{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-9 max-w-2xl text-base sm:text-lg leading-relaxed text-charcoal-950/75">Your programme, records, questions and feedback live in your private Training Room, with WhatsApp for timely questions and scheduled Zoom conversations.</p>
        </div>
      </section>

      <section className="bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl border-t border-white/10 pt-8 sm:pt-10">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU START</span>
            <div className="space-y-5 text-base sm:text-lg text-paper-200 font-light leading-relaxed">
              <p>Your coaching begins with a personal assessment and conversation with Aian, followed by training and nutrition guidance tailored to your goals.</p>
              <p>Throughout your first six weeks, you work directly with him for accountability, technique feedback and practical support. Aian reviews how you’re progressing and adjusts your training and nutrition where needed.</p>
              <p>At six weeks, you review your progress together and set the next priorities for your ongoing coaching. It is a review point, with programming and support continuing under your agreed coaching terms.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="bg-charcoal-900 scroll-mt-24">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight">QUESTIONS?</h2>
          <div className="mt-7 border-t border-white/10">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              const contentId = `faq-content-${index}`;
              const triggerId = `faq-trigger-${index}`;
              return (
                <div key={item.q} className="border-b border-white/10">
                  <button
                    id={triggerId}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full py-5 sm:py-6 text-left flex items-start justify-between gap-5 hover:text-smoke-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-smoke-400 rounded-sm cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white leading-snug">{item.q}</span>
                    <ChevronDown size={19} className={`text-smoke-400 shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div id={contentId} role="region" aria-labelledby={triggerId} className="pb-6 pr-8 text-base text-paper-300 font-light leading-relaxed animate-in fade-in duration-200">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={apply} className="inline-flex items-center gap-3 mt-9 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all">
            <span>Apply to work with Aian</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
