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
      {/* 01 — clean coach introduction */}
      <section className="relative overflow-hidden bg-charcoal-950 border-b border-white/10">
        <div className="absolute top-0 right-[8%] hidden lg:block h-full w-px bg-white/5" />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-smoke-400">
                <span className="h-px w-8 bg-smoke-400" />
                <span>MEET YOUR COACH</span>
              </div>
              <h1 className="mt-7 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-light text-white leading-[0.87] tracking-tight">
                AIAN<br />McLENNAN.
              </h1>
              <p className="mt-5 font-serif text-2xl sm:text-3xl italic text-smoke-300">Founder & Coach.</p>
              <div className="mt-8 max-w-xl space-y-5 text-base sm:text-lg text-paper-200 font-light leading-relaxed">
                <p>Aian’s background spans personal training, strength and conditioning, athletic performance, and founding and operating fitness facilities in Australia.</p>
                <p className="text-paper-300">His approach combines detailed programming, practical teaching and personal accountability. Through BASELN, you work with him directly—from understanding your goals to learning the techniques and building the habits that support your progress.</p>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[4/5] border border-white/10 bg-charcoal-900 shadow-2xl">
                <img
                  src="/media/baseln-front-squat-coaching.png"
                  alt="Aian McLennan coaching a front squat"
                  className="h-full w-full object-cover object-[54%_46%] grayscale contrast-110"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-paper-400">
                <span>Live coaching session</span>
                <span className="text-smoke-400">Aian / 01</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 — mineral experience sheet */}
      <section className="relative overflow-hidden bg-smoke-500 text-charcoal-950 border-b border-charcoal-950/10">
        <div className="absolute -right-4 -top-9 font-serif text-[210px] sm:text-[290px] leading-none text-charcoal-950/[0.07] pointer-events-none select-none">02</div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-charcoal-950/65 block mb-4">02 / EXPERIENCE</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[58px] font-light leading-[0.94] tracking-tight">
                EXPERIENCE THAT SHAPES <span className="italic">YOUR TRAINING.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-1 space-y-7">
              <p className="font-serif text-2xl sm:text-3xl font-light leading-relaxed">
                Aian’s experience spans individual coaching, coach development, and founding and operating fitness facilities in Australia.
              </p>
              <div className="border-l-2 border-charcoal-950/70 pl-6 sm:pl-8 space-y-6 text-base sm:text-lg text-charcoal-950/80 font-light leading-relaxed">
                <p>He has coached elite Australian athletes and actors working in film and television, alongside busy parents, first-time gym members and people returning to training.</p>
                <p>That breadth of experience informs how he coaches: clear instruction, attention to detail and an approach tailored to the person. Whatever your starting point, you receive direct guidance, practical support and the accountability to keep progressing.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 pt-5 border-t border-charcoal-950/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-charcoal-950/65">
                <span>Programming</span><span>Coaching craft</span><span>Performance</span><span>Clear priorities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — clear conclusion without another coaching photograph */}
      <section className="bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-smoke-400">
              <span className="h-px w-8 bg-smoke-400" />
              <span>03 / THE STANDARD</span>
            </div>
            <h2 className="mt-7 font-serif text-4xl sm:text-5xl md:text-[64px] font-light text-white leading-[0.93] tracking-tight">
              HIGH STANDARDS.<br /><span className="italic text-smoke-300">PERSONAL ATTENTION.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base sm:text-lg text-paper-200 font-light leading-relaxed">
              <p>Aian takes the time to understand where you’re starting, what you enjoy and where you need support.</p>
              <p className="text-paper-300">You receive detailed training instruction, practical nutrition guidance and direct feedback. Learn how to train effectively and live well while keeping room for restaurants, weekends away and the things you enjoy.</p>
            </div>
            <div className="mt-10 pt-7 border-t border-white/10 max-w-2xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7">
              <p className="font-serif text-2xl sm:text-3xl text-paper-100 leading-tight max-w-xl">Your experience determines the training. <span className="italic text-smoke-300">Your goals receive his full attention.</span></p>
              <button onClick={apply} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-charcoal-950 bg-smoke-500 hover:bg-smoke-400 px-6 py-4 transition-colors shrink-0">
                <span>Apply to work with Aian</span><ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
