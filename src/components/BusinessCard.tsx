
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Business } from '@/data/businesses';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const todayIndex = new Date().getDay();
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const today = daysOfWeek[todayIndex];
  const todayHours = business.openingHours.find(day => day.day === today)?.hours || '休息';

  return (
    <div className="beauty-card group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center">
          <div className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs flex items-center">
            <Star size={12} className="mr-1" />
            <span>{business.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-beauty-dark">{business.name}</h3>
        <p className="text-beauty-muted text-sm mb-3 line-clamp-2">{business.description}</p>
        
        <div className="flex items-center text-xs text-beauty-muted mb-2">
          <MapPin size={14} className="mr-1 text-beauty-primary" />
          <span className="line-clamp-1">{business.address}</span>
        </div>
        
        <div className="flex items-center text-xs text-beauty-muted mb-4">
          <Clock size={14} className="mr-1 text-beauty-primary" />
          <span>今日: {todayHours}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {business.categories.map((category, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-beauty-primary/10 text-beauty-primary rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/business/${business.id}`} 
          className="block w-full text-center py-2 border border-beauty-primary text-beauty-primary hover:bg-beauty-primary hover:text-white rounded-md transition-colors"
        >
          查看詳情
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
