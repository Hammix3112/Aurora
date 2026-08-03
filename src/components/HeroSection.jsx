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

  // Cinematic 3D Camera & Scroll Parallax Transformations
  const cameraScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.07]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.3], [-4, 8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3], [0.65, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Staggered Entrance Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      style={{ scale: cameraScale, perspective: '1200px' }}
      class="relative w-full min-h-screen bg-[#050711] overflow-hidden flex flex-col justify-between pt-2 pb-16 gpu-accelerated preserve-3d"
    >
      {/* Background Layered Atmospheric Fog & Particles - Deep Parallax */}
      <motion.div class="absolute inset-0 z-0 pointer-events-none" style={{ scale: bgScale }}>
        <ParticleCanvas variant="health" />
        {/* Layered Atmospheric Fog Gradient Overlay */}
        <div class="absolute inset-0 bg-radial from-transparent via-[#050711]/40 to-[#050711] pointer-events-none"></div>
      </motion.div>

      {/* Volumetric Blue & Purple Lighting Backdrop */}
      <motion.div class="absolute inset-0 pointer-events-none z-[1]" style={{ opacity: glowOpacity }}>
        {/* Purple Volumetric Glow Left */}
        <div class="absolute left-1/4 top-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-purple-900/35 via-indigo-800/25 to-transparent rounded-full blur-[140px]"></div>
        {/* Cyan Volumetric Glow Right behind Phone */}
        <div class="absolute right-0 top-10 w-[750px] h-[750px] bg-gradient-to-bl from-cyan-500/25 via-teal-500/15 to-purple-900/20 rounded-full blur-[160px]"></div>
      </motion.div>

      {/* Top Navbar Header */}
      <Navbar />

      {/* Hero Content Grid (Left Text | Center Signal Nodes | Right Phone Mockup) */}
      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto pt-4 preserve-3d">
        
        {/* Left Column - Staggered Motion Text Reveal & Elevating Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          class="lg:col-span-5 space-y-6 preserve-3d"
        >
          {/* Eyebrow */}
          <motion.p variants={itemVariants} class="text-xs font-semibold tracking-[0.2em] text-purple-300 uppercase font-grotesk">
            CONNECTED NUTRITION + HEALTH
          </motion.p>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} class="text-4xl sm:text-6xl xl:text-7xl font-serif leading-[1.08] text-white tracking-tight">
            See how<br />
            your day<br />
            <span class="bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              connects
            </span>
            <span class="text-cyan-400">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} class="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-md">
            Log food naturally. Bring in sleep, recovery and workouts. Aurora turns the signals across your day into one clearer picture.
          </motion.p>

          {/* CTA Buttons - Subtle Spring Elevation on Hover */}
          <motion.div variants={itemVariants} class="flex flex-wrap items-center gap-4 pt-2">
            <button class="glow-btn-lime px-7 py-3.5 rounded-full font-grotesk font-semibold text-sm flex items-center gap-2 group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
              Join the beta
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button class="dark-pill-btn px-7 py-3.5 rounded-full font-grotesk font-medium text-sm text-slate-200 hover:border-slate-500 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
              Explore Aurora
            </button>
          </motion.div>
        </motion.div>

        {/* Middle Column - Independently Floating Statistics Cards */}
        <div class="lg:col-span-3 flex justify-center lg:justify-start">
          <HeroSignalNodes />
        </div>

        {/* Right Column - 3D Floating Phone Mockup with Idle Rotation & Volumetric Shadow */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [-6, 6, -6],
            rotateZ: [-1, 1, -1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            x: { duration: 0.8, delay: 0.2 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ rotateY: phoneRotateY }}
          class="lg:col-span-4 flex justify-center lg:justify-end relative preserve-3d"
        >
          {/* Blue & Purple Volumetric Lighting Halo Behind Phone */}
          <div class="absolute -inset-8 bg-gradient-to-tr from-cyan-500/25 via-purple-500/20 to-teal-400/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          {/* Phone Mockup with 3D Tilt */}
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
    </motion.section>
  );
}
