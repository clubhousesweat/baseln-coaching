import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

const benefits = [
  {
    title: 'YOUR TRAINING, DESIGNED IN DETAIL.',
    copy: 'Strength, muscle development, conditioning and event preparation programmed around your goals and experience. Exercises, loads, progressions and session structure have a purpose.',
    layout: 'lg:col-span-7 bg-charcoal-850 text-white',
  },
  {
    title: 'DIRECT ACCESS TO THE EXPERT.',
    copy: 'Work with Aian himself. Ask questions, send training footage and discuss what needs attention with the person designing and overseeing your training.',
    layout: 'lg:col-span-5 bg-smoke-500 text-charcoal-950',
  },
  {
    title: 'ACCOUNTABILITY THAT MEANS SOMETHING.',
    copy: 'Your training and agreed habits are reviewed. When consistency slips, Aian helps identify the obstacle, agree on the next action and get the work moving again.',
    layout: 'lg:col-span-5 bg-charcoal-900 text-white',
  },
  {
    title: 'EAT WELL. STILL ENJOY YOUR LIFE.',
    copy: 'Get nutrition guidance at the level you need, with practical ways to manage meals, restaurants, travel and weekends while working towards your goal.',
    layout: 'lg:col-span-7 bg-gradient-to-br from-charcoal-850 to-charcoal-950 text-white',
  },
];

const startSteps = ['Speak with Aian', 'Get your programme', 'Begin coaching'];

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-18 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-center">
            <div className="order-1 space-y-6 lg:pr-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">BASELN / PRIVATE COACHING</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-light text-white leading-[1.02]">
                <span className="block">PRIVATE COACHING.</span>
                <span className="block italic text-smoke-300">THE FULL EXPERIENCE.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed max-w-xl">Individual training, practical nutrition guidance and direct coaching with Aian McLennan. Know what to do, learn how to do it well, and have someone paying attention to your progress.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-2 pt-1 text-xs sm:text-sm uppercase tracking-widest text-paper-300 font-semibold">
                {['Tailored training', 'Direct coach access', 'Technique feedback', 'Accountability'].map((item, index) => <React.Fragment key={item}><span>{item}</span>{index < 3 && <span className="text-smoke-400">·</span>}</React.Fragment>)}
              </div>
              <div className="pt-2"><button onClick={apply} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"><span>Apply to work with Aian</span><ArrowRight size={16} /></button></div>
            </div>
            <div className="order-2 relative h-[240px] sm:h-[330px] lg:h-[520px] rounded-sm overflow-hidden shadow-2xl bg-charcoal-850">
              <img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian McLennan coaching one person directly" className="w-full h-full object-cover object-[50%_42%] lg:object-center contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-xs font-mono uppercase tracking-wider text-paper-200">Aian McLennan — your coach</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">THE COMPLETE OFFER</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">WHAT YOU’RE ACTUALLY GETTING.</h2><p className="mt-4 text-base sm:text-lg text-paper-300 font-light leading-relaxed">Not a generic programme sent once and forgotten. Aian designs the work, stays close to the details and helps you keep moving when the week does not go to plan.</p></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            {benefits.map((benefit, index) => <article key={benefit.title} className={`${benefit.layout} min-h-[230px] sm:min-h-[255px] p-6 sm:p-8 flex flex-col justify-between rounded-sm`}><span className={`text-xs font-mono uppercase tracking-widest ${index === 1 ? 'text-charcoal-950/60' : 'text-smoke-400'}`}>0{index + 1} / Private coaching</span><div><h3 className="font-serif text-2xl sm:text-[29px] font-light leading-[1.08] mb-4">{benefit.title}</h3><p className={`text-base sm:text-[17px] font-light leading-relaxed max-w-2xl ${index === 1 ? 'text-charcoal-950/80' : 'text-paper-300'}`}>{benefit.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal-950 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6 space-y-5"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">WORKING WITH AIAN</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight"><span className="block">TRAIN WITH GUIDANCE.</span><span className="block italic text-smoke-300">KEEP LEARNING AS YOU GO.</span></h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">Learn how to execute your exercises, understand your training and recognise when to progress. Aian reviews your records and relevant footage, explains what needs attention and helps you make better decisions between sessions.</p></div>
            <div className="lg:col-span-6">
              <div className="divide-y divide-white/10 border-y border-white/10">
                {[{ label: 'Training Room', copy: 'Your sessions, exercise guidance, training records and progress.' }, { label: 'WhatsApp', copy: 'Direct questions, updates and relevant training footage.' }, { label: 'Zoom', copy: 'Scheduled one-to-one conversations for assessment, review and deeper discussion.' }].map((item) => <div key={item.label} className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-7"><h3 className="w-40 shrink-0 text-base font-semibold text-white">{item.label}</h3><p className="text-base text-paper-300 font-light leading-relaxed">{item.copy}</p></div>)}
              </div>
              <p className="mt-6 text-base sm:text-lg text-smoke-300 font-light leading-relaxed">Weekly reviews give your progress a dedicated checkpoint, alongside coaching communication throughout the week.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="bg-charcoal-850 rounded-sm p-7 sm:p-10 lg:p-12 overflow-hidden relative">
            <div className="absolute -right-2 -top-12 font-serif text-[210px] leading-none text-white/[0.035] select-none pointer-events-none">/ 6</div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
              <div className="lg:col-span-5"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU START</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight">YOUR FIRST BLOCK.</h2></div>
              <div className="lg:col-span-7"><div className="space-y-4 text-base sm:text-lg text-paper-300 font-light leading-relaxed"><p>Coaching begins with a conversation and assessment. Aian builds your training and nutrition approach, then you start working towards your goal as soon as your programme is ready.</p><p>Your opening block runs for six weeks, with coaching, feedback and progress reviews throughout. At the end, you review the results together and agree on the next direction. Ongoing coaching builds from there.</p></div><div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-sm overflow-hidden"><div className="bg-charcoal-900 px-5 py-5"><span className="font-mono text-xs text-smoke-400">01</span><p className="mt-3 text-base text-white font-medium">Speak with Aian</p></div><div className="bg-charcoal-900 px-5 py-5"><span className="font-mono text-xs text-smoke-400">02</span><p className="mt-3 text-base text-white font-medium">Get your programme</p></div><div className="bg-charcoal-900 px-5 py-5"><span className="font-mono text-xs text-smoke-400">03</span><p className="mt-3 text-base text-white font-medium">Begin coaching</p></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">PRACTICAL DETAILS</span><h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">A FEW THINGS YOU MIGHT WANT TO KNOW.</h2><p className="mt-4 text-base sm:text-lg text-paper-300 font-light leading-relaxed">The important questions, answered plainly. If yours is not here, include it in your application and Aian will address it directly.</p></div>
            <div className="lg:col-span-7 space-y-3">{faqItems.map((item, index) => <div key={item.q} className="border-b border-white/10"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full py-5 text-left flex items-start justify-between gap-5 hover:text-smoke-300 transition-colors focus:outline-none" aria-expanded={openFaq === index}><span className="text-base sm:text-lg font-semibold text-white leading-snug">{item.q}</span><ChevronDown size={19} className={`text-smoke-400 shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <div className="pb-5 pr-8 text-base text-paper-300 font-light leading-relaxed">{item.a}</div>}</div>)}</div>
          </div>
          <div className="mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10 text-center max-w-2xl mx-auto"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">START THE CONVERSATION</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight mb-5">LET’S TALK ABOUT WHAT YOU WANT TO ACHIEVE.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-4">Tell Aian what you want help with, where you’re starting and what training needs to fit around.</p><p className="text-sm text-paper-400 font-light leading-relaxed mb-8">Aian reviews every enquiry personally and aims to respond within 24–48 business hours.</p><button onClick={apply} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"><span>Apply to work with Aian</span><ArrowRight size={16} /></button></div>
        </div>
      </section>
    </div>
  );
};
