
import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { Service } from '@/data/services';
import { Business } from '@/data/businesses';
import ServiceCard from './ServiceCard';
import { useToast } from '@/hooks/use-toast';

interface AppointmentFormProps {
  business: Business;
  services: Service[];
}

const AppointmentForm = ({ business, services }: AppointmentFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const availableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Skip days when the business is closed
      const dayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
      const businessHours = business.openingHours.find(day => day.day === dayOfWeek)?.hours;
      
      if (businessHours && businessHours !== '休息') {
        const formattedDate = date.toISOString().split('T')[0];
        const displayDate = `${date.getMonth() + 1}月${date.getDate()}日 ${dayOfWeek}`;
        dates.push({ value: formattedDate, display: displayDate });
      }
    }
    
    return dates;
  };
  
  const availableTimes = () => {
    const times = [];
    
    // Get opening hours for selected date
    if (!selectedDate) return times;
    
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][selectedDateObj.getDay()];
    const businessHours = business.openingHours.find(day => day.day === dayOfWeek)?.hours;
    
    if (!businessHours || businessHours === '休息') return times;
    
    // Parse business hours
    const [startStr, endStr] = businessHours.split(' - ');
    const [startHour, startMinute] = startStr.split(':').map(Number);
    const [endHour, endMinute] = endStr.split(':').map(Number);
    
    // Generate time slots in 30-minute intervals
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      times.push(formattedTime);
      
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }
    
    return times;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "請選擇服務",
        description: "預約前請先選擇一項服務",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast({
        title: "請選擇日期和時間",
        description: "預約前請選擇日期和時間",
        variant: "destructive"
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "請填寫必要資訊",
        description: "姓名、電子郵件和電話是必填欄位",
        variant: "destructive"
      });
      return;
    }
    
    // Submit appointment data
    toast({
      title: "預約成功！",
      description: `您已成功預約${business.name}的${selectedService?.name}服務，時間為${selectedDate.split('-')[1]}月${selectedDate.split('-')[2]}日 ${selectedTime}`,
    });
    
    // Reset form
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
  };
  
  return (
    <div className="beauty-card">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-6 text-center">預約服務</h3>
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-beauty-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="text-xs mt-1">選擇服務</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 2 ? 'bg-beauty-primary' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-beauty-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="text-xs mt-1">選擇時間</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 3 ? 'bg-beauty-primary' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-beauty-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className="text-xs mt-1">填寫資料</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold mb-4 flex items-center">
                <span className="bg-beauty-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
                選擇您想要的服務
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                {services.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelectable
                    isSelected={selectedService?.id === service.id}
                    onSelect={() => setSelectedService(service)}
                  />
                ))}
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full beauty-button bg-beauty-primary hover:bg-beauty-primary/90"
                >
                  下一步
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Date and Time */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold mb-4 flex items-center">
                <span className="bg-beauty-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
                選擇日期和時間
              </h4>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Calendar size={16} className="mr-1 text-beauty-primary" />
                  日期
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 max-h-[200px] overflow-y-auto">
                  {availableDates().map((date, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 border rounded-lg cursor-pointer ${
                        selectedDate === date.value 
                          ? 'border-beauty-primary bg-beauty-primary/10' 
                          : 'border-gray-200 hover:border-beauty-primary/50'
                      }`}
                    >
                      {date.display}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Clock size={16} className="mr-1 text-beauty-primary" />
                  時間
                </label>
                {selectedDate ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-[200px] overflow-y-auto">
                    {availableTimes().map((time, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 border rounded-lg text-center cursor-pointer ${
                          selectedTime === time
                            ? 'border-beauty-primary bg-beauty-primary/10'
                            : 'border-gray-200 hover:border-beauty-primary/50'
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-beauty-muted text-sm italic">請先選擇日期</p>
                )}
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 beauty-button bg-beauty-primary hover:bg-beauty-primary/90"
                >
                  下一步
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold mb-4 flex items-center">
                <span className="bg-beauty-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">3</span>
                填寫個人資料
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <User size={16} className="mr-1 text-beauty-primary" />
                  您的姓名 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="beauty-input w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Mail size={16} className="mr-1 text-beauty-primary" />
                  電子郵件 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="beauty-input w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Phone size={16} className="mr-1 text-beauty-primary" />
                  聯絡電話 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="beauty-input w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">備註</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="beauty-input w-full h-24 resize-none"
                  placeholder="有特殊需求請在此說明"
                ></textarea>
              </div>
              
              <div className="bg-beauty-primary/10 p-4 rounded-lg mb-4">
                <h5 className="font-bold mb-2">預約詳情</h5>
                <p><span className="font-medium">服務：</span>{selectedService?.name}</p>
                <p><span className="font-medium">價格：</span>NT${selectedService?.price}</p>
                <p><span className="font-medium">時長：</span>{selectedService?.duration}分鐘</p>
                <p>
                  <span className="font-medium">時間：</span>
                  {selectedDate && new Date(selectedDate).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' })} {selectedTime}
                </p>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  上一步
                </button>
                <button
                  type="submit"
                  className="flex-1 beauty-button bg-beauty-primary hover:bg-beauty-primary/90"
                >
                  確認預約
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
