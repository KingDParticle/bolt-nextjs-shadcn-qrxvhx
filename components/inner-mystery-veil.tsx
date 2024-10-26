"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Key, Eye, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MYSTERY_LEVELS = [
  {
    name: "The Veil",
    symbol: "✧",
    frequency: 432,
    message: "Beyond the veil lies eternal truth"
  },
  {
    name: "Holy Grail",
    symbol: "✟",
    frequency: 528,
    message: "The chalice of divine wisdom fills with light"
  },
  {
    name: "Inner Diamond",
    symbol: "◈",
    frequency: 639,
    message: "Crystal clarity of the awakened mind"
  },
  {
    name: "Crown Seal",
    symbol: "☸",
    frequency: 963,
    message: "The crown chakra opens to cosmic consciousness"
  }
];

export function InnerMysteryVeil() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isVeilLifted, setIsVeilLifted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawMysticPortal = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(centerX, centerY) * 0.8;

      // Draw sacred geometry layers
      for (let i = 0; i < 7; i++) {
        const radius = maxRadius * (1 - i * 0.1);
        const rotation = time * (i + 1) * 0.1;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Draw geometric pattern
        ctx.beginPath();
        for (let j = 0; j < 12; j++) {
          const angle = (j / 12) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        // Create crystalline gradient effect
        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gradient.addColorStop(0, `hsla(${time * 50 + i * 60}, 70%, 50%, ${isVeilLifted ? 0.3 : 0.1})`);
        gradient.addColorStop(1, `hsla(${time * 50 + i * 60 + 180}, 70%, 50%, ${isVeilLifted ? 0.3 : 0.1})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }

      // Draw light codes
      if (isVeilLifted) {
        const symbols = MYSTERY_LEVELS[currentLevel].symbol.repeat(3);
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        symbols.split('').forEach((symbol, index) => {
          const angle = (index / symbols.length) * Math.PI * 2 + time;
          const x = centerX + Math.cos(angle) * (maxRadius * 0.5);
          const y = centerY + Math.sin(angle) * (maxRadius * 0.5);
          
          ctx.fillStyle = `hsla(${time * 100}, 70%, 50%, 0.8)`;
          ctx.fillText(symbol, x, y);
        });
      }

      requestAnimationFrame(drawMysticPortal);
    };

    drawMysticPortal();
  }, [isVeilLifted, currentLevel]);

  const liftVeil = () => {
    setIsVeilLifted(true);
    
    if (!audioRef.current) {
      audioRef.current = new AudioContext();
      oscillatorRef.current = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillatorRef.current.connect(gainNode);
      gainNode.connect(audioRef.current.destination);

      oscillatorRef.current.frequency.setValueAtTime(
        MYSTERY_LEVELS[currentLevel].frequency,
        audioRef.current.currentTime
      );
      gainNode.gain.setValueAtTime(0.1, audioRef.current.currentTime);

      oscillatorRef.current.start();
    }
  };

  const transcendLevel = () => {
    if (currentLevel < MYSTERY_LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      
      if (oscillatorRef.current && audioRef.current) {
        oscillatorRef.current.frequency.setValueAtTime(
          MYSTERY_LEVELS[currentLevel + 1].frequency,
          audioRef.current.currentTime
        );
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-purple-200 to-amber-200">
              {MYSTERY_LEVELS[currentLevel].name}
            </h2>
            
            <div className="text-6xl mb-8 animate-pulse">
              {MYSTERY_LEVELS[currentLevel].symbol}
            </div>

            <p className="text-lg text-amber-100/80 max-w-md mx-auto">
              {MYSTERY_LEVELS[currentLevel].message}
            </p>

            {!isVeilLifted ? (
              <Button
                onClick={liftVeil}
                className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lift the Veil
              </Button>
            ) : currentLevel < MYSTERY_LEVELS.length - 1 ? (
              <Button
                onClick={transcendLevel}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Crown className="w-4 h-4 mr-2" />
                Transcend
              </Button>
            ) : (
              <div className="text-amber-200 animate-pulse">
                ✧ Inner Mystery Unveiled ✧
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}