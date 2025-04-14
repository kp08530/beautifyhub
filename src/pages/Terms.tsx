
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">服務條款</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="mb-4">歡迎使用 BeautifyHub！這些服務條款概述了您與我們之間的協議。請仔細閱讀本條款，因為它們適用於您對我們網站的訪問和使用。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. 接受條款</h2>
            <p className="mb-4">使用我們的服務，表示您同意這些條款。如果您不同意這些條款，請不要使用我們的服務。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. 帳戶註冊</h2>
            <p className="mb-4">在使用我們的某些服務時，您可能需要創建一個帳戶。您負責維護您的帳戶安全，並且您不得向任何第三方透露您的密碼或其他安全信息。您同意您提供的所有註冊信息都是準確、真實和完整的，並且您將及時更新這些信息。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. 使用服務</h2>
            <p className="mb-4">BeautifyHub 提供一個平台，使顧客能夠瀏覽美容服務提供商提供的服務，並進行預約。美容服務提供商可以管理其服務、日程和預約。您同意在使用我們的服務時，不會：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>違反任何適用的法律或法規</li>
              <li>侵犯他人的知識產權</li>
              <li>騷擾、威脅或侮辱其他用戶</li>
              <li>上傳虛假或誤導性內容</li>
              <li>嘗試未經授權訪問任何部分的服務</li>
              <li>使用我們的服務進行任何不當或非法活動</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. 預約和取消</h2>
            <p className="mb-4">顧客透過 BeautifyHub 預約服務時，應遵循以下規則：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>準時赴約或提前通知服務提供商您將遲到</li>
              <li>如果您需要取消預約，請至少提前 24 小時通知</li>
              <li>頻繁的取消或缺席可能會導致使用限制</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. 服務提供商責任</h2>
            <p className="mb-4">美容服務提供商同意：</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>提供準確的服務描述和定價信息</li>
              <li>準時提供所預約的服務</li>
              <li>維持專業服務標準和環境</li>
              <li>遵守所有相關的健康和安全法規</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. 免責聲明</h2>
            <p className="mb-4">BeautifyHub 僅提供連接顧客和美容服務提供商的平台。我們不對任何服務提供商提供的服務質量負責。顧客應當自行判斷服務提供商的適合性。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. 隱私政策</h2>
            <p className="mb-4">我們重視您的隱私。請參閱我們的<Link to="/privacy" className="text-beauty-primary hover:underline">隱私政策</Link>，了解我們如何收集、使用和保護您的個人信息。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. 條款修改</h2>
            <p className="mb-4">我們可能會不時修改這些條款。修改後的條款將在網站上發佈。您繼續使用我們的服務表示您接受修改後的條款。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. 終止服務</h2>
            <p className="mb-4">我們保留在任何時候，因任何原因，未經通知即終止或限制您使用服務的權利。</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. 聯繫我們</h2>
            <p>如果您對這些條款有任何疑問，請聯繫我們：support@beautifyhub.com</p>
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

export default Terms;
