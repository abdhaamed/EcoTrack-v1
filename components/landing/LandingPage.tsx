"use client";

import { useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { EduSection } from "./EduSection";
import { CtaSection } from "./CtaSection";

export function LandingPage() {
  useEffect(() => {
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            el.target.classList.add("visible");
            observer.unobserve(el.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(
      ".feature-card, .step-card, .edu-card, .edu-primary, .stat-item"
    );

    elements.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <EduSection />
      <CtaSection />
    </>
  );
}
