import React from 'react';
import { Bell, ChevronLeft, ChevronRight, Sparkles, MessageSquare, CheckCircle2, Moon, Activity, Heart } from 'lucide-react';

export default function InsightsScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#070A18] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Deep Space Faint Stars */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#070A18] to-[#04060E] pointer-events-none"></div>

      {/* Top Header Bar */}
      <div class="relative z-10 space-y-2">
        <div class="flex items-center justify-between text-[10px] text-slate-300 border-b border-slate-800/80 pb-1.5">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-400 to-cyan-300 p-[1px] shadow-sm">
              <div class="w-full h-full rounded-full bg-[#070A18] flex items-center justify-center text-[8px] font-bold text-white">
                A
              </div>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-white tracking-tight">Insights</span>
                <span class="w-2.5 h-2.5 rounded-full border border-purple-400 border-t-transparent animate-spin inline-block"></span>
              </div>
              <p class="text-[8px] text-slate-400">Last Synced: 7 min ago</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex items-center bg-[#13172E] border border-purple-500/30 rounded-full px-2 py-0.5 text-[9px] text-slate-200">
              <ChevronLeft class="w-3 h-3 text-slate-400" />
              <span class="font-mono mx-1">16-07-2026</span>
              <ChevronRight class="w-3 h-3 text-slate-400" />
            </div>
            <Bell class="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* Connected Intelligence Card */}
        <div class="bg-gradient-to-b from-[#141A33]/90 to-[#0A0E22]/95 border border-purple-500/30 rounded-2xl p-3 shadow-xl backdrop-blur-md relative">
          <div class="flex items-center justify-between text-[8.5px] uppercase font-semibold tracking-wider text-purple-300 mb-1">
            <span>CONNECTED INTELLIGENCE</span>
            {/* Glowing 3D Pearl Orb */}
            <div class="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-400 to-purple-200 shadow-md shadow-purple-500/50 animate-pulse"></div>
          </div>

          <h3 class="text-base font-bold text-white mb-2 tracking-tight">
            Aggressive goal pace
          </h3>

          <p class="text-[9.5px] text-slate-300 leading-relaxed font-light mb-3">
            This fat-loss target is aggressive, but the remaining gap may still be reachable if recent adherence tightens up. Yesterday logged 2,505 kcal against a 2,175 kcal target, about 330 kcal over. Today should be a controlled reset, not a punishment.
          </p>

          {/* Evidence Checkmark Pills */}
          <div class="flex flex-wrap gap-1.5 mb-3">
            {[
              "Yesterday's fuel",
              "Sleep connection",
              "Calorie overage",
              "Yesterday's protein",
              "8:44 PM heavy meal",
            ].map((pill) => (
              <span
                key={pill}
                class="inline-flex items-center gap-1.5 bg-[#080C1E] text-slate-200 text-[8.5px] px-2.5 py-1 rounded-full border border-purple-500/30"
              >
                <CheckCircle2 class="w-3 h-3 text-amber-400 shrink-0" />
                {pill}
              </span>
            ))}
          </div>

          {/* Recommendation Banner */}
          <div class="bg-[#090D24] border border-purple-500/30 rounded-xl p-2 px-2.5 mb-3">
            <div class="flex items-start gap-1.5">
              <Sparkles class="w-3.5 h-3.5 text-purple-300 shrink-0 mt-0.5" />
              <p class="text-[9px] text-purple-200 leading-relaxed">
                <span class="font-bold text-white">Try Use the remaining window well:</span> stay close to the calorie target, hit protein, and keep movement consistent.
              </p>
            </div>
          </div>

          {/* Ask Button */}
          <button class="w-full py-2 bg-[#090D22] hover:bg-purple-950 text-white border border-purple-500/40 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-2 shadow-md">
            <MessageSquare class="w-3.5 h-3.5 text-purple-300" /> Ask Aurora
          </button>
        </div>

        {/* Time Filters */}
        <div class="flex items-center justify-between text-[8.5px] text-slate-400 px-1 pt-1">
          {['1W', '1M', '3M', '6M', '1Y'].map((t) => (
            <span
              key={t}
              class={`px-2.5 py-0.5 rounded-full ${
                t === '1M'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold'
                  : 'hover:text-slate-200'
              }`}
            >
              {t}
            </span>
          ))}
          <span class="text-[8px] text-slate-500 font-mono">29/120d</span>
        </div>
      </div>

      {/* Bottom Floating Nav */}
      <div class="relative z-10 bg-[#090D1F]/95 border border-slate-800/90 rounded-2xl p-1.5 px-3 flex items-center justify-between text-[9px] mt-2">
        <div class="flex items-center gap-4 text-slate-400">
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <AppleIcon />
            Today
          </span>
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <Heart class="w-3 h-3" />
            Health
          </span>
          <span class="flex flex-col items-center gap-0.5 text-white font-bold">
            <Activity class="w-3 h-3 text-purple-400" />
            Insights
            <span class="w-3 h-0.5 bg-purple-400 rounded-full"></span>
          </span>
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <Moon class="w-3 h-3" />
            Reset
          </span>
        </div>

        <div class="text-right text-[8px]">
          <span class="text-teal-400 font-bold">Ready 5 </span>
          <span class="text-white font-mono font-bold">29/30</span>
        </div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 0.6-2.65 1.35-.58.67-1.09 1.74-.95 2.78 1.01.08 2.06-.53 2.68-1.28z" />
    </svg>
  );
}
