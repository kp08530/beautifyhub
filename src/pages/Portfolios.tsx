
import { useState, useEffect } from 'react';
import { portfolioItems } from '@/data/services';
import { Info } from 'lucide-react';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/components/ui/use-toast';
import { PortfolioItem } from '@/types/portfolio';
import SearchBar from '@/components/portfolio/SearchBar';
import TagCloud from '@/components/portfolio/TagCloud';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import NewPortfolioDialog from '@/components/portfolio/NewPortfolioDialog';
import CommentModal from '@/components/CommentModal';

const Portfolios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedPostForComments, setSelectedPostForComments] = useState<PortfolioItem | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const processedItems = portfolioItems.map(item => ({
      ...item,
      authorName: `作者${Math.floor(Math.random() * 100)}`,
      authorAvatar: `https://i.pravatar.cc/150?u=${item.id}`,
      likes: Math.floor(Math.random() * 200) + 10,
      comments: Math.floor(Math.random() * 30) + 1,
      isLiked: Math.random() > 0.5,
      isBookmarked: Math.random() > 0.7,
      hashtags: [
        item.category, 
        '美容', 
        '美麗', 
        ...item.title.split(' '),
        ...['時尚', '風格', '藝術', '設計', '創意', '專業', '護理', '技術']
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
      ].filter(Boolean).map(tag => tag.startsWith('#') ? tag : `#${tag}`),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));
    
    setItems(processedItems.sort(() => Math.random() - 0.5));
  }, []);

  const handleCreatePost = (data: {
    title: string;
    description: string;
    category: string;
    tags: string;
    image: File | null;
  }) => {
    const hashtags = data.tags
      .split(' ')
      .map(tag => tag.trim())
      .filter(Boolean)
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`);
    
    const newPost: PortfolioItem = {
      id: `new-${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category,
      imageUrl: data.image ? URL.createObjectURL(data.image) : '',
      authorName: user?.name || '匿名用戶',
      authorAvatar: `https://i.pravatar.cc/150?u=user-${Date.now()}`,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      hashtags,
      createdAt: new Date().toISOString(),
    };
    
    setItems(prev => [newPost, ...prev]);
    
    toast({
      title: "發布成功",
      description: "您的作品已發布到作品集",
    });
  };

  const handleLike = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能點讚",
        variant: "destructive",
      });
      return;
    }
    
    setItems(prev => prev.map(item => 
      item.id === id 
        ? {
            ...item,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            isLiked: !item.isLiked
          }
        : item
    ));
  };

  const handleBookmark = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能收藏作品",
        variant: "destructive",
      });
      return;
    }
    
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStatus = !item.isBookmarked;
        toast({
          title: newStatus ? "已加入收藏" : "已取消收藏",
          description: newStatus ? "作品已加入您的集錦" : "作品已從集錦中移除",
        });
        return { ...item, isBookmarked: newStatus };
      }
      return item;
    }));
  };

  const allTags = Array.from(
    new Set(items.flatMap(item => item.hashtags))
  ).sort(() => Math.random() - 0.5).slice(0, 15);

  const filteredItems = items.filter(item => {
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
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="whitespace-nowrap"
                  asChild
                >
                  <Link to="/my-collections">我的集錦</Link>
                </Button>
                
                <NewPortfolioDialog onSubmit={handleCreatePost} />
              </div>
            )}
          </div>
        </div>
        
        <TagCloud
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
        
        {filteredItems.length > 0 ? (
          <div className="max-w-2xl mx-auto">
            {filteredItems.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onComment={(item) => {
                  setSelectedPostForComments(item);
                  setIsCommentModalOpen(true);
                }}
                onTagSelect={setSelectedTag}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-beauty-muted">沒有找到符合條件的作品</p>
            <p className="mt-2 mb-4 text-beauty-muted">嘗試使用不同的搜尋條件或移除標籤</p>
            {isAuthenticated && (
              <NewPortfolioDialog onSubmit={handleCreatePost} />
            )}
          </div>
        )}
        
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
