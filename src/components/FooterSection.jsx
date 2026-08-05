import React from 'react';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#03050B] text-slate-400 py-16 border-t border-slate-900 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
        
        {/* Brand & Mission */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-lime-400 p-[1px]">
              <div className="w-full h-full rounded-full bg-[#03050B]"></div>
            </div>
            <span className="font-grotesk font-bold text-white text-lg tracking-widest">AURORA</span>
          </div>

          <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-light">
            Aurora is your private health intelligence partner. We surface evidence-backed patterns across food, sleep, recovery, and workouts while keeping your data under your complete control.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-300 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" /> End-to-end encrypted
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" /> Private by design
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer Navigation" className="md:col-span-3 space-y-3 text-xs">
          <h3 className="font-grotesk font-semibold text-white uppercase tracking-wider text-[11px]">
            Product
          </h3>
          <ul className="space-y-2 text-slate-300 font-grotesk">
            <li><a href="#food" className="hover:text-white transition-colors">Food Logging</a></li>
            <li><a href="#history" className="hover:text-white transition-colors">Built Over Time</a></li>
            <li><a href="#reset" className="hover:text-white transition-colors">Reset Studio</a></li>
            <li><a href="#evidence" className="hover:text-white transition-colors">Evidence Insights</a></li>
            <li><a href="#health" className="hover:text-white transition-colors">Wearable Connections</a></li>
          </ul>
        </nav>

        {/* Beta Signup Form */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="font-grotesk font-semibold text-white uppercase tracking-wider text-[11px]">
            Join Early Access
          </h3>
          <p className="text-xs text-slate-300">
            Be the first to access Aurora's connected intelligence beta.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
            <label htmlFor="footer-email" className="sr-only">
              Email address for early access
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              aria-label="Email address for early access"
              placeholder="Enter your email"
              className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 flex-1"
            />
            <button
              type="submit"
              aria-label="Submit email for early access"
              className="glow-btn-lime px-4 py-2.5 rounded-full font-grotesk font-semibold text-xs flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-grotesk">
        <p>© {new Date().getFullYear()} Aurora Health Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#security" className="hover:text-slate-200 transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
