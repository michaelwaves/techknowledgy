import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertCircle, ExternalLink, Lightbulb, BookOpen, Wrench, Monitor, Eye } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AnswerDisplay({ data }) {
  const { question, phoneModel, answer, method, screenshot, analysis } = data;
  const isScreenCapture = method === 'screen-capture';

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Summary */}
          <Card className="mb-8 shadow-lg border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">Your Question</CardTitle>
                    {isScreenCapture && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent">
                        <Monitor className="h-3 w-3 mr-1" />
                        Screen Analysis
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">{question}</CardDescription>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {phoneModel}
                </Badge>
              </div>
            </CardHeader>
            {screenshot && (
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Captured Screenshot
                  </p>
                  <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                    <img 
                      src={screenshot} 
                      alt="Screen capture" 
                      className="w-full h-auto max-h-64 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Detected Issues (for screen capture) */}
          {isScreenCapture && analysis?.issues && (
            <Card className="mb-8 shadow-elegant border-accent/20">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertCircle className="h-6 w-6 text-accent" />
                  Analysis Results
                </CardTitle>
                <CardDescription>Visual indicators detected in your screen capture</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {analysis.issues.map((issue, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <Badge 
                          variant={issue.confidence === 'high' ? 'default' : 'secondary'}
                          className={issue.confidence === 'high' ? 'bg-warning' : ''}
                        >
                          {issue.confidence} confidence
                        </Badge>
                      </div>
                      <ul className="space-y-2 mt-3">
                        {issue.findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Answer */}
          <Card className="mb-8 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle2 className="h-6 w-6 text-success" />
                Solution
              </CardTitle>
              <CardDescription>Here's how to fix your issue</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {answer.explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Visual Guide */}
          {answer.visualGuide && (
            <Card className="mb-8 shadow-elegant border-accent/30">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Eye className="h-6 w-6 text-accent" />
                  {answer.visualGuide.title}
                </CardTitle>
                <CardDescription>{answer.visualGuide.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Main Visual */}
                <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30 p-4 mb-6">
                  <img
                    src={answer.visualGuide.image}
                    alt={answer.visualGuide.title}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center h-48 bg-muted rounded-lg">
                    <Eye className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Visual guide illustration</p>
                  </div>
                </div>

                {/* Quick Visual Steps */}
                {answer.visualGuide.steps && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {answer.visualGuide.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-accent-light border border-accent/20">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold text-sm">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl mb-1">{step.icon}</div>
                          <p className="text-sm text-foreground leading-snug">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-muted-foreground text-center">
                  <strong>Tip:</strong> Your screen might look slightly different depending on your device model and software version
                </p>
              </CardContent>
            </Card>
          )}

          {/* Step-by-Step Instructions */}
          <Card className="mb-8 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Wrench className="h-6 w-6 text-primary" />
                Step-by-Step Guide
              </CardTitle>
              <CardDescription>Follow these steps to resolve the issue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {answer.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Troubleshooting Tips */}
          <Card className="mb-8 shadow-elegant border-warning/20 bg-warning-light">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="h-6 w-6 text-warning" />
                Key Troubleshooting Tips
              </CardTitle>
              <CardDescription className="text-warning-foreground/70">
                Important things to keep in mind for your {phoneModel}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {answer.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          {answer.resources && answer.resources.length > 0 && (
            <Card className="mb-8 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="h-6 w-6 text-accent" />
                  Helpful Resources
                </CardTitle>
                <CardDescription>External links and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {answer.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent-light transition-all group"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Common Issues FAQ */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-6 w-6 text-primary" />
                Common Related Issues
              </CardTitle>
              <CardDescription>Other problems you might encounter</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {answer.relatedIssues.map((issue, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {issue.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {issue.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Ask Another Question
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                const text = `Question: ${question}\n\nSolution: ${answer.explanation}`;
                navigator.clipboard.writeText(text).then(() => {
                  // Success handled silently
                }).catch(() => {
                  // Error handled silently
                });
              }}
            >
              Copy Solution
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
