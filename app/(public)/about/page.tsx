import React from 'react';
import { AboutHero } from '@/components/pages/about/AboutHero';
import { MissionVisionSection } from '@/components/pages/about/MissionVisionSection';
import { TeamSection } from '@/components/pages/about/TeamSection';
import { ImpactSection } from '@/components/pages/about/ImpactSection';
import { CtaSection } from '@/components/landing/CtaSection';

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <MissionVisionSection />
      <TeamSection />
      <ImpactSection />
      <CtaSection />
    </main>
  );
}
