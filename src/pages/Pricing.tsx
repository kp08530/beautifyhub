
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">服務方案與價格</h1>
            <p className="text-beauty-muted text-lg">選擇最適合您的方案</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">基礎版</h3>
                <div className="text-3xl font-bold mb-2">
                  NT$0<span className="text-sm font-normal text-beauty-muted">/月</span>
                </div>
                <p className="text-beauty-muted">適合小型美容工作室</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  基本預約管理
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  最多5位員工
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  基本客戶管理
                </li>
              </ul>
              
              <Button className="w-full">免費開始使用</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-beauty-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-beauty-primary text-white px-4 py-1 rounded-full text-sm">最受歡迎</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">專業版</h3>
                <div className="text-3xl font-bold mb-2">
                  NT$1,299<span className="text-sm font-normal text-beauty-muted">/月</span>
                </div>
                <p className="text-beauty-muted">適合中型美容沙龍</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  進階預約管理
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  無限員工數量
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  進階客戶管理
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  客戶關係管理
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  數據分析報表
                </li>
              </ul>
              
              <Button className="w-full bg-beauty-primary">立即升級</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">企業版</h3>
                <div className="text-3xl font-bold mb-2">
                  客製方案
                </div>
                <p className="text-beauty-muted">適合連鎖美容集團</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  所有專業版功能
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  多分店管理
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  客製化需求
                </li>
                <li className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  專屬客服支援
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">聯絡我們</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
