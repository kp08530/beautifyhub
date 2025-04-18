import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppointmentForm from '@/components/AppointmentForm';

// Mock data for a single business
const mockBusiness = {
  id: "1",
  name: "美麗髮廊",
  description: "提供專業美髮服務，讓您煥然一新",
  address: "台北市大安區忠孝東路四段123號",
  phone: "02-2771-8585",
  email: "service@beautyhair.com",
  openingHours: "週一至週日 10:00-20:00",
  imageUrl: "https://images.unsplash.com/photo-1516723814781-930ca1559c71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhaXIlMjBzYWxvbml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  rating: 4.5,
  services: [
    { id: "1", title: "洗髮", price: 300, description: "使用高品質洗髮精，搭配專業按摩手法" },
    { id: "2", title: "剪髮", price: 800, description: "依照您的臉型和需求，設計獨特髮型" },
    { id: "3", title: "染髮", price: 1500, description: "多種顏色選擇，採用植物性染劑，減少對頭髮的傷害" },
    { id: "4", title: "燙髮", price: 2000, description: "各式燙髮技術，打造持久自然的捲度" },
    { id: "5", title: "護髮", price: 1000, description: "深層滋潤秀髮，修復受損髮質" }
  ],
  categories: ["美髮"]
};

// Component for displaying a single service
interface ServiceCardProps {
  service: any;
  key: string;
  onServiceSelect: () => void;
}

const ServiceCard = ({ service, onServiceSelect }: ServiceCardProps) => {
  return (
    <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-beauty-primary font-bold">NT$ {service.price}</span>
          <Button size="sm" onClick={onServiceSelect}>立即預約</Button>
        </div>
      </div>
    </div>
  );
};

interface BusinessDetailParams {
  id: string;
}

const BusinessDetail = () => {
  const { id } = useParams<BusinessDetailParams>();
  const [business, setBusiness] = useState(mockBusiness);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the business details
    // from an API using the ID.
    // For now, we'll just use the mock data.
    // Example:
    // const fetchBusiness = async () => {
    //   const response = await fetch(`/api/businesses/${id}`);
    //   const data = await response.json();
    //   setBusiness(data);
    // };
    // fetchBusiness();
  }, [id]);

  // Handle booking a specific service
  const handleBookService = (serviceId: string, serviceTitle: string) => {
    setSelectedService({ id: serviceId, title: serviceTitle });
    setShowBookingForm(true);
  };

  return (
    <div className="beauty-section">
      <div className="container mx-auto px-4 py-8">
        {/* Business Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={business.imageUrl} alt={business.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{business.name}</h1>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 mr-1" size={20} />
              <span>{business.rating}</span>
            </div>
            <p className="text-gray-700 mb-4">{business.description}</p>
            <div>
              <h2 className="text-xl font-semibold mb-2">聯絡資訊</h2>
              <p>地址：{business.address}</p>
              <p>電話：{business.phone}</p>
              <p>營業時間：{business.openingHours}</p>
              <p>Email: {business.email}</p>
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">服務項目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {business.services && business.services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onServiceSelect={() => handleBookService(service.id, service.title)}
              />
            ))}
          </div>
        </div>

        {/* Booking Form Dialog */}
        <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>預約服務</DialogTitle>
              <DialogDescription>
                選擇日期和時間預約 {selectedService?.title} 服務
              </DialogDescription>
            </DialogHeader>
            
            {selectedService && (
              <AppointmentForm 
                serviceId={selectedService.id}
                serviceTitle={selectedService.title}
                businessId={business.id}
                businessName={business.name}
                onSuccess={() => setShowBookingForm(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BusinessDetail;
