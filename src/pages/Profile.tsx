
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    birthday: '',
    gender: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "個人資料已更新",
        description: "您的個人資料已成功更新"
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-6">個人資料</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="beauty-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">電子郵件</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="beauty-input w-full bg-gray-100"
                    disabled
                  />
                  <p className="text-xs text-beauty-muted mt-1">電子郵件無法更改</p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">電話號碼</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="beauty-input w-full"
                    placeholder="例：0912345678"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthday" className="block text-sm font-medium mb-2">生日</label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="beauty-input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-2">性別</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="beauty-input w-full"
                  >
                    <option value="">請選擇</option>
                    <option value="female">女性</option>
                    <option value="male">男性</option>
                    <option value="other">其他</option>
                    <option value="prefer-not-to-say">不願透露</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className={`beauty-button bg-beauty-primary hover:bg-beauty-primary/90 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? '儲存中...' : '儲存變更'}
                </button>
              </div>
            </form>
            
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">帳戶安全</h2>
              
              <div className="mb-4">
                <button className="text-beauty-primary hover:underline">
                  變更密碼
                </button>
              </div>
              
              <div>
                <button className="text-beauty-primary hover:underline">
                  啟用二步驟驗證
                </button>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">偏好設定</h2>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="h-4 w-4 text-beauty-primary rounded border-gray-300 focus:ring-beauty-primary"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-beauty-dark">
                  接收電子郵件通知
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  className="h-4 w-4 text-beauty-primary rounded border-gray-300 focus:ring-beauty-primary"
                />
                <label htmlFor="smsNotifications" className="ml-2 text-sm text-beauty-dark">
                  接收簡訊通知
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
