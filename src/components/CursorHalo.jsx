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

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={haloRef}
      className="fixed top-0 left-0 w-48 h-48 -ml-24 -mt-24 rounded-full bg-gradient-to-r from-purple-500/15 via-cyan-400/10 to-teal-400/15 blur-2xl pointer-events-none z-50 transition-opacity duration-300"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    />
  );
}
