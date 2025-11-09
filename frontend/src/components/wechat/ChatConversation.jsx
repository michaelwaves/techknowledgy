import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import { formatMessageTime } from '@/utils/wechatHelpers';

export default function ChatConversation({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <ScrollArea ref={scrollRef} className="h-full">
      <div className="p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                {date === new Date().toLocaleDateString() ? 'Today' : date}
              </span>
            </div>

            {/* Messages for this date */}
            {msgs.map((message, index) => {
              const showTime = index === 0 || 
                (new Date(message.timestamp).getTime() - new Date(msgs[index - 1].timestamp).getTime()) > 300000; // 5 minutes
              
              return (
                <div key={message.id}>
                  {showTime && (
                    <div className="flex justify-center mb-2">
                      <span className="text-xs text-muted-foreground">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <MessageBubble message={message} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
