
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-beauty-primary/10 to-beauty-secondary/10 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-beauty-dark mb-6 leading-tight animate-fade-in">
            發現專業美容服務的最佳平台
          </h1>
          <p className="text-lg md:text-xl text-beauty-dark/70 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            連接美容商家與顧客，預約服務從未如此簡單
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/businesses" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 text-center">
              瀏覽美容店家
            </Link>
            <Link to="/services" className="beauty-button bg-beauty-secondary hover:bg-beauty-secondary/90 text-center">
              瀏覽服務項目
            </Link>
          </div>
          
          <div className="mt-12 relative max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜尋美容店家或服務..." 
                className="w-full py-4 px-6 pr-12 rounded-full shadow-lg border-0 focus:ring-2 focus:ring-beauty-primary/30 focus:outline-none text-beauty-dark"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <SearchIcon className="text-beauty-primary h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm text-beauty-dark/70">
              <span className="bg-white/80 px-3 py-1 rounded-full hover:bg-beauty-primary hover:text-white transition-colors cursor-pointer">
                美容護膚
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full hover:bg-beauty-primary hover:text-white transition-colors cursor-pointer">
                美髮沙龍
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full hover:bg-beauty-primary hover:text-white transition-colors cursor-pointer">
                美甲服務
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full hover:bg-beauty-primary hover:text-white transition-colors cursor-pointer">
                面部護理
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
