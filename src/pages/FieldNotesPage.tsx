import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface FieldNotesPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const FieldNotesPage: React.FC<FieldNotesPageProps> = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: 'You missed a week of training. What now?',
      readTime: '4 min read',
      category: 'Adherence & Strategy',
      summary: 'Why doubling up sessions or slashing calories on Monday is the worst reaction to a disrupted week, and how to intelligently re-anchor momentum.',
      paragraphs: [
        'The common instinct after seven days without lifting is catastrophic compensation: you vow to train six days in a row, cut carbohydrates in half, and force two hours of cardio. Within 72 hours, extreme soreness and depleted glycogen trigger another breakdown.',
        'At BASELN, a missed week is treated simply as training reality. When work travel, illness, or family responsibilities wipe out your scheduled sessions, your first task is not repentance—it is re-establishing the anchor.',
        'Here is Aian’s protocol: do not attempt to squeeze six missed sessions into the coming four days. Instead, pick your two most foundational compound lifts, trim total volume by 25% to account for reduced neural readiness, and ensure your post-workout meal contains adequate protein. Momentum is rebuilt by completing manageable, high-quality work, not by punishing yourself for living your life.',
      ],
      keyTakeaway: 'Never compensate for a missed week by doubling your training load. Re-anchor with two foundational sessions and let consistency normalize.',
    },
    {
      id: 2,
      title: 'How much training can you actually use?',
      readTime: '5 min read',
      category: 'Programming & Recovery',
      summary: 'The difference between maximal recoverable volume and junk fatigue. How to find the minimum effective dose that drives progressive adaptation.',
      paragraphs: [
        'More is not better in strength training; better is better. Too many trainees accumulate what coaches call “junk volume”—repetitions that generate fatigue and joint strain without stimulating muscular or neural adaptation.',
        'If you can progress your Romanian deadlift, overhead press, and front squat across three focused 45-minute sessions per week, adding a fourth or fifth session that blunts your recovery provides zero additional benefit. In fact, it often stalls strength gains completely.',
        'When Aian designs your BASELN / 6 block, he identifies your recovery envelope based on your sleep, work stress, and nutrition. Every set in your Training Room programme has an assigned purpose. If an exercise is not directly advancing your primary or secondary objective, it is cut.',
      ],
      keyTakeaway: 'Volume is only useful if you can recover from it and progressively load it. Focus on training density and execution quality over raw hours in the gym.',
    },
    {
      id: 3,
      title: 'When the scale stalls, what should you check first?',
      readTime: '5 min read',
      category: 'Body Composition & Metrics',
      summary: 'Why daily scale fluctuations lie, the physiological role of water retention, and the four true markers of body composition change.',
      paragraphs: [
        'Few things discourage clients faster than stepping on the scale after ten days of disciplined eating and hard training, only to see the number unchanged or up by 400 grams. Before panicking and cutting calories to starvation levels, look at human physiology.',
        'When you begin lifting progressively, muscle tissue experiences micro-tears that cause mild localized inflammation and water retention. Simultaneously, muscles store additional glycogen, each gram of which binds roughly three to four grams of water. You can lose half a kilogram of adipose tissue while holding 800 grams of water—the scale reads as stalled, but body composition is visibly improving.',
        'Aian reviews scale trends only alongside waist circumferences, training performance in the Training Room, and energy levels. If strength is rising, clothes fit looser, and sleep is solid, the protocol is working. Let transient water normalize before adjusting dietary intake.',
      ],
      keyTakeaway: 'The scale measures total mass, not fat loss. Judge progress using a triad of strength progression, tape measurements, and weekly weight moving averages.',
    },
  ];

  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="py-16 sm:py-24 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
              COACHING PERSPECTIVES
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
              FIELD NOTES
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed">
              Finished practical articles on training volume, body composition, missed sessions and coaching logic. Practical knowledge without generic promotional filler.
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="space-y-12 max-w-4xl">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-charcoal-850 border border-white/10 rounded-sm p-8 sm:p-10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-smoke-400 mb-4">
                  <span className="uppercase tracking-widest bg-charcoal-900 px-3 py-1 rounded border border-white/5">
                    {art.category}
                  </span>
                  <span className="text-paper-400">{art.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-4 leading-tight">
                  {art.title}
                </h2>

                <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed mb-6">
                  {art.summary}
                </p>

                {/* Expanded article view */}
                {activeArticle === art.id ? (
                  <div className="space-y-4 border-t border-white/10 pt-6 animate-in fade-in duration-300">
                    {art.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                        {p}
                      </p>
                    ))}
                    <div className="p-4 bg-charcoal-900 border-l-2 border-smoke-400 rounded-sm mt-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-1">
                        KEY TAKEAWAY
                      </span>
                      <p className="text-xs sm:text-sm text-paper-200 font-medium">
                        {art.keyTakeaway}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                      <button
                        onClick={() => setActiveArticle(null)}
                        className="text-xs uppercase tracking-widest text-paper-400 hover:text-white"
                      >
                        Collapse article ↑
                      </button>
                      <button
                        onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white"
                      >
                        <span>See how this applies in coaching</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveArticle(art.id)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
                  >
                    <span>Read full article</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 bg-charcoal-950 border border-white/10 rounded-sm max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
                READY TO TRAIN WITH DIRECTION?
              </h3>
              <p className="text-xs sm:text-sm text-paper-400">
                Explore BASELN / 6 or start a conversation about your current physical objective.
              </p>
            </div>
            <button
              onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-6 py-3.5 rounded-sm shadow-xl transition-all shrink-0"
            >
              <span>Apply for coaching</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
