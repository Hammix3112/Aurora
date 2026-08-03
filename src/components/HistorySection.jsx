import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Clock, Heart, Footprints, Dumbbell, Moon, Utensils } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import InsightsScreen from './PhoneScreens/InsightsScreen';

export default function HistorySection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Transformations for 3D Timeline Journey
  const cameraScale = useTransform(scrollYProgress, [0.75, 0.95], [1, 1.04]);
  const phoneRotateY = useTransform(scrollYProgress, [0.75, 0.95], [-4, 8]);
  const phoneY = useTransform(scrollYProgress, [0.75, 0.95], [20, -15]);
  const cardRotateX = useTransform(scrollYProgress, [0.75, 0.92], [6, 0]);

  const daysData = [
    { day: 'MON', date: '22', sleep: '7h 23m', rec: '62', recLabel: 'Fair', recColor: 'text-amber-600', steps: '8,219', workout: 'Strength', icon: Dumbbell },
    { day: 'TUE', date: '23', sleep: '7h 01m', rec: '54', recLabel: 'Low', recColor: 'text-rose-500', steps: '6,219', workout: 'Run', icon: Footprints },
    { day: 'WED', date: '24', sleep: '6h 38m', rec: '48', recLabel: 'Low', recColor: 'text-rose-500', steps: '6,112', workout: 'Mobility', icon: ActivityIcon },
    { day: 'THU', date: '25', sleep: '6h 38m', rec: '48', recLabel: 'Low', recColor: 'text-rose-500', steps: '5,683', workout: 'Strength', icon: Dumbbell },
    { day: 'FRI', date: '26', sleep: '7h 11m', rec: '64', recLabel: 'Fair', recColor: 'text-amber-600', steps: '8,944', workout: 'Strength', icon: Dumbbell },
    { day: 'SAT', date: '27', sleep: '7h 39m', rec: '72', recLabel: 'Good', recColor: 'text-teal-600', steps: '9,842', workout: 'Run', icon: Footprints },
    { day: 'SUN', date: '28', sleep: '8h 16m', rec: '76', recLabel: 'Good', recColor: 'text-teal-600', steps: '10,843', workout: 'Rest', icon: Moon },
  ];

  return (
    <motion.section
      style={{ scale: cameraScale, perspective: '1200px' }}
      class="relative w-full bg-parchment text-slate-900 py-20 overflow-hidden gpu-accelerated preserve-3d"
    >
      {/* Volumetric Soft Parchment Lighting Spot */}
      <div class="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-200/35 via-purple-100/30 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      {/* Decorative Dried Flower Accent Top Center */}
      <div class="absolute top-6 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none">
        <svg class="w-16 h-16 text-amber-800/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 preserve-3d">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12 preserve-3d">
          
          {/* Left Column Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            class="lg:col-span-6 space-y-6 preserve-3d"
          >
            <p class="text-xs font-semibold tracking-[0.2em] text-purple-700 uppercase font-grotesk">
              BUILT OVER TIME
            </p>

            <h2 class="text-4xl sm:text-6xl font-serif text-slate-900 leading-tight">
              Your history<br />
              becomes useful<span class="text-purple-600">.</span>
            </h2>

            <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
              As your days add up, Aurora can surface steadier patterns across food, sleep, recovery and training.
            </p>

            {/* Feature Callouts */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div class="flex items-start gap-3 group">
                <div class="w-10 h-10 rounded-full border border-purple-300 bg-white/80 flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 group-hover:border-purple-500 transition-all duration-300">
                  <BookOpen class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 font-grotesk">Open the evidence</h4>
                  <p class="text-[11px] text-slate-500 leading-snug">Explore any pattern and see the dates behind it.</p>
                </div>
              </div>

              <div class="flex items-start gap-3 group">
                <div class="w-10 h-10 rounded-full border border-purple-300 bg-white/80 flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 group-hover:border-purple-500 transition-all duration-300">
                  <Clock class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 font-grotesk">Your timeline</h4>
                  <p class="text-[11px] text-slate-500 leading-snug">Your days, ordered. Your patterns, revealed.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Phone Mockup Suspended in 3D Space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [-6, 6, -6],
              rotateZ: [-0.8, 0.8, -0.8],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 0.8, ease: 'easeOut' },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotateZ: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ rotateY: phoneRotateY, y: phoneY }}
            class="lg:col-span-6 flex justify-center lg:justify-end relative preserve-3d"
          >
            {/* Handwritten style annotation note above phone */}
            <div class="absolute -top-10 left-4 sm:left-12 max-w-[220px] text-purple-900 font-handwriting text-lg sm:text-xl leading-snug -rotate-3 z-20 pointer-events-none hidden sm:block">
              More sleep, earlier dinner and strength sessions align with higher recovery.
              <span class="block text-2xl text-purple-500">⤵</span>
            </div>

            {/* Backing Ambient Halo */}
            <div class="absolute -inset-6 bg-gradient-to-tr from-purple-300/30 via-amber-200/25 to-teal-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

            <PhoneMockup time="02:22" battery="77%">
              <InsightsScreen />
            </PhoneMockup>
          </motion.div>
        </div>

        {/* Weekly Paper Timeline Log Breakdown Card Rising from 3D Depth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ rotateX: cardRotateX }}
          class="parchment-card rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-x-auto border border-amber-200/80 preserve-3d group hover:shadow-2xl transition-all duration-500"
        >
          <div class="flex items-center justify-between border-b border-amber-900/10 pb-3 mb-4 text-xs font-grotesk">
            <span class="text-amber-900/60 font-semibold tracking-wider uppercase text-[10px]">APRIL</span>
            <span class="text-purple-700 font-mono text-[10px] font-semibold">APR 22 — APR 28</span>
          </div>

          <div class="grid grid-cols-7 min-w-[700px] gap-2 divide-x divide-amber-900/10">
            {daysData.map((d) => {
              const IconComp = d.icon;
              return (
                <div key={d.date} class="px-2 text-center space-y-3">
                  {/* Date Header */}
                  <div>
                    <span class="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">{d.day}</span>
                    <span class="text-base font-bold text-slate-900 font-grotesk">{d.date}</span>
                  </div>

                  {/* Meals row */}
                  <div class="flex items-center justify-center gap-1 text-[10px] text-amber-700 bg-amber-50 rounded-lg py-1">
                    <Utensils class="w-3 h-3 text-amber-600" />
                    <span>Meals</span>
                  </div>

                  {/* Sleep row */}
                  <div class="space-y-0.5">
                    <div class="flex items-center justify-center gap-1 text-[10px] text-purple-700">
                      <Moon class="w-3 h-3 text-purple-600" />
                      <span class="font-medium">{d.sleep}</span>
                    </div>
                    <div class="w-full bg-purple-100 rounded-full h-1">
                      <div class="bg-purple-600 h-1 rounded-full w-4/5"></div>
                    </div>
                  </div>

                  {/* Recovery score */}
                  <div class="space-y-0.5">
                    <div class="flex items-center justify-center gap-1 text-[10px]">
                      <Heart class={`w-3 h-3 ${d.recColor}`} />
                      <span class="font-bold">{d.rec}</span>
                    </div>
                    <span class={`text-[9px] block ${d.recColor}`}>{d.recLabel}</span>
                  </div>

                  {/* Steps */}
                  <div class="flex items-center justify-center gap-1 text-[10px] text-slate-700 font-mono">
                    <Footprints class="w-3 h-3 text-teal-600" />
                    <span>{d.steps}</span>
                  </div>

                  {/* Workout */}
                  <div class="inline-flex items-center gap-1 bg-purple-50 text-purple-800 text-[9px] px-2 py-0.5 rounded-full border border-purple-200">
                    <IconComp class="w-2.5 h-2.5" />
                    <span>{d.workout}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Curved Bottom Wave Transition to Dark Section */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-12 text-[#080A16]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}

function ActivityIcon(props) {
  return (
    <svg class="w-3 h-3 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}
