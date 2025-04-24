import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Search, Bookmark, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user } = useAuth(); // 獲取使用者資訊
  const navigate = useNavigate();

  // 判斷是否為一般使用者
  const isGeneralUser = user?.role === "一般使用者";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-beauty-primary font-bold text-2xl font-serif">BeautifyHub</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-beauty-dark hover:text-beauty-primary transition-colors">首頁</Link>
            <Link to="/businesses" className="text-beauty-dark hover:text-beauty-primary transition-colors">美容店家</Link>
            <Link to="/services" className="text-beauty-dark hover:text-beauty-primary transition-colors">服務項目</Link>
            <Link to="/portfolios" className="text-beauty-dark hover:text-beauty-primary transition-colors">作品集</Link>
            {isAuthenticated && !isGeneralUser && (
              <Link to="/pricing" className="text-beauty-dark hover:text-beauty-primary transition-colors">服務價格</Link>
            )}
            <Link to="/faq" className="text-beauty-dark hover:text-beauty-primary transition-colors">常見問答</Link>
            {isAuthenticated && !isGeneralUser && (
              <Link to="/support" className="text-beauty-dark hover:text-beauty-primary transition-colors">商家支援</Link>
            )}
          </nav>
          
          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch} 
              className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            {isAuthenticated && (
              <>
                <Link to="/appointments" className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors">
                  <Calendar size={20} />
                </Link>
                <Link to="/my-collections" className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors">
                  <Bookmark size={20} />
                </Link>
                <Link to="/messages" className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors">
                  <MessageCircle size={20} />
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/login" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
                登入
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleSearch} 
              className="p-2 text-beauty-dark mr-2"
            >
              <Search size={20} />
            </button>
            <button onClick={toggleMenu} className="p-2 text-beauty-dark">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 border-t border-gray-100 animate-fade-in">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="搜尋美容店家或服務..."
                className="flex-1 beauty-input pl-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="beauty-button bg-beauty-primary ml-2"
              >
                搜尋
              </button>
            </form>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link to="/" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>首頁</Link>
              <Link to="/businesses" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>美容店家</Link>
              <Link to="/services" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>服務項目</Link>
              <Link to="/portfolios" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>作品集</Link>
              {isAuthenticated && !isGeneralUser && (
                <Link to="/pricing" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>服務價格</Link>
              )}
              <Link to="/faq" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>常見問答</Link>
              {isAuthenticated && !isGeneralUser && (
                <Link to="/support" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>商家支援</Link>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/appointments" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>我的預約</Link>
                  <Link to="/my-collections" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>我的集錦</Link>
                  <Link to="/messages" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>訊息中心</Link>
                </>
              )}
            </nav>
            <div className="flex items-center space-x-4 px-4 pb-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link to="/login" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex-1 text-center" onClick={toggleMenu}>
                  登入
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
