import React, { useEffect, useState } from 'react';
import { PageRoute } from '../types';
const fields = [
  ['goals', 'Your priorities', 'Confirm your goals and any event dates or specific targets.'],
  ['history', 'Training history', 'What has worked, what has not, and what you are doing now.'],
  ['equipment', 'Where you train', 'Available equipment and any access restrictions.'],
  ['schedule', 'Your week', 'Available days, realistic session length, work, family and travel.'],
  ['injuries', 'Health and movement', 'Relevant injuries, pain, conditions, medication or professional guidance that could affect training. Write none if there is nothing to flag.'],
  ['nutrition', 'Food and nutrition', 'Typical meals, preferences, allergies, restrictions and previous approaches.'],
  ['sleep', 'Sleep and recovery', 'Typical sleep duration, quality and recovery.'],
  ['stress', 'Lifestyle and stress', 'Current demands and anything that affects consistency or recovery.'],
  ['measurements', 'Starting markers', 'Relevant measurements or performance markers you are comfortable providing. Write not sure if you need help establishing these.'],
  ['preferences', 'Coaching preferences', 'How you prefer feedback, where you need accountability and any other useful context.'],
];
export const OnboardingPage: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [token, setToken] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const load = async () => {
    const response = await fetch('/api/onboarding'); const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Please use the private access link in your welcome email.');
    setProfile(data);
    const original = data.application || {};
    setAnswers(Object.keys(data.assessment || {}).length ? data.assessment : {
      goals: data.main_objective || '', history: [original.current_training, original.training_history].filter(Boolean).join('\n'),
      equipment: original.training_environment || '', schedule: data.available_days || '',
    });
  };
  useEffect(() => {
    if (window.location.hash.length > 1) { setToken(window.location.hash.slice(1)); window.history.replaceState(null, '', window.location.pathname); }
    load().catch(e => setError(e.message));
  }, []);
  const open = async () => {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/session/onboarding', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({token}) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setToken(''); await load();
    } catch(e) { setError((e as Error).message); } finally {setBusy(false);}
  };
  const save = async (submit: boolean) => {
    setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch('/api/onboarding', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({assessment:answers,submit,healthConsent:consent}) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (submit) setProfile({...profile,assessment_submitted_at:new Date().toISOString()});
      setMessage(submit ? 'Assessment received. Aian will review it and contact you before your programme begins.' : 'Draft saved. You can continue during this signed-in session. Contact Aian for a fresh link if your session expires.');
    } catch(e) { setError((e as Error).message); } finally {setBusy(false);}
  };
  return <div className="min-h-screen bg-charcoal-950 px-5 py-10"><div className="max-w-[720px] mx-auto">
    <button onClick={()=>onNavigate('/')} className="font-serif tracking-[0.15em] text-2xl py-2">BASELN</button>
    <p className="mt-10 text-xs uppercase tracking-widest text-smoke-300">BASELN / 6 · PRIVATE STARTING ASSESSMENT</p>
    <h1 className="text-4xl mt-4">Your starting point.</h1>
    {error && <p role="alert" className="mt-6 text-red-200 leading-relaxed">{error}</p>}
    {message && <p role="status" className="mt-6 text-smoke-300 leading-relaxed">{message}</p>}
    {!profile ? <div className="mt-8 space-y-6"><p className="text-paper-300">This private assessment opens after enrolment and payment.</p>{token && <button disabled={busy} onClick={open} className="bg-smoke-400 text-charcoal-950 px-6 py-4">{busy ? 'Opening…' : 'Open my private assessment'}</button>}<p><a className="text-smoke-300 underline" href="mailto:aian@baseln.co?subject=BASELN%20assessment%20access">Contact Aian for access</a></p></div> : <>
      <p className="mt-5 text-paper-300 leading-relaxed">Hi {profile.full_name.split(' ')[0]}. Your application answers are included below. Add detail where useful, then complete the remaining sections. Aian will review this before setting your initial training and nutrition priorities.</p>
      {profile.assessment_submitted_at ? <p className="mt-8 py-8 border-y border-white/10">Your assessment has been submitted. Contact Aian directly if anything needs updating.</p> : <form onSubmit={e=>{e.preventDefault();save(true);}} className="mt-8 space-y-7">
        {fields.map(([id,label,help])=><label key={id} className="block"><span className="block text-lg">{label}</span><span id={`help-${id}`} className="block text-sm text-paper-400 my-2">{help}</span><textarea aria-describedby={`help-${id}`} value={answers[id]||''} onChange={e=>setAnswers({...answers,[id]:e.target.value})} maxLength={4000} rows={3} className="w-full bg-charcoal-900 border border-white/20 p-4 text-paper-100" /></label>)}
        <label className="flex gap-3 items-start text-sm leading-relaxed"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 w-5 h-5 shrink-0" /><span>I consent to BASELN collecting and using the health and assessment information I provide to plan and deliver my coaching. I have read the <a href="/privacy" target="_blank" rel="noreferrer" className="underline text-smoke-300">Privacy Notice</a>.</span></label>
        <div className="flex flex-wrap gap-4"><button type="button" disabled={busy} onClick={()=>save(false)} className="border border-white/20 px-6 py-4 disabled:opacity-40">Save draft</button><button type="submit" disabled={busy||!consent} className="bg-smoke-400 text-charcoal-950 px-6 py-4 disabled:opacity-40">{busy ? 'Saving…' : 'Submit assessment'}</button></div>
      </form>}
    </>}
  </div></div>;
};
