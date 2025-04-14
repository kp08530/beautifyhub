
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
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

// 示範用的假資料
const mockBusiness = {
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

const mockAppointments = [
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

const mockServices = [
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

const BusinessProfile = () => {
  const { user, isBusiness } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [business, setBusiness] = useState(mockBusiness);
  const [editing, setEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState(mockBusiness);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [services, setServices] = useState(mockServices);
  
  useEffect(() => {
    // 檢查是否為商家帳戶
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
      // 儲存編輯
      setBusiness(editedBusiness);
      toast({
        title: "資料已更新",
        description: "您的店家資料已成功更新",
      });
    }
    setEditing(!editing);
  };
  
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleOpeningHoursChange = (index, field, value) => {
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
  
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
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
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Profile Tab */}
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
                
                {/* Appointments Tab */}
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
                                <button className="text-beauty-primary text-sm hover:underline">
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
                
                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">服務項目</h2>
                      <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex items-center">
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
                                <button className="text-beauty-primary text-sm hover:underline mr-3">
                                  編輯
                                </button>
                                <button className="text-red-500 text-sm hover:underline">
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
                
                {/* Customers Tab */}
                {activeTab === 'customers' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">客戶管理</h2>
                    <p className="text-beauty-muted">客戶管理功能即將推出，敬請期待！</p>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">帳戶設定</h2>
                    <p className="text-beauty-muted">進階帳戶設定功能即將推出，敬請期待！</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusinessProfile;
