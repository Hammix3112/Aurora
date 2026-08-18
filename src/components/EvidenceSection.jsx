import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import InsightsScreen from './PhoneScreens/InsightsScreen';

export default function EvidenceSection() {
  return (
    <section className="relative w-full bg-[#F7F4EE] text-slate-900 py-28 overflow-hidden gpu-accelerated preserve-3d z-10">

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

          {/* Connected Callouts */}
          <div className="space-y-4 pt-4 relative preserve-3d">
            {/* Callout 1 */}
            <div className="parchment-card-3d depth-card rounded-2xl p-4 shadow-lg relative group transition-all duration-300 preserve-3d cursor-pointer">
              <div className="flex items-start gap-3.5" style={{ transform: 'translateZ(10px)' }}>
                <div className="w-10 h-10 rounded-full border border-purple-300 bg-purple-100/80 flex items-center justify-center text-purple-700 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 font-grotesk">View the evidence</h4>
                  <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                    See the days and signals that shape this pattern.
                  </p>
                </div>
              </div>
            </div>

            {/* Callout 2 */}
            <div className="parchment-card-3d depth-card rounded-2xl p-4 shadow-lg relative group transition-all duration-300 preserve-3d cursor-pointer">
              <div className="flex items-start gap-3.5" style={{ transform: 'translateZ(10px)' }}>
                <div className="w-10 h-10 rounded-full border border-purple-300 bg-purple-100/80 flex items-center justify-center text-purple-700 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 font-grotesk">Ask Aurora</h4>
                  <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                    Question this pattern or explore related factors.
                  </p>
                </div>
              </div>
            </div>
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
          {/* Parchment background sheet behind phone */}
          <div className="absolute -left-12 top-6 bottom-6 w-3/4 bg-amber-50/80 rounded-3xl border border-amber-200/60 shadow-inner -rotate-2 pointer-events-none hidden md:block"></div>

          <PhoneMockup time="02:22" battery="77%">
            <InsightsScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Organic Sweeping Dune Curve Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg className="relative block w-full h-20 sm:h-28 md:h-32 text-[#04060E]" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,50 C240,-10 520,80 900,95 C1150,105 1320,95 1440,90 L1440,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

    </section>
  );
}
