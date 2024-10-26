"use client";

import { Cross, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function DivinePresence() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-purple-900/60 to-black/90" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <div className="flex justify-center items-center gap-6 mb-8">
          <Cross className="w-8 h-8 text-amber-300" />
          <Heart className="w-6 h-6 text-rose-300" />
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 mb-6">
          Divine Presence
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-amber-100/90 leading-relaxed">
          Enter into the sacred silence where the Divine speaks to your soul. Here, in the depths of contemplation, you'll discover the eternal light that illuminates all truth.
        </p>

        <div className="mt-12 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-300/50 to-transparent" />
            <span className="text-amber-200/80 font-serif italic">
              "The Kingdom of Heaven is within you"
            </span>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent animate-pulse" />
      </div>
    </section>
  );
}