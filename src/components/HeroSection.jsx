import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import HeroCanvas3D from './3d/HeroCanvas3D';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Scroll Camera Scale & Parallax Transformations
  const cameraScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -20]);

  // Staggered Entrance Motion Variants for HTML Typography
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      style={{ scale: cameraScale, perspective: '1200px' }}
      class="relative w-full min-h-screen bg-[#050711] overflow-hidden flex flex-col justify-between pt-2 pb-16 gpu-accelerated preserve-3d"
    >
      {/* WEBGL 3D SCENE: React Three Fiber Canvas with PerspectiveCamera, 3D Phone, 3D Widgets at Z-Depths & Procedural 3D Aurora */}
      <HeroCanvas3D />

      {/* Top Navbar Header */}
      <Navbar />

      {/* HTML Layer: Typography & CTA Buttons overlaying 3D Scene */}
      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto pt-4 pointer-events-none preserve-3d">
        
        {/* Left Column - HTML Typography & Interactive Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          class="lg:col-span-6 space-y-6 pointer-events-auto preserve-3d"
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

          {/* CTA Buttons - Spring Elevation on Hover */}
          <motion.div variants={itemVariants} class="flex flex-wrap items-center gap-4 pt-2 preserve-3d">
            <button class="glow-btn-lime px-7 py-3.5 rounded-full font-grotesk font-semibold text-sm flex items-center gap-2 group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.025]">
              Join the beta
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button class="dark-pill-btn px-7 py-3.5 rounded-full font-grotesk font-medium text-sm text-slate-200 hover:border-slate-500 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.025]">
              Explore Aurora
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave Transition into Light Section */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1 pointer-events-none">
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
