import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import ResetStudioScreen from './PhoneScreens/ResetStudioScreen';
import ResetPortalCanvas from './ResetPortalCanvas';

export default function ResetStudioSection() {
  const [activeTab, setActiveTab] = useState('Unwind');

  const modes = [
    { name: 'Unwind', icon: WavesSvg, activeColor: 'text-purple-400', activeBorder: 'border-purple-400/80 bg-purple-950/60' },
    { name: 'Sleep', icon: MoonSvg, activeColor: 'text-indigo-400', activeBorder: 'border-indigo-400/80 bg-indigo-950/60' },
    { name: 'Focus', icon: FocusSvg, activeColor: 'text-cyan-400', activeBorder: 'border-cyan-400/80 bg-cyan-950/60' },
  ];

  return (
    <section class="relative w-full bg-[#04060E] text-white py-28 overflow-hidden min-h-[750px] flex flex-col justify-center">
      {/* Organic Concentric Portal Wave Canvas */}
      <ResetPortalCanvas activeTab={activeTab} />

      {/* Radiant Glowing Purple Nebula Ambient Light */}
      <div class="absolute right-1/4 top-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/10 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-6 space-y-6"
        >
          {/* Eyebrow */}
          <p class="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase font-grotesk">
            RESET STUDIO
          </p>

          {/* Main Headline */}
          <h2 class="text-4xl sm:text-6xl xl:text-7xl font-serif leading-[1.1] text-white tracking-tight">
            A calmer<br />
            moment, in<br />
            context<span class="text-purple-400 font-sans">.</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p class="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Breathwork for stress, sleep and focus — guided by where you are today.
          </p>

          {/* Mode Selection Row (Unwind | Sleep | Focus) matching Image 3 */}
          <div class="flex items-center gap-8 pt-8">
            {modes.map((mode, idx) => {
              const IconComp = mode.icon;
              const isSelected = activeTab === mode.name;
              return (
                <React.Fragment key={mode.name}>
                  {idx > 0 && <div class="w-[1px] h-10 bg-slate-800/80"></div>}
                  <button
                    onClick={() => setActiveTab(mode.name)}
                    class="flex flex-col items-center gap-3 group transition-all"
                  >
                    <div
                      class={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? `${mode.activeBorder} shadow-lg shadow-purple-500/30 scale-105`
                          : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <IconComp isSelected={isSelected} />
                    </div>
                    <span
                      class={`text-xs font-grotesk transition-colors ${
                        isSelected ? `${mode.activeColor} font-semibold` : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {mode.name}
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <PhoneMockup time="16:00" battery="92%">
            <ResetStudioScreen activeTab={activeTab} />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition to Parchment Background */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-16 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 C350,120 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}

/* SVG Icon Components matching Image 3 */
function WavesSvg({ isSelected }) {
  return (
    <svg class={`w-6 h-6 ${isSelected ? 'text-purple-300' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" />
      <path d="M2 16c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" />
    </svg>
  );
}

function MoonSvg({ isSelected }) {
  return (
    <svg class={`w-5 h-5 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function FocusSvg({ isSelected }) {
  return (
    <svg class={`w-5 h-5 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
