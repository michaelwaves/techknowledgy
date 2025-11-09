import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ThumbsUp, ThumbsDown, Copy, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function QuickChatInterface({ question, answer, phoneModel }) {
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  const followUpQuestions = [
    "Can you explain step 3 in more detail?",
    "What if this doesn't fix the problem?",
    "How long will this take to fix?",
    "Is this a common issue?",
    "Do I need professional help?"
  ];

  useEffect(() => {
    // Auto-scroll to this section when it appears
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCopy = () => {
    const text = `Question: ${question}\n\nDevice: ${phoneModel}\n\nSolution: ${answer.explanation}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Solution copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };

  const handleFeedback = (helpful) => {
    if (helpful) {
      toast.success('Thanks for your feedback! Glad we could help.');
    } else {
      toast.info('Thanks for letting us know. We\'ll work to improve our answers.');
      setShowFollowUp(true);
    }
  };

  return (
    <div ref={scrollRef} className="py-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions Bar */}
          <Card className="mb-6 shadow-lg border-primary/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Was this helpful?</h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback helps us improve our solutions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(true)}
                    className="gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(false)}
                    className="gap-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Not helpful
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Questions */}
          {showFollowUp && (
            <Card className="mb-6 shadow-md animate-slide-up">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span>Need more help? Ask a follow-up question:</span>
                  <Badge variant="secondary" className="text-xs">Quick Reply</Badge>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {followUpQuestions.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto py-2 px-3 text-left justify-start hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        toast.info('Follow-up questions will be available soon!');
                      }}
                    >
                      <span className="text-xs">{q}</span>
                    </Button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Remember:</strong> There are no silly questions! If something's unclear, just ask. We're here to help you understand, not judge.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card className="shadow-md">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Try the steps in order – sometimes the simplest solution works best</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Take your time – there's no rush, and it's okay to pause and come back</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>If one solution doesn't work, try the next – tech problems can have multiple fixes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Still stuck?</strong> Ask another question! We can help you troubleshoot further or break it down differently</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
