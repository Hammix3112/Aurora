import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-navbar-scrolled py-3' : 'glass-navbar py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" aria-label="Aurora Health Home" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-400 to-cyan-300 p-[1.5px] shadow-lg shadow-purple-500/40">
            <div className="w-full h-full rounded-full bg-[#050711] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-300 animate-pulse"></div>
            </div>
          </div>
          <span className="font-grotesk font-bold text-white text-lg tracking-[0.2em]">
            AURORA
          </span>
        </a>

        {/* Right Navigation Links & Join Beta CTA */}
        <div className="flex items-center gap-8">
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-xs font-grotesk font-medium text-slate-300">
            <a href="#food" className="hover:text-white transition-colors duration-300 relative group focus:outline-none focus:text-white">
              Food
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#health" className="hover:text-white transition-colors duration-300 relative group focus:outline-none focus:text-white">
              Connected health
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#insights" className="hover:text-white transition-colors duration-300 relative group focus:outline-none focus:text-white">
              Insights
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#works" className="hover:text-white transition-colors duration-300 relative group focus:outline-none focus:text-white">
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          <button
            type="button"
            aria-label="Join the beta waitlist"
            className="glow-btn-lime px-5 py-2 rounded-full font-grotesk font-semibold text-xs text-slate-950 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Join the beta
          </button>
        </div>
      </div>
    </header>
  );
}
