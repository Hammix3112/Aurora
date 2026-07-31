import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Moon, Heart, Footprints } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import TodayCalorieScreen from './PhoneScreens/TodayCalorieScreen';

export default function DailyReadSection() {
  return (
    <section class="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden">
      {/* Decorative Natural Plant Leaf Graphic Top Right */}
      <div class="absolute right-0 top-0 w-64 h-64 pointer-events-none opacity-30">
        <svg class="w-full h-full text-emerald-800" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C70 30 90 40 100 70 C80 90 50 100 20 80 C10 60 30 20 50 0 Z" opacity="0.4" />
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-4 space-y-6"
        >
          {/* Eyebrow */}
          <p class="text-xs font-semibold tracking-[0.2em] text-purple-700 uppercase font-grotesk">
            ONE DAILY READ
          </p>

          {/* Main Headline */}
          <h2 class="text-4xl sm:text-6xl font-serif leading-[1.1] text-slate-900 tracking-tight">
            Start with<br />
            what matters<br />
            today<span class="text-purple-600 font-sans">.</span>
          </h2>

          {/* Subtitle */}
          <p class="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Your meals, sleep, recovery, movement and goals become one daily plan.
          </p>
        </motion.div>

        {/* Center Column - 4 Connected Signal Nodes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          class="lg:col-span-4 space-y-6 select-none relative"
        >
          {/* Signal 1: BREAKFAST */}
          <div class="flex items-center justify-between bg-white/60 backdrop-blur-sm p-2.5 px-3 rounded-2xl border border-purple-200/60 shadow-sm relative group">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-600 shrink-0">
                <Utensils class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-500 font-grotesk block">
                  BREAKFAST
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-slate-900 font-mono">08:41</span>
                  <span class="text-xs text-purple-700 font-medium">690 kcal</span>
                </div>
              </div>
            </div>

            {/* Oatmeal Thumbnail Image */}
            <div class="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-amber-200 shrink-0 bg-amber-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=200&q=80"
                alt="Breakfast Oatmeal Bowl"
                class="w-full h-full object-cover"
              />
            </div>

            {/* Connection Line to Phone */}
            <svg class="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,20 Q40,20 80,0" fill="none" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="3 3" />
            </svg>
          </div>

          {/* Signal 2: SLEEP */}
          <div class="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-purple-200/60 shadow-sm relative space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-600 shrink-0">
                <Moon class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-500 font-grotesk block">
                  SLEEP
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-slate-900 font-mono">23:42 — 07:15</span>
                  <span class="text-xs text-purple-700 font-medium">7h 33m</span>
                </div>
              </div>
            </div>

            {/* Purple/Cyan Waveform Graph */}
            <div class="flex items-end gap-1 h-6 pt-1 pl-12">
              {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85, 45, 75, 55, 95, 35].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  class={`w-1 rounded-t-sm ${i % 2 === 0 ? 'bg-purple-500' : 'bg-cyan-400'}`}
                ></div>
              ))}
            </div>

            {/* Connection Line to Phone */}
            <svg class="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,20 Q40,20 80,10" fill="none" stroke="#818CF8" stroke-width="1.5" />
            </svg>
          </div>

          {/* Signal 3: RECOVERY */}
          <div class="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-teal-200/60 shadow-sm relative space-y-1">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 shrink-0">
                <Heart class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-500 font-grotesk block">
                  RECOVERY
                </span>
                <span class="text-sm font-bold text-teal-600 font-grotesk">81% Good</span>
              </div>
            </div>

            {/* Teal Wave Line */}
            <div class="h-6 pl-12">
              <svg class="w-full h-full" viewBox="0 0 150 20" fill="none">
                <path d="M0,15 Q30,5 60,12 T120,3 T150,10" stroke="#2DD4BF" stroke-width="2" fill="none" />
              </svg>
            </div>

            {/* Connection Line to Phone */}
            <svg class="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,20 Q40,20 80,20" fill="none" stroke="#2DD4BF" stroke-width="1.5" />
            </svg>
          </div>

          {/* Signal 4: WORKOUT */}
          <div class="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-cyan-200/60 shadow-sm relative space-y-1">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-600 shrink-0">
                <Footprints class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-500 font-grotesk block">
                  WORKOUT
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-slate-900 font-mono">18:02</span>
                  <span class="text-xs text-cyan-700 font-medium">Strength</span>
                </div>
              </div>
            </div>

            {/* Cyan Pulse Line Graph with Dots */}
            <div class="h-6 pl-12">
              <svg class="w-full h-full" viewBox="0 0 150 20" fill="none">
                <path d="M0,18 L30,12 L60,16 L90,4 L120,14 L150,8" stroke="#38BDF8" stroke-width="2" fill="none" />
                <circle cx="30" cy="12" r="2.5" fill="#38BDF8" />
                <circle cx="90" cy="4" r="2.5" fill="#C084FC" />
                <circle cx="150" cy="8" r="2.5" fill="#38BDF8" />
              </svg>
            </div>

            {/* Connection Line to Phone */}
            <svg class="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,20 Q40,20 80,30" fill="none" stroke="#38BDF8" stroke-width="1.5" />
            </svg>
          </div>
        </motion.div>

        {/* Right Column - Phone Mockup displaying TodayCalorieScreen */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-4 flex justify-center lg:justify-end"
        >
          <PhoneMockup time="02:14" battery="76%">
            <TodayCalorieScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition to Dark Section */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-16 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C350,110 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
