import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer class="w-full bg-[#03050B] text-slate-400 py-16 border-t border-slate-900 relative z-20">
      <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
        
        {/* Brand & Mission */}
        <div class="md:col-span-5 space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-lime-400 p-[1px]">
              <div class="w-full h-full rounded-full bg-[#03050B]"></div>
            </div>
            <span class="font-grotesk font-bold text-white text-lg tracking-widest">AURORA</span>
          </div>

          <p class="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
            Aurora is your private health intelligence partner. We surface evidence-backed patterns across food, sleep, recovery, and workouts while keeping your data under your complete control.
          </p>

          <div class="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
            <span class="flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5 text-teal-400" /> End-to-end encrypted
            </span>
            <span class="flex items-center gap-1">
              <Lock class="w-3.5 h-3.5 text-purple-400" /> Private by design
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div class="md:col-span-3 space-y-3 text-xs">
          <h4 class="font-grotesk font-semibold text-white uppercase tracking-wider text-[11px]">
            Product
          </h4>
          <ul class="space-y-2 text-slate-400 font-grotesk">
            <li><a href="#hero" class="hover:text-white transition-colors">Food Logging</a></li>
            <li><a href="#history" class="hover:text-white transition-colors">Built Over Time</a></li>
            <li><a href="#reset" class="hover:text-white transition-colors">Reset Studio</a></li>
            <li><a href="#evidence" class="hover:text-white transition-colors">Evidence Insights</a></li>
            <li><a href="#health" class="hover:text-white transition-colors">Wearable Connections</a></li>
          </ul>
        </div>

        {/* Beta Signup */}
        <div class="md:col-span-4 space-y-3">
          <h4 class="font-grotesk font-semibold text-white uppercase tracking-wider text-[11px]">
            Join Early Access
          </h4>
          <p class="text-xs text-slate-400">
            Be the first to access Aurora's connected intelligence beta.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <input
              type="email"
              placeholder="Enter your email"
              class="bg-slate-900 border border-slate-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 flex-1"
            />
            <button class="glow-btn-lime px-4 py-2.5 rounded-full font-grotesk font-semibold text-xs flex items-center justify-center shrink-0">
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div class="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-grotesk">
        <p>© {new Date().getFullYear()} Aurora Health Inc. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#privacy" class="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#terms" class="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#security" class="hover:text-slate-400 transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
