import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface FieldNotesPageProps {
  onNavigate: (path: PageRoute) => void;
}

const articles = [
  {
    id: 1,
    title: 'You missed a week of training. What now?',
    readTime: '4 min read',
    category: 'Consistency',
    summary: 'A disrupted week does not need a punishment plan. Start again with the sessions that matter most and rebuild the rhythm from there.',
    paragraphs: [
      'The instinct after a missed week is often to compensate: train every day, add extra cardio or make food rules more restrictive. That reaction usually makes the next week harder to complete.',
      'A more useful approach is to re-establish the next workable session. Choose the training that best supports your current goal, return to the normal meal structure you can sustain and let the routine become ordinary again.',
      'The useful question is not “how do I make up the week?” It is “what makes the next seven days more likely to happen?” Consistency returns through completed work, not a dramatic reset.',
    ],
    keyTakeaway: 'After a missed week, return to the next useful session. Do not turn a disruption into a punishment plan.',
  },
  {
    id: 2,
    title: 'How much training can you actually use?',
    readTime: '5 min read',
    category: 'Training Dose',
    summary: 'More time in the gym is not automatically more progress. The right amount is the amount that fits your goal, recovery and real week.',
    paragraphs: [
      'Training works when you can repeat it well enough to learn from it. A larger plan is not automatically a better plan if it leaves you tired, inconsistent or unable to progress the work that matters.',
      'A useful starting point is to look at the sessions you can complete reliably. From there, the plan can build with more work only when it has a clear purpose and still fits your recovery, work and home life.',
      'The aim is not to see how much training you can survive. It is to use the least complicated amount of work that moves the goal forward, then adjust when the evidence says it is needed.',
    ],
    keyTakeaway: 'A good training dose is one you can complete, recover from and progress with a clear reason.',
  },
  {
    id: 3,
    title: 'How do food habits hold up when the week changes?',
    readTime: '4 min read',
    category: 'Food and Routine',
    summary: 'A practical food approach is not one that works only in a perfect week. It gives you a few useful defaults when travel, restaurants and late days arrive.',
    paragraphs: [
      'Food plans often fall apart because they depend on conditions that are rarely present for long: uninterrupted routines, home-cooked meals and plenty of time. A practical approach needs options for the weeks that look different.',
      'Start with a few decisions you can repeat: a reliable breakfast or first meal, a simple way to include protein, a sensible restaurant order and a plan for the day after a social event. These are not rules to make life smaller; they are decisions that reduce friction.',
      'When the week changes, do not wait for Monday to return to the plan. Choose the next meal that supports the goal and keep the next useful action small enough to do today.',
    ],
    keyTakeaway: 'Build food habits around repeatable decisions, not perfect weeks.',
  },
];

export const FieldNotesPage: React.FC<FieldNotesPageProps> = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24 bg-charcoal-950 border-b border-white/10"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">COACHING PERSPECTIVES</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]">FIELD NOTES</h1>
        <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed">Notes on training, food, consistency and the decisions behind better progress.</p>
      </div></div></section>

      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="space-y-12 max-w-4xl">
        {articles.map((art) => <article key={art.id} className="bg-charcoal-850 border border-white/10 rounded-sm p-8 sm:p-10 hover:border-white/20 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-smoke-400 mb-4"><span className="uppercase tracking-widest bg-charcoal-900 px-3 py-1 rounded border border-white/5">{art.category}</span><span className="text-paper-400">{art.readTime}</span></div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-4 leading-tight">{art.title}</h2>
          <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed mb-6">{art.summary}</p>
          {activeArticle === art.id ? <div className="space-y-4 border-t border-white/10 pt-6 animate-in fade-in duration-300">{art.paragraphs.map((paragraph, index) => <p key={index} className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">{paragraph}</p>)}<div className="p-4 bg-charcoal-900 border-l-2 border-smoke-400 rounded-sm mt-6"><span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-1">KEY TAKEAWAY</span><p className="text-xs sm:text-sm text-paper-200 font-medium">{art.keyTakeaway}</p></div><div className="pt-4 flex items-center justify-between"><button onClick={() => setActiveArticle(null)} className="text-xs uppercase tracking-widest text-paper-400 hover:text-white">Collapse article ↑</button><button onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white"><span>Explore private coaching</span><ArrowRight size={14} /></button></div></div> : <button onClick={() => setActiveArticle(art.id)} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Read full article</span><ChevronRight size={16} /></button>}
        </article>)}
      </div>
      <div className="mt-16 p-8 bg-charcoal-950 border border-white/10 rounded-sm max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6"><div><h3 className="font-serif text-xl sm:text-2xl text-white mb-2">READY TO TRAIN WITH DIRECTION?</h3><p className="text-xs sm:text-sm text-paper-400">Start a conversation about your current objective and the work that would support it.</p></div><button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-6 py-3.5 rounded-sm shadow-xl transition-all shrink-0"><span>Apply for coaching</span><ArrowRight size={14} /></button></div>
      </div></section>
    </div>
  );
};
