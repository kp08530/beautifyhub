
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  className?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  const colorClasses = {
    primary: 'border-beauty-primary/20 border-t-beauty-primary',
    secondary: 'border-beauty-secondary/20 border-t-beauty-secondary',
    accent: 'border-beauty-accent/20 border-t-beauty-accent',
    white: 'border-white/20 border-t-white'
  };
  
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full',
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
