import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Moon, Heart, Activity, Dumbbell } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from './PhoneMockup';
import ConnectedHealthScreen from './PhoneScreens/ConnectedHealthScreen';

gsap.registerPlugin(ScrollTrigger);

export default function ConnectedHealthSection() {
  const [activeSignal, setActiveSignal] = useState('Sleep');
  const sectionRef = useRef(null);
  const signalButtonsRef = useRef([]);

  const { scrollYProgress } = useScroll();

  // Scroll-Driven Cinematic Camera Zoom & 3D Phone Rotation
  const cameraScale = useTransform(scrollYProgress, [0.25, 0.5], [1, 1.04]);
  const rawRotateY = useTransform(scrollYProgress, [0.25, 0.5], [-4, 8]);
  const rawPhoneY = useTransform(scrollYProgress, [0.25, 0.5], [20, -15]);

  const phoneRotateY = useSpring(rawRotateY, { stiffness: 60, damping: 25, mass: 0.4 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 60, damping: 25, mass: 0.4 });

  const signals = [
    { name: 'Sleep', icon: Moon, color: 'text-purple-400', border: 'border-purple-500/60', shadow: 'shadow-purple-500/30' },
    { name: 'Recovery', icon: Heart, color: 'text-teal-400', border: 'border-teal-500/60', shadow: 'shadow-teal-500/30' },
    { name: 'Movement', icon: RunningIcon, color: 'text-cyan-400', border: 'border-cyan-500/60', shadow: 'shadow-cyan-500/30' },
    { name: 'HRV', icon: Activity, color: 'text-indigo-400', border: 'border-indigo-500/60', shadow: 'shadow-indigo-500/30' },
    { name: 'Workouts', icon: Dumbbell, color: 'text-pink-400', border: 'border-pink-500/60', shadow: 'shadow-pink-500/30' },
  ];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const btns = signalButtonsRef.current.filter(Boolean);

    gsap.fromTo(
      btns,
      { opacity: 0, scale: 0.7, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.5)',
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
      aria-label="Connected Health Section"
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#060814] text-white py-24 overflow-hidden gpu-accelerated preserve-3d z-10"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#F7F4EE]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Holographic Bloom Halo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-cyan-500/25 via-teal-500/20 to-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center preserve-3d">
        
        {/* Left Column Content */}
        <div className="lg:col-span-6 space-y-8 preserve-3d">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase font-grotesk">
              CONNECTED HEALTH
            </p>

            <h2 className="text-4xl sm:text-6xl font-serif leading-tight">
              Your wearable<br />
              collects signals.<br />
              Aurora connects<br />
              the story<span className="text-purple-400">.</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-md font-light">
              Sleep, recovery, heart rate, movement and workouts come together with your food and goals.
            </p>
          </div>

          {/* Signal Icon Stack with GSAP Stagger Reveal */}
          <div className="flex items-center gap-4 relative pt-2 preserve-3d">
            <div className="flex flex-row lg:flex-col gap-3">
              {signals.map((sig, idx) => {
                const IconComp = sig.icon;
                const isSelected = activeSignal === sig.name;
                return (
                  <button
                    type="button"
                    key={sig.name}
                    ref={(el) => (signalButtonsRef.current[idx] = el)}
                    aria-label={`Select ${sig.name} telemetry signal`}
                    onClick={() => setActiveSignal(sig.name)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? `bg-slate-900/90 ${sig.border} ${sig.color} scale-110 shadow-lg ${sig.shadow}`
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                    title={sig.name}
                  >
                    <IconComp className="w-4.5 h-4.5" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 hidden lg:block">
              <p className="text-xs text-slate-300 font-mono">
                Connected via <span className="text-cyan-300 font-semibold">{activeSignal}</span> live telemetry
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" aria-hidden="true"></span>
                <span className="text-[10px] text-teal-400/90 font-mono uppercase tracking-wider">Holographic Telemetry Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ rotateY: phoneRotateY, y: phoneY }}
          className="lg:col-span-6 flex justify-center lg:justify-end preserve-3d relative"
        >
          <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/30 via-teal-400/20 to-purple-600/25 rounded-[60px] blur-3xl pointer-events-none"></div>

          <PhoneMockup time="02:22" battery="77%">
            <ConnectedHealthScreen />
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

function RunningIcon(props) {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7.1 1.4z"/>
    </svg>
  );
}
