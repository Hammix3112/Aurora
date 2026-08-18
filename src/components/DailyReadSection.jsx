import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Utensils, Moon, Heart, Footprints } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from './PhoneMockup';
import TodayCalorieScreen from './PhoneScreens/TodayCalorieScreen';

gsap.registerPlugin(ScrollTrigger);

export default function DailyReadSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const svgPathsRef = useRef([]);
  const phoneContainerRef = useRef(null);

  const { scrollYProgress } = useScroll();

  // Scroll-Driven 3D Transformations with Spring Dampening
  const cameraScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 1.03]);
  const rawRotateY = useTransform(scrollYProgress, [0.1, 0.35], [-3, 5]);
  const rawPhoneY = useTransform(scrollYProgress, [0.1, 0.35], [15, -10]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 60, damping: 25, mass: 0.4 });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = cardsRef.current.filter(Boolean);
    const svgPaths = svgPathsRef.current.filter(Boolean);

    // Set initial GSAP states for smooth scrub waterfall
    gsap.set(cards, {
      opacity: 0,
      y: 45,
      rotateX: -12,
      scale: 0.94,
      transformOrigin: 'top center',
    });

    svgPaths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.8,
      });
    });

    // Create GSAP ScrollTrigger Timeline for Cards & Line Draw
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1.2,
      },
    });

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        i * 0.25
      );

      if (svgPaths[i]) {
        tl.to(
          svgPaths[i],
          {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          i * 0.25 + 0.2
        );
      }
    });

    // Subtle parallax float on Phone container
    if (phoneContainerRef.current) {
      gsap.to(phoneContainerRef.current, {
        y: -25,
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="One Daily Read Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-28 overflow-hidden perspective-1200 preserve-3d gpu-accelerated z-10"
    >
      {/* Ambient Lighting Radial Spot */}
      <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 via-amber-100/30 to-transparent rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 preserve-3d">
        
        {/* Left Column Content */}
        <div className="lg:col-span-4 space-y-6 preserve-3d">
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
        </div>

        {/* Center Column - GSAP Scrubbed Waterfall Cards */}
        <div className="lg:col-span-4 space-y-6 select-none relative preserve-3d">
          
          {/* Signal 1: BREAKFAST */}
          <div ref={(el) => (cardsRef.current[0] = el)} className="preserve-3d">
            <div className="parchment-card-3d depth-card relative flex items-center justify-between p-2.5 px-3 rounded-2xl border border-purple-200/90 shadow-lg group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0 shadow-sm">
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

              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-amber-200 shrink-0 bg-amber-100 flex items-center justify-center" style={{ transform: 'translateZ(18px)' }}>
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
                <path
                  ref={(el) => (svgPathsRef.current[0] = el)}
                  d="M0,20 Q40,20 80,0"
                  fill="none"
                  stroke="#C084FC"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Signal 2: SLEEP */}
          <div ref={(el) => (cardsRef.current[1] = el)} className="preserve-3d">
            <div className="parchment-card-3d depth-card relative p-3 rounded-2xl border border-purple-200/90 shadow-lg space-y-2 group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0 shadow-sm">
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

              <div className="flex items-end gap-1 h-6 pt-1 pl-12" style={{ transform: 'translateZ(14px)' }}>
                {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85, 45, 75, 55, 95, 35].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-1 rounded-t-sm ${i % 2 === 0 ? 'bg-purple-600' : 'bg-cyan-500'}`}
                  ></div>
                ))}
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path
                  ref={(el) => (svgPathsRef.current[1] = el)}
                  d="M0,20 Q40,20 80,10"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Signal 3: RECOVERY */}
          <div ref={(el) => (cardsRef.current[2] = el)} className="preserve-3d">
            <div className="parchment-card-3d depth-card relative p-3 rounded-2xl border border-teal-200/90 shadow-lg space-y-1 group hover:border-teal-400 transition-all duration-300">
              <div className="flex items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 shrink-0 shadow-sm">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-600 font-grotesk block">
                    RECOVERY
                  </span>
                  <span className="text-sm font-bold text-teal-700 font-grotesk">81% Good</span>
                </div>
              </div>

              <div className="h-6 pl-12" style={{ transform: 'translateZ(14px)' }}>
                <svg className="w-full h-full" viewBox="0 0 150 20" fill="none" aria-hidden="true">
                  <path d="M0,15 Q30,5 60,12 T120,3 T150,10" stroke="#0D9488" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path
                  ref={(el) => (svgPathsRef.current[2] = el)}
                  d="M0,20 Q40,20 80,20"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Signal 4: WORKOUT */}
          <div ref={(el) => (cardsRef.current[3] = el)} className="preserve-3d">
            <div className="parchment-card-3d depth-card relative p-3 rounded-2xl border border-cyan-200/90 shadow-lg space-y-1 group hover:border-cyan-400 transition-all duration-300">
              <div className="flex items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                <div className="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700 shrink-0 shadow-sm">
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

              <div className="h-6 pl-12" style={{ transform: 'translateZ(14px)' }}>
                <svg className="w-full h-full" viewBox="0 0 150 20" fill="none" aria-hidden="true">
                  <path d="M0,18 L30,12 L60,16 L90,4 L120,14 L150,8" stroke="#0284C7" strokeWidth="2" fill="none" />
                  <circle cx="30" cy="12" r="2.5" fill="#0284C7" />
                  <circle cx="90" cy="4" r="2.5" fill="#7C3AED" />
                  <circle cx="150" cy="8" r="2.5" fill="#0284C7" />
                </svg>
              </div>

              <svg className="absolute left-full top-1/2 w-20 h-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible" aria-hidden="true">
                <path
                  ref={(el) => (svgPathsRef.current[3] = el)}
                  d="M0,20 Q40,20 80,30"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column - Phone Showcase */}
        <motion.div
          ref={phoneContainerRef}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateY: phoneRotateY, y: phoneY }}
          className="lg:col-span-4 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-purple-300/30 via-cyan-200/20 to-teal-200/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="02:14" battery="76%">
            <TodayCalorieScreen />
          </PhoneMockup>
        </motion.div>
      </div>
    </motion.section>
  );
}
