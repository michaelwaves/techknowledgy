import { useState } from 'react';
import ChatSidebar from '@/components/wechat/ChatSidebar';
import ChatConversation from '@/components/wechat/ChatConversation';
import ChatInput from '@/components/wechat/ChatInput';
import { mockChats, mockMessages } from '@/utils/wechatMockData';

export default function WeChatPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [chats, setChats] = useState(mockChats);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      chatId: selectedChat.id,
      sender: 'me',
      type: message.type,
      content: message.content,
      timestamp: new Date().toISOString(),
      duration: message.duration,
      read: true
    };

    // Add message to messages list
    setMessages([...messages, newMessage]);

    // Update last message in chat list
    setChats(chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          lastMessage: message.type === 'text' ? message.content : `[${message.type}]`,
          timestamp: new Date().toISOString(),
          unread: 0
        };
      }
      return chat;
    }));
  };

  const currentMessages = messages.filter(msg => msg.chatId === selectedChat.id);

  return (
    <div className="h-screen flex bg-background">
      {/* Chat List Sidebar */}
      <ChatSidebar 
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border bg-card flex items-center px-6">
          <h2 className="text-lg font-semibold text-foreground">{selectedChat.name}</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ChatConversation messages={currentMessages} />
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
