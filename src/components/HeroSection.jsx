import React, { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

// Lazy-load WebGL 3D Canvas for instant FCP/LCP First Contentful Paint (<0.4s)
const HeroCanvas3D = lazy(() => import('./3d/HeroCanvas3D'));

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
      aria-label="Hero Showcase"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full min-h-screen bg-[#050711] overflow-hidden flex flex-col justify-between pt-2 pb-16 gpu-accelerated preserve-3d"
    >
      {/* WEBGL 3D SCENE - Asynchronously Loaded via Suspense */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-[#050711] via-[#090D22] to-[#04060E] opacity-90 pointer-events-none" />
        }
      >
        <HeroCanvas3D />
      </Suspense>

      {/* Top Navbar Header */}
      <Navbar />

      {/* HTML Layer: Typography & CTA Buttons overlaying 3D Scene */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto pt-4 pointer-events-none preserve-3d">
        
        {/* Left Column - HTML Typography & Interactive Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="lg:col-span-6 space-y-6 pointer-events-auto preserve-3d"
        >
          {/* Eyebrow */}
          <motion.p variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] text-purple-300 uppercase font-grotesk">
            CONNECTED NUTRITION + HEALTH
          </motion.p>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl xl:text-7xl font-serif leading-[1.08] text-white tracking-tight">
            See how<br />
            your day<br />
            <span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              connects
            </span>
            <span className="text-cyan-400">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-slate-200 text-sm sm:text-base font-light leading-relaxed max-w-md">
            Log food naturally. Bring in sleep, recovery and workouts. Aurora turns the signals across your day into one clearer picture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2 preserve-3d">
            <button
              type="button"
              aria-label="Join the beta program"
              className="glow-btn-lime px-7 py-3.5 rounded-full font-grotesk font-semibold text-sm flex items-center gap-2 group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.025] focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              Join the beta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Explore Aurora features"
              className="dark-pill-btn px-7 py-3.5 rounded-full font-grotesk font-medium text-sm text-slate-200 hover:border-slate-500 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.025] focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Explore Aurora
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave Transition into Light Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-16 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C300,110 700,-20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>

        <div className="absolute bottom-3 left-12 text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-700 font-grotesk">
          INSIGHTS THAT ADD UP
        </div>
      </div>
    </motion.section>
  );
}
