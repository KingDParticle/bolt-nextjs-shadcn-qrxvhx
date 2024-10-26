"use client";

import { Star, Compass, Eye } from "lucide-react";
import { WisdomCard } from "@/components/wisdom-card";
import { useState } from "react";
import { VoiceNarrator } from "@/components/voice-narrator";

export function WisdomCards() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const wisdomData = [
    {
      icon: Star,
      title: "Cosmic Origins",
      text: "Your soul carries the light of distant stars, awakening memories of your celestial heritage.",
      fullContent: "Deep within your being lies the eternal light of the cosmos. As a starseed, you carry the wisdom and frequency of distant star systems, each contributing to your unique spiritual signature. Through meditation and inner work, these cosmic memories begin to surface, guiding you toward your highest purpose and divine mission on Earth.",
      tier: 3,
      frequency: 432,
      lightCode: "✧∞◈⚡✴",
      dimension: 5
    },
    {
      icon: Eye,
      title: "Inner Vision",
      text: "Through meditation, unlock the third eye's wisdom and access higher dimensions of consciousness.",
      fullContent: "The third eye is your gateway to higher realms of consciousness and spiritual insight. As you develop this inner vision, you'll begin to perceive the subtle energies that weave through all of existence. This awakening brings forth profound insights, psychic abilities, and a deeper understanding of your role in the cosmic dance of creation.",
      tier: 4,
      frequency: 528,
      lightCode: "◎☯⚕✺⚛",
      dimension: 7
    },
    {
      icon: Compass,
      title: "Sacred Path",
      text: "Each step on your spiritual journey aligns with the universe's divine plan for your awakening.",
      fullContent: "Your spiritual journey is no accident. Every experience, challenge, and triumph serves as a stepping stone on your path to enlightenment. The universe guides you through synchronicities, signs, and intuitive nudges, leading you toward your highest evolution and the fulfillment of your soul's purpose.",
      tier: 3,
      frequency: 396,
      lightCode: "⚘❈☄✵☸",
      dimension: 6
    }
  ];

  return (
    <div className="mt-24 relative">
      <div className="absolute top-0 right-0 z-20">
        <VoiceNarrator 
          isEnabled={isSoundEnabled}
          onToggle={() => setIsSoundEnabled(!isSoundEnabled)}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="cosmic-background" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Sacred Light Codes
          </h2>
          <p className="mt-4 text-purple-200">
            Unlock the dimensional gateways of cosmic consciousness
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 perspective-1000">
          {wisdomData.map((card, index) => (
            <WisdomCard
              key={index}
              {...card}
              isSoundEnabled={isSoundEnabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}