import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (path: PageRoute) => void;
}

const background = [
  { period: 'Strength, conditioning and coaching', role: 'Practical performance coaching', detail: 'Aian’s work has covered strength and conditioning, fitness and wellbeing for people with different goals, starting points and weekly demands.' },
  { period: 'The Clubhouse boutique facility', role: 'Founder and operator', detail: 'Aian founded and operated The Clubhouse: a boutique training facility built around coached sessions, clear standards and a culture that kept people engaged in the work.' },
  { period: 'Operational leadership', role: 'People, facilities and programmes', detail: 'Experience across hospitality, recreation, corporate health, community programmes and remote-site operations informs a coaching approach grounded in the realities of busy lives.' },
  { period: 'BASELN private coaching', role: 'Direct online coaching with Aian', detail: 'BASELN brings that hands-on approach into a private online environment: individual programming, useful feedback and practical follow-through.' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24 bg-charcoal-950 border-b border-white/10"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="max-w-3xl space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">COACH PROFILE AND BACKGROUND</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.05]"><span className="block">MEET THE PERSON</span><span className="block text-smoke-300 italic font-normal">DOING THE COACHING.</span></h1>
        <div className="p-6 bg-charcoal-900 border-l-2 border-smoke-400 rounded-sm"><p className="font-serif text-lg sm:text-2xl text-paper-200 italic font-light leading-relaxed">“I’ve coached people for whom physical performance is part of their profession, and people trying to find a few hours a week for themselves. Both deserve proper attention. Your starting point changes the training. It doesn’t change how seriously I take your goal.”</p><div className="mt-4 text-xs font-mono text-smoke-400 uppercase tracking-widest">— Aian McLennan, Founder & Coach</div></div>
      </div></div></section>

      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">BACKGROUND</span><h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">COACHING BUILT ON REAL-WORLD WORK.</h2><p className="text-base text-paper-300 font-light leading-relaxed">Aian’s experience crosses coaching, boutique fitness ownership and operational leadership. The common thread is practical: understand what matters to the person, make the work clear and help them stay with it when the week changes.</p></div>
        <div className="lg:col-span-7 space-y-6">{background.map((item, idx) => <div key={item.period} className="p-6 bg-charcoal-950 border border-white/5 rounded-sm hover:border-white/10 transition-colors"><div className="flex items-center justify-between text-xs font-mono text-smoke-400 uppercase tracking-wider mb-2"><span>{item.period}</span><span className="text-paper-400/60 font-sans">Experience 0{idx + 1}</span></div><h3 className="text-lg font-bold text-white mb-2">{item.role}</h3><p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">{item.detail}</p></div>)}</div>
      </div></div></section>

      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5"><div className="max-w-[1200px] mx-auto px-5 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6"><div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl"><img src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png" alt="Aian McLennan coaching a client" className="w-full h-auto object-cover grayscale contrast-110" /><div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" /><div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">Aian McLennan · Personal coaching philosophy</div></div></div>
        <div className="lg:col-span-6 space-y-6"><span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">THE CLUBHOUSE</span><h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">WHAT THE CLUBHOUSE TAUGHT ME.</h2><p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">“At The Clubhouse, I learned that the training itself is only part of the job. You need to notice when someone disappears, understand what is getting in the way and know whether to push or change the work. BASELN lets me bring that standard of coaching to people beyond a single gym.”</p>
          <div className="pt-2 space-y-3 text-xs sm:text-sm text-paper-400"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-smoke-400" /><span>Aian personally reviews every incoming enquiry.</span></div><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-smoke-400" /><span>Each initial programme is shaped around the individual’s starting point.</span></div><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-smoke-400" /><span>Feedback and review stay connected to the work in progress.</span></div></div>
          <div className="pt-4"><button onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-3.5 rounded-sm shadow-xl transition-all"><span>Apply to work with Aian</span><ArrowRight size={16} /></button></div>
        </div>
      </div></div></section>
    </div>
  );
};
