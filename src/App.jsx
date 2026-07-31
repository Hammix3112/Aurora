import React from 'react';
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

export default function App() {
  return (
    <div class="min-h-screen w-full bg-[#050711] text-white selection:bg-[#D4F933] selection:text-black overflow-x-hidden">
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
