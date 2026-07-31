import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function PhoneMockup({ children, time = '11:42', battery = '100%' }) {
  return (
    <div class="relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[620px] select-none group transition-transform duration-500 hover:scale-[1.01]">
      {/* Outer Glow Halo */}
      <div class="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-cyan-500/20 to-teal-400/20 rounded-[52px] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      {/* Phone Case Frame */}
      <div class="relative w-full h-full bg-[#161B2E] p-2.5 rounded-[46px] shadow-2xl shadow-black border border-slate-700/80 flex flex-col justify-between overflow-hidden">
        {/* Left Side Volume Buttons */}
        <div class="absolute -left-[5px] top-24 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>
        <div class="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>

        {/* Right Side Power Button */}
        <div class="absolute -right-[5px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md"></div>

        {/* Inner Screen Container */}
        <div class="relative w-full h-full bg-[#080B18] rounded-[38px] overflow-hidden border border-slate-800 flex flex-col justify-between">
          
          {/* Status Bar */}
          <div class="bg-black/90 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-mono tracking-tighter shrink-0 z-30">
            <span class="font-medium text-slate-200">{time}</span>

            {/* Top Punch Hole Camera & Speaker */}
            <div class="flex items-center gap-1.5">
              <div class="w-10 h-1 bg-slate-800 rounded-full"></div>
              <div class="w-2.5 h-2.5 bg-black border border-slate-800 rounded-full flex items-center justify-center">
                <div class="w-1 h-1 bg-indigo-900 rounded-full"></div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 text-slate-300">
              <Signal class="w-3 h-3" />
              <Wifi class="w-3 h-3" />
              <span class="text-[9px] font-semibold text-teal-400">{battery}</span>
              <Battery class="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Main Phone Content Screen */}
          <div class="flex-1 overflow-hidden relative">
            {children}
          </div>

          {/* Android Navigation Bar */}
          <div class="bg-black/95 py-1.5 px-8 flex items-center justify-between text-slate-500 shrink-0 z-30 border-t border-slate-900">
            <button class="hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <button class="hover:text-white transition-colors">
              <div class="w-3 h-3 rounded-full border-2 border-current"></div>
            </button>
            <button class="hover:text-white transition-colors">
              <div class="w-3 h-3 border-2 border-current rounded-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
