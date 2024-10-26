import { Star, Moon, Sun } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";

export function HeroSection() {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center items-center gap-4 animate-pulse">
        <Star className="w-8 h-8 text-yellow-300" />
        <Moon className="w-6 h-6 text-blue-200" />
        <Sun className="w-10 h-10 text-yellow-400" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
        Cosmic Journey Within
      </h1>
      
      <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
        Explore the depths of consciousness and connect with your cosmic heritage
      </p>

      <div className="flex justify-center gap-4 pt-4">
        <CosmicButton icon={Star} size="lg">Begin Journey</CosmicButton>
        <CosmicButton icon={Moon} variant="secondary" size="lg">Learn More</CosmicButton>
      </div>
    </div>
  );
}