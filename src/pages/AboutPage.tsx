import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const apply = () => {
    onNavigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24 bg-charcoal-900">
      {/* 01 — Coach portrait / manifesto */}
      <section className="relative overflow-hidden bg-charcoal-950 border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 84% 22%, rgba(151,180,200,0.20), transparent 26%), linear-gradient(120deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: 'auto, 32px 32px' }} />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-7 relative z-10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-charcoal-900/90 border border-white/15 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-smoke-400" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-paper-200">MEET YOUR COACH</span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-light text-white leading-[0.88] tracking-tight">
                AIAN<br />McLENNAN.
              </h1>
              <div className="mt-5 sm:mt-6 flex items-center gap-3 text-sm sm:text-base text-smoke-300">
                <span className="h-px w-10 bg-smoke-400" />
                <span className="font-serif italic text-xl sm:text-2xl">Founder & Coach.</span>
              </div>
              <p className="mt-8 max-w-xl text-base sm:text-lg text-paper-200 font-light leading-relaxed">
                Aian’s background spans personal training, strength and conditioning, athletic performance, and founding and operating fitness facilities in Australia.
              </p>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                His approach combines detailed programming, practical teaching and personal accountability. Through BASELN, you work with him directly—from understanding your goals to learning the techniques and building the habits that support your progress.
              </p>
              <p className="mt-6 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-smoke-400">
                Fitness Facility Founder · Operator · Industry Leader
              </p>
            </div>

            {/* A deliberately irregular documentary portrait field */}
            <div className="lg:col-span-5 relative lg:pb-7">
              <div className="relative ml-5 sm:ml-12 lg:ml-0 aspect-[4/5] sm:aspect-[16/13] lg:aspect-[4/5] overflow-hidden bg-charcoal-900 border border-white/15 shadow-2xl" style={{ clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 94%)' }}>
                <img
                  src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png"
                  alt="Aian McLennan coaching in the training environment"
                  className="w-full h-full object-cover object-center grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-transparent to-charcoal-950/10" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 bg-charcoal-950/75 border border-white/15 rounded-full text-[9px] font-mono uppercase tracking-widest text-paper-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-smoke-400" /> Documentary field note
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-paper-200">
                  <span>Direct coaching</span><span className="text-smoke-300">01 / 03</span>
                </div>
              </div>
              <div className="absolute -left-1 sm:left-3 lg:-left-9 bottom-7 sm:bottom-10 lg:bottom-14 h-24 w-24 sm:h-28 sm:w-28 border border-smoke-400/60 bg-charcoal-950/90 backdrop-blur-sm flex flex-col justify-between p-3 shadow-xl">
                <span className="text-[9px] font-mono uppercase tracking-widest text-smoke-300">BASELN</span>
                <span className="font-serif text-3xl sm:text-4xl italic text-paper-100">A.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Experience, placed as a typographic spread rather than cards */}
      <section className="relative overflow-hidden bg-charcoal-900 border-b border-white/5 py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">02 / EXPERIENCE</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[58px] font-light text-white leading-[0.96]">
                EXPERIENCE THAT SHAPES <span className="italic text-smoke-300">YOUR TRAINING.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2 space-y-7">
              <p className="text-xl sm:text-2xl md:text-[28px] font-serif font-light text-paper-100 leading-relaxed">
                Aian has designed individual programmes, developed coaches and led private and group training environments.
              </p>
              <div className="border-l border-smoke-400 pl-6 sm:pl-8 space-y-6 text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                <p>
                  His experience includes coaching Hollywood actors and some of Australia’s top athletes, alongside busy parents, everyday gym members and people starting from scratch. That range has shaped his ability to coach different bodies, ambitions and levels of experience.
                </p>
                <p>
                  Whether you want to lose body fat, build muscle, improve fitness or prepare for an event, Aian sets the priorities and explains how your training will get you working towards them.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 pt-4 border-t border-white/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-paper-400">
                <span>Programming</span>
                <span>Coaching craft</span>
                <span>Performance</span>
                <span>Clear priorities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — High standards close; image becomes texture, not a conventional content block */}
      <section className="relative overflow-hidden bg-charcoal-950 border-b border-white/10">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[44%] opacity-25 lg:opacity-35">
          <img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="" className="w-full h-full object-cover grayscale contrast-125 object-[70%_center]" />
          <div className="absolute inset-0 bg-gradient-to-l from-charcoal-950/10 via-charcoal-950/75 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/20" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">03 / THE STANDARD</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[62px] font-light text-white leading-[0.94]">
              HIGH STANDARDS.<br /><span className="italic text-smoke-300">PERSONAL ATTENTION.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base sm:text-lg text-paper-200 font-light leading-relaxed">
              <p>Aian takes the time to understand where you’re starting, what you enjoy and where you need support.</p>
              <p>You receive detailed training instruction, practical nutrition guidance and direct feedback. Learn how to train effectively and live well while keeping room for restaurants, weekends away and the things you enjoy.</p>
            </div>
            <p className="mt-8 font-serif text-2xl sm:text-3xl text-paper-100 leading-tight">
              Your experience determines the training. <span className="italic text-smoke-300">Your goals receive his full attention.</span>
            </p>
            <button onClick={apply} className="inline-flex items-center gap-3 mt-10 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all">
              <span>Apply to work with Aian</span><ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
