import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Play, Shield, Target, Compass, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      {/* SECTION 1: H1 HERO (The service in one glance) */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background ambient video loop */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/media/Header_Banner_Background_c72ecdc900_c5b08867.jpg"
            className="w-full h-full object-cover object-center opacity-40 filter contrast-110 brightness-90"
          >
            <source
              src="/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle noise and gradient overlay for contrast assurance */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/75 to-charcoal-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,12,14,0.7)_100%)]" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-smoke-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-paper-200">
                BASELN / PRIVATE ONLINE COACHING
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[72px] leading-[1.08] sm:leading-[1.04] font-light text-paper-50 mb-6 max-w-2xl">
              <span className="block">NOT MADE FOR EVERYONE.</span>
              <span className="italic font-normal text-smoke-300 block sm:inline">
                Made for you.
              </span>
            </h1>

            {/* Exact Body Copy from blueprint */}
            <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed mb-6 max-w-2xl">
              Private coaching with Aian McLennan. Tell him what you want to change. He’ll set the priorities, build the training, help with food and habits, and stay involved while you do the work. Strength, body composition, fitness or a specific event—your starting point determines what happens next.
            </p>

            {/* Small offer line */}
            <div className="p-3.5 sm:p-4 rounded-sm bg-white/5 border-l-2 border-smoke-400 mb-8 max-w-xl">
              <p className="text-xs sm:text-sm text-paper-300 font-medium">
                <span className="text-white font-semibold">Start with BASELN / 6:</span> six weeks of private coaching, with training toward your goal from your first block.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
                className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all active:scale-[0.99]"
              >
                <span>Explore private coaching</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-300 hover:text-white px-6 py-4 transition-colors"
              >
                <span>Apply to work with Aian</span>
                <ChevronRight size={16} className="text-smoke-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none hidden md:block">
          <span className="text-[10px] tracking-widest uppercase text-paper-400/60 font-mono">
            Scroll to inspect the service & structure
          </span>
        </div>
      </section>

      {/* SECTION 2: BENEFITS PREVIEW (The service) */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
              THE SERVICE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase max-w-2xl">
              YOUR TRAINING IS BUILT. YOUR COACH IS INVOLVED.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 max-w-2xl leading-relaxed">
              Aian does more than write sessions. He teaches the work, checks how you are responding and helps make the next decision. Here is what that means when you join.
            </p>
          </div>

          {/* Six concise rows: 2 columns desktop, 1 column mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden border border-white/10">
            {[
              {
                num: '01',
                title: 'Training written for you.',
                desc: 'A programme shaped by your objective, ability, schedule and equipment.',
              },
              {
                num: '02',
                title: 'Direct coaching.',
                desc: 'Questions, technique footage and feedback go to Aian, the person guiding the work.',
              },
              {
                num: '03',
                title: 'Accountability that acts.',
                desc: 'Agreed actions are reviewed. If momentum drops, you address it together.',
              },
              {
                num: '04',
                title: 'Nutrition that fits life.',
                desc: 'The right amount of structure for your goal, with room for restaurants, travel and weekends.',
              },
              {
                num: '05',
                title: 'Methods you understand.',
                desc: 'Learn how to perform, progress and adapt the training instead of merely completing it.',
              },
              {
                num: '06',
                title: 'A clear next move.',
                desc: 'Aian reviews what is working and sets the next priority.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-charcoal-850 p-6 sm:p-8 hover:bg-charcoal-800 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-smoke-400 pt-1 font-semibold tracking-wider">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-smoke-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-paper-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
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

      {/* SECTION 3: RECOGNITION OF DIFFERENT OBJECTIVES */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                INDIVIDUAL BRIEFS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
                WHAT ARE YOU WORKING TOWARD?
              </h2>
              <p className="text-base sm:text-lg text-paper-300 leading-relaxed pt-2">
                Getting leaner and stronger. Building muscle without losing fitness. Training for a race. Finding your way back after years away. You can bring several things to the conversation. Aian helps decide what matters first and what can progress alongside it.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => { onNavigate('/coaching'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
                >
                  <span>Explore the full goal range</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Three paired examples as short editorial text (not product cards) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {[
                {
                  pair: 'Body Composition + Athletic Stamina',
                  clientBrief: '“I want to drop stubborn body fat and feel powerful again, without turning my weekends into endless low-calorie misery.”',
                  prescribedLogic: 'Priority is set on progressive compound resistance training with protein density, while aerobic conditioning is paced to preserve recovery.',
                },
                {
                  pair: 'Strength Return + High-Volume Work Schedule',
                  clientBrief: '“I haven’t trained consistently in four years due to travel and shift work. I need a clear plan that doesn’t fall apart when my calendar slips.”',
                  prescribedLogic: 'Priority begins with establishing three dependable sessions, modular session lengths, and flexible week-to-week adjustments.',
                },
                {
                  pair: 'Specific Event Preparation + Joint Longevity',
                  clientBrief: '“I am preparing for a hybrid endurance event or half-marathon, but previous attempts aggravated knee and lower-back pain.”',
                  prescribedLogic: 'Targeted tissue capacity, running volume regulation, and dedicated posterior chain strength are built progressively into the schedule.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-charcoal-900 border border-white/5 rounded-sm hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs font-mono uppercase tracking-widest text-smoke-400">
                    <span>Example Brief 0{idx + 1}</span>
                    <span className="text-paper-400">{item.pair}</span>
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-paper-200 mb-3">
                    {item.clientBrief}
                  </p>
                  <p className="text-xs sm:text-sm text-paper-400 leading-relaxed font-light">
                    <strong className="text-white font-medium">Aian’s judgement:</strong> {item.prescribedLogic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BASELN / 6 TEASER (How you begin) */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="bg-gradient-to-br from-charcoal-850 to-charcoal-950 p-8 sm:p-12 md:p-16 border border-white/10 rounded-sm relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">
                HOW YOU BEGIN
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase mb-6">
                SIX WEEKS. PROPERLY COACHED.
              </h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-6">
                First, Aian learns your objective, history and actual week. Then he builds your training and an appropriate food strategy. You start working toward the result as soon as your programme is ready. Across the six weeks, he gives feedback, reviews your response and refines what needs refining. At the end, you receive a clear review and recommendation for what comes next.
              </p>

              <div className="inline-block py-2 px-3.5 bg-smoke-500/10 border-l-2 border-smoke-400 mb-8">
                <span className="text-xs sm:text-sm font-mono text-smoke-300 tracking-wide font-medium">
                  The six-week structure is shared. The prescription is yours.
                </span>
              </div>

              <div>
                <button
                  onClick={() => { onNavigate('/how-it-works'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal-950 px-6 py-3.5 rounded-sm hover:bg-paper-200 transition-colors shadow-lg"
                >
                  <span>How BASELN / 6 works</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Subtle graphic badge */}
            <div className="hidden lg:block absolute right-12 bottom-12 opacity-10 pointer-events-none">
              <span className="font-serif text-[180px] leading-none text-white select-none">/ 6</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: AIAN PROOF (Work directly with Aian) */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual: Authentic coaching photograph */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
                <img
                  src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png"
                  alt="Aian McLennan coaching one person directly"
                  className="w-full h-auto object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-400 tracking-wider">
                  Direct Coaching · Individual Execution
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                DIRECT RELATIONSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
                WORK DIRECTLY WITH AIAN.
              </h2>
              <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed">
                Aian has coached across strength and conditioning, body composition and athletic performance, while building a training culture at The Clubhouse that kept people involved in the work. His experience spans high-level performers and everyday clients with jobs, families and very different starting points. At BASELN, he is the person assessing, programming, giving feedback and reviewing your progress.
              </p>

              <div className="p-4 bg-charcoal-900 border border-white/5 rounded-sm">
                <p className="text-xs sm:text-sm text-paper-400 leading-relaxed italic">
                  “You won't be handed off to an anonymous support team or automated chat flow. The person behind the coaching is the person whose name is on it.”
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { onNavigate('/about'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"
                >
                  <span>Meet Aian</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ONE CLOSE (Tell Aian what you want to change) */}
      <section className="py-24 sm:py-32 bg-charcoal-900 text-center">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">
            GET STARTED
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase mb-6">
            TELL AIAN WHAT YOU WANT TO CHANGE.
          </h2>
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
              <span>Read Full Inclusions</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-paper-400/80 font-mono">
            Direct conversation · No automated paywall · Strict client capacity
          </div>
        </div>
      </section>
    </div>
  );
};
