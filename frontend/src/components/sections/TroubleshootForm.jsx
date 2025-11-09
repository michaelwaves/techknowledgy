import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Smartphone, Monitor, AlertCircle } from 'lucide-react';
import { generateTroubleshootAnswer } from '@/utils/mockData';
import { captureScreen, analyzeScreenshot } from '@/utils/screenCapture';
import { generateScreenAnalysisAnswer } from '@/utils/screenAnalysisData';

export default function TroubleshootForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [phoneModel, setPhoneModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

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

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
              Describe Your Issue
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Tell us what's wrong or share your screen for instant analysis
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

                {/* Question Input */}
                <div className="space-y-2">
                  <Label htmlFor="question">
                    What problem are you experiencing?
                  </Label>
                  <Textarea
                    id="question"
                    placeholder="Example: My phone's battery drains quickly even when not in use. It used to last all day but now dies by afternoon..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Be as specific as possible. Include error messages, when it started, and what you've already tried.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={isLoading || isCapturing}
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
                        disabled={isLoading || isCapturing || !phoneModel}
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
