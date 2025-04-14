
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, Scissors, User, Phone, X } from 'lucide-react';
import Footer from '@/components/Footer';

// Mock appointments
const mockAppointments = [
  {
    id: '1',
    businessName: '瑪莎美髮沙龍',
    serviceName: '剪髮 + 造型',
    date: '2025-04-20',
    time: '14:30',
    address: '台北市信義區松仁路100號',
    status: 'confirmed',
    price: 800
  },
  {
    id: '2',
    businessName: '艾莉絲美甲工作室',
    serviceName: '基礎美甲 + 凝膠',
    date: '2025-04-25',
    time: '11:00',
    address: '台北市大安區忠孝東路四段100號',
    status: 'confirmed',
    price: 1200
  },
  {
    id: '3',
    businessName: '皇后美容中心',
    serviceName: '深層臉部清潔',
    date: '2025-03-15',
    time: '10:30',
    address: '台北市中山區南京東路二段100號',
    status: 'completed',
    price: 1500
  }
];

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const upcomingAppointments = mockAppointments.filter(app => app.status === 'confirmed');
  const completedAppointments = mockAppointments.filter(app => app.status === 'completed');
  
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<null | string>(null);
  
  const handleCancelClick = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setCancelModalOpen(true);
  };
  
  const handleCancelConfirm = () => {
    // In a real app, we would call an API to cancel the appointment
    console.log('Cancelling appointment:', selectedAppointment);
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-6">我的預約</h1>
            
            <div className="border-b mb-6">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'border-beauty-primary text-beauty-primary'
                      : 'border-transparent text-beauty-muted hover:text-beauty-dark hover:border-gray-300'
                  }`}
                >
                  即將到來
                  {upcomingAppointments.length > 0 && (
                    <span className="ml-2 bg-beauty-primary/10 text-beauty-primary rounded-full px-2 py-0.5 text-xs">
                      {upcomingAppointments.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'completed'
                      ? 'border-beauty-primary text-beauty-primary'
                      : 'border-transparent text-beauty-muted hover:text-beauty-dark hover:border-gray-300'
                  }`}
                >
                  已完成
                  {completedAppointments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                      {completedAppointments.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
            
            <div>
              {activeTab === 'upcoming' && (
                <>
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-beauty-muted">您目前沒有即將到來的預約</p>
                      <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 mt-4">
                        預約新服務
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {upcomingAppointments.map(appointment => (
                        <div key={appointment.id} className="border rounded-lg p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{appointment.businessName}</h3>
                            <span className="px-3 py-1 bg-beauty-primary/10 text-beauty-primary rounded-full text-sm">
                              已確認
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-3">
                            <p className="flex items-center text-beauty-dark">
                              <Scissors className="mr-2" size={18} />
                              {appointment.serviceName}
                              <span className="ml-auto font-semibold">${appointment.price}</span>
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <Calendar className="mr-2" size={18} />
                              {formatDate(appointment.date)}
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <Clock className="mr-2" size={18} />
                              {appointment.time}
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <MapPin className="mr-2" size={18} />
                              {appointment.address}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex space-x-4">
                            <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                              修改預約
                            </button>
                            <button 
                              className="beauty-button bg-white border border-red-500 text-red-500 hover:bg-red-50"
                              onClick={() => handleCancelClick(appointment.id)}
                            >
                              取消預約
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'completed' && (
                <>
                  {completedAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-beauty-muted">您還沒有完成的預約</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {completedAppointments.map(appointment => (
                        <div key={appointment.id} className="border rounded-lg p-6 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{appointment.businessName}</h3>
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                              已完成
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-3">
                            <p className="flex items-center text-beauty-dark">
                              <Scissors className="mr-2" size={18} />
                              {appointment.serviceName}
                              <span className="ml-auto font-semibold">${appointment.price}</span>
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <Calendar className="mr-2" size={18} />
                              {formatDate(appointment.date)}
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <Clock className="mr-2" size={18} />
                              {appointment.time}
                            </p>
                            <p className="flex items-center text-beauty-dark">
                              <MapPin className="mr-2" size={18} />
                              {appointment.address}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex space-x-4">
                            <button className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                              再次預約
                            </button>
                            <button className="beauty-button bg-white border border-gray-300 text-beauty-dark hover:bg-gray-50">
                              寫評價
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cancel Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">確認取消預約</h3>
              <button 
                onClick={() => setCancelModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-6">您確定要取消此預約嗎？取消可能會受到預約政策的限制。</p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setCancelModalOpen(false)}
                className="beauty-button bg-white border border-gray-300 text-beauty-dark hover:bg-gray-50 flex-1"
              >
                返回
              </button>
              <button 
                onClick={handleCancelConfirm}
                className="beauty-button bg-red-500 hover:bg-red-600 text-white flex-1"
              >
                確認取消
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Appointments;
