import { Sparkles, Heart, Moon } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";

export function MeditationSection() {
  return (
    <div className="mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Daily Cosmic Meditation
        </h2>
        <p className="mt-4 text-purple-200">Connect with your higher self through guided spiritual practices</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <Moon className="w-6 h-6 text-blue-300" />
            <h3 className="text-xl font-semibold">Lunar Alignment</h3>
          </div>
          <p className="text-purple-200 mb-4">
            Harmonize your energy with lunar cycles to enhance intuition and inner wisdom.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <Heart className="w-4 h-4" />
              <span>15 minutes daily practice</span>
            </div>
            <CosmicButton icon={Moon} size="sm">Begin Practice</CosmicButton>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-semibold">Starseed Activation</h3>
          </div>
          <p className="text-purple-200 mb-4">
            Awaken your cosmic DNA through focused meditation and energy alignment.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <Heart className="w-4 h-4" />
              <span>20 minutes daily practice</span>
            </div>
            <CosmicButton icon={Sparkles} size="sm">Begin Practice</CosmicButton>
          </div>
        </div>
      </div>
    </div>
  );
}