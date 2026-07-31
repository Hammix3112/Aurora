import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import WorkoutDetailScreen from './PhoneScreens/WorkoutDetailScreen';
import ParticleCanvas from './ParticleCanvas';

export default function WorkoutIntelligenceSection() {
  return (
    <section class="relative w-full bg-[#04060E] text-white py-28 overflow-hidden min-h-[750px] flex flex-col justify-center">
      {/* Background Energetic Cyan/Purple Canvas */}
      <ParticleCanvas variant="health" />

      {/* Radiant Cosmic Glowing Orbs */}
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* Left Column Content & Bottom Left ECG Heartbeat Graph */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-5 space-y-8"
        >
          <div class="space-y-4">
            {/* Eyebrow */}
            <p class="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase font-grotesk">
              WORKOUT INTELLIGENCE
            </p>

            {/* Main Headline */}
            <h2 class="text-4xl sm:text-6xl font-serif leading-[1.08] text-white tracking-tight">
              See the workout.<br />
              Understand<br />
              the context<span class="text-purple-400 font-sans">.</span>
            </h2>

            {/* Subtitle */}
            <p class="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-sm">
              Training detail, recovery and nutrition in one connected view.
            </p>
          </div>

          {/* Bottom Left Heartbeat Line Graph Overlay matching Image 1 */}
          <div class="pt-4 space-y-2 select-none">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <div>
                <span class="text-[9px] uppercase tracking-widest font-semibold text-purple-300 font-grotesk block">
                  WORKOUT
                </span>
                <span class="text-lg font-bold text-white font-mono">45:12</span>
                <span class="text-xs text-slate-400 ml-2">Run · Intervals</span>
              </div>
            </div>

            {/* ECG Heartbeat Line Wave */}
            <div class="w-full h-12 pt-1">
              <svg class="w-full h-full" viewBox="0 0 300 40" fill="none">
                <path
                  d="M0,25 L40,25 L50,10 L60,35 L70,5 L80,30 L90,20 L130,20 L140,5 L150,38 L160,15 L200,25 L300,25"
                  stroke="url(#ecgGradient)"
                  stroke-width="2.5"
                  fill="none"
                />
                <circle cx="70" cy="5" r="3.5" fill="#C084FC" class="animate-ping" />
                <circle cx="150" cy="38" r="3.5" fill="#38BDF8" />
                <defs>
                  <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#C084FC" />
                    <stop offset="50%" stop-color="#818CF8" />
                    <stop offset="100%" stop-color="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Center Column - Floating Callout Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          class="lg:col-span-3 space-y-12 select-none relative"
        >
          {/* Top Card: Hardest interval aligns... */}
          <div class="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 shadow-xl relative group">
            <div class="flex items-start gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                <Dumbbell class="w-3.5 h-3.5" />
              </div>
              <p class="text-[9.5px] text-slate-300 leading-relaxed font-light">
                Your hardest interval aligns with a spike in heart rate and a dip in recovery score this evening.
              </p>
            </div>

            {/* Line to Phone */}
            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,0" fill="none" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="3 3" />
            </svg>
          </div>

          {/* Bottom Card: Hardest interval 24:31 */}
          <div class="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 rounded-xl p-2 px-3 shadow-xl inline-block relative">
            <span class="text-[8.5px] uppercase tracking-wider font-semibold text-slate-400 font-grotesk block">
              Hardest interval
            </span>
            <span class="text-sm font-bold text-purple-300 font-mono">24:31</span>

            {/* Line to Phone */}
            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,20" fill="none" stroke="#38BDF8" stroke-width="1.5" />
            </svg>
          </div>
        </motion.div>

        {/* Right Column - Phone Mockup displaying WorkoutDetailScreen */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-4 flex justify-center lg:justify-end"
        >
          <PhoneMockup time="03:07" battery="77%">
            <WorkoutDetailScreen />
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
