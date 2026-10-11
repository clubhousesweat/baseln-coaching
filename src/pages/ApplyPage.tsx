import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent, getAttribution, AttributionData } from '../utils/analytics';

interface ApplyPageProps {
  onNavigate: (path: PageRoute) => void;
}

export interface FiveStageCoachingLeadPayload {
  name: string;
  email: string;
  countryTimeZone: string;
  phone?: string;
  goals: string[];
  mainObjective: string;
  trainingExperience: string;
  availableDays: string;
  biggestObstacle: string;
  preferredStartDate: string;
  referralSource?: string;
  privacyConsent: true;
  healthTrainingAcknowledgement: true;
  marketingOptIn: false;
  attribution: AttributionData;
  cta?: string;
}

const AVAILABLE_GOALS = [
  'Lose body fat',
  'Build muscle',
  'Get stronger',
  'Improve conditioning',
  'Prepare for an event',
  'Improve general health and fitness',
];

const TRAINING_DAYS_OPTIONS = [
  { value: '1–2 days', label: '1–2 days per week', desc: 'Starting or fitting training around heavy commitments' },
  { value: '3 days', label: '3 days per week', desc: 'Consistent, balanced weekly structure' },
  { value: '4 days', label: '4 days per week', desc: 'Dedicated focus with ample recovery' },
  { value: '5+ days', label: '5+ days per week', desc: 'High frequency athletic / sport training' },
  { value: 'Variable', label: 'Changes week to week', desc: 'Roster, travel or shift-work schedule' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'Returning after a break', label: 'Returning after a break', desc: 'Trained previously; need structure to build momentum again' },
  { value: 'Consistent but plateaued', label: 'Consistent but plateaued', desc: 'Training regularly but not seeing the body composition or strength returns' },
  { value: 'New to structured strength', label: 'New to structured coaching', desc: 'Ready for proper instruction, technique cues and programming' },
  { value: 'Experienced athlete', label: 'Experienced lifter / athlete', desc: 'Seeking refined programming, video feedback and higher performance' },
];

export const ApplyPage: React.FC<ApplyPageProps> = ({ onNavigate }) => {
  const [stage, setStage] = useState<number>(1);
  const [attribution, setAttribution] = useState<AttributionData | null>(null);

  // Form State
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [trainingExperience, setTrainingExperience] = useState<string>('');
  const [availableDays, setAvailableDays] = useState<string>('');
  const [biggestObstacle, setBiggestObstacle] = useState<string>('');
  const [preferredStartDate, setPreferredStartDate] = useState<string>('');
  const [countryTimeZone, setCountryTimeZone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [referralSource, setReferralSource] = useState<string>('');
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);

  // Submission State
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
        form: 'private_coaching_five_stage_application',
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

  const handleNextStage = () => {
    setErrorMsg('');
    if (stage === 1) {
      if (selectedGoals.length === 0) {
        setErrorMsg('Please select at least one goal to continue.');
        return;
      }
      setStage(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (stage === 2) {
      if (!availableDays) {
        setErrorMsg('Please select how many days you can realistically train each week.');
        return;
      }
      setStage(3);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (stage === 3) {
      if (!biggestObstacle.trim()) {
        setErrorMsg('Please share what has been your main challenge or obstacle so far.');
        return;
      }
      setStage(4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (stage === 4) {
      if (!preferredStartDate.trim() || !countryTimeZone.trim()) {
        setErrorMsg('Please provide your preferred start date and your country / time zone.');
        return;
      }
      setStage(5);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
  };

  const handlePrevStage = () => {
    setErrorMsg('');
    if (stage > 1) {
      setStage((s) => s - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const isSourceAmbiguous = !attribution?.utm_source || attribution.utm_source === 'direct' || attribution.utm_source === 'referral';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please provide your name and email address so Aian can contact you.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!privacyConsent) {
      setErrorMsg('Please confirm the privacy and health-training acknowledgement to proceed.');
      return;
    }

    const currentAttr = getAttribution();
    const cta = new URLSearchParams(window.location.search).get('cta') || currentAttr.cta || 'site_apply';

    const payload: FiveStageCoachingLeadPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      countryTimeZone: countryTimeZone.trim(),
      phone: phone.trim() || undefined,
      goals: selectedGoals,
      mainObjective: selectedGoals.join(', '),
      trainingExperience: trainingExperience.trim() || 'General strength',
      availableDays: availableDays.trim(),
      biggestObstacle: biggestObstacle.trim(),
      preferredStartDate: preferredStartDate.trim(),
      referralSource: isSourceAmbiguous && referralSource.trim() ? referralSource.trim() : undefined,
      privacyConsent: true,
      healthTrainingAcknowledgement: true,
      marketingOptIn: false,
      attribution: currentAttr,
      cta,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
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
        objective: payload.mainObjective,
        available_days: payload.availableDays,
        has_phone: Boolean(payload.phone),
        cta,
        utm_source: currentAttr.utm_source || 'direct',
        utm_medium: currentAttr.utm_medium || 'direct',
        utm_campaign: currentAttr.utm_campaign || 'none',
        utm_content: currentAttr.utm_content || 'none',
        last_non_direct_source: currentAttr.last_non_direct_source || 'direct',
        first_landing_page: currentAttr.first_landing_page,
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'We could not receive your enquiry just now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldInputClass = 'w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors';
  const labelHeaderClass = 'block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2';

  return (
    <div className="pt-24 min-h-[92vh] bg-charcoal-950 pb-20">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-10">
        {/* Top Header Badge & Stage indicator */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-smoke-400 mb-3">
            <span>BASELN · PRIVATE COACHING</span>
            <span className="text-paper-400">APPLICATION / 0{stage}—05</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.04] uppercase">
            <span className="block">YOUR GOALS.</span>
            <span className="block text-smoke-300 italic font-normal">OUR STARTING POINT.</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-paper-300 font-light leading-relaxed max-w-xl">
            A few quick questions to understand what you’re working towards and how we can help.
          </p>

          {/* Progress Bar in Smoke-Blue */}
          <div className="mt-6 w-full h-1 bg-charcoal-850 rounded-full overflow-hidden">
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
          <div className="p-8 sm:p-12 bg-charcoal-900 border border-smoke-500/30 rounded-sm space-y-6 animate-in fade-in duration-300 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-smoke-500/20 flex items-center justify-center text-smoke-300">
              <CheckCircle2 size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-white">Application submitted.</h2>
              <p className="text-xs font-mono text-smoke-400">Recorded in BASELN Intake Queue</p>
            </div>

            <div className="p-5 bg-charcoal-850 border border-white/5 rounded-sm">
              <p className="text-sm text-paper-200 font-light leading-relaxed">
                “Received. Aian will personally assess your application and respond within one business day.”
              </p>
            </div>

            <div className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed space-y-3">
              <p>
                <strong>What happens next:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-paper-300">
                <li>Aian assesses whether your goals and expectations suit the coaching service.</li>
                <li>Suitable applicants receive an invitation link to book a short fit consultation.</li>
                <li>Full individual programming and assessment begin once coaching is confirmed.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-sm transition-colors"
              >
                Return home
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/coaching')}
                className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white inline-flex items-center gap-1.5"
              >
                <span>Explore coaching inclusions</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-charcoal-900 border border-white/10 rounded-sm p-6 sm:p-10 shadow-2xl space-y-7">
            {errorMsg && (
              <div role="alert" className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STAGE 1: Goals */}
            {stage === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">STAGE 1 / 5</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">What would you like to achieve?</h2>
                  <p className="mt-1 text-xs sm:text-sm text-paper-400 font-light">
                    Select everything that applies. You don’t need to have just one goal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {AVAILABLE_GOALS.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`p-4 text-left rounded-sm border transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-smoke-500/15 border-smoke-400 text-white shadow-sm ring-1 ring-smoke-400/30'
                            : 'bg-charcoal-950/80 border-white/10 text-paper-300 hover:border-white/25 hover:text-white'
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
              </div>
            )}

            {/* STAGE 2: Training & Schedule */}
            {stage === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">STAGE 2 / 5</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Your schedule &amp; background</h2>
                  <p className="mt-1 text-xs sm:text-sm text-paper-400 font-light">
                    How many days could you realistically train each week?
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {TRAINING_DAYS_OPTIONS.map((opt) => {
                    const isSelected = availableDays === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setAvailableDays(opt.value);
                          setErrorMsg('');
                        }}
                        className={`w-full p-4 text-left rounded-sm border transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-smoke-500/15 border-smoke-400 text-white ring-1 ring-smoke-400/30'
                            : 'bg-charcoal-950/80 border-white/10 text-paper-300 hover:border-white/25 hover:text-white'
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

                <div className="pt-2">
                  <label htmlFor="stage-experience" className={labelHeaderClass}>
                    Training experience level <span className="text-paper-400 font-normal">(optional)</span>
                  </label>
                  <select
                    id="stage-experience"
                    value={trainingExperience}
                    onChange={(e) => setTrainingExperience(e.target.value)}
                    className={fieldInputClass}
                  >
                    <option value="">Select current experience context</option>
                    {EXPERIENCE_OPTIONS.map((exp) => (
                      <option key={exp.value} value={exp.value}>
                        {exp.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STAGE 3: The Primary Challenge */}
            {stage === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">STAGE 3 / 5</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">What has been the biggest challenge?</h2>
                  <p className="mt-1 text-xs sm:text-sm text-paper-400 font-light">
                    Tell Aian what has gotten in the way of your progress so far.
                  </p>
                </div>

                <div className="pt-2">
                  <label htmlFor="stage-obstacle" className={labelHeaderClass}>
                    Your biggest challenge or obstacle <span className="text-smoke-400">*</span>
                  </label>
                  <textarea
                    id="stage-obstacle"
                    rows={4}
                    required
                    value={biggestObstacle}
                    onChange={(e) => {
                      setBiggestObstacle(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. Inconsistent routine due to work, lack of clear progression in the gym, losing motivation after a few weeks, or needing accountability with nutrition."
                    className={fieldInputClass}
                  />
                  <p className="mt-2 text-xs text-paper-400">
                    A short, honest summary helps Aian understand where coaching will provide the greatest immediate impact.
                  </p>
                </div>
              </div>
            )}

            {/* STAGE 4: Timelines & Logistics */}
            {stage === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">STAGE 4 / 5</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Timeline &amp; location</h2>
                  <p className="mt-1 text-xs sm:text-sm text-paper-400 font-light">
                    When would you like to start, and where are you based?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label htmlFor="stage-start" className={labelHeaderClass}>
                      Preferred start date / timeline <span className="text-smoke-400">*</span>
                    </label>
                    <input
                      id="stage-start"
                      type="text"
                      required
                      value={preferredStartDate}
                      onChange={(e) => {
                        setPreferredStartDate(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Immediately, Next Monday, or 1st of next month"
                      className={fieldInputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="stage-location" className={labelHeaderClass}>
                      Country / time zone <span className="text-smoke-400">*</span>
                    </label>
                    <input
                      id="stage-location"
                      type="text"
                      required
                      value={countryTimeZone}
                      onChange={(e) => {
                        setCountryTimeZone(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Australia (AEST / AWST) or UK"
                      className={fieldInputClass}
                    />
                  </div>
                </div>

                <div className="p-4 bg-charcoal-850 border border-white/5 rounded text-xs text-paper-400 leading-relaxed">
                  BASELN is delivered remotely worldwide. Coaching check-ins and communication are scheduled to suit your local time zone.
                </div>
              </div>
            )}

            {/* STAGE 5: Contact Details & Consent */}
            {stage === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400 block mb-1">STAGE 5 / 5</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Your contact details</h2>
                  <p className="mt-1 text-xs sm:text-sm text-paper-400 font-light">
                    Where can Aian reach you with his review and consultation details?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label htmlFor="stage-name" className={labelHeaderClass}>
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
                      className={fieldInputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="stage-email" className={labelHeaderClass}>
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
                      className={fieldInputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stage-phone" className={labelHeaderClass}>
                    Mobile / WhatsApp number <span className="text-paper-400 font-normal">(optional, for timely updates)</span>
                  </label>
                  <input
                    id="stage-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+61 400 000 000"
                    autoComplete="tel"
                    className={fieldInputClass}
                  />
                </div>

                {isSourceAmbiguous && (
                  <div>
                    <label htmlFor="stage-referral" className={labelHeaderClass}>
                      How did you hear about BASELN? <span className="text-paper-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="stage-referral"
                      type="text"
                      value={referralSource}
                      onChange={(e) => setReferralSource(e.target.value)}
                      placeholder="e.g. Instagram, client referral, word of mouth"
                      className={fieldInputClass}
                    />
                  </div>
                )}

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <input
                      id="legal-consent"
                      type="checkbox"
                      required
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-charcoal-950 text-smoke-500 focus:ring-smoke-400"
                    />
                    <div className="text-xs text-paper-400 font-light leading-relaxed">
                      <label htmlFor="legal-consent" className="cursor-pointer">
                        I confirm that I have read the Privacy Notice and Health &amp; Training Disclaimer. I consent to BASELN using this enquiry to assess coaching fit and contact me. This does not subscribe me to marketing emails.
                      </label>
                      <p className="mt-1.5 text-paper-400/80">
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
                    className="w-full py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 disabled:opacity-60 text-charcoal-950 rounded-sm shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Submitting Application…' : 'Submit Private Coaching Application'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* Navigation Controls (Stages 1 through 4) */}
            {stage < 5 && (
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                {stage > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStage}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-paper-300 hover:text-white transition-colors py-2 px-3"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNextStage}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-6 py-3 rounded-sm shadow-md transition-all active:translate-y-[1px]"
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

export const TrainingRoomPage: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'session' | 'calendar' | 'checkin' | 'coach'>('session');
  const tabs: Array<{ id: 'session' | 'calendar' | 'checkin' | 'coach'; label: string }> = [
    { id: 'session', label: "Today's session" },
    { id: 'calendar', label: 'Weekly schedule' },
    { id: 'checkin', label: 'Weekly check-in' },
    { id: 'coach', label: 'Coach feedback' },
  ];

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-smoke-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400">
                BASELN TRAINING ROOM · ILLUSTRATIVE PREVIEW
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">A clear place for the work.</h1>
          </div>
          <div className="text-xs font-mono text-paper-400">Sample layout · No live client data</div>
        </div>

        <p className="max-w-2xl text-sm text-paper-300 font-light leading-relaxed mb-8">
          This public preview shows the kind of structure used to keep a programme, check-in and coaching feedback in one place. The exercises, loads and messages below are illustrative only; every client receives an individual prescription.
        </p>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto text-xs font-mono tracking-wider">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'session' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
              <div>
                <span className="text-xs font-mono text-smoke-400 uppercase tracking-widest">
                  ILLUSTRATIVE SESSION FORMAT · ABOUT 45 MINUTES
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">Lower body strength and movement control</h3>
              </div>
              <span className="text-xs font-mono bg-smoke-500/10 text-smoke-300 px-3 py-1 rounded border border-smoke-400/20">
                Chosen for the individual
              </span>
            </div>
            <div className="my-4 p-4 bg-charcoal-850 border-l-2 border-smoke-400 text-xs sm:text-sm text-paper-300 font-light italic">
              Example feedback format: “Keep the ribs stacked as you lower. Film one working set so I can check the position.”
            </div>
            <div className="space-y-4 pt-2">
              {[
                { code: 'A1', name: 'Romanian deadlift variation', prescription: '3 sets × 8–10 reps', focus: 'A movement chosen for the client’s goals and equipment' },
                { code: 'B1', name: 'Split squat variation', prescription: '3 sets × 8 reps / leg', focus: 'Progression matched to current movement confidence' },
                { code: 'C1', name: 'Row variation', prescription: '3 sets × 10–12 reps', focus: 'Upper-body work selected for the overall programme' },
                { code: 'D1', name: 'Carry or conditioning finish', prescription: 'Brief repeat efforts', focus: 'Included only where it supports the main objective' },
              ].map((ex) => (
                <div key={ex.code} className="p-4 bg-charcoal-850 rounded border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-smoke-400">{ex.code}</span>
                      <h4 className="text-sm font-semibold text-white">{ex.name}</h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-paper-400">
                      <span>{ex.prescription}</span>
                      <span>•</span>
                      <span>{ex.focus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-white mb-4">Illustrative week structure</h3>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-xs font-mono">
              {[
                { day: 'MON', title: 'Strength session' },
                { day: 'TUE', title: 'Rest or walk' },
                { day: 'WED', title: 'Training session' },
                { day: 'THU', title: 'Recovery / flexible' },
                { day: 'FRI', title: 'Training session' },
                { day: 'SAT', title: 'Optional movement' },
                { day: 'SUN', title: 'Coach check-in' },
              ].map((cal) => (
                <div key={cal.day} className="p-3 rounded border bg-charcoal-850 border-white/5 text-paper-400">
                  <div className="font-bold text-white mb-2">{cal.day}</div>
                  <div className="text-paper-300 font-sans text-xs">{cal.title}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-paper-400 font-light">
              The number and type of sessions are set after assessment—this is a visual example only.
            </p>
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-white mb-4">Illustrative check-in signals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Sessions completed', copy: 'What was planned and what actually happened' },
                { label: 'Food and habit consistency', copy: 'The agreed actions that mattered this week' },
                { label: 'Energy, sleep and recovery', copy: 'Context for how the work is landing' },
                { label: 'A short client note', copy: 'Anything that needs a coach’s attention before the next week' },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1">
                  <span className="text-paper-300 text-sm font-semibold">{item.label}</span>
                  <div className="text-paper-400 text-xs font-sans">{item.copy}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coach' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-white mb-2">Illustrative feedback format</h3>
            <div className="p-4 bg-charcoal-850 rounded-sm border border-white/5 space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between font-mono text-[11px] text-smoke-400">
                <span>Aian McLennan (Coach)</span>
                <span>Example only</span>
              </div>
              <p className="text-paper-200 text-sm leading-relaxed">
                “I watched the clip. Let’s keep the weight where it is for now and make the next set smoother. Send another angle after your next session and we will decide whether it is ready to progress.”
              </p>
            </div>
            <p className="text-xs text-paper-400">Actual coach feedback responds to the client’s movement, programme and current week.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-paper-400 font-light mb-4">
            A clear workspace is useful because coaching can stay close to the work, not buried in a generic app.
          </p>
          <button
            onClick={() => onNavigate('/online/register')}
            className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white underline underline-offset-4"
          >
            Ready to talk with Aian? Start your application →
          </button>
        </div>
      </div>
    </div>
  );
};
