
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  onSelect?: () => void;
  isSelectable?: boolean;
  isSelected?: boolean;
}

const ServiceCard = ({ 
  service, 
  onSelect, 
  isSelectable = false,
  isSelected = false
}: ServiceCardProps) => {
  const formatPrice = (price: number) => {
    return `NT$${price.toLocaleString()}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}分鐘`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}小時${remainingMinutes}分鐘` 
        : `${hours}小時`;
    }
  };

  return (
    <div 
      className={`beauty-card ${isSelectable ? 'cursor-pointer' : ''} ${
        isSelected ? 'ring-2 ring-beauty-primary' : ''
      }`}
      onClick={isSelectable ? onSelect : undefined}
    >
      {service.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-beauty-dark">{service.name}</h3>
          <span className="text-beauty-primary font-bold">{formatPrice(service.price)}</span>
        </div>
        
        <p className="text-beauty-muted text-sm mb-3">{service.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-2 text-sm text-beauty-muted">
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-beauty-primary" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          
          <div className="flex items-center">
            <span className="bg-beauty-primary/10 text-beauty-primary px-2 py-0.5 rounded-full text-xs">
              {service.category}
            </span>
          </div>
        </div>
        
        {isSelectable && (
          <div className="mt-3 text-center">
            <button
              className={`w-full py-2 rounded-md transition-colors ${
                isSelected
                  ? 'bg-beauty-primary text-white'
                  : 'border border-beauty-primary text-beauty-primary hover:bg-beauty-primary hover:text-white'
              }`}
              onClick={onSelect}
            >
              {isSelected ? '已選擇' : '選擇此項目'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
