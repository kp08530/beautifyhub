
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-7xl font-bold text-beauty-primary mb-4">404</h1>
        <p className="text-2xl font-bold mb-6">頁面不存在</p>
        <p className="text-beauty-muted max-w-md mb-8">
          很抱歉，您請求的頁面不存在或已被移除。請檢查網址是否正確，或返回首頁。
        </p>
        <Link to="/" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
          返回首頁
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
