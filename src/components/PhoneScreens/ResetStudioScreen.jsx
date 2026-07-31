import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ResetStudioScreen({ activeTab = 'Unwind' }) {
  const [seconds, setSeconds] = useState(4);
  const [phase, setPhase] = useState('Hold');

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setPhase((p) => (p === 'Hold' ? 'Exhale' : p === 'Exhale' ? 'Inhale' : 'Hold'));
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const modeTitle = activeTab === 'Sleep' ? 'Sleep Restoration' : activeTab === 'Focus' ? 'Focus Breathing' : 'Box Breathing';

  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#050711] p-3.5 pt-2 select-none overflow-hidden relative font-sans">
      {/* Background Aurora Curtain Effect */}
      <div class="absolute inset-0 bg-gradient-to-t from-teal-900/25 via-emerald-950/15 to-transparent pointer-events-none"></div>
      <div class="absolute right-0 top-0 w-32 h-64 bg-gradient-to-b from-cyan-500/15 via-teal-400/10 to-transparent blur-xl pointer-events-none"></div>

      {/* Top Header Controls */}
      <div class="relative z-10 flex items-center justify-between text-[10px] text-slate-400">
        <button class="w-6 h-6 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white">
          <X class="w-3.5 h-3.5" />
        </button>

        <div class="text-center space-y-0.5">
          <p class="text-[8px] uppercase tracking-widest text-slate-400 font-semibold">
            RESET · CYCLE <span class="text-purple-300">0/5</span>
          </p>
          <h4 class="text-xs font-semibold text-white tracking-tight">{modeTitle}</h4>
          <p class="text-[8px] font-mono text-slate-400">4s-4s-4s-4s</p>
        </div>

        <div class="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-300 shadow-md shadow-purple-500/50 animate-pulse"></div>
      </div>

      {/* Center Breathing Orb Visualizer */}
      <div class="relative z-10 my-auto flex flex-col items-center justify-center">
        <div class="relative w-44 h-44 flex items-center justify-center">
          {/* Outer Thin Coral Glowing Ring */}
          <div class="absolute inset-0 rounded-full border-2 border-rose-400/70 shadow-lg shadow-rose-500/20 animate-pulse"></div>

          {/* Central Purple Filled Circle */}
          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-950 p-1 shadow-2xl shadow-purple-600/50 flex flex-col items-center justify-center text-center">
            <div class="w-full h-full rounded-full bg-purple-900/90 backdrop-blur-md flex flex-col items-center justify-center border border-purple-400/30">
              <span class="text-sm font-semibold text-white tracking-wide mb-1">
                {phase}
              </span>
              <span class="text-xs font-mono text-purple-200 tracking-wider">
                00:0{seconds}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timing Text */}
      <div class="relative z-10 text-center pb-1">
        <p class="text-[9px] font-mono text-slate-500 tracking-widest">
          4s-4s-4s-4s
        </p>
      </div>
    </div>
  );
}
