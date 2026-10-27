import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DevModeProvider } from './context/DevModeContext';
import { DevModeFloatingHud } from './components/DevModeFloatingHud';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MagicCursor } from './components/MagicCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { OfflineArchitectureShowcase } from './components/OfflineArchitectureShowcase';
import { ShowreelSection } from './components/ShowreelSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { IndustriesSection } from './components/IndustriesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { Footer } from './components/Footer';
import { HireModal } from './components/HireModal';
import { FloatingQuickActions } from './components/FloatingQuickActions';

function AppContent() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string>('pos-retail');

  const scrollToEstimator = (typeId?: string) => {
    if (typeId) {
      if (typeId.toLowerCase().includes('mobile') || typeId.toLowerCase().includes('flutter')) {
        setSelectedProjectType('mobile-app');
      } else if (typeId.toLowerCase().includes('pos') || typeId.toLowerCase().includes('restaurant')) {
        setSelectedProjectType('pos-retail');
      } else if (typeId.toLowerCase().includes('offline')) {
        setSelectedProjectType('offline-sync');
      } else if (typeId.toLowerCase().includes('ai') || typeId.toLowerCase().includes('automation')) {
        setSelectedProjectType('ai-automation');
      } else if (typeId.toLowerCase().includes('web') || typeId.toLowerCase().includes('saas')) {
        setSelectedProjectType('web-platform');
      }
    }

    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col font-sans selection:bg-[#eab308]/30 selection:text-white relative overflow-hidden">
      {/* Ambient Moving Gold & Yellow Glow Spots */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#d4af37]/12 via-[#eab308]/8 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />
      <div className="fixed top-1/3 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-[#eab308]/10 via-[#ca8a04]/6 to-transparent blur-[170px] pointer-events-none -z-10 rounded-full" />
      <div className="fixed -bottom-40 left-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-[#d4af37]/10 via-[#eab308]/6 to-transparent blur-[180px] pointer-events-none -z-10 rounded-full animate-pulse-glow" />

      {/* Magic Glowing Cursor */}
      <MagicCursor />

      {/* Slim Glowing Metallic Gold Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Pinned Top Navigation Bar with [/>] Dev Mode Toggle & Solid Gold CTA */}
      <Navbar onHireClick={() => setIsHireModalOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section with Structured Boxes, Workspace Image & Interactive Terminal */}
        <Hero onStartProject={() => scrollToEstimator()} />

        {/* 2. Trusted Tech Stack Infinite Marquee */}
        <TechMarquee />

        {/* 3. Core Capabilities Bento Grid (Structured bg-[#121216] Cards & Gold Outlines) */}
        <CapabilitiesGrid onSelectService={(service) => scrollToEstimator(service)} />

        {/* 4. Deep-Dive Offline-First Engine Architecture */}
        <OfflineArchitectureShowcase />

        {/* 5. VIP International Agency Showreel */}
        <ShowreelSection />

        {/* 6. Production Portfolio Showcase (Local Generated Images & Solid Action Buttons) */}
        <PortfolioShowcase onSelectProject={(project) => scrollToEstimator(project)} />

        {/* 7. Industries We Empower */}
        <IndustriesSection onSelectIndustry={(industry) => scrollToEstimator(industry)} />

        {/* 8. Impact & Testimonials (Proof & Evidence) */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* 10. Crucial Interactive 2-Step Project Estimator (Black & Gold Theme) */}
        <ProjectEstimator initialProjectType={selectedProjectType} />
      </main>

      {/* 11. Enterprise Footer */}
      <Footer />

      {/* Quick Consultation & Hire Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        onNavigateToEstimator={() => scrollToEstimator()}
      />

      {/* Floating WhatsApp & Quick Action Triggers Dock */}
      <FloatingQuickActions
        onOpenConsultation={() => setIsHireModalOpen(true)}
        onOpenEstimator={() => scrollToEstimator()}
      />

      {/* Developer X-Ray Mode Live HUD (Active in God Mode) */}
      <DevModeFloatingHud />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DevModeProvider>
        <AppContent />
      </DevModeProvider>
    </ThemeProvider>
  );
}
