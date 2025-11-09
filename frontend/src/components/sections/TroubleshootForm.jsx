import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Smartphone, Monitor, AlertCircle, Mic, MicOff, Radio } from 'lucide-react';
import { generateTroubleshootAnswer } from '@/utils/mockData';
import { captureScreen, analyzeScreenshot } from '@/utils/screenCapture';
import { generateScreenAnalysisAnswer } from '@/utils/screenAnalysisData';
import { startVoiceRecognition, isSpeechRecognitionSupported } from '@/utils/voiceRecognition';

export default function TroubleshootForm({ onSubmit, prefilledQuestion = '', onQuestionUsed }) {
  const [question, setQuestion] = useState('');
  const [phoneModel, setPhoneModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);
  const fullTranscriptRef = useRef('');

  // Handle prefilled question
  useEffect(() => {
    if (prefilledQuestion && prefilledQuestion !== question) {
      setQuestion(prefilledQuestion);
      if (onQuestionUsed) {
        onQuestionUsed();
      }
    }
  }, [prefilledQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Please enter your question');
      return;
    }
    
    if (!phoneModel) {
      toast.error('Please select your device model');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const answer = generateTroubleshootAnswer(question, phoneModel);
      onSubmit({
        question,
        phoneModel,
        answer,
        method: 'text'
      });
      setIsLoading(false);
      toast.success('Solution generated successfully!');
    }, 1500);
  };

  const handleScreenCapture = async () => {
    if (!phoneModel) {
      toast.error('Please select your device model first');
      return;
    }

    setIsCapturing(true);
    toast.info('Select the screen or window you want to share...');

    try {
      const captureResult = await captureScreen();

      if (!captureResult.success) {
        if (captureResult.error.includes('Permission denied')) {
          toast.error('Screen sharing permission denied');
        } else if (captureResult.error.includes('cancelled')) {
          toast.info('Screen sharing cancelled');
        } else {
          toast.error('Failed to capture screen: ' + captureResult.error);
        }
        setIsCapturing(false);
        return;
      }

      toast.success('Screen captured! Analyzing...');

      // Simulate analysis delay
      setTimeout(() => {
        const analysis = analyzeScreenshot(captureResult.screenshot, phoneModel);
        const answer = generateScreenAnalysisAnswer(analysis, phoneModel);
        
        onSubmit({
          question: 'Screen Analysis Results',
          phoneModel,
          answer,
          method: 'screen-capture',
          screenshot: captureResult.screenshot,
          analysis
        });
        
        setIsCapturing(false);
        toast.success('Screen analysis complete!');
      }, 2000);

    } catch (error) {
      console.error('Screen capture error:', error);
      toast.error('An error occurred during screen capture');
      setIsCapturing(false);
    }
  };

  const handleVoiceInput = () => {
    if (!isSpeechRecognitionSupported()) {
      toast.error('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      setInterimText('');
      toast.success('Voice input stopped');
      return;
    }

    // Start listening
    setIsListening(true);
    fullTranscriptRef.current = question; // Keep existing text
    toast.info('Listening... Speak now!');

    const recognition = startVoiceRecognition(
      (result) => {
        // Update interim text for live feedback
        setInterimText(result.interim);
        
        // Update final transcript
        if (result.final) {
          fullTranscriptRef.current = (fullTranscriptRef.current + ' ' + result.final).trim();
          setQuestion(fullTranscriptRef.current);
          setInterimText('');
        }
      },
      (error) => {
        toast.error(error);
        setIsListening(false);
        setInterimText('');
        recognitionRef.current = null;
      },
      () => {
        setIsListening(false);
        setInterimText('');
        recognitionRef.current = null;
      }
    );

    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
              Describe Your Issue
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Type, speak, or share your screen for instant analysis
            </p>
          </div>

          <Card className="shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Troubleshoot Assistant
              </CardTitle>
              <CardDescription>
                Provide details about your tech problem for accurate solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Model Selection */}
                <div className="space-y-2">
                  <Label htmlFor="phone-model" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    Device/Phone Model
                  </Label>
                  <Select value={phoneModel} onValueChange={setPhoneModel}>
                    <SelectTrigger id="phone-model" className="h-11">
                      <SelectValue placeholder="Select your device model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iphone-15-pro">iPhone 15 Pro</SelectItem>
                      <SelectItem value="iphone-14">iPhone 14</SelectItem>
                      <SelectItem value="iphone-13">iPhone 13</SelectItem>
                      <SelectItem value="samsung-s24">Samsung Galaxy S24</SelectItem>
                      <SelectItem value="samsung-s23">Samsung Galaxy S23</SelectItem>
                      <SelectItem value="pixel-8-pro">Google Pixel 8 Pro</SelectItem>
                      <SelectItem value="pixel-7">Google Pixel 7</SelectItem>
                      <SelectItem value="oneplus-12">OnePlus 12</SelectItem>
                      <SelectItem value="windows-laptop">Windows Laptop</SelectItem>
                      <SelectItem value="macbook">MacBook</SelectItem>
                      <SelectItem value="ipad">iPad</SelectItem>
                      <SelectItem value="other">Other Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question Input with Voice */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="question">
                      What problem are you experiencing?
                    </Label>
                    <Button
                      type="button"
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className="h-8"
                      onClick={handleVoiceInput}
                    >
                      {isListening ? (
                        <>
                          <Radio className="h-4 w-4 mr-2 animate-pulse" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Voice Input
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Textarea
                      id="question"
                      placeholder="Example: My phone's battery drains quickly even when not in use. It used to last all day but now dies by afternoon..."
                      value={question + (interimText ? ' ' + interimText : '')}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={6}
                      className={`resize-none ${isListening ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                      disabled={isListening}
                    />
                    {isListening && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                        <Radio className="h-4 w-4 animate-pulse" />
                        Listening...
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {isListening 
                      ? 'Speak clearly and describe your problem. Click "Stop" when done.'
                      : 'Be as specific as possible. Include error messages, when it started, and what you\'ve already tried.'}
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={isLoading || isCapturing || isListening}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-pulse">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Find Solution
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="secondary" className="bg-background px-3">
                      OR
                    </Badge>
                  </div>
                </div>

                {/* Screen Capture Section */}
                <div className="space-y-4 p-4 rounded-lg bg-accent-light border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Monitor className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        Screen Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Share your screen and let us automatically detect issues. Perfect for error messages, visual glitches, or performance problems.
                      </p>
                      <div className="flex items-start gap-2 text-xs text-muted-foreground mb-3">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>
                          Your screenshot is processed locally in your browser. We recommend closing sensitive windows before sharing.
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="default"
                        size="lg"
                        className="w-full h-11"
                        onClick={handleScreenCapture}
                        disabled={isLoading || isCapturing || !phoneModel || isListening}
                      >
                        {isCapturing ? (
                          <>
                            <span className="animate-pulse">Analyzing Screen...</span>
                          </>
                        ) : (
                          <>
                            <Monitor className="mr-2 h-5 w-5" />
                            Share Screen for Analysis
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
