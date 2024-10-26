"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CosmicRoomProps {
  children: React.ReactNode;
  className?: string;
}

export function CosmicRoom({ children, className }: CosmicRoomProps) {
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const starFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup WebGL visualizer
    const canvas = visualizerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;
    }> = [];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 2 + 0.5,
          color: `hsl(${Math.random() * 60 + 240}, 70%, 50%)`
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.z -= particle.speed;

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width - canvas.width / 2;
          particle.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const scale = 1000 / (1000 - particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        if (x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${parseFloat(particle.color.match(/\d+/)![0])}, 70%, 50%, ${scale * 0.5})`;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // Create star field
    const starField = starFieldRef.current;
    if (starField) {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star-field';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 6}s`;
        starField.appendChild(star);
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={cn('cosmic-room relative w-full min-h-screen overflow-hidden', className)}>
      <canvas
        ref={visualizerRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      <div ref={starFieldRef} className="absolute inset-0 overflow-hidden" />
      
      <div className="cosmic-room-inner relative w-full min-h-screen">
        <div className="cosmic-wall wall-front" />
        <div className="cosmic-wall wall-back" />
        <div className="cosmic-wall wall-left" />
        <div className="cosmic-wall wall-right" />
        <div className="cosmic-wall wall-top" />
        <div className="cosmic-wall wall-bottom" />
        
        <div className="relative z-10 transform-gpu">
          {children}
        </div>
      </div>

      <div className="cosmic-visualizer" />
      <div className="energy-field" />
    </div>
  );
}