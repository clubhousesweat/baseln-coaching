import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';

interface ApplyPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryTimeZone: '',
    phone: '',
    mainObjective: 'Lose body fat and build strength',
    otherObjective: '',
    whatElseImprove: '',
    sixWeekDifference: '',
    currentTraining: '',
    availableDays: '3 days per week',
    environmentEquipment: '',
    biggestObstacle: '',
    preferredStartDate: '',
    privacyConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.countryTimeZone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('Please review and accept the privacy notice to proceed.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-smoke-400 block mb-2">
            PRIVATE COACHING ENQUIRY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight uppercase mb-4">
            <span className="block">TELL AIAN WHAT</span><span className="block text-smoke-300 italic font-normal">YOU WANT TO CHANGE.</span>
          </h1>
          <p className="text-sm sm:text-base text-paper-300 font-light leading-relaxed">
            A few details help Aian understand the objective and whether BASELN is the right coaching fit. This is not a fitness test or your full health assessment.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 bg-charcoal-900 border border-smoke-500/30 rounded-sm space-y-6 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-smoke-500/20 flex items-center justify-center text-smoke-300">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">
              Application Received.
            </h2>
            <div className="p-5 bg-charcoal-850 border border-white/5 rounded-sm">
              <p className="text-sm text-paper-200 font-light leading-relaxed">
                “Received. Aian will review your brief and contact you about the next step.”
              </p>
            </div>
            <p className="text-xs sm:text-sm text-paper-400 font-light leading-relaxed">
              We review every application personally within 24–48 business hours. You will receive an initial email response from Aian McLennan directly to discuss starting dates and programme alignment.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('/')}
                className="text-xs uppercase tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-sm transition-colors"
              >
                Return Home
              </button>
              <button
                onClick={() => onNavigate('/coaching')}
                className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white"
              >
                Explore Coaching Inclusions
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 bg-charcoal-900 border border-white/10 rounded-sm space-y-8 shadow-2xl"
          >
            {errorMsg && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Fields in exact blueprint order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  1. Your Full Name <span className="text-smoke-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. David Harrison"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  2. Email Address <span className="text-smoke-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="david@example.com"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  3. Country / Time Zone <span className="text-smoke-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.countryTimeZone}
                  onChange={(e) => setFormData({ ...formData, countryTimeZone: e.target.value })}
                  placeholder="e.g. Australia (AEST) or Singapore"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  4. Phone Number <span className="text-paper-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+61 400 000 000"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                5. Main Objective <span className="text-smoke-400">*</span>
              </label>
              <select
                value={formData.mainObjective}
                onChange={(e) => setFormData({ ...formData, mainObjective: e.target.value })}
                className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
              >
                <option value="Lose body fat and build strength">Lose body fat and build strength</option>
                <option value="Gain lean muscle & hypertrophy">Gain lean muscle & hypertrophy</option>
                <option value="Improve athletic conditioning & engine">Improve athletic conditioning & engine</option>
                <option value="Prepare for an event / race / season">Prepare for an event / race / season</option>
                <option value="Return to training after time away">Return to training after time away</option>
                <option value="Other">Other (specify below)</option>
              </select>
              {formData.mainObjective === 'Other' && (
                <input
                  type="text"
                  placeholder="Describe your primary objective"
                  value={formData.otherObjective}
                  onChange={(e) => setFormData({ ...formData, otherObjective: e.target.value })}
                  className="mt-3 w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-smoke-400"
                />
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                6. What else would you like to improve?
              </label>
              <textarea
                rows={2}
                value={formData.whatElseImprove}
                onChange={(e) => setFormData({ ...formData, whatElseImprove: e.target.value })}
                placeholder="e.g. Energy levels, meal structure, running pacing or nagging shoulder stiffness"
                className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                7. What would you like to be different after six weeks?
              </label>
              <textarea
                rows={2}
                value={formData.sixWeekDifference}
                onChange={(e) => setFormData({ ...formData, sixWeekDifference: e.target.value })}
                placeholder="e.g. Down a waist size, lifting with zero lower-back pain, feeling consistent again"
                className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  8. Current Training History
                </label>
                <input
                  type="text"
                  value={formData.currentTraining}
                  onChange={(e) => setFormData({ ...formData, currentTraining: e.target.value })}
                  placeholder="e.g. 2 sporadic gym visits or none for 12 months"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  9. Realistic Available Days / Week
                </label>
                <select
                  value={formData.availableDays}
                  onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                >
                  <option value="2 days per week">2 focused sessions</option>
                  <option value="3 days per week">3 days per week (Recommended)</option>
                  <option value="4 days per week">4 days per week</option>
                  <option value="5+ days per week">5+ days per week</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  10. Training Environment & Equipment
                </label>
                <input
                  type="text"
                  value={formData.environmentEquipment}
                  onChange={(e) => setFormData({ ...formData, environmentEquipment: e.target.value })}
                  placeholder="e.g. Commercial gym, garage barbell or basic home kit"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                  11. Preferred Start Date
                </label>
                <input
                  type="text"
                  value={formData.preferredStartDate}
                  onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                  placeholder="e.g. Next Monday or ASAP"
                  className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-paper-300 font-medium mb-2">
                Biggest Obstacle So Far
              </label>
              <input
                type="text"
                value={formData.biggestObstacle}
                onChange={(e) => setFormData({ ...formData, biggestObstacle: e.target.value })}
                placeholder="e.g. Work travel, inconsistent diet, or losing momentum after 3 weeks"
                className="w-full bg-charcoal-950 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-smoke-400 transition-colors"
              />
            </div>

            {/* Privacy notice consent checkbox */}
            <div className="pt-2 border-t border-white/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-charcoal-950 text-smoke-500 focus:ring-smoke-400"
                />
                <span className="text-xs text-paper-400 font-light leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="text-smoke-400 underline underline-offset-2"
                  >
                    Privacy Notice
                  </button>
                  . Information collected is used strictly to assess coaching fit and will not be shared.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 rounded-sm shadow-xl transition-all"
            >
              Start Your Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const TrainingRoomPage: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'session' | 'calendar' | 'checkin' | 'coach'>('session');

  return (
    <div className="pt-24 min-h-[90vh] bg-charcoal-950 pb-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
        {/* Header indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-smoke-400">
                BASELN TRAINING ROOM · ACTIVE BLOCK
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">
              Member Workspace Preview
            </h1>
          </div>
          <div className="text-xs font-mono text-paper-400">
            Client: <span className="text-white font-medium">David H.</span> · Block 01 (Week 2 of 6)
          </div>
        </div>

        {/* Workspace interactive preview tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto text-xs font-mono tracking-wider">
          <button
            onClick={() => setActiveTab('session')}
            className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${
              activeTab === 'session' ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'
            }`}
          >
            Today's Session
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${
              activeTab === 'calendar' ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'
            }`}
          >
            Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${
              activeTab === 'checkin' ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'
            }`}
          >
            Weekly Check-in
          </button>
          <button
            onClick={() => setActiveTab('coach')}
            className={`px-4 py-2 rounded-sm uppercase transition-colors whitespace-nowrap ${
              activeTab === 'coach' ? 'bg-white/10 text-white font-semibold' : 'text-paper-400 hover:text-white'
            }`}
          >
            Coach Messages (Aian)
          </button>
        </div>

        {/* Tab 1: Today's Session */}
        {activeTab === 'session' && (
          <div className="space-y-6">
            <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                <div>
                  <span className="text-xs font-mono text-smoke-400 uppercase tracking-widest">
                    DAY 2 OF 3 · 45 MIN DURATION
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">
                    Lower Capacity & Posterior Chain
                  </h3>
                </div>
                <span className="text-xs font-mono bg-smoke-500/10 text-smoke-300 px-3 py-1 rounded border border-smoke-400/20">
                  Target RPE: 7–8
                </span>
              </div>

              {/* Coach's specific note */}
              <div className="my-4 p-4 bg-charcoal-850 border-l-2 border-smoke-400 text-xs sm:text-sm text-paper-300 font-light italic">
                “Focus on full hip extension on the Romanian Deadlifts. Keep your lats braced before every rep. Send video of set 3.”
              </div>

              {/* Exercise canvas */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    code: 'A1',
                    name: 'Romanian Deadlift (Barbell or DB)',
                    prescription: '3 sets × 8–10 reps',
                    tempo: '3011 tempo',
                    rest: '90s rest',
                    targetLoad: '80 kg (last week: 75 kg × 10)',
                  },
                  {
                    code: 'B1',
                    name: 'Rear-Foot Elevated Split Squat',
                    prescription: '3 sets × 8 reps / leg',
                    tempo: '2010 tempo',
                    rest: '60s rest',
                    targetLoad: '16 kg dumbbells',
                  },
                  {
                    code: 'C1',
                    name: 'Chest-Supported Row',
                    prescription: '3 sets × 10–12 reps',
                    tempo: '2111 tempo',
                    rest: '60s rest',
                    targetLoad: '24 kg dumbbells',
                  },
                  {
                    code: 'D1',
                    name: 'Farmer Walk Carry Progression',
                    prescription: '4 rounds × 40m carry',
                    tempo: 'Continuous posture',
                    rest: '45s rest',
                    targetLoad: 'Heavy kettlebells',
                  },
                ].map((ex) => (
                  <div
                    key={ex.code}
                    className="p-4 bg-charcoal-850 rounded border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-smoke-400">{ex.code}</span>
                        <h4 className="text-sm font-semibold text-white">{ex.name}</h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-paper-400">
                        <span>{ex.prescription}</span>
                        <span>• {ex.tempo}</span>
                        <span>• {ex.rest}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-paper-300 bg-charcoal-900 px-3 py-2 rounded border border-white/5 shrink-0">
                      Target: {ex.targetLoad}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Calendar */}
        {activeTab === 'calendar' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-white mb-4">Week 2 Training Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-xs font-mono">
              {[
                { day: 'MON', status: 'Completed', title: 'Upper Strength', time: '42 min' },
                { day: 'TUE', status: 'Active Today', title: 'Lower Posterior', time: '45 min' },
                { day: 'WED', status: 'Rest / 8k Steps', title: 'Active Recovery', time: 'Daily' },
                { day: 'THU', status: 'Planned', title: 'Zone 2 Run Flush', time: '35 min' },
                { day: 'FRI', status: 'Planned', title: 'Total Body Density', time: '40 min' },
                { day: 'SAT', status: 'Rest / Outdoor', title: 'Weekend Movement', time: 'Flexible' },
                { day: 'SUN', status: 'Check-in Due', title: 'Weekly Coach Review', time: 'Submit' },
              ].map((cal) => (
                <div
                  key={cal.day}
                  className={`p-3 rounded border ${
                    cal.status === 'Active Today'
                      ? 'bg-smoke-500/10 border-smoke-400 text-white'
                      : 'bg-charcoal-850 border-white/5 text-paper-400'
                  }`}
                >
                  <div className="font-bold text-white mb-1">{cal.day}</div>
                  <div className="text-[10px] text-smoke-400 mb-2">{cal.status}</div>
                  <div className="text-paper-300 font-sans text-xs">{cal.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Check-in */}
        {activeTab === 'checkin' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4 text-xs font-mono">
            <h3 className="font-serif text-xl text-white font-sans mb-4">Concise Signals Check-in</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1">
                <span className="text-paper-400">Sessions Completed</span>
                <div className="text-white text-base font-semibold">3 of 3 Planned</div>
              </div>
              <div className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1">
                <span className="text-paper-400">Protein Adherence</span>
                <div className="text-white text-base font-semibold">145g / day average</div>
              </div>
              <div className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1">
                <span className="text-paper-400">Energy & Sleep Quality</span>
                <div className="text-white text-base font-semibold">7.4 hrs / night (Good)</div>
              </div>
              <div className="p-4 bg-charcoal-850 rounded border border-white/5 space-y-1">
                <span className="text-paper-400">Week 2 Win</span>
                <div className="text-smoke-300 text-xs font-sans">
                  Hit 80kg deadlift for 3 full sets with zero lumbar fatigue.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Coach */}
        {activeTab === 'coach' && (
          <div className="p-6 bg-charcoal-900 border border-white/10 rounded-sm space-y-4">
            <h3 className="font-serif text-xl text-white mb-2">Direct Coaching Thread</h3>
            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 bg-charcoal-850 rounded-sm border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px] text-smoke-400 mb-1">
                  <span>Aian McLennan (Coach)</span>
                  <span>Yesterday at 4:18 PM</span>
                </div>
                <p className="text-paper-200 text-sm leading-relaxed">
                  “Reviewed your deadlift set from yesterday. Bar path was locked against your shins, which kept the weight over midfoot. Next week we will add 2.5 kg on your top set. Rest up tomorrow.”
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-paper-400 font-light mb-4">
            Notice: This member space is browser-first and fully mobile-optimised.
          </p>
          <button
            onClick={() => onNavigate('/apply')}
            className="text-xs uppercase tracking-widest font-semibold text-smoke-400 hover:text-white underline underline-offset-4"
          >
            Ready to train with Aian? Start your application →
          </button>
        </div>
      </div>
    </div>
  );
};
