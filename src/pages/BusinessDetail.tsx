
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star,
  Camera,
  Scissors
} from 'lucide-react';
import { getBusinessById } from '@/data/businesses';
import { getServicesByBusinessId, getPortfolioByBusinessId } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import PortfolioGallery from '@/components/PortfolioGallery';
import AppointmentForm from '@/components/AppointmentForm';
import Footer from '@/components/Footer';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  
  useEffect(() => {
    if (id) {
      const businessData = getBusinessById(id);
      if (businessData) {
        setBusiness(businessData);
        setServices(getServicesByBusinessId(id));
        setPortfolioItems(getPortfolioByBusinessId(id));
      }
    }
  }, [id]);
  
  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-xl text-beauty-muted">載入中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16">
      {/* Header Image */}
      <div className="relative h-64 md:h-96 bg-gray-100">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center text-white/90 hover:text-white mb-4">
              <ChevronLeft size={16} className="mr-1" />
              返回首頁
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{business.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>{business.rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {business.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 bg-white/20 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'services'
                    ? 'border-b-2 border-beauty-primary text-beauty-primary'
                    : 'text-beauty-muted hover:text-beauty-dark'
                }`}
              >
                <Scissors size={16} className="mr-2" />
                服務項目
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'portfolio'
                    ? 'border-b-2 border-beauty-primary text-beauty-primary'
                    : 'text-beauty-muted hover:text-beauty-dark'
                }`}
              >
                <Camera size={16} className="mr-2" />
                作品集
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'about'
                    ? 'border-b-2 border-beauty-primary text-beauty-primary'
                    : 'text-beauty-muted hover:text-beauty-dark'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                關於我們
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="mb-8">
              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">服務項目</h2>
                  {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-beauty-muted italic">此店家尚未提供服務項目</p>
                  )}
                </div>
              )}
              
              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">作品集</h2>
                  {portfolioItems.length > 0 ? (
                    <PortfolioGallery items={portfolioItems} />
                  ) : (
                    <p className="text-beauty-muted italic">此店家尚未提供作品集</p>
                  )}
                </div>
              )}
              
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">關於我們</h2>
                  <div className="mb-6">
                    <p className="text-beauty-dark mb-4">{business.description}</p>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">聯絡資訊</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <MapPin size={18} className="mr-2 mt-1 text-beauty-primary" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-beauty-primary" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={18} className="mr-2 text-beauty-primary" />
                      <span>{business.email}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">營業時間</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {business.openingHours.map((day, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium">{day.day}</span>
                        <span className={day.hours === '休息' ? 'text-gray-400' : ''}>{day.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Appointment Form */}
          <div>
            <AppointmentForm business={business} services={services} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusinessDetail;
