
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <Button 
      variant="ghost" 
      className="flex items-center gap-2 hover:bg-gray-100"
      onClick={handleReviewClick}
    >
      <div className="flex items-center">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      <MessageSquare className="w-4 h-4" />
      <span className="text-sm text-gray-600">({reviewCount} 則評價)</span>
    </Button>
  );
};
