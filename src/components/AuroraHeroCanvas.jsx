import React, { useEffect, useRef } from 'react';

export default function AuroraHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Accessibility check: respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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

    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
    };

    const handleMouseMove = (e) => {
      if (isMobile || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.offsetWidth;
      const newH = canvas.parentElement.offsetHeight;
      if (Math.abs(newW - width) > 10 || Math.abs(newH - height) > 80) {
        width = canvas.width = newW;
        height = canvas.height = newH;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Distant Twinkling Micro Stars (reduced count on mobile)
    const starCount = isMobile ? 35 : 80;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 1.5 + 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // 2. High-Density Living Aurora Particles (Optimized particle count on mobile for 60FPS)
    const particles = [];
    const particleCount = isMobile ? 55 : 180;
    for (let i = 0; i < particleCount; i++) {
      const isFastStreamer = i % 3 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isFastStreamer ? Math.random() * 1.6 + 0.8 : Math.random() * 1.2 + 0.4,
        vx: isFastStreamer ? Math.random() * 1.6 + 0.8 : (Math.random() - 0.5) * 0.3,
        vy: isFastStreamer ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.3,
        color: i % 4 === 0 ? '#38BDF8' : i % 4 === 1 ? '#C084FC' : i % 4 === 2 ? '#51E3DA' : '#818CF8',
        alpha: Math.random() * 0.6 + 0.25,
        isFastStreamer,
      });
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += prefersReducedMotion ? 0.002 : 0.008;

      // Mouse smooth spotlight interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Distant Twinkling Micro Stars
      ctx.globalCompositeOperation = 'source-over';
      stars.forEach((s) => {
        const alpha = prefersReducedMotion
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.offset) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, alpha));
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Additive Blending for Volumetric Aurora Energy Ribbons
      ctx.globalCompositeOperation = 'lighter';

      const phoneX = width * 0.75;
      const phoneY = height * 0.5;

      // Cursor Lighting Spotlight
      if (!isMobile) {
        const cursorSpot = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 380);
        cursorSpot.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
        cursorSpot.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
        cursorSpot.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorSpot;
        ctx.fillRect(0, 0, width, height);
      }

      // Soft Volumetric Nebula Fog Spots
      const cyanGlow = ctx.createRadialGradient(phoneX, phoneY, 20, phoneX, phoneY, width * 0.38);
      cyanGlow.addColorStop(0, 'rgba(81, 227, 218, 0.18)');
      cyanGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      cyanGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, 0, width, height);

      const purpleGlow = ctx.createRadialGradient(width * 0.4, height * 0.45, 20, width * 0.4, height * 0.45, width * 0.32);
      purpleGlow.addColorStop(0, 'rgba(192, 132, 252, 0.16)');
      purpleGlow.addColorStop(0.6, 'rgba(129, 140, 248, 0.06)');
      purpleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Diagonal Procedural Noise Energy Ribbons Flowing Across Hero
      const ribbonConfigs = [
        { startY: height * 0.15, amplitude: 55, freq: 0.0035, speed: 0.8, color1: '#C084FC', color2: '#818CF8', width: 2.8 },
        { startY: height * 0.32, amplitude: 70, freq: 0.0028, speed: 0.6, color1: '#818CF8', color2: '#38BDF8', width: 3.2 },
        { startY: height * 0.48, amplitude: 60, freq: 0.0042, speed: 1.0, color1: '#38BDF8', color2: '#51E3DA', width: 3.0 },
        { startY: height * 0.64, amplitude: 75, freq: 0.0031, speed: 0.7, color1: '#51E3DA', color2: '#C084FC', width: 2.5 },
        { startY: height * 0.82, amplitude: 48, freq: 0.0040, speed: 0.9, color1: '#F472B6', color2: '#38BDF8', width: 2.0 },
      ];

      ribbonConfigs.forEach((cfg, idx) => {
        ctx.beginPath();
        const startX = width * 0.15;
        ctx.moveTo(startX, cfg.startY);

        for (let x = startX; x <= width + 20; x += 12) {
          const phoneProximity = Math.exp(-Math.pow((x - phoneX) / 190, 2));
          const diagonalShift = (x - startX) * 0.12;
          const noiseWave =
            Math.sin(x * cfg.freq + time * cfg.speed + idx * 1.4) * cfg.amplitude +
            Math.cos(x * 0.0018 - time * 0.5 + idx) * 24 +
            phoneProximity * Math.sin(time * 1.8 + idx) * 38;

          const y = cfg.startY + diagonalShift + noiseWave;
          ctx.lineTo(x, y);
        }

        const ribbonGrad = ctx.createLinearGradient(startX, 0, width, 0);
        ribbonGrad.addColorStop(0, 'rgba(0,0,0,0)');
        ribbonGrad.addColorStop(0.25, cfg.color1);
        ribbonGrad.addColorStop(0.75, cfg.color2);
        ribbonGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = cfg.width;
        ctx.shadowBlur = isMobile ? 8 : 18;
        ctx.shadowColor = cfg.color1;
        ctx.stroke();
      });

      // 4. Energetic Flowing Runner Silhouette Ribbon on Far Right
      const streamX = width * 0.88;
      ctx.beginPath();
      for (let y = height * 0.08; y <= height * 0.92; y += 8) {
        const streamWave = Math.sin(y * 0.007 + time * 1.8) * 32 + Math.cos(y * 0.014 - time * 0.8) * 16;
        const x = streamX + streamWave;
        if (y === height * 0.08) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const streamGrad = ctx.createLinearGradient(0, height * 0.08, 0, height * 0.92);
      streamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
      streamGrad.addColorStop(0.45, 'rgba(81, 227, 218, 0.75)');
      streamGrad.addColorStop(1, 'rgba(234, 179, 8, 0.65)');
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = isMobile ? 10 : 22;
      ctx.shadowColor = '#51E3DA';
      ctx.stroke();

      // 5. Living Aurora Particles
      ctx.globalCompositeOperation = 'source-over';
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width + 20) p.x = 0;
        if (p.x < -20) p.x = width;
        if (p.y > height + 20) p.y = 0;
        if (p.y < -20) p.y = height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = isMobile ? 3 : p.radius * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
