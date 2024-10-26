"use client";

import { useRef, useEffect } from 'react';
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceNarratorProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export function VoiceNarrator({ isEnabled, onToggle }: VoiceNarratorProps) {
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isEnabled && !audioContext.current) {
      audioContext.current = new AudioContext();
      oscillator.current = audioContext.current.createOscillator();
      gainNode.current = audioContext.current.createGain();

      oscillator.current.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);

      // Set initial frequency for cosmic ambiance
      oscillator.current.frequency.setValueAtTime(432, audioContext.current.currentTime);
      gainNode.current.gain.setValueAtTime(0.1, audioContext.current.currentTime);

      oscillator.current.start();

      // Create subtle frequency modulation
      const lfoFrequency = 0.1;
      const lfo = audioContext.current.createOscillator();
      const lfoGain = audioContext.current.createGain();
      
      lfo.frequency.setValueAtTime(lfoFrequency, audioContext.current.currentTime);
      lfoGain.gain.setValueAtTime(10, audioContext.current.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.current.frequency);
      lfo.start();
    }

    return () => {
      if (audioContext.current && !isEnabled) {
        oscillator.current?.stop();
        audioContext.current.close();
        audioContext.current = null;
      }
    };
  }, [isEnabled]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-purple-300 hover:text-purple-100 transition-colors duration-300"
      onClick={onToggle}
      title={isEnabled ? "Mute Cosmic Frequencies" : "Enable Cosmic Frequencies"}
    >
      {isEnabled ? (
        <Volume2 className="h-6 w-6 animate-pulse" />
      ) : (
        <VolumeX className="h-6 w-6" />
      )}
    </Button>
  );
}