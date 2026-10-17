import React, { useEffect, useState } from 'react';
import { PageRoute } from '../types';

export const ThankYouPage: React.FC<{ onNavigate: (path: PageRoute) => void }> = ({ onNavigate }) => {
  const [receipt, setReceipt] = useState<{leadId:number}|null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try { const value=JSON.parse(sessionStorage.getItem('baseln_last_lead_receipt')||'null'); if(Number.isSafeInteger(value?.leadId)&&value.leadId>0) setReceipt(value); } catch {}
    setLoaded(true);
  },[]);
  return <div className="pt-24 pb-20 px-5"><div className="max-w-[720px] mx-auto py-14">
    <p className="font-mono text-xs tracking-widest text-smoke-300">BASELN / APPLICATION</p>
    <h1 className="font-serif text-4xl sm:text-5xl mt-5">{!loaded ? 'Your application.' : receipt ? 'GOOD. WE’VE GOT IT.' : 'Application receipt.'}</h1>
    {loaded && (receipt ? <>
      <p className="text-sm text-smoke-300 mt-5">Reference #{receipt.leadId}</p>
      <p className="text-lg text-paper-200 leading-relaxed mt-6">Thanks for applying for private coaching with BASELN. Aian will personally review your application and respond within one business day.</p>
      <ol className="mt-8 space-y-5 border-y border-white/10 py-7 text-paper-300"><li><strong className="text-paper-100">01 / Personal review.</strong> Your goals, training and coaching priorities are reviewed.</li><li><strong className="text-paper-100">02 / A conversation.</strong> Suitable applicants receive an invitation to a 15–20-minute consultation.</li><li><strong className="text-paper-100">03 / Getting started.</strong> If you decide to enrol, your detailed private assessment follows payment and acceptance of the coaching terms.</li></ol>
      <p className="mt-6 text-paper-300">There is nothing else you need to complete now. This application does not commit you to coaching.</p>
    </> : <p className="mt-6 text-paper-300 leading-relaxed">No application receipt is available in this browser session. If you have already applied, contact Aian before submitting again.</p>)}
    <p className="mt-7"><a href="mailto:aian@baseln.co" className="text-smoke-300 underline">aian@baseln.co</a></p>
    <button onClick={()=>onNavigate(receipt?'/':'/online/register')} className="mt-8 bg-smoke-400 text-charcoal-950 px-6 py-4 text-sm uppercase tracking-widest">{receipt?'Return to BASELN':'View application'}</button>
  </div></div>;
};
