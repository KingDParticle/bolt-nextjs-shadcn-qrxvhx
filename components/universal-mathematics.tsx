"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PHI = 1.618033988749895;

export function UniversalMathematics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScale, setCurrentScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseSize = Math.min(canvas.width, canvas.height) * 0.3;

    const drawGoldenSpiral = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create mystical background effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseSize * 2
      );
      gradient.addColorStop(0, `hsla(${time * 20}, 70%, 50%, 0.1)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.2);

      // Draw Fibonacci spiral
      let size = baseSize;
      let angle = 0;
      ctx.beginPath();
      ctx.moveTo(0, 0);

      for (let i = 0; i < 20; i++) {
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        ctx.lineTo(x, y);
        angle += Math.PI / 2;
        size /= PHI;
      }

      ctx.strokeStyle = `hsla(${time * 50}, 70%, 50%, 0.5)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sacred geometry overlay
      const drawSacredGeometry = () => {
        for (let i = 0; i < 5; i++) {
          const rotation = (i / 5) * Math.PI * 2 + time;
          ctx.save();
          ctx.rotate(rotation);
          
          // Draw pentagon
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            const angle = (j / 5) * Math.PI * 2;
            const radius = baseSize / (i + 1);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = `hsla(${time * 50 + i * 72}, 70%, 50%, 0.3)`;
          ctx.stroke();
          
          ctx.restore();
        }
      };

      drawSacredGeometry();
      ctx.restore();

      // Draw Fibonacci numbers
      const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      fibonacci.forEach((num, i) => {
        const angle = (i / fibonacci.length) * Math.PI * 2 + time;
        const radius = baseSize * 0.8;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.fillStyle = `hsla(${time * 50 + i * 45}, 70%, 50%, 0.8)`;
        ctx.fillText(num.toString(), x, y);
      });

      requestAnimationFrame(() => drawGoldenSpiral(time + 0.01));
    };

    drawGoldenSpiral(0);
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
        className="relative z-10 text-center space-y-8 p-8 bg-black/50 backdrop-blur-lg rounded-xl"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-purple-200">
          The Divine Proportion
        </h2>
        
        <div className="text-2xl font-mono text-amber-300">
          φ = {PHI.toFixed(8)}
        </div>
        
        <p className="text-purple-200/80 max-w-md mx-auto">
          In this sacred ratio lies the blueprint of creation, a bridge between finite and infinite.
        </p>
      </motion.div>
    </div>
  );
}