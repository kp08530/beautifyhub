
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const plans = [
    {
      name: "基本方案",
      price: "免費",
      description: "適合小型美容工作室的入門方案",
      features: [
        "基本預約管理",
        "最多 3 個服務項目",
        "基本客戶管理",
        "單一管理員帳號",
        "每月最多 50 筆預約"
      ],
      cta: "立即開始",
      link: "/business-signup",
      highlighted: false
    },
    {
      name: "專業方案",
      price: "NT$ 1,290",
      period: "/月",
      description: "適合成長中的美容沙龍和美髮店",
      features: [
        "進階預約管理",
        "無限服務項目",
        "進階客戶管理與分析",
        "最多 5 個員工帳號",
        "無限預約次數",
        "自訂提醒和通知",
        "線上付款整合",
        "優先客戶服務"
      ],
      cta: "免費試用 14 天",
      link: "/business-signup?plan=pro",
      highlighted: true
    },
    {
      name: "企業方案",
      price: "NT$ 2,990",
      period: "/月",
      description: "適合多分店的美容連鎖企業",
      features: [
        "全功能預約管理",
        "無限服務項目",
        "高級客戶管理與分析",
        "無限員工帳號",
        "無限預約次數",
        "多分店管理",
        "完整 API 整合",
        "專屬客戶經理",
        "客製化報表",
        "優先技術支援"
      ],
      cta: "聯絡銷售團隊",
      link: "/contact?subject=enterprise",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">簡單透明的價格方案</h1>
          <p className="text-beauty-muted text-lg max-w-2xl mx-auto">
            選擇最適合您美容事業需求的方案，隨時可以根據您的業務成長調整。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 ${
                plan.highlighted ? 'border-2 border-beauty-primary relative' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-beauty-primary text-white text-center py-1 text-sm font-medium">
                  最受歡迎方案
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-beauty-muted ml-1">{plan.period}</span>}
                </div>
                <p className="text-beauty-muted mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-beauty-primary mr-2 mt-0.5" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={plan.link}>
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-beauty-primary hover:bg-beauty-primary/90' 
                        : 'bg-white border border-beauty-primary text-beauty-primary hover:bg-beauty-primary/10'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">有任何疑問？</h2>
          <p className="text-beauty-muted mb-6">
            我們的團隊隨時準備協助您選擇最適合您的方案，並回答任何關於我們服務的問題。
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/support">
              <Button variant="outline">瀏覽常見問題</Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-beauty-primary hover:bg-beauty-primary/90">聯絡我們</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
