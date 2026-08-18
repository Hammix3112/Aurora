import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Utensils, Footprints, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from './PhoneMockup';
import ChatScreen from './PhoneScreens/ChatScreen';

gsap.registerPlugin(ScrollTrigger);

export default function AskDataSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const { scrollYProgress } = useScroll();

  // Scroll-Driven Camera Zoom & 3D Phone Rotation
  const cameraScale = useTransform(scrollYProgress, [0.35, 0.6], [1, 1.03]);
  const phoneRotateY = useTransform(scrollYProgress, [0.35, 0.6], [-3, 6]);
  const phoneY = useTransform(scrollYProgress, [0.35, 0.6], [15, -15]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = cardsRef.current.filter(Boolean);

    gsap.fromTo(
      cards,
      { opacity: 0, x: 30, scale: 0.94 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Ask Your Data Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-28 overflow-hidden gpu-accelerated preserve-3d z-10"
    >

      {/* Volumetric Soft Ambient Parchment Lighting Spot */}
      <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 via-cyan-100/30 to-transparent rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 preserve-3d">
        
        {/* Left Side Container: Text Content & Prompt Cards (col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center preserve-3d">
          
          {/* Main Headline */}
          <div className="sm:col-span-7 space-y-6 preserve-3d">
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
          </div>

          {/* Floating Context Cards */}
          <div className="sm:col-span-5 space-y-6 select-none relative preserve-3d">
            {/* Top Context Card */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="parchment-card-3d depth-card rounded-2xl p-3 shadow-lg relative group transition-all duration-300 preserve-3d cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3" style={{ transform: 'translateZ(10px)' }}>
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
            </div>

            {/* Bottom Context Card */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="parchment-card-3d depth-card rounded-2xl p-3 shadow-lg relative group transition-all duration-300 preserve-3d cursor-pointer"
            >
              <div className="flex items-start gap-2.5" style={{ transform: 'translateZ(10px)' }}>
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
            </div>
          </div>
        </div>

        {/* Right Side Container: Phone Mockup */}
        <motion.div
          style={{ rotateY: phoneRotateY, y: phoneY }}
          className="lg:col-span-5 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-purple-300/30 via-cyan-200/20 to-teal-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="03:18" battery="77%">
            <ChatScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Organic Sweeping Dune Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg className="relative block w-full h-20 sm:h-28 md:h-32 text-[#04060E]" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,50 C240,-10 520,80 900,95 C1150,105 1320,95 1440,90 L1440,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
