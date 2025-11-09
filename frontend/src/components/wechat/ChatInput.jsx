import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Image as ImageIcon, Mic, Send, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { startVoiceRecognition, isSpeechRecognitionSupported } from '@/utils/voiceRecognition';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  const handleSend = () => {
    if (!message.trim()) return;

    onSendMessage({
      type: 'text',
      content: message.trim()
    });

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onSendMessage({
        type: 'image',
        content: event.target.result
      });
      toast.success('Image sent!');
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      toast.error('Voice recording is not supported in your browser');
      return;
    }

    setIsRecording(true);
    setRecordingDuration(0);
    toast.info('Recording voice message...');

    // Start duration timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);

    // Start voice recognition
    const recognition = startVoiceRecognition(
      (result) => {
        // Store the transcript for when we stop
        transcriptRef.current = result.final || result.interim;
      },
      (error) => {
        toast.error(error);
        stopRecording();
      },
      () => {
        // Recognition ended
      }
    );

    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    // Stop timer
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // Stop recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }

    // Send voice message
    if (recordingDuration > 0) {
      onSendMessage({
        type: 'voice',
        content: transcriptRef.current || `Voice message (${recordingDuration}s)`,
        duration: recordingDuration
      });
      toast.success('Voice message sent!');
    }

    setRecordingDuration(0);
    transcriptRef.current = '';
  };

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="border-t border-border bg-card">
      <div className="p-4">
        {/* Recording Indicator */}
        {isRecording && (
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium text-destructive">
                Recording... {recordingDuration}s
              </span>
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={stopRecording}
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end gap-2">
          {/* Emoji Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => toast.info('Emoji picker coming soon!')}
          >
            <Smile className="h-5 w-5" />
          </Button>

          {/* Text Input */}
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
            disabled={isRecording}
          />

          {/* Image Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={isRecording}
          >
            <ImageIcon className="h-5 w-5" />
          </Button>

          {/* Voice/Send Button */}
          {message.trim() ? (
            <Button
              onClick={handleSend}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              size="icon"
              variant={isRecording ? "destructive" : "default"}
              className="shrink-0"
            >
              {isRecording ? (
                <StopCircle className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        {/* Instructions */}
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {isRecording
            ? 'Release to send, tap stop to cancel'
            : 'Hold mic button to record voice message'}
        </p>
      </div>
    </div>
  );
}
