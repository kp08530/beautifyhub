
import { Link } from 'react-router-dom';
import { Service } from '@/data/services';
import { convertToTWD } from '@/lib/utils';

// Updated props interface to include the optional selection-related props
interface ServiceCardProps {
  service: Service;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const ServiceCard = ({ service, isSelectable = false, isSelected = false, onSelect }: ServiceCardProps) => {
  // If the card is selectable, use a div instead of a Link and add selection styling
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isSelectable) {
      return (
        <div 
          onClick={onSelect}
          className={`beauty-card overflow-hidden group flex flex-col h-full cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-beauty-primary ring-offset-2' : ''
          }`}
        >
          {children}
        </div>
      );
    }
    
    return (
      <Link to={`/business/${service.businessId}`} className="beauty-card overflow-hidden group flex flex-col h-full">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/90 bg-beauty-secondary/90 px-2 py-1 rounded-full">
              {service.category}
            </span>
            {service.discountPrice ? (
              <div className="text-right">
                <span className="text-white font-bold">
                  {convertToTWD(service.discountPrice)}
                </span>
                <span className="ml-1 text-xs text-white/80 line-through">
                  {convertToTWD(service.price)}
                </span>
              </div>
            ) : (
              <span className="text-white font-bold">
                {convertToTWD(service.price)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-beauty-dark mb-1 line-clamp-1">{service.name}</h3>
          <p className="text-sm text-beauty-muted line-clamp-2">{service.description}</p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-beauty-muted">{service.businessName}</span>
          <span className="text-xs px-2 py-1 bg-beauty-primary/10 text-beauty-primary rounded-full">
            {service.duration}分鐘
          </span>
        </div>

        {isSelectable && isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-beauty-primary rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default ServiceCard;
