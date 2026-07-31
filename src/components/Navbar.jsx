import React from 'react';

export default function Navbar() {
  return (
    <header class="relative z-40 w-full pt-6 pb-4 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand Logo */}
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-400 to-cyan-300 p-[1.5px] shadow-lg shadow-purple-500/40">
          <div class="w-full h-full rounded-full bg-[#050711] flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-300 animate-pulse"></div>
          </div>
        </div>
        <span class="font-grotesk font-bold text-white text-lg tracking-[0.2em]">
          AURORA
        </span>
      </div>

      {/* Right Navigation Links & Join Beta CTA */}
      <div class="flex items-center gap-8">
        <nav class="hidden md:flex items-center gap-8 text-xs font-grotesk font-medium text-slate-300">
          <a href="#food" class="hover:text-white transition-colors">Food</a>
          <a href="#health" class="hover:text-white transition-colors">Connected health</a>
          <a href="#insights" class="hover:text-white transition-colors">Insights</a>
          <a href="#works" class="hover:text-white transition-colors">How it works</a>
        </nav>

        <button class="glow-btn-lime px-5 py-2 rounded-full font-grotesk font-semibold text-xs text-slate-950">
          Join the beta
        </button>
      </div>
    </header>
  );
}
