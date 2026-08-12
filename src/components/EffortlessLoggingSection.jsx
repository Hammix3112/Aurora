import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mic, Camera, MessageSquare, Edit3, CheckCheck } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import LunchLogScreen from './PhoneScreens/LunchLogScreen';

export default function EffortlessLoggingSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven 3D Transformations with Spring Dampening (Zero Jitter)
  const cameraScale = useTransform(scrollYProgress, [0.2, 0.45], [1, 1.04]);
  const rawRotateY = useTransform(scrollYProgress, [0.2, 0.45], [-3, 5]);
  const bowlRotate = useTransform(scrollYProgress, [0.2, 0.45], [0, 15]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });

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

  const itemVariants = (index) => ({
    hidden: { opacity: 0, x: -35, z: -25 },
    visible: {
      opacity: 1,
      x: 0,
      z: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <motion.section
      aria-label="Effortless Food Logging Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden perspective-1200 preserve-3d gpu-accelerated"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Soft Ambient Volumetric Lighting Spot */}
      <div className="absolute left-1/4 top-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-purple-100/30 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Decorative Water Glass Accent */}
      <div className="absolute left-1/3 top-6 w-32 h-32 pointer-events-none opacity-40 preserve-3d">
        <div className="w-20 h-24 rounded-b-2xl border-2 border-slate-300/60 bg-white/30 backdrop-blur-sm shadow-sm rotate-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 preserve-3d">
        
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6 preserve-3d"
        >
          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-800 uppercase font-grotesk">
            EFFORTLESS FOOD LOGGING
          </p>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-6xl font-serif leading-[1.08] text-slate-900 tracking-tight">
            Log the meal.<br />
            Not the admin<span className="text-purple-700 font-sans">.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-700 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Speak it. Photograph it. Share the order. Type it. Aurora drafts the meal — you confirm it.
          </p>

          {/* Overhead Chicken & Avocado Bowl Image with 3D Depth Spin */}
          <div className="pt-4 max-w-sm relative preserve-3d">
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/25 via-orange-300/20 to-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <motion.div
              animate={{
                y: [-7, 7, -7],
                rotateZ: [-2, 2, -2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ rotateZ: bowlRotate }}
              className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/90 transform transition-transform duration-500 hover:scale-105 preserve-3d cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                alt="Grilled Chicken Bowl with Avocado and Rice"
                width="256"
                height="256"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Middle Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-3 space-y-5 select-none relative preserve-3d"
        >
          {/* 1. VOICE */}
          <motion.div variants={itemVariants(0)}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-purple-100/90 text-purple-900 border border-purple-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
                <Mic className="w-3 h-3 text-purple-700" aria-hidden="true" />
                <span>VOICE</span>
              </div>

              <div className="bg-white/95 backdrop-blur-md border border-purple-200/90 rounded-2xl p-2.5 px-3 shadow-lg flex-1 text-center space-y-1 transition-all duration-300">
                <div className="flex items-center justify-center gap-0.5 h-4">
                  {[30, 70, 40, 90, 60, 100, 50, 80, 30, 60, 40].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="w-0.5 bg-purple-600 rounded-full"></div>
                  ))}
                </div>
                <p className="text-[9.5px] text-slate-800 italic font-medium">"Chicken bowl with rice and salad"</p>
              </div>

              <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,16 Q30,16 60,0" fill="none" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </motion.div>

          {/* 2. PHOTO */}
          <motion.div variants={itemVariants(1)}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-purple-100/90 text-purple-900 border border-purple-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
                <Camera className="w-3 h-3 text-purple-700" aria-hidden="true" />
                <span>PHOTO</span>
              </div>

              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0 transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
                  alt="Meal photo scan"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-1 border border-white/80 rounded-xl pointer-events-none"></div>
              </div>

              <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,16 Q30,16 60,10" fill="none" stroke="#A855F7" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>

          {/* 3. ORDER */}
          <motion.div variants={itemVariants(2)}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-cyan-100/90 text-cyan-900 border border-cyan-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
                <MessageSquare className="w-3 h-3 text-cyan-700" aria-hidden="true" />
                <span>ORDER</span>
              </div>

              <div className="bg-white/95 backdrop-blur-md border border-cyan-200/90 rounded-2xl p-2.5 px-3 shadow-lg flex-1 text-left transition-all duration-300">
                <p className="text-[9px] text-slate-900 leading-snug">
                  Grilled chicken bowl with rice, avocado, slaw, cucumber, spicy mayo
                </p>
                <div className="flex items-center justify-end gap-1 text-[7.5px] text-teal-700 font-mono mt-1">
                  <span>12:41</span>
                  <CheckCheck className="w-2.5 h-2.5" aria-hidden="true" />
                </div>
              </div>

              <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,16 Q30,16 60,20" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>

          {/* 4. TYPE */}
          <motion.div variants={itemVariants(3)}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-cyan-100/90 text-cyan-900 border border-cyan-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
                <Edit3 className="w-3 h-3 text-cyan-700" aria-hidden="true" />
                <span>TYPE</span>
              </div>

              <div className="bg-white/95 backdrop-blur-md border border-cyan-200/90 rounded-2xl p-2.5 px-3 shadow-lg flex-1 text-left transition-all duration-300">
                <p className="text-[9px] text-slate-900 leading-snug">
                  Chicken bowl rice, salad, avocado, chilli mayo<span className="inline-block w-1 h-3 bg-cyan-600 ml-0.5 animate-pulse"></span>
                </p>
              </div>

              <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,16 Q30,16 60,30" fill="none" stroke="#2DD4BF" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-0.8, 0.8, -0.8],
          }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeOut' },
            x: { duration: 0.8, ease: 'easeOut' },
            scale: { duration: 0.8, ease: 'easeOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ rotateY: phoneRotateY }}
          className="lg:col-span-4 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-amber-300/25 via-purple-300/20 to-cyan-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="11:42" battery="100%">
            <LunchLogScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg className="relative block w-full h-16 text-[#060814]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C350,110 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
