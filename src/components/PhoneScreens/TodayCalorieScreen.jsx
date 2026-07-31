import React from 'react';
import { Bell, ChevronLeft, ChevronRight, Mic, Heart, Activity, RefreshCw, ChevronRight as ChevronRightIcon } from 'lucide-react';

export default function TodayCalorieScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#070A18] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Faint Starfield */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#070A18] to-[#04060E] pointer-events-none"></div>
      
      {/* Scattered Star Particles */}
      <div class="absolute top-12 left-6 w-1 h-1 bg-white/40 rounded-full"></div>
      <div class="absolute top-24 right-10 w-1 h-1 bg-white/50 rounded-full"></div>
      <div class="absolute top-48 left-10 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
      <div class="absolute bottom-36 right-8 w-1 h-1 bg-purple-300/40 rounded-full"></div>

      {/* Top Header */}
      <div class="relative z-10">
        <div class="flex items-center justify-between text-[10px] text-slate-300 border-b border-slate-800/60 pb-1.5 mb-2">
          {/* Left Avatar & Title */}
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-400 via-purple-500 to-indigo-600 p-[1px] shadow-sm">
              <div class="w-full h-full rounded-full bg-[#070A18] flex items-center justify-center text-[8px] font-bold text-white">
                A
              </div>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-white tracking-tight">Today</span>
                <span class="w-2.5 h-2.5 rounded-full border border-teal-400 border-t-transparent animate-spin inline-block"></span>
              </div>
              <p class="text-[8px] text-slate-400">Last Synced: 31 min ago</p>
            </div>
          </div>

          {/* Date Picker Pill & Bell */}
          <div class="flex items-center gap-2">
            <div class="flex items-center bg-[#13172E] border border-purple-500/30 rounded-full px-2 py-0.5 text-[9px] text-slate-200">
              <ChevronLeft class="w-3 h-3 text-slate-400" />
              <span class="font-mono mx-1">16-07-2026</span>
              <ChevronRight class="w-3 h-3 text-slate-400" />
            </div>
            <Bell class="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* 20-second Check-in Banner */}
        <div class="bg-[#0F142A]/80 border border-slate-700/50 rounded-xl p-2 px-3 flex items-center justify-between text-[9.5px] text-slate-200 mb-2.5 backdrop-blur-md">
          <div class="flex items-center gap-2">
            <RefreshCw class="w-3 h-3 text-purple-300" />
            <span class="font-medium">20-second check-in</span>
          </div>
          <ChevronRightIcon class="w-3 h-3 text-slate-400" />
        </div>

        {/* Center Calorie Ring Gauge */}
        <div class="flex flex-col items-center justify-center my-1 relative">
          <div class="relative w-40 h-40 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="64" stroke="currentColor" stroke-width="9" class="text-slate-900/80" fill="transparent" />
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke="url(#screenRingGradient)"
                stroke-width="9"
                stroke-dasharray="402"
                stroke-dashoffset="70"
                stroke-linecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="screenRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#C084FC" />
                  <stop offset="60%" stop-color="#A855F7" />
                  <stop offset="100%" stop-color="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Ring Text */}
            <div class="absolute flex flex-col items-center justify-center text-center">
              <span class="text-4xl font-bold font-mono text-white tracking-tight">344</span>
              <span class="text-[9px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">KCAL LEFT</span>
            </div>
          </div>

          <p class="text-[9px] text-slate-300/80 text-center max-w-[220px] leading-snug mt-1 font-light">
            2175 kcal is a controlled target while your goal is reviewed.
          </p>
        </div>

        {/* MACROS TODAY Section */}
        <div class="mt-2 space-y-2">
          <div class="flex items-center justify-between text-[9px] font-semibold tracking-wider text-purple-300">
            <span>MACROS TODAY</span>
            <span class="font-mono text-slate-300 font-normal">1,831 / 2,175 kcal</span>
          </div>

          {/* Protein Bar */}
          <div class="space-y-1">
            <div class="flex justify-between text-[8.5px]">
              <span class="flex items-center gap-1.5 text-slate-200 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span> PROTEIN
              </span>
              <span class="text-white font-mono font-bold">122 <span class="text-slate-400 font-normal">/ 128g</span></span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5 rounded-full w-[95%]"></div>
            </div>
          </div>

          {/* Carbs Bar */}
          <div class="space-y-1">
            <div class="flex justify-between text-[8.5px]">
              <span class="flex items-center gap-1.5 text-slate-200 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> CARBS
              </span>
              <span class="text-white font-mono font-bold">174 <span class="text-slate-400 font-normal">/ 245g</span></span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-cyan-400 to-teal-300 h-1.5 rounded-full w-[71%]"></div>
            </div>
          </div>

          {/* Fat Bar */}
          <div class="space-y-1">
            <div class="flex justify-between text-[8.5px]">
              <span class="flex items-center gap-1.5 text-slate-200 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-200"></span> FAT
              </span>
              <span class="text-white font-mono font-bold">70 <span class="text-slate-400 font-normal">/ 76g</span></span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div class="bg-purple-300 h-1.5 rounded-full w-[92%]"></div>
            </div>
          </div>
        </div>

        {/* Goal Review Banner */}
        <div class="mt-2.5 bg-[#0D1226]/90 border border-slate-800 rounded-2xl p-2 px-2.5 backdrop-blur-md">
          <div class="flex items-center justify-between text-[8.5px] mb-1">
            <span class="font-bold text-white">Goal review: balanced fuel</span>
            <span class="font-mono text-cyan-300 font-semibold">P24% C45% F31%</span>
          </div>
          <p class="text-[7.5px] text-slate-400 leading-tight truncate">
            The measurable body or weight target needs... review, so Aurora holds a controlled calorie...
          </p>
        </div>
      </div>

      {/* Bottom Floating Menu & Input */}
      <div class="relative z-10 space-y-1.5 mt-2">
        <div class="bg-[#090D1F]/95 border border-slate-800/90 rounded-2xl p-1.5 px-3 flex items-center justify-between text-[9px]">
          <div class="flex items-center gap-4 text-slate-400">
            <span class="flex flex-col items-center gap-0.5 text-white font-bold">
              <AppleIcon />
              Today
              <span class="w-3 h-0.5 bg-white rounded-full"></span>
            </span>
            <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
              <Heart class="w-3 h-3" />
              Health
            </span>
            <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
              <Activity class="w-3 h-3" />
              Insights
            </span>
            <span class="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
              <LotusIcon />
              Reset
            </span>
          </div>

          {/* Glowing Purple Pearl Orb */}
          <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-400 to-purple-200 shadow-md shadow-purple-500/60 animate-pulse"></div>
        </div>

        {/* Voice Input Pill */}
        <div class="bg-[#050714] border border-slate-800/80 rounded-full py-1 px-3 flex items-center gap-2 text-[9px] text-slate-400">
          <div class="w-3.5 h-3.5 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center">
            <Mic class="w-2.5 h-2.5" />
          </div>
          <span>Log by voice...</span>
        </div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 0.6-2.65 1.35-.58.67-1.09 1.74-.95 2.78 1.01.08 2.06-.53 2.68-1.28z" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg class="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="1.8">
      <path d="M12 4c-2 4-6 6-6 10 0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-4-6-6-10z" />
      <path d="M12 10c-1.5 2.5-4 4-4 6.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.5-2.5-4-4-6.5z" />
    </svg>
  );
}
