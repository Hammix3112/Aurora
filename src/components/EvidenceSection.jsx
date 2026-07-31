import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import InsightsScreen from './PhoneScreens/InsightsScreen';

export default function EvidenceSection() {
  return (
    <section class="relative w-full bg-parchment text-slate-900 py-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          class="lg:col-span-6 space-y-6"
        >
          <p class="text-xs font-semibold tracking-[0.2em] text-purple-700 uppercase font-grotesk">
            EVIDENCE-BACKED INSIGHTS
          </p>

          <h2 class="text-4xl sm:text-6xl font-serif leading-tight text-slate-900">
            Not another score.<br />
            A pattern you<br />
            can act on<span class="text-purple-600">.</span>
          </h2>

          <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-light">
            Aurora shows the dates and signals behind each pattern — and keeps association separate from causation.
          </p>

          {/* Connected Callouts */}
          <div class="space-y-6 pt-4 relative">
            {/* Callout 1 */}
            <div class="flex items-start gap-3 relative group">
              <div class="w-10 h-10 rounded-full border border-purple-300 bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Eye class="w-4 h-4" />
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-bold text-slate-900 font-grotesk">View the evidence</h4>
                <p class="text-[11px] text-slate-500 leading-snug">
                  See the days and signals that shape this pattern.
                </p>
              </div>
            </div>

            {/* Callout 2 */}
            <div class="flex items-start gap-3 relative group">
              <div class="w-10 h-10 rounded-full border border-purple-300 bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle class="w-4 h-4" />
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-bold text-slate-900 font-grotesk">Ask Aurora</h4>
                <p class="text-[11px] text-slate-500 leading-snug">
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
          class="lg:col-span-6 flex justify-center lg:justify-end relative"
        >
          {/* Parchment background sheet behind phone */}
          <div class="absolute -left-12 top-6 bottom-6 w-3/4 bg-amber-50/80 rounded-3xl border border-amber-200/60 shadow-inner -rotate-2 pointer-events-none hidden md:block"></div>

          <PhoneMockup time="02:22" battery="77%">
            <InsightsScreen />
          </PhoneMockup>
        </motion.div>
      </div>

      {/* Bottom Wave Curve Transition to Deep Space Dark Section */}
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg class="relative block w-full h-16 text-[#060814]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,90 600,-20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
