
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'gradient';
}

const EmptyState = ({ 
  title, 
  description, 
  icon: Icon, 
  actionLabel, 
  onAction,
  className,
  variant = 'default'
}: EmptyStateProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const baseClasses = "flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 rounded-lg shadow-sm";

  const variantClasses = {
    default: "bg-white",
    outline: "bg-white border border-gray-200",
    gradient: "bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm"
  };

  return (
    <motion.div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Icon && (
        <motion.div 
          className="text-beauty-muted mb-2"
          variants={childVariants}
        >
          <Icon size={48} strokeWidth={1.5} className="mx-auto opacity-70" />
        </motion.div>
      )}
      
      <motion.h3 
        className="text-lg font-medium text-beauty-dark" 
        variants={childVariants}
      >
        {title}
      </motion.h3>
      
      {description && (
        <motion.p 
          className="text-sm text-beauty-muted max-w-md"
          variants={childVariants}
        >
          {description}
        </motion.p>
      )}
      
      {actionLabel && onAction && (
        <motion.div variants={childVariants}>
          <Button 
            onClick={onAction}
            className="mt-4 transition-all duration-300 transform hover:scale-105 shadow-md bg-beauty-primary hover:bg-beauty-primary/90"
            withAnimation
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
