import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import HeroSignalNodes from './HeroSignalNodes';
import PhoneMockup from './PhoneMockup';
import TodayCalorieScreen from './PhoneScreens/TodayCalorieScreen';
import ParticleCanvas from './ParticleCanvas';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Parallax depth layers: different speeds for different depth planes
  const bgY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const midY = useTransform(scrollYProgress, [0, 0.3], [0, 40]);
  const fgY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);
  const phoneY = useTransform(scrollYProgress, [0, 0.3], [0, -35]);

  return (
    <section class="relative w-full min-h-screen bg-[#050711] overflow-hidden flex flex-col justify-between pt-2 pb-16" style={{ perspective: '1200px' }}>
      {/* Background Energetic Cyan/Purple Canvas - Same as Workout Intelligence */}
      <motion.div class="absolute inset-0 z-0 pointer-events-none" style={{ y: bgY }}>
        <ParticleCanvas variant="health" />
      </motion.div>

      {/* Radiant Volumetric Cosmic Glowing Orbs - Mid Parallax Layer */}
      <motion.div class="absolute inset-0 pointer-events-none z-[1]" style={{ y: midY }}>
        <div class="absolute left-1/4 top-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-purple-900/30 via-indigo-800/20 to-transparent rounded-full blur-[130px]"></div>
        <div class="absolute right-0 top-10 w-[750px] h-[750px] bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-purple-900/15 rounded-full blur-[150px]"></div>
      </motion.div>

      {/* Top Navbar Header */}
      <Navbar />

      {/* Hero Content Grid (Left Text | Center Signal Nodes | Right Phone Mockup) */}
      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto pt-4" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Left Column - Headline & CTAs — Foreground Parallax Layer */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ y: fgY, transformStyle: 'preserve-3d' }}
          class="lg:col-span-5 space-y-6"
        >
          {/* Eyebrow */}
          <p class="text-xs font-semibold tracking-[0.2em] text-purple-300 uppercase font-grotesk">
            CONNECTED NUTRITION + HEALTH
          </p>

          {/* Main Headline */}
          <h1 class="text-4xl sm:text-6xl xl:text-7xl font-serif leading-[1.08] text-white tracking-tight">
            See how<br />
            your day<br />
            <span class="bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              connects
            </span>
            <span class="text-cyan-400">.</span>
          </h1>

          {/* Subtitle */}
          <p class="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-md">
            Log food naturally. Bring in sleep, recovery and workouts. Aurora turns the signals across your day into one clearer picture.
          </p>

          {/* CTA Buttons */}
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <button class="glow-btn-lime px-7 py-3.5 rounded-full font-grotesk font-semibold text-sm flex items-center gap-2 group">
              Join the beta
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button class="dark-pill-btn px-7 py-3.5 rounded-full font-grotesk font-medium text-sm text-slate-200 hover:border-slate-500">
              Explore Aurora
            </button>
          </div>
        </motion.div>

        {/* Middle Column - Floating Signal Node Widgets — Mid Parallax Layer */}
        <motion.div class="lg:col-span-3 flex justify-center lg:justify-start" style={{ y: midY }}>
          <HeroSignalNodes />
        </motion.div>

        {/* Right Column - Phone Mockup — Foreground Parallax Layer */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ y: phoneY, transformStyle: 'preserve-3d' }}
          class="lg:col-span-4 flex justify-center lg:justify-end relative"
        >
          {/* Subtle Backing Energy Halo for Cinematic Volumetric Effect */}
          <div class="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-teal-400/20 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="02:14" battery="76%">
            <TodayCalorieScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wave Transition into Light Section */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-16 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C300,110 700,-20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>

        <div class="absolute bottom-3 left-12 text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-700 font-grotesk">
          INSIGHTS THAT ADD UP
        </div>
      </div>
    </section>
  );
}
