import React from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';
import { GoalCarousel } from '../components/GoalCarousel';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

const inclusionGroups = [
  {
    title: 'TRAINING',
    items: ['Individual programming', 'Home or gym', 'Demonstrations and technique', 'Progress tracking'],
  },
  {
    title: 'FOOD & LIFESTYLE',
    items: ['Personal nutrition structure', 'Flexible food choices', 'Shopping and eating-out guidance', 'Food and habit tracking', 'Sleep, stress and recovery'],
  },
  {
    title: 'COACHING & SUPPORT',
    items: ['Direct access to Aian', 'Accountability', 'Progress reviews', 'Zoom conversations', 'Training Room and community'],
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const exploreCoaching = () => {
    onNavigate('/coaching');
    window.scrollTo(0, 0);
  };

  const apply = () => {
    onNavigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20">
      <section className="relative min-h-[84vh] sm:min-h-[760px] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal-950">
          <video autoPlay loop muted playsInline preload="auto" poster="/media/Header_Banner_Background_c72ecdc900_c5b08867.jpg" className="w-full h-full object-cover object-[44%_center] sm:object-center opacity-100 sm:opacity-65 brightness-110 contrast-105 saturate-75">
            <source src="/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/18 via-charcoal-950/28 to-charcoal-950/84 sm:bg-gradient-to-r sm:from-charcoal-950/95 sm:via-charcoal-950/72 sm:to-charcoal-950/20" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-transparent to-charcoal-950/25" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-charcoal-950/70 border border-white/15 rounded-full mb-6 backdrop-blur-[2px]"><span className="w-2 h-2 rounded-full bg-smoke-400 animate-pulse" /><span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-paper-100">BASELN / PRIVATE ONLINE COACHING</span></div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] font-light text-white mb-5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"><span className="block">NOT MADE FOR EVERYONE.</span><span className="italic font-normal text-smoke-300 block">Made for you.</span></h1>
            <p className="text-base sm:text-lg md:text-xl text-paper-100 font-normal leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">Private online coaching with Aian McLennan. Training built for your goal, guidance on food and habits, and a coach who checks in, teaches the work and keeps you moving when life gets in the way.</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"><button onClick={exploreCoaching} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Explore private coaching</span><ArrowRight size={16} /></button><button onClick={apply} className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-100 hover:text-white px-6 py-4 transition-colors"><span>Apply to work with Aian</span><ChevronRight size={16} className="text-smoke-300" /></button></div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">THE SERVICE</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">TRAIN FOR WHAT MATTERS TO YOU.</h2><p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">Come with a goal, a few goals, or the simple knowledge that your training needs to change. Aian works out what deserves priority, builds the training around your starting point and stays involved while you put it into practice.</p></div>
          <GoalCarousel />
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-paper-300 font-light leading-relaxed">Your goals can overlap. Aian decides what needs attention first and builds from there.</p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal-850 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 xl:gap-x-14 gap-y-10">
            <div className="contents lg:block lg:col-span-5">
              <div className="order-1">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-[1.04]"><span className="block">PRIVATE COACHING.</span><span className="block italic text-smoke-300">The full experience.</span></h2>
                <span className="inline-flex mt-5 bg-smoke-500 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-charcoal-950">WHAT’S INCLUDED</span>
                <div className="mt-7 h-px bg-white/15" />
              </div>
              <figure className="order-3 mt-2 lg:mt-10 h-[225px] sm:h-[280px] lg:h-[515px] overflow-hidden rounded-sm bg-charcoal-950">
                <img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian McLennan coaching a client" className="w-full h-full object-cover object-[50%_40%] grayscale contrast-110" />
              </figure>
            </div>

            <div className="order-2 lg:col-span-7 lg:pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9 sm:gap-y-11">
                {inclusionGroups.map((group, groupIndex) => (
                  <div key={group.title} className={groupIndex === 2 ? 'md:col-span-2' : ''}>
                    <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-smoke-400 mb-5">{group.title}</h3>
                    <ul className={`space-y-3 ${groupIndex === 2 ? 'md:grid md:grid-cols-2 md:gap-x-12 md:space-y-0 md:gap-y-3' : ''}`}>
                      {group.items.map((item) => <li key={item} className="flex items-start gap-3 text-base sm:text-[17px] text-paper-100 font-normal leading-snug"><Check size={16} strokeWidth={2} className="text-smoke-400 shrink-0 mt-0.5" aria-hidden="true" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <button onClick={exploreCoaching} className="inline-flex items-center gap-2 mt-11 sm:mt-14 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="bg-gradient-to-br from-charcoal-850 to-charcoal-950 p-8 sm:p-12 md:p-14 border border-white/10 rounded-sm relative overflow-hidden"><div className="max-w-3xl relative z-10"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU BEGIN</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight mb-5">PRIVATE COACHING STARTS HERE.</h2><div className="space-y-4 text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8"><p>BASELN / 6 is your first six weeks working with Aian. He learns where you’re starting, builds your training and nutrition approach around your goals, and coaches you as you put it into practice.</p><p>Aian reviews your training, answers questions and makes adjustments throughout the block. At six weeks, you review your progress together and decide what to focus on next. If you continue, the same private coaching carries forward, with a clearer understanding of what works for you.</p></div><button onClick={exploreCoaching} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal-950 px-6 py-3.5 rounded-sm hover:bg-paper-200 transition-colors shadow-lg"><span>See how coaching begins</span><ArrowRight size={16} /></button></div><div className="hidden lg:block absolute right-12 bottom-8 opacity-10 pointer-events-none"><span className="font-serif text-[160px] leading-none text-white select-none">/ 6</span></div></div></div></section>

      <section className="py-24 sm:py-28 bg-charcoal-950 text-center"><div className="max-w-[760px] mx-auto px-5 sm:px-8"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">GET STARTED</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-tight mb-5">TELL AIAN WHAT YOU WANT TO CHANGE.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8 max-w-xl mx-auto">You do not need to arrive fit, organised or certain which goal to choose. Tell him where you are, what you want to achieve and what has been getting in the way. Your application starts a conversation.</p><button onClick={apply} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Apply for coaching</span><ArrowRight size={16} /></button><div className="mt-8 text-xs text-paper-400/80 font-mono">Direct conversation · Personal coaching · No automated onboarding</div></div></section>
    </div>
  );
};
