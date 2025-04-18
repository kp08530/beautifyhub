
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronLeft, Store, Plus } from 'lucide-react';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collection, FavoriteBusiness, CollectionItem } from '@/types/collections';
import CollectionList from '@/components/CollectionList';
import PortfolioCollectionGrid from '@/components/PortfolioCollectionGrid';
import FavoriteBusinessGrid from '@/components/FavoriteBusinessGrid';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';

// Main component
const MyCollections = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [activeTab, setActiveTab] = useState<"portfolio" | "business">("portfolio");
  const [isLoading, setIsLoading] = useState(true);
  
  // Favorite businesses state
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<FavoriteBusiness[]>([]);
  
  // Initialize with default collections and favorite businesses when page loads
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, initialize with a default collection if none exists
        if (collections.length === 0) {
          const defaultCollection: Collection = {
            id: 'default',
            name: '我的最愛',
            items: generateMockItems(5),
            createdAt: new Date().toISOString(),
          };
          
          setCollections([defaultCollection]);
          setSelectedCollection(defaultCollection);
        }
        
        // Initialize with some demo favorite businesses
        if (favoriteBusinesses.length === 0) {
          setFavoriteBusinesses(generateMockBusinesses(4));
        }
      } catch (error) {
        console.error('Failed to load collections data:', error);
        toast({
          title: "載入失敗",
          description: "無法載入您的集錦資料，請稍後再試",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeData();
  }, [isAuthenticated, navigate]);
  
  // Generate some random items for demonstration
  const generateMockItems = (count: number) => {
    const items: CollectionItem[] = [];
    const categories = ['美髮作品', '美甲作品', '美妝作品', '美容作品', '造型設計'];
    const hashtags = ['#美容', '#沙龍', '#髮型', '#美甲', '#造型', '#時尚', '#護膚'];
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: `item-${i}-${Date.now()}`,
        title: `收藏作品 ${i + 1}`,
        description: '這是一個收藏的美容作品範例，展示了專業的技術和創意。',
        category: categories[Math.floor(Math.random() * categories.length)],
        imageUrl: `https://source.unsplash.com/random/300x300?beauty,${i}`,
        authorName: '專業美容師',
        authorAvatar: `https://i.pravatar.cc/150?u=${i}`,
        likes: Math.floor(Math.random() * 100) + 5,
        comments: Math.floor(Math.random() * 20),
        createdAt: new Date().toISOString(),
        hashtags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, 
          () => hashtags[Math.floor(Math.random() * hashtags.length)])
      });
    }
    
    return items;
  };
  
  // Generate some random businesses for demonstration
  const generateMockBusinesses = (count: number) => {
    const businesses: FavoriteBusiness[] = [];
    const categories = ['美髮沙龍', '美甲工作室', '美容中心', 'SPA按摩', '彩妝造型'];
    const locations = ['台北市', '新北市', '台中市', '高雄市', '台南市'];
    
    for (let i = 0; i < count; i++) {
      businesses.push({
        id: `business-${i}-${Date.now()}`,
        name: `美麗商家 ${i + 1}`,
        description: '這是一個提供專業美容服務的商家，服務包括美髮、美甲、美容等...',
        category: categories[Math.floor(Math.random() * categories.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        imageUrl: `https://source.unsplash.com/random/300x200?salon,${i}`,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 50) + 10,
        createdAt: new Date().toISOString(),
      });
    }
    
    return businesses;
  };
  
  // Handle creating a new collection
  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      toast({
        title: "請輸入集錦名稱",
        variant: "destructive",
      });
      return;
    }
    
    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      name: newCollectionName,
      items: [],
      createdAt: new Date().toISOString(),
    };
    
    setCollections([...collections, newCollection]);
    setIsCreateModalOpen(false);
    setNewCollectionName('');
    
    toast({
      title: "創建成功",
      description: `已創建「${newCollectionName}」集錦`,
    });
  };
  
  // Handle renaming a collection
  const handleRenameCollection = (id: string, name: string) => {
    if (!name.trim()) {
      toast({
        title: "請輸入集錦名稱",
        variant: "destructive",
      });
      return;
    }
    
    const updatedCollections = collections.map(collection => {
      if (collection.id === id) {
        return { ...collection, name };
      }
      return collection;
    });
    
    setCollections(updatedCollections);
    
    if (selectedCollection?.id === id) {
      setSelectedCollection({ ...selectedCollection, name });
    }
    
    toast({
      title: "重命名成功",
      description: `已將集錦重命名為「${name}」`,
    });
  };
  
  // Handle deleting a collection
  const handleDeleteCollection = (id: string) => {
    if (collections.length === 1) {
      toast({
        title: "無法刪除",
        description: "至少需要保留一個集錦",
        variant: "destructive",
      });
      return;
    }
    
    const updatedCollections = collections.filter(collection => collection.id !== id);
    setCollections(updatedCollections);
    
    if (selectedCollection?.id === id) {
      setSelectedCollection(updatedCollections[0]);
    }
    
    toast({
      title: "刪除成功",
      description: "已刪除集錦",
    });
  };
  
  // Handle removing an item from collection
  const handleRemoveItem = (collectionId: string, itemId: string) => {
    const updatedCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          items: collection.items.filter(item => item.id !== itemId)
        };
      }
      return collection;
    });
    
    setCollections(updatedCollections);
    
    if (selectedCollection?.id === collectionId) {
      setSelectedCollection({
        ...selectedCollection,
        items: selectedCollection.items.filter(item => item.id !== itemId)
      });
    }
    
    toast({
      title: "移除成功",
      description: "已從集錦中移除作品",
    });
  };
  
  // Select a collection to view
  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollection(collection);
  };
  
  // Handle removing a business from favorites
  const handleRemoveBusiness = (businessId: string) => {
    setFavoriteBusinesses(favoriteBusinesses.filter(business => business.id !== businessId));
    
    toast({
      title: "移除成功",
      description: "已從收藏商家中移除",
    });
  };
  
  // Handle messaging a business
  const handleMessageBusiness = (businessId: string, businessName: string) => {
    navigate(`/messages?business=${businessId}`);
    
    toast({
      title: "開始對話",
      description: `正在開始與 ${businessName} 的對話`,
    });
  };

  // Page transition animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 text-beauty-muted hover:text-beauty-dark transition-colors"
            aria-label="返回"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-beauty-primary to-beauty-secondary bg-clip-text text-transparent">
            我的集錦
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "portfolio" | "business")} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="portfolio" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              收藏作品
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              收藏商家
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <LoadingSpinner size="lg" color="primary" />
                <p className="mt-4 text-beauty-muted">載入中...</p>
              </motion.div>
            ) : (
              <>
                <TabsContent 
                  value="portfolio"
                  className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Collections Sidebar */}
                    <CollectionList 
                      collections={collections}
                      selectedCollection={selectedCollection}
                      onSelectCollection={handleSelectCollection}
                      onRenameCollection={handleRenameCollection}
                      onDeleteCollection={handleDeleteCollection}
                      onCreateClick={() => setIsCreateModalOpen(true)}
                    />
                    
                    {/* Collection Content */}
                    <div className="flex-1">
                      {selectedCollection ? (
                        <>
                          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-beauty-primary to-beauty-accent bg-clip-text text-transparent">
                              {selectedCollection.name}
                            </h2>
                            <p className="text-beauty-muted">
                              {selectedCollection.items.length} 個作品 · 創建於 {new Date(selectedCollection.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <PortfolioCollectionGrid 
                            collection={selectedCollection} 
                            onRemoveItem={handleRemoveItem} 
                          />
                        </>
                      ) : (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                          <div className="text-beauty-muted mb-4">請選擇一個集錦查看內容</div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent 
                  value="business"
                  className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
                >
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-beauty-primary to-beauty-accent bg-clip-text text-transparent">
                      收藏商家
                    </h2>
                    <p className="text-beauty-muted">
                      {favoriteBusinesses.length} 個商家 · 快速查看您收藏的美容服務提供者
                    </p>
                  </div>
                  
                  <FavoriteBusinessGrid 
                    businesses={favoriteBusinesses}
                    onRemoveBusiness={handleRemoveBusiness}
                    onMessageBusiness={handleMessageBusiness}
                  />
                </TabsContent>
              </>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
      
      {/* Create Collection Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新建集錦</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              集錦名稱
            </label>
            <Input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="例如：我的最愛、髮型設計..."
              className="mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewCollectionName('');
                }}
                className="transition-all duration-200"
              >
                取消
              </Button>
              <Button
                className="bg-beauty-primary hover:bg-beauty-primary/90 transition-all duration-200"
                onClick={handleCreateCollection}
              >
                <Plus className="mr-2 h-4 w-4" />
                創建
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </motion.div>
  );
};

export default MyCollections;
