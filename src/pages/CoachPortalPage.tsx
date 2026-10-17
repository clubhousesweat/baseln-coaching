import React, { useEffect, useState } from 'react';
import { PageRoute } from '../types';

type Application = { id: number; full_name: string; email: string; main_objective: string; stage: string; review_due_at: string; [key: string]: any };
const button = 'min-h-11 px-4 py-3 border border-white/20 text-sm text-paper-100 hover:border-smoke-400 disabled:opacity-40';
const input = 'w-full bg-charcoal-900 border border-white/20 p-3 text-paper-100';

export const CoachPortalPage: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [key, setKey] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [detail, setDetail] = useState<any>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bookingUrl, setBookingUrl] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [termsReference, setTermsReference] = useState('');
  const api = async (path: string, body?: object, method = 'POST') => {
    const response = await fetch(path, body ? { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined);
    const result = await response.json();
    if (!response.ok) { if (response.status === 401) { setSignedIn(false); setDetail(null); setApplications([]); } throw new Error(result.error || 'Please try again.'); }
    return result;
  };
  const load = async () => { const data = await api('/api/coach/applications'); setApplications(data.applications); setSignedIn(true); };
  useEffect(() => { load().catch(() => {}); }, []);
  const select = async (id: number) => { setError(''); try { setDetail(await api(`/api/coach/applications/${id}`)); setPaymentReference(''); setTermsReference(''); } catch (e) { setError((e as Error).message); } };
  const action = async (action: string) => {
    setBusy(true); setError('');
    try { await api(`/api/coach/applications/${detail.application.lead_id}/action`, { action, bookingUrl, paymentReference, termsReference }); await load(); await select(detail.application.lead_id); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  const run = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await api('/api/session/coach', { key }); setKey(''); await load(); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  const app = detail?.application;
  const original = app ? (typeof app.attribution_json === 'string' ? JSON.parse(app.attribution_json) : app.attribution_json) : {};
  const assessment = app?.assessment_json ? (typeof app.assessment_json === 'string' ? JSON.parse(app.assessment_json) : app.assessment_json) : null;
  return <div className="pt-24 pb-16 max-w-[1200px] mx-auto px-5 sm:px-8">
    <header className="py-8 flex flex-wrap justify-between items-center gap-4"><div><p className="text-sm text-smoke-300 uppercase tracking-widest">BASELN / PRIVATE OPERATIONS</p><h1 className="text-3xl mt-2">Application pipeline</h1></div>{signedIn && <button className={button} onClick={async () => { await api('/api/session/logout', {}); setSignedIn(false); setApplications([]); setDetail(null); }}>Sign out</button>}</header>
    {error && <p role="alert" className="p-4 my-4 text-red-200 border border-red-300/30">{error}</p>}
    {!signedIn ? <form onSubmit={run} className="max-w-md space-y-5 py-8"><p className="text-paper-300">Sign in to review applications and manage the next steps.</p><label className="block">Coach access key<input type="password" autoComplete="current-password" required value={key} onChange={e => setKey(e.target.value)} className={`${input} mt-2`} /></label><button disabled={busy} className={button}>{busy ? 'Signing in…' : 'Sign in'}</button></form> : <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <section aria-label="Applications" className="space-y-2">{!applications.length && <p className="py-8 text-paper-300">No applications have been received through this workflow yet.</p>}{applications.map(item => <button key={item.id} onClick={() => select(item.id)} aria-pressed={app?.lead_id === item.id} className={`${button} w-full text-left block ${app?.lead_id === item.id ? 'bg-white/10' : ''}`}><span className="block font-semibold">{item.full_name}</span><span className="block text-sm text-smoke-300 mt-1">{item.stage}</span><span className="block text-xs text-paper-400 mt-2">Review due {new Date(item.review_due_at).toLocaleString()}</span></button>)}</section>
      <section aria-label="Application details" className="min-w-0">{!app ? <p className="py-8 text-paper-300">Choose an application to read the full record.</p> : <>
        <h2 className="text-3xl">{app.full_name}</h2><p className="mt-2 text-smoke-300">{app.email} · {app.stage}</p>
        <dl className="my-6 divide-y divide-white/10">{Object.entries({ Goals: app.main_objective, 'Country / time zone': app.country_time_zone, 'Training availability': app.available_days, 'Preferred start': app.preferred_start_date, 'Main obstacle': app.biggest_obstacle, 'Training now': original.current_training, 'Training environment': original.training_environment, 'Training history': original.training_history, 'Coaching priorities': original.coaching_value, 'Previous attempts': original.previous_attempts, 'Goal details': original.goal_detail }).map(([label, value]) => <div className="py-3" key={label}><dt className="text-xs uppercase text-smoke-300 mb-1">{label}</dt><dd className="whitespace-pre-wrap break-words text-paper-100">{String(value || 'Not provided')}</dd></div>)}</dl>
        <div className="border-y border-white/10 py-6 space-y-4"><h3 className="text-xl">Next action</h3>
          {['New', 'Follow Up Later'].includes(app.stage) && <><label className="block text-sm">Consultation booking link<input type="url" placeholder="https://…" value={bookingUrl} onChange={e => setBookingUrl(e.target.value)} className={`${input} mt-2`} /></label><p className="text-sm text-paper-300">Only send after personally reviewing this application.</p><button disabled={busy || app.contact_stopped} className={button} onClick={() => action('invite')}>Reviewed — invite to consultation</button></>}
          {app.stage === 'Qualified' && <><p className="text-sm text-paper-300">Mark booked as soon as a booking is confirmed to stop the follow-up.</p><button disabled={busy} className={button} onClick={() => action('booked')}>Consultation booked</button></>}
          {app.stage === 'Consultation Booked' && <button disabled={busy} className={button} onClick={() => action('completed')}>Consultation completed</button>}
          {app.stage === 'Consultation Completed' && <button disabled={busy} className={button} onClick={() => action('offer')}>Offer and terms sent</button>}
          {app.stage === 'Offer Sent' && <><label className="block text-sm">Verified payment reference<input value={paymentReference} onChange={e => setPaymentReference(e.target.value)} className={`${input} mt-2`} /></label><label className="block text-sm">Accepted terms reference<input value={termsReference} onChange={e => setTermsReference(e.target.value)} className={`${input} mt-2`} /></label><p className="text-sm text-paper-300">Check the payment provider and signed terms first. This action records your verification and queues the private assessment welcome email.</p><button disabled={busy || !paymentReference.trim() || !termsReference.trim()} className={button} onClick={() => action('enrol')}>Confirm enrolment and open onboarding</button></>}
          {app.stage === 'Enrolled' && <button disabled={busy} className={button} onClick={() => action('send_access_link')}>Send a fresh assessment access link</button>}
          {!['Enrolled', 'Not Proceeding'].includes(app.stage) && <div className="flex flex-wrap gap-3"><button disabled={busy} className={button} onClick={() => action('follow_up_later')}>Follow up later</button><button disabled={busy} className={button} onClick={() => action('not_proceeding')}>Not proceeding</button></div>}
          <button disabled={busy || app.contact_stopped} className={button} onClick={() => action('stop_contact')}>{app.contact_stopped ? 'Further contact stopped' : 'Stop invitations and follow-ups'}</button>
        </div>
        {assessment && <section className="py-6"><h3 className="text-2xl">Starting assessment</h3><p className="text-sm text-smoke-300 mt-2">{app.assessment_submitted_at ? 'Submitted for review' : 'Draft — client is still completing it'}</p><dl>{Object.entries(assessment).filter(([k]) => !['healthConsent','consentAt'].includes(k)).map(([label,value]) => <div className="py-3 border-b border-white/10" key={label}><dt className="capitalize text-sm text-smoke-300">{label}</dt><dd className="whitespace-pre-wrap break-words mt-1">{String(value)}</dd></div>)}</dl>{app.assessment_submitted_at && !app.assessment_reviewed_at && <button disabled={busy} className={`${button} mt-4`} onClick={() => action('review_assessment')}>Assessment personally reviewed</button>}{app.assessment_reviewed_at && !app.coaching_started_at && <><p className="text-sm text-paper-300 mt-4">Confirm the programme, nutrition guidance, communication arrangements and first review have been delivered before continuing.</p><button disabled={busy} className={`${button} mt-4`} onClick={() => action('start_coaching')}>Programme delivered — coaching started</button></>}</section>}
        <section className="py-6"><h3 className="text-xl">Email queue</h3>{detail.emails.map((mail: any) => <p key={mail.kind} className="text-sm text-paper-300 py-2">{mail.kind}: {mail.state} · attempts {mail.attempts}{mail.attempts >= 6 && mail.state === 'pending' ? ' · delivery needs attention' : ''}</p>)}<h3 className="text-xl mt-6">Activity</h3>{detail.events.map((event: any, i: number) => <p key={i} className="text-sm text-paper-300 py-2">{event.action.replaceAll('_',' ')} · {new Date(event.created_at).toLocaleString()}</p>)}</section>
      </>}</section>
    </div>}
    <button className={`${button} mt-8`} onClick={() => onNavigate('/')}>Return to BASELN</button>
  </div>;
};
