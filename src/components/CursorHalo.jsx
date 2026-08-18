import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorHalo() {
  const haloRef = useRef(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    // Check touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      halo.style.display = 'none';
      return;
    }

    // High performance gsap.quickTo lerpers
    const xTo = gsap.quickTo(halo, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(halo, 'y', { duration: 0.35, ease: 'power2.out' });

    // Color themes for dark vs light sections
    const darkGradient = 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(56,189,248,0.12) 40%, rgba(45,212,191,0.08) 70%, transparent 100%)';
    const lightGradient = 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, rgba(234,179,8,0.08) 40%, rgba(217,119,6,0.05) 70%, transparent 100%)';
    let currentTheme = 'dark';

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Detect section background under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const section = el.closest('section');
        if (section) {
          const bg = getComputedStyle(section).backgroundColor;
          // Light parchment sections have rgb values > 200
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          const isLight = match && parseInt(match[1]) > 180;
          const newTheme = isLight ? 'light' : 'dark';
          if (newTheme !== currentTheme) {
            currentTheme = newTheme;
            gsap.to(halo, {
              background: isLight ? lightGradient : darkGradient,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={haloRef}
      className="fixed top-0 left-0 w-52 h-52 -ml-26 -mt-26 rounded-full blur-2xl pointer-events-none z-50"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(56,189,248,0.12) 40%, rgba(45,212,191,0.08) 70%, transparent 100%)',
      }}
    />
  );
}
