// Screen capture utility for analyzing user's screen

export const captureScreen = async () => {
  try {
    // Request screen sharing permission
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: 'screen',
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });

    // Create video element to capture frame
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Wait for video to be ready
    await new Promise(resolve => {
      video.onloadedmetadata = resolve;
    });

    // Create canvas and capture screenshot
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());

    // Convert to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });

    // Convert to base64 for easy handling
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    return {
      success: true,
      screenshot: base64,
      dimensions: {
        width: canvas.width,
        height: canvas.height
      }
    };
  } catch (error) {
    console.error('Screen capture error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Analyze screenshot for common issues
export const analyzeScreenshot = (screenshotData, phoneModel) => {
  // In a real implementation, this would use computer vision or AI
  // For now, we'll simulate analysis with mock data
  
  const commonIssues = [
    {
      type: 'error_detected',
      title: 'Error Messages Detected',
      confidence: 'high',
      findings: [
        'Application error dialog visible',
        'System notification indicating a problem',
        'Warning icons in system tray'
      ]
    },
    {
      type: 'performance',
      title: 'Performance Indicators',
      confidence: 'medium',
      findings: [
        'Multiple applications running simultaneously',
        'System resource usage appears elevated',
        'Potential memory-intensive processes active'
      ]
    },
    {
      type: 'ui_issues',
      title: 'User Interface Issues',
      confidence: 'low',
      findings: [
        'Window responsiveness appears normal',
        'No obvious visual glitches detected',
        'Display rendering functioning correctly'
      ]
    }
  ];

  // Randomly select 1-2 issues to simulate realistic analysis
  const detectedIssues = commonIssues.slice(0, Math.floor(Math.random() * 2) + 1);

  return {
    analyzed: true,
    deviceModel: phoneModel,
    timestamp: new Date().toISOString(),
    issues: detectedIssues,
    screenshot: screenshotData
  };
};
