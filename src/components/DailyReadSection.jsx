import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Utensils, Moon, Heart, Footprints } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import TodayCalorieScreen from './PhoneScreens/TodayCalorieScreen';
import { use3DTilt } from '../hooks/use3DTilt';

function Interactive3DCard({ children, className = '', depthZ = 24 }) {
  const { tiltStyle, shineStyle, handleMouseMove, handleMouseLeave } = use3DTilt(6, 1.02, depthZ);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d cursor-pointer ${className}`}
      style={tiltStyle}
    >
      <div className="absolute inset-0 pointer-events-none rounded-2xl z-40" style={shineStyle}></div>
      {children}
    </div>
  );
}

export default function DailyReadSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven 3D Transformations with Spring Dampening (Zero Jitter)
  const cameraScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 1.04]);
  const rawRotateY = useTransform(scrollYProgress, [0.1, 0.35], [-4, 6]);
  const rawPhoneY = useTransform(scrollYProgress, [0.1, 0.35], [20, -15]);
  const bgGradientShift = useTransform(scrollYProgress, [0.1, 0.35], [0, 40]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 60, damping: 25, mass: 0.4 });

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

  const cardVariants = (index) => ({
    hidden: { opacity: 0, x: -40, z: -30 },
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
      aria-label="One Daily Read Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden perspective-1200 preserve-3d gpu-accelerated"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#030509]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Decorative Natural Plant Leaf Graphic with 3D Parallax Drift */}
      <motion.div
        style={{ y: bgGradientShift }}
        className="absolute right-0 top-0 w-64 h-64 pointer-events-none opacity-30 preserve-3d"
      >
        <svg className="w-full h-full text-emerald-800" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M50 0 C70 30 90 40 100 70 C80 90 50 100 20 80 C10 60 30 20 50 0 Z" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Ambient Lighting Radial Spot */}
      <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 via-amber-100/30 to-transparent rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 preserve-3d">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 space-y-6 preserve-3d"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-800 uppercase font-grotesk">
            ONE DAILY READ
          </p>

          <h2 className="text-4xl sm:text-6xl font-serif leading-[1.1] text-slate-900 tracking-tight">
            Start with<br />
            what matters<br />
            today<span className="text-purple-700 font-sans">.</span>
          </h2>

          <p className="text-slate-700 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Your meals, sleep, recovery, movement and goals become one daily plan.
          </p>
        </motion.div>

        {/* Center Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-4 space-y-6 select-none relative preserve-3d"
        >
          {/* Signal 1: BREAKFAST */}
          <motion.div variants={cardVariants(0)}>
            <Interactive3DCard className="flex items-center justify-between bg-white/95 backdrop-blur-md p-2.5 px-3 rounded-2xl border border-purple-200/90 shadow-lg group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0">
                  <Utensils className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-600 font-grotesk block">
                    BREAKFAST
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono">08:41</span>
                    <span className="text-xs text-purple-800 font-medium">690 kcal</span>
                  </div>
                </div>
              </div>

              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-amber-200 shrink-0 bg-amber-100 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=200&q=80"
                  alt="Breakfast Oatmeal Bowl"
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,20 Q40,20 80,0" fill="none" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </Interactive3DCard>
          </motion.div>

          {/* Signal 2: SLEEP */}
          <motion.div variants={cardVariants(1)}>
            <Interactive3DCard className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-purple-200/90 shadow-lg space-y-2 group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0">
                  <Moon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-600 font-grotesk block">
                    SLEEP
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono">23:42 — 07:15</span>
                    <span className="text-xs text-purple-800 font-medium">7h 33m</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-1 h-6 pt-1 pl-12">
                {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85, 45, 75, 55, 95, 35].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-1 rounded-t-sm ${i % 2 === 0 ? 'bg-purple-600' : 'bg-cyan-500'}`}
                  ></div>
                ))}
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,20 Q40,20 80,10" fill="none" stroke="#818CF8" strokeWidth="1.5" />
              </svg>
            </Interactive3DCard>
          </motion.div>

          {/* Signal 3: RECOVERY */}
          <motion.div variants={cardVariants(2)}>
            <Interactive3DCard className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-teal-200/90 shadow-lg space-y-1 group hover:border-teal-400 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 shrink-0">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-600 font-grotesk block">
                    RECOVERY
                  </span>
                  <span className="text-sm font-bold text-teal-700 font-grotesk">81% Good</span>
                </div>
              </div>

              <div className="h-6 pl-12">
                <svg className="w-full h-full" viewBox="0 0 150 20" fill="none" aria-hidden="true">
                  <path d="M0,15 Q30,5 60,12 T120,3 T150,10" stroke="#0D9488" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,20 Q40,20 80,20" fill="none" stroke="#2DD4BF" strokeWidth="1.5" />
              </svg>
            </Interactive3DCard>
          </motion.div>

          {/* Signal 4: WORKOUT */}
          <motion.div variants={cardVariants(3)}>
            <Interactive3DCard className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-cyan-200/90 shadow-lg space-y-1 group hover:border-cyan-400 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700 shrink-0">
                  <Footprints className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-600 font-grotesk block">
                    WORKOUT
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono">18:02</span>
                    <span className="text-xs text-cyan-800 font-medium">Strength</span>
                  </div>
                </div>
              </div>

              <div className="h-6 pl-12">
                <svg className="w-full h-full" viewBox="0 0 150 20" fill="none" aria-hidden="true">
                  <path d="M0,18 L30,12 L60,16 L90,4 L120,14 L150,8" stroke="#0284C7" strokeWidth="2" fill="none" />
                  <circle cx="30" cy="12" r="2.5" fill="#0284C7" />
                  <circle cx="90" cy="4" r="2.5" fill="#7C3AED" />
                  <circle cx="150" cy="8" r="2.5" fill="#0284C7" />
                </svg>
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path d="M0,20 Q40,20 80,30" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              </svg>
            </Interactive3DCard>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          animate={{
            y: [-5, 5, -5],
            rotateZ: [-0.8, 0.8, -0.8],
          }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeOut' },
            x: { duration: 0.8, ease: 'easeOut' },
            scale: { duration: 0.8, ease: 'easeOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ rotateY: phoneRotateY, y: phoneY }}
          className="lg:col-span-4 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-purple-300/30 via-cyan-200/20 to-teal-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="02:14" battery="76%">
            <TodayCalorieScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg className="relative block w-full h-16 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C350,110 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
