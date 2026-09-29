import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (path: PageRoute) => void;
}

const decisionChecks = [
  { title: 'Start with the decision', copy: 'What result needs to lead this week, and what can be supported without making the plan impossible to complete?' },
  { title: 'Use the actual pattern', copy: 'Sessions completed, training quality, food consistency, recovery and routine all add useful context.' },
  { title: 'Change only what needs changing', copy: 'The next move may be a small adjustment, a clearer habit target or more time with the current approach.' },
];

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="max-w-3xl space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">COACHING JUDGEMENT IN ACTION</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.04]"><span className="block">GOOD COACHING IS WHAT HAPPENS</span><span className="block text-smoke-300 italic font-normal">AFTER THE PLAN IS WRITTEN.</span></h1>
          <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed">Assessment gives Aian a sensible starting point. The training then provides the information a questionnaire cannot: how the sessions fit, how you move, how you recover and what you actually complete. That context guides the next decision.</p>
        </div></div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">HYPOTHETICAL EXAMPLE 01</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">WHEN GOALS OVERLAP.</h2>
            <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">Imagine someone who wants to get leaner, build confidence with strength training and finish a 5 km event. The job is not to stack three programmes together. It is to establish what needs to lead and build a week that can be completed.</p>
          </div>
          <div className="lg:col-span-7 grid gap-3">
            {[
              { label: 'SET THE EMPHASIS', copy: 'Choose the result that matters most in the immediate block, then protect the sessions that move it forward.' },
              { label: 'KEEP THE SUPPORTING WORK USEFUL', copy: 'Use enough strength or running work to support the other goals without overwhelming recovery or the diary.' },
              { label: 'ADJUST FROM THE WEEK THAT HAPPENS', copy: 'If travel or workload changes, decide what to keep, shorten or move instead of trying to make up everything.' },
            ].map((item) => <div key={item.label} className="p-5 bg-charcoal-850 border border-white/10 rounded-sm"><span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-2">{item.label}</span><p className="text-sm text-paper-300 font-light leading-relaxed">{item.copy}</p></div>)}
            <p className="text-xs text-paper-400 font-light pt-1">This is a hypothetical decision framework, not a client case or a fixed programme.</p>
          </div>
        </div></div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">HYPOTHETICAL EXAMPLE 02</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">WHEN PROGRESS FEELS STUCK.</h2>
            <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">A flat scale reading or a difficult week does not automatically mean more training or less food. Before changing the plan, Aian would look at the wider pattern and ask what changed in the person’s real week.</p>
          </div>
          <div className="lg:col-span-7 grid gap-3">
            {decisionChecks.map((item, index) => <div key={item.title} className="flex gap-4 p-5 bg-charcoal-900 border border-white/10 rounded-sm"><span className="font-mono text-xs text-smoke-400 pt-1">0{index + 1}</span><div><h3 className="text-base font-semibold text-white mb-1">{item.title}</h3><p className="text-sm text-paper-400 font-light leading-relaxed">{item.copy}</p></div></div>)}
            <p className="text-xs text-paper-400 font-light pt-1">The appropriate measure and the next step depend on the goal and the individual; this is a hypothetical example only.</p>
          </div>
        </div></div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">TECHNIQUE FEEDBACK</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight">USEFUL FEEDBACK IS SPECIFIC.</h2>
            <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">A plan is only as useful as the way it is performed. When relevant, a training clip allows Aian to focus the next session on one clear improvement rather than leaving the person to guess.</p>
            <div className="space-y-3 pt-1">
              <div className="p-4 bg-charcoal-850 border border-white/5 rounded-sm"><span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-1">Illustrative observation</span><p className="text-sm text-paper-300 font-light">During a hinge movement, the hips may rise early and move the effort away from the intended position.</p></div>
              <div className="p-4 bg-charcoal-850 border border-white/5 rounded-sm"><span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-1">Focused next step</span><p className="text-sm text-paper-300 font-light italic">“Keep the weight where it is. Reach your hips back first, then send another clip from the same angle.”</p></div>
            </div>
          </div>
          <div className="lg:col-span-6"><div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl"><img src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png" alt="Aian McLennan coaching movement detail" className="w-full h-auto object-cover contrast-110" /><div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">Technique feedback · Personal coaching</div></div></div>
        </div></div>
      </section>

      <section className="py-24 sm:py-28 bg-charcoal-950 text-center"><div className="max-w-[700px] mx-auto px-5 sm:px-8"><h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight mb-5">YOUR TRAINING SHOULD MAKE SENSE TO YOU.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8">Every session should have a reason. Every change should be clear. Explore whether private coaching is right for your next six weeks.</p><button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"><span>Explore private coaching</span><ArrowRight size={16} /></button></div></section>
    </div>
  );
};
