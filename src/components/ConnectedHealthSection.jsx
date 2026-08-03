import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Heart, Activity, Dumbbell } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import ConnectedHealthScreen from './PhoneScreens/ConnectedHealthScreen';
import ParticleCanvas from './ParticleCanvas';

export default function ConnectedHealthSection() {
  const [activeSignal, setActiveSignal] = useState('Sleep');
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Cinematic Camera Zoom & 3D Phone Rotation
  const cameraScale = useTransform(scrollYProgress, [0.25, 0.5], [1, 1.05]);
  const phoneRotateY = useTransform(scrollYProgress, [0.25, 0.5], [-4, 8]);
  const phoneY = useTransform(scrollYProgress, [0.25, 0.5], [20, -15]);

  const signals = [
    { name: 'Sleep', icon: Moon, color: 'text-purple-400', border: 'border-purple-500/60', shadow: 'shadow-purple-500/30' },
    { name: 'Recovery', icon: Heart, color: 'text-teal-400', border: 'border-teal-500/60', shadow: 'shadow-teal-500/30' },
    { name: 'Movement', icon: RunningIcon, color: 'text-cyan-400', border: 'border-cyan-500/60', shadow: 'shadow-cyan-500/30' },
    { name: 'HRV', icon: Activity, color: 'text-indigo-400', border: 'border-indigo-500/60', shadow: 'shadow-indigo-500/30' },
    { name: 'Workouts', icon: Dumbbell, color: 'text-pink-400', border: 'border-pink-500/60', shadow: 'shadow-pink-500/30' },
  ];

  return (
    <motion.section
      style={{ scale: cameraScale, perspective: '1200px' }}
      class="relative w-full bg-[#060814] text-white py-24 overflow-hidden gpu-accelerated preserve-3d"
    >
      {/* Background Energetic Cyan/Purple Wave Canvas */}
      <div class="absolute inset-0 z-0 pointer-events-none">
        <ParticleCanvas variant="health" />
      </div>

      {/* Futuristic Holographic Lighting & Bloom Halo Right Behind Phone */}
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/25 via-teal-500/20 to-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center preserve-3d">
        
        {/* Left Column Content & Holographic Signal Node Stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          class="lg:col-span-6 space-y-8 preserve-3d"
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

          {/* Interactive Signal Icon Stack with Holographic Glow */}
          <div class="flex items-center gap-4 relative pt-2 preserve-3d">
            <div class="flex flex-row lg:flex-col gap-3">
              {signals.map((sig, idx) => {
                const IconComp = sig.icon;
                const isSelected = activeSignal === sig.name;
                return (
                  <motion.button
                    key={sig.name}
                    animate={{
                      y: [-3, 3, -3],
                    }}
                    transition={{
                      y: { duration: 3.8 + idx * 0.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 },
                    }}
                    onClick={() => setActiveSignal(sig.name)}
                    class={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? `bg-slate-900/90 ${sig.border} ${sig.color} scale-110 shadow-lg ${sig.shadow}`
                        : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                    }`}
                    title={sig.name}
                  >
                    <IconComp class="w-4.5 h-4.5" />
                  </motion.button>
                );
              })}
            </div>

            <div class="space-y-1 hidden lg:block">
              <p class="text-xs text-slate-400 font-mono">
                Connected via <span class="text-cyan-300 font-semibold">{activeSignal}</span> live telemetry
              </p>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                <span class="text-[10px] text-teal-400/90 font-mono uppercase tracking-wider">Holographic Telemetry Active</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Phone Mockup Suspended with Holographic Light Bloom */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-0.8, 0.8, -0.8],
          }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeOut' },
            x: { duration: 0.8, ease: 'easeOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ rotateY: phoneRotateY, y: phoneY }}
          class="lg:col-span-6 flex justify-center lg:justify-end preserve-3d relative"
        >
          {/* Backing Holographic Volumetric Bloom Halo */}
          <div class="absolute -inset-8 bg-gradient-to-tr from-cyan-500/30 via-teal-400/20 to-purple-600/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="02:22" battery="77%">
            <ConnectedHealthScreen />
          </PhoneMockup>
        </motion.div>
      </div>
    </motion.section>
  );
}

function RunningIcon(props) {
  return (
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7.1 1.4z"/>
    </svg>
  );
}
