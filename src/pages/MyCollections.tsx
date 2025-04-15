
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FolderPlus, Edit2, Trash2, X, Check, Heart, MessageCircle, Plus, ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Collection type
interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
  createdAt: string;
}

// Portfolio item in a collection
interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  createdAt: string;
}

const MyCollections = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  // Initialize with a default collection when page loads
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
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
  }, [isAuthenticated, navigate]);
  
  // Generate some random items for demonstration
  const generateMockItems = (count: number) => {
    const items: CollectionItem[] = [];
    const categories = ['美髮作品', '美甲作品', '美妝作品', '美容作品', '造型設計'];
    
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
      });
    }
    
    return items;
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
  const handleRenameCollection = (id: string) => {
    if (!editingName.trim()) {
      toast({
        title: "請輸入集錦名稱",
        variant: "destructive",
      });
      return;
    }
    
    const updatedCollections = collections.map(collection => {
      if (collection.id === id) {
        return { ...collection, name: editingName };
      }
      return collection;
    });
    
    setCollections(updatedCollections);
    
    if (selectedCollection?.id === id) {
      setSelectedCollection({ ...selectedCollection, name: editingName });
    }
    
    setEditingCollectionId(null);
    setEditingName('');
    
    toast({
      title: "重命名成功",
      description: `已將集錦重命名為「${editingName}」`,
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
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/portfolios')} 
            className="mr-4 text-beauty-muted hover:text-beauty-dark transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">我的集錦</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Collections Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">集錦列表</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="text-beauty-primary hover:text-beauty-primary/80 transition-colors"
              >
                <FolderPlus size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {collections.map(collection => (
                <div 
                  key={collection.id}
                  className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                    selectedCollection?.id === collection.id 
                      ? 'bg-beauty-primary/10 text-beauty-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectCollection(collection)}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <Folder size={18} className="mr-2 flex-shrink-0" />
                    
                    {editingCollectionId === collection.id ? (
                      <div className="flex items-center w-full">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="h-7 mr-1 text-beauty-dark"
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenameCollection(collection.id);
                          }}
                          className="text-green-500 mr-1"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCollectionId(null);
                          }}
                          className="text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="truncate">{collection.name}</span>
                        
                        <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCollectionId(collection.id);
                              setEditingName(collection.name);
                            }}
                            className="text-beauty-muted hover:text-beauty-primary ml-2"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCollection(collection.id);
                            }}
                            className="text-beauty-muted hover:text-red-500 ml-2"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-xs bg-gray-100 text-beauty-muted rounded-full px-2 py-0.5 ml-2">
                    {collection.items.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Collection Content */}
          <div className="flex-1">
            {selectedCollection ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedCollection.name}</h2>
                  <p className="text-beauty-muted">
                    {selectedCollection.items.length} 個作品 · 創建於 {new Date(selectedCollection.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {selectedCollection.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCollection.items.map(item => (
                      <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleRemoveItem(selectedCollection.id, item.id)}
                            className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold truncate">{item.title}</h3>
                              <p className="text-xs text-beauty-muted">{item.category}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-beauty-muted">
                              <div className="flex items-center">
                                <Heart size={14} className="mr-1" />
                                <span className="text-xs">{item.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle size={14} className="mr-1" />
                                <span className="text-xs">{item.comments}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-beauty-muted line-clamp-2 mb-3">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center mt-2">
                            <img 
                              src={item.authorAvatar} 
                              alt={item.authorName} 
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span className="text-xs">{item.authorName}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-beauty-muted mb-4">這個集錦還沒有作品</div>
                    <Button
                      onClick={() => navigate('/portfolios')}
                      className="bg-beauty-primary hover:bg-beauty-primary/90"
                    >
                      <Plus size={16} className="mr-2" />
                      瀏覽作品並添加到集錦
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-beauty-muted mb-4">請選擇一個集錦查看內容</div>
              </div>
            )}
          </div>
        </div>
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
              >
                取消
              </Button>
              <Button
                className="bg-beauty-primary hover:bg-beauty-primary/90"
                onClick={handleCreateCollection}
              >
                創建
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MyCollections;
