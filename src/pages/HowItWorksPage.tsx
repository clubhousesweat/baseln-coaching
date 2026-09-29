import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">COACHING JUDGEMENT IN ACTION</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.04]">
              <span className="block">GOOD COACHING IS WHAT HAPPENS</span>
              <span className="block text-smoke-300 italic font-normal">AFTER THE PLAN IS WRITTEN.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed">
              Assessment gives Aian a sensible starting point. The training then gives him information a questionnaire cannot: how the sessions fit, how you move, how you recover and what you complete. He uses that information to decide what deserves attention next.
            </p>
          </div>
        </div>
      </section>

      {/* These examples intentionally show decision-making, not unverified outcomes. */}
      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">HYPOTHETICAL EXAMPLE 01</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight uppercase">WHEN GOALS OVERLAP.</h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                Imagine someone who wants to get leaner, build confidence with strength training and finish a 5 km event. Trying to follow three separate plans would usually make the week harder to complete.
              </p>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                The useful question is not “how can we do everything at once?” It is “what needs to lead, and what can be supported without getting in the way?”
              </p>
            </div>

            <div className="lg:col-span-7 bg-charcoal-850 border border-white/10 rounded-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 font-semibold">HOW AIAN MIGHT APPROACH IT</span>
                <span className="text-[11px] text-paper-400 font-mono">Hypothetical only</span>
              </div>
              <div className="grid gap-3 text-xs sm:text-sm">
                {[
                  { label: 'SET THE MAIN PRIORITY', copy: 'Choose the result that matters most in the next six weeks, then protect the sessions that move it forward.' },
                  { label: 'KEEP THE WEEK DOABLE', copy: 'Build a small number of strength and run sessions around the person’s actual diary rather than an ideal one.' },
                  { label: 'ADJUST FROM REAL FEEDBACK', copy: 'If recovery, workload or travel changes, decide what to keep, shorten or move instead of asking the person to “make up” every session.' },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-charcoal-900 border border-white/5 rounded-sm">
                    <span className="text-[11px] font-mono text-smoke-400 uppercase tracking-wider block mb-1">{item.label}</span>
                    <p className="text-paper-300 leading-relaxed">{item.copy}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-paper-400 font-light leading-relaxed">The exact training split, food guidance and progression depend on the individual, not this illustration.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">HYPOTHETICAL EXAMPLE 02</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight uppercase">WHEN THE SCALE STOPS MOVING.</h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                A flat scale reading does not automatically tell a coach what to change. Before reducing food or adding more training, Aian would look at the wider pattern and ask what has changed in the week.
              </p>
            </div>

            <div className="lg:col-span-7 bg-charcoal-900 border border-white/10 rounded-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 font-semibold">A COACH’S CHECK BEFORE CHANGING THE PLAN</span>
                <span className="text-[11px] text-paper-400 font-mono">Hypothetical only</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { title: 'Look at the trend, not one reading.', copy: 'Aian would check the wider pattern rather than react to a few days of normal fluctuation.' },
                  { title: 'Check what was actually completed.', copy: 'Training, meals, travel, sleep and weekend routines can all change what the current data means.' },
                  { title: 'Use more than one useful signal.', copy: 'Depending on the goal, that might include training performance, measurements, energy, clothing fit or feedback from the person.' },
                  { title: 'Make one considered change—or hold steady.', copy: 'The next step may be a small adjustment, a clearer habit target or simply more time with the current approach. It is not an automatic punishment.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-charcoal-850 rounded border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-smoke-400 mt-2 shrink-0" />
                    <div><strong className="text-white block font-medium">{item.title}</strong><span className="text-paper-400 text-xs leading-relaxed">{item.copy}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">TECHNIQUE FEEDBACK</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">WHAT A COACH CAN SEE THAT A PROGRAMME CANNOT.</h2>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                A plan is only as useful as the way it is performed. Aian reviews relevant lifting footage and gives focused, practical cues so the person knows what to work on next.
              </p>
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-charcoal-850 border border-white/5 rounded-sm">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Illustrative observation</h4>
                  <p className="text-xs sm:text-sm text-paper-400 font-light">During a Romanian deadlift, the hips may rise early and shift the movement away from the intended hamstring position.</p>
                </div>
                <div className="p-4 bg-charcoal-850 border border-white/5 rounded-sm">
                  <h4 className="text-sm font-bold text-smoke-300 uppercase tracking-wider mb-1">An example of a useful cue</h4>
                  <p className="text-xs sm:text-sm text-paper-300 font-light italic">“Push your hips back as if you are reaching for the wall behind you. Stop when the hips stop travelling backward.”</p>
                </div>
                <div className="p-4 bg-charcoal-850 border border-white/5 rounded-sm">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">The next coaching decision</h4>
                  <p className="text-xs sm:text-sm text-paper-400 font-light">Aian would then decide whether to repeat the work, change the load, simplify the movement or use another progression—based on the individual response.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png" alt="Aian McLennan coaching movement detail" className="w-full h-auto object-cover contrast-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">Technique feedback · Personal coaching</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 bg-charcoal-950 text-center">
        <div className="max-w-[700px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase mb-5">YOUR TRAINING SHOULD MAKE SENSE TO YOU.</h2>
          <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8">Every session should have a reason. Every change should be clear. Discover whether BASELN / 6 is the right starting point for your next six weeks.</p>
          <button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all">
            <span>Explore private coaching</span><ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
