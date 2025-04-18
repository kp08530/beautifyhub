
import React from 'react';
import { MessageCircle, Store, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FavoriteBusiness } from '@/types/collections';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FavoriteBusinessGridProps {
  businesses: FavoriteBusiness[];
  onRemoveBusiness: (businessId: string) => void;
  onMessageBusiness: (businessId: string, businessName: string) => void;
}

const FavoriteBusinessGrid = ({ 
  businesses, 
  onRemoveBusiness, 
  onMessageBusiness 
}: FavoriteBusinessGridProps) => {
  const navigate = useNavigate();

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-beauty-muted mb-4">您還沒有收藏任何商家</div>
        <Button
          onClick={() => navigate('/businesses')}
          className="bg-beauty-primary hover:bg-beauty-primary/90 transition-all duration-200 transform hover:scale-105"
        >
          瀏覽商家並收藏
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business, index) => (
        <BusinessCard 
          key={business.id} 
          business={business} 
          onRemove={onRemoveBusiness} 
          onMessage={onMessageBusiness}
          index={index}
        />
      ))}
    </div>
  );
};

interface BusinessCardProps {
  business: FavoriteBusiness;
  onRemove: (businessId: string) => void;
  onMessage: (businessId: string, businessName: string) => void;
  index: number;
}

const BusinessCard = ({ business, onRemove, onMessage, index }: BusinessCardProps) => {
  const navigate = useNavigate();
  
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
      <div className="relative h-40 overflow-hidden">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => onRemove(business.id)}
          className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors transform hover:scale-110 duration-200"
          aria-label="從收藏中移除"
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold truncate">{business.name}</h3>
            <p className="text-xs text-beauty-muted">{business.category}</p>
          </div>
          <div className="flex items-center text-yellow-500">
            <span className="font-medium mr-1">{business.rating.toFixed(1)}</span>
            <span className="text-xs text-beauty-muted">({business.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-beauty-muted mb-2">
          <span className="inline-block bg-gray-100 text-beauty-muted rounded-full px-2 py-0.5 text-xs mr-1">
            {business.location}
          </span>
        </p>
        
        <p className="text-sm text-beauty-muted line-clamp-2 mb-3">
          {business.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/business/${business.id}`)}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            <Store size={14} className="mr-1" />
            查看詳情
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            className="bg-beauty-primary hover:bg-beauty-primary/90 transition-all duration-200"
            onClick={() => onMessage(business.id, business.name)}
          >
            <MessageCircle size={14} className="mr-1" />
            發送訊息
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FavoriteBusinessGrid;
