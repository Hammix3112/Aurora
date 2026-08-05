import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSignalNodes() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-full max-w-[290px] space-y-6 select-none preserve-3d">
      {/* Node 1: MEAL LOGGED */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [-7, 7, -7],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          x: { duration: 0.6, delay: 0.3 },
          y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
        }}
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 preserve-3d ${
          hoveredIndex === 0 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-1 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-purple-400 transition-all backdrop-blur-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"
            alt="Meal Logged Bowl"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block group-hover:text-purple-300 transition-colors">
            MEAL LOGGED
          </span>
          <span className="text-base font-bold text-white font-mono">12:41</span>
        </div>

        {/* Connection Line */}
        <svg className="absolute left-full top-1/2 w-32 h-14 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block" aria-hidden="true">
          <path
            d="M0,28 Q60,28 120,-12"
            fill="none"
            stroke="url(#lineGradient1)"
            strokeWidth={hoveredIndex === 0 ? '2.5' : '1.8'}
            strokeDasharray="6 4"
            className="animate-pulse"
          />
          <circle cx="60" cy="28" r="3" fill="#C084FC" className="animate-ping" />
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 2: SLEEP WINDOW */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: [-5, 5, -5],
          y: [3, -3, 3],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          x: { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
          y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 preserve-3d ${
          hoveredIndex === 1 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-purple-500/30 p-2 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-indigo-400 transition-all backdrop-blur-md">
          <div className="w-full h-full flex items-end justify-center gap-0.5 pb-1">
            <div className="w-1 h-3 bg-purple-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-purple-400 rounded-sm"></div>
            <div className="w-1 h-4 bg-indigo-400 rounded-sm"></div>
            <div className="w-1 h-7 bg-purple-300 rounded-sm"></div>
            <div className="w-1 h-2 bg-purple-600 rounded-sm"></div>
          </div>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block group-hover:text-indigo-300 transition-colors">
            SLEEP WINDOW
          </span>
          <span className="text-base font-bold text-white font-mono">7h 33m</span>
        </div>

        <svg className="absolute left-full top-1/2 w-32 h-14 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block" aria-hidden="true">
          <path
            d="M0,28 Q70,28 120,5"
            fill="none"
            stroke="url(#lineGradient2)"
            strokeWidth={hoveredIndex === 1 ? '2.5' : '1.8'}
          />
          <circle cx="70" cy="28" r="3" fill="#818CF8" className="animate-ping" />
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Node 3: RECOVERY */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: [-3, 3, -3],
          y: [3, -3, 3],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          x: { duration: 7.0, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 7.0, repeat: Infinity, ease: 'easeInOut', delay: 1.75 },
        }}
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`flex items-center gap-3 relative group cursor-pointer transition-all duration-300 preserve-3d ${
          hoveredIndex === 2 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-teal-500/30 p-1 shadow-3d-deep flex items-center justify-center shrink-0 group-hover:border-teal-400 transition-all backdrop-blur-md">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" className="text-slate-800" fill="transparent" />
              <circle cx="20" cy="20" r="16" stroke="#2DD4BF" strokeWidth="3" strokeDasharray="100" strokeDashoffset="10" strokeLinecap="round" fill="transparent" />
            </svg>
            <span className="absolute text-[9px] font-bold text-white">90%</span>
          </div>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block group-hover:text-teal-300 transition-colors">
            RECOVERY
          </span>
          <span className="text-xs text-teal-300 font-medium">On track</span>
        </div>

        <svg className="absolute left-full top-1/2 w-32 h-14 -translate-y-1/2 pointer-events-none overflow-visible hidden sm:block" aria-hidden="true">
          <path
            d="M0,28 Q70,28 120,20"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth={hoveredIndex === 2 ? '2.5' : '1.8'}
          />
          <circle cx="70" cy="28" r="3" fill="#2DD4BF" className="animate-ping" />
        </svg>
      </motion.div>

      {/* Node 4: WORKOUT */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          scale: [0.98, 1.02, 0.98],
          y: [4, -4, 4],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          scale: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`space-y-1 relative cursor-pointer transition-all duration-300 preserve-3d ${
          hoveredIndex === 3 ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block group-hover:text-cyan-300 transition-colors">
              WORKOUT
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white font-mono">18:02</span>
              <span className="text-xs text-purple-300 font-medium">Strength</span>
            </div>
          </div>
        </div>

        <div className="w-full h-8 pt-1">
          <svg className="w-full h-full" viewBox="0 0 200 30" fill="none" aria-hidden="true">
            <path
              d="M0,25 Q30,10 60,20 T120,5 T180,18 T200,10"
              stroke="#38BDF8"
              strokeWidth={hoveredIndex === 3 ? '3' : '2'}
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
