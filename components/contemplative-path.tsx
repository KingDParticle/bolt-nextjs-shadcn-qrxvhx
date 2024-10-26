"use client";

import { Flame, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const practices = [
  {
    icon: Flame,
    title: "Divine Union",
    description: "Experience the profound unity of your soul with the Divine through contemplative prayer."
  },
  {
    icon: Moon,
    title: "Sacred Silence",
    description: "Enter the stillness where divine wisdom speaks in the language of the heart."
  },
  {
    icon: Sun,
    title: "Inner Light",
    description: "Awaken to the eternal light of Christ consciousness dwelling within your being."
  }
];

export function ContemplativePath() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-rose-200 mb-4">
            The Contemplative Path
          </h2>
          <p className="text-amber-100/80 max-w-2xl mx-auto">
            Walk the ancient path of Christian mysticism, where silence becomes prayer and every breath a communion with the Divine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-purple-900/20 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative bg-black/30 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-colors">
                <practice.icon className="w-8 h-8 text-amber-300 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-amber-200 mb-2">
                  {practice.title}
                </h3>
                <p className="text-amber-100/80">
                  {practice.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
      </div>
    </section>
  );
}