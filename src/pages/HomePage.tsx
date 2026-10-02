import React from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';
import { GoalCarousel } from '../components/GoalCarousel';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

const inclusionGroups = [
  {
    marker: '01',
    title: 'TRAINING',
    items: ['Individual programming', 'Home or gym', 'Demonstrations and technique', 'Progress tracking'],
  },
  {
    marker: '02',
    title: 'FOOD & LIFESTYLE',
    items: ['Personal nutrition structure', 'Flexible food choices', 'Shopping and eating-out guidance', 'Food and habit tracking', 'Sleep, stress and recovery'],
  },
  {
    marker: '03',
    title: 'COACHING & SUPPORT',
    items: ['Direct access to Aian', 'Accountability', 'Progress reviews', 'Zoom conversations', 'Training Room and community'],
  },
];

interface InclusionZoneProps {
  group: typeof inclusionGroups[number];
  className?: string;
}

const InclusionZone: React.FC<InclusionZoneProps> = ({ group, className = '' }) => (
  <article className={`group ${className}`}>
    <div className="flex items-baseline gap-3 pb-4 border-b border-white/15">
      <span className="font-serif text-3xl font-light leading-none text-smoke-400 transition-colors duration-300 group-hover:text-white">{group.marker}</span>
      <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-paper-200">{group.title}</h3>
    </div>
    <ul className="mt-5 space-y-3">
      {group.items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] sm:text-[17px] text-paper-200 font-normal leading-snug transition-colors duration-300 group-hover:text-white">
          <Check size={15} strokeWidth={2} className="text-smoke-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

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

      <section className="relative overflow-hidden bg-charcoal-850 border-y border-white/5 py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 14% 18%, rgba(151, 180, 200, 0.18), transparent 24%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.035), transparent 28%)' }} />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
          <header className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-4">WHAT’S INCLUDED</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[62px] font-light text-white leading-[0.98]"><span className="block">PRIVATE COACHING.</span><span className="block italic text-smoke-300">The full experience.</span></h2>
            </div>
            <p className="max-w-[290px] pb-1 text-sm sm:text-base text-paper-300 font-light leading-relaxed lg:text-right">The work is built around your programme, your actual week and a coach who stays involved.</p>
          </header>

          <div className="relative mt-10 sm:mt-14 lg:hidden">
            <div className="absolute left-[19px] top-0 bottom-10 border-l border-smoke-400/50" aria-hidden="true" />
            <div className="relative pl-10"><InclusionZone group={inclusionGroups[0]} /></div>
            <figure className="relative ml-10 mt-8 h-44 sm:h-56 overflow-hidden rounded-sm border border-white/10"><img src="/media/baseln-front-squat-coaching.png" alt="Aian coaching a front squat" className="w-full h-full object-cover object-[50%_39%] grayscale contrast-110" /></figure>
            <div className="relative mt-10 pl-10"><InclusionZone group={inclusionGroups[1]} /></div>
            <figure className="relative ml-10 mt-8 h-44 sm:h-56 overflow-hidden rounded-sm border border-white/10"><img src="/media/baseln-row-coaching.png" alt="Coaching and strength training in progress" className="w-full h-full object-cover object-[50%_54%] grayscale contrast-110" /></figure>
            <div className="relative mt-10 pl-10"><InclusionZone group={inclusionGroups[2]} /></div>
            <button onClick={exploreCoaching} className="relative ml-10 inline-flex items-center gap-2 mt-11 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
          </div>

          <div className="hidden lg:block relative mt-14 h-[750px] xl:h-[770px] border-y border-white/10">
            <div className="absolute left-[13%] top-[8%] h-[73%] border-l border-smoke-400/30 -rotate-[23deg] origin-top" aria-hidden="true" />
            <div className="absolute left-[37%] top-[31%] h-[53%] border-l border-smoke-400/40 rotate-[42deg] origin-top" aria-hidden="true" />
            <span className="absolute left-[16%] top-[23%] h-2.5 w-2.5 rounded-full bg-smoke-400 shadow-[0_0_0_7px_rgba(151,180,200,0.10)]" aria-hidden="true" />
            <span className="absolute right-[29%] top-[34%] h-2.5 w-2.5 rounded-full bg-smoke-400 shadow-[0_0_0_7px_rgba(151,180,200,0.10)]" aria-hidden="true" />
            <span className="absolute left-[49%] bottom-[21%] h-2.5 w-2.5 rounded-full bg-smoke-400 shadow-[0_0_0_7px_rgba(151,180,200,0.10)]" aria-hidden="true" />

            <InclusionZone group={inclusionGroups[0]} className="absolute left-0 top-14 w-[27%] z-10 transition-transform duration-500 hover:-translate-y-2" />
            <figure className="group absolute left-[31%] top-0 z-20 h-[400px] w-[25%] overflow-hidden border border-white/10 bg-charcoal-950 shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:rotate-[1deg]" style={{ clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0 94%)' }}>
              <img src="/media/baseln-front-squat-coaching.png" alt="Aian coaching a front squat" className="w-full h-full object-cover object-[50%_37%] grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <figcaption className="absolute bottom-6 left-6 text-[10px] font-mono uppercase tracking-[0.2em] text-paper-200">Coaching in the detail</figcaption>
            </figure>

            <InclusionZone group={inclusionGroups[1]} className="absolute right-0 top-[13%] w-[31%] z-10 transition-transform duration-500 hover:-translate-y-2" />
            <figure className="group absolute right-[4%] top-[49%] z-20 h-[205px] w-[38%] overflow-hidden border border-white/10 bg-charcoal-950 shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:-rotate-[1deg]" style={{ clipPath: 'polygon(0 0, 96% 6%, 100% 100%, 5% 94%)' }}>
              <img src="/media/baseln-gym-floor.png" alt="BASELN training floor in use" className="w-full h-full object-cover object-center grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-6 text-[10px] font-mono uppercase tracking-[0.2em] text-paper-100">Training made to fit real life</figcaption>
            </figure>

            <figure className="group absolute left-[5%] bottom-0 z-10 h-[245px] w-[31%] overflow-hidden border border-white/10 bg-charcoal-950 transition-transform duration-500 hover:-translate-y-3 hover:rotate-[1deg]" style={{ clipPath: 'polygon(0 7%, 94% 0, 100% 94%, 5% 100%)' }}>
              <img src="/media/baseln-row-coaching.png" alt="Aian providing hands-on coaching during a training session" className="w-full h-full object-cover object-[48%_55%] grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            </figure>
            <InclusionZone group={inclusionGroups[2]} className="absolute left-[43%] bottom-8 w-[43%] z-20 transition-transform duration-500 hover:-translate-y-2" />
            <button onClick={exploreCoaching} className="absolute right-0 bottom-3 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="bg-gradient-to-br from-charcoal-850 to-charcoal-950 p-8 sm:p-12 md:p-14 border border-white/10 rounded-sm relative overflow-hidden"><div className="max-w-3xl relative z-10"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU BEGIN</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight mb-5">PRIVATE COACHING STARTS HERE.</h2><div className="space-y-4 text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8"><p>BASELN / 6 is your first six weeks working with Aian. He learns where you’re starting, builds your training and nutrition approach around your goals, and coaches you as you put it into practice.</p><p>Aian reviews your training, answers questions and makes adjustments throughout the block. At six weeks, you review your progress together and decide what to focus on next. If you continue, the same private coaching carries forward, with a clearer understanding of what works for you.</p></div><button onClick={exploreCoaching} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal-950 px-6 py-3.5 rounded-sm hover:bg-paper-200 transition-colors shadow-lg"><span>See how coaching begins</span><ArrowRight size={16} /></button></div><div className="hidden lg:block absolute right-12 bottom-8 opacity-10 pointer-events-none"><span className="font-serif text-[160px] leading-none text-white select-none">/ 6</span></div></div></div></section>

      <section className="py-24 sm:py-28 bg-charcoal-950 text-center"><div className="max-w-[760px] mx-auto px-5 sm:px-8"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">GET STARTED</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-tight mb-5">TELL AIAN WHAT YOU WANT TO CHANGE.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8 max-w-xl mx-auto">You do not need to arrive fit, organised or certain which goal to choose. Tell him where you are, what you want to achieve and what has been getting in the way. Your application starts a conversation.</p><button onClick={apply} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Apply for coaching</span><ArrowRight size={16} /></button><div className="mt-8 text-xs text-paper-400/80 font-mono">Direct conversation · Personal coaching · No automated onboarding</div></div></section>
    </div>
  );
};
