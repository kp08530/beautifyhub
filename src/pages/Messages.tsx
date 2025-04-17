
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, ChevronLeft, ChevronRight, Search, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Types for our messages
interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantType: 'user' | 'business' | 'admin';
  lastMessage?: {
    content: string;
    timestamp: Date;
    isFromMe: boolean;
    read: boolean;
  };
  unreadCount: number;
}

const Messages = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const urlParams = new URLSearchParams(location.search);
  const businessIdFromUrl = urlParams.get('business');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Mock data for conversations
  useEffect(() => {
    // This would be replaced with a real API call in production
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participantId: 'admin1',
        participantName: '系統管理員',
        participantType: 'admin',
        lastMessage: {
          content: '您好，有什麼需要幫忙的嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          isFromMe: false,
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: '2',
        participantId: 'business1',
        participantName: '美麗髮廊',
        participantAvatar: '/placeholder.svg',
        participantType: 'business',
        lastMessage: {
          content: '您的預約已確認，期待您的光臨！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          isFromMe: false,
          read: false,
        },
        unreadCount: 1,
      },
      {
        id: '3',
        participantId: 'business2',
        participantName: '時尚美甲',
        participantAvatar: '/placeholder.svg',
        participantType: 'business',
        lastMessage: {
          content: '請問您想預約哪個時段？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          isFromMe: false,
          read: false,
        },
        unreadCount: 1,
      },
      {
        id: '4',
        participantId: 'business3',
        participantName: '專業SPA中心',
        participantAvatar: '/placeholder.svg',
        participantType: 'business',
        lastMessage: {
          content: '我們有新的優惠活動，詳情請見官網。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isFromMe: false,
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: '5',
        participantId: 'business4',
        participantName: '自然美容',
        participantAvatar: '/placeholder.svg',
        participantType: 'business',
        lastMessage: {
          content: '感謝您的光臨，希望您對我們的服務滿意。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          isFromMe: false,
          read: true,
        },
        unreadCount: 0,
      },
    ];
    
    if (businessIdFromUrl) {
      // Find if this business is already in our conversations
      const existingConversation = mockConversations.find(
        conv => conv.participantId === businessIdFromUrl
      );
      
      if (!existingConversation) {
        // If not, create a new conversation with this business
        mockConversations.unshift({
          id: `new-${Date.now()}`,
          participantId: businessIdFromUrl,
          participantName: urlParams.get('businessName') || '美容店家',
          participantAvatar: '/placeholder.svg',
          participantType: 'business',
          unreadCount: 0,
        });
      } else {
        // If it exists, select it
        setSelectedConversation(existingConversation);
        loadMessages(existingConversation.id);
      }
    }
    
    setConversations(mockConversations);
    setTotalPages(Math.ceil(mockConversations.length / 10));
    
    if (mockConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(mockConversations[0]);
      loadMessages(mockConversations[0].id);
    }
  }, [businessIdFromUrl]);
  
  // Function to load messages for a specific conversation
  const loadMessages = (conversationId: string) => {
    // This would be replaced with a real API call in production
    
    // Mock data for messages based on conversation ID
    let mockMessages: Message[] = [];
    
    if (conversationId === '1') {
      // Conversation with admin
      mockMessages = [
        {
          id: '101',
          senderId: 'admin1',
          recipientId: user?.id || 'currentUser',
          content: '您好，歡迎使用BeautifyHub！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          read: true,
        },
        {
          id: '102',
          senderId: user?.id || 'currentUser',
          recipientId: 'admin1',
          content: '你好，我想了解一下如何使用平台預約服務？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5), // 5 minutes later
          read: true,
        },
        {
          id: '103',
          senderId: 'admin1',
          recipientId: user?.id || 'currentUser',
          content: '您可以在首頁瀏覽美容店家，選擇心儀的店家後進入其詳細頁面，點擊"預約"按鈕即可進行預約。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 10 minutes later
          read: true,
        },
        {
          id: '104',
          senderId: 'admin1',
          recipientId: user?.id || 'currentUser',
          content: '如果您有任何問題，隨時可以來訊詢問我們的客服團隊。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), // 15 minutes later
          read: true,
        },
        {
          id: '105',
          senderId: user?.id || 'currentUser',
          recipientId: 'admin1',
          content: '謝謝，我明白了。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 20), // 20 minutes later
          read: true,
        },
        {
          id: '106',
          senderId: 'admin1',
          recipientId: user?.id || 'currentUser',
          content: '您好，有什麼需要幫忙的嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          read: true,
        },
      ];
    } else if (conversationId === '2') {
      // Conversation with 美麗髮廊
      mockMessages = [
        {
          id: '201',
          senderId: user?.id || 'currentUser',
          recipientId: 'business1',
          content: '你好，我想預約這週六下午2點的剪髮服務。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          read: true,
        },
        {
          id: '202',
          senderId: 'business1',
          recipientId: user?.id || 'currentUser',
          content: '您好，很抱歉，週六下午2點已被預約。請問您可以改到3點或週日同時段嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true,
        },
        {
          id: '203',
          senderId: user?.id || 'currentUser',
          recipientId: 'business1',
          content: '那週六3點可以嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
          read: true,
        },
        {
          id: '204',
          senderId: 'business1',
          recipientId: user?.id || 'currentUser',
          content: '週六3點可以的，已為您預留。請問是否要確認預約？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.2), // 1.2 hours ago
          read: true,
        },
        {
          id: '205',
          senderId: user?.id || 'currentUser',
          recipientId: 'business1',
          content: '是的，我確認預約。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.1), // 1.1 hours ago
          read: true,
        },
        {
          id: '206',
          senderId: 'business1',
          recipientId: user?.id || 'currentUser',
          content: '您的預約已確認，期待您的光臨！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          read: false,
        },
      ];
    } else if (conversationId === '3') {
      // Conversation with 時尚美甲
      mockMessages = [
        {
          id: '301',
          senderId: 'business2',
          recipientId: user?.id || 'currentUser',
          content: '感謝您關注我們的服務！我們最近推出了全新的美甲款式，歡迎預約體驗。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          read: true,
        },
        {
          id: '302',
          senderId: user?.id || 'currentUser',
          recipientId: 'business2',
          content: '你好，我對你們的新款式很有興趣，可以發一些照片給我參考嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          read: true,
        },
        {
          id: '303',
          senderId: 'business2',
          recipientId: user?.id || 'currentUser',
          content: '當然可以，我們稍後會發送照片給您。您打算什麼時候來做美甲呢？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
          read: true,
        },
        {
          id: '304',
          senderId: user?.id || 'currentUser',
          recipientId: 'business2',
          content: '我想看看照片後再決定時間。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.2), // 3.2 hours ago
          read: true,
        },
        {
          id: '305',
          senderId: 'business2',
          recipientId: user?.id || 'currentUser',
          content: '請問您想預約哪個時段？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          read: false,
        },
      ];
    } else if (conversationId === '4') {
      // Conversation with 專業SPA中心
      mockMessages = [
        {
          id: '401',
          senderId: user?.id || 'currentUser',
          recipientId: 'business3',
          content: '你們有提供全身按摩服務嗎？',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
          read: true,
        },
        {
          id: '402',
          senderId: 'business3',
          recipientId: user?.id || 'currentUser',
          content: '是的，我們提供多種按摩服務，包括瑞典式、泰式和香薰按摩。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 29), // 29 hours ago
          read: true,
        },
        {
          id: '403',
          senderId: 'business3',
          recipientId: user?.id || 'currentUser',
          content: '我們有專業的按摩師提供服務，價格從NT$1800起，視服務時長和類型而定。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28), // 28 hours ago
          read: true,
        },
        {
          id: '404',
          senderId: user?.id || 'currentUser',
          recipientId: 'business3',
          content: '好的，謝謝資訊。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
          read: true,
        },
        {
          id: '405',
          senderId: 'business3',
          recipientId: user?.id || 'currentUser',
          content: '我們有新的優惠活動，詳情請見官網。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
          read: true,
        },
      ];
    } else if (conversationId === '5') {
      // Conversation with 自然美容
      mockMessages = [
        {
          id: '501',
          senderId: 'business4',
          recipientId: user?.id || 'currentUser',
          content: '您好，感謝您上次光臨我們的店面，希望您對我們的服務感到滿意。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
          read: true,
        },
        {
          id: '502',
          senderId: user?.id || 'currentUser',
          recipientId: 'business4',
          content: '服務很好，謝謝！',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.9), // 3.9 days ago
          read: true,
        },
        {
          id: '503',
          senderId: 'business4',
          recipientId: user?.id || 'currentUser',
          content: '我們現在推出了新的會員方案，如果您有興趣可以再來店裡諮詢。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5), // 3.5 days ago
          read: true,
        },
        {
          id: '504',
          senderId: user?.id || 'currentUser',
          recipientId: 'business4',
          content: '好的，我考慮一下。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.2), // 3.2 days ago
          read: true,
        },
        {
          id: '505',
          senderId: 'business4',
          recipientId: user?.id || 'currentUser',
          content: '感謝您的光臨，希望您對我們的服務滿意。',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          read: true,
        },
      ];
    } else {
      // Default for new conversations
      mockMessages = [];
    }
    
    // Sort messages by timestamp
    mockMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    setMessages(mockMessages);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
        ? { ...conv, unreadCount: 0, lastMessage: conv.lastMessage ? { ...conv.lastMessage, read: true } : undefined } 
        : conv
      )
    );
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Create a new message
    const message: Message = {
      id: `new-${Date.now()}`,
      senderId: user?.id || 'currentUser',
      recipientId: selectedConversation.participantId,
      content: newMessage,
      timestamp: new Date(),
      read: false,
    };
    
    // Add message to the conversation
    setMessages(prev => [...prev, message]);
    
    // Update last message in conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            lastMessage: {
              content: newMessage,
              timestamp: new Date(),
              isFromMe: true,
              read: false,
            }
          } 
        : conv
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // In a real app, you would send this message to your backend
    toast({
      title: "訊息已發送",
      description: "訊息已成功發送",
    });
  };
  
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation.id);
  };
  
  const filteredConversations = conversations.filter(
    conv => conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedConversations = filteredConversations.slice((page - 1) * 10, page * 10);
  
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const day = 24 * 60 * 60 * 1000;
    
    if (diff < 24 * 60 * 60 * 1000) {
      // Today, show time
      return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 2 * day) {
      // Yesterday
      return `昨天 ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diff < 7 * day) {
      // Within a week
      const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
      return `${days[date.getDay()]} ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      // More than a week
      return date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' });
    }
  };
  
  const getParticipantIcon = (type: 'user' | 'business' | 'admin') => {
    switch (type) {
      case 'admin':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'business':
        return <Store className="h-4 w-4 text-purple-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <h1 className="text-2xl font-bold">訊息中心</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜尋對話"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-auto h-[calc(100vh-250px)]">
              {paginatedConversations.length > 0 ? (
                paginatedConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleConversationSelect(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participantAvatar} />
                          <AvatarFallback className="bg-beauty-primary/10 text-beauty-primary">
                            {getParticipantIcon(conversation.participantType)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-400">
                              {formatMessageDate(conversation.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {conversation.lastMessage ? (
                          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium' : 'text-gray-500'}`}>
                            {conversation.lastMessage.isFromMe ? '你: ' : ''}{conversation.lastMessage.content}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">無訊息</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  沒有符合的對話
                </div>
              )}
            </div>
            
            {filteredConversations.length > 10 && (
              <div className="p-4 border-t flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500">
                  第 {page} 頁，共 {totalPages} 頁
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Message View */}
          <div className="w-full md:w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.participantAvatar} />
                    <AvatarFallback className="bg-beauty-primary/10 text-beauty-primary">
                      {selectedConversation.participantName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedConversation.participantName}</h3>
                    <div className="flex items-center">
                      {getParticipantIcon(selectedConversation.participantType)}
                      <span className="text-xs text-gray-500 ml-1">
                        {selectedConversation.participantType === 'admin' ? '系統管理員' : 
                         selectedConversation.participantType === 'business' ? '商家' : '用戶'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 flex flex-col space-y-4 h-[calc(100vh-350px)]">
                  {messages.length > 0 ? (
                    messages.map((message) => {
                      const isFromMe = message.senderId === (user?.id || 'currentUser');
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-lg p-3 ${
                              isFromMe 
                              ? 'bg-beauty-primary text-white' 
                              : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div 
                              className={`text-xs mt-1 ${
                                isFromMe ? 'text-white/70' : 'text-gray-500'
                              }`}
                            >
                              {formatMessageDate(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <p>還沒有訊息</p>
                        <p className="text-sm">發送一條訊息開始對話吧</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex">
                    <Input
                      placeholder="輸入訊息..."
                      className="flex-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="ml-2"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      發送
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">選擇一個對話</p>
                  <p>從左側列表選擇一個對話開始聊天</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
