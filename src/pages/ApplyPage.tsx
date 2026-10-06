import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent, getAttribution, AttributionData } from '../utils/analytics';

interface ApplyPageProps {
  onNavigate: (path: PageRoute) => void;
}

export interface CoachingLeadPayload {
  name: string;
  email: string;
  countryTimeZone: string;
  phone: string;
  mainObjective: string;
  biggestObstacle: string;
  availableDays: string;
  preferredStartDate: string;
  referralSource?: string;
  privacyConsent: true;
  healthTrainingAcknowledgement: true;
  marketingOptIn: false;
  attribution: AttributionData;
  cta?: string;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ onNavigate }) => {
  const [attribution, setAttribution] = useState<AttributionData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryTimeZone: '',
    phone: '',
    mainObjective: '',
    biggestObstacle: '',
    availableDays: '',
    preferredStartDate: '',
    referralSource: '',
    privacyConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

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

  const handleFieldFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('application_start', {
        form: 'private_coaching_enquiry',
        cta: attribution?.cta || 'not_set',
        utm_source: attribution?.utm_source || 'direct',
        utm_campaign: attribution?.utm_campaign || 'none',
        utm_content: attribution?.utm_content || 'none',
      });
    }
  };

  const isSourceAmbiguous = !attribution?.utm_source || attribution.utm_source === 'direct' || attribution.utm_source === 'referral';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.countryTimeZone.trim() ||
      !formData.mainObjective ||
      !formData.biggestObstacle.trim() ||
      !formData.availableDays ||
      !formData.preferredStartDate.trim()
    ) {
      setErrorMsg('Please complete all required fields so Aian can understand your starting point.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('Please confirm the privacy and health-training information before submitting your enquiry.');
      return;
    }

    const currentAttr = getAttribution();
    const form = new FormData(e.currentTarget);
    const cta = new URLSearchParams(window.location.search).get('cta') || currentAttr.cta || 'site_apply';

    const leadPayload: CoachingLeadPayload & { website?: string } = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      countryTimeZone: formData.countryTimeZone.trim(),
      phone: formData.phone.trim(),
      mainObjective: formData.mainObjective,
      biggestObstacle: formData.biggestObstacle.trim(),
      availableDays: formData.availableDays,
      preferredStartDate: formData.preferredStartDate.trim(),
      referralSource: isSourceAmbiguous ? formData.referralSource.trim() || undefined : undefined,
      privacyConsent: true,
      healthTrainingAcknowledgement: true,
      marketingOptIn: false,
      attribution: currentAttr,
      cta,
      website: String(form.get('website') || ''),
    };

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || (result.ok !== true && !result.leadId)) {
        const message = typeof result.error === 'string' ? result.error : 'We could not securely receive your enquiry. Please try again.';
        throw new Error(message);
      }

      const leadId = result.leadId;
      try {
        sessionStorage.setItem('baseln_last_lead_receipt', JSON.stringify({ leadId, receivedAt: new Date().toISOString() }));
      } catch {
        // optional receipt cache
      }

      trackEvent('application_complete', {
        lead_id: leadId,
        objective: leadPayload.mainObjective,
        available_days: leadPayload.availableDays,
        has_phone: Boolean(leadPayload.phone),
        cta,
        utm_source: currentAttr.utm_source || 'direct',
        utm_medium: currentAttr.utm_medium || 'direct',
        utm_campaign: currentAttr.utm_campaign || 'none',
        utm_content: currentAttr.utm_content || 'none',
        last_non_direct_source: currentAttr.last_non_direct_source || 'direct',
        first_landing_page: currentAttr.first_landing_page,
        referral_source_fallback: leadPayload.referralSource || 'not_requested',
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'We could not receive your enquiry just now. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = 'w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors';
  const labelClass = 'block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2';

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12">
        <div className="mb-9">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">PRIVATE COACHING ENQUIRY</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.04] uppercase mb-4">
            <span className="block">TELL AIAN WHAT</span><span className="block text-smoke-300 italic font-normal">YOU WANT TO CHANGE.</span>
          </h1>
          <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed max-w-2xl">A few details are enough for a first conversation. Aian will gather training history, equipment and the finer detail during onboarding if you decide to work together.</p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 bg-charcoal-900 border border-smoke-500/30 rounded-sm space-y-6 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-smoke-500/20 flex items-center justify-center text-smoke-300"><CheckCircle2 size={28} /></div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Enquiry received.</h2>
            <div className="p-5 bg-charcoal-850 border border-white/5 rounded-sm">
              <p className="text-sm text-paper-200 font-light leading-relaxed">“Received. Aian will review your brief and contact you about the next step.”</p>
            </div>
            <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">
              Aian reviews every enquiry personally within one business day. If BASELN is a fit, he will explain the next appropriate step and what coaching could look like before you decide whether to start.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button onClick={() => onNavigate('/')} className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-sm transition-colors">Return home</button>
              <button onClick={() => onNavigate('/coaching')} className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white">Explore coaching inclusions</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 bg-charcoal-900 border border-white/10 rounded-sm space-y-7 shadow-2xl" aria-busy={isSubmitting}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            {errorMsg && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Your full name <span className="text-smoke-400">*</span></label>
                <input
                  type="text"
                  required
                  onFocus={handleFieldFocus}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. David Harrison"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email address <span className="text-smoke-400">*</span></label>
                <input
                  type="email"
                  required
                  onFocus={handleFieldFocus}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="david@example.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Country / time zone <span className="text-smoke-400">*</span></label>
                <input
                  type="text"
                  required
                  onFocus={handleFieldFocus}
                  value={formData.countryTimeZone}
                  onChange={(e) => setFormData({ ...formData, countryTimeZone: e.target.value })}
                  placeholder="e.g. Australia (AEST)"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone number <span className="text-paper-400 font-normal">(optional)</span></label>
                <input
                  type="tel"
                  onFocus={handleFieldFocus}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+61 400 000 000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>What is your main objective? <span className="text-smoke-400">*</span></label>
              <select
                required
                onFocus={handleFieldFocus}
                value={formData.mainObjective}
                onChange={(e) => setFormData({ ...formData, mainObjective: e.target.value })}
                className={fieldClass}
              >
                <option value="" disabled>Select your main objective</option>
                <option value="Lose body fat">Lose body fat</option>
                <option value="Build muscle">Build muscle</option>
                <option value="Get stronger">Get stronger</option>
                <option value="Improve fitness or conditioning">Improve fitness or conditioning</option>
                <option value="Prepare for an event or sport">Prepare for an event or sport</option>
                <option value="Return to training">Return to training</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>What has been the biggest obstacle so far? <span className="text-smoke-400">*</span></label>
              <textarea
                required
                rows={3}
                onFocus={handleFieldFocus}
                value={formData.biggestObstacle}
                onChange={(e) => setFormData({ ...formData, biggestObstacle: e.target.value })}
                placeholder="e.g. Work travel, an inconsistent routine, uncertainty in the gym or losing momentum after a few weeks"
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>How many days could you realistically train each week? <span className="text-smoke-400">*</span></label>
                <select
                  required
                  onFocus={handleFieldFocus}
                  value={formData.availableDays}
                  onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
                  className={fieldClass}
                >
                  <option value="" disabled>Select your available days</option>
                  <option value="1–2 days">1–2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="4 days">4 days</option>
                  <option value="5+ days">5+ days</option>
                  <option value="It changes week to week">It changes week to week</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>When would you like to start? <span className="text-smoke-400">*</span></label>
                <input
                  required
                  type="text"
                  onFocus={handleFieldFocus}
                  value={formData.preferredStartDate}
                  onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                  placeholder="e.g. Next Monday or next month"
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Non-marketing self-reported fallback only if source is absent/ambiguous */}
            {isSourceAmbiguous && (
              <div>
                <label className={labelClass}>
                  How did you hear about BASELN? <span className="text-paper-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  onFocus={handleFieldFocus}
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  placeholder="e.g. Instagram reel, friend, word of mouth"
                  className={fieldClass}
                />
              </div>
            )}

            <div className="pt-2 border-t border-white/5">
              <div className="flex items-start gap-3">
                <input
                  id="legal-consent"
                  type="checkbox"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-charcoal-950 text-smoke-500 focus:ring-smoke-400"
                />
                <div className="text-xs text-paper-400 font-light leading-relaxed">
                  <label htmlFor="legal-consent" className="cursor-pointer">
                    I confirm that I have read the Privacy Notice and Health &amp; Training Disclaimer. I consent to BASELN using the details in this enquiry to assess coaching fit and contact me about coaching. This does not subscribe me to marketing communications.
                  </label>
                  <p className="mt-2 text-paper-400/85">
                    Open the{' '}
                    <a href="/privacy" target="_blank" rel="noreferrer" className="text-smoke-400 underline underline-offset-2">
                      Privacy Notice
                    </a>{' '}
                    and{' '}
                    <a href="/training-disclaimer" target="_blank" rel="noreferrer" className="text-smoke-400 underline underline-offset-2">
                      Health &amp; Training Disclaimer
                    </a>{' '}
                    in a new tab.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 disabled:bg-smoke-500/60 disabled:cursor-wait text-charcoal-950 rounded-sm shadow-xl transition-all"
            >
              {isSubmitting ? 'Sending securely…' : 'Start your enquiry'}
            </button>
          </form>
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
            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-smoke-400" /><span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400">BASELN TRAINING ROOM · ILLUSTRATIVE PREVIEW</span></div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">A clear place for the work.</h1>
          </div>
          <div className="text-xs font-mono text-paper-400">Sample layout · No live client data</div>
        </div>

        <p className="max-w-2xl text-sm text-paper-300 font-light leading-relaxed mb-8">This public preview shows the kind of structure used to keep a programme, check-in and coaching feedback in one place. The exercises, loads and messages below are illustrative only; every client receives an individual prescription.</p>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto text-xs font-mono tracking-wider">
          {tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'}`}>{tab.label}</button>)}
        </div>

        {activeTab === 'session' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
              <div><span className="text-xs font-mono text-smoke-400 uppercase tracking-widest">ILLUSTRATIVE SESSION FORMAT · ABOUT 45 MINUTES</span><h3 className="font-serif text-xl sm:text-2xl text-white mt-1">Lower body strength and movement control</h3></div>
              <span className="text-xs font-mono bg-smoke-500/10 text-smoke-300 px-3 py-1 rounded border border-smoke-400/20">Chosen for the individual</span>
            </div>
            <div className="my-4 p-4 bg-charcoal-850 border-l-2 border-smoke-400 text-xs sm:text-sm text-paper-300 font-light italic">Example feedback format: “Keep the ribs stacked as you lower. Film one working set so I can check the position.”</div>
            <div className="space-y-4 pt-2">
              {[
                { code: 'A1', name: 'Romanian deadlift variation', prescription: '3 sets × 8–10 reps', focus: 'A movement chosen for the client’s goals and equipment' },
                { code: 'B1', name: 'Split squat variation', prescription: '3 sets × 8 reps / leg', focus: 'Progression matched to current movement confidence' },
                { code: 'C1', name: 'Row variation', prescription: '3 sets × 10–12 reps', focus: 'Upper-body work selected for the overall programme' },
                { code: 'D1', name: 'Carry or conditioning finish', prescription: 'Brief repeat efforts', focus: 'Included only where it supports the main objective' },
              ].map((ex) => (
                <div key={ex.code} className="p-4 bg-charcoal-850 rounded border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div><div className="flex items-center gap-2 mb-1"><span className="text-xs font-mono font-bold text-smoke-400">{ex.code}</span><h4 className="text-sm font-semibold text-white">{ex.name}</h4></div><div className="flex flex-wrap items-center gap-3 text-xs font-mono text-paper-400"><span>{ex.prescription}</span><span>•</span><span>{ex.focus}</span></div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4"><h3 className="font-serif text-xl text-white mb-4">Illustrative week structure</h3><div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-xs font-mono">{[
            { day: 'MON', title: 'Strength session' }, { day: 'TUE', title: 'Rest or walk' }, { day: 'WED', title: 'Training session' }, { day: 'THU', title: 'Recovery / flexible' }, { day: 'FRI', title: 'Training session' }, { day: 'SAT', title: 'Optional movement' }, { day: 'SUN', title: 'Coach check-in' },
          ].map((cal) => <div key={cal.day} className="p-3 rounded border bg-charcoal-850 border-white/5 text-paper-400"><div className="font-bold text-white mb-2">{cal.day}</div><div className="text-paper-300 font-sans text-xs">{cal.title}</div></div>)}</div><p className="text-xs text-paper-400 font-light">The number and type of sessions are set after assessment—this is a visual example only.</p></div>
        )}

        {activeTab === 'checkin' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4"><h3 className="font-serif text-xl text-white mb-4">Illustrative check-in signals</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[
            { label: 'Sessions completed', copy: 'What was planned and what actually happened' }, { label: 'Food and habit consistency', copy: 'The agreed actions that mattered this week' }, { label: 'Energy, sleep and recovery', copy: 'Context for how the work is landing' }, { label: 'A short client note', copy: 'Anything that needs a coach’s attention before the next week' },
          ].map((item) => <div key={item.label} className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1"><span className="text-paper-300 text-sm font-semibold">{item.label}</span><div className="text-paper-400 text-xs font-sans">{item.copy}</div></div>)}</div></div>
        )}

        {activeTab === 'coach' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4"><h3 className="font-serif text-xl text-white mb-2">Illustrative feedback format</h3><div className="p-4 bg-charcoal-850 rounded-sm border border-white/5 space-y-2 text-xs font-sans"><div className="flex items-center justify-between font-mono text-[11px] text-smoke-400"><span>Aian McLennan (Coach)</span><span>Example only</span></div><p className="text-paper-200 text-sm leading-relaxed">“I watched the clip. Let’s keep the weight where it is for now and make the next set smoother. Send another angle after your next session and we will decide whether it is ready to progress.”</p></div><p className="text-xs text-paper-400">Actual coach feedback responds to the client’s movement, programme and current week.</p></div>
        )}

        <div className="mt-8 text-center"><p className="text-xs text-paper-400 font-light mb-4">A clear workspace is useful because coaching can stay close to the work, not buried in a generic app.</p><button onClick={() => onNavigate('/online/register')} className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white underline underline-offset-4">Ready to talk with Aian? Start your enquiry →</button></div>
      </div>
    </div>
  );
};
