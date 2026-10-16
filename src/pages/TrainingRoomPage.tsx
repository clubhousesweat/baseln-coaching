import React, { useState } from 'react';
import { PageRoute } from '../types';

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
            <h3 className="font-serif text-xl text-white mb-4">Illustrative review cadence</h3>
            <div className="space-y-3">
              <div className="p-4 bg-charcoal-850 border border-white/5 rounded">
                <div className="text-xs font-mono text-smoke-400 uppercase tracking-wider mb-1">WEEKLY COACH REVIEW</div>
                <p className="text-xs sm:text-sm text-paper-300 font-light leading-relaxed">
                  Feedback on workout completion, technique questions, and weekly check-in reflections. Adjustments to volume, loading, or nutrition targets are applied directly for the upcoming week.
                </p>
              </div>
              <div className="p-4 bg-charcoal-850 border border-white/5 rounded">
                <div className="text-xs font-mono text-smoke-400 uppercase tracking-wider mb-1">TIMELY COMMUNICATION</div>
                <p className="text-xs sm:text-sm text-paper-300 font-light leading-relaxed">
                  Direct communication through the Training Room and WhatsApp for technique questions, equipment substitutions, or session adjustments when plans change.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs uppercase tracking-widest font-semibold text-paper-300 hover:text-white"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => onNavigate('/online/register')}
            className="text-xs uppercase tracking-widest font-semibold bg-smoke-500 hover:bg-smoke-400 text-charcoal-950 px-5 py-2.5 rounded-sm"
          >
            Apply for coaching →
          </button>
        </div>
      </div>
    </div>
  );
};
