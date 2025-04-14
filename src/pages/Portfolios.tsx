
import { useState } from 'react';
import { portfolioItems } from '@/data/services';
import { Search } from 'lucide-react';
import Footer from '@/components/Footer';

const Portfolios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(portfolioItems.map(item => item.category))
  );
  
  const filteredPortfolios = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">美容作品集</h2>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="搜尋作品名稱或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="beauty-input w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-2 rounded-full text-sm ${
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
                    className={`px-3 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-beauty-primary text-white'
                        : 'bg-gray-100 text-beauty-dark hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredPortfolios.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPortfolios.map((item) => (
                <div key={item.id} className="relative group overflow-hidden rounded-lg h-64">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.category}</p>
                    <p className="text-white/70 text-xs mt-1">{item.description.slice(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-beauty-muted">沒有找到符合條件的作品</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Portfolios;
