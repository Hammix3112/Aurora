import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ variant = 'hero' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Pause rendering loop when canvas is off-screen using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (canvas) observer.observe(canvas);

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.offsetWidth;
      const newH = canvas.parentElement.offsetHeight;

      // Only update canvas dimensions if there is a significant width or height change (prevents flickering on mobile scroll address-bar toggle)
      if (Math.abs(newW - width) > 10 || Math.abs(newH - height) > 80) {
        width = canvas.width = newW;
        height = canvas.height = newH;
      }
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = variant === 'hero' ? 70 : 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        color: i % 3 === 0 ? 'rgba(56, 189, 248, 0.7)' : i % 3 === 1 ? 'rgba(192, 132, 252, 0.7)' : 'rgba(45, 212, 191, 0.7)',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return; // Skip rendering if off-screen!

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Energy ribbons
      if (variant === 'hero' || variant === 'health') {
        const waveCount = 4;
        for (let j = 0; j < waveCount; j++) {
          ctx.beginPath();
          const startY = height * 0.4 + j * 32;
          ctx.moveTo(width * 0.3, startY);

          for (let x = width * 0.3; x <= width; x += 15) {
            const y =
              startY +
              Math.sin(x * 0.005 + time + j * 0.5) * 35 +
              Math.cos(x * 0.003 - time) * 18;
            ctx.lineTo(x, y);
          }

          const strokeGradient = ctx.createLinearGradient(width * 0.3, 0, width, 0);
          strokeGradient.addColorStop(0, 'rgba(192, 132, 252, 0)');
          strokeGradient.addColorStop(0.5, 'rgba(129, 140, 248, 0.3)');
          strokeGradient.addColorStop(1, 'rgba(56, 189, 248, 0.5)');

          ctx.strokeStyle = strokeGradient;
          ctx.lineWidth = 1.5 + j * 0.4;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38BDF8';
          ctx.stroke();
        }
      }

      // Particles
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
  }, [variant]);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
