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
  XCircle,
  CalendarDays,
  X,
  Star,
  Ban,
  FileText,
  BarChart4
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
import { Input } from '@/components/ui/input';
import { CustomerDetailsDialog } from '@/components/dashboard/CustomerDetailsDialog';
import { Badge } from '@/components/ui/badge';

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
  status: "regular" | "vip" | "blacklist";
  note?: string;
  totalSpent: number;
}

interface RestDay {
  id: string;
  date: string;
  reason?: string;
}

interface ServiceDialogState {
  open: boolean;
  mode: 'add' | 'edit';
  data: Service | null;
}

interface AppointmentDialogState {
  open: boolean;
  data: Appointment | null;
}

interface AdDialogState {
  open: boolean;
  mode: 'add' | 'edit';
  data: Advertisement | null;
}

interface DeleteDialogState {
  open: boolean;
  type: string;
  id: string;
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
  { id: "c1", name: "林小美", phone: "0912-345-678", visits: 5, lastVisit: "2025-04-10", status: "vip", totalSpent: 15000 },
  { id: "c2", name: "王大明", phone: "0923-456-789", visits: 3, lastVisit: "2025-04-05", status: "regular", totalSpent: 9000 },
  { id: "c3", name: "張小華", phone: "0934-567-890", visits: 8, lastVisit: "2025-04-15", status: "regular", totalSpent: 24000 },
  { id: "c4", name: "李美美", phone: "0945-678-901", visits: 2, lastVisit: "2025-03-28", status: "blacklist", note: "多次取消預約", totalSpent: 6000 }
];

const mockRestDays: RestDay[] = [
  { id: "rd1", date: "2025-05-01", reason: "勞動節" },
  { id: "rd2", date: "2025-06-25", reason: "店內裝修" },
  { id: "rd3", date: "2025-10-10", reason: "國慶日" }
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
  const [restDays, setRestDays] = useState<RestDay[]>(mockRestDays);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAddRestDayDialog, setShowAddRestDayDialog] = useState(false);
  const [newRestDay, setNewRestDay] = useState<Omit<RestDay, 'id'>>({ date: '', reason: '' });
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({ name: '', price: 0, duration: 30, description: '' });
  const [serviceDialog, setServiceDialog] = useState<ServiceDialogState>({ open: false, mode: 'add', data: null });
  const [appointmentDialog, setAppointmentDialog] = useState<AppointmentDialogState>({ open: false, data: null });
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'status'>>({ title: '', imageUrl: '/placeholder.svg', startDate: '', endDate: '' });
  const [adDialog, setAdDialog] = useState<AdDialogState>({ open: false, mode: 'add', data: null });
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({ open: false, type: '', id: '' });
  
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

  const handleAddRestDay = () => {
    if (!newRestDay.date) return;
    
    const newRestDayWithId: RestDay = {
      ...newRestDay,
      id: `rd${restDays.length + 1}`
    };
    
    setRestDays([...restDays, newRestDayWithId]);
    
    toast({
      title: "休息日已新增",
      description: `${newRestDay.date} 已設為休息日`,
    });
    
    setNewRestDay({ date: '', reason: '' });
    setShowAddRestDayDialog(false);
  };

  const handleDeleteRestDay = (id: string) => {
    setRestDays(restDays.filter(day => day.id !== id));
    
    toast({
      title: "休息日已刪除",
      description: "指定的休息日已成功刪除",
    });
  };

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm)
  );

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
                  
                  <button 
                    onClick={() => {
                      navigate('/dashboard/report-analysis');
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-left hover:bg-gray-50`}
                  >
                    <BarChart4 size={18} className="mr-3" />
                    <span>報表分析</span>
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
                        
                        <div>
                          <label className="block text-sm font-medium mb-3">特定休息日</label>
                          <div className="space-y-2 mb-2">
                            {restDays.map((day) => (
                              <div key={day.id} className="flex items-center justify-between p-2 border rounded-md">
                                <div>
                                  <span className="font-medium">{day.date}</span>
                                  {day.reason && <span className="ml-2 text-sm text-beauty-muted">({day.reason})</span>}
                                </div>
                                <button
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                  onClick={() => handleDeleteRestDay(day.id)}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowAddRestDayDialog(true)}
                          >
                            <Plus size={14} className="mr-1" />
                            新增休息日
                          </Button>
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
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">特定休息日</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {restDays.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {restDays.map((day) => (
                                  <div key={day.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                                    <CalendarDays className="h-4 w-4 text-beauty-muted mr-2" />
                                    <span className="font-medium">{day.date}</span>
                                    {day.reason && <span className="ml-2 text-sm text-beauty-muted">({day.reason})</span>}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-beauty-muted text-sm">尚未設定特定休息日</p>
                            )}
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
                            <th className="px-4 py-3 text-sm font-medium">服務時長 (分鐘)</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {services.map(service => (
                            <tr key={service.id}>
                              <td className="px-4 py-4">{service.name}</td>
                              <td className="px-4 py-4">{service.price}</td>
                              <td className="px-4 py-4">{service.duration}</td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline"
                                  onClick={() => openEditServiceDialog(service)}
                                >
                                  編輯
                                </button>
                                <button 
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                  onClick={() => handleServiceDelete(service.id)}
                                >
                                  <Trash2 size={16} />
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
                        新增廣告
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">廣告標題</th>
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
                                  ad.status === '審核中' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {ad.status}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline"
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
                      <input
                        type="text"
                        value={customerSearchTerm}
                        onChange={(e) => setCustomerSearchTerm(e.target.value)}
                        className="beauty-input w-40 mr-4"
                      />
                      <button 
                        className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex items-center"
                        onClick={() => viewCustomerDetails(customers[0])}
                      >
                        查看詳情
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium">客戶名稱</th>
                            <th className="px-4 py-3 text-sm font-medium">電話</th>
                            <th className="px-4 py-3 text-sm font-medium">訪問次數</th>
                            <th className="px-4 py-3 text-sm font-medium">最後訪問日期</th>
                            <th className="px-4 py-3 text-sm font-medium">狀態</th>
                            <th className="px-4 py-3 text-sm font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                              <td className="px-4 py-4">{customer.name}</td>
                              <td className="px-4 py-4">{customer.phone}</td>
                              <td className="px-4 py-4">{customer.visits}</td>
                              <td className="px-4 py-4">{customer.lastVisit}</td>
                              <td className="px-4 py-4">
                                <Badge variant={customer.status === 'regular' ? 'default' : 'secondary'}>
                                  {customer.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-4">
                                <button 
                                  className="text-beauty-primary text-sm hover:underline"
                                  onClick={() => viewCustomerDetails(customer)}
                                >
                                  查看詳情
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
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">密碼</label>
                        <input
                          type="password"
                          className="beauty-input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">驗證碼</label>
                        <input
                          type="text"
                          className="beauty-input w-full"
                        />
                      </div>
                      
                      <div>
                        <button 
                          className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90"
                        >
                          更新
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
      
      <Dialog open={serviceDialog.open} onOpenChange={(open) => setServiceDialog({ ...serviceDialog, open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{serviceDialog.mode === 'add' ? '新增服務項目' : '編輯服務項目'}</DialogTitle>
            <DialogDescription>
              {serviceDialog.mode === 'add' ? '請填寫新服務的詳細資訊' : '請修改服務的詳細資訊'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">服務名稱</label>
              <Input
                id="name"
                name="name"
                value={newService.name}
                onChange={handleServiceChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">價格 (NT$)</label>
              <Input
                id="price"
                name="price"
                type="number"
                value={newService.price}
                onChange={handleServiceChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">服務時長 (分鐘)</label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={newService.duration}
                onChange={handleServiceChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">服務描述</label>
              <Input
                id="description"
                name="description"
                value={newService.description}
                onChange={handleServiceChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialog({ ...serviceDialog, open: false })}>取消</Button>
            <Button onClick={handleServiceSubmit}>{serviceDialog.mode === 'add' ? '新增' : '儲存'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={appointmentDialog.open} onOpenChange={(open) => setAppointmentDialog({ ...appointmentDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>預約詳情</DialogTitle>
          </DialogHeader>
          
          {appointmentDialog.data && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-beauty-muted">客戶姓名</p>
                <p className="font-medium">{appointmentDialog.data.customerName}</p>
              </div>
              
              <div>
                <p className="text-sm text-beauty-muted">服務項目</p>
                <p className="font-medium">{appointmentDialog.data.service}</p>
              </div>
              
              <div>
                <p className="text-sm text-beauty-muted">預約日期</p>
                <p className="font-medium">{appointmentDialog.data.date}</p>
              </div>
              
              <div>
                <p className="text-sm text-beauty-muted">預約時間</p>
                <p className="font-medium">{appointmentDialog.data.time}</p>
              </div>
              
              <div>
                <p className="text-sm text-beauty-muted">狀態</p>
                <Badge variant={appointmentDialog.data.status === 'confirmed' ? 'default' : 'secondary'}>
                  {appointmentDialog.data.status === 'confirmed' ? '已確認' : '已完成'}
                </Badge>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setAppointmentDialog({ open: false, data: null })}>關閉</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={adDialog.open} onOpenChange={(open) => setAdDialog({ ...adDialog, open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{adDialog.mode === 'add' ? '新增廣告' : '編輯廣告'}</DialogTitle>
            <DialogDescription>
              {adDialog.mode === 'add' ? '請填寫新廣告的詳細資訊' : '請修改廣告的詳細資訊'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="adTitle" className="text-sm font-medium">廣告標題</label>
              <Input
                id="adTitle"
                name="title"
                value={newAd.title}
                onChange={handleAdChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">開始日期</label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={newAd.startDate}
                onChange={handleAdChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">結束日期</label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={newAd.endDate}
                onChange={handleAdChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">廣告圖片</label>
              <div className="bg-gray-100 rounded-md p-4 text-center">
                <p className="text-sm text-beauty-muted">上傳功能尚未實現</p>
                <p className="text-xs text-beauty-muted">將使用預設圖片</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdDialog({ ...adDialog, open: false })}>取消</Button>
            <Button onClick={handleAdSubmit}>{adDialog.mode === 'add' ? '送出申請' : '更新'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除這個{deleteDialog.type === 'service' ? '服務項目' : '廣告'}嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, type: '', id: '' })}>取消</Button>
            <Button variant="destructive" onClick={confirmDelete}>確認刪除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showAddRestDayDialog} onOpenChange={setShowAddRestDayDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增特定休息日</DialogTitle>
            <DialogDescription>
              請選擇日期並填寫原因（選填）
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="restDate" className="text-sm font-medium">日期</label>
              <Input
                id="restDate"
                type="date"
                value={newRestDay.date}
                onChange={(e) => setNewRestDay({ ...newRestDay, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="restReason" className="text-sm font-medium">原因 (選填)</label>
              <Input
                id="restReason"
                value={newRestDay.reason || ''}
                onChange={(e) => setNewRestDay({ ...newRestDay, reason: e.target.value })}
                placeholder="例如：店內裝修、國定假日等"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRestDayDialog(false)}>取消</Button>
            <Button onClick={handleAddRestDay}>新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <CustomerDetailsDialog 
        open={showCustomerDetails} 
        onOpenChange={setShowCustomerDetails} 
        customer={selectedCustomer} 
      />
    </div>
  );
};

export default BusinessProfile;
