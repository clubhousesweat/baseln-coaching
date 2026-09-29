import React from 'react';
import { ArrowRight, Award, Compass, Shield, History, Check } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24">
      {/* HERO H1 */}
      <section className="py-16 sm:py-24 bg-charcoal-950 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
              COACH PROFILE & BACKGROUND
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]">
              <span className="block">MEET THE PERSON</span><span className="block text-smoke-300 italic font-normal">DOING THE COACHING.</span>
            </h1>

            {/* Opening in first person (blueprint verbatim) */}
            <div className="p-6 bg-charcoal-900 border-l-2 border-smoke-400 rounded-sm">
              <p className="font-serif text-lg sm:text-2xl text-paper-200 italic font-light leading-relaxed">
                “I’ve coached people for whom physical performance is part of their profession, and people trying to find a few hours a week for themselves. Both deserve proper attention. Your starting point changes the training. It doesn’t change how seriously I take your goal.”
              </p>
              <div className="mt-4 text-xs font-mono text-smoke-400 uppercase tracking-widest">
                — Aian McLennan, Founder & Coach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY & CAREER TIMELINE */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                VERIFIED EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                COACHING BUILT ON REAL STANDARDS
              </h2>
              <p className="text-base text-paper-300 font-light leading-relaxed">
                Aian’s background bridges competitive athletic performance, private facility ownership, and operational leadership. His approach is shaped by thousands of coaching hours on gym floors and remote sites.
              </p>

              {/* High profile statement (blueprint approved) */}
              <div className="p-5 bg-charcoal-850 border border-white/10 rounded-sm">
                <p className="text-xs sm:text-sm text-paper-300 leading-relaxed font-light">
                  <strong className="text-white font-medium">Coaching Breadth:</strong> His clients have included Hollywood film talent and some of Australia’s leading athletes, alongside busy parents, first-time gym members and people rebuilding their fitness.
                </p>
              </div>
            </div>

            {/* Chronological career milestones */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  period: 'Competitive Foundations',
                  role: 'Athletic Performance & Coaching Culture',
                  detail: 'Grounded in high-standard athletic conditioning, team dynamics, strength development and sports preparation across Australian athletics and football codes.',
                },
                {
                  period: 'Private Coaching & Strength Operations',
                  role: '1:1 Preparation & Movement Mechanics',
                  detail: 'Specialised physical coaching for body composition, functional hypertrophy, injury reduction, and specific endurance goals.',
                },
                {
                  period: 'The Clubhouse Boutique Facility',
                  role: 'Founder & Head Coach',
                  detail: 'Built around training people properly and keeping them involved in the work. Combined high coaching standards, structured programming and a community of accountability.',
                },
                {
                  period: 'BASELN Private Coaching',
                  role: 'Online Coaching with Aian McLennan',
                  detail: 'Bringing hands-on coaching experience into private online coaching, with individual prescription and active follow-through for clients globally.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-charcoal-950 border border-white/5 rounded-sm hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-smoke-400 uppercase tracking-wider mb-2">
                    <span>{item.period}</span>
                    <span className="text-paper-400/60 font-sans">Milestone 0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.role}</h3>
                  <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE CLUBHOUSE HERITAGE */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png"
                  alt="Aian McLennan"
                  className="w-full h-auto object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">
                  Aian McLennan · Personal Coaching Philosophy
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                COACHING HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
                WHAT THE CLUBHOUSE TAUGHT ME
              </h2>

              {/* Exact Clubhouse paragraph from blueprint */}
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                “At The Clubhouse, I learned that the training itself is only part of the job. You need to notice when someone disappears, understand what is getting in the way and know whether to push or change the work. BASELN lets me bring that standard of coaching to people beyond a single gym.”
              </p>

              <div className="pt-4 space-y-3 text-xs sm:text-sm text-paper-400">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400" />
                  <span>Aian personally assesses every incoming enquiry.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400" />
                  <span>Aian writes and updates each individual programme block.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-smoke-400" />
                  <span>Aian reviews lifting videos, check-in metrics and feedback.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-3.5 rounded-sm shadow-xl transition-all"
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
