
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Calendar, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          </nav>
          
          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/appointments" className="text-beauty-dark hover:text-beauty-primary p-2 rounded-full transition-colors">
              <Calendar size={20} />
            </Link>
            <Link to="/login" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
              <User size={18} className="mr-2 inline" />
              登入
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 text-beauty-dark">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link to="/" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>首頁</Link>
              <Link to="/businesses" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>美容店家</Link>
              <Link to="/services" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>服務項目</Link>
              <Link to="/portfolios" className="px-4 py-2 text-beauty-dark hover:bg-gray-50 rounded-md" onClick={toggleMenu}>作品集</Link>
            </nav>
            <div className="flex items-center space-x-4 px-4 pb-4">
              <Link to="/search" className="text-beauty-dark p-2 rounded-full" onClick={toggleMenu}>
                <Search size={20} />
              </Link>
              <Link to="/appointments" className="text-beauty-dark p-2 rounded-full" onClick={toggleMenu}>
                <Calendar size={20} />
              </Link>
              <Link to="/login" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 flex-1 text-center" onClick={toggleMenu}>
                <User size={18} className="mr-2 inline" />
                登入
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
