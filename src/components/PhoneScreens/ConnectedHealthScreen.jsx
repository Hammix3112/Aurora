import React from 'react';
import { Bell, ChevronLeft, ChevronRight, Moon, Heart, Activity, Footprints, Flame, ChevronDown } from 'lucide-react';

export default function ConnectedHealthScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#070A18] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Faint Starfield */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/25 via-[#070A18] to-[#04060E] pointer-events-none"></div>

      {/* Top Header Bar */}
      <div class="relative z-10 space-y-2">
        <div class="flex items-center justify-between text-[10px] text-slate-300 border-b border-slate-800/80 pb-1.5">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-500 to-indigo-600 p-[1px] shadow-sm">
              <div class="w-full h-full rounded-full bg-[#070A18] flex items-center justify-center text-[8px] font-bold text-white">
                A
              </div>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-white tracking-tight">Health</span>
                <span class="w-2.5 h-2.5 rounded-full border border-teal-400 border-t-transparent animate-spin inline-block"></span>
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

        {/* Evidence Card */}
        <div class="bg-gradient-to-b from-[#0F152A]/90 to-[#0A0E1E]/95 border border-cyan-500/25 rounded-2xl p-2.5 shadow-xl backdrop-blur-md">
          <div class="flex items-center justify-between text-[8.5px] font-semibold uppercase tracking-wider mb-1">
            <span class="text-cyan-300">METRIC SOURCES</span>
            <span class="flex items-center gap-1 bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              LIVE SOURCES
            </span>
          </div>

          <h3 class="text-sm font-bold text-white mb-2.5">
            Evidence is connected
          </h3>

          {/* 3 Rings */}
          <div class="grid grid-cols-3 gap-1.5 mb-2 text-center">
            {/* Sleep */}
            <div class="bg-[#0A0E22] border border-purple-500/30 rounded-xl p-1.5 flex flex-col items-center">
              <div class="relative w-12 h-12 flex items-center justify-center mb-1">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3.5" class="text-slate-900" fill="transparent" />
                  <circle cx="24" cy="24" r="19" stroke="#C084FC" stroke-width="3.5" stroke-dasharray="120" stroke-dashoffset="11" stroke-linecap="round" fill="transparent" />
                </svg>
                <span class="absolute text-xs font-bold text-white">91<span class="text-[8px] font-normal">%</span></span>
              </div>
              <p class="text-[9px] font-bold text-slate-200">Sleep</p>
              <p class="text-[7.5px] text-teal-400 font-medium">On track</p>
            </div>

            {/* Recovery */}
            <div class="bg-[#0A0E22] border border-indigo-500/30 rounded-xl p-1.5 flex flex-col items-center">
              <div class="relative w-12 h-12 flex items-center justify-center mb-1">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3.5" class="text-slate-900" fill="transparent" />
                  <circle cx="24" cy="24" r="19" stroke="#818CF8" stroke-width="3.5" stroke-dasharray="120" stroke-dashoffset="17" stroke-linecap="round" fill="transparent" />
                </svg>
                <span class="absolute text-xs font-bold text-white">86<span class="text-[8px] font-normal">%</span></span>
              </div>
              <p class="text-[9px] font-bold text-slate-200">Recovery</p>
              <p class="text-[7.5px] text-teal-400 font-medium">Recovered</p>
            </div>

            {/* Movement */}
            <div class="bg-[#0A0E22] border border-cyan-500/30 rounded-xl p-1.5 flex flex-col items-center">
              <div class="relative w-12 h-12 flex items-center justify-center mb-1">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="3.5" class="text-slate-900" fill="transparent" />
                  <circle cx="24" cy="24" r="19" stroke="#38BDF8" stroke-width="3.5" stroke-dasharray="120" stroke-dashoffset="13" stroke-linecap="round" fill="transparent" />
                </svg>
                <span class="absolute text-xs font-bold text-white">89<span class="text-[8px] font-normal">%</span></span>
              </div>
              <p class="text-[9px] font-bold text-slate-200">Movement</p>
              <p class="text-[7.5px] text-teal-400 font-medium">On pace</p>
            </div>
          </div>

          <div class="flex items-center justify-between text-[7.5px] text-slate-400 bg-[#080C1B] p-1 px-2 rounded-lg mb-2">
            <span>Steps from Health Connect | Recovery from WHOOP | tap to see each source</span>
            <ChevronDown class="w-2.5 h-2.5" />
          </div>

          {/* Metric Stats row */}
          <div class="grid grid-cols-3 gap-1 text-[8px]">
            <div class="bg-[#080C1B] p-1.5 rounded-xl border border-slate-800">
              <span class="text-[7px] text-slate-400 block uppercase">🌙 SLEEP</span>
              <span class="font-bold text-white text-[9.5px]">6h 41m</span>
            </div>
            <div class="bg-[#080C1B] p-1.5 rounded-xl border border-slate-800">
              <span class="text-[7px] text-slate-400 block uppercase">👣 STEPS</span>
              <span class="font-bold text-white text-[9.5px]">6,979</span>
            </div>
            <div class="bg-[#080C1B] p-1.5 rounded-xl border border-slate-800">
              <span class="text-[7px] text-slate-400 block uppercase">🔥 CALORIES</span>
              <span class="font-bold text-white text-[9.5px]">1,912 kcal</span>
            </div>
          </div>
        </div>

        {/* Physiological Metrics */}
        <div class="space-y-1.5 mt-2">
          <div class="flex items-center justify-between text-[8px] uppercase tracking-wider font-semibold text-slate-400 px-0.5">
            <span class="flex items-center gap-1 text-slate-300">
              <Activity class="w-3 h-3 text-purple-400" /> Physiological metrics
            </span>
            <span class="text-cyan-400">LIVE RANGES</span>
          </div>

          {/* HRV */}
          <div class="bg-[#0B1024] border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Heart class="w-3.5 h-3.5" />
              </div>
              <div>
                <p class="text-[9.5px] font-bold text-white">HRV</p>
                <p class="text-[7.5px] text-slate-400">In range; usual 39 ms</p>
              </div>
            </div>
            <span class="text-xs font-bold text-teal-400 font-mono">47 ms</span>
          </div>

          {/* Resting HR */}
          <div class="bg-[#0B1024] border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Activity class="w-3.5 h-3.5" />
              </div>
              <div>
                <p class="text-[9.5px] font-bold text-white">Resting HR</p>
                <p class="text-[7.5px] text-slate-400">In range; usual 59 bpm</p>
              </div>
            </div>
            <span class="text-xs font-bold text-teal-400 font-mono">57 bpm</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div class="relative z-10 bg-[#090D1F]/95 border border-slate-800/90 rounded-2xl p-1.5 px-3 flex items-center justify-between text-[9px] mt-2">
        <div class="flex items-center gap-4 text-slate-400">
          <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <AppleIcon />
            Today
          </span>
          <span class="flex flex-col items-center gap-0.5 text-white font-bold">
            <Heart class="w-3 h-3 text-teal-400" />
            Health
            <span class="w-3 h-0.5 bg-teal-400 rounded-full"></span>
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

        {/* Glowing Purple Pearl Orb */}
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
