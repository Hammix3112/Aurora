import React, { useEffect, useRef } from 'react';

export default function ResetPortalCanvas({ activeTab = 'Unwind' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (canvas) observer.observe(canvas);

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const sparkles = [];
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return; // Skip if off-screen

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.62;
      const centerY = height * 0.5;

      const primaryColor = activeTab === 'Sleep' ? '#818CF8' : activeTab === 'Focus' ? '#38BDF8' : '#C084FC';
      const secondaryColor = activeTab === 'Sleep' ? '#C084FC' : activeTab === 'Focus' ? '#2DD4BF' : '#818CF8';

      const ringCount = 10;
      for (let r = 1; r <= ringCount; r++) {
        ctx.beginPath();

        const radiusBase = r * 28 + Math.sin(time + r * 0.3) * 6;
        const pointCount = 40;

        for (let i = 0; i <= pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2;
          const waveDistort =
            Math.sin(angle * 4 + time * 1.5 + r * 0.4) * (10 + r * 1.2) +
            Math.cos(angle * 3 - time * 1.2) * 6;

          const distance = radiusBase + waveDistort;
          const x = centerX + Math.cos(angle) * distance * 1.35;
          const y = centerY + Math.sin(angle) * distance;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();

        const alpha = Math.max(0.05, 0.45 - (r / ringCount) * 0.35);
        ctx.strokeStyle = r % 2 === 0 ? primaryColor : secondaryColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      sparkles.forEach((s) => {
        s.alpha += Math.sin(time * s.speed * 50) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.8, s.alpha));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
