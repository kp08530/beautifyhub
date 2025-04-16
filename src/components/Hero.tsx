
import { Banner } from './Banner';

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
        </div>
        
        <Banner />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
