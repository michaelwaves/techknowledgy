import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Battery, Wifi, HardDrive, Zap, Volume2, Smartphone } from 'lucide-react';

export default function QuickQuestions({ onSelectQuestion }) {
  const commonQuestions = [
    {
      icon: Battery,
      question: 'My phone battery drains very quickly',
      category: 'Battery',
      color: 'text-yellow-600 dark:text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30'
    },
    {
      icon: Wifi,
      question: 'WiFi keeps disconnecting on my device',
      category: 'Network',
      color: 'text-blue-600 dark:text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30'
    },
    {
      icon: HardDrive,
      question: 'My phone storage is full, how do I free up space?',
      category: 'Storage',
      color: 'text-purple-600 dark:text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30'
    },
    {
      icon: Zap,
      question: 'My computer is running very slow',
      category: 'Performance',
      color: 'text-orange-600 dark:text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30'
    },
    {
      icon: Smartphone,
      question: 'My browser keeps crashing',
      category: 'Software',
      color: 'text-cyan-600 dark:text-cyan-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30'
    },
    {
      icon: Volume2,
      question: 'Microsoft Word won\'t open on my computer',
      category: 'Software',
      color: 'text-indigo-600 dark:text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30'
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with encouraging message */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Quick Start</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
              Common Tech Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Click any question below to get started, or type your own. <strong>No question is too simple</strong> – we're here to help with anything, whether it's your first time troubleshooting or you're a tech pro!
            </p>
          </div>

          {/* Quick Question Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonQuestions.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 group"
                  onClick={() => onSelectQuestion(item.question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.question}
                        </p>
                        <span className={`text-xs ${item.color} font-medium mt-1 inline-block`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Encouraging Note */}
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Don't see your question?</h3>
                <p className="text-sm text-muted-foreground">
                  That's totally fine! Type your own question above, use voice input to describe it, or share your screen to show us what's happening. <strong>Every question matters</strong>, and we're here to help you find answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
