import React, { useEffect, useRef } from 'react';

export default function ResetPortalCanvas({ activeTab = 'Unwind' }) {
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

    // Particle sparkles inside wave mesh
    const sparkles = [];
    for (let i = 0; i < 90; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.62;
      const centerY = height * 0.5;

      // Color scheme based on active tab
      const primaryColor = activeTab === 'Sleep' ? '#818CF8' : activeTab === 'Focus' ? '#38BDF8' : '#C084FC';
      const secondaryColor = activeTab === 'Sleep' ? '#C084FC' : activeTab === 'Focus' ? '#2DD4BF' : '#818CF8';

      // Draw Layered Organic Concentric Portal Wave Contours
      const ringCount = 14;
      for (let r = 1; r <= ringCount; r++) {
        ctx.beginPath();

        const radiusBase = r * 24 + Math.sin(time + r * 0.3) * 8;
        const pointCount = 60;

        for (let i = 0; i <= pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2;
          
          // Organic fluid wave distortion
          const waveDistort =
            Math.sin(angle * 4 + time * 1.5 + r * 0.4) * (12 + r * 1.5) +
            Math.cos(angle * 3 - time * 1.2) * 8;

          const distance = radiusBase + waveDistort;
          const x = centerX + Math.cos(angle) * distance * 1.4;
          const y = centerY + Math.sin(angle) * distance;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();

        const alpha = Math.max(0.05, 0.55 - (r / ringCount) * 0.45);
        ctx.strokeStyle = r % 2 === 0 ? primaryColor : secondaryColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.2 + (r % 3 === 0 ? 1 : 0);
        ctx.shadowBlur = 12;
        ctx.shadowColor = primaryColor;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Draw sparkling stars inside wave mesh
      sparkles.forEach((s) => {
        s.alpha += Math.sin(time * s.speed * 50) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.9, s.alpha));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = s.radius * 4;
        ctx.shadowColor = secondaryColor;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  return <canvas ref={canvasRef} class="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}
