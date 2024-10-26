"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Star, Sun, Moon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DivineMessage {
  id: string;
  sender: string;
  message: string;
  lightCode: string;
  frequency: number;
}

const DIVINE_BEINGS = [
  { name: "Metatron", frequency: 963, symbol: "⚡" },
  { name: "Melchizedek", frequency: 528, symbol: "☀" },
  { name: "Sandalphon", frequency: 432, symbol: "✧" },
  { name: "Gabriel", frequency: 741, symbol: "☽" },
  { name: "Michael", frequency: 852, symbol: "⚔" },
  { name: "Raphael", frequency: 639, symbol: "⚕" },
  { name: "Uriel", frequency: 396, symbol: "⚘" },
  { name: "Zadkiel", frequency: 417, symbol: "⚛" },
  { name: "Chamuel", frequency: 594, symbol: "❤" },
  { name: "Jophiel", frequency: 285, symbol: "✴" },
  { name: "Azrael", frequency: 174, symbol: "☮" },
  { name: "Haniel", frequency: 963, symbol: "✡" }
];

export function DivineChat() {
  const [messages, setMessages] = useState<DivineMessage[]>([]);
  const [currentFrequency, setCurrentFrequency] = useState(432);
  const [activeBeings, setActiveBeings] = useState<string[]>([]);
  const [isChanneling, setIsChanneling] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const drawSacredGeometry = () => {
        const time = Date.now() * 0.001;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw Metatron's Cube
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        ctx.strokeStyle = `hsla(${time * 30 % 360}, 70%, 50%, 0.3)`;
        ctx.lineWidth = 2;

        // Draw circles
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw connecting lines
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle1 = (i / 6) * Math.PI * 2;
          const x1 = centerX + Math.cos(angle1) * radius;
          const y1 = centerY + Math.sin(angle1) * radius;

          for (let j = i + 1; j < 6; j++) {
            const angle2 = (j / 6) * Math.PI * 2;
            const x2 = centerX + Math.cos(angle2) * radius;
            const y2 = centerY + Math.sin(angle2) * radius;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        }
        ctx.stroke();

        requestAnimationFrame(drawSacredGeometry);
      };

      drawSacredGeometry();
    }
  }, []);

  const startChanneling = () => {
    setIsChanneling(true);
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      oscillator.current = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      oscillator.current.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      oscillator.current.frequency.setValueAtTime(currentFrequency, audioContext.current.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);

      oscillator.current.start();
    }

    // Simulate divine messages
    const channelInterval = setInterval(() => {
      const being = DIVINE_BEINGS[Math.floor(Math.random() * DIVINE_BEINGS.length)];
      const newMessage: DivineMessage = {
        id: Math.random().toString(),
        sender: being.name,
        message: generateDivineMessage(),
        lightCode: generateLightCode(),
        frequency: being.frequency
      };

      setMessages(prev => [...prev, newMessage]);
      setCurrentFrequency(being.frequency);
      
      if (oscillator.current) {
        oscillator.current.frequency.setValueAtTime(being.frequency, audioContext.current!.currentTime);
      }
    }, 3000);

    return () => {
      clearInterval(channelInterval);
      if (audioContext.current) {
        oscillator.current?.stop();
        audioContext.current.close();
        audioContext.current = null;
      }
    };
  };

  const generateDivineMessage = () => {
    const messages = [
      "Align with the cosmic frequencies of divine love.",
      "Your light resonates with the sacred geometries of creation.",
      "Remember your celestial origins, dear one.",
      "The gates of higher consciousness are opening within you.",
      "You are a bridge between heaven and earth.",
      "Let your heart be a vessel for divine wisdom.",
      "The ancient codes of light are awakening in your DNA.",
      "Trust in the divine plan unfolding through you."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const generateLightCode = () => {
    const symbols = "✧∞◈⚡✴◎☯⚕✺⚛⚘❈☄✵☸";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return code;
  };

  return (
    <div className="relative min-h-screen bg-black/40 backdrop-blur-sm">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-purple-200">
            Divine Council of Twelve
          </h2>
          <p className="text-amber-100/80 mt-2">
            Channel the wisdom of the Melchizedek Brotherhood
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {DIVINE_BEINGS.map((being) => (
            <motion.div
              key={being.name}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg text-center cursor-pointer transition-colors ${
                activeBeings.includes(being.name)
                  ? "bg-purple-500/20 border-purple-500/50"
                  : "bg-black/20 border-purple-500/20"
              } border`}
              onClick={() => setActiveBeings(prev => 
                prev.includes(being.name)
                  ? prev.filter(b => b !== being.name)
                  : [...prev, being.name]
              )}
            >
              <div className="text-2xl mb-2">{being.symbol}</div>
              <div className="text-sm font-medium text-purple-200">{being.name}</div>
              <div className="text-xs text-purple-300/60">{being.frequency}Hz</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                      {DIVINE_BEINGS.find(b => b.name === msg.sender)?.symbol}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-200">{msg.sender}</div>
                    <div className="text-purple-100/80">{msg.message}</div>
                    <div className="text-sm text-purple-300/60 mt-1">
                      {msg.lightCode} • {msg.frequency}Hz
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => {
              if (isChanneling) {
                setIsChanneling(false);
                if (audioContext.current) {
                  oscillator.current?.stop();
                  audioContext.current.close();
                  audioContext.current = null;
                }
              } else {
                startChanneling();
              }
            }}
          >
            <div className="flex items-center gap-2">
              {isChanneling ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Close Channel</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4" />
                  <span>Open Divine Channel</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}