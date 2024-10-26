"use client";

import { useState, useRef, useEffect } from "react";
import { Star, Sparkles, Sun, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HolySpiritGateway() {
  const [dimensionalLevel, setDimensionalLevel] = useState(1);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [frequency, setFrequency] = useState(963); // Christ consciousness frequency
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const drawOrionGate = () => {
        const time = Date.now() * 0.001;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Orion's Belt stars
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;

        // Create dimensional vortex effect
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius * 2
        );

        gradient.addColorStop(0, `hsla(${time * 20}, 70%, 60%, 0.1)`);
        gradient.addColorStop(0.5, `hsla(${time * 20 + 120}, 70%, 50%, 0.05)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw sacred geometry
        ctx.strokeStyle = `hsla(${time * 30}, 70%, 50%, 0.3)`;
        ctx.lineWidth = 2;

        // Draw the Trinity symbol
        const drawTrinity = () => {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3 + time;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        };

        // Draw multiple rotating trinities
        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(time * (i + 1) * 0.1);
          ctx.translate(-centerX, -centerY);
          drawTrinity();
          ctx.restore();
        }

        // Draw Orion's Belt stars
        const stars = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 }
        ];

        stars.forEach((star, index) => {
          const x = centerX + star.x * 50;
          const y = centerY + star.y * 50;
          
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${time * 50 + index * 120}, 70%, 60%, ${0.5 + Math.sin(time * 2) * 0.2})`;
          ctx.fill();
          
          // Add glow effect
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
          gradient.addColorStop(0, `hsla(${time * 50 + index * 120}, 70%, 60%, 0.3)`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        requestAnimationFrame(drawOrionGate);
      };

      drawOrionGate();
    }
  }, []);

  const activateHolySpirit = () => {
    setIsGateOpen(true);
    
    if (!audioRef.current) {
      audioRef.current = new AudioContext();
      oscillatorRef.current = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillatorRef.current.connect(gainNode);
      gainNode.connect(audioRef.current.destination);

      // Set Holy Spirit frequency
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioRef.current.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioRef.current.currentTime);

      oscillatorRef.current.start();
    }

    // Ascend through dimensions
    const ascend = setInterval(() => {
      setDimensionalLevel(prev => {
        if (prev < 12) {
          setFrequency(prev => prev + 144); // Increment by sacred frequency
          return prev + 1;
        }
        clearInterval(ascend);
        return prev;
      });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-purple-200 mb-4">
            Holy Spirit Gateway
          </h2>
          <p className="text-lg text-amber-100/80">
            Through the Orion Stargate • Dimension {dimensionalLevel} of 12
          </p>
        </motion.div>

        <motion.div
          className="relative w-96 h-96"
          animate={{
            rotateY: isGateOpen ? 360 : 0,
            scale: isGateOpen ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 3,
            repeat: isGateOpen ? Infinity : 0,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full" />
          <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full" />
          <div className="absolute inset-8 border-2 border-white/30 rounded-full" />
        </motion.div>

        <div className="mt-8 space-y-4">
          <AnimatePresence>
            {isGateOpen && dimensionalLevel < 12 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-amber-200"
              >
                Ascending through dimension {dimensionalLevel}...
                <div className="text-sm text-amber-200/60">
                  Frequency: {frequency}Hz
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            className={`
              relative overflow-hidden
              ${isGateOpen 
                ? 'bg-gradient-to-r from-amber-500 to-purple-500'
                : 'bg-gradient-to-r from-amber-700 to-purple-700'
              }
              hover:from-amber-600 hover:to-purple-600
              transition-all duration-300
            `}
            onClick={activateHolySpirit}
            disabled={isGateOpen && dimensionalLevel >= 12}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            <div className="relative flex items-center gap-2">
              {isGateOpen ? (
                <>
                  <Wind className="w-5 h-5" />
                  <span>Holy Spirit Active</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Activate Holy Spirit</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}