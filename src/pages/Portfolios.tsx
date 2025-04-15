
import { useState, useEffect } from 'react';
import { portfolioItems } from '@/data/services';
import { Search, Heart, MessageCircle, BookmarkPlus, PlusCircle, X, Upload, Info, Bookmark, Award, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import CommentModal from '@/components/CommentModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Extended portfolio item type
interface ExtendedPortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  hashtags: string[];
  createdAt: string;
}

const Portfolios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [extendedItems, setExtendedItems] = useState<ExtendedPortfolioItem[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPostForComments, setSelectedPostForComments] = useState<ExtendedPortfolioItem | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Process portfolio items on component mount
  useEffect(() => {
    const processedItems = portfolioItems.map(item => {
      // Generate random hashtags
      const hashtags = [
        item.category, 
        '美容', 
        '美麗', 
        ...item.title.split(' '),
        ...['時尚', '風格', '藝術', '設計', '創意', '專業', '護理', '技術'].sort(() => Math.random() - 0.5).slice(0, 3)
      ].filter(Boolean).map(tag => tag.startsWith('#') ? tag : `#${tag}`);
      
      // Generate random author names
      const authors = ['美麗工作室', '造型師小明', '髮型設計師阿花', '美甲師Jenny', '美容專家Zoe'];
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      
      // Generate random dates within last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      return {
        ...item,
        authorName: randomAuthor,
        authorAvatar: `https://i.pravatar.cc/150?u=${item.id}`,
        likes: Math.floor(Math.random() * 200) + 10,
        comments: Math.floor(Math.random() * 30) + 1,
        isLiked: Math.random() > 0.5,
        isBookmarked: Math.random() > 0.7,
        hashtags,
        createdAt: date.toISOString(),
      };
    });
    
    // Shuffle the array to make it more "feed-like"
    const shuffled = [...processedItems].sort(() => Math.random() - 0.5);
    setExtendedItems(shuffled);
  }, []);
  
  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPostImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle post creation
  const handleCreatePost = () => {
    if (!newPostTitle || !newPostCategory || !newPostImage) {
      toast({
        title: "請填寫所有必填欄位",
        description: "標題、分類和圖片是必須的",
        variant: "destructive",
      });
      return;
    }
    
    // Generate hashtags from tags input
    const hashtags = newPostTags
      .split(' ')
      .map(tag => tag.trim())
      .filter(Boolean)
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`);
    
    // Create new post
    const newPost: ExtendedPortfolioItem = {
      id: `new-${Date.now()}`,
      title: newPostTitle,
      description: newPostDescription,
      category: newPostCategory,
      imageUrl: previewUrl || '',
      authorName: user?.name || '匿名用戶',
      authorAvatar: `https://i.pravatar.cc/150?u=user-${Date.now()}`,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      hashtags,
      createdAt: new Date().toISOString(),
    };
    
    // Add to beginning of feed
    setExtendedItems(prev => [newPost, ...prev]);
    
    // Reset form
    setNewPostTitle('');
    setNewPostDescription('');
    setNewPostCategory('');
    setNewPostTags('');
    setNewPostImage(null);
    setPreviewUrl(null);
    
    toast({
      title: "發布成功",
      description: "您的作品已發布到作品集",
    });
  };
  
  // Handle like action
  const handleLike = (id: string) => {
    setExtendedItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          isLiked: !item.isLiked
        };
      }
      return item;
    }));
  };
  
  // Handle bookmark action
  const handleBookmark = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能收藏作品",
        variant: "destructive",
      });
      return;
    }
    
    setExtendedItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStatus = !item.isBookmarked;
        
        // Show toast based on action
        toast({
          title: newStatus ? "已加入收藏" : "已取消收藏",
          description: newStatus ? "作品已加入您的集錦" : "作品已從集錦中移除",
        });
        
        return {
          ...item,
          isBookmarked: newStatus
        };
      }
      return item;
    }));
  };
  
  // Open comments modal
  const handleOpenComments = (post: ExtendedPortfolioItem) => {
    setSelectedPostForComments(post);
    setIsCommentModalOpen(true);
  };
  
  // Filter items based on search and tags
  const filteredItems = extendedItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag 
      ? item.hashtags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      : true;
    
    return matchesSearch && matchesTag;
  });
  
  // Extract all used hashtags for the tag cloud
  const allTags = Array.from(
    new Set(extendedItems.flatMap(item => item.hashtags))
  ).sort(() => Math.random() - 0.5).slice(0, 15);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">作品集</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2 text-beauty-muted">
                    <Info size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>探索美容專業人士的作品，點擊標籤查看相關作品</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="搜尋作品、標籤..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="beauty-input w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => navigate('/my-collections')}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  <Bookmark size={16} className="mr-2" />
                  我的集錦
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-beauty-primary hover:bg-beauty-primary/90 whitespace-nowrap">
                      <PlusCircle size={16} className="mr-2" />
                      發布作品
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>發布新作品</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          作品圖片 <span className="text-red-500">*</span>
                        </label>
                        {previewUrl ? (
                          <div className="relative mt-2 mb-4">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-56 object-cover rounded-md"
                            />
                            <button 
                              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                              onClick={() => {
                                setNewPostImage(null);
                                setPreviewUrl(null);
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => document.getElementById('image-upload')?.click()}>
                            <Upload className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">點擊上傳圖片</p>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          標題 <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          placeholder="請輸入作品標題"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          分類 <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newPostCategory}
                          onChange={(e) => setNewPostCategory(e.target.value)}
                        >
                          <option value="">請選擇分類</option>
                          <option value="美髮作品">美髮作品</option>
                          <option value="美甲作品">美甲作品</option>
                          <option value="美妝作品">美妝作品</option>
                          <option value="美容作品">美容作品</option>
                          <option value="造型設計">造型設計</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">描述</label>
                        <Textarea 
                          value={newPostDescription}
                          onChange={(e) => setNewPostDescription(e.target.value)}
                          placeholder="請輸入作品描述"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">標籤</label>
                        <Input 
                          value={newPostTags}
                          onChange={(e) => setNewPostTags(e.target.value)}
                          placeholder="請輸入標籤，以空格分隔 (例如: 美甲 藝術 日式)"
                        />
                        <p className="text-xs text-gray-500 mt-1">標籤之間請用空格分隔</p>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button 
                          className="bg-beauty-primary hover:bg-beauty-primary/90"
                          onClick={handleCreatePost}
                        >
                          發布作品
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
        
        {/* Tag Cloud */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 flex-nowrap min-w-min">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedTag === null
                  ? 'bg-beauty-primary text-white'
                  : 'bg-white text-beauty-dark hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-beauty-primary text-white'
                    : 'bg-white text-beauty-dark hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="max-w-2xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
                {/* Post Header */}
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={item.authorAvatar} 
                      alt={item.authorName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.authorName}</p>
                    <p className="text-xs text-beauty-muted">{item.category}</p>
                  </div>
                  <span className="text-xs text-beauty-muted">{formatDate(item.createdAt)}</span>
                </div>
                
                {/* Post Image */}
                <div className="w-full aspect-square">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Post Actions */}
                <div className="p-4 flex justify-between">
                  <div className="flex space-x-4">
                    <button 
                      className={`flex items-center ${item.isLiked ? 'text-red-500' : 'text-gray-700'}`}
                      onClick={() => handleLike(item.id)}
                    >
                      <Heart size={20} fill={item.isLiked ? 'currentColor' : 'none'} />
                      <span className="ml-1 text-sm">{item.likes}</span>
                    </button>
                    <button 
                      className="flex items-center text-gray-700"
                      onClick={() => handleOpenComments(item)}
                    >
                      <MessageCircle size={20} />
                      <span className="ml-1 text-sm">{item.comments}</span>
                    </button>
                  </div>
                  <button 
                    className={`${item.isBookmarked ? 'text-beauty-primary' : 'text-gray-700'}`}
                    onClick={() => handleBookmark(item.id)}
                    title={item.isBookmarked ? "從集錦中移除" : "加入我的集錦"}
                  >
                    <BookmarkPlus size={20} fill={item.isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                {/* Post Content */}
                <div className="px-4 pb-4">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-beauty-dark mb-2">{item.description}</p>
                  
                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.hashtags.map((tag, index) => (
                      <button 
                        key={`${item.id}-tag-${index}`}
                        onClick={() => setSelectedTag(tag)}
                        className="text-beauty-primary text-xs hover:underline"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-beauty-muted">沒有找到符合條件的作品</p>
            <p className="mt-2 mb-4 text-beauty-muted">嘗試使用不同的搜尋條件或移除標籤</p>
            {isAuthenticated && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-beauty-primary hover:bg-beauty-primary/90">
                    <PlusCircle size={16} className="mr-2" />
                    發布您的第一個作品
                  </Button>
                </DialogTrigger>
                {/* Dialog content (reused) */}
              </Dialog>
            )}
          </div>
        )}
        
        {/* Comment Modal */}
        {selectedPostForComments && (
          <CommentModal 
            isOpen={isCommentModalOpen}
            onClose={() => {
              setIsCommentModalOpen(false);
              setSelectedPostForComments(null);
            }}
            postId={selectedPostForComments.id}
            postTitle={selectedPostForComments.title}
            postImage={selectedPostForComments.imageUrl}
            authorName={selectedPostForComments.authorName}
          />
        )}
        
        {/* Prompt to Login if not authenticated */}
        {!isAuthenticated && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md text-center border-t">
            <p className="mb-2 font-medium">登入以發佈您的作品集和與他人互動</p>
            <div className="flex justify-center space-x-4">
              <Link to="/login" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                登入
              </Link>
              <Link to="/register" className="beauty-button bg-beauty-secondary hover:bg-beauty-secondary/90">
                註冊
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Portfolios;
