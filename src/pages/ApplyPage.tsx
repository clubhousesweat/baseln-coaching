import React, { useEffect, useState, useRef } from 'react';
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
  const submissionKey = useRef(crypto.randomUUID());
  const submissionBusy = useRef(false);
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
    if (submissionBusy.current) return;
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

    submissionBusy.current = true;
    setIsSubmitting(true);

    try {
      // POST to /api/public/coaching-application (or /api/leads fallback)
      const response = await fetch('/api/public/coaching-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submissionKey.current },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true || !Number.isSafeInteger(result.leadId) || result.leadId <= 0) {
        const message = typeof result.error === 'string' ? result.error : 'We could not securely receive your application. Please try again.';
        throw new Error(message);
      }

      const leadId = result.leadId;
      let receiptStored = false;
      try {
        sessionStorage.setItem('baseln_last_lead_receipt', JSON.stringify({ leadId, receivedAt: new Date().toISOString() }));
        receiptStored = true;
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
      if (receiptStored) onNavigate('/application-received');
      window.scrollTo({ top: 40, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'We could not submit your application right now. Please try again.');
    } finally {
      submissionBusy.current = false;
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full min-h-12 bg-[#0B0C0E] border border-white/15 rounded-none px-3.5 py-3 text-[15px] text-[#F9F9F8] placeholder:text-[#7C93A6] transition-colors focus:border-[#8AA3B6] focus:outline-none focus:ring-2 focus:ring-[#A4B8C8]/30';
  const labelClass = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[#C8CCC9]';
  const helperClass = 'mt-1.5 text-sm leading-relaxed text-[#C8CCC9]';
  const stageMeta = [
    '',
    'YOUR GOALS',
    'YOUR TRAINING',
    'THE FRICTION',
    'COACHING FIT',
    'YOUR DETAILS',
  ];
  const stageLabel = stageMeta[stage];
  const cardBase = 'min-h-[58px] w-full border px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111317] disabled:cursor-not-allowed disabled:opacity-50';
  const cardUnselected = 'border-white/15 bg-[#0B0C0E] text-[#F9F9F8] hover:border-[#A4B8C8] hover:bg-[#111317]';
  const cardSelected = 'border-[#A4B8C8] bg-[#8AA3B6] text-[#F9F9F8] shadow-[inset_0_0_0_1px_rgba(7,8,10,0.18)]';

  return (
    <div className="min-h-[100dvh] bg-[#07080A] text-[#F9F9F8] selection:bg-[#A4B8C8] selection:text-[#07080A]">
      <div className="w-full px-0 py-0 md:px-6 md:py-6 xl:px-10 xl:py-8">
        <div className="mx-auto max-w-[1280px] overflow-hidden border border-white/15 bg-[#111317] shadow-[0_18px_52px_rgba(36,31,25,0.18)]">
          <div className="grid lg:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]">
            <aside className="flex min-h-0 flex-col bg-[#0B0C0E] px-5 py-5 text-[#F9F9F8] sm:px-8 sm:py-8 lg:min-h-[720px] lg:px-10 lg:py-10 xl:px-12">
              <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-5">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F4F2]"
                  aria-label="Return to BASELN home"
                >
                  <img
                    src="/media/baseln-wordmark_ce64ccd9.png"
                    alt="BASELN"
                    className="h-5 w-auto object-contain brightness-0 invert sm:h-6"
                  />
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C8CCC9]">Private coaching</span>
              </div>

              <div className="pt-7 sm:pt-12 lg:pt-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8CCC9]">BASELN / APPLICATION</p>
                <h1 className="mt-4 max-w-none font-serif text-4xl font-normal leading-[0.93] tracking-[-0.035em] text-[#F9F9F8] sm:mt-5 sm:text-5xl lg:max-w-[10ch] lg:text-[4.15rem]">
                  GOOD TRAINING STARTS HERE.
                </h1>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#C8CCC9] sm:mt-6 sm:text-[17px]">
                  Tell us where you want to go. We’ll work out the best way to get you there.
                </p>
              </div>

              <div className="mt-8 pt-6 lg:mt-auto lg:pt-20">
                <div className="h-px w-full bg-white/20" />
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#C8CCC9]">
                  STRENGTH. CONDITIONING. BODY COMPOSITION.
                </p>
              </div>
            </aside>

            <section className="bg-[#111317] px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10 xl:px-12" aria-label="Private coaching application">
              <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C8CCC9]">2–3 MIN</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="inline-flex min-h-10 items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F9F9F8] transition-colors hover:text-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8]"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  Return home
                </button>
              </div>

              {submitted ? (
                <div className="py-10 sm:py-14">
                  <div className="max-w-xl border border-white/20 bg-[#0B0C0E] p-6 sm:p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B0C0E] text-[#F9F9F8]">
                      <CheckCircle2 size={23} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#A4B8C8]">Application recorded</p>
                    <h2 className="mt-2 font-serif text-3xl leading-tight text-[#F9F9F8] sm:text-4xl">Received.</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#C8CCC9]">
                      Aian will personally review your application and respond within one business day.
                    </p>
                    <div className="mt-7 border-y border-white/15 py-5">
                      <p className="text-sm font-semibold text-[#F9F9F8]">What happens next</p>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#C8CCC9]">
                        <li>Your goals and weekly schedule are reviewed for coaching fit.</li>
                        <li>Suitable applicants receive an invitation to a direct conversation.</li>
                        <li>Your programme and coaching rhythm are confirmed from there.</li>
                      </ul>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                      <button
                        type="button"
                        onClick={() => onNavigate('/')}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A4B8C8] underline underline-offset-4 transition-colors hover:text-[#7C93A6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8]"
                      >
                        Return home
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('/coaching')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#F9F9F8] transition-colors hover:text-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8]"
                      >
                        Coaching inclusions <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-[620px] py-7 sm:py-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A4B8C8]">
                      {String(stage).padStart(2, '0')} / 05 — {stageLabel}
                    </p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C8CCC9]">Private intake</span>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-1.5" role="progressbar" aria-label={`Application stage ${stage} of 5`} aria-valuemin={1} aria-valuemax={5} aria-valuenow={stage}>
                    {[1, 2, 3, 4, 5].map((segment) => (
                      <span key={segment} className={`h-[3px] ${segment <= stage ? 'bg-[#A4B8C8]' : 'bg-white/15'}`} />
                    ))}
                  </div>

                  {errorMsg && (
                    <div role="alert" aria-live="assertive" className="mt-6 flex items-start gap-3 border border-[#D97775] bg-[#2A1719] p-3.5 text-sm leading-relaxed text-[#FAD7D4]">
                      <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="mt-7 border border-white/15 bg-[#111317] p-5 shadow-[0_10px_26px_rgba(42,34,27,0.06)] sm:p-7">
                    {stage === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl leading-tight text-[#F9F9F8] sm:text-[1.8rem]">What are you working towards?</h2>
                          <p className={helperClass}>Select everything that applies. Coaching can be built around more than one outcome.</p>
                        </div>
                        <fieldset>
                          <legend className="sr-only">Primary coaching goals</legend>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {GOALS_LIST.map((goal) => {
                              const isSelected = selectedGoals.includes(goal);
                              return (
                                <button
                                  key={goal}
                                  type="button"
                                  onClick={() => toggleGoal(goal)}
                                  aria-pressed={isSelected}
                                  className={`${cardBase} ${isSelected ? cardSelected : cardUnselected} flex items-center justify-between gap-4`}
                                >
                                  <span className="text-[15px] font-medium leading-snug">{goal}</span>
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${isSelected ? 'border-[#07080A]/40 bg-[#C7D5D7] text-[#07080A]' : 'border-[#7C93A6] text-transparent'}`} aria-hidden="true">
                                    <Check size={13} strokeWidth={2.75} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <div>
                          <label htmlFor="stage-goal-detail" className={labelClass}>
                            Any specific details or context? <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span>
                          </label>
                          <textarea
                            id="stage-goal-detail"
                            rows={3}
                            value={goalDetail}
                            onChange={(e) => setGoalDetail(e.target.value)}
                            placeholder="A concrete target, event date or useful starting context."
                            className={inputClass}
                          />
                        </div>
                      </div>
                    )}

                    {stage === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl leading-tight text-[#F9F9F8] sm:text-[1.8rem]">What does training look like right now?</h2>
                          <p className={helperClass}>We design around the week and equipment you actually have.</p>
                        </div>
                        <div>
                          <label htmlFor="stage-current-training" className={labelClass}>What are you doing currently? <span className="text-[#A4B8C8]">*</span></label>
                          <textarea
                            id="stage-current-training"
                            rows={3}
                            required
                            value={currentTraining}
                            onChange={(e) => { setCurrentTraining(e.target.value); setErrorMsg(''); }}
                            placeholder="Your usual week, training routine or where consistency has fallen away."
                            className={inputClass}
                          />
                        </div>
                        <fieldset>
                          <legend className={labelClass}>Realistic weekly training days <span className="text-[#A4B8C8]">*</span></legend>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {TRAINING_DAYS.map((opt) => {
                              const isSelected = trainingDays === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => { setTrainingDays(opt.value); setErrorMsg(''); }}
                                  aria-pressed={isSelected}
                                  className={`${cardBase} ${isSelected ? cardSelected : cardUnselected}`}
                                >
                                  <span className="block text-[15px] font-semibold leading-snug">{opt.label}</span>
                                  <span className={`mt-1 block text-xs leading-relaxed ${isSelected ? 'text-[#C8CCC9]' : 'text-[#C8CCC9]'}`}>{opt.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <fieldset>
                          <legend className={labelClass}>Training environment &amp; equipment <span className="text-[#A4B8C8]">*</span></legend>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {TRAINING_ENVIRONMENTS.map((env) => {
                              const isSelected = trainingEnvironment === env.value;
                              return (
                                <button
                                  key={env.value}
                                  type="button"
                                  onClick={() => { setTrainingEnvironment(env.value); setErrorMsg(''); }}
                                  aria-pressed={isSelected}
                                  className={`${cardBase} ${isSelected ? cardSelected : cardUnselected}`}
                                >
                                  <span className="block text-[15px] font-semibold leading-snug">{env.label}</span>
                                  <span className={`mt-1 block text-xs leading-relaxed ${isSelected ? 'text-[#C8CCC9]' : 'text-[#C8CCC9]'}`}>{env.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <div>
                          <label htmlFor="stage-training-history" className={labelClass}>Prior training experience <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                          <select id="stage-training-history" value={trainingHistory} onChange={(e) => setTrainingHistory(e.target.value)} className={inputClass}>
                            <option value="">Select current context</option>
                            {TRAINING_HISTORY_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {stage === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl leading-tight text-[#F9F9F8] sm:text-[1.8rem]">What has been getting in the way?</h2>
                          <p className={helperClass}>The honest version gives coaching a better starting point.</p>
                        </div>
                        <div>
                          <label htmlFor="stage-barrier" className={labelClass}>Your primary obstacle or challenge <span className="text-[#A4B8C8]">*</span></label>
                          <textarea
                            id="stage-barrier"
                            rows={4}
                            required
                            value={barrier}
                            onChange={(e) => { setBarrier(e.target.value); setErrorMsg(''); }}
                            placeholder="Work travel, a stalled routine, lack of progression, nutrition noise or something else."
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="stage-previous-attempts" className={labelClass}>What have you tried before, and why did it stall? <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                          <textarea id="stage-previous-attempts" rows={3} value={previousAttempts} onChange={(e) => setPreviousAttempts(e.target.value)} placeholder="A programme, approach or plan that did not fit your real life." className={inputClass} />
                        </div>
                      </div>
                    )}

                    {stage === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl leading-tight text-[#F9F9F8] sm:text-[1.8rem]">Why is now the right time?</h2>
                          <p className={helperClass}>Private coaching works best when the timing and commitment are both real.</p>
                        </div>
                        <div>
                          <label htmlFor="stage-why-now" className={labelClass}>Why is starting coaching right now important to you? <span className="text-[#A4B8C8]">*</span></label>
                          <textarea
                            id="stage-why-now"
                            rows={4}
                            required
                            value={whyNow}
                            onChange={(e) => { setWhyNow(e.target.value); setErrorMsg(''); }}
                            placeholder="What has changed, what matters now, or where you want to be in the next few months."
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="stage-coaching-value" className={labelClass}>What do you value most in a coach? <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                          <textarea id="stage-coaching-value" rows={3} value={coachingValue} onChange={(e) => setCoachingValue(e.target.value)} placeholder="Structure, clear feedback, accountability, technique support or another priority." className={inputClass} />
                        </div>
                      </div>
                    )}

                    {stage === 5 && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl leading-tight text-[#F9F9F8] sm:text-[1.8rem]">Where can Aian reach you?</h2>
                          <p className={helperClass}>Your details are used to assess coaching fit and respond to your application.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="stage-name" className={labelClass}>Full name <span className="text-[#A4B8C8]">*</span></label>
                            <input id="stage-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="stage-email" className={labelClass}>Email address <span className="text-[#A4B8C8]">*</span></label>
                            <input id="stage-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="stage-timezone" className={labelClass}>Country / time zone <span className="text-[#A4B8C8]">*</span></label>
                            <input id="stage-timezone" type="text" required value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Australia (AWST), UK, etc." className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="stage-phone" className={labelClass}>Mobile / WhatsApp <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                            <input id="stage-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 400 000 000" autoComplete="tel" className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="stage-age" className={labelClass}>Age <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                            <input id="stage-age" type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 34" className={inputClass} />
                          </div>
                          {isSourceAmbiguous && (
                            <div>
                              <label htmlFor="stage-referral" className={labelClass}>How did you hear about BASELN? <span className="normal-case tracking-normal text-[#C8CCC9]">(optional)</span></label>
                              <input id="stage-referral" type="text" value={referralSource} onChange={(e) => setReferralSource(e.target.value)} placeholder="Instagram, referral, word of mouth" className={inputClass} />
                            </div>
                          )}
                        </div>
                        <div className="border-y border-white/15 py-4 text-sm leading-relaxed text-[#C8CCC9]">
                          <div className="flex items-start gap-3">
                            <Shield size={17} className="mt-0.5 shrink-0 text-[#A4B8C8]" aria-hidden="true" />
                            <p><strong className="font-semibold text-[#F9F9F8]">Health &amp; safety:</strong> Do not submit confidential medical diagnoses, rehabilitation notes or sensitive health records through this public form. Relevant history can be discussed privately after initial fit is established.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            id="stage-privacy-ack"
                            type="checkbox"
                            required
                            checked={privacyAck}
                            onChange={(e) => setPrivacyAck(e.target.checked)}
                            className="mt-1 h-5 w-5 shrink-0 accent-[#A4B8C8] focus:ring-[#A4B8C8]"
                          />
                          <div className="text-sm leading-relaxed text-[#C8CCC9]">
                            <label htmlFor="stage-privacy-ack" className="cursor-pointer text-[#F4F4F2]">
                              I have read the Privacy Notice and Health &amp; Training Disclaimer. I consent to BASELN using this enquiry to assess coaching fit and contact me. This does not subscribe me to marketing lists.
                            </label>
                            <p className="mt-1.5">
                              Read the <a href="/privacy" target="_blank" rel="noreferrer" className="font-medium text-[#A4B8C8] underline underline-offset-2">Privacy Notice</a> and <a href="/training-disclaimer" target="_blank" rel="noreferrer" className="font-medium text-[#A4B8C8] underline underline-offset-2">Health Disclaimer</a>.
                            </p>
                          </div>
                        </div>
                        <div className="border-t border-white/15 pt-5">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            className="flex min-h-13 w-full items-center justify-center gap-2 bg-[#C7D5D7] px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#F9F9F8] transition-colors hover:bg-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111317] disabled:cursor-not-allowed disabled:bg-[#56636E]"
                          >
                            <span>{isSubmitting ? 'Submitting application…' : 'Submit application'}</span>
                            <ArrowRight size={15} aria-hidden="true" />
                          </button>
                          <button type="button" onClick={handleBack} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C8CCC9] transition-colors hover:text-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8]">
                            <ArrowLeft size={14} aria-hidden="true" /> Back
                          </button>
                        </div>
                      </form>
                    )}

                    {stage < 5 && (
                      <div className="mt-7 border-t border-white/15 pt-5">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex min-h-13 w-full items-center justify-center gap-2 bg-[#C7D5D7] px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#F9F9F8] transition-colors hover:bg-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111317]"
                        >
                          Continue <ArrowRight size={15} aria-hidden="true" />
                        </button>
                        {stage > 1 && (
                          <button type="button" onClick={handleBack} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C8CCC9] transition-colors hover:text-[#A4B8C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4B8C8]">
                            <ArrowLeft size={14} aria-hidden="true" /> Back
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#C8CCC9]">
                    <a href="/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-2 transition-colors hover:text-[#A4B8C8]">Privacy</a>
                    <a href="/terms" target="_blank" rel="noreferrer" className="underline underline-offset-2 transition-colors hover:text-[#A4B8C8]">Terms</a>
                    <a href="/training-disclaimer" target="_blank" rel="noreferrer" className="underline underline-offset-2 transition-colors hover:text-[#A4B8C8]">Training disclaimer</a>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
