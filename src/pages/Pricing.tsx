
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

interface PlanFeature {
  text: string;
  includedIn: Array<"基礎版" | "專業版" | "企業版">;
}

const PricingPage = () => {
  const features: PlanFeature[] = [
    { text: "基本預約管理", includedIn: ["基礎版", "專業版", "企業版"] },
    { text: "基本客戶管理", includedIn: ["基礎版", "專業版", "企業版"] },
    { text: "最多5位員工", includedIn: ["基礎版"] },
    { text: "進階預約管理", includedIn: ["專業版", "企業版"] },
    { text: "無限員工數量", includedIn: ["專業版", "企業版"] },
    { text: "進階客戶管理", includedIn: ["專業版", "企業版"] },
    { text: "客戶關係管理", includedIn: ["專業版", "企業版"] },
    { text: "數據分析報表", includedIn: ["專業版", "企業版"] },
    { text: "多分店管理", includedIn: ["企業版"] },
    { text: "客製化需求", includedIn: ["企業版"] },
    { text: "專屬客服支援", includedIn: ["企業版"] },
    { text: "優先技術支援", includedIn: ["專業版", "企業版"] },
    { text: "行銷工具整合", includedIn: ["專業版", "企業版"] },
    { text: "API 存取", includedIn: ["企業版"] },
  ];

  const handlePayment = (plan: string) => {
    // 實際整合中這裡需連接到支付處理邏輯
    alert(`您即將訂閱 ${plan}，將跳轉至支付系統`);
  };

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
            <Card className="border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">基礎版</h3>
                  <div className="text-3xl font-bold mb-2">
                    NT$0<span className="text-sm font-normal text-beauty-muted">/月</span>
                  </div>
                  <p className="text-beauty-muted">適合小型美容工作室</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    feature.includedIn.includes("基礎版") ? (
                      <li key={index} className="flex items-center text-sm">
                        <span className="mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                          <Check className="w-3 h-3 text-green-600" />
                        </span>
                        {feature.text}
                      </li>
                    ) : (
                      <li key={index} className="flex items-center text-sm text-gray-400">
                        <span className="mr-2 flex-shrink-0 w-5 h-5"></span>
                        {feature.text}
                      </li>
                    )
                  ))}
                </ul>
                
                <Button className="w-full" onClick={() => handlePayment("基礎版")}>免費開始使用</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-beauty-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-beauty-primary text-white px-4 py-1 rounded-full text-sm">最受歡迎</span>
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">專業版</h3>
                  <div className="text-3xl font-bold mb-2">
                    NT$399<span className="text-sm font-normal text-beauty-muted">/月</span>
                  </div>
                  <p className="text-beauty-muted">適合中型美容沙龍</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    feature.includedIn.includes("專業版") ? (
                      <li key={index} className="flex items-center text-sm">
                        <span className="mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                          <Check className="w-3 h-3 text-green-600" />
                        </span>
                        {feature.text}
                      </li>
                    ) : (
                      <li key={index} className="flex items-center text-sm text-gray-400">
                        <span className="mr-2 flex-shrink-0 w-5 h-5"></span>
                        {feature.text}
                      </li>
                    )
                  ))}
                </ul>
                
                <Button className="w-full bg-beauty-primary" onClick={() => handlePayment("專業版")}>立即升級</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">企業版</h3>
                  <div className="text-3xl font-bold mb-2">
                    客製方案
                  </div>
                  <p className="text-beauty-muted">適合連鎖美容集團</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    feature.includedIn.includes("企業版") ? (
                      <li key={index} className="flex items-center text-sm">
                        <span className="mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                          <Check className="w-3 h-3 text-green-600" />
                        </span>
                        {feature.text}
                      </li>
                    ) : (
                      <li key={index} className="flex items-center text-sm text-gray-400">
                        <span className="mr-2 flex-shrink-0 w-5 h-5"></span>
                        {feature.text}
                      </li>
                    )
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full" onClick={() => handlePayment("企業版")}>聯絡我們</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
