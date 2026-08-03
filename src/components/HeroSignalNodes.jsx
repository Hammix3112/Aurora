import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Moon, Heart } from 'lucide-react';

export default function HeroSignalNodes() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div class="relative w-full max-w-[280px] space-y-6 select-none preserve-3d">
      {/* Node 1: MEAL LOGGED - Independent 3D Floating Motion */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [-5, 5, -5],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          x: { duration: 0.6, delay: 0.3 },
          y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        class={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 ${
          hoveredIndex === 0 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-1 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-purple-400 transition-all backdrop-blur-md">
          <div class="w-full h-full rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-purple-600 flex items-center justify-center text-white">
            <Utensils class="w-6 h-6" />
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block group-hover:text-purple-300 transition-colors">
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
            stroke-width={hoveredIndex === 0 ? '2.5' : '1.5'}
            stroke-dasharray={hoveredIndex === 0 ? 'none' : '4 4'}
            class={hoveredIndex === 0 ? 'animate-pulse' : ''}
          />
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#C084FC" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 2: SLEEP WINDOW - Independent 3D Floating Motion */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [4, -6, 4],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          x: { duration: 0.6, delay: 0.4 },
          y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
        }}
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
        class={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 ${
          hoveredIndex === 1 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-2 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-indigo-400 transition-all backdrop-blur-md">
          <div class="w-full h-full flex items-end justify-center gap-0.5 pb-1">
            <div class="w-1 h-3 bg-purple-500 rounded-sm"></div>
            <div class="w-1 h-6 bg-purple-400 rounded-sm"></div>
            <div class="w-1 h-4 bg-indigo-400 rounded-sm"></div>
            <div class="w-1 h-7 bg-purple-300 rounded-sm"></div>
            <div class="w-1 h-2 bg-purple-600 rounded-sm"></div>
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block group-hover:text-indigo-300 transition-colors">
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
            stroke-width={hoveredIndex === 1 ? '2.5' : '1.5'}
            class={hoveredIndex === 1 ? 'animate-pulse' : ''}
          />
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#818CF8" />
              <stop offset="100%" stop-color="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 3: RECOVERY - Independent 3D Floating Motion */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [-4, 6, -4],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          x: { duration: 0.6, delay: 0.5 },
          y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
        }}
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
        class={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 ${
          hoveredIndex === 2 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-900/90 border border-teal-500/30 p-1 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-teal-400 transition-all backdrop-blur-md">
          <div class="relative w-10 h-10 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="20" cy="20" r="16" stroke="currentColor" stroke-width="3" class="text-slate-800" fill="transparent" />
              <circle cx="20" cy="20" r="16" stroke="#2DD4BF" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="10" stroke-linecap="round" fill="transparent" />
            </svg>
            <span class="absolute text-[9px] font-bold text-white">90%</span>
          </div>
        </div>

        <div>
          <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block group-hover:text-teal-300 transition-colors">
            RECOVERY
          </span>
          <span class="text-xs text-teal-300 font-medium">On track</span>
        </div>
      </motion.div>

      {/* Node 4: WORKOUT & Line Chart - Independent 3D Floating Motion */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [5, -4, 5],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          x: { duration: 0.6, delay: 0.6 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
        }}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
        class={`space-y-1 relative cursor-pointer transition-all duration-300 ${
          hoveredIndex === 3 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div class="flex items-center gap-3">
          <div>
            <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-400 font-grotesk block group-hover:text-cyan-300 transition-colors">
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
              stroke-width={hoveredIndex === 3 ? '3' : '2'}
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
