import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Heart, Activity, Dumbbell, Zap } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import ConnectedHealthScreen from './PhoneScreens/ConnectedHealthScreen';
import ParticleCanvas from './ParticleCanvas';

export default function ConnectedHealthSection() {
  const [activeSignal, setActiveSignal] = useState('Sleep');

  const signals = [
    { name: 'Sleep', icon: Moon, color: 'text-purple-400', border: 'border-purple-500/40' },
    { name: 'Recovery', icon: Heart, color: 'text-teal-400', border: 'border-teal-500/40' },
    { name: 'Movement', icon: RunningIcon, color: 'text-cyan-400', border: 'border-cyan-500/40' },
    { name: 'HRV', icon: Activity, color: 'text-indigo-400', border: 'border-indigo-500/40' },
    { name: 'Workouts', icon: Dumbbell, color: 'text-pink-400', border: 'border-pink-500/40' },
  ];

  return (
    <section class="relative w-full bg-[#060814] text-white py-24 overflow-hidden">
      {/* Background Energetic Cyan/Purple Canvas */}
      <ParticleCanvas variant="health" />

      {/* Vibrant Cyan Particle Wave Vector Graphic Right */}
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Content & Signal Node Stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-6 space-y-8"
        >
          <div class="space-y-4">
            <p class="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase font-grotesk">
              CONNECTED HEALTH
            </p>

            <h2 class="text-4xl sm:text-6xl font-serif leading-tight">
              Your wearable<br />
              collects signals.<br />
              Aurora connects<br />
              the story<span class="text-purple-400">.</span>
            </h2>

            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-light">
              Sleep, recovery, heart rate, movement and workouts come together with your food and goals.
            </p>
          </div>

          {/* Interactive Signal Icon Stack matching Image 5 */}
          <div class="flex items-center gap-4 relative pt-2">
            <div class="flex flex-row lg:flex-col gap-3">
              {signals.map((sig) => {
                const IconComp = sig.icon;
                const isSelected = activeSignal === sig.name;
                return (
                  <button
                    key={sig.name}
                    onClick={() => setActiveSignal(sig.name)}
                    class={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? `bg-slate-900 ${sig.border} ${sig.color} scale-110 shadow-lg shadow-cyan-500/20`
                        : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title={sig.name}
                  >
                    <IconComp class="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <p class="text-xs text-slate-400 font-mono hidden lg:block">
              Connected via <span class="text-cyan-300 font-semibold">{activeSignal}</span> live telemetry
            </p>
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
          <PhoneMockup time="02:22" battery="77%">
            <ConnectedHealthScreen />
          </PhoneMockup>
        </motion.div>
      </div>
    </section>
  );
}

function RunningIcon(props) {
  return (
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7.1 1.4z"/>
    </svg>
  );
}
