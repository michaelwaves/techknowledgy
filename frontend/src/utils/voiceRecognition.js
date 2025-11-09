// Voice recognition utility for speech-to-text

export const startVoiceRecognition = (onResult, onError, onEnd) => {
  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    return null;
  }

  const recognition = new SpeechRecognition();
  
  // Configuration
  recognition.continuous = true;  // Keep listening until stopped
  recognition.interimResults = true;  // Show partial results as user speaks
  recognition.lang = 'en-US';  // Language (can be made dynamic)
  recognition.maxAlternatives = 1;

  // Event handlers
  recognition.onstart = () => {
    console.log('Voice recognition started. Speak now...');
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    // Process all results
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    // Call the result callback with both interim and final text
    onResult({
      final: finalTranscript,
      interim: interimTranscript,
      isFinal: finalTranscript.length > 0
    });
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = 'An error occurred during voice recognition.';
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage = 'Microphone not found or permission denied.';
        break;
      case 'not-allowed':
        errorMessage = 'Microphone access denied. Please allow microphone access in your browser settings.';
        break;
      case 'network':
        errorMessage = 'Network error occurred. Please check your connection.';
        break;
      case 'aborted':
        errorMessage = 'Voice recognition was aborted.';
        break;
      default:
        errorMessage = `Error: ${event.error}`;
    }
    
    onError(errorMessage);
  };

  recognition.onend = () => {
    console.log('Voice recognition ended.');
    if (onEnd) onEnd();
  };

  return recognition;
};

// Check if speech recognition is supported
export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// Get list of supported languages (common ones)
export const getSupportedLanguages = () => {
  return [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ar-SA', name: 'Arabic' },
  ];
};
