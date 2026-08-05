import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

export default function PhoneMockup({ children, time = '11:42', battery = '100%' }) {
  // Cursor tilt restricted to a max of 6 degrees for subtle, physically believable response
  const { tiltStyle, handleMouseMove, handleMouseLeave } = use3DTilt(6, 1.015);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[620px] select-none group gpu-accelerated preserve-3d"
      style={{ perspective: '1200px' }}
    >
      {/* Outer Volumetric Aurora Rim Light Halo */}
      <div className="absolute -inset-5 bg-gradient-to-tr from-purple-600/30 via-cyan-400/25 to-teal-300/20 rounded-[56px] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Realistic Soft Contact Drop Shadow Beneath Device */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/80 rounded-full blur-xl pointer-events-none transform rotateX(75deg)"></div>

      {/* Phone Case Frame with Dynamic 3D Tilt & Glass Edge Reflections */}
      <div
        className="relative w-full h-full bg-[#161B2E] p-2.5 rounded-[46px] shadow-3d-phone border border-slate-700/80 flex flex-col justify-between overflow-hidden preserve-3d"
        style={tiltStyle}
      >
        {/* Left Side Volume Buttons */}
        <div className="absolute -left-[5px] top-24 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>

        {/* Right Side Power Button */}
        <div className="absolute -right-[5px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md"></div>

        {/* Dynamic Glass Specular Edge Reflection Highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none z-40 rounded-[46px]"></div>
        <div className="absolute inset-[1px] border border-white/10 rounded-[45px] pointer-events-none z-40"></div>

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#080B18] rounded-[38px] overflow-hidden border border-slate-800 flex flex-col justify-between">
          
          {/* Status Bar */}
          <div className="bg-black/90 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-mono tracking-tighter shrink-0 z-30">
            <span className="font-medium text-slate-200">{time}</span>

            {/* Top Punch Hole Camera & Speaker */}
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-black border border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-indigo-900 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3 h-3" aria-hidden="true" />
              <Wifi className="w-3 h-3" aria-hidden="true" />
              <span className="text-[9px] font-semibold text-teal-400">{battery}</span>
              <Battery className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>

          {/* Main Phone Content Screen */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>

          {/* Android Navigation Bar */}
          <div className="bg-black/95 py-1.5 px-8 flex items-center justify-between text-slate-500 shrink-0 z-30 border-t border-slate-900">
            <button type="button" aria-label="Navigate Back" className="hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <button type="button" aria-label="Navigate Home" className="hover:text-white transition-colors">
              <div className="w-3 h-3 rounded-full border-2 border-current"></div>
            </button>
            <button type="button" aria-label="Recent Applications" className="hover:text-white transition-colors">
              <div className="w-3 h-3 border-2 border-current rounded-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
