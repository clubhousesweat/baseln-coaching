import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (path: PageRoute) => void;
}

const baselineFields = [
  { title: 'YOUR OBJECTIVE', copy: 'What do you actually want to change?' },
  { title: 'YOUR TRAINING', copy: 'Experience, current ability, strengths, weaknesses and training history.' },
  { title: 'YOUR WEEK', copy: 'Work, family, travel, available days and realistic session duration.' },
  { title: 'YOUR BODY', copy: 'Relevant measurements, photographs, injuries, limitations and starting markers.' },
  { title: 'YOUR NUTRITION', copy: 'Current habits, preferences, previous approaches and what needs attention.' },
  { title: 'YOUR COACHING', copy: 'Where you need direction, accountability, technical help or simply somebody making better decisions.' },
];

const prescriptionDecisions = [
  'How often you should train.',
  'What deserves the most attention.',
  'How strength and conditioning should be structured.',
  'What level of nutrition support you need.',
  'What we’re going to measure.',
  'What can wait.',
];

const sixWeekJourney = [
  {
    number: '01',
    marker: 'ESTABLISH',
    week: 'WEEK 01',
    title: 'START WITH THE RIGHT WORK.',
    copy: ['Your initial training and nutrition approach goes live.', 'Week one establishes useful working baselines — appropriate loads, exercise selection, training capacity, session duration, nutrition structure and how the prescription actually fits into your life.'],
    line: 'We’re not trying to destroy you in Week 1. We’re trying to get it right.',
  },
  {
    number: '02',
    marker: 'REFINE',
    week: 'WEEK 02',
    title: 'NOW WE HAVE REAL INFORMATION.',
    copy: ['An assessment tells us a lot. Actually coaching you tells us more.', 'Aian can now see how you’re performing the work, what you’re recovering from, where technique needs attention, whether the schedule works and how you’re responding.', 'Where something needs changing, we change it. Where it doesn’t, we leave it alone.'],
    line: 'Leave it alone when it is working.',
  },
  {
    number: '03',
    marker: 'PROGRESS',
    week: 'WEEK 03',
    title: 'START MOVING THE RIGHT NUMBERS.',
    copy: ['Now we’re building from something real.', 'Depending on your objective, that could mean progressing strength, training volume, conditioning, movement quality, nutrition consistency or another relevant variable.', 'Not everything needs to increase at once.'],
    line: 'We progress what earns progression.',
  },
  {
    number: '04',
    marker: 'DEVELOP',
    week: 'WEEK 04',
    title: 'BUILD ON THE RESPONSE.',
    copy: ['By now we’re no longer working from assumptions. We have several weeks of training, feedback and progress to work with.', 'The prescription becomes more accurate as we learn more about you. Training progresses. Nutrition can be refined. Technique improves. Weak points become clearer.'],
    line: 'The coaching gets more specific because the information gets better.',
  },
  {
    number: '05',
    marker: 'ADVANCE',
    week: 'WEEK 05',
    title: 'PUSH WHAT’S READY.',
    copy: ['This doesn’t automatically mean doing more. It means applying pressure where it can produce something useful.', 'For one person that could be heavier strength work. For another, more training volume, better conditioning, tighter nutrition, event-specific work or simply another week of executing something that’s already working.'],
    line: 'Harder isn’t automatically better. Better is better.',
  },
  {
    number: '06',
    marker: 'REVIEW',
    week: 'WEEK 06',
    title: 'WHAT ACTUALLY CHANGED?',
    copy: ['Now we return to the objective we started with.', 'Aian reviews the six weeks against the measures that matter to you.'],
    line: 'The measure serves the goal. Not the other way around.',
  },
];

const coachingSupport = [
  {
    number: '01',
    title: 'DIRECT ACCESS TO AIAN',
    copy: 'Questions don’t need to sit unanswered until some arbitrary end-of-week form. You have direct communication with Aian throughout the coaching relationship.',
  },
  {
    number: '02',
    title: 'TECHNIQUE FEEDBACK',
    copy: 'Send training footage when something needs reviewing. Aian can coach execution, identify problems and give you something specific to work on. Not “Great work.” Actual coaching.',
  },
  {
    number: '03',
    title: 'PROGRESS REVIEW',
    copy: 'Your training and relevant progress markers are being reviewed throughout the block. We’re interested in whether the work is producing the response we expected — not simply whether every box turned green.',
  },
  {
    number: '04',
    title: 'REAL-LIFE ADJUSTMENT',
    copy: 'Travel happens. Work blows up. You miss Tuesday. Sleep is terrible. You suddenly have 30 minutes instead of an hour. Where the week needs adjusting, Aian decides what is worth keeping, moving, shortening or changing.',
  },
];

const reviewMeasures = ['Body composition', 'Measurements', 'Strength', 'Conditioning', 'Training performance', 'Consistency', 'Technique', 'Event performance', 'How you actually feel and function'];

const baseSixIncludes = [
  'Detailed starting assessment',
  'Individual training prescription',
  'Strength programming',
  'Conditioning programming',
  'Body-composition strategy',
  'Nutrition coaching',
  'Direct access to Aian',
  'Training technique feedback',
  'Video analysis',
  'Progress monitoring',
  'Regular coaching review',
  'Programme adjustments',
  'Lifestyle and habit guidance',
  'Event/sport integration where relevant',
  'Private Training Room access',
  'Six-week progress review',
];

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const apply = () => {
    onNavigate('/apply');
    window.scrollTo(0, 0);
  };

  const coaching = () => {
    onNavigate('/coaching');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20 overflow-hidden">
      <section className="relative min-h-[670px] sm:min-h-[700px] flex items-end bg-charcoal-950 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 78% 28%, rgba(175,197,201,0.16), transparent 24%), linear-gradient(118deg, transparent 54%, rgba(175,197,201,0.055) 54.1%, transparent 54.4%)' }} />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pt-24 pb-14 sm:pb-20 w-full">
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-5">HOW BASELN WORKS</span>
            <h1 className="font-serif text-[42px] sm:text-6xl md:text-7xl lg:text-[88px] font-light text-white leading-[0.92] max-w-4xl"><span className="block">START WITH SIX WEEKS.</span><span className="block text-smoke-300">SEE WHAT WE CAN CHANGE.</span></h1>
            <div className="mt-9 max-w-2xl space-y-4 text-base sm:text-lg md:text-xl text-paper-200 font-light leading-relaxed">
              <p>BASELN / 6 is the starting point for private coaching. Six weeks to understand where you are, establish what you need, coach the work and measure what changes.</p>
              <p>Your training, nutrition and priorities are prescribed individually from the outset — then refined as Aian learns more about how you actually respond.</p>
            </div>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6">
              <button onClick={apply} className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-7 py-4 rounded-sm shadow-xl transition-all"><span>Apply for BASELN / 6</span><ArrowRight size={16} /></button>
              <p className="font-serif text-xl sm:text-2xl font-light text-paper-100 leading-tight max-w-md">SIX WEEKS IS THE TIMEFRAME. <span className="text-smoke-300 italic">NOT THE TEMPLATE.</span></p>
            </div>
          </div>
        </div>
        <span className="hidden lg:block absolute right-[7%] bottom-10 font-mono text-[11px] tracking-[0.3em] uppercase text-paper-400/55 rotate-90 origin-bottom-right">CURRENT WORK / 01–06</span>
      </section>

      <section className="bg-charcoal-900 border-b border-white/5 py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">BEFORE WEEK 01</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-light text-white leading-[1.02]">FIRST, WE NEED TO KNOW WHAT WE’RE WORKING WITH.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl text-base sm:text-lg text-paper-200 font-light leading-relaxed space-y-4"><p>Before your first training week, Aian establishes your starting point properly.</p><p>Not just your age, weight and how many days you can train.</p><p>We look at what you want to achieve, what you’ve done before, how you’re currently training, what your week realistically allows, where you train, how you eat, how you recover and anything likely to influence the result.</p></div>
              <div className="mt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2">
                {baselineFields.map((field, index) => <div key={field.title} className={`py-6 pr-4 ${index % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'} border-b border-white/10`}><span className="text-[11px] font-mono uppercase tracking-[0.18em] text-smoke-400 block mb-2">{field.title}</span><p className="text-base text-paper-100 leading-relaxed">{field.copy}</p></div>)}
              </div>
              <p className="mt-9 max-w-2xl font-serif text-xl sm:text-2xl text-paper-100 leading-relaxed">We don’t collect information to make onboarding look impressive. <span className="text-smoke-300 italic">We collect what helps us coach you better.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C7D5D7] text-charcoal-950 py-16 sm:py-20 lg:py-28">
        <div className="absolute right-[-3%] top-[-7%] text-[220px] sm:text-[310px] lg:text-[440px] leading-none font-serif text-charcoal-950/[0.07] select-none pointer-events-none">/ 01</div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-charcoal-950/65 block mb-4">YOUR STARTING POINT IS ESTABLISHED</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[64px] font-light leading-[0.96]">THEN WE BUILD YOUR PRESCRIPTION.</h2>
              <div className="mt-8 max-w-2xl text-base sm:text-lg text-charcoal-950/80 font-normal leading-relaxed space-y-4"><p>There isn’t a BASELN workout waiting for your name to be added to it.</p><p>Aian uses what we’ve established to determine what your training needs to look like now.</p></div>
            </div>
            <div className="lg:col-span-5 lg:pb-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-charcoal-950/65 block pb-4 border-b border-charcoal-950/25">THE DECISIONS</span>
              <ol className="mt-4 space-y-3">
                {prescriptionDecisions.map((decision, index) => <li key={decision} className="flex gap-4 text-base sm:text-lg leading-snug"><span className="font-mono text-sm text-charcoal-950/55 pt-0.5">0{index + 1}</span><span>{decision}</span></li>)}
              </ol>
            </div>
          </div>
          <p className="mt-14 sm:mt-16 text-right font-serif text-2xl sm:text-3xl leading-tight max-w-xl ml-auto">Different objective. Different person. <span className="italic">Different prescription.</span></p>
        </div>
      </section>

      <section className="bg-charcoal-950 border-b border-white/5 py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">BASELN / 6</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[64px] font-light text-white leading-[0.97]">YOUR FIRST SIX WEEKS.</h2>
            <p className="mt-5 text-base sm:text-lg text-paper-300 font-light leading-relaxed">The structure gives the coaching direction. What happens inside it depends on you.</p>
          </div>

          <div className="relative mt-14 sm:mt-20">
            <div className="absolute left-[7px] lg:left-1/2 top-1 bottom-3 border-l border-smoke-400/45" aria-hidden="true" />
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {sixWeekJourney.map((stage, index) => <article key={stage.number} className="relative grid grid-cols-1 lg:grid-cols-12">
                <span className="absolute left-0 lg:left-1/2 top-1 lg:-translate-x-1/2 h-[15px] w-[15px] rounded-full bg-charcoal-950 border-2 border-smoke-400 shadow-[0_0_0_7px_rgba(175,197,201,0.10)]" aria-hidden="true" />
                <div className={`pl-9 lg:pl-0 lg:col-span-5 ${index % 2 === 0 ? 'lg:col-start-1 lg:pr-12' : 'lg:col-start-8 lg:pl-12'}`}>
                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-smoke-400"><span>{stage.number} / {stage.marker}</span><span className="h-px flex-1 bg-white/10" /></div>
                  <span className="block mt-5 text-xs font-mono uppercase tracking-[0.18em] text-paper-400">{stage.week}</span>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-light text-white leading-[1.04]">{stage.title}</h3>
                  <div className="mt-5 space-y-3 text-base sm:text-[17px] text-paper-300 font-light leading-relaxed">{stage.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  <p className="mt-5 font-serif text-lg sm:text-xl italic text-smoke-300 leading-snug">{stage.line}</p>
                  {stage.number === '06' && <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">{reviewMeasures.map((measure) => <span key={measure} className="text-xs sm:text-sm text-paper-200">{measure}</span>)}</div>}
                </div>
              </article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900 py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <figure className="relative min-h-[430px] sm:min-h-[560px] lg:min-h-[690px] overflow-hidden bg-charcoal-950 border border-white/10">
            <img src="/media/aian-dedication-portrait_35c1751c_c8fb4672.png" alt="Aian McLennan coaching a client during training" className="absolute inset-0 h-full w-full object-cover object-center grayscale contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/58 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent" />
            <figcaption className="relative z-10 max-w-xl px-7 sm:px-12 lg:px-16 py-10 sm:py-16 lg:py-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-300 block mb-4">COACHING / NOT CONTENT</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-light text-white leading-[0.96]">THERE’S A PERSON ON THE OTHER SIDE OF THIS.</h2>
              <div className="mt-7 text-base sm:text-lg text-paper-100 font-light leading-relaxed space-y-3"><p>BASELN isn’t an exercise library with messaging attached.</p><p>Aian is involved in what you’re doing, how you’re responding and what happens next.</p></div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="relative bg-charcoal-850 border-y border-white/5 py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute left-[3%] top-12 text-[130px] sm:text-[210px] font-serif leading-none text-white/[0.025] select-none pointer-events-none">//</div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5"><span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">THROUGHOUT BASELN / 6</span><h2 className="font-serif text-4xl sm:text-5xl md:text-[58px] font-light text-white leading-[0.98]">YOU’RE NOT LEFT ALONE WITH A PROGRAMME.</h2></div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 sm:gap-y-12">
              {coachingSupport.map((item) => <article key={item.number} className="border-l border-smoke-400/45 pl-5"><span className="text-xs font-mono tracking-[0.18em] text-smoke-400">{item.number}</span><h3 className="mt-3 text-sm sm:text-base font-semibold tracking-wide text-white">{item.title}</h3><p className="mt-3 text-sm sm:text-base text-paper-300 font-light leading-relaxed">{item.copy}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-950 border-b border-white/5 py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">NUTRITION</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-[64px] font-light text-white leading-[0.95]"><span className="block">ENOUGH STRUCTURE TO GET THE RESULT.</span><span className="block text-smoke-300">NOT ENOUGH TO RUIN DINNER.</span></h2>
            </div>
            <div className="lg:col-span-5 text-base sm:text-lg text-paper-300 font-light leading-relaxed space-y-4"><p>Nutrition is coached according to the objective and the person.</p><p>For some clients that means detailed calorie and macronutrient targets. For others, the better answer is protein, portions, meal structure, food quality, eating-out strategies and a handful of behaviours that can actually be repeated.</p><p>We don’t make nutrition complicated to make coaching look sophisticated.</p></div>
          </div>
          <div className="mt-12 sm:mt-16 border-t border-white/10 pt-7 sm:pt-9 max-w-3xl"><p className="font-serif text-2xl sm:text-3xl text-paper-100 leading-tight">Use the least restrictive approach capable of producing the <span className="italic text-smoke-300">result.</span></p></div>
        </div>
      </section>

      <section className="bg-charcoal-900 border-b border-white/5 py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 block mb-4">AFTER BASELN / 6</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[64px] font-light text-white leading-[0.95]"><span className="block">SIX WEEKS GIVES US AN ANSWER.</span><span className="block text-smoke-300">NOT AN EXPIRY DATE.</span></h2>
            <div className="mt-8 text-base sm:text-lg text-paper-300 font-light leading-relaxed space-y-4"><p>At the end of BASELN / 6, we review where you started, what’s changed and what still deserves attention.</p><p>If you’ve achieved what you came for and you’re ready to take it from there, excellent.</p><p>If there’s more work to do, private coaching continues into the next appropriate phase.</p></div>
          </div>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-0 border-y border-white/10"><div className="py-5 sm:py-6 border-b sm:border-b-0 sm:border-r border-white/10"><span className="text-xs font-mono text-smoke-400">01</span><p className="mt-2 text-paper-100">No reset.</p></div><div className="py-5 sm:py-6 sm:px-8 border-b sm:border-b-0 sm:border-r border-white/10"><span className="text-xs font-mono text-smoke-400">02</span><p className="mt-2 text-paper-100">No new generic programme.</p></div><div className="py-5 sm:py-6 sm:pl-8"><span className="text-xs font-mono text-smoke-400">03</span><p className="mt-2 text-paper-100">No arbitrary need to start again.</p></div></div>
          <p className="mt-9 font-serif text-2xl sm:text-3xl text-paper-100 leading-tight max-w-3xl">We simply keep coaching from a much better-informed position.</p>
          <button onClick={coaching} className="inline-flex items-center gap-3 mt-9 text-xs sm:text-sm uppercase tracking-widest font-semibold text-smoke-400 hover:text-white transition-colors"><span>Explore private coaching</span><ArrowRight size={16} /></button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C7D5D7] text-charcoal-950 py-16 sm:py-20 lg:py-28">
        <div className="absolute -right-4 bottom-[-4rem] font-serif text-[230px] sm:text-[330px] lg:text-[470px] leading-none text-charcoal-950/[0.07] select-none pointer-events-none">/ 6</div>
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-charcoal-950/65 block mb-4">BASELN / 6</span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end"><div className="lg:col-span-7"><h2 className="font-serif text-4xl sm:text-5xl md:text-[64px] font-light leading-[0.95]">SIX WEEKS OF ACTUAL COACHING.</h2></div><p className="lg:col-span-5 text-base sm:text-lg text-charcoal-950/75 leading-relaxed">A clear starting point, direct responsibility for the work, and a review of what changed before the next decision is made.</p></div>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-14 border-t border-charcoal-950/20 pt-7 sm:pt-9">
            {baseSixIncludes.map((item, index) => <div key={item} className="flex items-start gap-3 py-2.5 text-base sm:text-lg leading-snug"><span className="font-mono text-xs text-charcoal-950/55 pt-1">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></div>)}
          </div>
          <div className="mt-14 sm:mt-16 max-w-3xl"><p className="font-serif text-3xl sm:text-4xl leading-[1.02]">THE STANDARD DOESN’T CHANGE. <span className="italic">THE PRESCRIPTION DOES.</span></p><div className="mt-12 sm:mt-16 border-t border-charcoal-950/25 pt-8"><h2 className="font-serif text-4xl sm:text-5xl leading-[0.97] max-w-3xl">WHAT DO YOU WANT TO BE DIFFERENT SIX WEEKS FROM NOW?</h2><p className="mt-5 text-lg sm:text-xl">That’s where we start.</p><button onClick={apply} className="inline-flex items-center gap-3 mt-8 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-charcoal-950 hover:bg-charcoal-850 text-paper-100 px-7 py-4 rounded-sm shadow-xl transition-all"><span>Apply for BASELN / 6</span><ArrowRight size={16} /></button><p className="mt-5 text-xs font-mono uppercase tracking-[0.14em] text-charcoal-950/65">Private coaching with Aian McLennan.</p></div></div>
        </div>
      </section>
    </div>
  );
};
