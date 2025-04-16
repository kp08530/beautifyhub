import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building2,
  Users,
  Calendar,
  Image,
  Settings,
  Edit,
  Save,
  Plus,
  Trash2,
  EyeIcon,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: Array<{ day: string; hours: string }>;
  imageUrl: string;
  rating: number;
  services: string[];
  categories: string[];
  featured: boolean;
}

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
}

const mockBusiness: Business = {
  id: "5",
  name: "美麗世界 Beautiful World",
  description: "提供全方位美容服務的專業沙龍",
  address: "台北市信義區松仁路100號",
  phone: "02-8765-4321",
  email: "contact@beautifulworld.com",
  openingHours: [
    { day: "星期一", hours: "10:00 - 20:00" },
    { day: "星期二", hours: "10:00 - 20:00" },
    { day: "星期三", hours: "10:00 - 20:00" },
    { day: "星期四", hours: "10:00 - 20:00" },
    { day: "星期五", hours: "10:00 - 20:00" },
    { day: "星期六", hours: "10:00 - 18:00" },
    { day: "星期日", hours: "休息" }
  ],
  imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  rating: 4.7,
  services: ["13", "14", "15"],
  categories: ["美容", "護膚"],
  featured: true
};

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    customerName: "林小美",
    service: "基礎臉部護理",
    date: "2025-04-20",
    time: "14:00",
    status: "confirmed"
  },
  {
    id: "a2",
    customerName: "王大明",
    service: "深層清潔",
    date: "2025-04-21",
    time: "11:30",
    status: "confirmed"
  },
  {
    id: "a3",
    customerName: "張小華",
    service: "全臉煥膚",
    date: "2025-04-19",
    time: "16:00",
    status: "completed"
  }
];

const mockServices: Service[] = [
  {
    id: "s1",
    name: "基礎臉部護理",
    price: 1800,
    duration: 60,
    description: "深層清潔、去角質、面膜、保濕"
  },
  {
    id: "s2",
    name: "深層清潔",
    price: 2200,
    duration: 90,
    description: "深層清潔、蒸臉、黑頭粉刺處理、舒緩面膜"
  },
  {
    id: "s3",
    name: "全臉煥膚",
    price: 2800,
    duration: 120,
    description: "深層清潔、果酸換膚、LED光療、修復面膜"
  }
];

const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    title: "春季美容特惠",
    imageUrl: "/placeholder.svg",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    status: "審核中"
  },
  {
    id: "ad2",
    title: "母親節感恩活動",
    imageUrl: "/placeholder.svg",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    status: "已核准"
  }
];

const mockCustomers: Customer[] = [
  { id: "c1", name: "林小美", phone: "0912-345-678", visits: 5, lastVisit: "2025-04-10" },
  { id: "c2", name: "王大明", phone: "0923-456-789", visits: 3, lastVisit: "2025-04-05" },
  { id: "c3", name: "張小華", phone: "0934-567-890", visits: 8, lastVisit: "2025-04-15" },
  { id: "c4", name: "李美美", phone: "0945-678-901", visits: 2, lastVisit: "2025-03-28" }
];

const BusinessProfile = () => {
  const { user, isBusiness } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [business, setBusiness] = useState<Business>(mockBusiness);
  const [editing, setEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState<Business>(mockBusiness);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(mockAdvertisements);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  
  const [serviceDialog, setServiceDialog] = useState<{ open: boolean; mode: 'add' | 'edit'; data: Service | null }>({ open: false, mode: 'add', data: null });
  const [appointmentDialog, setAppointmentDialog] = useState<{ open: boolean; data: Appointment | null }>({ open: false, data: null });
  const [adDialog, setAdDialog] = useState<{ open: boolean; mode: 'add' | 'edit'; data: Advertisement | null }>({ open: false, mode: 'add', data: null });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string }>({ open: false, type: '', id: '' });
  const [newService, setNewService] = useState<Omit<Service, 'id'> & { id?: string }>({ name: '', price: 0, duration: 30, description: '' });
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'status'> & { id?: string; status?: string }>({ title: '', imageUrl: '/placeholder.svg', startDate: '', endDate: '' });
  
  useEffect(() => {
    if (!isBusiness) {
      navigate('/');
      toast({
        title: "存取被拒絕",
        description: "您沒有權限存取此頁面",
        variant: "destructive"
      });
    }
  }, [isBusiness, navigate, toast]);
  
  const handleEditToggle = () => {
    if (editing) {
      setBusiness(editedBusiness);
      toast({
        title: "資料已更新",
        description: "您的店家資料已成功更新",
      });
    }
    setEditing(!editing);
  };
  
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedBusiness(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleOpeningHoursChange = (index: number, field: string, value: string) => {
    const updatedHours = [...editedBusiness.openingHours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value
    };
    
    setEditedBusiness(prev => ({
      ...prev,
      openingHours: updatedHours
    }));
  };

  const openAddServiceDialog = () => {
    setNewService({ name: '', price: 0, duration: 30, description: '' });
    setServiceDialog({ open: true, mode: 'add', data: null });
  };

  const openEditServiceDialog = (service: Service) => {
    setNewService({ ...service });
    setServiceDialog({ open: true, mode: 'edit', data: service });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration' ? Number(value) : value
    }));
  };

  const handleServiceSubmit = () => {
    if (serviceDialog.mode === 'add') {
      const newServiceWithId: Service = {
        ...newService as Omit<Service, 'id'>,
        id: `s${services.length + 1}`
      };
      setServices([...services, newServiceWithId]);
      toast({
        title: "服務已新增",
        description: "您的新服務項目已新增成功",
      });
    } else {
      const updatedServices = services.map(service => 
        service.id === serviceDialog.data?.id ? { ...newService, id: service.id } as Service : service
      );
      setServices(updatedServices);
      toast({
        title: "服務已更新",
        description: "服務項目資訊已更新成功",
      });
    }
    setServiceDialog({ open: false, mode: 'add', data: null });
  };

  const handleServiceDelete = (id: string) => {
    setDeleteDialog({ open: true, type: 'service', id });
  };

  const confirmDelete = () => {
    if (deleteDialog.type === 'service') {
      const updatedServices = services.filter(service => service.id !== deleteDialog.id);
      setServices(updatedServices);
      toast({
        title: "服務已刪除",
        description: "該服務項目已從您的清單中刪除",
      });
    } else if (deleteDialog.type === 'ad') {
      const updatedAds = advertisements.filter(ad => ad.id !== deleteDialog.id);
      setAdvertisements(updatedAds);
      toast({
        title: "廣告已刪除",
        description: "該廣告已從您的清單中刪除",
      });
    }
    setDeleteDialog({ open: false, type: '', id: '' });
  };

  const viewAppointmentDetails = (appointment: Appointment) => {
    setAppointmentDialog({ open: true, data: appointment });
  };

  const openAddAdDialog = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    setNewAd({ 
      title: '', 
      imageUrl: '/placeholder.svg', 
      startDate: today.toISOString().split('T')[0], 
      endDate: nextMonth.toISOString().split('T')[0] 
    });
    setAdDialog({ open: true, mode: 'add', data: null });
  };

  const handleAdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAd(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdSubmit = () => {
    if (adDialog.mode === 'add') {
      const newAdWithId: Advertisement = {
        ...newAd as Omit<Advertisement, 'id' | 'status'>,
        id: `ad${advertisements.length + 1}`,
        status: '審核中'
      };
      setAdvertisements([...advertisements, newAdWithId]);
      toast({
        title: "廣告申請已送出",
        description: "您的廣告申請已送出，等待審核",
      });
    } else {
      const updatedAds = advertisements.map(ad => 
        ad.id === adDialog.data?.id ? { ...newAd, id: ad.id, status: ad.status } as Advertisement : ad
      );
      setAdvertisements(updatedAds);
      toast({
        title: "廣告已更新",
        description: "廣告資訊已更新成功",
      });
    }
    setAdDialog({ open: false, mode: 'add', data: null });
  };

  const handleAdDelete = (id: string) => {
    setDeleteDialog({ open: true, type: 'ad', id });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 text-center border-b">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={business.imageUrl} 
                      alt={business.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{business.name}</h3>
                  <p className="text-beauty-muted text-sm">{user?.email}</p>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'profile' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Building2 size={18} className="mr-3" />
                    <span>店家資料</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'appointments' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Calendar size={18} className="mr-3" />
                    <span>預約管理</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('services')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'services' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Image size={18} className="mr-3" />
                    <span>服務項目</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('advertisements')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'advertisements' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Image size={18} className="mr-3" />
                    <span>廣告管理</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('customers')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'customers' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Users size={18} className="mr-3" />
                    <span>客戶管理</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left ${
                      activeTab === 'settings' 
                        ? 'bg-beauty-primary/10 text-beauty-primary' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>帳戶設定</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">店家資料</h2>
                      <button 
                        onClick={handleEditToggle}
                        className="beauty-button-outline flex items-center"
                      >
                        {editing ? (
                          <>
                            <Save size={16} className="mr-2" />
                            儲存資料
                          </>
                        ) : (
                          <>
                            <Edit size={16} className="mr-2" />
                            編輯資料
                          </>
                        )}
                      </button>
                    </div>
                    
                    {editing ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-1">店家名稱</label>
                          <input
                            type="text"
                            name="name"
                            value={editedBusiness.name}
                            onChange={handleBusinessChange}
                            className="beauty-input w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">店家描述</label>
                          <textarea
                            name="description"
                            value={editedBusiness.description}
                            onChange={handleBusinessChange}
                            rows={3}
                            className="beauty-input w-full"
                          ></textarea>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">地址</label>
                            <input
                              type="text"
                              name="address"
                              value={editedBusiness.address}
                              onChange={handleBusinessChange}
                              className="beauty-input w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">電話</label>
                            <input
                              type="text"
                              name="phone"
                              value={editedBusiness.phone}
                              onChange={handleBusinessChange}
                              className="beauty-input w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">電子郵件</label>
                            <input
                              type="email"
                              name="email"
                              value={editedBusiness.email}
                              onChange={handleBusinessChange}
                              className="beauty-input w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">類別</label>
                            <select
                              name="categories"
                              value={editedBusiness.categories[0]}
                              onChange={(e) => setEditedBusiness(prev => ({
                                ...prev,
                                categories: [e.target.value, ...prev.categories.slice(1)]
                              }))}
                              className="beauty-input w-full"
                            >
                              <option value="美容">美容</option>
                              <option value="美髮">美髮</option>
                              <option value="美甲">美甲</option>
                              <option value="護膚">護膚</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-3">營業時間</label>
                          <div className="space-y-3">
                            {editedBusiness.openingHours.map((day, index) => (
                              <div key={index} className="flex items-center">
                                <span className="w-20">{day.day}</span>
                                <select
                                  value={day.hours === '休息' ? '休息' : '營業'}
                                  onChange={(e) => handleOpeningHoursChange(
                                    index,
                                    'hours',
                                    e.target.value === '休息' ? '休息' : '10:00 - 20:00'
                                  )}
                                  className="beauty-input mr-2"
                                >
                                  <option value="營業">營業</option>
                                  <option value="休息">休息</option>
                                </select>
                                
                                {day.hours !== '休息' && (
                                  <input
                                    type="text"
                                    value={day.hours}
                                    onChange={(e) => handleOpeningHoursChange(index, 'hours', e.target.value)}
                                    className="beauty-input flex-1"
                                    placeholder="例如：10:00 - 20:00"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">基本資料</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-beauty-muted">店家名稱</p>
                              <p>{business.name}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-beauty-muted">類別</p>
                              <p>{business.categories.join(', ')}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-beauty-muted">地址</p>
                              <p>{business.address}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-beauty-muted">電話</p>
                              <p>{business.phone}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-beauty-muted">電子郵件</p>
                              <p>{business.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">店家描述</h3>
                          <p>{business.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">營業時間</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {business.openingHours.map((day, index) => (
                              <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="font-medium">{day.day}</span>
                                <span className={day.hours === '休息' ? 'text-gray-400' : ''}>{day.hours}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'appointments' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">預約管理</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">客戶</th>
                            <th className="px-4 py-3 text-sm font-medium">服務項目</th>
                            <th className="px-4 py-3 text-sm font-medium">日期</th>
                            <th className="px-4 py-3 text-sm font-medium">時間</th>
                            <th className="px-4 py-3 text-sm font-medium">狀態</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {appointments.map(appointment => (
                            <tr key={appointment.id}>
                              <td className="px-4 py-4">{appointment.customerName}</td>
                              <td className="px-4 py-4">{appointment.service}</td>
                              <td className="px-4 py-4">{appointment.date}</td>
                              <td className="px-4 py-4">{appointment.time}</td>
                              <td className="px-4 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {appointment.status === 'confirmed' ? '已確認' : '已完成'}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline"
                                  onClick={() => viewAppointmentDetails(appointment)}
                                >
                                  詳情
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'services' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">服務項目</h2>
                      <button 
                        className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex items-center"
                        onClick={openAddServiceDialog}
                      >
                        <Plus size={16} className="mr-2" />
                        新增服務
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">服務名稱</th>
                            <th className="px-4 py-3 text-sm font-medium">價格 (NT$)</th>
                            <th className="px-4 py-3 text-sm font-medium">時長 (分鐘)</th>
                            <th className="px-4 py-3 text-sm font-medium">描述</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {services.map(service => (
                            <tr key={service.id}>
                              <td className="px-4 py-4">{service.name}</td>
                              <td className="px-4 py-4">{service.price}</td>
                              <td className="px-4 py-4">{service.duration}</td>
                              <td className="px-4 py-4">{service.description}</td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline mr-3"
                                  onClick={() => openEditServiceDialog(service)}
                                >
                                  編輯
                                </button>
                                <button 
                                  className="text-red-500 text-sm hover:underline"
                                  onClick={() => handleServiceDelete(service.id)}
                                >
                                  刪除
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'advertisements' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">廣告管理</h2>
                      <button 
                        className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex items-center"
                        onClick={openAddAdDialog}
                      >
                        <Plus size={16} className="mr-2" />
                        申請新廣告
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">標題</th>
                            <th className="px-4 py-3 text-sm font-medium">開始日期</th>
                            <th className="px-4 py-3 text-sm font-medium">結束日期</th>
                            <th className="px-4 py-3 text-sm font-medium">狀態</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {advertisements.map(ad => (
                            <tr key={ad.id}>
                              <td className="px-4 py-4">{ad.title}</td>
                              <td className="px-4 py-4">{ad.startDate}</td>
                              <td className="px-4 py-4">{ad.endDate}</td>
                              <td className="px-4 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  ad.status === '已核准' 
                                    ? 'bg-green-100 text-green-800' 
                                    : ad.status === '審核中'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                }`}>
                                  {ad.status}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline mr-3"
                                  onClick={() => setAdDialog({ open: true, mode: 'edit', data: ad })}
                                >
                                  編輯
                                </button>
                                <button 
                                  className="text-red-500 text-sm hover:underline"
                                  onClick={() => handleAdDelete(ad.id)}
                                >
                                  刪除
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'customers' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">客戶管理</h2>
                    </div>
                    
                    <div className="mb-6">
                      <div className="relative w-full">
                        <input
                          type="text"
                          placeholder="搜尋客戶..."
                          className="beauty-input w-full pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">客戶名稱</th>
                            <th className="px-4 py-3 text-sm font-medium">電話</th>
                            <th className="px-4 py-3 text-sm font-medium">消費次數</th>
                            <th className="px-4 py-3 text-sm font-medium">最近造訪</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {customers.map(customer => (
                            <tr key={customer.id}>
                              <td className="px-4 py-4">{customer.name}</td>
                              <td className="px-4 py-4">{customer.phone}</td>
                              <td className="px-4 py-4">{customer.visits}</td>
                              <td className="px-4 py-4">{customer.lastVisit}</td>
                              <td className="px-4 py-4">
                                <button className="text-beauty-primary text-sm hover:underline mr-3">
                                  查看紀錄
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">帳戶設定</h2>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">安全設定</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">目前密碼</label>
                            <input type="password" className="beauty-input w-full md:w-1/2" placeholder="輸入目前密碼" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">新密碼</label>
                            <input type="password" className="beauty-input w-full md:w-1/2" placeholder="輸入新密碼" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">確認新密碼</label>
                            <input type="password" className="beauty-input w-full md:w-1/2" placeholder="再次輸入新密碼" />
                          </div>
                          <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                            更新密碼
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">通知設定</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">預約通知</p>
                              <p className="text-sm text-beauty-muted">接收新預約、取消或修改的通知</p>
                            </div>
                            <div className="flex items-center">
                              <label className="switch">
                                <input type="checkbox" checked />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">行銷郵件</p>
                              <p className="text-sm text-beauty-muted">接收平台優惠活動與行銷訊息</p>
                            </div>
                            <div className="flex items-center">
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">系統更新</p>
                              <p className="text-sm text-beauty-muted">接收平台功能更新與公告</p>
                            </div>
                            <div className="flex items-center">
                              <label className="switch">
                                <input type="checkbox" checked />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 mt-4">
                          儲存設定
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={serviceDialog.open} onOpenChange={(open) => !open && setServiceDialog({ open: false, mode: 'add', data: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{serviceDialog.mode === 'add' ? '新增服務項目' : '編輯服務項目'}</DialogTitle>
            <DialogDescription>
              請填寫以下資訊以{serviceDialog.mode === 'add' ? '新增' : '編輯'}服務項目
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">服務名稱</label>
              <input
                type="text"
                name="name"
                value={newService.name}
                onChange={handleServiceChange}
                className="beauty-input w-full"
                placeholder="輸入服務名稱"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">價格 (NT$)</label>
                <input
                  type="number"
                  name="price"
                  value={newService.price}
                  onChange={handleServiceChange}
                  className="beauty-input w-full"
                  placeholder="輸入價格"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">時長 (分鐘)</label>
                <input
                  type="number"
                  name="duration"
                  value={newService.duration}
                  onChange={handleServiceChange}
                  className="beauty-input w-full"
                  placeholder="輸入服務時長"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">服務描述</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleServiceChange}
                className="beauty-input w-full"
                rows={3}
                placeholder="輸入服務描述"
              ></textarea>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialog({ open: false, mode: 'add', data: null })}>
              取消
            </Button>
            <Button onClick={handleServiceSubmit}>
              {serviceDialog.mode === 'add' ? '新增' : '儲存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={appointmentDialog.open} onOpenChange={(open) => !open && setAppointmentDialog({ open: false, data: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>預約詳情</DialogTitle>
          </DialogHeader>
          
          {appointmentDialog.data && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-beauty-muted">客戶名稱</p>
                  <p className="font-medium">{appointmentDialog.data.customerName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">服務項目</p>
                  <p className="font-medium">{appointmentDialog.data.service}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">日期</p>
                  <p className="font-medium">{appointmentDialog.data.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">時間</p>
                  <p className="font-medium">{appointmentDialog.data.time}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">狀態</p>
                  <p className="font-medium">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointmentDialog.data.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointmentDialog.data.status === 'confirmed' ? '已確認' : '已完成'}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-beauty-muted mb-1">備註</p>
                <p>客戶無特殊需求。</p>
              </div>
              
              <Tabs defaultValue="history">
                <TabsList className="w-full">
                  <TabsTrigger value="history" className="flex-1">預約紀錄</TabsTrigger>
                  <TabsTrigger value="contact" className="flex-1">聯絡紀錄</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 border-b">
                      <span>2025-04-15 14:23</span>
                      <span>預約已建立</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span>2025-04-15 14:25</span>
                      <span>預約已確認</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="pt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-beauty-muted">尚無聯絡紀錄</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAppointmentDialog({ open: false, data: null })}>
              關閉
            </Button>
            {appointmentDialog.data?.status === 'confirmed' && (
              <Button>
                標記為已完成
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={adDialog.open} onOpenChange={(open) => !open && setAdDialog({ open: false, mode: 'add', data: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{adDialog.mode === 'add' ? '申請新廣告' : '編輯廣告'}</DialogTitle>
            <DialogDescription>
              請填寫以下資訊以{adDialog.mode === 'add' ? '申請' : '編輯'}廣告
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">廣告標題</label>
              <input
                type="text"
                name="title"
                value={newAd.title}
                onChange={handleAdChange}
                className="beauty-input w-full"
                placeholder="輸入廣告標題"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">開始日期</label>
                <input
                  type="date"
                  name="startDate"
                  value={newAd.startDate}
                  onChange={handleAdChange}
                  className="beauty-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">結束日期</label>
                <input
                  type="date"
                  name="endDate"
                  value={newAd.endDate}
                  onChange={handleAdChange}
                  className="beauty-input w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">廣告圖片</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="mb-2">
                  <img 
                    src={newAd.imageUrl} 
                    alt="廣告預覽" 
                    className="h-32 mx-auto object-cover"
                  />
                </div>
                <button className="beauty-button-outline text-sm">
                  上傳圖片
                </button>
                <p className="text-xs text-beauty-muted mt-2">
                  建議尺寸: 1200 x 400 像素，檔案大小不超過 2MB
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdDialog({ open: false, mode: 'add', data: null })}>
              取消
            </Button>
            <Button onClick={handleAdSubmit}>
              {adDialog.mode === 'add' ? '送出申請' : '儲存變更'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, type: '', id: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除此{deleteDialog.type === 'service' ? '服務項目' : '廣告'}嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, type: '', id: '' })}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              確認刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BusinessProfile;
