// Mock data generator for troubleshooting answers

const commonIssues = {
  battery: {
    explanation: `Battery drain issues are commonly caused by background apps, screen brightness, or outdated software. Your device's battery health can also deteriorate over time, reducing overall capacity. Background processes, location services, and push notifications can significantly impact battery life.

For optimal battery performance, it's essential to manage your device's power-consuming features and keep your system updated. Most modern devices have built-in battery health monitoring tools that can help identify problematic apps or settings.`,
    visualGuide: {
      title: 'Visual Guide: Battery Settings',
      image: 'https://images.unsplash.com/photo-1607027340685-3e1ae9a54a93',
      description: 'Navigate to Settings → Battery to see which apps are using the most power'
    },
    steps: [
      'Open Settings and navigate to Battery settings to identify apps consuming the most power',
      'Disable background app refresh for apps you don\'t need updating constantly',
      'Reduce screen brightness or enable auto-brightness to optimize power consumption',
      'Turn off location services for apps that don\'t require it',
      'Check for system updates and install them - they often include battery optimization improvements',
      'Enable Low Power Mode when battery is running low',
      'Consider replacing the battery if it\'s showing significant degradation (typically below 80% health)',
    ],
    tips: [
      'Avoid letting your battery drain to 0% regularly - this can damage battery health',
      'Keep your device updated with the latest OS version for battery optimizations',
      'Use original or certified chargers to maintain battery health',
      'Extreme temperatures (hot or cold) can significantly affect battery performance',
      'Close unused apps completely rather than leaving them running in the background',
    ],
    resources: [
      {
        title: 'Apple Battery Health Guide',
        description: 'Official guide on maximizing battery life and understanding battery health',
        url: 'https://support.apple.com/en-us/HT208387',
      },
      {
        title: 'Android Battery Optimization',
        description: 'Google\'s comprehensive guide to battery management',
        url: 'https://support.google.com/android/answer/7664358',
      },
      {
        title: 'Battery University - Battery Life Guide',
        description: 'In-depth technical information about battery care and maintenance',
        url: 'https://batteryuniversity.com/',
      },
    ],
    relatedIssues: [
      {
        question: 'Why does my phone heat up while charging?',
        answer: 'Heating during charging is normal to some extent, but excessive heat can indicate a problem with the charger, charging port, or battery. Use original chargers and avoid using the phone heavily while charging.',
      },
      {
        question: 'Should I charge my phone overnight?',
        answer: 'Modern smartphones have charging protection, so overnight charging is generally safe. However, maintaining a charge between 20-80% is ideal for long-term battery health.',
      },
      {
        question: 'How often should I replace my phone battery?',
        answer: 'Typically, batteries should be replaced when they fall below 80% of their original capacity, usually after 2-3 years of regular use. Check your battery health in settings to determine if replacement is needed.',
      },
    ],
  },
  wifi: {
    explanation: `WiFi connectivity issues can stem from various sources including router problems, network settings, software glitches, or interference from other devices. The problem might be with your device's WiFi adapter, the router's configuration, or even your internet service provider.

Before diving into complex solutions, it's important to identify whether the issue is specific to your device or affects all devices on the network. This will help narrow down the root cause.`,
    visualGuide: {
      title: 'Visual Guide: WiFi Settings',
      image: 'https://images.unsplash.com/photo-1753973170095-09e6a8515a0f',
      description: 'Go to Settings → WiFi to manage your network connections'
    },
    steps: [
      'Toggle WiFi off and on in your device settings - this refreshes the connection',
      'Restart your phone completely to clear any temporary software glitches',
      'Forget the WiFi network in settings, then reconnect by entering the password again',
      'Restart your router by unplugging it for 30 seconds, then plugging it back in',
      'Check if other devices can connect to the same network to isolate the issue',
      'Reset network settings on your device (this will remove all saved WiFi networks)',
      'Update your device\'s operating system to the latest version',
      'If the problem persists, check your router\'s firmware and update if available',
    ],
    tips: [
      'Keep your device within reasonable range of the router for optimal signal strength',
      'Avoid physical obstructions like walls and metal objects between device and router',
      'Change your WiFi channel in router settings if experiencing interference',
      'Use 5GHz band when available for faster speeds and less interference',
      'Regularly restart your router (weekly) to maintain optimal performance',
    ],
    resources: [
      {
        title: 'Google WiFi Troubleshooting',
        description: 'Comprehensive guide for fixing Android WiFi issues',
        url: 'https://support.google.com/pixelphone/answer/6183600',
      },
      {
        title: 'Apple WiFi Support',
        description: 'Official troubleshooting steps for iPhone WiFi problems',
        url: 'https://support.apple.com/en-us/HT204051',
      },
      {
        title: 'Router Setup Best Practices',
        description: 'Learn how to optimize your home network setup',
        url: 'https://www.howtogeek.com/',
      },
    ],
    relatedIssues: [
      {
        question: 'Why does WiFi keep disconnecting randomly?',
        answer: 'Random disconnections can be caused by power saving settings, router issues, or network congestion. Try disabling power saving mode for WiFi and updating your router firmware.',
      },
      {
        question: 'My WiFi connects but has no internet access',
        answer: 'This usually indicates a problem with your router or ISP. Restart your modem and router, check if other devices have internet, and contact your ISP if the problem persists.',
      },
      {
        question: 'Why is my WiFi speed slower on my phone than other devices?',
        answer: 'This could be due to outdated device software, too many background apps using data, or your device being on a slower WiFi band. Update your OS and try connecting to the 5GHz band if available.',
      },
    ],
  },
  storage: {
    explanation: `Storage issues occur when your device's internal memory is nearly full, which can slow down performance and prevent new apps or updates from installing. Photos, videos, apps, and cached data are the primary culprits of storage consumption.

Modern smartphones offer various tools to manage storage efficiently, including cloud storage options, storage analyzers, and automatic cleanup features. Regular maintenance can prevent storage from becoming a persistent problem.`,
    visualGuide: {
      title: 'Visual Guide: Storage Management',
      image: 'https://images.pexels.com/photos/20360351/pexels-photo-20360351.jpeg',
      description: 'Check Settings → Storage to see a breakdown of what\'s using space'
    },
    steps: [
      'Open Settings > Storage to see what\'s taking up space on your device',
      'Delete unused apps - go through your app list and remove ones you haven\'t used recently',
      'Clear app cache and data for apps that store lots of temporary files (Settings > Apps)',
      'Move photos and videos to cloud storage (Google Photos, iCloud, etc.)',
      'Delete old downloads, screenshots, and duplicate photos',
      'Use your device\'s built-in storage cleaner or optimization tool',
      'Consider using an SD card for expandable storage (if your device supports it)',
      'Offload rarely used apps (iOS feature that removes apps but keeps data)',
    ],
    tips: [
      'Enable automatic photo backup to cloud services to free up space',
      'Regularly review and delete old messages with large attachments',
      'Stream music and videos instead of downloading when possible',
      'Use "lite" versions of apps when available - they use less storage',
      'Clear your browser cache and download history periodically',
    ],
    resources: [
      {
        title: 'Google Photos Storage Guide',
        description: 'How to back up photos and free up device storage',
        url: 'https://support.google.com/photos/answer/6193313',
      },
      {
        title: 'iCloud Storage Management',
        description: 'Apple\'s guide to managing device and iCloud storage',
        url: 'https://support.apple.com/en-us/HT204247',
      },
      {
        title: 'Android Storage Tips',
        description: 'Comprehensive guide to freeing up Android storage',
        url: 'https://support.google.com/android/answer/7431795',
      },
    ],
    relatedIssues: [
      {
        question: 'What is "Other" storage and how do I clear it?',
        answer: '"Other" storage includes system files, caches, logs, and Siri voices. To clear it, try restarting your device, clearing Safari cache, and deleting old messages. A full backup and restore can also help.',
      },
      {
        question: 'Do I need to buy more iCloud/Google storage?',
        answer: 'Cloud storage is useful for backups and accessing files across devices. The free tier is often sufficient, but heavy users of photos/videos may benefit from paid plans.',
      },
      {
        question: 'Will an SD card slow down my phone?',
        answer: 'A high-quality SD card (Class 10 or UHS) won\'t slow down your phone. However, apps generally run better on internal storage, so use SD cards mainly for media files.',
      },
    ],
  },
  slow: {
    explanation: `A slow or laggy phone is frustrating and can be caused by multiple factors including insufficient storage, too many background processes, outdated software, or hardware limitations. Over time, as you install more apps and accumulate data, performance naturally degrades.

The good news is that most performance issues can be resolved through optimization and maintenance. Regular cleanup and smart usage habits can keep your device running smoothly for years.`,
    steps: [
      'Restart your device to clear RAM and close background processes',
      'Check available storage - aim to keep at least 1-2GB free at all times',
      'Update your operating system to the latest version with performance improvements',
      'Clear cache for frequently used apps (Settings > Apps > [App Name] > Clear Cache)',
      'Disable or remove unused apps and widgets that run in the background',
      'Turn off animations and reduce motion effects in accessibility settings',
      'Disable automatic app updates and sync to reduce background activity',
      'Factory reset as a last resort (backup your data first)',
    ],
    tips: [
      'Restart your phone at least once a week to maintain optimal performance',
      'Avoid installing battery saver or phone booster apps - they often make things worse',
      'Use lighter versions of apps (Facebook Lite, Messenger Lite, etc.) when available',
      'Limit the number of apps that can run in the background',
      'Keep your device cool - overheating can cause thermal throttling and slower performance',
    ],
    resources: [
      {
        title: 'Android Performance Optimization',
        description: 'Google\'s official guide to improving Android device speed',
        url: 'https://support.google.com/android/answer/7667018',
      },
      {
        title: 'iPhone Performance Tips',
        description: 'Apple\'s recommendations for maintaining iPhone speed',
        url: 'https://support.apple.com/en-us/HT207935',
      },
      {
        title: 'Tech Guide: Speed Up Your Smartphone',
        description: 'Comprehensive guide with advanced tips and tricks',
        url: 'https://www.wired.com/story/how-to-speed-up-phone/',
      },
    ],
    relatedIssues: [
      {
        question: 'Why does my phone get slower over time?',
        answer: 'Phones slow down due to accumulated apps, data, cached files, and software updates that may demand more resources. Regular maintenance and selective app installation help maintain speed.',
      },
      {
        question: 'Should I do a factory reset?',
        answer: 'A factory reset can significantly improve performance by removing all accumulated clutter, but it should be a last resort. Always backup your data before resetting.',
      },
      {
        question: 'Do phone cleaning apps really help?',
        answer: 'Most cleaning apps are unnecessary and can actually slow down your device. Modern operating systems have built-in optimization tools that work better without third-party apps.',
      },
    ],
  },
  screen: {
    explanation: `Screen and display issues can range from touch responsiveness problems to brightness issues or dead pixels. Your device's display is one of its most important components, and proper care can prevent many common issues.\n\nMost screen problems are software-related and can be fixed without hardware repair. However, physical damage like cracks or water damage may require professional service.`,
    steps: [
      'Clean your screen thoroughly with a microfiber cloth to remove dirt and oils',
      'Restart your device to resolve temporary display glitches',
      'Check auto-brightness settings and adjust manually if needed',
      'Remove any screen protectors temporarily to test if they\'re causing touch issues',
      'Calibrate touch sensitivity in Settings > Display or Accessibility',
      'Update your device software to the latest version',
      'Test in safe mode to rule out third-party app conflicts',
      'If physical damage is present, contact authorized service center'
    ],
    tips: [
      'Use a quality screen protector to prevent scratches and cracks',
      'Avoid extreme temperatures which can damage LCD/OLED displays',
      'Don\'t press too hard on the screen - modern displays are pressure-sensitive',
      'Keep brightness at moderate levels to extend screen lifespan',
      'Enable dark mode to reduce OLED screen burn-in risk'
    ],
    resources: [
      {
        title: 'Display Settings Guide',
        description: 'Optimize your screen settings for best performance',
        url: 'https://support.apple.com/guide/iphone/adjust-the-screen-brightness-iph3e2e367e/ios'
      },
      {
        title: 'Touch Screen Troubleshooting',
        description: 'Fix touch responsiveness and calibration issues',
        url: 'https://support.google.com/android/answer/6080850'
      },
      {
        title: 'Screen Protection Tips',
        description: 'How to protect and care for your device screen',
        url: 'https://www.ifixit.com/News/screen-care-guide'
      }
    ],
    relatedIssues: [
      {
        question: 'Is screen burn-in permanent?',
        answer: 'OLED screen burn-in is permanent but can be minimized. Use dark mode, vary content, reduce brightness, and enable screen timeout to prevent it. LCD screens don\'t suffer from burn-in.'
      },
      {
        question: 'Why is my screen not responding to touch?',
        answer: 'Clean the screen, restart the device, remove screen protectors, and check if it works in safe mode. If the problem persists, it may be a hardware issue requiring professional repair.'
      },
      {
        question: 'Can I fix a cracked screen myself?',
        answer: 'While DIY kits exist, professional repair is recommended for modern smartphones due to complex assembly and risk of further damage. Check warranty coverage first.'
      }
    ]
  },
  app: {
    explanation: `Application issues like crashes, freezing, or installation problems are common on all devices. Your device may experience these due to software conflicts, insufficient storage, outdated apps, or corrupted data.\n\nMost app problems can be resolved by clearing cache, updating, or reinstalling the problematic application. Understanding app management is key to a smooth experience.`,
    visualGuide: {
      title: 'Visual Guide: App Settings',
      image: 'https://images.unsplash.com/photo-1762330462311-f75969906e16',
      description: 'Access Settings → Apps to manage individual app settings and clear cache'
    },
    steps: [
      'Force close the problematic app from the app switcher or recent apps menu',
      'Clear the app cache in Settings > Apps > [App Name] > Clear Cache',
      'Check for app updates in the App Store or Google Play Store',
      'Ensure you have sufficient storage space (at least 1-2GB free)',
      'Restart your device to clear temporary system issues',
      'If the problem persists, uninstall and reinstall the app',
      'Check if other users report similar issues (search online or check app reviews)',
      'Contact the app developer through the app store if the issue continues'
    ],
    tips: [
      'Keep apps updated to get bug fixes and performance improvements',
      'Don\'t install apps from unknown sources - use official app stores',
      'Review app permissions and only grant what\'s necessary',
      'Clear app cache regularly for apps you use frequently',
      'Uninstall apps you no longer use to free up resources'
    ],
    resources: [
      {
        title: 'App Store Support',
        description: 'Downloading and updating apps on iOS',
        url: 'https://support.apple.com/app-store'
      },
      {
        title: 'Google Play Help',
        description: 'Fix problems with apps on Android',
        url: 'https://support.google.com/googleplay/answer/9037938'
      },
      {
        title: 'App Management Best Practices',
        description: 'How to manage and troubleshoot mobile apps',
        url: 'https://www.androidauthority.com/how-to-fix-android-apps-crashing-1148830/'
      }
    ],
    relatedIssues: [
      {
        question: 'Why do apps keep crashing after an update?',
        answer: 'New updates may have bugs or compatibility issues. Try clearing cache, restarting your device, or uninstalling and reinstalling the app. Check for a newer update that may fix the issue.'
      },
      {
        question: 'What\'s the difference between clearing cache and clearing data?',
        answer: 'Clearing cache removes temporary files (safe to do). Clearing data removes all app settings and login info (like a fresh install). Start with cache, only clear data if necessary.'
      },
      {
        question: 'Why can\'t I download or update apps?',
        answer: 'Check your internet connection, ensure sufficient storage space, verify your payment method is valid, and check if parental controls or restrictions are enabled.'
      }
    ]
  },
  audio: {
    explanation: `Audio problems on your device can include no sound, distorted audio, speaker issues, or headphone jack problems. These issues may stem from software settings, blocked speakers, or hardware damage.\n\nMost audio issues can be resolved through settings adjustments or cleaning, though physical damage may require professional repair.`,
    steps: [
      'Check that your device is not in silent mode or Do Not Disturb',
      'Adjust volume using volume buttons and check all volume settings (ringtone, media, alarm)',
      'Clean speaker grills and ports gently with a soft brush to remove debris',
      'Test with headphones to determine if the issue is with speakers or system-wide',
      'Restart your device to clear any software glitches affecting audio',
      'Check if any Bluetooth devices are connected and disconnect them',
      'Reset all settings (Settings > General > Reset > Reset All Settings)',
      'Test audio in safe mode to rule out third-party app interference'
    ],
    tips: [
      'Don\'t cover speakers with cases or hands during calls or media playback',
      'Avoid exposing your device to water - even water-resistant devices can develop issues',
      'Use volume limiting features to prevent speaker damage from loud volumes',
      'Regularly clean speaker grills to prevent dust buildup',
      'Test audio immediately after software updates to catch issues early'
    ],
    resources: [
      {
        title: 'iPhone Sound Issues',
        description: 'Official Apple guide to fixing audio problems',
        url: 'https://support.apple.com/en-us/HT203794'
      },
      {
        title: 'Android Audio Troubleshooting',
        description: 'Fix sound and volume issues on Android devices',
        url: 'https://support.google.com/android/answer/9079112'
      },
      {
        title: 'Speaker Care Guide',
        description: 'How to maintain and protect your device speakers',
        url: 'https://www.ifixit.com/Device/Speaker'
      }
    ],
    relatedIssues: [
      {
        question: 'Why is my speaker muffled or distorted?',
        answer: 'Clean the speaker grills carefully, check for water damage indicators, ensure no debris is stuck, and test at different volumes. If distortion persists at all volumes, it may be hardware damage.'
      },
      {
        question: 'One speaker works but the other doesn\'t - is this normal?',
        answer: 'Many phones have one speaker and one earpiece (for calls). Check your device specs. If both speakers should work and one doesn\'t, clean the grills or seek repair.'
      },
      {
        question: 'Why does audio only work with headphones?',
        answer: 'The device may think headphones are still connected. Clean the headphone jack/port, toggle Bluetooth on/off, restart the device, and check for stuck debris in the port.'
      }
    ]
  },
  general: {
    explanation: `I noticed your question might not be tech-related. TechFix specializes in troubleshooting technology issues including devices (phones, computers, tablets), software (apps, programs, operating systems), and digital services.\n\nThis appears to be outside our tech support scope. However, I can still provide some general guidance on where to find help for your specific need.`,
    steps: [
      'For flight check-in: Visit your airline\'s official website or mobile app',
      'Look for the "Check-in" or "Manage Booking" section on the airline website',
      'Enter your confirmation number and last name from your booking email',
      'Follow the prompts to select seats and get your boarding pass',
      'Download the boarding pass to your phone or print it',
      'If you encounter issues, contact your airline\'s customer service directly',
      'For tech-related questions (phone, WiFi, battery, etc.), I\'m here to help!'
    ],
    tips: [
      'Save airline apps on your phone for easy mobile check-in',
      'Check-in typically opens 24 hours before your flight',
      'Keep your confirmation email handy for reference',
      'For actual tech problems with your device, feel free to ask me specific questions',
      'I can help with battery issues, WiFi problems, slow performance, storage, and more'
    ],
    resources: [
      {
        title: 'Airline Customer Service',
        description: 'Contact your airline for flight-related questions',
        url: 'https://www.google.com/search?q=airline+customer+service'
      },
      {
        title: 'Flight Check-in Guide',
        description: 'General guide to online flight check-in',
        url: 'https://www.skyscanner.com/tips-and-inspiration/online-check-in-guide'
      },
      {
        title: 'Back to Tech Support',
        description: 'Ask me about device issues, software problems, or tech troubleshooting',
        url: '#'
      }
    ],
    relatedIssues: [
      {
        question: 'What kind of questions can TechFix help with?',
        answer: 'TechFix specializes in technology troubleshooting: phone/tablet/computer issues, battery problems, WiFi connectivity, slow performance, storage issues, app crashes, screen problems, audio issues, and software glitches.'
      },
      {
        question: 'Can I still get help for non-tech questions?',
        answer: 'While TechFix focuses on technology issues, I try to provide helpful guidance for any question. For best results, ask about device problems, software issues, or tech troubleshooting needs.'
      },
      {
        question: 'My device has multiple problems - can you help?',
        answer: 'Absolutely! Describe all your device issues and I\'ll provide comprehensive troubleshooting steps. You can also ask follow-up questions or use the screen sharing feature to show me the problem.'
      }
    ]
  }
};

export function generateTroubleshootAnswer(question, phoneModel) {
  const lowerQuestion = question.toLowerCase();
  
  // Determine the issue type based on keywords
  let issueType = 'general'; // default for unrecognized questions
  
  if (lowerQuestion.includes('battery') || lowerQuestion.includes('charge') || lowerQuestion.includes('drain') || lowerQuestion.includes('power')) {
    issueType = 'battery';
  } else if (lowerQuestion.includes('wifi') || lowerQuestion.includes('wi-fi') || lowerQuestion.includes('internet') || lowerQuestion.includes('network') || lowerQuestion.includes('connection')) {
    issueType = 'wifi';
  } else if (lowerQuestion.includes('slow') || lowerQuestion.includes('lag') || lowerQuestion.includes('freeze') || lowerQuestion.includes('performance') || lowerQuestion.includes('hang')) {
    issueType = 'slow';
  } else if (lowerQuestion.includes('storage') || lowerQuestion.includes('space') || lowerQuestion.includes('memory') || lowerQuestion.includes('full')) {
    issueType = 'storage';
  } else if (lowerQuestion.includes('screen') || lowerQuestion.includes('display') || lowerQuestion.includes('brightness') || lowerQuestion.includes('touch')) {
    issueType = 'screen';
  } else if (lowerQuestion.includes('app') || lowerQuestion.includes('application') || lowerQuestion.includes('crash') || lowerQuestion.includes('install')) {
    issueType = 'app';
  } else if (lowerQuestion.includes('sound') || lowerQuestion.includes('audio') || lowerQuestion.includes('speaker') || lowerQuestion.includes('volume')) {
    issueType = 'audio';
  }
  
  return commonIssues[issueType];
}
