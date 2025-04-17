
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SearchIcon, Send, Paperclip, ChevronLeft, Info, MoreVertical, Image, File, UserPlus, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  };
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'user' | 'business' | 'admin';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

const Messages = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
  // Extract business ID from URL query params if available
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Mock data initialization
    initMockData();
    
    const params = new URLSearchParams(location.search);
    const businessId = params.get('business');
    
    if (businessId) {
      const conversation = generateMockConversations().find(
        c => c.participantId === businessId
      );
      
      if (conversation) {
        setSelectedConversation(conversation);
        // Also generate mock messages for this conversation
        setMessages(generateMockMessages(conversation.participantId));
      }
    }
  }, [isAuthenticated, location, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const initMockData = () => {
    const mockConversations = generateMockConversations();
    setConversations(mockConversations);
    
    if (mockConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(mockConversations[0]);
      setMessages(generateMockMessages(mockConversations[0].participantId));
    }
  };
  
  const generateMockConversations = (): Conversation[] => {
    return [
      {
        id: 'conv1',
        participantId: 'business-1',
        participantName: '美麗髮廊',
        participantAvatar: 'https://i.pravatar.cc/150?u=business1',
        participantType: 'business',
        lastMessage: '您好，請問有什麼需要幫助的嗎？',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        unreadCount: 1,
      },
      {
        id: 'conv2',
        participantId: 'business-2',
        participantName: '時尚美甲',
        participantAvatar: 'https://i.pravatar.cc/150?u=business2',
        participantType: 'business',
        lastMessage: '您好，謝謝您的諮詢，我們的價格方案如附件所示。',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        unreadCount: 0,
      },
      {
        id: 'conv3',
        participantId: 'admin-1',
        participantName: '系統管理員',
        participantAvatar: 'https://i.pravatar.cc/150?u=admin1',
        participantType: 'admin',
        lastMessage: '您好，您的帳號已成功升級為會員。',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        unreadCount: 0,
      },
      {
        id: 'conv4',
        participantId: 'user-1',
        participantName: '李小花',
        participantAvatar: 'https://i.pravatar.cc/150?u=user1',
        participantType: 'user',
        lastMessage: '謝謝您的推薦，我會考慮的。',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        unreadCount: 0,
      },
    ];
  };
  
  const generateMockMessages = (recipientId: string): Message[] => {
    const mockMessages: Message[] = [];
    const now = new Date();
    const userId = 'current-user-id'; // current user's ID
    
    // A day ago
    mockMessages.push({
      id: '1',
      senderId: userId,
      recipientId,
      content: '您好，我想詢問一下關於您的服務。',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24),
      read: true,
    });
    
    mockMessages.push({
      id: '2',
      senderId: recipientId,
      recipientId: userId,
      content: '您好，很高興為您服務。請問您想了解哪方面的服務呢？',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 23.9),
      read: true,
    });
    
    // 12 hours ago
    mockMessages.push({
      id: '3',
      senderId: userId,
      recipientId,
      content: '我想了解一下您的價格方案，特別是關於美髮/美甲的部分。',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 12),
      read: true,
    });
    
    mockMessages.push({
      id: '4',
      senderId: recipientId,
      recipientId: userId,
      content: '我們的美髮/美甲服務價格如下：\n- 基礎剪髮: $500\n- 染髮: $1,200起\n- 燙髮: $1,800起\n\n您可以在我們的網站上查看更多詳情。',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 11),
      read: true,
    });
    
    // Recent
    if (recipientId === 'business-1') {
      mockMessages.push({
        id: '5',
        senderId: recipientId,
        recipientId: userId,
        content: '您好，請問有什麼需要幫助的嗎？',
        timestamp: new Date(now.getTime() - 1000 * 60 * 5),
        read: false,
        attachment: {
          type: 'image',
          url: 'https://source.unsplash.com/random/300x200?beauty',
          name: '價格表.jpg',
        },
      });
    }
    
    return mockMessages;
  };
  
  const filteredConversations = conversations.filter(
    conversation => conversation.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const now = new Date();
    const userId = 'current-user-id'; // current user's ID
    
    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      senderId: userId,
      recipientId: selectedConversation.participantId,
      content: newMessage,
      timestamp: now,
      read: false,
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // Update conversation last message
    setConversations(
      conversations.map(conv => 
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: now,
            }
          : conv
      )
    );
    
    toast({
      title: "訊息已送出",
      description: "您的訊息已成功送出。",
    });
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(generateMockMessages(conversation.participantId));
    
    // Mark as read
    if (conversation.unreadCount > 0) {
      setConversations(
        conversations.map(conv => 
          conv.id === conversation.id
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  };
  
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return '剛剛';
    if (diffMin < 60) return `${diffMin}分鐘前`;
    if (diffHour < 24) return `${diffHour}小時前`;
    if (diffDay < 7) return `${diffDay}天前`;
    
    return date.toLocaleDateString();
  };
  
  const handleAttachImage = () => {
    toast({
      title: "功能開發中",
      description: "附加圖片功能即將推出。",
    });
  };
  
  const handleAttachFile = () => {
    toast({
      title: "功能開發中",
      description: "附加檔案功能即將推出。",
    });
  };
  
  const handleCall = () => {
    toast({
      title: "功能開發中",
      description: "通話功能即將推出。",
    });
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/')} 
              className="mr-4 text-beauty-muted hover:text-beauty-dark transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold">訊息中心</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="md:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="relative mb-4">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={16} />
                  <Input 
                    placeholder="搜尋對話..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <ScrollArea className="h-[500px] pr-3">
                  <div className="space-y-1">
                    {filteredConversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`flex items-start p-3 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                          selectedConversation?.id === conversation.id ? 'bg-beauty-primary/10' : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                            <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">{conversation.participantName}</h3>
                            <span className="text-xs text-beauty-muted">
                              {formatMessageTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Badge 
                              variant="outline" 
                              className={`mr-2 px-1 py-0 text-[10px] ${
                                conversation.participantType === 'admin' 
                                  ? 'bg-purple-100 text-purple-800 border-purple-200' 
                                  : conversation.participantType === 'business'
                                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                                    : 'bg-gray-100 text-gray-800 border-gray-200'
                              }`}
                            >
                              {conversation.participantType === 'admin' 
                                ? '系統管理員' 
                                : conversation.participantType === 'business' 
                                  ? '商家' 
                                  : '用戶'}
                            </Badge>
                            <p className="text-xs text-beauty-muted truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredConversations.length === 0 && (
                      <div className="p-4 text-center text-beauty-muted">
                        沒有找到符合的對話
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            {/* Messages Panel */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[600px]">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedConversation.participantAvatar} alt={selectedConversation.participantName} />
                        <AvatarFallback>{selectedConversation.participantName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedConversation.participantName}</h3>
                        <Badge 
                          variant="outline" 
                          className={`px-1.5 py-0 text-[10px] ${
                            selectedConversation.participantType === 'admin' 
                              ? 'bg-purple-100 text-purple-800 border-purple-200' 
                              : selectedConversation.participantType === 'business'
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          {selectedConversation.participantType === 'admin' 
                            ? '系統管理員' 
                            : selectedConversation.participantType === 'business' 
                              ? '商家' 
                              : '用戶'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="text-beauty-muted hover:text-beauty-primary" onClick={handleCall}>
                        <Phone size={18} />
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-beauty-muted hover:text-beauty-primary">
                            <Info size={18} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-2">
                            <h3 className="font-medium">對話資訊</h3>
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={selectedConversation.participantAvatar} alt={selectedConversation.participantName} />
                                <AvatarFallback>{selectedConversation.participantName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{selectedConversation.participantName}</div>
                                <div className="text-xs text-beauty-muted">
                                  {selectedConversation.participantType === 'admin' 
                                    ? '系統管理員' 
                                    : selectedConversation.participantType === 'business' 
                                      ? '商家' 
                                      : '用戶'}
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div className="space-y-1">
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <UserPlus className="h-4 w-4 mr-2" />
                                新增到聯絡人
                              </Button>
                              {selectedConversation.participantType === 'business' && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full justify-start"
                                  onClick={() => navigate(`/business/${selectedConversation.participantId}`)}
                                >
                                  <Store className="h-4 w-4 mr-2" />
                                  查看商家資訊
                                </Button>
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-beauty-muted hover:text-beauty-primary">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>標記為已讀</DropdownMenuItem>
                          <DropdownMenuItem>靜音通知</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">封鎖</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Messages List */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const isCurrentUser = message.senderId === 'current-user-id';
                        const showDateSeparator = index === 0 || 
                          new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();
                        
                        return (
                          <div key={message.id}>
                            {showDateSeparator && (
                              <div className="text-center my-4">
                                <span className="text-xs bg-gray-100 text-beauty-muted px-2 py-1 rounded-full">
                                  {new Date(message.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            
                            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              {!isCurrentUser && (
                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                  <AvatarImage 
                                    src={selectedConversation.participantAvatar} 
                                    alt={selectedConversation.participantName} 
                                  />
                                  <AvatarFallback>{selectedConversation.participantName[0]}</AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`max-w-[70%] space-y-1`}>
                                <div className={`rounded-lg p-3 ${
                                  isCurrentUser 
                                    ? 'bg-beauty-primary text-white rounded-tr-none' 
                                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                }`}>
                                  {message.content.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                  
                                  {message.attachment && (
                                    <div className="mt-2">
                                      {message.attachment.type === 'image' ? (
                                        <div className="mt-2">
                                          <img 
                                            src={message.attachment.url} 
                                            alt={message.attachment.name}
                                            className="max-w-full rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                          />
                                          <div className="text-xs mt-1 opacity-70">{message.attachment.name}</div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center bg-black/10 rounded-md p-2 mt-1">
                                          <File size={16} className="mr-2" />
                                          <span className="text-sm truncate">{message.attachment.name}</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-xs text-beauty-muted">
                                  {formatMessageTime(message.timestamp)}
                                  {isCurrentUser && (
                                    <span className="ml-1">
                                      {message.read ? '• 已讀' : '• 已送達'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-beauty-muted hover:text-beauty-primary">
                            <Paperclip size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" side="top" align="start">
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              className="w-full justify-start" 
                              onClick={handleAttachImage}
                            >
                              <Image size={16} className="mr-2" />
                              附加圖片
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start"
                              onClick={handleAttachFile}
                            >
                              <File size={16} className="mr-2" />
                              附加檔案
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="輸入訊息..." 
                          className="min-h-[80px] resize-none"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>
                      <Button 
                        className="bg-beauty-primary hover:bg-beauty-primary/90"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-beauty-muted mb-4">選擇一個對話或開始新的對話</div>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/businesses')}
                    >
                      瀏覽商家
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;
