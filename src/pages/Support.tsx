
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SupportPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">商家支援中心</h1>
            <p className="text-beauty-muted text-lg">我們在這裡協助您解決問題</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>如何開始使用BeautifyHub？</AccordionTrigger>
                  <AccordionContent>
                    註冊帳號後，您可以立即開始使用我們的基本功能。若需要更多進階功能，可以升級至專業版。
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>如何管理預約系統？</AccordionTrigger>
                  <AccordionContent>
                    在後台管理介面中，您可以輕鬆管理所有預約。您可以查看、確認、修改或取消預約，也可以設定自動提醒功能。
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>如何設定營業時間？</AccordionTrigger>
                  <AccordionContent>
                    在店家設定中，您可以自訂每日營業時間，也可以設定特殊節假日的營業情況。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">聯絡我們</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-2">客服信箱</h3>
                  <p className="text-beauty-muted">support@beautifyhub.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">客服電話</h3>
                  <p className="text-beauty-muted">02-1234-5678</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">營業時間</h3>
                  <p className="text-beauty-muted">週一至週五 9:00-18:00</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">緊急支援</h3>
                  <p className="text-beauty-muted">0800-000-000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
