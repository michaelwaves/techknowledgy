import { useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import TroubleshootForm from '@/components/sections/TroubleshootForm';
import QuickQuestions from '@/components/sections/QuickQuestions';
import AnswerDisplay from '@/components/sections/AnswerDisplay';
import QuickChatInterface from '@/components/sections/QuickChatInterface';
import FeaturesSection from '@/components/sections/FeaturesSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [troubleshootData, setTroubleshootData] = useState(null);
  const [prefilledQuestion, setPrefilledQuestion] = useState('');

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

  const handleQuickQuestion = (question) => {
    setPrefilledQuestion(question);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('troubleshoot-form')?.scrollIntoView({ 
        behavior: 'smooth' 
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
        
        {/* Quick Questions Section */}
        {!troubleshootData && (
          <QuickQuestions onSelectQuestion={handleQuickQuestion} />
        )}
        
        <div id="troubleshoot-form">
          <TroubleshootForm 
            onSubmit={handleTroubleshoot}
            prefilledQuestion={prefilledQuestion}
            onQuestionUsed={() => setPrefilledQuestion('')}
          />
        </div>
        
        {troubleshootData && (
          <>
            <div id="answer-section">
              <AnswerDisplay data={troubleshootData} />
            </div>
            <QuickChatInterface 
              question={troubleshootData.question}
              answer={troubleshootData.answer}
              phoneModel={troubleshootData.phoneModel}
            />
          </>
        )}
        
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
