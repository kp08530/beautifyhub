
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { businesses } from '@/data/businesses';
import { services } from '@/data/services';
import BusinessCard from '@/components/BusinessCard';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'all' | 'businesses' | 'services'>('all');
  
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  
  useEffect(() => {
    if (query) {
      // Filter businesses
      const businessResults = businesses.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.description.toLowerCase().includes(query.toLowerCase()) ||
        business.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      
      // Filter services
      const serviceResults = services.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setFilteredBusinesses(businessResults);
      setFilteredServices(serviceResults);
    } else {
      setFilteredBusinesses([]);
      setFilteredServices([]);
    }
  }, [query]);
  
  const totalResults = filteredBusinesses.length + filteredServices.length;
  
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Search className="text-beauty-primary" size={24} />
            <h2 className="text-3xl font-bold">{`搜尋結果：${query}`}</h2>
          </div>
          
          {query ? (
            <>
              <div className="mb-8 border-b">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'border-b-2 border-beauty-primary text-beauty-primary'
                        : 'text-beauty-muted hover:text-beauty-dark'
                    }`}
                  >
                    全部 ({totalResults})
                  </button>
                  <button
                    onClick={() => setActiveTab('businesses')}
                    className={`px-6 py-3 font-medium text-sm ${
                      activeTab === 'businesses'
                        ? 'border-b-2 border-beauty-primary text-beauty-primary'
                        : 'text-beauty-muted hover:text-beauty-dark'
                    }`}
                  >
                    店家 ({filteredBusinesses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`px-6 py-3 font-medium text-sm ${
                      activeTab === 'services'
                        ? 'border-b-2 border-beauty-primary text-beauty-primary'
                        : 'text-beauty-muted hover:text-beauty-dark'
                    }`}
                  >
                    服務 ({filteredServices.length})
                  </button>
                </nav>
              </div>
              
              {totalResults > 0 ? (
                <>
                  {/* Businesses Section */}
                  {(activeTab === 'all' || activeTab === 'businesses') && filteredBusinesses.length > 0 && (
                    <div className="mb-12">
                      {activeTab === 'all' && <h3 className="text-xl font-semibold mb-4">美容店家</h3>}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBusinesses.map(business => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Services Section */}
                  {(activeTab === 'all' || activeTab === 'services') && filteredServices.length > 0 && (
                    <div>
                      {activeTab === 'all' && <h3 className="text-xl font-semibold mb-4">服務項目</h3>}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredServices.map(service => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-beauty-muted">沒有找到符合「{query}」的搜尋結果</p>
                  <p className="mt-2 text-beauty-muted">請嘗試使用不同的關鍵字或瀏覽我們的分類</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-beauty-muted">請輸入搜尋關鍵字</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
