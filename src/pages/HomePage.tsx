import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageRoute } from '../types';
import { GoalCarousel } from '../components/GoalCarousel';
import { trackEvent } from '../utils/analytics';

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
    items: ['Direct access to Aian', 'Weekly progress reviews', 'Technique video feedback', 'Accountability and habit support'],
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
    trackEvent('consultation_booking', { source: 'homepage_final_cta' });
    onNavigate('/online/register');
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
            <p className="text-base sm:text-lg md:text-xl text-paper-100 font-normal leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">Private coaching with Aian McLennan. Tailored training, nutrition guidance and accountability to keep you progressing.</p>
            <button onClick={exploreCoaching} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Explore private coaching</span><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">THE SERVICE</span><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">TRAIN FOR WHAT MATTERS TO YOU.</h2></div>
          <GoalCarousel />
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
            <p className="max-w-[290px] pb-1 text-sm sm:text-base text-paper-300 font-light leading-relaxed lg:text-right">Training, nutrition and ongoing feedback, coordinated by Aian around your goals.</p>
          </header>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 border-y border-white/10">
            {inclusionGroups.map((group, index) => (
              <div key={group.marker} className={`py-7 sm:py-9 min-w-0 ${index > 0 ? 'border-t md:border-t-0 md:border-l border-white/10 md:pl-7' : ''} ${index < 2 ? 'md:pr-7' : ''}`}>
                <InclusionZone group={group} />
              </div>
            ))}
          </div>
          <figure className="mt-7 sm:mt-9 h-52 sm:h-72 lg:h-80 overflow-hidden bg-charcoal-950">
            <img src="/media/baseln-front-squat-coaching.png" alt="Aian coaching a front squat" loading="lazy" className="w-full h-full object-cover object-[50%_39%] grayscale contrast-110" />
          </figure>
          <button onClick={exploreCoaching} className="inline-flex items-center gap-3 mt-7 py-3 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-300 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20 bg-charcoal-950 text-center border-b border-white/5">
        <div className="max-w-[650px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-tight mb-4">READY TO GET STARTED?</h2>
          <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-7 max-w-lg mx-auto">Tell Aian what you want to achieve. Your application starts a conversation.</p>
          <button onClick={apply} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"><span>Apply for coaching</span><ArrowRight size={16} /></button>
        </div>
      </section>
    </div>
  );
};
