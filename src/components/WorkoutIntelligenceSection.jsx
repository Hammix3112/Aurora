import React, { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import WorkoutDetailScreen from './PhoneScreens/WorkoutDetailScreen';

const BackgroundCanvas = lazy(() => import('./3d/BackgroundCanvas'));

export default function WorkoutIntelligenceSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Camera & Graph Transformations with Spring Dampening
  const cameraScale = useTransform(scrollYProgress, [0.45, 0.7], [1, 1.05]);
  const rawRotateY = useTransform(scrollYProgress, [0.45, 0.7], [-4, 8]);
  const rawPhoneY = useTransform(scrollYProgress, [0.45, 0.7], [20, -15]);
  const graphPathLength = useTransform(scrollYProgress, [0.45, 0.65], [0.2, 1]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 60, damping: 25, mass: 0.4 });

  return (
    <motion.section
      aria-label="Workout Intelligence Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#04060E] text-white py-28 overflow-hidden min-h-[750px] flex flex-col justify-center gpu-accelerated preserve-3d"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Hero Three.js Shader Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <BackgroundCanvas />
        </Suspense>
      </div>

      {/* Radiant Glowing Orbs behind Phone */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/25 via-teal-500/18 to-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto preserve-3d">
        
        {/* Left Side Container: Content & Callout Cards (col-span-6) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center preserve-3d">
          
          {/* Main Headline & ECG Graph */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-7 space-y-6 preserve-3d"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase font-grotesk">
                WORKOUT INTELLIGENCE
              </p>

              <h2 className="text-4xl sm:text-5xl font-serif leading-[1.08] text-white tracking-tight">
                See the workout.<br />
                Understand<br />
                the context<span className="text-purple-400 font-sans">.</span>
              </h2>

              <p className="text-slate-200 text-sm font-light leading-relaxed max-w-sm">
                Training detail, recovery and nutrition in one connected view.
              </p>
            </div>

            {/* Bottom Left Heartbeat Line Graph Overlay */}
            <div className="pt-2 space-y-2 select-none preserve-3d">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" aria-hidden="true"></span>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-purple-300 font-grotesk block">
                    WORKOUT
                  </span>
                  <span className="text-base font-bold text-white font-mono">45:12</span>
                  <span className="text-xs text-slate-300 ml-2">Run · Intervals</span>
                </div>
              </div>

              {/* ECG Heartbeat Line Wave */}
              <div className="w-full h-10 pt-1">
                <svg className="w-full h-full" viewBox="0 0 300 40" fill="none" aria-hidden="true">
                  <motion.path
                    d="M0,25 L40,25 L50,10 L60,35 L70,5 L80,30 L90,20 L130,20 L140,5 L150,38 L160,15 L200,25 L300,25"
                    stroke="url(#ecgGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    style={{ pathLength: graphPathLength }}
                  />
                  <circle cx="70" cy="5" r="3.5" fill="#C084FC" className="animate-ping" />
                  <circle cx="150" cy="38" r="3.5" fill="#38BDF8" />
                  <defs>
                    <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="50%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Callout Cards Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sm:col-span-5 space-y-6 select-none relative preserve-3d"
          >
            {/* Top Card */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 shadow-3d-deep relative group hover:border-purple-400 hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300 preserve-3d cursor-pointer"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Dumbbell className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <p className="text-[9.5px] text-slate-200 leading-relaxed font-light">
                  Your hardest interval aligns with a spike in heart rate and a dip in recovery score this evening.
                </p>
              </div>
            </motion.div>

            {/* Bottom Card */}
            <motion.div
              animate={{
                y: [5, -5, 5],
              }}
              transition={{
                y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
              }}
              className="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 rounded-xl p-2 px-3 shadow-3d-deep inline-block relative group hover:border-cyan-400 hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 preserve-3d cursor-pointer"
            >
              <span className="text-[8.5px] uppercase tracking-wider font-semibold text-slate-300 font-grotesk block">
                Hardest interval
              </span>
              <span className="text-sm font-bold text-purple-300 font-mono">24:31</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side Container: Phone Mockup (col-span-6) */}
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
          className="lg:col-span-6 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/25 via-teal-400/20 to-purple-600/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="03:07" battery="77%">
            <WorkoutDetailScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg className="relative block w-full h-16 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,50 C350,120 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
