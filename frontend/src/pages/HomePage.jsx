import { useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import TroubleshootForm from '@/components/sections/TroubleshootForm';
import AnswerDisplay from '@/components/sections/AnswerDisplay';
import FeaturesSection from '@/components/sections/FeaturesSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [troubleshootData, setTroubleshootData] = useState(null);

  const handleTroubleshoot = (data) => {
    setTroubleshootData(data);
    // Scroll to answer section smoothly
    setTimeout(() => {
      document.getElementById('answer-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection onGetStarted={() => {
          document.getElementById('troubleshoot-form')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }} />
        <div id="troubleshoot-form">
          <TroubleshootForm onSubmit={handleTroubleshoot} />
        </div>
        {troubleshootData && (
          <div id="answer-section">
            <AnswerDisplay data={troubleshootData} />
          </div>
        )}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
