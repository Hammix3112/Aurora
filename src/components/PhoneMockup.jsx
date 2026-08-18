import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function PhoneMockup({ children, time = '11:42', battery = '100%', className = '' }) {
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tiltTransform, setTiltTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 8;

      setTiltTransform(
        `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1)`
      );

      // Specular glass glare that follows mouse
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        opacity: 1,
      });
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltTransform('rotateX(0deg) rotateY(-5deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[620px] select-none group ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Ambient Glow Halo */}
      <div className="absolute -inset-6 rounded-[58px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.2) 0%, rgba(56,189,248,0.12) 35%, rgba(45,212,191,0.08) 60%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Phone Case Frame with 3D Tilt */}
      <div
        className="relative w-full h-full bg-[#161B2E] p-2.5 rounded-[46px] border border-slate-700/80 flex flex-col justify-between overflow-hidden"
        style={{
          transform: tiltTransform || 'rotateX(0deg) rotateY(-5deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.2),
            0 8px 16px rgba(0,0,0,0.3),
            0 24px 48px -8px rgba(0,0,0,0.5),
            0 0 40px rgba(138,92,245,0.15),
            0 0 20px rgba(56,189,248,0.1)
          `,
        }}
      >
        {/* Left Side Volume Buttons */}
        <div className="absolute -left-[5px] top-24 w-[4px] h-10 bg-slate-700 rounded-l-md" style={{ transform: 'translateZ(2px)' }} />
        <div className="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-700 rounded-l-md" style={{ transform: 'translateZ(2px)' }} />

        {/* Right Side Power Button */}
        <div className="absolute -right-[5px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md" style={{ transform: 'translateZ(2px)' }} />

        {/* Specular Glass Glare Overlay */}
        <div
          className="absolute inset-0 rounded-[46px] pointer-events-none z-20 transition-opacity duration-300"
          style={glareStyle}
        />

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#080B18] rounded-[38px] overflow-hidden border border-slate-800 flex flex-col justify-between">

          {/* Status Bar */}
          <div className="bg-black/90 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-mono tracking-tighter shrink-0 z-30">
            <span className="font-medium text-slate-200">{time}</span>

            {/* Top Punch Hole Camera & Speaker */}
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-black border border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-indigo-900 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <span className="text-[9px] font-semibold text-teal-400">{battery}</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Main Phone Content Screen */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>

          {/* Navigation Bar */}
          <div className="bg-black/95 py-1.5 px-8 flex items-center justify-between text-slate-500 shrink-0 z-30 border-t border-slate-900">
            <button className="hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <button className="hover:text-white transition-colors">
              <div className="w-3 h-3 rounded-full border-2 border-current"></div>
            </button>
            <button className="hover:text-white transition-colors">
              <div className="w-3 h-3 border-2 border-current rounded-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
