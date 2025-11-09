// Mock data for WeChat-like interface

export const mockChats = [
  {
    id: 1,
    name: 'Tech Support',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    lastMessage: 'How can I help you today?',
    timestamp: new Date().toISOString(),
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    lastMessage: 'Thanks for the help!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'John Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    lastMessage: '[Voice message]',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    unread: 1,
    online: false
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    lastMessage: '[Image]',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    unread: 0,
    online: false
  }
];

export const mockMessages = [
  {
    id: 1,
    chatId: 1,
    sender: 'tech',
    type: 'text',
    content: 'Hello! Welcome to TechFix support. How can I help you today?',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    read: true
  },
  {
    id: 2,
    chatId: 1,
    sender: 'me',
    type: 'text',
    content: 'Hi! My phone battery is draining really fast.',
    timestamp: new Date(Date.now() - 540000).toISOString(),
    read: true
  },
  {
    id: 3,
    chatId: 1,
    sender: 'tech',
    type: 'text',
    content: 'I understand that can be frustrating. Let me ask you a few questions to help diagnose the issue.',
    timestamp: new Date(Date.now() - 480000).toISOString(),
    read: true
  },
  {
    id: 4,
    chatId: 1,
    sender: 'tech',
    type: 'voice',
    content: 'Voice message',
    duration: 8,
    timestamp: new Date(Date.now() - 420000).toISOString(),
    read: true
  },
  {
    id: 5,
    chatId: 1,
    sender: 'me',
    type: 'voice',
    content: 'Voice message',
    duration: 15,
    timestamp: new Date(Date.now() - 360000).toISOString(),
    read: true
  },
  {
    id: 6,
    chatId: 1,
    sender: 'tech',
    type: 'text',
    content: 'Thanks for that information. Can you share a screenshot of your battery settings?',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    read: true
  },
  {
    id: 7,
    chatId: 1,
    sender: 'me',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    read: true
  },
  {
    id: 8,
    chatId: 1,
    sender: 'tech',
    type: 'text',
    content: 'Perfect! I can see the issue. Here are some steps to fix it:\n\n1. Turn off background app refresh\n2. Reduce screen brightness\n3. Close unused apps\n\nLet me know if you need more help!',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    read: true
  }
];
