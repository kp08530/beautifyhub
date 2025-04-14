
import { useState } from 'react';
import { businesses } from '@/data/businesses';
import BusinessCard from '@/components/BusinessCard';
import { Search } from 'lucide-react';
import Footer from '@/components/Footer';

const Businesses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(businesses.flatMap(business => business.categories))
  );
  
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? business.categories.includes(selectedCategory) : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">探索美容店家</h2>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="搜尋店家名稱或描述..."
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
          
          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-beauty-muted">沒有找到符合條件的店家</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Businesses;
