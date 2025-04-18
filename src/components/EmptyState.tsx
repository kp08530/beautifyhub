
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({ 
  title, 
  description, 
  icon: Icon, 
  actionLabel, 
  onAction,
  className
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 bg-white rounded-lg shadow-sm",
      className
    )}>
      {Icon && (
        <div className="text-beauty-muted mb-2">
          <Icon size={48} strokeWidth={1.5} className="mx-auto opacity-70" />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-beauty-dark">{title}</h3>
      
      {description && (
        <p className="text-sm text-beauty-muted max-w-md">{description}</p>
      )}
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="mt-4 transition-all duration-200 transform hover:scale-105 bg-beauty-primary hover:bg-beauty-primary/90"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
