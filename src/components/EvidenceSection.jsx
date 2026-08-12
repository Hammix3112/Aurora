import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import InsightsScreen from './PhoneScreens/InsightsScreen';
import { use3DTilt } from '../hooks/use3DTilt';

function Interactive3DCard({ children, className = '', depthZ = 20 }) {
  const { tiltStyle, shineStyle, handleMouseMove, handleMouseLeave } = use3DTilt(5, 1.02, depthZ);

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

export default function EvidenceSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-Driven Camera Zoom
  const cameraScale = useTransform(scrollYProgress, [0.55, 0.8], [1, 1.04]);

  return (
    <motion.section
      style={{ scale: cameraScale, perspective: '1200px' }}
      className="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden gpu-accelerated preserve-3d"
    >
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 preserve-3d">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 preserve-3d"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-700 uppercase font-grotesk">
            EVIDENCE-BACKED INSIGHTS
          </p>

          <h2 className="text-4xl sm:text-6xl font-serif leading-tight text-slate-900">
            Not another score.<br />
            A pattern you<br />
            can act on<span className="text-purple-600">.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-light">
            Aurora shows the dates and signals behind each pattern — and keeps association separate from causation.
          </p>

          {/* Connected Callouts with 3D Depth */}
          <div className="space-y-4 pt-2 relative preserve-3d">
            {/* Callout 1 */}
            <Interactive3DCard className="p-3.5 bg-white/90 backdrop-blur-md border border-purple-200/90 rounded-2xl shadow-md group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-start gap-3 relative">
                <div className="w-10 h-10 rounded-full border border-purple-300 bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 font-grotesk">View the evidence</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    See the days and signals that shape this pattern.
                  </p>
                </div>
              </div>
            </Interactive3DCard>

            {/* Callout 2 */}
            <Interactive3DCard className="p-3.5 bg-white/90 backdrop-blur-md border border-purple-200/90 rounded-2xl shadow-md group hover:border-purple-400 transition-all duration-300">
              <div className="flex items-start gap-3 relative">
                <div className="w-10 h-10 rounded-full border border-purple-300 bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 font-grotesk">Ask Aurora</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Question this pattern or explore related factors.
                  </p>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </motion.div>

        {/* Center-Right Parchment Layer & Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex justify-center lg:justify-end relative preserve-3d"
        >
          {/* Parchment background sheet behind phone with 3D Z-Displacement */}
          <div className="absolute -left-12 top-6 bottom-6 w-3/4 bg-amber-50/90 rounded-3xl border border-amber-200/80 shadow-xl -rotate-2 pointer-events-none hidden md:block preserve-3d" style={{ transform: 'translateZ(-15px)' }}></div>

          <PhoneMockup time="02:22" battery="77%">
            <InsightsScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wave Curve Transition to Deep Space Dark Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg className="relative block w-full h-16 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C300,90 600,-20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </motion.section>
  );
}
