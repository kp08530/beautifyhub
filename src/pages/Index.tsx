
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import BusinessCard from '@/components/BusinessCard';
import ServiceCard from '@/components/ServiceCard';
import { getFeaturedBusinesses } from '@/data/businesses';
import { services } from '@/data/services';
import { portfolioItems } from '@/data/services';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Index = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState([]);
  
  useEffect(() => {
    // Get featured businesses
    setFeaturedBusinesses(getFeaturedBusinesses());
    
    // Get popular services (just a subset for demo)
    setPopularServices(services.slice(0, 4));
    
    // Get featured portfolio items (just a subset for demo)
    setFeaturedPortfolio(portfolioItems.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Businesses Section */}
      <section className="beauty-section bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">熱門美容店家</h2>
            <Link to="/businesses" className="text-beauty-primary flex items-center hover:underline">
              查看全部 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Services Section */}
      <section className="beauty-section bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">熱門服務</h2>
            <Link to="/services" className="text-beauty-primary flex items-center hover:underline">
              查看全部 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="beauty-section bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">為什麼選擇 BeautifyHub</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-beauty-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-beauty-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">精選優質美容店家</h3>
              <p className="text-beauty-muted">嚴格篩選各類美容服務提供者，確保品質與專業度。</p>
            </div>
            
            <div className="text-center p-6 rounded-xl transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-beauty-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-beauty-primary"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">簡單快捷的線上預約</h3>
              <p className="text-beauty-muted">輕鬆在線預約各種美容服務，節省時間與精力。</p>
            </div>
            
            <div className="text-center p-6 rounded-xl transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-beauty-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-beauty-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">安全透明的服務體驗</h3>
              <p className="text-beauty-muted">清晰的價格、服務內容與真實評價，確保消費透明。</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portfolio Preview Section */}
      <section className="beauty-section bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">精選作品</h2>
            <Link to="/portfolios" className="text-beauty-primary flex items-center hover:underline">
              查看全部 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredPortfolio.map((item, index) => (
              <div key={item.id} className="relative group overflow-hidden rounded-lg h-48 sm:h-64">
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-beauty-primary/90 to-beauty-secondary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">開始探索您的美麗之旅</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            立即註冊並發現附近的頂級美容服務，或成為我們的合作店家
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link to="/register" className="beauty-button bg-white text-beauty-primary hover:bg-gray-100">
              顧客註冊
            </Link>
            <Link to="/business-signup" className="beauty-button bg-beauty-dark hover:bg-beauty-dark/90 border border-white/20">
              商家入駐
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
