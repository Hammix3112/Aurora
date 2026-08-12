import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for smooth 3D mouse tilt and dynamic perspective movement
 * Automatically disables on mobile/touch devices to prevent scroll flickering
 */
export function use3DTilt(maxTilt = 8, scale = 1.02) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice) return; // Skip 3D tilt calculations on mobile touch screens to prevent flickering

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      });
    },
    [maxTilt, scale, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
    });
  }, []);

  return { tiltStyle, handleMouseMove, handleMouseLeave };
}
