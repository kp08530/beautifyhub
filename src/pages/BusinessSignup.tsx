
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

const BusinessSignup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    businessType: '',
    description: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不符');
      setLoading(false);
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('請同意服務條款與隱私政策');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast({
        title: "申請已送出",
        description: "我們將盡快審核您的商家入駐申請",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-2">商家入駐申請</h2>
          <p className="text-beauty-muted text-center mb-8">加入 BeautifyHub，讓更多客戶發現您的美容服務</p>
          
          {success ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
              <div className="flex items-center">
                <Check className="text-green-500 mr-3" size={24} />
                <div>
                  <h3 className="text-green-800 font-bold text-lg">申請成功</h3>
                  <p className="text-green-700">感謝您的申請！我們將審核您的資料，並於 1-3 個工作天內透過 Email 通知審核結果。</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                  返回首頁
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                  <div className="flex">
                    <AlertCircle className="text-red-500 mr-3" size={20} />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">基本資料</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium mb-1">店家名稱 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium mb-1">負責人姓名 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">電子郵件 <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">聯絡電話 <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">密碼 <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">確認密碼 <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">店家資料</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">店家地址 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium mb-1">店家類型 <span className="text-red-500">*</span></label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="beauty-input w-full"
                    >
                      <option value="">請選擇店家類型</option>
                      <option value="美容">美容</option>
                      <option value="美髮">美髮</option>
                      <option value="美甲">美甲</option>
                      <option value="護膚">護膚</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">店家描述</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="beauty-input w-full"
                      placeholder="請簡單描述您的店家特色、提供的服務等"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="agreeTerms" className="text-sm">
                    我已閱讀並同意 <Link to="/terms" className="text-beauty-primary hover:underline">服務條款</Link> 與 <Link to="/privacy" className="text-beauty-primary hover:underline">隱私政策</Link>
                  </label>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? '處理中...' : '提交申請'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusinessSignup;
