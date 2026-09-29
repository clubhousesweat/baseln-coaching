import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Sliders, TrendingUp, Eye, Compass, Activity } from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24">
      {/* HERO H1 */}
      <section className="py-16 sm:py-24 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
              COACHING JUDGEMENT IN ACTION
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
              <span className="block">GOOD COACHING IS WHAT HAPPENS</span><span className="block text-smoke-300 italic font-normal">AFTER THE PLAN IS WRITTEN.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed">
              Assessment gives Aian a sound starting point. Training gives him information that a questionnaire cannot: how the sessions fit, how you move, how you recover, what you complete and what is changing. He uses that response to decide what deserves attention next.
            </p>
          </div>
        </div>
      </section>

      {/* WORKED EXAMPLE 1: COMPETING GOALS */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                WORKED EXAMPLE 01
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                COMPETING GOALS: FAT LOSS, STRENGTH & A 5 KM RUN
              </h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                A client wants to get leaner, lift more confidently and finish a 5 km race. Simply downloading a fat-loss diet, a powerlifting plan and a running schedule would crush recovery and cause early burnout.
              </p>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                Aian identifies the primary priority and designs a realistic weekly schedule that develops the other goals without fighting them.
              </p>
            </div>

            <div className="lg:col-span-7 bg-charcoal-850 border border-white/10 rounded-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 font-semibold">
                  LABELLED ILLUSTRATIVE BRIEF
                </span>
                <span className="text-xs text-paper-400 font-mono">Real-world programming logic</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <div className="p-4 bg-charcoal-900 border border-white/5 rounded">
                  <span className="text-[11px] font-mono text-smoke-400 uppercase tracking-wider block mb-1">
                    PRIMARY DRIVER
                  </span>
                  <div className="text-white font-medium">
                    2x Weekly Full-Body Strength Anchor (35–45 min)
                  </div>
                  <p className="text-paper-400 text-xs mt-1">
                    Retains muscle tissue and maintains neural strength output while calories are slightly reduced.
                  </p>
                </div>

                <div className="p-4 bg-charcoal-900 border border-white/5 rounded">
                  <span className="text-[11px] font-mono text-smoke-400 uppercase tracking-wider block mb-1">
                    AEROBIC BUILD
                  </span>
                  <div className="text-white font-medium">
                    1x Interval Walk/Run Progression + 1x Easy Zone 2 Session
                  </div>
                  <p className="text-paper-400 text-xs mt-1">
                    Low-impact volume accumulation that safeguards knees and Achilles tendons while building 5 km pacing capacity.
                  </p>
                </div>

                <div className="p-4 bg-charcoal-900 border border-white/5 rounded">
                  <span className="text-[11px] font-mono text-smoke-400 uppercase tracking-wider block mb-1">
                    NUTRITION STRATEGY
                  </span>
                  <div className="text-white font-medium">
                    Targeted Protein Distribution & Workout Carbohydrates
                  </div>
                  <p className="text-paper-400 text-xs mt-1">
                    Ensures energy stays high for running sessions without aggressive calorie deficits that cause muscle loss.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-paper-400 italic">
                Outcome: Progress in running time, body composition, and squat/deadlift confidence without extreme fatigue.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKED EXAMPLE 2: STALLED PROGRESS */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                WORKED EXAMPLE 02
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                STALLED PROGRESS: BODYWEIGHT FLAT, STRENGTH RISING
              </h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                Week 4 arrives and the bathroom scale hasn’t budged in ten days. An automated app or inexperienced trainer immediately cuts calories by 500 and adds 45 minutes of stairmaster.
              </p>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                Aian looks at the full picture: lifting weights are increasing, gym performance is sharp, waist measurements are down 1.5 cm, and sleep was compromised by work travel.
              </p>
            </div>

            <div className="lg:col-span-7 bg-charcoal-900 border border-white/10 rounded-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 font-semibold">
                  EVIDENCE-BASED DECISION LOGIC
                </span>
                <span className="text-xs text-paper-400 font-mono">Week 4 Coach Assessment</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 bg-charcoal-850 rounded border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Metric 1: Scale weight is flat.</strong>
                    <span className="text-paper-400 text-xs">Transient water retention from travel inflammation and muscular glycogen reload.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-charcoal-850 rounded border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Metric 2: Physical circumferences are shifting.</strong>
                    <span className="text-paper-400 text-xs">Visceral fat loss is occurring simultaneously with muscle preservation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-charcoal-850 rounded border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Metric 3: Training load is progressive.</strong>
                    <span className="text-paper-400 text-xs">Work sets are clean, stable, and performed with excellent technique.</span>
                  </div>
                </div>

                <div className="p-4 bg-smoke-500/10 border-l-2 border-smoke-400 mt-4 rounded-sm">
                  <span className="text-xs font-mono uppercase tracking-widest text-smoke-300 font-semibold block mb-1">
                    AIAN’S PRESCRIPTION
                  </span>
                  <p className="text-paper-200 text-xs sm:text-sm font-light">
                    “Hold calories steady. Prioritise 7.5 hours sleep over the weekend. Maintain the planned weights. Let water normalize before making any dietary cuts.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNIQUE PROOF */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                MOVEMENT CORRECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
                TECHNIQUE PROOF: WHAT AIAN SEES & HOW HE CUES
              </h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                This is where ‘training methods and techniques most people have not been shown’ becomes believable. Aian does not use secret exercise systems—he coaches leverage, joint alignment and tension so that every repetition delivers the intended adaptation.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-charcoal-850 border border-white/5 rounded">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    What Aian observed
                  </h4>
                  <p className="text-xs sm:text-sm text-paper-400 font-light">
                    Hips rising too fast off the floor during the Romanian Deadlift, shifting load onto the lumbar spine instead of hamstrings and glutes.
                  </p>
                </div>

                <div className="p-4 bg-charcoal-850 border border-white/5 rounded">
                  <h4 className="text-sm font-bold text-smoke-300 uppercase tracking-wider mb-1">
                    The Cue Aian gave
                  </h4>
                  <p className="text-xs sm:text-sm text-paper-300 font-light">
                    “Push the wall behind you with your back pockets while keeping your armpits clamped shut. Stop at the point your hips stop travelling backward.”
                  </p>
                </div>

                <div className="p-4 bg-charcoal-850 border border-white/5 rounded">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Why it mattered
                  </h4>
                  <p className="text-xs sm:text-sm text-paper-400 font-light">
                    Zero lower back ache the following morning, immediate hamstring tension, and the client added 10 kg with higher movement security.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png"
                  alt="Aian coaching movement detail"
                  className="w-full h-auto object-cover contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">
                  Technique Education · Video Review in Training Room
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE SECTION */}
      <section className="py-24 bg-charcoal-950 text-center">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase mb-6">
            YOUR TRAINING SHOULD MAKE SENSE TO YOU.
          </h2>
          <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8">
            Every session has a rationale. Every adaptation has a reason. Discover how BASELN / 6 can structure your next six weeks.
          </p>
          <button
            onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"
          >
            <span>Explore Private Coaching</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
