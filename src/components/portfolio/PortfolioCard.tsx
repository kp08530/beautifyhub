
import { Heart, MessageCircle, BookmarkPlus } from "lucide-react";
import { PortfolioItem } from "@/types/portfolio";
import { formatDate } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onComment: (item: PortfolioItem) => void;
  onTagSelect: (tag: string) => void;
}

const PortfolioCard = ({ item, onLike, onBookmark, onComment, onTagSelect }: PortfolioCardProps) => {
  return (
    <div className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
      <div className="p-4 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img 
            src={item.authorAvatar} 
            alt={item.authorName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-medium">{item.authorName}</p>
          <p className="text-xs text-beauty-muted">{item.category}</p>
        </div>
        <span className="text-xs text-beauty-muted">{formatDate(item.createdAt)}</span>
      </div>
      
      <div className="w-full aspect-square">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex justify-between">
        <div className="flex space-x-4">
          <button 
            className={`flex items-center ${item.isLiked ? 'text-red-500' : 'text-gray-700'}`}
            onClick={() => onLike(item.id)}
          >
            <Heart size={20} fill={item.isLiked ? 'currentColor' : 'none'} />
            <span className="ml-1 text-sm">{item.likes}</span>
          </button>
          <button 
            className="flex items-center text-gray-700"
            onClick={() => onComment(item)}
          >
            <MessageCircle size={20} />
            <span className="ml-1 text-sm">{item.comments}</span>
          </button>
        </div>
        <button 
          className={`${item.isBookmarked ? 'text-beauty-primary' : 'text-gray-700'}`}
          onClick={() => onBookmark(item.id)}
          title={item.isBookmarked ? "從集錦中移除" : "加入我的集錦"}
        >
          <BookmarkPlus size={20} fill={item.isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="px-4 pb-4">
        <h3 className="font-bold mb-1">{item.title}</h3>
        <p className="text-sm text-beauty-dark mb-2">{item.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {item.hashtags.map((tag, index) => (
            <button 
              key={`${item.id}-tag-${index}`}
              onClick={() => onTagSelect(tag)}
              className="text-beauty-primary text-xs hover:underline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
