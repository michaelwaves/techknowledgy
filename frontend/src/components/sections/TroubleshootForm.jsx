import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Smartphone } from 'lucide-react';
import { generateTroubleshootAnswer } from '@/utils/mockData';

export default function TroubleshootForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [phoneModel, setPhoneModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      });
      setIsLoading(false);
      toast.success('Solution generated successfully!');
    }, 1500);
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
              Tell us what's wrong and we'll provide instant troubleshooting steps
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
                  disabled={isLoading}
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
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
