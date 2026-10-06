import React, { useState } from 'react';
import { ArrowDownRight, ArrowRight, Minus, Plus } from 'lucide-react';
import { PageRoute } from '../types';

interface FieldNotesPageProps {
  onNavigate: (path: PageRoute) => void;
}

const noteContent = {
  consistency: [
    'The instinct after a missed week is often to compensate: train every day, add extra cardio or make food rules more restrictive. That reaction usually makes the next week harder to complete.',
    'A more useful approach is to re-establish the next workable session. Choose the training that best supports your current goal, return to the normal meal structure you can sustain and let the routine become ordinary again.',
    'The useful question is not “how do I make up the week?” It is “what makes the next seven days more likely to happen?” Consistency returns through completed work, not a dramatic reset.',
  ],
  dose: [
    'Training works when you can repeat it well enough to learn from it. A larger plan is not automatically a better plan if it leaves you tired, inconsistent or unable to progress the work that matters.',
    'A useful starting point is to look at the sessions you can complete reliably. From there, the plan can build with more work only when it has a clear purpose and still fits your recovery, work and home life.',
    'The aim is not to see how much training you can survive. It is to use the least complicated amount of work that moves the goal forward, then adjust when the evidence says it is needed.',
  ],
  food: [
    'Food plans often fall apart because they depend on conditions that are rarely present for long: uninterrupted routines, home-cooked meals and plenty of time. A practical approach needs options for the weeks that look different.',
    'Start with a few decisions you can repeat: a reliable breakfast or first meal, a simple way to include protein, a sensible restaurant order and a plan for the day after a social event. These are not rules to make life smaller; they are decisions that reduce friction.',
    'When the week changes, do not wait for Monday to return to the plan. Choose the next meal that supports the goal and keep the next useful action small enough to do today.',
  ],
};

type NoteKey = keyof typeof noteContent;

interface ReadMoreProps {
  id: NoteKey;
  activeNote: NoteKey | null;
  onToggle: (id: NoteKey) => void;
  takeaway: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ id, activeNote, onToggle, takeaway }) => {
  const isOpen = activeNote === id;

  return (
    <div className="mt-8">
      <button
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="group inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
      >
        <span className="flex h-7 w-7 items-center justify-center border border-current rounded-full transition-transform group-hover:scale-105">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
        <span>{isOpen ? 'Close note' : 'Open note'}</span>
      </button>
      {isOpen && (
        <div className="mt-7 border-t border-current/20 pt-7 space-y-5 animate-in fade-in duration-300">
          {noteContent[id].map((paragraph) => (
            <p key={paragraph} className="text-sm sm:text-base font-light leading-relaxed">{paragraph}</p>
          ))}
          <div className="mt-7 border-l-2 border-current pl-5 py-1">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] opacity-65 mb-2">Takeaway</span>
            <p className="font-serif text-lg sm:text-xl leading-snug">{takeaway}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const FieldNotesPage: React.FC<FieldNotesPageProps> = ({ onNavigate }) => {
  const [activeNote, setActiveNote] = useState<NoteKey | null>(null);
  const toggleNote = (id: NoteKey) => setActiveNote((current) => current === id ? null : id);

  return (
    <div className="pt-24 bg-charcoal-900">
      {/* Editorial cover — designed as a publication cover, not a generic blog heading */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 border-b border-white/10">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[54%] opacity-25 lg:opacity-35">
          <img src="/media/baseln-gym-floor.png" alt="" className="h-full w-full object-cover grayscale contrast-125 object-[70%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/80 to-charcoal-950/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/30" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-smoke-300">
                <span className="h-px w-8 bg-smoke-400" />
                <span>BASELN / FIELD NOTES / VOL. 01</span>
              </div>
              <h1 className="mt-7 font-serif text-[64px] sm:text-7xl md:text-[92px] lg:text-[112px] font-light leading-[0.72] tracking-[-0.055em] text-white">
                FIELD<br />
                <span className="italic text-smoke-300 ml-7 sm:ml-12">NOTES.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <p className="max-w-sm text-base sm:text-lg text-paper-200 font-light leading-relaxed">
                Notes on training, food, consistency and the decisions behind better progress.
              </p>
              <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4 max-w-sm text-[10px] font-mono uppercase tracking-[0.17em] text-paper-400">
                <span>03 Practical reads</span>
                <span>Read / Think / Adjust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note 01 — documentary reset spread */}
      <article className="relative overflow-hidden bg-paper-100 text-charcoal-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            <div className="lg:col-span-7 order-2 lg:order-1 px-5 sm:px-8 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-5 text-[10px] font-mono uppercase tracking-[0.2em] text-charcoal-800/65">
                  <span>01 / Consistency</span>
                  <span>4 min read</span>
                </div>
                <div className="mt-12 lg:mt-16 max-w-xl">
                  <span className="font-serif text-3xl sm:text-4xl text-smoke-700 italic">The reset note</span>
                  <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-[58px] leading-[0.96] font-medium tracking-tight">
                    You missed a week of training. What now?
                  </h2>
                  <p className="mt-7 max-w-lg text-base sm:text-lg text-charcoal-800/80 font-light leading-relaxed">
                    A disrupted week does not need a punishment plan. Start again with the sessions that matter most and rebuild the rhythm from there.
                  </p>
                  <ReadMore
                    id="consistency"
                    activeNote={activeNote}
                    onToggle={toggleNote}
                    takeaway="After a missed week, return to the next useful session. Do not turn a disruption into a punishment plan."
                  />
                </div>
              </div>
              <div className="mt-12 pt-5 border-t border-charcoal-950/15 text-[10px] font-mono uppercase tracking-[0.18em] text-charcoal-800/55">
                Useful work beats a dramatic reset.
              </div>
            </div>
            <figure className="lg:col-span-5 order-1 lg:order-2 relative min-h-[270px] sm:min-h-[360px] lg:min-h-0 overflow-hidden">
              <img src="/media/baseln-row-coaching.png" alt="Aian guiding a barbell row" className="absolute inset-0 h-full w-full object-cover object-[58%_center] grayscale contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent" />
              <figcaption className="absolute left-5 bottom-5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/80">Coach’s eye / live adjustment</figcaption>
            </figure>
          </div>
        </div>
      </article>

      {/* Note 02 — mineral editorial sheet */}
      <article className="relative overflow-hidden bg-smoke-500 text-charcoal-950 border-y border-charcoal-950/10">
        <div className="absolute -top-8 -right-5 sm:right-[8%] font-serif text-[190px] sm:text-[280px] lg:text-[360px] leading-none text-charcoal-950/[0.07] select-none pointer-events-none">02</div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-14 items-center">
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between lg:block text-[10px] font-mono uppercase tracking-[0.2em] text-charcoal-950/65">
                <span className="block lg:mb-3">02 / Training Dose</span>
                <span>5 min read</span>
              </div>
              <p className="mt-7 hidden lg:block text-base text-charcoal-950/75 leading-relaxed max-w-xs">
                The right amount is the amount you can use: complete it, recover from it and progress it with a reason.
              </p>
            </div>
            <div className="lg:col-span-5 lg:order-3">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[0.94] tracking-tight">
                How much training can you actually use?
              </h2>
              <p className="mt-7 text-base sm:text-lg text-charcoal-950/80 font-light leading-relaxed max-w-xl">
                More time in the gym is not automatically more progress. The right amount is the amount that fits your goal, recovery and real week.
              </p>
              <ReadMore
                id="dose"
                activeNote={activeNote}
                onToggle={toggleNote}
                takeaway="A good training dose is one you can complete, recover from and progress with a clear reason."
              />
            </div>
            <figure className="lg:col-span-3 lg:order-2 relative overflow-hidden aspect-[16/9] sm:aspect-[5/3] lg:aspect-[3/5] border border-charcoal-950/20">
              <img src="/media/baseln-gym-floor.png" alt="Training floor in session" className="h-full w-full object-cover object-[62%_center] grayscale contrast-125" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-charcoal-950/85 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.16em] text-paper-200">Capacity before complexity</figcaption>
            </figure>
          </div>
        </div>
      </article>

      {/* Note 03 — dark reading spread */}
      <article className="relative overflow-hidden bg-charcoal-950 text-paper-200 border-b border-white/10">
        <div className="absolute top-0 left-[9%] h-full w-px bg-white/5" />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <aside className="lg:col-span-3 flex lg:flex-col items-start lg:items-stretch justify-between lg:justify-start gap-5">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-smoke-400">03 / Food & Routine</span>
                <span className="mt-3 block text-[10px] font-mono uppercase tracking-[0.17em] text-paper-400">4 min read</span>
              </div>
              <span className="font-serif text-4xl sm:text-5xl lg:text-7xl italic text-smoke-300/80">Food.</span>
            </aside>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="max-w-3xl">
                <span className="inline-block border-b border-smoke-400 pb-2 text-sm sm:text-base font-serif italic text-smoke-300">A usable approach</span>
                <h2 className="mt-7 font-serif text-4xl sm:text-5xl lg:text-[64px] font-light leading-[0.95] tracking-tight text-white">
                  How do food habits hold up when the week changes?
                </h2>
                <p className="mt-8 max-w-2xl text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                  A practical food approach is not one that works only in a perfect week. It gives you a few useful defaults when travel, restaurants and late days arrive.
                </p>
                <ReadMore
                  id="food"
                  activeNote={activeNote}
                  onToggle={toggleNote}
                  takeaway="Build food habits around repeatable decisions, not perfect weeks."
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Compact editorial sign-off */}
      <section className="bg-charcoal-900 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-3">End of issue 01</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">Want the work to fit your real week?</h2>
          </div>
          <button onClick={() => { onNavigate('/online/register'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] font-semibold text-smoke-300 hover:text-white transition-colors shrink-0">
            <span>Apply to work with Aian</span><ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
