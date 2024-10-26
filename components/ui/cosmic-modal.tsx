"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CosmicButton } from "./cosmic-button";

interface CosmicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon: React.ComponentType<any>;
}

export function CosmicModal({ isOpen, onClose, title, content, icon: Icon }: CosmicModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-b from-purple-950/95 to-black/95 border-purple-500/20 backdrop-blur-xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative overflow-hidden p-6">
          {/* Animated particles background */}
          <div className="cosmic-particles absolute inset-0" />
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-purple-300 hover:text-purple-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-8 w-8 text-purple-300 animate-cosmic-spin" />
              <h2 className="text-2xl font-bold text-glow-purple">{title}</h2>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-purple-100 leading-relaxed">{content}</p>
            </div>

            <div className="mt-8 flex justify-end">
              <CosmicButton variant="secondary" size="sm" onClick={onClose}>
                Close Portal
              </CosmicButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}