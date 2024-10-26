"use client";

import { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function SacredGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const project3DTo2D = (point: Point3D, distance: number = 400): { x: number; y: number } => {
    const scale = distance / (distance + point.z);
    return {
      x: point.x * scale,
      y: point.y * scale
    };
  };

  const drawMerkaba = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    size: number,
    rotation: number
  ) => {
    // Create two tetrahedrons
    const tetrahedron1Points: Point3D[] = [
      { x: size, y: 0, z: 0 },
      { x: -size/2, y: size * Math.sqrt(3)/2, z: 0 },
      { x: -size/2, y: -size * Math.sqrt(3)/2, z: 0 },
      { x: 0, y: 0, z: size * Math.sqrt(2/3) }
    ];

    const tetrahedron2Points: Point3D[] = tetrahedron1Points.map(p => ({
      x: p.x,
      y: p.y,
      z: -p.z
    }));

    // Rotate points
    const rotatedPoints1 = tetrahedron1Points.map(p => ({
      x: p.x * Math.cos(rotation) - p.y * Math.sin(rotation),
      y: p.x * Math.sin(rotation) + p.y * Math.cos(rotation),
      z: p.z
    }));

    const rotatedPoints2 = tetrahedron2Points.map(p => ({
      x: p.x * Math.cos(rotation) - p.y * Math.sin(rotation),
      y: p.x * Math.sin(rotation) + p.y * Math.cos(rotation),
      z: p.z
    }));

    // Project and draw first tetrahedron
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.lineWidth = 2;

    rotatedPoints1.forEach((point, i) => {
      const projected = project3DTo2D(point);
      const nextPoint = rotatedPoints1[(i + 1) % rotatedPoints1.length];
      const projectedNext = project3DTo2D(nextPoint);

      ctx.moveTo(centerX + projected.x, centerY + projected.y);
      ctx.lineTo(centerX + projectedNext.x, centerY + projectedNext.y);
    });

    ctx.stroke();

    // Project and draw second tetrahedron
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(147, 112, 219, 0.6)';

    rotatedPoints2.forEach((point, i) => {
      const projected = project3DTo2D(point);
      const nextPoint = rotatedPoints2[(i + 1) % rotatedPoints2.length];
      const projectedNext = project3DTo2D(nextPoint);

      ctx.moveTo(centerX + projected.x, centerY + projected.y);
      ctx.lineTo(centerX + projectedNext.x, centerY + projectedNext.y);
    });

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;
    let animationFrameId: number;

    const drawSacredGeometry = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Merkaba
      drawMerkaba(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        100,
        rotation
      );

      rotation += 0.01;
      animationFrameId = requestAnimationFrame(drawSacredGeometry);
    };

    drawSacredGeometry();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0 bg-black"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}