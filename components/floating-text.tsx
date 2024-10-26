"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LIGHT_CODES = ["✧", "☯", "☮", "✴", "⚛", "✺", "◈", "❈", "☸", "⚕"];

export function FloatingText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lightCodes: Array<{
      x: number;
      y: number;
      symbol: string;
      speed: number;
      opacity: number;
      scale: number;
    }> = [];

    // Initialize light codes
    for (let i = 0; i < 30; i++) {
      lightCodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: LIGHT_CODES[Math.floor(Math.random() * LIGHT_CODES.length)],
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        scale: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw light codes
      lightCodes.forEach(code => {
        code.y -= code.speed;
        code.x += Math.sin(code.y * 0.02) * 0.5;
        
        if (code.y < -20) {
          code.y = canvas.height + 20;
          code.x = Math.random() * canvas.width;
        }

        const time = Date.now() * 0.001;
        ctx.font = `${20 * code.scale}px Arial`;
        ctx.fillStyle = `hsla(${time * 50 % 360}, 70%, 50%, ${code.opacity})`;
        ctx.fillText(code.symbol, code.x, code.y);

        // Add glow effect
        ctx.shadowColor = `hsla(${time * 50 % 360}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.fillText(code.symbol, code.x, code.y);
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-purple-900/30 to-black/70 z-0"
        style={{
          transform: `translateZ(-100px) scale(1.5)`
        }}
      />
      
      <motion.div
        className="relative z-10 text-center space-y-8 p-12"
        style={{
          transformStyle: "preserve-3d",
          transform: `
            rotateX(${mousePosition.y * 20}deg)
            rotateY(${mousePosition.x * 20}deg)
            translateZ(50px)
          `
        }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mix-blend-overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-300/80 via-pink-300/80 to-purple-300/80 blur-sm">
              Cosmic
            </span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
              Cosmic
            </span>
          </span>
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-amber-200/80 via-purple-300/80 to-amber-200/80 blur-sm">
              Awakening
            </span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-purple-300 to-amber-200">
              Awakening
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: `translateZ(75px)`
          }}
        >
          Journey through dimensions of consciousness and unlock the secrets of your divine nature
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            transform: `translateZ(100px)`
          }}
        >
          {LIGHT_CODES.slice(0, 4).map((symbol, index) => (
            <span
              key={index}
              className="text-3xl text-purple-300/80 animate-pulse relative"
              style={{
                animationDelay: `${index * 0.2}s`,
                transform: `translateZ(${120 + index * 20}px)`
              }}
            >
              <span className="absolute inset-0 blur-sm">{symbol}</span>
              <span className="relative">{symbol}</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating particles with translucent glow */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle at center, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0))`,
              boxShadow: `0 0 20px 10px rgba(168, 85, 247, 0.1)`
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, Math.random() * -100],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
}