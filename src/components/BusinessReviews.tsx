
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface BusinessReviewsProps {
  businessId: string;
  rating: number;
  reviewCount: number;
}

export const BusinessReviews = ({ businessId, rating, reviewCount }: BusinessReviewsProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReviewClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "需要登入",
        description: "請先登入以查看或撰寫評價",
        variant: "default",
      });
      navigate('/login');
      return;
    }
    navigate(`/business/${businessId}/reviews`);
  };

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-gray-300 fill-current" />
            <div className="absolute w-1/2 h-full overflow-hidden">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300 fill-current" />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 hover:bg-gray-100 shadow-sm rounded-full px-3 py-1 transition-all duration-300"
        onClick={handleReviewClick}
      >
        <div className="flex items-center">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
        </div>
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm text-gray-600">({reviewCount} 則評價)</span>
      </Button>
    </motion.div>
  );
};
