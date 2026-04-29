import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CtaSection } from "@/components/landing/CtaSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <StatsSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}
