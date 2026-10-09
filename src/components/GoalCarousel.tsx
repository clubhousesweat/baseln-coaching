import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GoalSlide {
  title: string;
  eyebrow: string;
  image: string;
}

const goalSlides: GoalSlide[] = [
  {
    title: 'Lose body fat',
    eyebrow: 'Lean out with a plan that fits',
    image: '/media/goals/lose-body-fat.jpg',
  },
  {
    title: 'Build muscle',
    eyebrow: 'Build more than size',
    image: '/media/goals/build-muscle.jpg',
  },
  {
    title: 'Get stronger',
    eyebrow: 'Strength, deliberately built',
    image: '/media/goals/get-stronger.jpg',
  },
  {
    title: 'Improve fitness',
    eyebrow: 'Build capacity that lasts',
    image: '/media/goals/improve-fitness.jpg',
  },
  {
    title: 'Prepare for an event',
    eyebrow: 'Arrive prepared',
    image: '/media/goals/prepare-event.jpg',
  },
  {
    title: 'Return to training',
    eyebrow: 'Start again with direction',
    image: '/media/goals/return-to-training.jpg',
  },
];

export const GoalCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    const nextIndex = (index + goalSlides.length) % goalSlides.length;
    const slide = trackRef.current?.querySelector<HTMLElement>(`[data-goal-index="${nextIndex}"]`);
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const handleScroll = () => {
      const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-goal-index]'));
      const trackCentre = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - trackCentre);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        aria-label="Training goals carousel"
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {goalSlides.map((goal, index) => (
          <article
            key={goal.title}
            data-goal-index={index}
            aria-label={`${goal.title}, slide ${index + 1} of ${goalSlides.length}`}
            className="group relative min-w-[84vw] sm:min-w-[calc((100%-1rem)/2)] lg:min-w-[calc((100%-2rem)/3)] h-[470px] sm:h-[535px] snap-start overflow-hidden rounded-sm bg-charcoal-850 border border-white/10 shadow-2xl"
          >
            <img
              src={goal.image}
              alt=""
              aria-hidden="true"
              loading={index < 3 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/10 to-charcoal-950/85" />
            <div className="absolute inset-x-0 top-0 p-5 sm:p-6 flex items-start justify-between gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-paper-100 drop-shadow-lg">{goal.eyebrow}</span>
              <span className="text-[10px] font-mono text-paper-300/85 shrink-0">0{index + 1}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <div className="h-px bg-white/25 mb-4 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <h3 className="font-serif text-3xl sm:text-[38px] text-white leading-[1.03] font-light drop-shadow-lg">{goal.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4" aria-label="Carousel navigation">
        <div className="flex items-center gap-2">
          {goalSlides.map((goal, index) => (
            <button
              key={goal.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Show ${goal.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-smoke-300 ${activeIndex === index ? 'w-7 bg-smoke-300' : 'w-1.5 bg-white/25 hover:bg-white/65'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-paper-400 tabular-nums">{String(activeIndex + 1).padStart(2, '0')} / {String(goalSlides.length).padStart(2, '0')}</span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => goToSlide(activeIndex - 1)} aria-label="Previous goal" className="w-9 h-9 inline-flex items-center justify-center border border-white/15 rounded-full text-paper-300 hover:text-white hover:border-white/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smoke-300"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => goToSlide(activeIndex + 1)} aria-label="Next goal" className="w-9 h-9 inline-flex items-center justify-center border border-white/15 rounded-full text-paper-300 hover:text-white hover:border-white/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smoke-300"><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
