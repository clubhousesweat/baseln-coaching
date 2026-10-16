import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Check, Shield } from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent, getAttribution, AttributionData } from '../utils/analytics';

interface ApplyPageProps {
  onNavigate: (path: PageRoute) => void;
}

export interface CoachingApplicationPayload {
  // Stage 01 Goal
  goals: string[];
  goal_detail?: string;
  // Stage 02 Training Now
  current_training: string;
  training_days: string;
  training_environment: string;
  training_history?: string;
  // Stage 03 Friction
  barrier: string;
  previous_attempts?: string;
  // Stage 04 Fit
  coaching_value?: string;
  why_now: string;
  // Stage 05 Contact & Consent
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  age?: string;
  privacy_ack: true;
  referral_source?: string;
  // System / Attribution
  attribution: AttributionData;
  cta?: string;
  // Compatibility legacy mirrors
  countryTimeZone?: string;
  availableDays?: string;
  biggestObstacle?: string;
  preferredStartDate?: string;
  privacyConsent?: true;
  healthTrainingAcknowledgement?: true;
  marketingOptIn?: false;
}

const GOALS_LIST = [
  'Lose body fat',
  'Build muscle',
  'Get stronger',
  'Improve conditioning',
  'Prepare for an event',
  'Improve general health and fitness',
];

const TRAINING_DAYS = [
  { value: '1–2 days', label: '1–2 days / week', desc: 'Starting or fitting training around demanding commitments' },
  { value: '3 days', label: '3 days / week', desc: 'Balanced, consistent weekly cadence' },
  { value: '4 days', label: '4 days / week', desc: 'Dedicated focus with adequate recovery' },
  { value: '5+ days', label: '5+ days / week', desc: 'High frequency athletic or sport preparation' },
  { value: 'Variable', label: 'Variable schedule', desc: 'Shift-work, roster, travel or changing weekly demand' },
];

const TRAINING_ENVIRONMENTS = [
  { value: 'Commercial gym', label: 'Commercial gym', desc: 'Full barbells, dumbbells, cables and machines' },
  { value: 'Home gym / dumbbells', label: 'Home gym or dumbbells', desc: 'Private space, dumbbells, bench or rack' },
  { value: 'Bodyweight / outdoor', label: 'Bodyweight & outdoors', desc: 'Minimal kit, calisthenics, running or travel-friendly' },
  { value: 'Mix of gym and travel', label: 'Mix of gym & travel', desc: 'Routine adapts between home base and hotels/trips' },
];

const TRAINING_HISTORY_OPTIONS = [
  { value: 'Returning after a break', label: 'Returning after a break' },
  { value: 'Consistent but plateaued', label: 'Consistent but plateaued' },
  { value: 'New to structured strength', label: 'New to structured strength' },
  { value: 'Experienced athlete / lifter', label: 'Experienced athlete / lifter' },
];

export const ApplyPage: React.FC<ApplyPageProps> = ({ onNavigate }) => {
  const [stage, setStage] = useState<number>(1);
  const [attribution, setAttribution] = useState<AttributionData | null>(null);

  // Stage 01
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [goalDetail, setGoalDetail] = useState<string>('');

  // Stage 02
  const [currentTraining, setCurrentTraining] = useState<string>('');
  const [trainingDays, setTrainingDays] = useState<string>('');
  const [trainingEnvironment, setTrainingEnvironment] = useState<string>('');
  const [trainingHistory, setTrainingHistory] = useState<string>('');

  // Stage 03
  const [barrier, setBarrier] = useState<string>('');
  const [previousAttempts, setPreviousAttempts] = useState<string>('');

  // Stage 04
  const [coachingValue, setCoachingValue] = useState<string>('');
  const [whyNow, setWhyNow] = useState<string>('');

  // Stage 05
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [privacyAck, setPrivacyAck] = useState<boolean>(false);
  const [referralSource, setReferralSource] = useState<string>('');

  // State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    const attr = getAttribution();
    setAttribution(attr);
    trackEvent('apply_page_view', {
      landing_page: attr.first_landing_page,
      cta: attr.cta || 'not_set',
      has_utm: Boolean(attr.utm_source),
      utm_source: attr.utm_source || 'direct',
      utm_campaign: attr.utm_campaign || 'none',
      utm_content: attr.utm_content || 'none',
    });
  }, []);

  const triggerStartEvent = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('application_start', {
        form: 'private_coaching_5_stage_application',
        cta: attribution?.cta || 'not_set',
        utm_source: attribution?.utm_source || 'direct',
        utm_campaign: attribution?.utm_campaign || 'none',
        utm_content: attribution?.utm_content || 'none',
      });
    }
  };

  const toggleGoal = (goal: string) => {
    triggerStartEvent();
    setErrorMsg('');
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (stage === 1) {
      if (selectedGoals.length === 0) {
        setErrorMsg('Please select at least one primary goal to continue.');
        return;
      }
      setStage(2);
      window.scrollTo({ top: 80, behavior: 'smooth' });
      return;
    }

    if (stage === 2) {
      if (!currentTraining.trim()) {
        setErrorMsg('Please briefly describe what your training looks like right now.');
        return;
      }
      if (!trainingDays) {
        setErrorMsg('Please select how many days per week you can realistically train.');
        return;
      }
      if (!trainingEnvironment) {
        setErrorMsg('Please select your primary training environment.');
        return;
      }
      setStage(3);
      window.scrollTo({ top: 80, behavior: 'smooth' });
      return;
    }

    if (stage === 3) {
      if (!barrier.trim()) {
        setErrorMsg('Please share what has been the main obstacle or friction getting in the way.');
        return;
      }
      setStage(4);
      window.scrollTo({ top: 80, behavior: 'smooth' });
      return;
    }

    if (stage === 4) {
      if (!whyNow.trim()) {
        setErrorMsg('Please explain why starting private coaching right now is important to you.');
        return;
      }
      setStage(5);
      window.scrollTo({ top: 80, behavior: 'smooth' });
      return;
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (stage > 1) {
      setStage((s) => s - 1);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  const isSourceAmbiguous = !attribution?.utm_source || attribution.utm_source === 'direct' || attribution.utm_source === 'referral';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!timezone.trim()) {
      setErrorMsg('Please state your country or time zone so check-ins suit your location.');
      return;
    }
    if (!privacyAck) {
      setErrorMsg('Please confirm the privacy and health acknowledgement to submit.');
      return;
    }

    const currentAttr = getAttribution();
    const cta = new URLSearchParams(window.location.search).get('cta') || currentAttr.cta || 'site_apply';

    const payload: CoachingApplicationPayload = {
      // 5-stage contract
      goals: selectedGoals,
      goal_detail: goalDetail.trim() || undefined,
      current_training: currentTraining.trim(),
      training_days: trainingDays,
      training_environment: trainingEnvironment,
      training_history: trainingHistory || undefined,
      barrier: barrier.trim(),
      previous_attempts: previousAttempts.trim() || undefined,
      coaching_value: coachingValue.trim() || undefined,
      why_now: whyNow.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || undefined,
      timezone: timezone.trim(),
      age: age.trim() || undefined,
      privacy_ack: true,
      referral_source: isSourceAmbiguous && referralSource.trim() ? referralSource.trim() : undefined,
      attribution: currentAttr,
      cta,
      // Legacy aliases
      countryTimeZone: timezone.trim(),
      availableDays: trainingDays,
      biggestObstacle: barrier.trim(),
      preferredStartDate: whyNow.trim(),
      privacyConsent: true,
      healthTrainingAcknowledgement: true,
      marketingOptIn: false,
    };

    setIsSubmitting(true);

    try {
      // POST to /api/public/coaching-application (or /api/leads fallback)
      const response = await fetch('/api/public/coaching-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || (result.ok !== true && !result.leadId)) {
        const message = typeof result.error === 'string' ? result.error : 'We could not securely receive your application. Please try again.';
        throw new Error(message);
      }

      const leadId = result.leadId;
      try {
        sessionStorage.setItem('baseln_last_lead_receipt', JSON.stringify({ leadId, receivedAt: new Date().toISOString() }));
      } catch {
        // storage optional
      }

      trackEvent('application_complete', {
        lead_id: leadId,
        goals: selectedGoals,
        training_days: trainingDays,
        has_phone: Boolean(payload.phone),
        cta,
        utm_source: currentAttr.utm_source || 'direct',
        utm_medium: currentAttr.utm_medium || 'direct',
        utm_campaign: currentAttr.utm_campaign || 'none',
        utm_content: currentAttr.utm_content || 'none',
        first_landing_page: currentAttr.first_landing_page,
      });

      setSubmitted(true);
      window.scrollTo({ top: 40, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'We could not submit your application right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-paper-400/40 focus:outline-none focus:border-smoke-400 focus:ring-1 focus:ring-smoke-400/20 transition-all';
  const labelClass = 'block text-xs uppercase tracking-wider text-paper-300 font-medium mb-1.5';
  const helperClass = 'text-xs text-paper-400 font-light mt-1.5 leading-relaxed';

  return (
    <div className="pt-24 min-h-[92vh] bg-charcoal-950 pb-20">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-8">
        {/* Compact in-site intro: visible above the fold on desktop and within the first normal mobile phone viewport */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 mb-2.5">
            <span>BASELN · PRIVATE COACHING</span>
            <span className="text-paper-400">0{stage} / 05</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight leading-tight uppercase">
            <span>Apply for coaching.</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-paper-300 font-light leading-relaxed max-w-xl">
            Five short questions to understand your goals, training context and starting point. Aian reviews every submission personally.
          </p>

          {/* Thin progress line in smoke-blue */}
          <div className="mt-5 w-full h-[3px] bg-charcoal-850 rounded-full overflow-hidden">
            <div
              className="h-full bg-smoke-400 transition-all duration-300 ease-out"
              style={{ width: `${(stage / 5) * 100}%` }}
              role="progressbar"
              aria-valuenow={stage}
              aria-valuemin={1}
              aria-valuemax={5}
            />
          </div>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 bg-charcoal-900 border border-smoke-500/30 rounded-sm space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-smoke-500/15 flex items-center justify-center text-smoke-300">
              <CheckCircle2 size={26} strokeWidth={2.2} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block">APPLICATION RECORDED</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Received.</h2>
            </div>

            <div className="p-5 bg-charcoal-850 border border-white/5 rounded-sm">
              <p className="text-sm text-paper-200 font-light leading-relaxed">
                “Received. Aian will personally assess your application and respond within one business day.”
              </p>
            </div>

            <div className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed space-y-2.5">
              <p className="font-medium text-paper-300">What happens next:</p>
              <ul className="list-disc pl-5 space-y-1 text-paper-300">
                <li>Aian assesses whether your goals and weekly schedule suit private coaching.</li>
                <li>Suitable applicants receive an invitation to book a direct conversation.</li>
                <li>Your programme, nutrition guidance and Training Room access begin once confirmed.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-sm transition-colors"
              >
                Return to home
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/coaching')}
                className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white inline-flex items-center gap-1.5"
              >
                <span>Review coaching inclusions</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-charcoal-900 border border-white/10 rounded-sm p-6 sm:p-9 shadow-xl space-y-7">
            {errorMsg && (
              <div role="alert" className="p-3.5 bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded flex items-center gap-3">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STAGE 01: Goals */}
            {stage === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">01 / 05 · PRIMARY OBJECTIVE</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">What are you working towards?</h2>
                  <p className={helperClass}>Select everything that applies. Aian designs training around multiple overlapping goals.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {GOALS_LIST.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`p-3.5 text-left rounded-sm border transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-smoke-500/15 border-smoke-400 text-white shadow-sm ring-1 ring-smoke-400/30'
                            : 'bg-charcoal-950 border-white/10 text-paper-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <span className="text-sm font-medium">{goal}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                            isSelected ? 'bg-smoke-400 border-smoke-400 text-charcoal-950' : 'border-white/20'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label htmlFor="stage-goal-detail" className={labelClass}>
                    Any specific details or context? <span className="text-paper-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="stage-goal-detail"
                    rows={3}
                    value={goalDetail}
                    onChange={(e) => setGoalDetail(e.target.value)}
                    placeholder="e.g. Preparing for a marathon in six months, recovering confidence after shoulder surgery, or wanting to drop 8kg while keeping strength."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* STAGE 02: Training Now */}
            {stage === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">02 / 05 · TRAINING CONTEXT</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">What does training look like right now?</h2>
                  <p className={helperClass}>Your programme is built around your real week, environment and equipment.</p>
                </div>

                <div>
                  <label htmlFor="stage-current-training" className={labelClass}>
                    What are you doing currently? <span className="text-smoke-400">*</span>
                  </label>
                  <textarea
                    id="stage-current-training"
                    rows={3}
                    required
                    value={currentTraining}
                    onChange={(e) => {
                      setCurrentTraining(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. 2 gym sessions when work allows, occasional running, or haven't trained consistently in 3 months."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Realistic weekly training days <span className="text-smoke-400">*</span>
                  </label>
                  <div className="space-y-2 pt-1">
                    {TRAINING_DAYS.map((opt) => {
                      const isSelected = trainingDays === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setTrainingDays(opt.value);
                            setErrorMsg('');
                          }}
                          className={`w-full p-3.5 text-left rounded-sm border transition-all flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-smoke-500/15 border-smoke-400 text-white ring-1 ring-smoke-400/30'
                              : 'bg-charcoal-950 border-white/10 text-paper-300 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-semibold">{opt.label}</div>
                            <div className="text-xs text-paper-400 mt-0.5">{opt.desc}</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                              isSelected ? 'bg-smoke-400 border-smoke-400 text-charcoal-950' : 'border-white/20'
                            }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Training environment &amp; equipment <span className="text-smoke-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {TRAINING_ENVIRONMENTS.map((env) => {
                      const isSelected = trainingEnvironment === env.value;
                      return (
                        <button
                          key={env.value}
                          type="button"
                          onClick={() => {
                            setTrainingEnvironment(env.value);
                            setErrorMsg('');
                          }}
                          className={`p-3 text-left rounded-sm border transition-all ${
                            isSelected
                              ? 'bg-smoke-500/15 border-smoke-400 text-white ring-1 ring-smoke-400/30'
                              : 'bg-charcoal-950 border-white/10 text-paper-300 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-semibold">{env.label}</div>
                          <div className="text-[11px] text-paper-400 mt-0.5">{env.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="stage-training-history" className={labelClass}>
                    Prior training experience <span className="text-paper-400 font-normal">(optional)</span>
                  </label>
                  <select
                    id="stage-training-history"
                    value={trainingHistory}
                    onChange={(e) => setTrainingHistory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select current context</option>
                    {TRAINING_HISTORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STAGE 03: Friction */}
            {stage === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">03 / 05 · OBSTACLES &amp; FRICTION</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">What has been getting in the way?</h2>
                  <p className={helperClass}>An honest summary helps Aian focus coaching where it will provide immediate momentum.</p>
                </div>

                <div>
                  <label htmlFor="stage-barrier" className={labelClass}>
                    Your primary obstacle or challenge <span className="text-smoke-400">*</span>
                  </label>
                  <textarea
                    id="stage-barrier"
                    rows={4}
                    required
                    value={barrier}
                    onChange={(e) => {
                      setBarrier(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. Inconsistent routine due to work travel, lack of progression in the gym, feeling overwhelmed by conflicting nutrition advice, or falling off without direct accountability."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="stage-previous-attempts" className={labelClass}>
                    What have you tried before, and why did it stall? <span className="text-paper-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="stage-previous-attempts"
                    rows={3}
                    value={previousAttempts}
                    onChange={(e) => setPreviousAttempts(e.target.value)}
                    placeholder="e.g. Cookie-cutter PDF programmes that didn't fit real life, group classes that aggravated my lower back, or tracking calories until it became unsustainable."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* STAGE 04: Coaching Fit */}
            {stage === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">04 / 05 · COACHING FIT</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Why is now the right time?</h2>
                  <p className={helperClass}>Coaching requires communication, honesty and consistent involvement from both sides.</p>
                </div>

                <div>
                  <label htmlFor="stage-why-now" className={labelClass}>
                    Why is starting coaching right now important to you? <span className="text-smoke-400">*</span>
                  </label>
                  <textarea
                    id="stage-why-now"
                    rows={4}
                    required
                    value={whyNow}
                    onChange={(e) => {
                      setWhyNow(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. Ready to stop guessing, upcoming event in 12 weeks, or tired of spinning my wheels and want a professional looking over my training."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="stage-coaching-value" className={labelClass}>
                    What do you value most in a coach? <span className="text-paper-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="stage-coaching-value"
                    rows={3}
                    value={coachingValue}
                    onChange={(e) => setCoachingValue(e.target.value)}
                    placeholder="e.g. Direct video technique analysis, a structured plan that adapts to my schedule, honest feedback, and regular weekly reviews."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* STAGE 05: Contact & Consent */}
            {stage === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">05 / 05 · CONTACT DETAILS</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Where can Aian reach you?</h2>
                  <p className={helperClass}>Your details are kept private and used only to review your application and respond.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="stage-name" className={labelClass}>
                      Full name <span className="text-smoke-400">*</span>
                    </label>
                    <input
                      id="stage-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="stage-email" className={labelClass}>
                      Email address <span className="text-smoke-400">*</span>
                    </label>
                    <input
                      id="stage-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="stage-timezone" className={labelClass}>
                      Country / Time zone <span className="text-smoke-400">*</span>
                    </label>
                    <input
                      id="stage-timezone"
                      type="text"
                      required
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      placeholder="e.g. Australia (AEST / AWST) or UK"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="stage-phone" className={labelClass}>
                      Mobile / WhatsApp <span className="text-paper-400 font-normal">(optional, for timely coordination)</span>
                    </label>
                    <input
                      id="stage-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+61 400 000 000"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="stage-age" className={labelClass}>
                      Age <span className="text-paper-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="stage-age"
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 34"
                      className={inputClass}
                    />
                  </div>

                  {isSourceAmbiguous && (
                    <div>
                      <label htmlFor="stage-referral" className={labelClass}>
                        How did you hear about BASELN? <span className="text-paper-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="stage-referral"
                        type="text"
                        value={referralSource}
                        onChange={(e) => setReferralSource(e.target.value)}
                        placeholder="e.g. Instagram, client referral, word of mouth"
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                {/* Explicit medical safety note */}
                <div className="p-3.5 bg-charcoal-950 border border-white/5 rounded text-xs text-paper-400 leading-relaxed flex items-start gap-2.5">
                  <Shield size={16} className="text-smoke-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Health &amp; Safety:</strong> Please do not submit confidential medical diagnoses, rehabilitation notes or sensitive health records through this public form. Relevant medical history is discussed confidentially after initial fit is established.
                  </span>
                </div>

                {/* Legal Consent */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <input
                      id="stage-privacy-ack"
                      type="checkbox"
                      required
                      checked={privacyAck}
                      onChange={(e) => setPrivacyAck(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-charcoal-950 text-smoke-500 focus:ring-smoke-400"
                    />
                    <div className="text-xs text-paper-400 font-light leading-relaxed">
                      <label htmlFor="stage-privacy-ack" className="cursor-pointer text-paper-300">
                        I confirm that I have read the Privacy Notice and Health &amp; Training Disclaimer. I consent to BASELN using this enquiry to assess coaching fit and contact me. This does not subscribe me to marketing lists.
                      </label>
                      <p className="mt-1 text-paper-400/80">
                        View{' '}
                        <a href="/privacy" target="_blank" rel="noreferrer" className="text-smoke-400 underline underline-offset-2">
                          Privacy Notice
                        </a>{' '}
                        and{' '}
                        <a href="/training-disclaimer" target="_blank" rel="noreferrer" className="text-smoke-400 underline underline-offset-2">
                          Health Disclaimer
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 disabled:opacity-60 text-charcoal-950 rounded-sm shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Submitting Application…' : 'Submit Private Coaching Application'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* In-flow Stage Navigation Controls (Stages 1 through 4) */}
            {stage < 5 && (
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                {stage > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-paper-300 hover:text-white transition-colors py-2 px-3"
                  >
                    <ArrowLeft size={13} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-6 py-2.5 rounded-sm shadow-md transition-all active:translate-y-[1px]"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
