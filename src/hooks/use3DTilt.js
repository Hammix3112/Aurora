import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Premium 3D mouse tilt hook with dynamic shadow shift and glass glare
 * Automatically disables on mobile/touch devices
 *
 * @param {number} maxTilt - Maximum tilt angle in degrees (default: 8)
 * @param {number} scale - Scale factor on hover (default: 1.02)
 * @param {boolean} enableShadow - Enable dynamic shadow shift (default: true)
 * @returns {{ tiltStyle, glareStyle, handleMouseMove, handleMouseLeave }}
 */
export function use3DTilt(maxTilt = 8, scale = 1.02, enableShadow = true) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => {
      window.removeEventListener('resize', checkTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  });

  const [glareStyle, setGlareStyle] = useState({
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 10,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Dynamic shadow that moves opposite to tilt
      const shadowX = -rotateY * 1.5;
      const shadowY = rotateX * 1.5;

      // Specular glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      const shadowStr = enableShadow
        ? `${shadowX.toFixed(1)}px ${(12 + shadowY).toFixed(1)}px 35px -8px rgba(0, 0, 0, 0.25), 0 0 20px rgba(147, 51, 234, 0.08)`
        : undefined;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        ...(shadowStr && { boxShadow: shadowStr }),
      });

      setGlareStyle({
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
        opacity: 1,
        transition: 'opacity 0.3s ease',
        zIndex: 10,
      });
    },
    [maxTilt, scale, isTouchDevice, enableShadow]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    });
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave };
}
