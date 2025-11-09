import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { generateTroubleshootAnswer } from '@/utils/mockData';
import { toast } from 'sonner';

export default function ChatInterface({ initialQuestion, initialAnswer, phoneModel }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'user',
      content: initialQuestion,
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      role: 'assistant',
      content: initialAnswer,
      timestamp: new Date().toISOString(),
      showVisualGuide: true
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuestion = input.trim();
    setInput('');
    setIsLoading(true);

    // Check if user wants a live demonstration
    const needsDemonstration = userQuestion.toLowerCase().includes('show me') || 
                               userQuestion.toLowerCase().includes('demonstrate') ||
                               userQuestion.toLowerCase().includes('can you navigate');

    if (needsDemonstration) {
      // Use browser automation to demonstrate
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${backendUrl}/api/browser/action`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: 'https://support.google.com',
            action: 'screenshot',
            instruction: userQuestion
          })
        });

        if (response.ok) {
          const browserResult = await response.json();
          
          const assistantMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: {
              explanation: `I've captured a live screenshot to demonstrate. Here's what you'll see when you navigate to the support page.`,
              steps: [
                'Open your browser and navigate to the support page',
                'Look for the settings or help section as shown in the screenshot',
                'Follow the visual guide to complete your task'
              ],
              browserScreenshot: browserResult.data?.screenshot,
              browserUrl: browserResult.data?.url
            },
            timestamp: new Date().toISOString(),
            showVisualGuide: false,
            hasBrowserDemo: true
          };

          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
          toast.success('Live demonstration captured!');
          return;
        }
      } catch (error) {
        console.error('Browser automation error:', error);
        // Fall back to regular response
      }
    }

    // Regular AI response
    setTimeout(() => {
      const answer = generateTroubleshootAnswer(userQuestion, phoneModel);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        timestamp: new Date().toISOString(),
        showVisualGuide: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      toast.success('Response generated!');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId, helpful) => {
    if (helpful) {
      toast.success('Thanks for your feedback!');
    } else {
      toast.info('Sorry this wasn\'t helpful. Try asking a more specific question.');
    }
  };

  const suggestedQuestions = [
    "Can you explain step 3 in more detail?",
    "What if this doesn't work?",
    "How long will this take?",
    "Is this a common issue?"
  ];

  return (
    <div className="py-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl border-primary/20">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">TechFix Assistant</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-muted-foreground">Online • Always here to help</p>
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {phoneModel}
                </Badge>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-[600px]" ref={scrollRef}>
              <div className="p-6 space-y-6">
                {messages.map((message, index) => (
                  <div key={message.id}>
                    {/* Show timestamp separator */}
                    {index === 0 || new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString() && (
                      <div className="flex justify-center mb-4">
                        <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className={message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                          {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>

                      {/* Message Content */}
                      <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div className={`rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}>
                          {message.role === 'user' ? (
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          ) : (
                            <div className="space-y-4">
                              {/* Assistant Response */}
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                {message.content.explanation}
                              </p>

                              {/* Visual Guide */}
                              {message.showVisualGuide && message.content.visualGuide && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-border bg-muted/30">
                                  <div className="p-3 bg-accent/10 border-b border-border">
                                    <div className="flex items-center gap-2 text-accent">
                                      <Eye className="h-4 w-4" />
                                      <span className="text-sm font-semibold">{message.content.visualGuide.title}</span>
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <img
                                      src={message.content.visualGuide.image}
                                      alt={message.content.visualGuide.title}
                                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                                      loading="lazy"
                                    />
                                    {message.content.visualGuide.steps && (
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                                        {message.content.visualGuide.steps.map((step, idx) => (
                                          <div key={idx} className="flex items-start gap-2 p-2 rounded bg-accent-light">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                                              {step.number}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="text-lg mb-0.5">{step.icon}</div>
                                              <p className="text-xs text-foreground leading-snug">{step.text}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Browser Demonstration */}
                              {message.hasBrowserDemo && message.content.browserScreenshot && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-border bg-muted/30">
                                  <div className="p-3 bg-accent/10 border-b border-border">
                                    <div className="flex items-center gap-2 text-accent">
                                      <Eye className="h-4 w-4" />
                                      <span className="text-sm font-semibold">Live Browser Demonstration</span>
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <img
                                      src={message.content.browserScreenshot}
                                      alt="Browser demonstration screenshot"
                                      className="w-full max-w-2xl mx-auto rounded-lg shadow-sm border border-border"
                                      loading="lazy"
                                    />
                                    {message.content.browserUrl && (
                                      <div className="mt-3 p-2 bg-background rounded border border-border">
                                        <p className="text-xs text-muted-foreground">
                                          <strong>URL:</strong> {message.content.browserUrl}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Steps */}
                              {message.content.steps && message.content.steps.length > 0 && (
                                <div className="mt-4">
                                  <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Step-by-Step Solution:
                                  </p>
                                  <div className="space-y-2">
                                    {message.content.steps.slice(0, 5).map((step, idx) => (
                                      <div key={idx} className="flex gap-2 text-sm">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                          {idx + 1}
                                        </span>
                                        <span className="text-muted-foreground leading-relaxed">{step}</span>
                                      </div>
                                    ))}
                                    {message.content.steps.length > 5 && (
                                      <p className="text-xs text-muted-foreground italic pl-7">+ {message.content.steps.length - 5} more steps</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Feedback Buttons (only for assistant messages) */}
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-2 ml-2">
                            <button
                              onClick={() => handleFeedback(message.id, true)}
                              className="text-muted-foreground hover:text-success transition-colors p-1"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleFeedback(message.id, false)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                            <span className="text-xs text-muted-foreground ml-1">
                              {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-2xl px-4 py-3 bg-card border border-border">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Analyzing your question...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {!isLoading && messages.length > 0 && (
              <div className="px-6 py-3 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Quick questions you might ask:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(q)}
                      className="px-3 py-1.5 text-xs bg-background border border-border rounded-full hover:bg-accent hover:border-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a follow-up question or describe another issue..."
                  className="min-h-[44px] max-h-32 resize-none"
                  rows={1}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-11 w-11 shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                <strong>Tip:</strong> Ask follow-up questions or describe new issues - I'll remember our conversation!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
