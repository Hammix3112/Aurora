import React, { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import DailyReadSection from './components/DailyReadSection';
import EffortlessLoggingSection from './components/EffortlessLoggingSection';
import ConnectedHealthSection from './components/ConnectedHealthSection';
import AskDataSection from './components/AskDataSection';
import WorkoutIntelligenceSection from './components/WorkoutIntelligenceSection';
import EvidenceSection from './components/EvidenceSection';
import ResetStudioSection from './components/ResetStudioSection';
import HistorySection from './components/HistorySection';
import FinalCtaSection from './components/FinalCtaSection';

const PersistentScene = lazy(() => import('./components/3d/PersistentScene'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis Buttery Smooth Inertia Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050711] text-white selection:bg-[#D4F933] selection:text-black overflow-x-hidden perspective-1200 preserve-3d">
      {/* Root Persistent Full-Page WebGL 3D Scene */}
      <Suspense fallback={null}>
        <PersistentScene />
      </Suspense>

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: ONE DAILY READ ("Start with what matters today.") */}
      <DailyReadSection />

      {/* Section 3: EFFORTLESS FOOD LOGGING ("Log the meal. Not the admin.") */}
      <EffortlessLoggingSection />

      {/* Section 4: CONNECTED HEALTH ("Your wearable collects signals. Aurora connects the story.") */}
      <ConnectedHealthSection />

      {/* Section 5: ASK YOUR OWN DATA ("Talk to your health like you talk to a person.") */}
      <AskDataSection />

      {/* Section 6: WORKOUT INTELLIGENCE ("See the workout. Understand the context.") */}
      <WorkoutIntelligenceSection />

      {/* Section 7: EVIDENCE-BACKED INSIGHTS ("Not another score. A pattern you can act on.") */}
      <EvidenceSection />

      {/* Section 8: RESET STUDIO ("A calmer moment, in context.") */}
      <ResetStudioSection />

      {/* Section 9: BUILT OVER TIME ("Your history becomes useful.") */}
      <HistorySection />

      {/* Section 10: YOUR DATA, YOUR CHOICE ("Aurora can suggest. Only you can confirm.") */}
      <FinalCtaSection />
    </div>
  );
}
