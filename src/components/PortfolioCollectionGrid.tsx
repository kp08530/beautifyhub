
import React from 'react';
import { Heart, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collection, CollectionItem } from '@/types/collections';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PortfolioCollectionGridProps {
  collection: Collection;
  onRemoveItem: (collectionId: string, itemId: string) => void;
}

const PortfolioCollectionGrid = ({ collection, onRemoveItem }: PortfolioCollectionGridProps) => {
  const navigate = useNavigate();

  if (collection.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-beauty-muted mb-4">這個集錦還沒有作品</div>
        <Button
          onClick={() => navigate('/portfolios')}
          className="bg-beauty-primary hover:bg-beauty-primary/90 transition-all duration-200 transform hover:scale-105"
        >
          瀏覽作品並添加到集錦
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collection.items.map((item, index) => (
        <PortfolioItem 
          key={item.id} 
          item={item} 
          collectionId={collection.id}
          onRemove={onRemoveItem}
          index={index}
        />
      ))}
    </div>
  );
};

interface PortfolioItemProps {
  item: CollectionItem;
  collectionId: string;
  onRemove: (collectionId: string, itemId: string) => void;
  index: number;
}

const PortfolioItem = ({ item, collectionId, onRemove, index }: PortfolioItemProps) => {
  // Animation variants for staggered entry
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
      initial="hidden"
      animate="visible"
      variants={variants}
      custom={index}
      layout
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => onRemove(collectionId, item.id)}
          className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors transform hover:scale-110 duration-200"
          aria-label="從集錦中移除"
        >
          <X size={14} />
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
            loading="lazy"
          />
          <span className="text-xs">{item.authorName}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCollectionGrid;
