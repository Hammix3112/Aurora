import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Camera, MessageSquare, Edit3, CheckCheck } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import LunchLogScreen from './PhoneScreens/LunchLogScreen';

export default function EffortlessLoggingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section class="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden">
      {/* Decorative Water Glass Accent Top Center */}
      <div class="absolute left-1/3 top-6 w-32 h-32 pointer-events-none opacity-40">
        <div class="w-20 h-24 rounded-b-2xl border-2 border-slate-300/60 bg-white/30 backdrop-blur-sm shadow-sm rotate-6"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column Text Content & Bowl Image Scroll Trigger Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          class="lg:col-span-5 space-y-6"
        >
          {/* Eyebrow */}
          <p class="text-xs font-semibold tracking-[0.2em] text-purple-700 uppercase font-grotesk">
            EFFORTLESS FOOD LOGGING
          </p>

          {/* Main Headline */}
          <h2 class="text-4xl sm:text-6xl font-serif leading-[1.08] text-slate-900 tracking-tight">
            Log the meal.<br />
            Not the admin<span class="text-purple-600 font-sans">.</span>
          </h2>

          {/* Subtitle */}
          <p class="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Speak it. Photograph it. Share the order. Type it. Aurora drafts the meal — you confirm it.
          </p>

          {/* Overhead Chicken & Avocado Bowl Image */}
          <div class="pt-4 max-w-sm">
            <div class="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/80 transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                alt="Grilled Chicken Bowl with Avocado and Rice"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Middle Column - 4 Logging Method Input Cards with Staggered Scroll Trigger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          class="lg:col-span-3 space-y-5 select-none relative"
        >
          {/* 1. VOICE */}
          <motion.div variants={itemVariants} class="flex items-center gap-3 relative group">
            <div class="flex items-center gap-1.5 bg-purple-100/90 text-purple-800 border border-purple-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
              <Mic class="w-3 h-3 text-purple-600" />
              <span>VOICE</span>
            </div>

            <div class="bg-white/85 backdrop-blur-md border border-purple-200/80 rounded-2xl p-2.5 px-3 shadow-md flex-1 text-center space-y-1">
              <div class="flex items-center justify-center gap-0.5 h-4">
                {[30, 70, 40, 90, 60, 100, 50, 80, 30, 60, 40].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} class="w-0.5 bg-purple-500 rounded-full"></div>
                ))}
              </div>
              <p class="text-[9.5px] text-slate-700 italic font-medium">"Chicken bowl with rice and salad"</p>
            </div>

            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,0" fill="none" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="3 3" />
            </svg>
          </motion.div>

          {/* 2. PHOTO */}
          <motion.div variants={itemVariants} class="flex items-center gap-3 relative group">
            <div class="flex items-center gap-1.5 bg-purple-100/90 text-purple-800 border border-purple-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
              <Camera class="w-3 h-3 text-purple-600" />
              <span>PHOTO</span>
            </div>

            <div class="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
                alt="Meal photo scan"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-1 border border-white/80 rounded-xl pointer-events-none"></div>
            </div>

            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,10" fill="none" stroke="#A855F7" stroke-width="1.5" />
            </svg>
          </motion.div>

          {/* 3. ORDER */}
          <motion.div variants={itemVariants} class="flex items-center gap-3 relative group">
            <div class="flex items-center gap-1.5 bg-cyan-100/90 text-cyan-800 border border-cyan-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
              <MessageSquare class="w-3 h-3 text-cyan-600" />
              <span>ORDER</span>
            </div>

            <div class="bg-white/85 backdrop-blur-md border border-cyan-200/80 rounded-2xl p-2.5 px-3 shadow-md flex-1 text-left">
              <p class="text-[9px] text-slate-800 leading-snug">
                Grilled chicken bowl with rice, avocado, slaw, cucumber, spicy mayo
              </p>
              <div class="flex items-center justify-end gap-1 text-[7.5px] text-teal-600 font-mono mt-1">
                <span>12:41</span>
                <CheckCheck class="w-2.5 h-2.5" />
              </div>
            </div>

            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,20" fill="none" stroke="#38BDF8" stroke-width="1.5" />
            </svg>
          </motion.div>

          {/* 4. TYPE */}
          <motion.div variants={itemVariants} class="flex items-center gap-3 relative group">
            <div class="flex items-center gap-1.5 bg-cyan-100/90 text-cyan-800 border border-cyan-300 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider font-grotesk shrink-0 shadow-sm">
              <Edit3 class="w-3 h-3 text-cyan-600" />
              <span>TYPE</span>
            </div>

            <div class="bg-white/85 backdrop-blur-md border border-cyan-200/80 rounded-2xl p-2.5 px-3 shadow-md flex-1 text-left">
              <p class="text-[9px] text-slate-800 leading-snug">
                Chicken bowl rice, salad, avocado, chilli mayo<span class="inline-block w-1 h-3 bg-cyan-500 ml-0.5 animate-pulse"></span>
              </p>
            </div>

            <svg class="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
              <path d="M0,16 Q30,16 60,30" fill="none" stroke="#2DD4BF" stroke-width="1.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Right Column - Phone Mockup Scroll Trigger Reveal */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          class="lg:col-span-4 flex justify-center lg:justify-end"
        >
          <PhoneMockup time="11:42" battery="100%">
            <LunchLogScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wavy Curve Transition */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-16 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C350,110 750,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
