import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Moon, Heart, Dumbbell } from 'lucide-react';

export default function HeroSignalNodes() {
  return (
    <div class="relative w-full max-w-[280px] space-y-6 select-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
      {/* Node 1: MEAL LOGGED */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        class="flex items-center gap-3 relative group"
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-1 shadow-xl shadow-purple-950/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md" style={{ transform: 'translateZ(20px)' }}>
          <div class="w-full h-full rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-purple-600 flex items-center justify-center text-white">
            <Utensils class="w-6 h-6" />
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block">
            MEAL LOGGED
          </span>
          <span class="text-base font-bold text-white font-mono">12:41</span>
        </div>

        {/* Curved Connection Path Line */}
        <svg class="absolute left-full top-1/2 w-28 h-12 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block">
          <path
            d="M0,24 Q50,24 100,-10"
            fill="none"
            stroke="url(#lineGradient1)"
            stroke-width="1.5"
            stroke-dasharray="4 4"
            class="animate-pulse"
          />
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#C084FC" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 2: SLEEP WINDOW */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        class="flex items-center gap-3 relative group"
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-2 shadow-xl shadow-purple-950/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md" style={{ transform: 'translateZ(20px)' }}>
          <div class="w-full h-full flex items-end justify-center gap-0.5 pb-1">
            <div class="w-1 h-3 bg-purple-500 rounded-sm"></div>
            <div class="w-1 h-6 bg-purple-400 rounded-sm"></div>
            <div class="w-1 h-4 bg-indigo-400 rounded-sm"></div>
            <div class="w-1 h-7 bg-purple-300 rounded-sm"></div>
            <div class="w-1 h-2 bg-purple-600 rounded-sm"></div>
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block">
            SLEEP WINDOW
          </span>
          <span class="text-base font-bold text-white font-mono">7h 33m</span>
        </div>

        {/* Curved Connection Path Line */}
        <svg class="absolute left-full top-1/2 w-28 h-12 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block">
          <path
            d="M0,24 Q60,24 100,5"
            fill="none"
            stroke="url(#lineGradient2)"
            stroke-width="1.5"
          />
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#818CF8" />
              <stop offset="100%" stop-color="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 3: RECOVERY */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        class="flex items-center gap-3 relative group"
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-teal-500/30 p-1 shadow-xl shadow-purple-950/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md" style={{ transform: 'translateZ(20px)' }}>
          <div class="relative w-10 h-10 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="20" cy="20" r="16" stroke="currentColor" stroke-width="3" class="text-slate-800" fill="transparent" />
              <circle cx="20" cy="20" r="16" stroke="#2DD4BF" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="10" stroke-linecap="round" fill="transparent" />
            </svg>
            <span class="absolute text-[9px] font-bold text-white">90%</span>
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block">
            RECOVERY
          </span>
          <span class="text-xs text-teal-300 font-medium">On track</span>
        </div>
      </motion.div>

      {/* Node 4: WORKOUT & Line Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        class="space-y-1 relative"
      >
        <div class="flex items-center gap-3">
          <div>
            <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block">
              WORKOUT
            </span>
            <div class="flex items-center gap-2">
              <span class="text-base font-bold text-white font-mono">18:02</span>
              <span class="text-xs text-purple-300 font-medium">Strength</span>
            </div>
          </div>
        </div>

        {/* Cyan Line Chart */}
        <div class="w-full h-8 pt-1">
          <svg class="w-full h-full" viewBox="0 0 200 30" fill="none">
            <path
              d="M0,25 Q30,10 60,20 T120,5 T180,18 T200,10"
              stroke="#38BDF8"
              stroke-width="2"
              fill="none"
            />
            <circle cx="60" cy="20" r="3" fill="#38BDF8" />
            <circle cx="120" cy="5" r="3" fill="#C084FC" />
            <circle cx="180" cy="18" r="3" fill="#38BDF8" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
