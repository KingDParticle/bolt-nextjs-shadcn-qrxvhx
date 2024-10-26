"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SACRED_SYMBOLS = [
  'יהוה', // YHWH
  '✡', '☮', '☯', '⚛',
  '⌭', '⍟', '⎈', '⎊',
  '∞', '⚡', '✧', '✴',
  '⚕', '☄', '✺', '⚘',
  '❈', '◈', '⚝', '✵',
  '△', '○', '□', '☸',
  'א', 'ב', 'ג', 'ד',
  'ה', 'ו', 'ז', 'ח',
  'ט', 'י', 'כ', 'ל'
];

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = new Array(columns).fill(1);
    const symbols: string[] = new Array(columns).fill('');

    const getRandomSymbol = () => {
      return SACRED_SYMBOLS[Math.floor(Math.random() * SACRED_SYMBOLS.length)];
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create shimmering effect
      const time = Date.now() * 0.001;
      
      drops.forEach((drop, i) => {
        const x = i * 20;
        const y = drop * 20;

        // Update symbol if needed
        if (!symbols[i] || Math.random() < 0.05) {
          symbols[i] = getRandomSymbol();
        }

        // Calculate color based on position and time
        const hue = (time * 50 + i * 10) % 360;
        const brightness = Math.sin(time + i) * 20 + 70;
        ctx.fillStyle = `hsla(${hue}, 70%, ${brightness}%, 0.8)`;
        
        // Draw symbol with glow effect
        ctx.shadowColor = `hsla(${hue}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.font = '20px Arial';
        ctx.fillText(symbols[i], x, y);
        ctx.shadowBlur = 0;

        // Reset drop or move it down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      // Draw sacred geometry overlay
      ctx.strokeStyle = `hsla(${time * 30}, 70%, 50%, 0.1)`;
      ctx.lineWidth = 2;

      // Draw Merkaba
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.3;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.1);

      // Draw two intersecting triangles
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        for (let j = 0; j < 3; j++) {
          const angle = (j * Math.PI * 2) / 3 + (i * Math.PI) / 3;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 p-8 bg-black/50 backdrop-blur-lg rounded-xl"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Divine Matrix
          </h2>
          <p className="text-emerald-200/80">
            Through the veil of symbols, ancient wisdom flows
          </p>
        </motion.div>
      </div>
    </div>
  );
}