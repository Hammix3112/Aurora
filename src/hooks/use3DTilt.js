import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for ultra-smooth 3D mouse tilt, specular shine reflection & dynamic perspective
 * Automatically disables on mobile/touch devices to prevent scroll flickering
 */
export function use3DTilt(maxTilt = 8, scale = 1.02, depthZ = 16) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [shineStyle, setShineStyle] = useState({
    opacity: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
    transition: 'opacity 0.5s ease',
  });

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
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const [tiltStyle, setTiltStyle] = useState({
    transform: `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`,
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
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
      const percentX = ((x / rect.width) * 100).toFixed(1);
      const percentY = ((y / rect.height) * 100).toFixed(1);

      setTiltStyle({
        transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${depthZ}px) scale3d(${scale}, ${scale}, 1)`,
        transition: 'transform 0.12s cubic-bezier(0.1, 0.4, 0.2, 1)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      });

      setShineStyle({
        opacity: 0.8,
        background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 75%)`,
        transition: 'opacity 0.2s ease',
      });
    },
    [maxTilt, scale, depthZ, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    });

    setShineStyle({
      opacity: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
      transition: 'opacity 0.5s ease',
    });
  }, []);

  return { tiltStyle, shineStyle, handleMouseMove, handleMouseLeave };
}
