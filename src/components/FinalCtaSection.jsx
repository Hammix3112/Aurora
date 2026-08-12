import React, { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Utensils, Dumbbell, Heart } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import LunchLogScreen from './PhoneScreens/LunchLogScreen';

const BackgroundCanvas = lazy(() => import('./3d/BackgroundCanvas'));

export default function FinalCtaSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Camera Zoom & Keynote Finale Rotation with Spring Dampening
  const cameraScale = useTransform(scrollYProgress, [0.85, 1.0], [1, 1.07]);
  const rawRotateY = useTransform(scrollYProgress, [0.85, 1.0], [-4, 8]);
  const rawPhoneY = useTransform(scrollYProgress, [0.85, 1.0], [20, -15]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 60, damping: 25, mass: 0.4 });

  return (
    <motion.section
      aria-label="Final Call to Action"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full min-h-screen bg-[#05070F] overflow-hidden flex flex-col justify-between pt-12 pb-8 gpu-accelerated preserve-3d"
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

      {/* Volumetric Blue & Purple Rays Converging Toward Phone */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-500/25 via-indigo-600/20 to-purple-800/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute right-0 top-10 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-600/20 via-teal-500/15 to-transparent rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Top Category Indicators */}
      <div className="relative z-10 flex items-center justify-around max-w-2xl mx-auto w-full mb-8 px-6 preserve-3d pt-6">
        {/* Food */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-all duration-300 shadow-lg shadow-amber-950/40">
            <Utensils className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
          <span className="text-[10px] tracking-widest font-semibold text-slate-300 uppercase group-hover:text-amber-300 transition-colors font-grotesk">
            FOOD
          </span>
        </motion.div>

        {/* Workouts */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:border-purple-400 transition-all duration-300 shadow-lg shadow-purple-950/40">
            <Dumbbell className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
          <span className="text-[10px] tracking-widest font-semibold text-slate-300 uppercase group-hover:text-purple-300 transition-colors font-grotesk">
            WORKOUTS
          </span>
        </motion.div>

        {/* Connected Health */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-950/40">
            <Heart className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
          <span className="text-[10px] tracking-widest font-semibold text-slate-300 uppercase group-hover:text-cyan-300 transition-colors font-grotesk">
            CONNECTED HEALTH
          </span>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto preserve-3d">
        
        {/* Left Side - Phone Mockup Suspended as Hero */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
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
          className="lg:col-span-6 flex justify-center lg:justify-start preserve-3d relative"
        >
          {/* Hero Halo */}
          <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/25 to-purple-600/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="11:42" battery="100%">
            <LunchLogScreen />
          </PhoneMockup>
        </motion.div>

        {/* Right Side - Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 text-center lg:text-left space-y-6 preserve-3d"
        >
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#D4F933] uppercase font-grotesk">
            YOUR DATA, YOUR CHOICE
          </p>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-6xl xl:text-7xl font-serif leading-[1.1] text-white tracking-tight">
            Aurora can suggest.<br />
            Only you can confirm<span className="text-[#D4F933] font-sans">.</span>
          </h2>

          {/* Subtitle */}
          <div className="text-slate-200 text-sm sm:text-lg font-light leading-relaxed space-y-1">
            <p>Visible sources. Reviewable drafts.</p>
            <p>Connections you control.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 preserve-3d">
            <button
              type="button"
              aria-label="Join the beta program"
              className="glow-btn-lime px-8 py-3.5 rounded-full font-grotesk font-semibold text-sm flex items-center gap-2 group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-lime-300 shadow-lg shadow-lime-400/20"
            >
              Join the beta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Explore Aurora features"
              className="dark-pill-btn px-8 py-3.5 rounded-full font-grotesk font-medium text-sm text-slate-200 flex items-center gap-2 group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg shadow-purple-500/20"
            >
              Explore Aurora
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Section Sub-footer Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-10 border-t border-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/50">
              <div className="w-full h-full rounded-full bg-[#05070F]"></div>
            </div>
            <span className="font-grotesk font-bold tracking-widest text-white text-sm">AURORA</span>
          </div>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
          <span className="text-slate-300 text-[11px] hidden sm:inline font-light">
            Understand over time. Act with confidence.
          </span>
        </div>

        <nav aria-label="Subfooter Navigation" className="flex items-center gap-6 text-[11px] font-grotesk text-slate-300">
          <a href="#about" className="hover:text-white transition-colors">About Aurora</a>
          <a href="#help" className="hover:text-white transition-colors">Help</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="#careers" className="hover:text-white transition-colors">Careers</a>
        </nav>
      </div>

      {/* Bottom Horizon Arc Curve Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1400px] h-[150px] bg-gradient-to-t from-white/10 via-cyan-400/20 to-transparent rounded-t-[100%] blur-sm pointer-events-none"></div>
    </motion.section>
  );
}
