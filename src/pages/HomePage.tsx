import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* The first screen is intentionally concise: offer, coach and two paths forward. */}
      <section className="relative min-h-[84vh] sm:min-h-[760px] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/media/Header_Banner_Background_c72ecdc900_c5b08867.jpg"
            className="w-full h-full object-cover object-center opacity-65 brightness-110 contrast-105 saturate-75"
          >
            <source src="/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4" type="video/mp4" />
          </video>
          {/* A readable left-hand copy zone, while keeping Aian visible through the frame. */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/72 to-charcoal-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-transparent to-charcoal-950/25" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-smoke-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-paper-200">
                BASELN / PRIVATE ONLINE COACHING
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] font-light text-paper-50 mb-5">
              <span className="block">NOT MADE FOR EVERYONE.</span>
              <span className="italic font-normal text-smoke-300 block">Made for you.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed mb-8 max-w-xl">
              Private online coaching with Aian McLennan. Training built for your goal, guidance on food and habits, and a coach who checks in, teaches the work and keeps you moving when life gets in the way.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
                className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"
              >
                <span>Explore private coaching</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-100 hover:text-white px-6 py-4 transition-colors"
              >
                <span>Apply to work with Aian</span>
                <ChevronRight size={16} className="text-smoke-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Six concrete benefits unfold directly beneath the invitation. */}
      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
              THE SERVICE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase max-w-2xl">
              YOUR TRAINING IS BUILT. YOUR COACH IS INVOLVED.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 max-w-2xl leading-relaxed">
              Aian writes the work, reviews how it is going and helps make the next decision. Here is what that means when you join.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden border border-white/10">
            {[
              { num: '01', title: 'Training built around you.', desc: 'A programme shaped by your objective, ability, schedule and equipment.' },
              { num: '02', title: 'Direct coaching from Aian.', desc: 'Questions, technique footage and feedback go to the coach guiding the work.' },
              { num: '03', title: 'Accountability that follows through.', desc: 'The agreed actions are reviewed. If momentum drops, you work out why and what to change.' },
              { num: '04', title: 'Food guidance that fits life.', desc: 'Useful structure for your goal, with room for restaurants, travel and weekends.' },
              { num: '05', title: 'Hands-on technique coaching.', desc: 'Learn how to perform, progress and adapt the exercises that matter to your goal.' },
              { num: '06', title: 'Clear progress. Clear next step.', desc: 'Aian reviews what is working and sets the next priority with you.' },
            ].map((item) => (
              <div key={item.num} className="bg-charcoal-850 p-6 sm:p-7 hover:bg-charcoal-800 transition-colors group">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-smoke-400 pt-1 font-semibold tracking-wider">{item.num}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-smoke-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-paper-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
            >
              <span>See everything coaching includes</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">YOUR STARTING POINT</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">
                WHAT ARE YOU WORKING TOWARD?
              </h2>
              <p className="text-base sm:text-lg text-paper-300 leading-relaxed pt-2">
                Get leaner and stronger. Build muscle while keeping your fitness. Train for a race. Find your way back after time away. You can bring more than one goal; Aian helps decide what matters first.
              </p>
              <button
                onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-2 pt-3 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
              >
                <span>Explore the full goal range</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="lg:col-span-7 grid gap-3">
              {[
                { label: 'A clear return to training', copy: 'A plan that works around a changing week and gives you a consistent place to start.' },
                { label: 'A stronger, leaner body', copy: 'Focused strength work, practical food guidance and steady accountability—not an all-or-nothing reset.' },
                { label: 'A specific event or performance goal', copy: 'Training that develops the physical qualities the event actually asks of you, without losing sight of recovery.' },
              ].map((item, index) => (
                <div key={item.label} className="p-5 sm:p-6 bg-charcoal-900 border border-white/5 rounded-sm flex gap-4">
                  <span className="font-mono text-xs text-smoke-400 pt-1">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-paper-400 leading-relaxed font-light">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="bg-gradient-to-br from-charcoal-850 to-charcoal-950 p-8 sm:p-12 md:p-14 border border-white/10 rounded-sm relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">HOW YOU BEGIN</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase mb-5">
                SIX WEEKS. PROPERLY COACHED.
              </h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-7">
                BASELN / 6 is the first six weeks of private coaching. Aian learns your objective and actual week, builds your initial training and food approach, then reviews the response as you work. At the end, you have a clear review and recommendation for what comes next.
              </p>
              <button
                onClick={() => { onNavigate('/how-it-works'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal-950 px-6 py-3.5 rounded-sm hover:bg-paper-200 transition-colors shadow-lg"
              >
                <span>How BASELN / 6 works</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="hidden lg:block absolute right-12 bottom-8 opacity-10 pointer-events-none">
              <span className="font-serif text-[160px] leading-none text-white select-none">/ 6</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
                <img
                  src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png"
                  alt="Aian McLennan coaching one person directly"
                  className="w-full h-auto object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300 tracking-wider">Aian McLennan · Direct coaching</div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">DIRECT RELATIONSHIP</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-light text-white leading-tight uppercase">WORK DIRECTLY WITH AIAN.</h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                Aian has coached across strength and conditioning, body composition and athletic performance, while building a training culture at The Clubhouse that kept people involved in the work. At BASELN, he assesses the brief, writes the work and reviews the feedback himself.
              </p>
              <div className="p-4 bg-charcoal-900 border border-white/5 rounded-sm">
                <p className="text-sm text-paper-300 leading-relaxed italic">Your coaching stays personal: the person making the decisions is the person you can speak to.</p>
              </div>
              <button
                onClick={() => { onNavigate('/about'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-2 pt-1 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
              >
                <span>Meet Aian</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 bg-charcoal-900 text-center">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">GET STARTED</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-tight uppercase mb-5">TELL AIAN WHAT YOU WANT TO CHANGE.</h2>
          <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-8 max-w-xl mx-auto">
            You do not need to arrive fit, organised or certain which goal to choose. Tell him where you are, what you want to achieve and what has been getting in the way. Your application starts a conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"
            >
              <span>Apply for coaching</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold border border-white/10 hover:border-white/20 text-paper-300 hover:text-white px-7 py-4 rounded-sm transition-colors"
            >
              <span>Read what is included</span>
            </button>
          </div>
          <div className="mt-8 text-xs text-paper-400/80 font-mono">Direct conversation · Personal coaching · No automated onboarding</div>
        </div>
      </section>
    </div>
  );
};
