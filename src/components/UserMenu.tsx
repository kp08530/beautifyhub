
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Settings, 
  Calendar, 
  Building2, 
  LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { user, logout, isAdmin, isBusiness } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu}
        className="flex items-center justify-center bg-beauty-primary text-white rounded-full w-10 h-10 hover:bg-beauty-primary/90 transition-colors"
      >
        <User size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-beauty-muted truncate">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-2 text-sm text-beauty-dark hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              個人資料
            </Link>
            
            <Link 
              to="/appointments" 
              className="flex items-center px-4 py-2 text-sm text-beauty-dark hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Calendar size={16} className="mr-2" />
              我的預約
            </Link>
            
            {isBusiness && (
              <Link 
                to="/business-profile" 
                className="flex items-center px-4 py-2 text-sm text-beauty-dark hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Building2 size={16} className="mr-2" />
                店家管理
              </Link>
            )}
            
            {isAdmin && (
              <Link 
                to="/dashboard" 
                className="flex items-center px-4 py-2 text-sm text-beauty-dark hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={16} className="mr-2" />
                管理後台
              </Link>
            )}
          </div>
          
          <div className="py-1 border-t">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-beauty-dark hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              登出
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
