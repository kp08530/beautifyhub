
import { useState } from 'react';
import { X } from 'lucide-react';
import { PortfolioItem } from '@/data/services';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

const PortfolioGallery = ({ items }: PortfolioGalleryProps) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const filteredItems = selectedCategory 
    ? items.filter(item => item.category === selectedCategory) 
    : items;
  
  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === null
              ? 'bg-beauty-primary text-white'
              : 'bg-gray-100 text-beauty-dark hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-beauty-primary text-white'
                : 'bg-gray-100 text-beauty-dark hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="cursor-pointer overflow-hidden rounded-lg beauty-card h-48 sm:h-64 relative group"
            onClick={() => openModal(item)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-white/80 text-xs">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/30 text-white rounded-full p-1 z-10"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <div className="md:flex">
              <div className="w-full md:w-7/12 h-64 md:h-auto">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-5/12 p-6">
                <div className="bg-beauty-primary/10 text-beauty-primary inline-block px-2 py-1 rounded-full text-xs mb-2">
                  {selectedItem.category}
                </div>
                <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
                <p className="text-beauty-muted mb-4">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;
