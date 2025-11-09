// Mock data for screen analysis results

export function generateScreenAnalysisAnswer(analysisData, phoneModel) {
  const hasIssues = analysisData.issues && analysisData.issues.length > 0;
  
  if (!hasIssues) {
    return {
      explanation: `Based on the screen capture from your ${phoneModel}, our automated analysis didn't detect any obvious critical issues. However, here are some proactive maintenance steps you can take to ensure optimal performance.

Screen analysis is most effective when error messages or visual indicators are present. If you're experiencing a specific problem that wasn't captured in the screenshot, try describing it using the text form for more targeted assistance.`,
      steps: [
        'Review running applications and close any unnecessary programs to free up system resources',
        'Check for system updates in your device settings and install any pending updates',
        'Clear browser cache and temporary files to improve performance',
        'Restart your device to refresh system processes and clear memory',
        'Monitor battery usage and disable power-intensive features if needed',
        'Verify all important apps are updated to their latest versions',
        'If issues persist, use the text form to describe your specific problem in detail'
      ],
      tips: [
        'Regular device restarts help maintain optimal performance',
        'Keep your device storage above 20% free space for smooth operation',
        'Screen sharing works best when the error or issue is actively displayed',
        'For privacy, the screenshot is processed locally and not stored permanently',
        'Consider using text descriptions for intermittent or hard-to-capture issues'
      ],
      resources: [
        {
          title: 'Screen Recording Best Practices',
          description: 'How to effectively capture technical issues for troubleshooting',
          url: 'https://support.google.com/youtube/answer/9228389'
        },
        {
          title: 'System Performance Monitoring',
          description: 'Learn to identify performance bottlenecks on your device',
          url: 'https://support.apple.com/guide/activity-monitor/welcome/mac'
        },
        {
          title: 'Privacy & Screen Sharing',
          description: 'Understanding what gets shared during screen capture',
          url: 'https://support.mozilla.org/en-US/kb/screen-sharing-firefox'
        }
      ],
      relatedIssues: [
        {
          question: 'What information is captured during screen sharing?',
          answer: 'Screen sharing captures a single screenshot of your selected window or screen. The image is processed locally in your browser for analysis. We recommend closing any windows with sensitive information before sharing.'
        },
        {
          question: 'Why didn\'t the analysis detect my problem?',
          answer: 'Screen analysis works best for visible issues like error messages, UI glitches, or performance indicators. Intermittent problems or issues not visible on screen may require text-based description for accurate diagnosis.'
        },
        {
          question: 'Can I share my screen multiple times?',
          answer: 'Yes! You can capture your screen as many times as needed. Try capturing when the problem is actively occurring for the most accurate analysis.'
        }
      ],
      analysisType: 'screen-capture'
    };
  }

  // Generate response based on detected issues
  const primaryIssue = analysisData.issues[0];
  
  return {
    explanation: `Our screen analysis of your ${phoneModel} has identified several potential issues that may be affecting your device's performance. Based on the visual indicators detected, here's what we found and how to address them.

${primaryIssue.title}: We detected ${primaryIssue.findings.length} indicators with ${primaryIssue.confidence} confidence level. These findings suggest there may be underlying issues that need attention.`,
    steps: [
      'Take note of any error messages or codes visible on your screen for future reference',
      'Close all unnecessary applications to reduce system load and isolate the problem',
      'Open Task Manager (Windows) or Activity Monitor (Mac) to identify resource-heavy processes',
      'Force quit any unresponsive applications that may be causing system instability',
      'Check system logs for error entries related to the time of the screenshot',
      'Perform a clean restart of your device to clear temporary issues',
      'Update all affected applications to their latest versions',
      'If specific error codes were detected, search for them in official support documentation'
    ],
    tips: [
      'Screenshot error messages immediately when they appear - they contain valuable diagnostic info',
      'Keep a log of when issues occur to identify patterns or triggers',
      'Multiple open applications can compound performance issues',
      'System warnings should never be ignored - address them promptly',
      'Regular software updates often contain fixes for detected issues'
    ],
    resources: [
      {
        title: 'Error Code Database',
        description: 'Look up specific error messages and their solutions',
        url: 'https://support.microsoft.com/en-us/windows'
      },
      {
        title: 'Performance Troubleshooting Guide',
        description: 'Comprehensive guide to diagnosing system slowdowns',
        url: 'https://support.apple.com/mac/performance'
      },
      {
        title: 'Application Crash Reports',
        description: 'How to read and interpret crash logs',
        url: 'https://developer.android.com/topic/performance/vitals/crash'
      }
    ],
    relatedIssues: [
      {
        question: 'What if the issue doesn\'t appear in my screenshot?',
        answer: 'For intermittent issues, try capturing multiple screenshots when the problem occurs. Alternatively, use the text description method to explain the problem in detail, including when and how often it happens.'
      },
      {
        question: 'How accurate is the automated screen analysis?',
        answer: 'Screen analysis provides a general assessment based on visual indicators. For the most accurate diagnosis, combine screen sharing with a detailed text description of your problem.'
      },
      {
        question: 'Should I share my entire screen or just one window?',
        answer: 'Share only the window or area showing the problem. This protects your privacy and helps the analysis focus on relevant information. You can choose what to share when prompted by your browser.'
      }
    ],
    analysisType: 'screen-capture',
    detectedIssues: analysisData.issues
  };
}
