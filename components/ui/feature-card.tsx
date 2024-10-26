import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export function FeatureCard({ icon: Icon, title, description, iconColor = "text-blue-300" }: FeatureCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 hover:bg-white/10 transition-all">
      <div className="flex justify-center mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  );
}