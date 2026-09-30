import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

const goals = ['Lose body fat', 'Build muscle', 'Get stronger', 'Improve fitness', 'Prepare for an event', 'Return to training'];

const primaryInclusions = [
  { num: '01', title: 'Training built for you', copy: 'Sessions shaped around your goal, experience, equipment and the time you actually have.' },
  { num: '02', title: 'Aian, directly', copy: 'Questions, updates and training footage go to the coach who designs and oversees your work.' },
  { num: '03', title: 'Accountability with follow-through', copy: 'Agreed sessions and habits are reviewed. When momentum slips, you address what happened and decide what comes next.' },
];

const supportingInclusions = [
  { num: '04', title: 'Technique coaching', copy: 'Specific feedback helps you lift, move and progress with more confidence.' },
  { num: '05', title: 'Food guidance for real life', copy: 'The level of structure your goal needs, with practical ways to handle restaurants, travel and weekends.' },
  { num: '06', title: 'Training that can adapt', copy: 'When your week changes, Aian helps decide what to keep, shorten, move or modify.' },
  { num: '07', title: 'Progress reviews', copy: 'Track the measures relevant to your goal and understand what the results are showing.' },
  { num: '08', title: 'Your private Training Room', copy: 'Your sessions, training record, progress and coaching communication in one place.' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      <section className="relative min-h-[84vh] sm:min-h-[760px] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal-950">
          <video autoPlay loop muted playsInline poster="/media/Header_Banner_Background_c72ecdc900_c5b08867.jpg" className="w-full h-full object-cover object-center opacity-65 brightness-110 contrast-105 saturate-75">
            <source src="/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/72 to-charcoal-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-transparent to-charcoal-950/25" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full mb-6"><span className="w-2 h-2 rounded-full bg-smoke-400 animate-pulse" /><span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-paper-200">BASELN / PRIVATE ONLINE COACHING</span></div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] font-light text-paper-50 mb-5"><span className="block">NOT MADE FOR EVERYONE.</span><span className="italic font-normal text-smoke-300 block">Made for you.</span></h1>
            <p className="text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed mb-8 max-w-xl">Private online coaching with Aian McLennan. Training built for your goal, guidance on food and habits, and a coach who checks in, teaches the work and keeps you moving when life gets in the way.</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"><button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Explore private coaching</span><ArrowRight size={16} /></button><button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-100 hover:text-white px-6 py-4 transition-colors"><span>Apply to work with Aian</span><ChevronRight size={16} className="text-smoke-300" /></button></div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">THE SERVICE</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">TRAIN FOR WHAT MATTERS TO YOU.</h2><p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">Come with a goal, a few goals, or the simple knowledge that your training needs to change. Aian works out what deserves priority, builds the training around your starting point and stays involved while you put it into practice.</p></div>

          <div className="grid grid-cols-2 md:grid-cols-3 border-y border-white/10">
            {goals.map((goal, index) => <div key={goal} className={`group min-h-[105px] sm:min-h-[132px] p-4 sm:p-5 flex flex-col justify-between ${index % 2 === 0 ? 'border-r border-white/10 md:border-r-0' : ''} ${index < 4 ? 'border-b border-white/10 md:border-b-0' : ''} ${index % 3 !== 2 ? 'md:border-r md:border-white/10' : ''}`}><span className="font-mono text-[11px] text-smoke-400">0{index + 1}</span><span className="font-serif text-xl sm:text-2xl text-paper-100 leading-[1.08] group-hover:text-smoke-300 transition-colors">{goal}</span></div>)}
          </div>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-paper-300 font-light leading-relaxed">Your goals can overlap. Aian decides what needs attention first and builds from there.</p>

          <div className="mt-14 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10"><div className="flex items-end justify-between gap-6 mb-6 sm:mb-8"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400">WHAT PRIVATE COACHING INCLUDES</span><span className="hidden sm:block text-xs text-paper-400">Built around your objective. Reviewed while you train.</span></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {primaryInclusions.map((item, index) => <div key={item.num} className={`relative min-h-[245px] p-6 sm:p-7 border rounded-sm overflow-hidden ${index === 1 ? 'bg-smoke-500 text-charcoal-950 border-smoke-400' : 'bg-charcoal-850 border-white/10 text-white'}`}><span className={`font-mono text-xs ${index === 1 ? 'text-charcoal-950/65' : 'text-smoke-400'}`}>{item.num}</span><div className="absolute top-6 right-6 text-[74px] leading-none font-serif opacity-[0.08] select-none">{item.num}</div><div className="relative mt-10"><h3 className="font-serif text-2xl sm:text-[28px] leading-[1.05] mb-4">{item.title}</h3><p className={`text-sm sm:text-base leading-relaxed font-light ${index === 1 ? 'text-charcoal-950/80' : 'text-paper-300'}`}>{item.copy}</p></div></div>)}
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
              {supportingInclusions.map((item) => <div key={item.num} className="bg-charcoal-900 px-5 py-5 sm:px-6 sm:py-5 flex gap-4 hover:bg-charcoal-850 transition-colors"><span className="font-mono text-xs text-smoke-400 pt-1">{item.num}</span><div><h3 className="text-sm sm:text-base font-semibold text-white mb-1">{item.title}</h3><p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">{item.copy}</p></div></div>)}
            </div>
            <button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 mt-8 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="bg-gradient-to-br from-charcoal-850 to-charcoal-950 p-8 sm:p-12 md:p-14 border border-white/10 rounded-sm relative overflow-hidden"><div className="max-w-3xl relative z-10"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU BEGIN</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight mb-5">SIX WEEKS. A PROPER START.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-7">BASELN / 6 is the first six weeks of private coaching. Once your work is ready, you begin training towards your goal. At week six, you have a proper review of what happened and a clear conversation about what comes next.</p><button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal-950 px-6 py-3.5 rounded-sm hover:bg-paper-200 transition-colors shadow-lg"><span>See how BASELN / 6 works</span><ArrowRight size={16} /></button></div><div className="hidden lg:block absolute right-12 bottom-8 opacity-10 pointer-events-none"><span className="font-serif text-[160px] leading-none text-white select-none">/ 6</span></div></div></div></section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><div className="lg:col-span-5 order-2 lg:order-1"><div className="relative rounded-sm overflow-hidden border border-white/10 group shadow-2xl"><img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian McLennan coaching one person directly" className="w-full h-auto object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-75" /><div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300 tracking-wider">Aian McLennan · Coaching in practice</div></div></div><div className="lg:col-span-7 order-1 lg:order-2 space-y-5"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">THE COACH</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">WORK DIRECTLY WITH AIAN.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">Aian founded and operated The Clubhouse, a boutique fitness facility built around keeping people involved in training. His work spans strength and conditioning, fitness, wellbeing and operational leadership. BASELN brings that practical coaching standard into a private online setting.</p><button onClick={() => { onNavigate('/about'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 pt-1 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Meet Aian</span><ArrowRight size={16} /></button></div></div></div></section>

      <section className="py-24 sm:py-28 bg-charcoal-950 text-center"><div className="max-w-[760px] mx-auto px-5 sm:px-8"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">GET STARTED</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-tight mb-5">TELL AIAN WHAT YOU WANT TO CHANGE.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8 max-w-xl mx-auto">You do not need to arrive fit, organised or certain which goal to choose. Tell him where you are, what you want to achieve and what has been getting in the way. Your application starts a conversation.</p><button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Apply for coaching</span><ArrowRight size={16} /></button><div className="mt-8 text-xs text-paper-400/80 font-mono">Direct conversation · Personal coaching · No automated onboarding</div></div></section>
    </div>
  );
};
