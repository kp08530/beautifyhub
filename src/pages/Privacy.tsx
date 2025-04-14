
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">隱私政策</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="mb-4">BeautifyHub（"我們"，"我們的"）致力於保護您的隱私。本隱私政策解釋了我們如何收集、使用、披露和保護您的個人信息。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. 收集的信息</h2>
            <p className="mb-4">我們可能會收集以下類型的信息：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>個人識別信息：</strong> 如姓名、電子郵件地址、電話號碼、地址</li>
              <li><strong>帳戶信息：</strong> 如密碼和用戶名</li>
              <li><strong>預約信息：</strong> 如預約日期、時間、服務類型</li>
              <li><strong>支付信息：</strong> 如信用卡詳細信息（僅在需要支付時）</li>
              <li><strong>使用數據：</strong> 如您如何使用我們的網站、偏好設置</li>
              <li><strong>設備信息：</strong> 如 IP 地址、瀏覽器類型、操作系統</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. 收集信息的方式</h2>
            <p className="mb-4">我們通過以下方式收集信息：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>當您註冊帳戶時</li>
              <li>當您使用我們的服務時</li>
              <li>當您聯繫我們的客戶服務時</li>
              <li>當您參與我們的調查或促銷活動時</li>
              <li>通過 cookies 和類似技術</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. 信息使用</h2>
            <p className="mb-4">我們使用收集的信息來：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>提供和維護我們的服務</li>
              <li>處理並管理您的預約</li>
              <li>與您溝通，提供更新和支持</li>
              <li>改進我們的服務和用戶體驗</li>
              <li>發送您可能感興趣的促銷信息（您可以選擇退出）</li>
              <li>維護網站安全並防止欺詐</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. 信息共享</h2>
            <p className="mb-4">我們可能會在以下情況下共享您的信息：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>與服務提供商：</strong> 我們將分享必要的信息給您預約的美容服務提供商</li>
              <li><strong>與服務合作夥伴：</strong> 我們可能使用第三方服務提供商幫助我們運營業務，如支付處理</li>
              <li><strong>法律要求：</strong> 如果法律要求或為了保護我們的權利</li>
              <li><strong>企業交易：</strong> 如果我們參與合併、收購或資產出售</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. 數據安全</h2>
            <p className="mb-4">我們實施適當的安全措施，以防止您的個人信息意外遺失、使用或未經授權訪問、更改或披露。儘管如此，互聯網傳輸不能保證100%安全，因此我們不能保證信息的絕對安全。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. 您的權利</h2>
            <p className="mb-4">根據適用的數據保護法，您可能擁有以下權利：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>訪問您的個人數據</li>
              <li>更正不準確的數據</li>
              <li>刪除您的數據</li>
              <li>限制數據處理</li>
              <li>數據可攜性</li>
              <li>反對處理您的數據</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Cookies</h2>
            <p className="mb-4">我們使用 cookies 和類似技術來收集信息並改善您的體驗。您可以通過瀏覽器設置控制 cookies，但禁用 cookies 可能會影響某些功能的使用。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. 兒童隱私</h2>
            <p className="mb-4">我們的服務不面向 16 歲以下的兒童。我們不會故意收集兒童的個人信息。如果您發現我們可能收集了兒童的數據，請立即聯繫我們。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. 政策更新</h2>
            <p className="mb-4">我們可能會不時更新此隱私政策。我們將通過網站上的通知告知您任何重大變更。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. 聯繫我們</h2>
            <p>如果您對我們的隱私政策有任何疑問，請聯繫我們：privacy@beautifyhub.com</p>
          </div>
          
          <div className="text-center">
            <Link to="/" className="beauty-button bg-beauty-primary hover:bg-beauty-primary/90">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
