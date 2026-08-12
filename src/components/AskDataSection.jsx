import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Utensils, Footprints, Check } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import ChatScreen from './PhoneScreens/ChatScreen';

export default function AskDataSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Camera Zoom & 3D Phone Rotation
  const cameraScale = useTransform(scrollYProgress, [0.35, 0.6], [1, 1.04]);
  const phoneRotateY = useTransform(scrollYProgress, [0.35, 0.6], [-3, 6]);
  const phoneY = useTransform(scrollYProgress, [0.35, 0.6], [15, -15]);

  return (
    <motion.section
      aria-label="Ask Your Data Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden gpu-accelerated preserve-3d"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#060814]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Volumetric Soft Ambient Parchment Lighting Spot */}
      <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 via-cyan-100/30 to-transparent rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 preserve-3d">
        
        {/* Left Side Container: Text Content & Prompt Cards (col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center preserve-3d">
          
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-7 space-y-6 preserve-3d"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-800 uppercase font-grotesk">
              ASK YOUR OWN DATA
            </p>

            <h2 className="text-4xl sm:text-5xl font-serif leading-[1.08] text-slate-900 tracking-tight">
              Talk to your<br />
              health like you<br />
              talk to a person<span className="text-purple-700 font-sans">.</span>
            </h2>

            <p className="text-slate-700 text-sm font-light leading-relaxed max-w-sm">
              Ask about a workout. Correct a meal. Understand a change. Aurora answers from the context you have built.
            </p>
          </motion.div>

          {/* Floating Context Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sm:col-span-5 space-y-6 select-none relative preserve-3d"
          >
            {/* Top Context Card */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-3 shadow-lg relative group hover:shadow-xl hover:border-purple-400 hover:-translate-y-1 transition-all duration-300 preserve-3d cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
                    <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-snug">
                      Actually, that was two servings.
                    </p>
                    <span className="text-[9px] text-slate-600 font-mono">Lunch · 12:41 PM</span>
                  </div>
                </div>

                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-amber-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"
                    alt="Meal serving"
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-teal-500 text-white flex items-center justify-center text-[6px] font-bold">
                    <Check className="w-2 h-2" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Context Card */}
            <motion.div
              animate={{
                y: [5, -5, 5],
              }}
              transition={{
                y: { duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
              }}
              className="bg-white/90 backdrop-blur-md border border-cyan-200/80 rounded-2xl p-3 shadow-lg relative group hover:shadow-xl hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 preserve-3d cursor-pointer"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700 shrink-0 mt-0.5">
                  <Footprints className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-snug">
                    How did yesterday's workout affect today?
                  </p>
                  <span className="text-[9px] text-slate-600 font-mono">11:32 AM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side Container: Phone Mockup (col-span-5) */}
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
          className="lg:col-span-5 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-purple-300/30 via-cyan-200/20 to-teal-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="03:18" battery="77%">
            <ChatScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg className="relative block w-full h-16 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C350,110 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
