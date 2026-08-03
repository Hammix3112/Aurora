import React, { useEffect, useRef } from 'react';

export default function AuroraHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Ribbons floating along energy paths
    const ribbonParticles = [];
    const particleCount = 110;
    for (let i = 0; i < particleCount; i++) {
      ribbonParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 0.8 + 0.3,
        offset: Math.random() * Math.PI * 2,
        color: i % 4 === 0 ? '#38BDF8' : i % 4 === 1 ? '#C084FC' : i % 4 === 2 ? '#2DD4BF' : '#818CF8',
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.012;

      ctx.clearRect(0, 0, width, height);

      // Additive blending for volumetric cinematic glow
      ctx.globalCompositeOperation = 'lighter';

      const phoneX = width * 0.75;
      const phoneY = height * 0.5;

      // 1. Volumetric Ambient Aurora Light Orbs
      const cyanGlow = ctx.createRadialGradient(phoneX, phoneY, 20, phoneX, phoneY, width * 0.35);
      cyanGlow.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      cyanGlow.addColorStop(0.5, 'rgba(45, 212, 191, 0.08)');
      cyanGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, 0, width, height);

      const purpleGlow = ctx.createRadialGradient(width * 0.45, height * 0.4, 20, width * 0.45, height * 0.4, width * 0.3);
      purpleGlow.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
      purpleGlow.addColorStop(0.6, 'rgba(99, 102, 241, 0.06)');
      purpleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Flowing Aurora Energy Ribbons Wrapping Around Phone (Cinematic Light Trails)
      const ribbonConfigs = [
        { startY: height * 0.2, amplitude: 50, freq: 0.004, speed: 1.0, color1: '#C084FC', color2: '#818CF8', width: 2.5 },
        { startY: height * 0.35, amplitude: 65, freq: 0.003, speed: 0.8, color1: '#818CF8', color2: '#38BDF8', width: 3.0 },
        { startY: height * 0.5, amplitude: 55, freq: 0.005, speed: 1.2, color1: '#38BDF8', color2: '#2DD4BF', width: 2.8 },
        { startY: height * 0.65, amplitude: 70, freq: 0.0035, speed: 0.9, color1: '#2DD4BF', color2: '#C084FC', width: 2.2 },
        { startY: height * 0.8, amplitude: 45, freq: 0.0045, speed: 1.1, color1: '#F472B6', color2: '#38BDF8', width: 1.8 },
      ];

      ribbonConfigs.forEach((cfg, idx) => {
        ctx.beginPath();
        const startX = width * 0.22;
        ctx.moveTo(startX, cfg.startY);

        for (let x = startX; x <= width; x += 10) {
          const phoneProximity = Math.exp(-Math.pow((x - phoneX) / 180, 2));
          const wave =
            Math.sin(x * cfg.freq + time * cfg.speed + idx) * cfg.amplitude +
            Math.cos(x * 0.002 - time * 0.7) * 20 +
            phoneProximity * Math.sin(time * 2 + idx) * 35;

          const y = cfg.startY + wave;
          ctx.lineTo(x, y);
        }

        const ribbonGrad = ctx.createLinearGradient(startX, 0, width, 0);
        ribbonGrad.addColorStop(0, 'rgba(0,0,0,0)');
        ribbonGrad.addColorStop(0.3, cfg.color1);
        ribbonGrad.addColorStop(0.7, cfg.color2);
        ribbonGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = cfg.width;
        ctx.shadowBlur = 16;
        ctx.shadowColor = cfg.color1;
        ctx.stroke();
      });

      // 3. Energetic Running Figure Particle Stream on Far Right (Matching Screenshot)
      const streamX = width * 0.88;
      ctx.beginPath();
      for (let y = height * 0.1; y <= height * 0.9; y += 8) {
        const streamWave = Math.sin(y * 0.008 + time * 2) * 30 + Math.cos(y * 0.015 - time) * 15;
        const x = streamX + streamWave;
        if (y === height * 0.1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const streamGrad = ctx.createLinearGradient(0, height * 0.1, 0, height * 0.9);
      streamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
      streamGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.7)');
      streamGrad.addColorStop(1, 'rgba(234, 179, 8, 0.6)');
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#2DD4BF';
      ctx.stroke();

      // 4. Floating Ribbon Sparkle Particles
      ctx.globalCompositeOperation = 'source-over';
      ribbonParticles.forEach((p) => {
        p.x += p.speed;
        p.y += Math.sin(time + p.offset) * 0.4;

        if (p.x > width) {
          p.x = width * 0.2;
          p.y = Math.random() * height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
