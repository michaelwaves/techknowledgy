import { useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import TroubleshootForm from '@/components/sections/TroubleshootForm';
import QuickQuestions from '@/components/sections/QuickQuestions';
import ChatInterface from '@/components/sections/ChatInterface';
import FeaturesSection from '@/components/sections/FeaturesSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [chatData, setChatData] = useState(null);
  const [prefilledQuestion, setPrefilledQuestion] = useState('');

  const handleTroubleshoot = (data) => {
    setChatData({
      initialQuestion: data.question,
      initialAnswer: data.answer,
      phoneModel: data.phoneModel
    });
    // Scroll to chat section smoothly
    setTimeout(() => {
      document.getElementById('chat-section')?.scrollIntoView({ 
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
        {!chatData && (
          <QuickQuestions onSelectQuestion={handleQuickQuestion} />
        )}
        
        <div id="troubleshoot-form">
          <TroubleshootForm 
            onSubmit={handleTroubleshoot}
            prefilledQuestion={prefilledQuestion}
            onQuestionUsed={() => setPrefilledQuestion('')}
          />
        </div>
        
        {/* Chat Interface */}
        {chatData && (
          <div id="chat-section">
            <ChatInterface 
              initialQuestion={chatData.initialQuestion}
              initialAnswer={chatData.initialAnswer}
              phoneModel={chatData.phoneModel}
            />
          </div>
        )}
        
        {!chatData && <FeaturesSection />}
      </main>
      <Footer />
    </div>
  );
}
