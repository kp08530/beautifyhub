
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BusinessReviewsProps {
  businessId: string;
  rating: number;
  reviewCount: number;
}

export const BusinessReviews = ({ businessId, rating, reviewCount }: BusinessReviewsProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleReviewClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/business/${businessId}/reviews`);
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
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
        </div>
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm text-gray-600">({reviewCount} 則評價)</span>
      </Button>
    </motion.div>
  );
};
