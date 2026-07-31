import React from 'react';
import { ChevronLeft, Edit2, Calendar, Heart, Activity, Moon } from 'lucide-react';

export default function WorkoutDetailScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#070918] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Deep Space Starfield */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#070918] to-[#04060E] pointer-events-none"></div>

      {/* Top Header */}
      <div class="relative z-10 space-y-2">
        <div class="flex items-center gap-1.5 text-purple-300 text-[11px] font-medium pt-0.5">
          <ChevronLeft class="w-3.5 h-3.5" />
          <span>Back to Movement</span>
        </div>

        {/* Activity Summary Card */}
        <div class="bg-[#10142B]/90 border border-purple-500/30 rounded-2xl p-2.5 px-3 flex items-center justify-between shadow-lg">
          <div>
            <h3 class="text-base font-bold text-white tracking-tight">Tennis</h3>
            <p class="text-[9.5px] text-slate-400 font-mono">10:28 PM – 11:11 PM</p>
          </div>
          <button class="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
            <Edit2 class="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Training Zones Main Container */}
        <div class="bg-[#0D1126]/95 border border-purple-500/25 rounded-2xl p-3 shadow-xl space-y-2.5">
          {/* Header Row */}
          <div class="flex items-center justify-between text-[10px]">
            <div class="flex items-center gap-1.5 font-bold text-white">
              <Calendar class="w-3.5 h-3.5 text-purple-400" />
              <span>Training Zones</span>
            </div>
            <div class="text-right">
              <span class="text-sm font-bold text-white font-mono">117 bpm</span>
              <span class="text-[7.5px] text-slate-400 block font-normal uppercase">Avg HR</span>
            </div>
          </div>

          {/* Stats Grid (Duration & Max HR) */}
          <div class="grid grid-cols-2 gap-2 text-[9px]">
            <div class="bg-[#080B1B] p-2 rounded-xl border border-slate-800">
              <span class="text-[7.5px] text-slate-400 block uppercase">Duration</span>
              <span class="text-xs font-bold text-white font-mono">44 min</span>
            </div>
            <div class="bg-[#080B1B] p-2 rounded-xl border border-slate-800">
              <span class="text-[7.5px] text-slate-400 block uppercase">Max HR</span>
              <span class="text-xs font-bold text-white font-mono">150 bpm</span>
            </div>
          </div>

          {/* Color Zone Progress Bar */}
          <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden flex">
            <div class="bg-purple-400 h-[10%]"></div>
            <div class="bg-cyan-400 h-[80%]"></div>
            <div class="bg-teal-300 h-[10%]"></div>
          </div>

          {/* Zones List */}
          <div class="space-y-1.5 pt-1 text-[8.5px]">
            {/* Peak */}
            <div class="bg-[#080B1B] p-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between text-slate-400">
              <div>
                <span class="font-bold text-slate-300 block">Peak</span>
                <span class="text-[7.5px]">171+ bpm</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-white">0s</span>
                <span class="text-[7.5px] block">0%</span>
              </div>
            </div>

            {/* Threshold */}
            <div class="bg-[#080B1B] p-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between text-slate-400">
              <div>
                <span class="font-bold text-slate-300 block">Threshold</span>
                <span class="text-[7.5px]">152-171 bpm</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-white">0s</span>
                <span class="text-[7.5px] block">0%</span>
              </div>
            </div>

            {/* Tempo */}
            <div class="bg-[#080B1B] p-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between text-slate-400">
              <div>
                <span class="font-bold text-slate-300 block">Tempo</span>
                <span class="text-[7.5px]">133-152 bpm</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-amber-400">7s</span>
                <span class="text-[7.5px] block">0.3%</span>
              </div>
            </div>

            {/* Aerobic */}
            <div class="bg-[#080B1B] p-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
              <div>
                <span class="font-bold text-white block">Aerobic</span>
                <span class="text-[7.5px] text-slate-400">114-133 bpm</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-cyan-400 font-bold">3m 5s</span>
                <span class="text-[7.5px] text-slate-400 block">7%</span>
              </div>
            </div>

            {/* Easy */}
            <div class="bg-[#080B1B] p-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
              <div>
                <span class="font-bold text-white block">Easy</span>
                <span class="text-[7.5px] text-slate-400">&lt;95 bpm</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-purple-300 font-bold">33m 17s</span>
                <span class="text-[7.5px] text-slate-400 block">75.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Nav */}
      <div class="relative z-10 bg-[#090D1F]/95 border border-slate-800/90 rounded-2xl p-1.5 px-3 flex items-center justify-between text-[9px] mt-2">
        <div class="flex items-center gap-4 text-slate-400">
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <AppleIcon />
            Today
          </span>
          <span class="flex flex-col items-center gap-0.5 text-white font-bold">
            <Heart class="w-3 h-3 text-purple-400" />
            Health
            <span class="w-3 h-0.5 bg-purple-400 rounded-full"></span>
          </span>
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <Activity class="w-3 h-3" />
            Insights
          </span>
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <Moon class="w-3 h-3" />
            Reset
          </span>
        </div>

        {/* Glowing Purple Orb */}
        <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-400 to-purple-200 shadow-md shadow-purple-500/60 animate-pulse"></div>
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
