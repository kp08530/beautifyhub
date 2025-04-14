
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const { toast } = useToast();
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // If user is already authenticated, redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "請輸入所有必填欄位",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密碼不一致",
        description: "請確認兩次輸入的密碼相同",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "請同意服務條款和隱私政策",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const success = await register(formData.name, formData.email, formData.password);
    
    if (success) {
      navigate('/');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">創建帳戶</h1>
              <p className="text-beauty-muted">註冊 BeautifyHub 開始您的美麗之旅</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">姓名</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="beauty-input w-full pl-10"
                    placeholder="您的姓名"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">電子郵件</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="beauty-input w-full pl-10"
                    placeholder="您的電子郵件"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">密碼</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="beauty-input w-full pl-10 pr-10"
                    placeholder="設定密碼"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-beauty-muted"
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">確認密碼</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="beauty-input w-full pl-10 pr-10"
                    placeholder="再次輸入密碼"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-beauty-muted"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 mt-1 text-beauty-primary rounded border-gray-300 focus:ring-beauty-primary"
                  />
                  <label htmlFor="agreeTerms" className="ml-2 text-sm text-beauty-dark">
                    我同意 BeautifyHub 的
                    <a href="#" className="text-beauty-primary hover:underline ml-1">服務條款</a>
                    <span className="mx-1">和</span>
                    <a href="#" className="text-beauty-primary hover:underline">隱私政策</a>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className={`beauty-button bg-beauty-primary hover:bg-beauty-primary/90 w-full flex items-center justify-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    註冊中...
                  </>
                ) : (
                  '註冊'
                )}
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-beauty-muted text-sm">
                已有帳戶？{' '}
                <Link to="/login" className="text-beauty-primary hover:underline">
                  立即登入
                </Link>
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-center text-sm text-beauty-muted mb-4">或使用以下方式註冊</p>
              <div className="flex gap-4">
                <button className="flex-1 py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
