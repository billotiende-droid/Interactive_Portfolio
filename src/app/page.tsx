import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/app/components/HeroSection';
import HowIThinkSection from '@/app/components/HowIThinkSection';
import WhatIBuildSection from '@/app/components/WhatIBuildSection';
import FeaturedProjectsSection from '@/app/components/FeaturedProjectsSection';
import EngineeringJourneySection from '@/app/components/EngineeringJourneySection';
import WhatImLearningSection from '@/app/components/WhatImLearningSection';
import BuildProcessSection from '@/app/components/BuildProcessSection';
import CurrentFocusSection from '@/app/components/CurrentFocusSection';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/app/components/ScrollProgress';
import CursorGlow from '@/app/components/CursorGlow';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main>
        <HeroSection />
        <HowIThinkSection />
        <WhatIBuildSection />
        <FeaturedProjectsSection />
        <EngineeringJourneySection />
        <WhatImLearningSection />
        <BuildProcessSection />
        <CurrentFocusSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}