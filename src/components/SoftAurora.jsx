import React, { useEffect, useRef } from 'react';

export default function SoftAurora({
  speed = 0.6,
  scale = 1.5,
  brightness = 1.0,
  color1 = '#1961a9',
  color2 = '#51e3da',
  color3 = '#9333ea',
  noiseFrequency = 2.0,
  noiseAmplitude = 1.2,
  bandHeight = 0.5,
  bandSpread = 0.6,
  layerOffset = 0.4,
  colorSpeed = 0.7,
  enableMouseInteraction = true,
  mouseInfluence = 0.25,
  style = {},
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
    };

    const handleMouseMove = (e) => {
      if (!enableMouseInteraction || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.01 * speed;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Base Deep Space Tint
      ctx.fillStyle = '#050711';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';

      // 1. Soft Aurora Flowing Wave Layers
      const layers = 4;
      for (let l = 0; l < layers; l++) {
        ctx.beginPath();

        const layerY = height * (bandHeight + (l - 1.5) * 0.12);
        ctx.moveTo(0, height);
        ctx.lineTo(0, layerY);

        const step = 15;
        for (let x = 0; x <= width + step; x += step) {
          const mouseDist = Math.hypot(x - mouse.x, layerY - mouse.y);
          const mouseWarp = Math.exp(-Math.pow(mouseDist / 250, 2)) * 40 * mouseInfluence;

          const wave1 = Math.sin(x * 0.003 * noiseFrequency + time * 1.2 + l * layerOffset) * 60 * noiseAmplitude;
          const wave2 = Math.cos(x * 0.0015 - time * 0.8 + l) * 35;
          const wave3 = Math.sin(x * 0.006 + time * 0.5) * 20;

          const y = layerY + wave1 + wave2 + wave3 + (l % 2 === 0 ? mouseWarp : -mouseWarp);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, layerY - 150, width, layerY + 200);
        if (l % 3 === 0) {
          grad.addColorStop(0, 'rgba(25, 97, 169, 0)');
          grad.addColorStop(0.4, 'rgba(25, 97, 169, 0.45)');
          grad.addColorStop(0.8, 'rgba(81, 227, 218, 0.55)');
          grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
        } else if (l % 3 === 1) {
          grad.addColorStop(0, 'rgba(81, 227, 218, 0)');
          grad.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)');
          grad.addColorStop(0.9, 'rgba(25, 97, 169, 0.5)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(0, 'rgba(147, 51, 234, 0)');
          grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.5)');
          grad.addColorStop(0.8, 'rgba(81, 227, 218, 0.35)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 2. Mouse Glow Aura Spot
      if (enableMouseInteraction) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 300);
        mouseGlow.addColorStop(0, 'rgba(81, 227, 218, 0.25)');
        mouseGlow.addColorStop(0.5, 'rgba(147, 51, 234, 0.12)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, scale, brightness, color1, color2, color3, noiseFrequency, noiseAmplitude, bandHeight, bandSpread, layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
