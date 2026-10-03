import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (path: PageRoute) => void;
}

const background = [
  {
    index: '01',
    period: 'STRENGTH & PERFORMANCE',
    role: 'Coaching Built on Practical Demands',
    detail: 'Aian’s background spans strength and conditioning, athletic preparation, and private coaching for clients with demanding professions, travel routines, and high personal standards.',
  },
  {
    index: '02',
    period: 'THE CLUBHOUSE',
    role: 'Founder & Managing Operator',
    detail: 'Founded and operated The Clubhouse: a boutique fitness facility known for precise coaching standards, athlete-calibre programming, and a high-trust training culture.',
  },
  {
    index: '03',
    period: 'OPERATIONAL LEADERSHIP',
    role: 'Cross-Functional Scale & People',
    detail: 'Leadership across remote-site operations, corporate health, hospitality and recreation programmes informs a coaching approach grounded in reality rather than fitness-bubble theory.',
  },
  {
    index: '04',
    period: 'BASELN COACHING',
    role: 'Direct, Private Online Prescription',
    detail: 'Brings hands-on facility standards to private online clients worldwide: individual programming, weekly review discipline, and direct communication without intermediary staff.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const apply = () => {
    onNavigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24 bg-charcoal-900">
      {/* Editorial Profile Hero */}
      <section className="py-14 sm:py-20 lg:py-24 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-charcoal-900 border border-white/15 rounded-full">
              <span className="w-2 h-2 rounded-full bg-smoke-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-paper-200">
                COACH PROFILE & BACKGROUND
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-light text-white leading-[1.02]">
              <span className="block">MEET THE PERSON</span>
              <span className="block italic text-smoke-300">DOING THE COACHING.</span>
            </h1>
            <div className="p-7 sm:p-9 bg-charcoal-900/90 border-l-2 border-smoke-400 rounded-sm shadow-xl">
              <p className="font-serif text-lg sm:text-2xl text-paper-100 italic font-light leading-relaxed">
                “I’ve coached people for whom physical performance is part of their profession, and people trying to find a few hours a week for themselves. Both deserve proper attention. Your starting point changes the training. It doesn’t change how seriously I take your goal.”
              </p>
              <div className="mt-5 text-xs font-mono text-smoke-400 uppercase tracking-[0.2em]">
                — Aian McLennan, Founder & Coach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Chronology */}
      <section className="py-16 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block">
                VERIFIABLE RECORD
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight">
                COACHING BUILT ON REAL-WORLD WORK.
              </h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                Aian’s experience crosses high-performance coaching, facility ownership and commercial operations. The common thread is practical: understand what matters to the person, make the prescription clear, and keep them progressing when their week changes.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs font-mono text-paper-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-smoke-400" /> Hands-on coaching
                </span>
                <span className="flex items-center gap-2">
                  <Compass size={16} className="text-smoke-400" /> Grounded execution
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {background.map((item) => (
                <div
                  key={item.index}
                  className="p-6 sm:p-7 bg-charcoal-950 border border-white/5 hover:border-smoke-400/30 transition-all rounded-sm group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-smoke-400 mb-2">
                    <span>{item.period}</span>
                    <span className="text-paper-400/60 font-sans group-hover:text-smoke-300 transition-colors">
                      {item.index}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2 leading-snug">
                    {item.role}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-paper-300 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creative The Clubhouse Editorial Scene */}
      <section className="relative overflow-hidden bg-charcoal-950 py-16 sm:py-24 lg:py-28 border-b border-white/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(151,180,200,0.18), transparent 30%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.03), transparent 35%)' }} />

        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
          {/* Header strip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 sm:mb-14 border-b border-white/10 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-smoke-400 block mb-2">
                HERITAGE & FACILITY ROOTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-light text-white leading-tight">
                WHAT THE CLUBHOUSE TAUGHT ME.
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono text-[11px] uppercase tracking-[0.16em] text-paper-400">
              <span className="block text-white">THE CLUBHOUSE BOUTIQUE</span>
              <span className="text-smoke-400">EST. DARWIN · COACHED SESSIONS</span>
            </div>
          </div>

          {/* Asymmetric composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Layered photo montage */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-charcoal-900 group">
                <img
                  src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png"
                  alt="Aian McLennan coaching on the pads"
                  className="w-full h-full object-cover object-[50%_25%] grayscale contrast-115 group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 py-1 bg-charcoal-950/80 backdrop-blur-sm border border-white/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-paper-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-smoke-400" />
                  <span>Padwork & Movement Diagnostics</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-xs font-mono text-paper-300">
                  <span className="tracking-wider">Aian McLennan · Real Coaching Execution</span>
                  <span className="hidden sm:inline text-smoke-400">12°27'S 130°50'E</span>
                </div>
              </div>

              {/* Offset secondary frame: gym floor culture */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 lg:-right-8 w-56 lg:w-64 aspect-[4/3] rounded-sm overflow-hidden border border-white/15 shadow-2xl bg-charcoal-900 z-10">
                <img
                  src="/media/baseln-gym-floor.png"
                  alt="Coaching floor standard"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-[10px] font-mono tracking-wider text-paper-200 uppercase">
                  Floor Culture & Rigour
                </div>
              </div>
            </div>

            {/* Editorial text & pull-quote */}
            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="relative pl-6 sm:pl-8 border-l border-smoke-400">
                <p className="font-serif text-xl sm:text-2xl text-paper-100 font-light leading-relaxed italic">
                  “At The Clubhouse, I learned that the training itself is only part of the job. You need to notice when someone disappears, understand what is getting in the way, and know whether to push or change the work.”
                </p>
              </div>

              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                BASELN brings that hands-on standard to private clients regardless of where they train. You are not buying an app library with automated emails; you are working with an experienced coach who monitors how you respond week-to-week.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-paper-300 font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-smoke-400 shrink-0" />
                  <span>Aian personally reviews every brief and application.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-smoke-400 shrink-0" />
                  <span>Prescription is individual from the first week.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-smoke-400 shrink-0" />
                  <span>Review and adjustments stay attached to live training.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={apply}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"
                >
                  <span>Apply to work with Aian</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
