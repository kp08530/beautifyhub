
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const FAQ = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="beauty-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">常見問答</h1>
            <p className="text-beauty-muted text-lg">我們整理了最常見的問題，希望能幫助您更好地了解我們的服務</p>
          </div>
          
          <div className="mb-12">
            <NavigationMenu className="justify-center">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>一般問題</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {generalItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>預約相關</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {appointmentItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>商家問題</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {businessItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">一般問題</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>什麼是BeautifyHub?</AccordionTrigger>
                  <AccordionContent>
                    BeautifyHub是一個專為美容業設計的預約和管理平台。我們提供完整的預約系統、客戶管理、行銷工具等功能，幫助美容工作室、髮廊和SPA提高營運效率。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>如何註冊帳號？</AccordionTrigger>
                  <AccordionContent>
                    點擊網站右上角的「註冊」按鈕，填寫您的基本資訊並設置密碼即可完成註冊。您也可以選擇使用Google或Facebook帳號快速註冊。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>BeautifyHub的服務範圍包括哪些？</AccordionTrigger>
                  <AccordionContent>
                    我們的服務範圍包括美髮、美容、美甲、彩妝、SPA等美容相關行業，適合各種規模的美容業者使用。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">預約相關</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4">
                  <AccordionTrigger>如何預約美容服務？</AccordionTrigger>
                  <AccordionContent>
                    您可以瀏覽我們的商家列表，選擇您喜歡的商家後，查看其提供的服務項目，選擇日期和時間進行預約。預約成功後，您會收到確認信。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>可以修改或取消預約嗎？</AccordionTrigger>
                  <AccordionContent>
                    可以，您可以在「我的預約」頁面中查看您的所有預約，點擊要修改或取消的預約，按照提示操作即可。請注意，部分商家可能有取消預約的時間限制。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>預約需要付訂金嗎？</AccordionTrigger>
                  <AccordionContent>
                    這取決於商家的政策。有些商家可能要求預約時支付訂金，您可以在預約過程中看到相關說明。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">商家問題</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-7">
                  <AccordionTrigger>如何成為BeautifyHub的合作商家？</AccordionTrigger>
                  <AccordionContent>
                    點擊網站上的「商家註冊」按鈕，填寫您的商家資訊並提交審核。我們的團隊會在1-3個工作日內完成審核，審核通過後您就可以開始使用我們的服務了。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>BeautifyHub提供哪些方案？</AccordionTrigger>
                  <AccordionContent>
                    我們提供基礎版、專業版和企業版三種方案，分別適合不同規模的美容業者。基礎版免費，專業版NT$399/月，企業版NT$1299/月。各方案的詳細功能和限制可以在「方案價格」頁面查看。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>如何設置服務項目和價格？</AccordionTrigger>
                  <AccordionContent>
                    登入商家後台後，您可以在「服務管理」中添加、編輯或刪除服務項目，設定價格、時長和描述等資訊。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const generalItems = [
  {
    title: "什麼是BeautifyHub?",
    href: "#item-1",
    description: "了解我們的平台及服務",
  },
  {
    title: "如何註冊帳號？",
    href: "#item-2",
    description: "快速註冊並開始使用",
  },
  {
    title: "服務範圍",
    href: "#item-3",
    description: "我們支援的美容領域",
  },
];

const appointmentItems = [
  {
    title: "預約流程",
    href: "#item-4",
    description: "如何預約美容服務",
  },
  {
    title: "修改及取消",
    href: "#item-5",
    description: "如何修改或取消預約",
  },
  {
    title: "訂金政策",
    href: "#item-6",
    description: "關於預約訂金的說明",
  },
];

const businessItems = [
  {
    title: "商家註冊",
    href: "#item-7",
    description: "成為BeautifyHub合作商家",
  },
  {
    title: "服務方案",
    href: "#item-8",
    description: "各種方案的功能與價格",
  },
  {
    title: "服務設置",
    href: "#item-9",
    description: "如何設置服務項目和價格",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default FAQ;
