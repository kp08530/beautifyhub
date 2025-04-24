import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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

// Fix the interface to include index signature for useParams
interface BusinessDetailParams {
  [key: string]: string;
  id: string;
}

const BusinessDetail = () => {
  const { id } = useParams<BusinessDetailParams>();
  const [business, setBusiness] = useState(mockBusiness);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; title: string } | null>(null);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [ratings, setRatings] = useState([
    { name: "王小明", score: 5, content: "非常棒的服務！", image: null, time: "2025-04-20" },
    { name: "李小花", score: 4, content: "環境很好，但有些地方可以改進。", image: null, time: "2025-04-18" },
  ]);
  const [newRating, setNewRating] = useState({ name: "", score: 0, content: "", image: null });

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

  const handleAddRating = async () => {
    if (!newRating.name || !newRating.score || !newRating.content) {
      alert("請填寫所有欄位");
      return;
    }

    let imageUrl = null;
    if (newRating.image) {
      const formData = new FormData();
      formData.append("file", newRating.image);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          imageUrl = result.url;
        } else {
          alert("圖片上傳失敗");
          return;
        }
      } catch (error) {
        console.error("圖片上傳失敗", error);
        alert("圖片上傳失敗");
        return;
      }
    }

    const newComment = {
      ...newRating,
      image: imageUrl,
      time: new Date().toISOString().split("T")[0],
    };

    setRatings((prev) => [...prev, newComment]);
    setNewRating({ name: "", score: 0, content: "", image: null });
    alert("評論已新增");
  };

  const sortedRatings = [...ratings].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

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

        {/* 評分對話框 */}
        <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>商家評分</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">姓名</label>
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-beauty-primary focus:border-beauty-primary sm:text-sm"
                  placeholder="您的姓名"
                  value={newRating.name}
                  onChange={(e) => setNewRating({ ...newRating, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">評分 (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-beauty-primary focus:border-beauty-primary sm:text-sm"
                  placeholder="請輸入評分"
                  value={newRating.score}
                  onChange={(e) => setNewRating({ ...newRating, score: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">評論內容</label>
                <textarea
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-beauty-primary focus:border-beauty-primary sm:text-sm"
                  placeholder="請輸入評論內容"
                  value={newRating.content}
                  onChange={(e) => setNewRating({ ...newRating, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">上傳圖片</label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-beauty-primary file:text-white hover:file:bg-beauty-primary-dark"
                  onChange={(e) => setNewRating({ ...newRating, image: e.target.files?.[0] || null })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddRating}>
                新增評論
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 評論列表 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">使用者評論</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto scrollbar-thin">
            {sortedRatings.map((rating, index) => (
              <div key={index} className="border p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rating.name}</span>
                  <span className="text-yellow-500">⭐ {rating.score}</span>
                </div>
                <p className="text-sm text-gray-600">{rating.content}</p>
                {rating.image && (
                  <img
                    src={rating.image}
                    alt="評論圖片"
                    className="mt-2 w-full h-40 object-cover rounded-md"
                  />
                )}
                <p className="text-xs text-gray-400 mt-1">{rating.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
