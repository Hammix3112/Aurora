import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import InsightsScreen from './PhoneScreens/InsightsScreen';

export default function EvidenceSection() {
  return (
    <section className="relative w-full bg-[#F7F4EE] text-slate-900 py-24 overflow-hidden">
      {/* Top Flowing Wave Curve Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-1 pointer-events-none">
        <svg className="relative block w-full h-14 text-[#04060E]" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 L1200,0 L1200,40 C900,110 500,-20 0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
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
          <div className="space-y-6 pt-4 relative">
            {/* Callout 1 */}
            <div className="flex items-start gap-3 relative group">
              <div className="w-10 h-10 rounded-full border border-purple-300 bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Eye className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 font-grotesk">View the evidence</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  See the days and signals that shape this pattern.
                </p>
              </div>
            </div>

            {/* Callout 2 */}
            <div className="flex items-start gap-3 relative group">
              <div className="w-10 h-10 rounded-full border border-purple-300 bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 font-grotesk">Ask Aurora</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Question this pattern or explore related factors.
                </p>
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
          className="lg:col-span-6 flex justify-center lg:justify-end relative"
        >
          {/* Parchment background sheet behind phone */}
          <div className="absolute -left-12 top-6 bottom-6 w-3/4 bg-amber-50/80 rounded-3xl border border-amber-200/60 shadow-inner -rotate-2 pointer-events-none hidden md:block"></div>

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
    </section>
  );
}
