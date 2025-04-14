
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-beauty-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">BeautifyHub</h3>
            <p className="text-gray-300 mb-4">
              連接美容商家與顧客的專業平台，讓預約服務變得簡單高效。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-beauty-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-beauty-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-beauty-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">快速鏈接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">首頁</Link>
              </li>
              <li>
                <Link to="/businesses" className="text-gray-300 hover:text-white transition-colors">美容店家</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">服務項目</Link>
              </li>
              <li>
                <Link to="/portfolios" className="text-gray-300 hover:text-white transition-colors">作品集</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">登入</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">註冊</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">商家服務</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/business-signup" className="text-gray-300 hover:text-white transition-colors">商家註冊</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">商家後台</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">服務價格</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white transition-colors">商家支援</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">聯絡我們</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-beauty-primary" />
                <span className="text-gray-300">台北市信義區松高路100號</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-beauty-primary" />
                <span className="text-gray-300">02-1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-beauty-primary" />
                <span className="text-gray-300">contact@beautifyhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BeautifyHub. 版權所有。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
