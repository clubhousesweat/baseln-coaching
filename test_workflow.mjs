import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { transition, sessionToken, verifySession, nextBusinessDay, messageFor, mountWorkflow } from './server/workflow.mjs';
import express from 'express';

const secret='test-only-access-key-with-at-least-32-characters';
test('enrolment cannot skip consultation or omit verified payment and accepted terms',()=>{
  assert.throws(()=>transition('New','enrol',{paymentReference:'paid',termsReference:'signed'}));
  assert.throws(()=>transition('Offer Sent','enrol',{}));
  assert.throws(()=>transition('Offer Sent','enrol',{paymentReference:'paid'}));
  let stage='New';
  for(const action of ['invite','booked','completed','offer']) stage=transition(stage,action);
  assert.equal(stage,'Offer Sent');
  assert.equal(transition(stage,'enrol',{paymentReference:'receipt-1',termsReference:'terms-1'}),'Enrolled');
  assert.equal(transition('Qualified','not_proceeding'),'Not Proceeding');
  assert.throws(()=>transition('Not Proceeding','invite'));
});
test('signed sessions reject tampering, expiry and wrong signing key',()=>{
 const token=sessionToken({role:'client',leadId:4},secret,1000);
 assert.equal(verifySession(token,secret,2000).leadId,4);
 assert.equal(verifySession(token,secret,1000+2*3600000),null);
 assert.equal(verifySession(token,secret+'x',2000),null);
 assert.equal(verifySession(token.replace(/.$/,'!'),secret,2000),null);
 assert.equal(verifySession('',secret),null);
});
test('review deadline advances weekends in Perth time',()=>{
 assert.equal(nextBusinessDay(new Date('2026-10-16T02:00:00Z')).toISOString(),'2026-10-19T02:00:00.000Z');
 assert.equal(nextBusinessDay(new Date('2026-10-18T02:00:00Z')).toISOString(),'2026-10-19T02:00:00.000Z');
 assert.equal(nextBusinessDay(new Date('2026-10-19T02:00:00Z')).toISOString(),'2026-10-20T02:00:00.000Z');
});
test('internal email excludes application free text and medical data',()=>{
 const message=messageFor('owner',{lead_id:9,full_name:'Test Person',email:'test@example.com',biggest_obstacle:'PRIVATE HEALTH DETAIL'},'https://baseln.co');
 assert.ok(message.text.includes('https://baseln.co/coach'));
 assert.ok(!message.text.includes('PRIVATE HEALTH DETAIL'));
 assert.ok(!message.text.includes('test@example.com'));
});
test('applicant acknowledgement does not claim acceptance or booking',()=>{
 const message=messageFor('acknowledgement',{full_name:'Test Person',email:'test@example.com'},'https://baseln.co');
 assert.match(message.text,/one business day/);
 assert.match(message.text,/Suitable applicants/);
 assert.ok(!message.text.includes('/onboarding'));
});
test('private endpoints enforce role and origin before exposing database records',async()=>{
 const old=process.env.COACH_ACCESS_KEY;process.env.COACH_ACCESS_KEY=secret;
 const app=express();app.use(express.json());
 let databaseTouches=0;
 mountWorkflow(app,()=>({execute:async()=>{databaseTouches++;return [[]]},query:async()=>{databaseTouches++;return [[]]}}));
 const server=app.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(base+'/api/coach/applications')).status,401);
  assert.equal((await fetch(base+'/api/onboarding')).status,401);
  const client=sessionToken({role:'client',leadId:9},secret);
  assert.equal((await fetch(base+'/api/coach/applications',{headers:{cookie:`baseln_session=${client}`}})).status,401);
  assert.equal((await fetch(base+'/api/session/coach',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://attacker.example'},body:JSON.stringify({key:secret})})).status,403);
  assert.equal(databaseTouches,0);
  const login=await fetch(base+'/api/session/coach',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://baseln.co'},body:JSON.stringify({key:secret})});
  assert.equal(login.status,200);assert.match(login.headers.get('set-cookie'),/HttpOnly/);assert.match(login.headers.get('set-cookie'),/Secure/);assert.match(login.headers.get('set-cookie'),/SameSite=Strict/);
 }finally{await new Promise(resolve=>server.close(resolve));if(old===undefined)delete process.env.COACH_ACCESS_KEY;else process.env.COACH_ACCESS_KEY=old;}
});

test('follow-up worker cancels messages for booked applicants and stopped contact',async()=>{
 const {processOutbox}=await import('./server/workflow.mjs');
 for(const lead of [{stage:'Consultation Booked',contact_stopped:false},{stage:'Qualified',contact_stopped:true}]){
  let cancelled=false;let sends=0;
  const connection={
   query:async(sql)=>sql.includes('GET_LOCK')?[[{acquired:1}]]:sql.includes('SELECT * FROM application_outbox')?[[{id:1,lead_id:1,kind:'followup'}]]:[[]],
   execute:async(sql)=>{if(sql.startsWith('SELECT l.'))return [[lead]];if(sql.includes("state='cancelled'"))cancelled=true;return [{}]},release:()=>{}
  };
  await processOutbox({getConnection:async()=>connection},async()=>{sends++;return {id:'test'}},'https://baseln.co');
  assert.equal(sends,0);assert.equal(cancelled,true);
 }
});
test('follow-up waits for an accepted consultation invitation',async()=>{
 const {processOutbox}=await import('./server/workflow.mjs');let sends=0;
 const connection={query:async(sql)=>sql.includes('GET_LOCK')?[[{acquired:1}]]:sql.includes('SELECT * FROM application_outbox')?[[{id:1,lead_id:1,kind:'followup'}]]:[[]],execute:async(sql)=>sql.startsWith('SELECT l.')?[[{stage:'Qualified',contact_stopped:false}]]:[[{state:'pending'}]],release:()=>{}};
 await processOutbox({getConnection:async()=>connection},async()=>{sends++;return {id:'test'}},'https://baseln.co');assert.equal(sends,0);
});
