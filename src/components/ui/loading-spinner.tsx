
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className,
  text
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
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <motion.div 
        className={cn(
          'animate-spin rounded-full',
          sizeClasses[size],
          colorClasses[color]
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {text && (
        <motion.p 
          className="mt-2 text-sm text-beauty-muted animate-pulse-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
