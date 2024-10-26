"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function YinYang() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.6;

    const drawYinYang = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius * 1.2
      );
      glowGradient.addColorStop(0, `hsla(${time * 20}, 70%, 50%, 0.2)`);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw main circle
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.5);

      // Draw Yin (dark) half
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI);
      ctx.fillStyle = `hsla(240, 70%, 20%, 0.9)`;
      ctx.fill();

      // Draw Yang (light) half
      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI, Math.PI * 2);
      ctx.fillStyle = `hsla(60, 70%, 90%, 0.9)`;
      ctx.fill();

      // Draw the curved S-shape
      ctx.beginPath();
      ctx.arc(0, -radius/2, radius/2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(240, 70%, 20%, 0.9)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, radius/2, radius/2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(60, 70%, 90%, 0.9)`;
      ctx.fill();

      // Draw small circles
      ctx.beginPath();
      ctx.arc(0, -radius/2, radius/6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(60, 70%, 90%, 0.9)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, radius/2, radius/6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(240, 70%, 20%, 0.9)`;
      ctx.fill();

      // Draw sacred geometry overlay
      const drawSacredGeometry = () => {
        ctx.strokeStyle = `hsla(${time * 30}, 70%, 50%, 0.2)`;
        ctx.lineWidth = 2;

        // Draw hexagram
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      };

      drawSacredGeometry();
      ctx.restore();

      // Draw flowing energy particles
      const particles = 12;
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2 + time;
        const x = centerX + Math.cos(angle) * (radius * 1.2);
        const y = centerY + Math.sin(angle) * (radius * 1.2);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${time * 100 + i * 30}, 70%, 50%, ${0.5 + Math.sin(time + i) * 0.3})`;
        ctx.fill();
      }

      requestAnimationFrame(() => drawYinYang(time + 0.01));
    };

    drawYinYang(0);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/90">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 text-center space-y-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-amber-200">
          The Eternal Dance of Duality
        </h2>
        
        <p className="text-gray-300/80 max-w-md mx-auto">
          In perfect balance, light and shadow dance eternally, each containing the seed of its opposite.
        </p>
      </motion.div>
    </div>
  );
}