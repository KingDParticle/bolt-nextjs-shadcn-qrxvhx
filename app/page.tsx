import { DivinePresence } from "@/components/divine-presence";
import { ContemplativePath } from "@/components/contemplative-path";
import { CosmicRoom } from "@/components/cosmic-room";
import { WisdomCards } from "@/components/wisdom-cards";
import { DivineChat } from "@/components/divine-chat";
import { HolySpiritGateway } from "@/components/holy-spirit-gateway";
import { SacredGeometry } from "@/components/sacred-geometry";
import { AncientScrolls } from "@/components/ancient-scrolls";
import { UniversalMathematics } from "@/components/universal-mathematics";
import { InnerMysteryVeil } from "@/components/inner-mystery-veil";
import { MysticalTrigonometry } from "@/components/mystical-trigonometry";
import { YinYang } from "@/components/yin-yang";
import { MatrixRain } from "@/components/matrix-rain";
import { FloatingText } from "@/components/floating-text";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white overflow-hidden">
      <CosmicRoom>
        <FloatingText />
        <MatrixRain />
        <DivinePresence />
        <YinYang />
        <InnerMysteryVeil />
        <HolySpiritGateway />
        <SacredGeometry />
        <UniversalMathematics />
        <MysticalTrigonometry />
        <ContemplativePath />
        <AncientScrolls />
        <WisdomCards />
        <DivineChat />
      </CosmicRoom>
    </main>
  );
}