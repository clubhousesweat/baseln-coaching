import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'Do I need to be fit already?',
      a: 'No. Aian starts with your current ability, schedule, relevant limitations and equipment. The work is built for where you are now—not an arbitrary fitness test.',
    },
    {
      q: 'Can I work on more than one goal?',
      a: 'Yes. You may want to get leaner, rebuild strength and train for a 5 km. Aian helps set the main priority so the plan stays realistic, while developing the supporting qualities that matter.',
    },
    {
      q: 'How many days will I train?',
      a: 'That is decided after your first conversation. Two sessions you can complete every week can be more useful than four sessions that do not fit your life.',
    },
    {
      q: 'Do I need a commercial gym?',
      a: 'No. Coaching can work around a commercial gym, boutique facility, garage setup or a well-planned home kit. Aian writes for the equipment you actually have.',
    },
    {
      q: 'How does food guidance work?',
      a: 'The level of structure matches the goal. It may start with reliable meal patterns and protein, or become more detailed where useful. Travel, restaurants and normal life stay part of the conversation.',
    },
    {
      q: 'What does BASELN / 6 cost?',
      a: 'The six-week investment and what ongoing coaching could look like are confirmed after a short fit conversation, before you decide whether to begin. This allows the scope of coaching to match your actual week, training needs and starting point. No payment is taken when you enquire.',
    },
  ];

  const goals = [
    { title: 'Lose body fat', desc: 'Build strength, create food habits you can live with and work towards a leaner body without turning life upside down.' },
    { title: 'Build muscle', desc: 'Train with enough direction and consistency to add muscle while keeping the training enjoyable and sustainable.' },
    { title: 'Get stronger', desc: 'Learn to move well, improve the lifts that matter to you and make steady progress without forcing the pace.' },
    { title: 'Improve fitness', desc: 'Build the energy and conditioning to train harder, feel better day to day and get more out of the activities you enjoy.' },
    { title: 'Prepare for an event or sport', desc: 'Build towards a race, hybrid event, athletic season or challenging recreational goal with the right work in the right place.' },
    { title: 'Return to training', desc: 'Find a sensible way back after time away, with a plan that builds confidence before intensity.' },
  ];

  const inclusions = [
    { num: '01', title: 'TRAINING BUILT AROUND YOU', body: 'A programme based on your objective, experience, equipment and available week.' },
    { num: '02', title: 'DIRECT ACCESS TO AIAN', body: 'Questions, workout notes and relevant technique footage go to the coach making the decisions.' },
    { num: '03', title: 'ACCOUNTABILITY WITH FOLLOW-THROUGH', body: 'The actions that matter are reviewed. When life changes the week, you work out the next move together.' },
    { num: '04', title: 'TECHNIQUE COACHING', body: 'Clear feedback on how to perform and progress the work, not a generic video library left for you to interpret alone.' },
    { num: '05', title: 'FOOD GUIDANCE FOR REAL LIFE', body: 'Practical structure around meals, protein and habits, adjusted to suit the goal and the way you actually live.' },
    { num: '06', title: 'A CLEAR REVIEW AND NEXT STEP', body: 'At the end of the first phase, you review what happened, what changed and what deserves attention next.' },
  ];

  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 border-b border-white/10 bg-gradient-to-b from-charcoal-950 to-charcoal-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-smoke-400">BASELN / PRIVATE COACHING</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.04]">
                <span className="block">YOUR OBJECTIVE</span>
                <span className="block">SETS THE WORK.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed max-w-2xl">
                Train directly with Aian McLennan. Your training, food guidance and coaching priorities are built around your goal and starting point. He stays involved as you work: teaching technique, reviewing progress and helping you decide what comes next.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"
                >
                  <span>Apply to work with Aian</span><ArrowRight size={16} />
                </button>
                <a href="#inclusions" className="inline-flex items-center justify-center text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-300 hover:text-white px-5 py-4 transition-colors">See what coaching includes ↓</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian coaching one person" className="w-full h-auto object-cover contrast-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-65" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">Aian McLennan · Direct coach review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-11">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">WHAT YOU CAN WORK ON</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">YOUR GOAL SETS THE EMPHASIS.</h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">Your goal may cross several of these areas. Aian helps establish the order of priorities so the plan feels useful, not overbuilt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal, idx) => (
              <div key={goal.title} className="p-6 bg-charcoal-850 border border-white/5 rounded-sm hover:border-white/15 transition-all group">
                <div className="text-[11px] font-mono text-smoke-400 uppercase tracking-widest mb-3">0{idx + 1}</div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2 group-hover:text-smoke-300 transition-colors">{goal.title}</h3>
                <p className="text-sm text-paper-400 leading-relaxed font-light">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inclusions" className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-11">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">WHAT IS INCLUDED</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">PRIVATE COACHING, CLEARLY EXPLAINED.</h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">You bring the goal. Aian builds the work, teaches you how to do it, helps you make food and habits work for you, and stays involved while the plan is in motion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden border border-white/10">
            {inclusions.map((inc) => (
              <div key={inc.num} className="bg-charcoal-900 p-7 sm:p-8 hover:bg-charcoal-850 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-smoke-400 font-bold pt-1">{inc.num}</span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide uppercase mb-2">{inc.title}</h3>
                    <p className="text-sm text-paper-400 font-light leading-relaxed">{inc.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">BASELN / 6</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">SIX WEEKS. A CLEAR START.</h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">BASELN / 6 is the opening phase of private coaching. It gives Aian enough time to understand your real response to the work and gives you a clear view of what to do next.</p>
              <button onClick={() => { onNavigate('/how-it-works'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 pt-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors">
                <span>See how coaching decisions are made</span><ArrowRight size={16} />
              </button>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                { num: '01', title: 'A short fit conversation', detail: 'You discuss your objective, week, training history and what is getting in the way.' },
                { num: '02', title: 'Your first block', detail: 'Aian writes the initial training and food approach around the information that matters.' },
                { num: '03', title: 'Direct review while you train', detail: 'You complete the work, ask questions and share feedback so the plan can respond to real life.' },
                { num: '04', title: 'A six-week review', detail: 'You look at what changed, what worked and whether ongoing coaching is the right next move.' },
              ].map((step) => (
                <div key={step.num} className="p-6 bg-charcoal-850 border border-white/5 rounded-sm">
                  <span className="font-mono text-xs text-smoke-400">{step.num}</span>
                  <h3 className="font-serif text-xl text-white mt-3 mb-2">{step.title}</h3>
                  <p className="text-sm text-paper-400 leading-relaxed font-light">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">COMMERCIAL CLARITY</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight uppercase">WHAT HAPPENS BEFORE YOU START.</h2>
              <div className="bg-charcoal-900 border border-white/10 rounded-sm p-6 space-y-4 text-sm">
                <div className="flex justify-between gap-6 pb-3 border-b border-white/5"><span className="text-paper-400">Starting phase</span><span className="text-white font-semibold text-right">BASELN / 6 (6 weeks)</span></div>
                <div className="flex justify-between gap-6 pb-3 border-b border-white/5"><span className="text-paper-400">Coaching</span><span className="text-white font-medium text-right">1:1 with Aian directly</span></div>
                <div className="flex justify-between gap-6 pb-3 border-b border-white/5"><span className="text-paper-400">Investment</span><span className="text-white font-medium text-right">Confirmed after fit conversation</span></div>
                <div className="flex justify-between gap-6"><span className="text-paper-400">Ongoing coaching</span><span className="text-white font-medium text-right">Discussed at the six-week review</span></div>
              </div>
              <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">The short fit conversation allows Aian to understand the support required and gives you the six-week investment and continuation options before you choose whether to proceed. An enquiry does not take payment or commit you to coaching.</p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">BUYING QUESTIONS</span>
              {faqItems.map((item, idx) => (
                <div key={item.q} className="border border-white/10 bg-charcoal-900 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors focus:outline-none" aria-expanded={openFaq === idx}>
                    <span className="text-sm sm:text-base font-semibold text-white">{item.q}</span>
                    <ChevronDown size={18} className={`text-smoke-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && <div className="px-5 pb-5 text-xs sm:text-sm text-paper-300 font-light leading-relaxed border-t border-white/5 pt-3">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/10 text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight uppercase mb-4">WHAT DO YOU WANT TO CHANGE IN THE NEXT SIX WEEKS?</h3>
            <p className="text-sm sm:text-base text-paper-300 font-light mb-8">Tell Aian where you are now, what you want to achieve and what you need help staying with. Your application begins a conversation.</p>
            <button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all">
              <span>Apply for BASELN / 6</span><ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
