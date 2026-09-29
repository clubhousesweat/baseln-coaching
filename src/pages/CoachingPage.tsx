import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

const processSteps = [
  { num: '01', title: 'Fit conversation', copy: 'A short conversation about your objective, routine, training history and the practical constraints that matter.' },
  { num: '02', title: 'Assessment and first block', copy: 'Aian turns the relevant detail into individual training and appropriate food guidance, then sets up your private Training Room.' },
  { num: '03', title: 'Six weeks in motion', copy: 'You complete the work, record what is useful, send relevant footage and use regular feedback to keep the next decision clear.' },
  { num: '04', title: 'Review and choice', copy: 'At week six, you review what happened, what the measures show and whether ongoing coaching is the right next step.' },
];

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqItems = [
    { q: 'Do I need to be fit already?', a: 'No. Aian starts with your current ability, schedule, relevant limitations and equipment. The work is built for where you are now—not an arbitrary fitness test.' },
    { q: 'How does communication and feedback work?', a: 'Your programme, training record and check-in information live in your private Training Room. You can send relevant updates and technique footage there; Aian uses the context to respond with clear next steps.' },
    { q: 'How often is my work reviewed?', a: 'Training is considered as it is completed, with a regular check-in rhythm to review adherence, relevant measures and any change to the week. The exact detail is agreed at the fit conversation.' },
    { q: 'Do I need a commercial gym?', a: 'No. Coaching can work around a commercial gym, boutique facility, garage setup or a well-planned home kit. Aian writes for the equipment you actually have.' },
    { q: 'How does food guidance work?', a: 'The level of structure matches the goal. It may start with reliable meal patterns and protein, or become more detailed where useful. Travel, restaurants and normal life stay part of the conversation.' },
    { q: 'What does BASELN / 6 cost?', a: 'The six-week investment and what ongoing coaching could look like are confirmed after a short fit conversation, before you decide whether to begin. No payment is taken when you enquire.' },
  ];

  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 border-b border-white/10 bg-gradient-to-b from-charcoal-950 to-charcoal-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-smoke-400">BASELN / PRIVATE COACHING</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.04]">
                <span className="block">A CLEAR START.</span><span className="block text-smoke-300 italic font-normal">A COACH WHO STAYS INVOLVED.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed max-w-2xl">Private online coaching with Aian McLennan, beginning with BASELN / 6. You start with a clear objective, an individual plan and a direct coaching relationship that stays close to the work.</p>
              <p className="text-sm sm:text-base text-smoke-300 font-light leading-relaxed">Fat loss, muscle, strength, fitness, sport or a return to training—the emphasis is yours.</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all">
                  <span>Apply to work with Aian</span><ArrowRight size={16} />
                </button>
                <a href="#the-start" className="inline-flex items-center justify-center text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-300 hover:text-white px-5 py-4 transition-colors">See the starting process ↓</a>
              </div>
            </div>
            <div className="lg:col-span-5"><div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl"><img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian coaching one person" className="w-full h-auto object-cover contrast-110" /><div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-65" /><div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">Aian McLennan · Coaching in practice</div></div></div>
          </div>
        </div>
      </section>

      <section id="the-start" className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-11">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">BASELN / 6</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">THE FIRST SIX WEEKS, EXPLAINED.</h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">The first six weeks are long enough to establish a training rhythm, see how the plan fits your real life and decide what deserves attention next. Here is how the opening phase works.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <div key={step.num} className="p-6 bg-charcoal-850 border border-white/5 rounded-sm">
                <span className="font-mono text-xs text-smoke-400">{step.num}</span>
                <h3 className="font-serif text-xl text-white mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-paper-400 leading-relaxed font-light">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">DURING THE SIX WEEKS</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">THE WORK HAS A HOME.</h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">Your Training Room keeps the programme, session notes, check-in signals and coaching communication in one place. Rather than chasing a generic app or a loose message thread, you can see what the week asks of you and what feedback belongs to it.</p>
              <div className="space-y-3 text-sm text-paper-400 font-light leading-relaxed">
                <p><strong className="text-paper-200 font-medium">Sessions:</strong> the work is presented with the exercise, prescription and the context you need to complete it.</p>
                <p><strong className="text-paper-200 font-medium">Feedback:</strong> send a relevant update or technique clip when it helps; Aian responds to the work you are actually doing.</p>
                <p><strong className="text-paper-200 font-medium">Review rhythm:</strong> use check-ins to make the next week clearer, particularly when routine, recovery or priorities change.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <button onClick={() => { onNavigate('/training-room'); window.scrollTo(0, 0); }} className="w-full text-left group bg-charcoal-900 border border-white/10 rounded-sm overflow-hidden hover:border-smoke-400/50 transition-colors">
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10"><div><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">ILLUSTRATIVE PREVIEW</span><h3 className="font-serif text-2xl text-white">A sample Training Room view</h3></div><ExternalLink size={20} className="text-smoke-400 group-hover:text-white shrink-0" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
                  {[
                    { label: 'Monday opening', copy: 'Today’s session and the focus for the work.' },
                    { label: 'Useful record', copy: 'Completed sessions, personal notes and relevant check-in signals.' },
                    { label: 'Coach feedback', copy: 'A place for focused next steps and technique context.' },
                  ].map((item) => <div key={item.label} className="bg-charcoal-850 p-5 min-h-[145px]"><span className="text-xs font-mono text-smoke-400 uppercase tracking-wider block mb-3">{item.label}</span><p className="text-sm text-paper-300 leading-relaxed font-light">{item.copy}</p></div>)}
                </div>
                <div className="p-4 sm:p-5 text-xs text-paper-400 font-light">Sample layout only. It does not display live client data. Open the illustrative preview →</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">AFTER WEEK SIX</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">REVIEW THE WORK. THEN CHOOSE.</h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">The first six weeks close with a proper review: what was completed, what the relevant measures show, what changed in the week and what would make the next phase more useful. If ongoing coaching is right, Aian explains the continuation options before you choose.</p>
              <div className="bg-charcoal-850 border border-white/10 rounded-sm p-6 space-y-4 text-sm">
                <div className="flex justify-between gap-6 pb-3 border-b border-white/5"><span className="text-paper-400">Starting phase</span><span className="text-white font-semibold text-right">BASELN / 6 (6 weeks)</span></div>
                <div className="flex justify-between gap-6 pb-3 border-b border-white/5"><span className="text-paper-400">Investment</span><span className="text-white font-medium text-right">Confirmed after fit conversation</span></div>
                <div className="flex justify-between gap-6"><span className="text-paper-400">Response expectation</span><span className="text-white font-medium text-right">Personal reply within 24–48 business hours</span></div>
              </div>
              <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">An enquiry does not take payment or commit you to coaching. It gives Aian enough context to explain the right starting scope, the six-week investment and what continuation could look like.</p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">BUYING QUESTIONS</span>
              {faqItems.map((item, idx) => (
                <div key={item.q} className="border border-white/10 bg-charcoal-850 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors focus:outline-none" aria-expanded={openFaq === idx}>
                    <span className="text-sm sm:text-base font-semibold text-white">{item.q}</span><ChevronDown size={18} className={`text-smoke-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && <div className="px-5 pb-5 text-xs sm:text-sm text-paper-300 font-light leading-relaxed border-t border-white/5 pt-3">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-12 border-t border-white/10 text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight mb-4">READY TO DISCUSS YOUR STARTING POINT?</h3>
            <p className="text-sm sm:text-base text-paper-300 font-light mb-8">Tell Aian where you are now, what you want to achieve and what you need help staying with. Your application begins a conversation.</p>
            <button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"><span>Apply for BASELN / 6</span><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
};
