import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

export default function MessageBubble({ message }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isMe = message.sender === 'me';

  const handleVoicePlay = () => {
    // In a real app, this would play the actual audio
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), message.duration * 1000);
  };

  return (
    <div className={`flex gap-2 mb-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isMe && (
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {message.sender.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-md`}>
        {message.type === 'text' && (
          <div
            className={`px-4 py-2 rounded-lg ${
              isMe
                ? 'bg-success text-success-foreground'
                : 'bg-card border border-border text-foreground'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        )}

        {message.type === 'voice' && (
          <button
            onClick={handleVoicePlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isMe
                ? 'bg-success text-success-foreground hover:bg-success/90'
                : 'bg-card border border-border text-foreground hover:bg-accent'
            } ${isPlaying ? 'animate-pulse' : ''}`}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <div className="flex items-center gap-1">
              {/* Voice wave animation */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-0.5 bg-current rounded-full ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    height: `${8 + i * 2}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{message.duration}"</span>
          </button>
        )}

        {message.type === 'image' && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={message.content}
              alt="Shared image"
              className="max-w-xs max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
        )}
      </div>
    </div>
  );
}
