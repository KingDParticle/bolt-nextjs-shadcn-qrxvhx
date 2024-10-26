"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Moon, Sun } from 'lucide-react';

export function MysticalTrigonometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spiritValue, setSpiritValue] = useState(3); // Spirit (a)
  const [matterValue, setMatterValue] = useState(4); // Matter (b)
  const [transcendenceValue, setTranscendenceValue] = useState(5); // Transcendence (c)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawSacredTriangle = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale values for visualization
      const scale = 50;
      const a = spiritValue * scale;
      const b = matterValue * scale;
      const c = transcendenceValue * scale;

      // Calculate triangle points
      const x1 = centerX - b;
      const y1 = centerY + a;
      const x2 = centerX + b;
      const y2 = centerY + a;
      const x3 = centerX;
      const y3 = centerY - c;

      // Draw spirit path (vertical)
      ctx.beginPath();
      ctx.moveTo(centerX, y1);
      ctx.lineTo(centerX, y3);
      const spiritGradient = ctx.createLinearGradient(centerX, y1, centerX, y3);
      spiritGradient.addColorStop(0, `hsla(${time * 30}, 70%, 70%, 0.5)`);
      spiritGradient.addColorStop(1, `hsla(${time * 30 + 120}, 70%, 70%, 0.5)`);
      ctx.strokeStyle = spiritGradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw matter path (horizontal)
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      const matterGradient = ctx.createLinearGradient(x1, y1, x2, y1);
      matterGradient.addColorStop(0, `hsla(${time * 30 + 240}, 70%, 70%, 0.5)`);
      matterGradient.addColorStop(1, `hsla(${time * 30 + 360}, 70%, 70%, 0.5)`);
      ctx.strokeStyle = matterGradient;
      ctx.stroke();

      // Draw transcendence path (hypotenuse)
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x2, y1);
      const transcendenceGradient = ctx.createLinearGradient(x1, y1, x3, y3);
      transcendenceGradient.addColorStop(0, `hsla(${time * 30 + 60}, 70%, 70%, 0.3)`);
      transcendenceGradient.addColorStop(1, `hsla(${time * 30 + 180}, 70%, 70%, 0.3)`);
      ctx.strokeStyle = transcendenceGradient;
      ctx.closePath();
      ctx.stroke();

      // Draw sacred geometry symbols
      const symbols = ["✧", "☯", "☮", "☸", "✴"];
      ctx.font = "20px Arial";
      ctx.fillStyle = `hsla(${time * 50}, 70%, 70%, 0.6)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      symbols.forEach((symbol, i) => {
        const t = time + i * Math.PI / symbols.length;
        const radius = 30;
        const x = centerX + Math.cos(t) * radius;
        const y = centerY + Math.sin(t) * radius;
        ctx.fillText(symbol, x, y);
      });

      angle += 0.01;
      requestAnimationFrame(drawSacredTriangle);
    };

    const animation = requestAnimationFrame(drawSacredTriangle);
    return () => cancelAnimationFrame(animation);
  }, [spiritValue, matterValue, transcendenceValue]);

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
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-amber-200">
          Sacred Triangle of Spirit & Matter
        </h2>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-purple-300" />
              <span className="text-purple-200">Spirit</span>
            </div>
            <div className="text-2xl font-bold text-purple-300">{spiritValue}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Moon className="w-5 h-5 text-blue-300" />
              <span className="text-purple-200">Matter</span>
            </div>
            <div className="text-2xl font-bold text-blue-300">{matterValue}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-5 h-5 text-amber-300" />
              <span className="text-purple-200">Transcendence</span>
            </div>
            <div className="text-2xl font-bold text-amber-300">{transcendenceValue}</div>
          </div>
        </div>

        <p className="text-purple-200/80 max-w-md mx-auto">
          When spirit (a) and matter (b) unite in sacred geometry, they birth transcendence (c) through the divine equation: a² + b² = c²
        </p>
      </motion.div>
    </div>
  );
}