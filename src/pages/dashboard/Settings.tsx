
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">系統設定</h1>
          <p className="text-beauty-muted">管理系統設定和偏好</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="general">一般設定</TabsTrigger>
            <TabsTrigger value="notifications">通知設定</TabsTrigger>
            <TabsTrigger value="security">安全設定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>網站設定</CardTitle>
                <CardDescription>
                  管理網站基本設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-name">網站名稱</Label>
                  <Input id="site-name" defaultValue="BeautifyHub" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="site-description">網站描述</Label>
                  <Input id="site-description" defaultValue="為愛美的人提供最便捷的美容美髮預約平台" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">聯絡郵箱</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@beautifyhub.com" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">維護模式</Label>
                </div>
                <Button className="mt-2">
                  <Save className="mr-2 h-4 w-4" />
                  保存設定
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>商家設定</CardTitle>
                <CardDescription>
                  設定商家註冊和審核流程
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="auto-approve" />
                  <Label htmlFor="auto-approve">自動審核商家註冊</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="require-verification" defaultChecked />
                  <Label htmlFor="require-verification">需要身份驗證</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="allow-portfolio" defaultChecked />
                  <Label htmlFor="allow-portfolio">允許上傳作品集</Label>
                </div>
                <Button className="mt-2">
                  <Save className="mr-2 h-4 w-4" />
                  保存設定
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>電子郵件通知</CardTitle>
                <CardDescription>
                  設定系統發送的電子郵件通知
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="new-user-email" defaultChecked />
                  <Label htmlFor="new-user-email">新用戶註冊通知</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="new-business-email" defaultChecked />
                  <Label htmlFor="new-business-email">新商家註冊通知</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="new-appointment-email" defaultChecked />
                  <Label htmlFor="new-appointment-email">新預約通知</Label>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="sender-email">發件人郵箱</Label>
                  <Input id="sender-email" type="email" defaultValue="no-reply@beautifyhub.com" />
                </div>
                <Button className="mt-2">
                  <Save className="mr-2 h-4 w-4" />
                  保存設定
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>安全設定</CardTitle>
                <CardDescription>
                  管理系統安全相關設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">啟用雙因素認證</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="force-ssl" defaultChecked />
                  <Label htmlFor="force-ssl">強制使用SSL</Label>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="session-timeout">登入會話超時（分鐘）</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-policy">密碼策略</Label>
                  <select id="password-policy" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="medium">中等（至少8字符，需包含字母與數字）</option>
                    <option value="strong">強（至少10字符，需包含大小寫字母、數字與符號）</option>
                    <option value="custom">自定義</option>
                  </select>
                </div>
                <Button className="mt-2">
                  <Save className="mr-2 h-4 w-4" />
                  保存設定
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
