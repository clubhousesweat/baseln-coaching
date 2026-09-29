import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Shield, Calendar, Activity, MessageSquare, Utensils, Award, Clock } from 'lucide-react';
import { PageRoute } from '../types';

interface CoachingPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate }) => {
  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Do I need to be fit already?',
      a: 'No. Training begins with an honest assessment of your current ability, schedule, injuries and equipment. Aian prescribes work suitable for where you are today, not an arbitrary test meant for athletes.',
    },
    {
      q: 'Can I work on several goals at once?',
      a: 'Yes. You might want to lose body fat, build strength and prepare for a 5 km run. Aian establishes the primary priority so the training does not become chaotic, while developing complementary qualities alongside it.',
    },
    {
      q: 'How many days each week will I train?',
      a: 'Usually three or four days, based entirely on your life, work pattern and recovery. Two focused sessions you consistently complete beat four planned sessions that create friction and stress.',
    },
    {
      q: 'Do I need a commercial gym membership?',
      a: 'No. Programmes can be written for commercial gyms, boutique facilities, garage setups or minimal home kit (dumbbells and bands). The training prescription uses whatever gear you actually have available.',
    },
    {
      q: 'How does nutrition guidance work?',
      a: 'Aian does not issue cookie-cutter meal plans that eliminate normal food. He focuses on practical structure: protein consistency, habit anchors, and calorie targets when necessary, with room for dining out and travel.',
    },
    {
      q: 'How do I contact Aian and how quickly should I expect a response?',
      a: 'You communicate directly with Aian via your dedicated coaching thread in the Training Room. You can send questions, workout notes and lifting clips anytime. Responses are sent within 24 business hours.',
    },
    {
      q: 'What if work travel or illness causes me to miss a week?',
      a: 'You message Aian. He adjusts the prescription, trims volume, or resets the target for the week ahead. Missed days are treated as training data to adapt around, not character failures.',
    },
    {
      q: 'What happens after the six-week BASELN / 6 phase?',
      a: 'At the end of week six, Aian conducts a comprehensive review. If you have hit your milestone and wish to conclude, you do so with clear takeaways. Continuing clients transition smoothly into Ongoing Private Coaching.',
    },
  ];

  return (
    <div className="pt-24">
      {/* CHAPTER 1: SERVICE HERO */}
      <section className="py-16 sm:py-24 border-b border-white/10 bg-gradient-to-b from-charcoal-950 to-charcoal-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-smoke-400">
                <span>BASELN / PRIVATE COACHING</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05]">
                <span className="block">YOUR OBJECTIVE</span><span className="block">SETS THE WORK.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-paper-300 font-light leading-relaxed max-w-2xl">
                Train directly with Aian McLennan. Your programme, food strategy and coaching priorities are chosen for your goal and starting point. He stays involved as you train: teaching technique, reviewing progress, keeping you accountable and deciding what needs to happen next.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
                  className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"
                >
                  <span>Apply to work with Aian</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#inclusions"
                  className="inline-flex items-center justify-center text-xs sm:text-sm uppercase tracking-widest font-semibold text-paper-300 hover:text-white px-5 py-4 transition-colors"
                >
                  See what coaching includes ↓
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/media/aian-boxing-coaching_a6d265ac_1df786b5.png"
                  alt="Aian coaching one person"
                  className="w-full h-auto object-cover contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-paper-300">
                  Individual Training Prescription · Direct Coach Review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: GOAL RANGE */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
              BREADTH OF PRESCRIPTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
              WHAT CAN YOU WORK ON?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">
              Your goal may cross several of these. Aian helps set the order of priorities. They are examples of what can be built, not separate packaged programmes.
            </p>
          </div>

          {/* Six visible categories in a clean typographic grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Lose body fat',
                focus: 'Metabolic & Body Composition',
                desc: 'Preserve muscle tissue, build metabolic resilience and drop body fat through progressive lifting and realistic nutritional targets.',
              },
              {
                title: 'Build muscle',
                focus: 'Hypertrophy & Structural Tone',
                desc: 'Programmed mechanical tension, volume management, exercise selection and protein distribution designed to add functional lean mass.',
              },
              {
                title: 'Get stronger',
                focus: 'Absolute & Relative Strength',
                desc: 'Refine movement efficiency, master compound barbell and dumbbell lifts, and progress loads without breaking down joints.',
              },
              {
                title: 'Improve fitness and conditioning',
                focus: 'Aerobic & Work Capacity',
                desc: 'Develop engine capacity, cardiovascular health, and sustained energy so you stop feeling depleted during workouts and daily life.',
              },
              {
                title: 'Prepare for an event or sport',
                focus: 'Targeted Specificity',
                desc: 'Structured preparation for running races, hybrid endurance challenges, athletic seasons or demanding physical recreation.',
              },
              {
                title: 'Return to training',
                focus: 'Reconditioning & Consistency',
                desc: 'A sensible, joint-friendly ramp back into physical training after months or years away, preventing early burnout or injury.',
              },
            ].map((goal, idx) => (
              <div
                key={idx}
                className="p-7 bg-charcoal-850 border border-white/5 rounded-sm hover:border-white/15 transition-all group"
              >
                <div className="text-[11px] font-mono text-smoke-400 uppercase tracking-widest mb-3">
                  0{idx + 1} / {goal.focus}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3 group-hover:text-smoke-300 transition-colors">
                  {goal.title}
                </h3>
                <p className="text-sm text-paper-400 leading-relaxed font-light">
                  {goal.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-charcoal-950 border border-white/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-paper-300 font-light">
              <strong className="text-white font-medium">Multiple priorities?</strong> A client who wants to lose body fat, regain strength and run a 5 km has a legitimate brief; the work is sequenced intelligently.
            </p>
            <button
              onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
              className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white shrink-0 flex items-center gap-1.5"
            >
              <span>Submit your brief</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: EXACTLY WHAT CLIENTS RECEIVE */}
      <section id="inclusions" className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
              THE FULL INCLUSION LIST
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
              PRIVATE COACHING. THE FULL EXPERIENCE.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">
              You bring the goal. Aian builds the work, teaches you how to do it, helps you get your food and habits working for you, and stays involved through the first block and beyond.
            </p>
          </div>

          {/* 8 Full inclusions (2x4 on wide desktop, single column on phone) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden border border-white/10">
            {[
              {
                num: '01',
                title: 'TRAINING WRITTEN FOR YOU',
                body: 'A programme built around your objective, experience, ability, equipment and available week. Strength, muscle, conditioning and event work appear where they serve the brief.',
              },
              {
                num: '02',
                title: 'DIRECT ACCESS TO AIAN',
                body: 'Ask questions, discuss the week ahead, send relevant footage and receive feedback from the person making the coaching decisions. Regular communication inside your private thread.',
              },
              {
                num: '03',
                title: 'ACCOUNTABILITY WITH FOLLOW-THROUGH',
                body: 'Agree on the sessions and habits that matter. Aian reviews what happened, notices patterns and helps address the reason momentum dropped. This is not a daily guilt score.',
              },
              {
                num: '04',
                title: 'TECHNIQUE AND TRAINING EDUCATION',
                body: 'Learn how to execute, progress and understand the work. Aian uses varied strength, conditioning and performance methods appropriate to you, rather than novelty for novelty’s sake.',
              },
              {
                num: '05',
                title: 'FOOD THAT WORKS IN REAL LIFE',
                body: 'Get the level of nutrition structure the goal calls for: practical meal patterns, portions and protein, or detailed targets where useful. Restaurants, travel and weekends are part of the conversation.',
              },
              {
                num: '06',
                title: 'TRAINING THAT CAN RESPOND',
                body: 'When work, family, travel or recovery changes the week, Aian helps decide what to move, shorten, modify or leave alone. Adaptation has a reason; the programme is not rewritten for show every Tuesday.',
              },
              {
                num: '07',
                title: 'PROGRESS YOU UNDERSTAND',
                body: 'Review measures relevant to your brief. Aian explains what they reveal, what is improving, where the work is stuck and what the next block should prioritise.',
              },
              {
                num: '08',
                title: 'COACHING AT YOUR LEVEL',
                body: 'Aian’s experience spans high-level performers and everyday people. Training standards stay high while the work changes with your age, history, ability and objective.',
              },
            ].map((inc) => (
              <div
                key={inc.num}
                className="bg-charcoal-900 p-8 sm:p-10 hover:bg-charcoal-850 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-smoke-400 font-bold pt-1">
                    {inc.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase mb-3">
                      {inc.title}
                    </h3>
                    <p className="text-sm sm:text-base text-paper-400 font-light leading-relaxed">
                      {inc.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 4: HOW BASELN / 6 WORKS */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
              THE STARTING PHASE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
              SIX WEEKS IS THE START. THE WORK BEGINS IMMEDIATELY.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-paper-300 leading-relaxed font-light">
              BASELN / 6 is the six-week starting phase of private coaching. There is no shared start date and no shared workout. After assessment and conversation, Aian builds the first prescription; the client begins training toward the objective when it is ready. The work itself then makes the coaching more precise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* 4-stage vertical sequence */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  stage: 'Before training',
                  title: 'Establish the brief',
                  detail: 'Application followed by a real conversation and fuller assessment: objective, history, available time, equipment, current nutrition, recovery, relevant limitations and how you like to be coached. Choose useful starting measures, not a universal testing battery.',
                },
                {
                  stage: 'First sessions',
                  title: 'Get to work',
                  detail: 'Receive a short Current Block brief: primary objective, secondary priorities, session structure, nutrition starting point, agreed habits and what will be reviewed. You train, ask questions and send feedback. Early performance and schedule friction help refine the prescription.',
                },
                {
                  stage: 'During the block',
                  title: 'Coach and progress',
                  detail: 'Aian reviews training, relevant food habits, technique, adherence and recovery. He progresses the work when the response supports it and changes what is not serving the objective. A disrupted week is addressed rather than treated as a character flaw.',
                },
                {
                  stage: 'End of week six',
                  title: 'Review and decide',
                  detail: 'Aian compares the original brief with what happened. You receive: where you started; what changed; what worked; what held progress back; what Aian learned; and his recommendation for the next phase. Continuing clients move into ongoing private coaching based on that evidence.',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-charcoal-850 border border-white/5 rounded-sm relative pl-12"
                >
                  <div className="absolute left-5 top-7 w-2 h-2 rounded-full bg-smoke-400" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">
                    Stage 0{idx + 1} · {step.stage}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-paper-400 leading-relaxed font-light">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Realistic Sample Current Block Card */}
            <div className="lg:col-span-5 bg-charcoal-950 border border-white/10 rounded-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-smoke-400 block">
                    SAMPLE COACHING BRIEF
                  </span>
                  <h4 className="font-serif text-lg text-white">Current Block: Phase 01</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-paper-300 rounded">
                  Week 1 of 6
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-paper-400 block mb-1 text-[11px]">PRIMARY OBJECTIVE</span>
                  <div className="text-white text-sm font-sans font-medium">
                    Re-establish 3x weekly compound lifting around shift roster + 8k daily steps.
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-paper-400 block mb-1 text-[11px]">WEEKLY STRUCTURE</span>
                  <div className="text-paper-300 font-sans text-xs space-y-1">
                    <div>• Day 1: Upper Strength + Torso Stability (45 min)</div>
                    <div>• Day 2: Lower Capacity + Posterior Chain (45 min)</div>
                    <div>• Day 3: Total Body Density + Zone 2 Flush (40 min)</div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-paper-400 block mb-1 text-[11px]">FOOD STRATEGY</span>
                  <div className="text-paper-300 font-sans text-xs">
                    Target 140g protein minimum; anchor breakfast and post-training meals. No calorie tracking in Block 1.
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-paper-400 block mb-1 text-[11px]">COACH CHECK-IN</span>
                  <div className="text-smoke-300 font-sans text-xs italic">
                    “Send video of final deadlift set on Day 2. Focus on lat tension before bar breaks the floor.”
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { onNavigate('/training-room'); window.scrollTo(0, 0); }}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest border border-white/10 hover:border-white/20 text-paper-300 hover:text-white rounded-sm transition-colors"
                >
                  Preview Training Room Interface →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 5: THE LIVED COACHING EXPERIENCE */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                REAL LIFE INTEGRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
                WHAT HAPPENS WHEN THE WEEK DOESN’T GO TO PLAN?
              </h2>
              <div className="p-5 bg-charcoal-900 border-l-2 border-smoke-400 text-paper-200 italic font-serif text-base sm:text-lg">
                “You planned three sessions. Work travel wipes out two, and Thursday gives you 30 minutes. Tell Aian. He decides which work matters this week, what can move and whether a shorter session is useful. Next week builds from what you actually completed.”
              </div>
              <p className="text-xs font-mono text-paper-400 uppercase tracking-widest">
                Label: Illustrative example / Not a client case or instant-reply guarantee
              </p>
            </div>

            <div className="space-y-6 bg-charcoal-900 p-8 sm:p-10 border border-white/5 rounded-sm">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight uppercase">
                EAT WELL. ENJOY YOUR LIFE.
              </h3>
              <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
                Aian helps you identify the food habits that actually move the goal. For some clients that is protein and a reliable meal pattern; for others, more detailed targets are useful. The approach accounts for restaurants, social occasions, travel and preference. Specific goals may require periods of greater discipline, but clients understand why and can make informed choices.
              </p>
              <div className="border-t border-white/5 pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke-400 block mb-1">
                  HONEST COMMUNICATION
                </span>
                <p className="text-xs sm:text-sm text-paper-400 leading-relaxed font-light">
                  A structured review of agreed actions and progress plus direct contact between reviews. Aian does not offer 24/7 unmonitored hype; he provides reliable, high-signal coaching feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 6: THE NEXT BLOCK AND FIT */}
      <section className="py-20 sm:py-28 bg-charcoal-900 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-3">
            SUSTAINED PROGRESSION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight uppercase mb-6">
            KNOW WHAT CHANGED. KNOW WHAT COMES NEXT.
          </h2>
          <p className="text-base sm:text-lg text-paper-300 font-light leading-relaxed mb-6">
            At the six-week review, Aian assesses the measures appropriate to the client—training performance, consistency, body composition where relevant, conditioning, event readiness, food habits and feedback. The next prescription follows what has been learned. If the client has achieved what they came for, the review can be a proper ending; if there is more to do and both sides agree, ongoing coaching continues from there.
          </p>
          <div className="p-4 bg-white/5 border border-white/5 rounded-sm inline-block text-left mb-8">
            <p className="text-xs sm:text-sm text-smoke-300 font-mono">
              <strong>Suitability:</strong> New to training or experienced, younger or older, the starting point affects the prescription. BASELN is for people willing to communicate and do the work, not only athletes.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 7: TERMS, FAQ AND FINAL ACTION */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Commercial terms at a glance */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block">
                COMMERCIAL CLARITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                COACHING AT A GLANCE
              </h2>
              <div className="bg-charcoal-900 border border-white/10 rounded-sm p-6 space-y-4 text-sm">
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-paper-400">Starting Phase</span>
                  <span className="text-white font-semibold">BASELN / 6 (6 Weeks)</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-paper-400">Relationship</span>
                  <span className="text-white font-medium">1:1 Private Online Coaching</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-paper-400">Coach</span>
                  <span className="text-white font-medium">Aian McLennan directly</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-paper-400">Initial Prescription</span>
                  <span className="text-white font-medium">Individual Training & Nutrition</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-paper-400">Ongoing Coaching</span>
                  <span className="text-white font-medium">Available post-review</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-paper-400">Payment Model</span>
                  <span className="text-smoke-300 font-mono text-xs">Agreed upon qualification</span>
                </div>
              </div>
              <p className="text-xs text-paper-400 font-light leading-relaxed">
                We do not hide a six-week paid commitment behind vague “month-to-month” language. All terms, contact channels and expectations are confirmed before your first session begins.
              </p>
            </div>

            {/* Expandable FAQs */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <div className="space-y-3">
                {faqItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 bg-charcoal-900 rounded-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors focus:outline-none"
                      aria-expanded={openFaq === idx}
                    >
                      <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-smoke-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-paper-300 font-light leading-relaxed border-t border-white/5 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="mt-20 pt-16 border-t border-white/10 text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight uppercase mb-4">
              WHAT DO YOU WANT TO CHANGE IN THE NEXT SIX WEEKS?
            </h3>
            <p className="text-sm sm:text-base text-paper-300 font-light mb-8">
              Tell Aian where you are now, what you want to achieve and what you need help staying with. Your application begins a conversation, not an automatic checkout.
            </p>
            <button
              onClick={() => { onNavigate('/apply'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-8 py-4 rounded-sm shadow-xl transition-all"
            >
              <span>Apply for BASELN / 6</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
