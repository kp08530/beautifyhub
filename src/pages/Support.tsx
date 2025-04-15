
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageSquare } from 'lucide-react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>(['getting-started']);
  
  const toggleCategory = (category: string) => {
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter(c => c !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
  };
  
  const faqCategories = [
    {
      id: 'getting-started',
      title: '開始使用',
      faqs: [
        {
          question: '如何建立我的美容店家帳號？',
          answer: '您可以點擊網站頂部的「商家註冊」按鈕，填寫相關資訊並上傳必要文件。我們的團隊將在 1-2 個工作日內審核您的申請，並通過電子郵件通知您結果。'
        },
        {
          question: '我可以同時管理多個美容店鋪嗎？',
          answer: '可以的。在企業方案中，您可以添加和管理多個分店。每個分店都可以有自己的預約行事曆、服務項目和員工安排。'
        },
        {
          question: '如何設置我的服務項目和價格？',
          answer: '登入商家後台後，點擊「服務管理」，然後點擊「添加服務」按鈕。您可以設置服務名稱、描述、價格、時長和所需資源。所有更改都會即時反映在您的預約頁面上。'
        }
      ]
    },
    {
      id: 'appointments',
      title: '預約管理',
      faqs: [
        {
          question: '如何查看和管理客戶預約？',
          answer: '登入商家後台後，點擊「預約管理」或直接查看儀表板上的預約行事曆。您可以查看每日、每週或每月的預約情況，並通過點擊預約來查看詳情或進行修改。'
        },
        {
          question: '客戶如何取消或重新安排預約？',
          answer: '客戶可以通過他們的帳戶或預約確認電子郵件中的連結來取消或重新安排預約。您也可以在商家後台為客戶手動調整預約。'
        },
        {
          question: '如何設置休假時間或特殊營業時間？',
          answer: '在「設置」中的「營業時間」頁面，您可以設置正常營業時間，並添加特殊日期（如假日或休假）。您也可以為特定員工設置休假時間。'
        }
      ]
    },
    {
      id: 'payments',
      title: '支付與帳單',
      faqs: [
        {
          question: '如何設置線上支付？',
          answer: '在「設置」中的「支付方式」頁面，您可以連接您的銀行帳戶或第三方支付平台（如信用卡處理商）。設置完成後，客戶可以在預約時在線支付或支付訂金。'
        },
        {
          question: '我的訂閱計費週期是什麼時候？',
          answer: '訂閱計費週期從您首次註冊的日期開始，每月或每年（取決於您選擇的計費頻率）自動續訂。您可以在「帳單」頁面查看下一次付款日期和歷史交易記錄。'
        },
        {
          question: '如何更改我的訂閱方案？',
          answer: '登入商家後台，進入「帳單」頁面，點擊「更改方案」。您可以隨時升級方案，新的費用將按比例計算。如需降級，變更將在當前計費週期結束時生效。'
        }
      ]
    },
    {
      id: 'technical',
      title: '技術支援',
      faqs: [
        {
          question: '我的網站加載速度很慢，該怎麼辦？',
          answer: '請嘗試清除瀏覽器緩存或使用不同的瀏覽器。如果問題持續存在，請聯繫我們的技術支援團隊，提供您的網站URL和遇到問題的具體頁面。'
        },
        {
          question: '如何將BeautifyHub與我現有的網站整合？',
          answer: '我們提供多種整合選項，包括直接連結、嵌入式預約小工具和API連接。您可以在「設置」中的「網站整合」頁面找到詳細說明和代碼片段。'
        },
        {
          question: '系統支援哪些瀏覽器？',
          answer: 'BeautifyHub支援所有主流現代瀏覽器的最新版本，包括Chrome、Firefox、Safari、Edge和Opera。為獲得最佳體驗，我們建議使用Chrome或Firefox的最新版本。'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">商家支援中心</h1>
          <p className="text-beauty-muted text-lg max-w-2xl mx-auto">
            我們隨時準備協助您使用BeautifyHub發展您的美容事業。
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={20} />
            <Input
              type="text"
              placeholder="搜尋常見問題..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
        
        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <Mail className="mx-auto mb-4 text-beauty-primary" size={32} />
            <h3 className="text-xl font-bold mb-2">電子郵件支援</h3>
            <p className="text-beauty-muted mb-4">有任何問題隨時寫信給我們，我們將在24小時內回覆。</p>
            <a href="mailto:support@beautifyhub.com" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 inline-block">
              發送郵件
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <Phone className="mx-auto mb-4 text-beauty-primary" size={32} />
            <h3 className="text-xl font-bold mb-2">電話支援</h3>
            <p className="text-beauty-muted mb-4">工作日上午9點至下午6點，我們的專家隨時為您解答。</p>
            <a href="tel:+886212345678" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 inline-block">
              02-1234-5678
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <MessageSquare className="mx-auto mb-4 text-beauty-primary" size={32} />
            <h3 className="text-xl font-bold mb-2">即時聊天</h3>
            <p className="text-beauty-muted mb-4">登入商家後台後，使用右下角的聊天圖標立即獲得幫助。</p>
            <Link to="/business-profile" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90 inline-block">
              前往後台
            </Link>
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">常見問題</h2>
          
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((category) => (
                <div key={category.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-100 focus:outline-none"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <h3 className="text-lg font-bold">{category.title}</h3>
                    {openCategories.includes(category.id) ? 
                      <ChevronUp size={20} /> : 
                      <ChevronDown size={20} />
                    }
                  </button>
                  
                  {openCategories.includes(category.id) && (
                    <div className="p-6 space-y-6">
                      {category.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                          <h4 className="font-bold mb-2">{faq.question}</h4>
                          <p className="text-beauty-muted">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <p className="text-beauty-muted mb-4">沒有找到與「{searchQuery}」相關的問題</p>
              <Button 
                onClick={() => setSearchQuery('')}
                variant="outline"
              >
                清除搜尋
              </Button>
            </div>
          )}
        </div>
        
        {/* Contact Form CTA */}
        <div className="max-w-2xl mx-auto mt-16 text-center bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">找不到您需要的答案？</h2>
          <p className="text-beauty-muted mb-6">
            如果您有任何其他問題或需要個人化協助，請不要猶豫，直接與我們聯繫。
          </p>
          <Link to="/contact">
            <Button className="bg-beauty-primary hover:bg-beauty-primary/90">
              聯絡我們
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
