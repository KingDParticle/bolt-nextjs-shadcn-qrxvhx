import { Star, Sparkles, Moon } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

export function FeaturesGrid() {
  const features = [
    {
      icon: Star,
      title: "Starseed Lineage",
      description: "Discover your cosmic origins and awaken to your true purpose in this earthly journey.",
      iconColor: "text-yellow-300"
    },
    {
      icon: Sparkles,
      title: "Sacred Geometry",
      description: "Unlock the universal language of creation through sacred geometric patterns.",
      iconColor: "text-blue-300"
    },
    {
      icon: Moon,
      title: "Akashic Records",
      description: "Access the universal library of soul knowledge and cosmic wisdom.",
      iconColor: "text-blue-200"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconColor={feature.iconColor}
        />
      ))}
    </div>
  );
}