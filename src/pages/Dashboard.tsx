import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  Menu, 
  X,
  Grid,
  Clock,
  LogOut,
  Bell,
  ChevronDown,
  Scissors,
  Camera,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Dummy data for demonstration
  const upcomingAppointments = [
    { id: 1, customer: '吳小姐', service: '基礎面部護理', time: '2023-07-15 14:00', status: 'confirmed' },
    { id: 2, customer: '林先生', service: '時尚剪髮', time: '2023-07-15 16:30', status: 'confirmed' },
    { id: 3, customer: '陳小姐', service: '美甲服務', time: '2023-07-16 10:00', status: 'pending' },
  ];
  
  // Mock data for business stats
  const businessStats = {
    totalAppointments: 156,
    completedAppointments: 142,
    cancelledAppointments: 14,
    totalCustomers: 87,
    totalRevenue: 145600,
    servicesOffered: 12
  };

  // Mock data for services
  const services = [
    { id: 1, name: '基礎面部護理', price: 1200, duration: 60, status: 'active' },
    { id: 2, name: '深層潔淨護理', price: 1800, duration: 90, status: 'active' },
    { id: 3, name: '時尚剪髮', price: 800, duration: 60, status: 'active' },
    { id: 4, name: '染髮服務', price: 1500, duration: 120, status: 'active' },
    { id: 5, name: '美甲服務', price: 600, duration: 45, status: 'inactive' },
  ];
  
  // Format appointment time
  const formatAppointmentTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return `${date.toLocaleDateString('zh-TW')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  // Handle appointment status change
  const handleStatusChange = (id: number, newStatus: string) => {
    toast({
      title: "狀態已更新",
      description: `預約 #${id} 的狀態已更改為 ${newStatus === 'confirmed' ? '已確認' : newStatus === 'completed' ? '已完成' : '已取消'}`
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-40 h-16 flex items-center px-4">
        <button onClick={toggleSidebar} className="p-2 mr-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/" className="text-beauty-primary font-bold text-xl font-serif">BeautifyHub</Link>
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-2 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-beauty-primary text-white flex items-center justify-center">
            <span>美</span>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:w-64 lg:min-h-screen`}>
        <div className="h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b">
            <Link to="/" className="text-beauty-primary font-bold text-xl font-serif">BeautifyHub</Link>
          </div>
          
          {/* Business Info */}
          <div className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-beauty-primary text-white flex items-center justify-center mr-3">
                <span>美</span>
              </div>
              <div>
                <div className="text-sm font-medium">美麗空間</div>
                <div className="text-xs text-beauty-muted">美容沙龍</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-beauty-muted">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span>營業中</span>
            </div>
          </div>
          
          {/* Sidebar Navigation */}
          <nav className="py-4">
            <ul>
              <li>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'overview' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Home size={18} className="mr-3" />
                  <span>概覽</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'appointments' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Calendar size={18} className="mr-3" />
                  <span>預約管理</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'services' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Scissors size={18} className="mr-3" />
                  <span>服務管理</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('customers')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'customers' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Users size={18} className="mr-3" />
                  <span>客戶管理</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'portfolio' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Camera size={18} className="mr-3" />
                  <span>作品集管理</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-6 py-3 hover:bg-gray-50 ${
                    activeTab === 'settings' ? 'text-beauty-primary bg-beauty-primary/5 border-r-2 border-beauty-primary' : 'text-gray-700'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  <span>設定</span>
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Logout Button */}
          <div className="absolute bottom-0 w-full p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              <LogOut size={18} className="mr-3" />
              <span>登出</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={`lg:ml-64 pt-16 lg:pt-0 min-h-screen`}>
        {/* Page Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-xl font-bold">
              {activeTab === 'overview' && '商家後台'}
              {activeTab === 'appointments' && '預約管理'}
              {activeTab === 'services' && '服務管理'}
              {activeTab === 'customers' && '客戶管理'}
              {activeTab === 'portfolio' && '作品集管理'}
              {activeTab === 'settings' && '設定'}
            </h1>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              {/* Business Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-beauty-muted text-sm">總預約數</p>
                      <h3 className="text-3xl font-bold mt-1">{businessStats.totalAppointments}</h3>
                    </div>
                    <div className="bg-beauty-primary/10 p-3 rounded-lg">
                      <Calendar className="text-beauty-primary" size={24} />
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="text-green-500 bg-green-50 px-2 py-1 rounded-full">
                      完成: {businessStats.completedAppointments}
                    </span>
                    <span className="text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      取消: {businessStats.cancelledAppointments}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-beauty-muted text-sm">總客戶數</p>
                      <h3 className="text-3xl font-bold mt-1">{businessStats.totalCustomers}</h3>
                    </div>
                    <div className="bg-beauty-secondary/10 p-3 rounded-lg">
                      <Users className="text-beauty-secondary" size={24} />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-500 flex items-center">
                    <span>↑ 12% 較上個月</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-beauty-muted text-sm">總收入</p>
                      <h3 className="text-3xl font-bold mt-1">NT${businessStats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-beauty-accent/10 p-3 rounded-lg">
                      <DollarSign className="text-beauty-accent" size={24} />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-500 flex items-center">
                    <span>↑ 8% 較上個月</span>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-sm mb-8">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold">今日預約</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">客戶</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">服務項目</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">時間</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">狀態</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {upcomingAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">{appointment.customer}</td>
                          <td className="px-6 py-4 text-sm">{appointment.service}</td>
                          <td className="px-6 py-4 text-sm">{formatAppointmentTime(appointment.time)}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : appointment.status === 'completed'
                                ? 'bg-blue-100 text-blue-700'
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {appointment.status === 'confirmed' && '已確認'}
                              {appointment.status === 'pending' && '待確認'}
                              {appointment.status === 'completed' && '已完成'}
                              {appointment.status === 'cancelled' && '已取消'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="relative inline-block text-left">
                              <button className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-beauty-dark hover:bg-gray-50">
                                操作
                                <ChevronDown size={14} className="ml-1" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {upcomingAppointments.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-beauty-muted">
                            今日沒有預約
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Quick Access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-beauty-primary/10 p-4 rounded-full">
                    <Calendar className="text-beauty-primary" size={24} />
                  </div>
                  <h3 className="mt-3 font-medium">管理預約</h3>
                  <p className="text-sm text-beauty-muted mt-1">查看和管理所有預約</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-beauty-primary/10 p-4 rounded-full">
                    <Scissors className="text-beauty-primary" size={24} />
                  </div>
                  <h3 className="mt-3 font-medium">管理服務</h3>
                  <p className="text-sm text-beauty-muted mt-1">更新服務項目和價格</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-beauty-primary/10 p-4 rounded-full">
                    <Camera className="text-beauty-primary" size={24} />
                  </div>
                  <h3 className="mt-3 font-medium">管理作品集</h3>
                  <p className="text-sm text-beauty-muted mt-1">上傳和管理作品照片</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-beauty-primary/10 p-4 rounded-full">
                    <Settings className="text-beauty-primary" size={24} />
                  </div>
                  <h3 className="mt-3 font-medium">商家設定</h3>
                  <p className="text-sm text-beauty-muted mt-1">更新店家資訊和設定</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">服務項目</h2>
                <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                  新增服務
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">服務名稱</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">價格</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">時間</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">狀態</th>
                        <th className="px-6 py-3 text-xs font-medium text-beauty-muted uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{service.name}</td>
                          <td className="px-6 py-4 text-sm">NT${service.price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm">{service.duration} 分鐘</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              service.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {service.status === 'active' ? '啟用中' : '已停用'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                                編輯
                              </button>
                              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 text-red-500">
                                刪除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs would be implemented here */}
          {activeTab !== 'overview' && activeTab !== 'services' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="max-w-md mx-auto">
                <Grid className="mx-auto text-beauty-muted h-16 w-16 mb-4" />
                <h2 className="text-xl font-bold mb-2">此功能正在開發中</h2>
                <p className="text-beauty-muted mb-4">
                  我們正在努力完善這項功能，很快就會推出。
                </p>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90"
                >
                  返回概覽
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
