"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AncientScrolls() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTexts = [
    {
      title: "The First Seal",
      text: "In the beginning was the Word, and the Word was Light, and the Light was Truth.",
      symbol: "☀"
    },
    {
      title: "The Crystal Mind",
      text: "Through the prism of consciousness, all wisdom flows like rivers of light.",
      symbol: "✧"
    },
    {
      title: "The Sacred Path",
      text: "Four-fold is the way of enlightenment, each path leading to divine unity.",
      symbol: "✴"
    },
    {
      title: "The Quartz Gateway",
      text: "Within the crystal matrix lies the key to dimensional transcendence.",
      symbol: "⚛"
    }
  ];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40" />
      
      <div className="relative max-w-4xl mx-auto">
        <div 
          ref={scrollRef}
          className="grid grid-cols-2 gap-8"
        >
          {scrollTexts.map((scroll, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-purple-900/10 rounded-lg transform rotate-1" />
              <div className="relative bg-black/30 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl text-amber-300">{scroll.symbol}</span>
                  <h3 className="text-xl font-serif font-semibold text-amber-200">
                    {scroll.title}
                  </h3>
                </div>
                <p className="text-amber-100/80 font-serif">
                  {scroll.text}
                </p>
                <div className="absolute bottom-2 right-2 opacity-30 text-xs">
                  {Array(4).fill('✧').join(' ')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}