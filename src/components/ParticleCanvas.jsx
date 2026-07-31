import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ variant = 'hero' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = variant === 'hero' ? 140 : 90;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: i % 3 === 0 ? 'rgba(56, 189, 248, 0.8)' : i % 3 === 1 ? 'rgba(192, 132, 252, 0.8)' : 'rgba(45, 212, 191, 0.8)',
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw dynamic glowing sine wave energy ribbons on the right side
      if (variant === 'hero') {
        const waveCount = 5;
        for (let j = 0; j < waveCount; j++) {
          ctx.beginPath();
          const startY = height * 0.4 + j * 30;
          ctx.moveTo(width * 0.3, startY);

          for (let x = width * 0.3; x <= width; x += 10) {
            const y =
              startY +
              Math.sin(x * 0.005 + time + j * 0.5) * 40 +
              Math.cos(x * 0.003 - time) * 20;
            ctx.lineTo(x, y);
          }

          const strokeGradient = ctx.createLinearGradient(width * 0.3, 0, width, 0);
          strokeGradient.addColorStop(0, 'rgba(192, 132, 252, 0)');
          strokeGradient.addColorStop(0.4, 'rgba(129, 140, 248, 0.35)');
          strokeGradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.45)');
          strokeGradient.addColorStop(1, 'rgba(45, 212, 191, 0.6)');

          ctx.strokeStyle = strokeGradient;
          ctx.lineWidth = 2 + j * 0.5;
          ctx.shadowBlur = 15;
          ctx.shadowColor = j % 2 === 0 ? '#38BDF8' : '#C084FC';
          ctx.stroke();
        }
      }

      // Render Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
