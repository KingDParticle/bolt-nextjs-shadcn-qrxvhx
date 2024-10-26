"use client";

import { useState, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface WisdomCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  fullContent: string;
  tier: number;
  frequency: number;
  lightCode: string;
  dimension: number;
  isSoundEnabled: boolean;
}

export function WisdomCard({
  icon: Icon,
  title,
  text,
  fullContent,
  tier,
  frequency,
  lightCode,
  dimension,
  isSoundEnabled,
}: WisdomCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState(1);
  const [dimensionalDepth, setDimensionalDepth] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const drawPrism = () => {
        const time = Date.now() * 0.001;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create rainbow prism effect
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const hueOffset = Math.sin(time) * 30;
        for (let i = 0; i <= 1; i += 0.1) {
          const hue = (hueOffset + i * 360) % 360;
          gradient.addColorStop(i, `hsla(${hue}, 70%, 50%, 0.1)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw light code symbols
        ctx.font = "20px 'Arial'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const symbols = lightCode.split("");
        symbols.forEach((symbol, index) => {
          const x = canvas.width / 2 + Math.cos(time + index) * 100;
          const y = canvas.height / 2 + Math.sin(time + index) * 100;
          ctx.fillStyle = `hsla(${(hueOffset + index * 60) % 360}, 70%, 50%, 0.8)`;
          ctx.fillText(symbol, x, y);
        });

        requestAnimationFrame(drawPrism);
      };

      drawPrism();
    }
  }, [isOpen, lightCode]);

  useEffect(() => {
    if (isOpen && isSoundEnabled && !audioContext.current) {
      audioContext.current = new AudioContext();
      oscillator.current = audioContext.current.createOscillator();
      gainNode.current = audioContext.current.createGain();

      oscillator.current.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);
      oscillator.current.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
      gainNode.current.gain.setValueAtTime(0.1, audioContext.current.currentTime);
      oscillator.current.start();
    }

    return () => {
      if (audioContext.current) {
        oscillator.current?.stop();
        audioContext.current.close();
        audioContext.current = null;
      }
    };
  }, [isOpen, isSoundEnabled, frequency]);

  const handleUnlock = () => {
    if (currentTier < tier) {
      setCurrentTier((prev) => prev + 1);
      setDimensionalDepth((prev) => prev + 1);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, z: 20 }}
        className={cn(
          "relative group rounded-xl p-6 backdrop-blur-sm border border-purple-500/20",
          "hover:border-purple-500/40 transition-all duration-300",
          "cursor-pointer cosmic-portal overflow-hidden"
        )}
        style={{
          background: `linear-gradient(135deg, 
            rgba(168, 85, 247, 0.1), 
            rgba(236, 72, 153, 0.1)
          )`,
          transform: `translateZ(${dimensionalDepth * 20}px)`,
        }}
        onClick={() => setIsOpen(true)}
      >
        <div className="prism-effect absolute inset-0 opacity-30" />
        
        <div className="relative z-10">
          <motion.div 
            className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="w-6 h-6 text-purple-300" />
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
            {title}
          </h3>
          
          <p className="text-purple-200/80">
            {text}
          </p>

          <div className="absolute bottom-2 right-2 text-xs text-purple-300/60">
            Dimension {dimension}
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/70 border-purple-500/20 max-w-2xl overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
              {title} - Dimension {dimension}
            </DialogTitle>
          </DialogHeader>
          
          <motion.div 
            className="space-y-4 py-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Icon className="w-8 h-8 text-purple-300" />
              <div className="flex-1 h-2 bg-purple-900/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentTier / tier) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-purple-200">
                Tier {currentTier}/{tier}
              </span>
            </div>

            <div className="light-code-display text-center py-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-light tracking-wider text-purple-300"
              >
                {lightCode}
              </motion.div>
            </div>

            <p className="text-purple-200/80 leading-relaxed">
              {fullContent}
            </p>

            {currentTier < tier && (
              <Button
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={handleUnlock}
              >
                Ascend to Next Dimension
              </Button>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}