
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  ShieldCheck, 
  Users, 
  Store, 
  Settings, 
  Calendar, 
  ImageIcon, 
  BellRing, 
  LineChart, 
  FileText, 
  Database 
} from "lucide-react";

type PermissionCategory = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
};

type Permission = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

const Permissions = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [showAddBusinessAdminDialog, setShowAddBusinessAdminDialog] = useState(false);
  
  // Mock data for admin permissions
  const [adminPermissionCategories, setAdminPermissionCategories] = useState<PermissionCategory[]>([
    {
      id: "users",
      name: "用戶管理",
      description: "用戶資料、審核與管理",
      permissions: [
        { id: "users.view", name: "查看用戶", description: "查看平台用戶資料", enabled: true },
        { id: "users.create", name: "新增用戶", description: "新增平台用戶", enabled: true },
        { id: "users.edit", name: "編輯用戶", description: "編輯平台用戶資料", enabled: true },
        { id: "users.delete", name: "刪除用戶", description: "刪除平台用戶", enabled: false },
      ]
    },
    {
      id: "businesses",
      name: "商家管理",
      description: "商家審核與管理",
      permissions: [
        { id: "businesses.view", name: "查看商家", description: "查看商家資料", enabled: true },
        { id: "businesses.approve", name: "審核商家", description: "審核商家申請", enabled: true },
        { id: "businesses.edit", name: "編輯商家", description: "編輯商家資料", enabled: true },
        { id: "businesses.delete", name: "刪除商家", description: "刪除商家", enabled: false },
      ]
    },
    {
      id: "appointments",
      name: "預約管理",
      description: "預約查看與管理",
      permissions: [
        { id: "appointments.view", name: "查看預約", description: "查看預約記錄", enabled: true },
        { id: "appointments.manage", name: "管理預約", description: "修改預約狀態", enabled: true },
      ]
    },
    {
      id: "advertisements",
      name: "廣告管理",
      description: "廣告審核與管理",
      permissions: [
        { id: "ads.view", name: "查看廣告", description: "查看廣告資料", enabled: true },
        { id: "ads.approve", name: "審核廣告", description: "審核廣告申請", enabled: true },
        { id: "ads.edit", name: "編輯廣告", description: "編輯廣告資料", enabled: true },
        { id: "ads.delete", name: "刪除廣告", description: "刪除廣告", enabled: false },
      ]
    },
    {
      id: "notifications",
      name: "通知管理",
      description: "系統通知管理",
      permissions: [
        { id: "notifications.view", name: "查看通知", description: "查看系統通知", enabled: true },
        { id: "notifications.send", name: "發送通知", description: "發送系統通知", enabled: true },
      ]
    },
    {
      id: "reports",
      name: "報表分析",
      description: "系統報表與數據分析",
      permissions: [
        { id: "reports.view", name: "查看報表", description: "查看系統報表", enabled: true },
        { id: "reports.export", name: "匯出報表", description: "匯出系統報表", enabled: true },
      ]
    },
    {
      id: "system",
      name: "系統管理",
      description: "系統設定與管理",
      permissions: [
        { id: "system.settings", name: "系統設定", description: "修改系統設定", enabled: false },
        { id: "system.database", name: "數據管理", description: "數據庫管理", enabled: false },
        { id: "system.logs", name: "系統日誌", description: "查看系統日誌", enabled: true },
        { id: "system.permissions", name: "權限管理", description: "管理系統權限", enabled: false },
      ]
    },
  ]);
  
  // Mock data for business admin permissions
  const [businessPermissionCategories, setBusinessPermissionCategories] = useState<PermissionCategory[]>([
    {
      id: "business_profile",
      name: "店家資料",
      description: "店家基本資料管理",
      permissions: [
        { id: "profile.view", name: "查看店家資料", description: "查看店家基本資料", enabled: true },
        { id: "profile.edit", name: "編輯店家資料", description: "編輯店家基本資料", enabled: true },
      ]
    },
    {
      id: "services",
      name: "服務管理",
      description: "服務項目管理",
      permissions: [
        { id: "services.view", name: "查看服務", description: "查看服務項目", enabled: true },
        { id: "services.create", name: "新增服務", description: "新增服務項目", enabled: true },
        { id: "services.edit", name: "編輯服務", description: "編輯服務項目", enabled: true },
        { id: "services.delete", name: "刪除服務", description: "刪除服務項目", enabled: false },
      ]
    },
    {
      id: "business_appointments",
      name: "預約管理",
      description: "顧客預約管理",
      permissions: [
        { id: "b_appointments.view", name: "查看預約", description: "查看顧客預約", enabled: true },
        { id: "b_appointments.manage", name: "管理預約", description: "處理顧客預約", enabled: true },
      ]
    },
    {
      id: "staff",
      name: "人員管理",
      description: "店家員工管理",
      permissions: [
        { id: "staff.view", name: "查看員工", description: "查看店家員工", enabled: true },
        { id: "staff.create", name: "新增員工", description: "新增店家員工", enabled: true },
        { id: "staff.edit", name: "編輯員工", description: "編輯員工資料", enabled: true },
        { id: "staff.delete", name: "刪除員工", description: "刪除店家員工", enabled: false },
      ]
    },
    {
      id: "portfolio",
      name: "作品集管理",
      description: "店家作品集管理",
      permissions: [
        { id: "portfolio.view", name: "查看作品集", description: "查看店家作品集", enabled: true },
        { id: "portfolio.create", name: "新增作品", description: "新增作品集項目", enabled: true },
        { id: "portfolio.edit", name: "編輯作品", description: "編輯作品集項目", enabled: true },
        { id: "portfolio.delete", name: "刪除作品", description: "刪除作品集項目", enabled: false },
      ]
    },
    {
      id: "business_ads",
      name: "廣告管理",
      description: "店家廣告管理",
      permissions: [
        { id: "b_ads.view", name: "查看廣告", description: "查看店家廣告", enabled: true },
        { id: "b_ads.create", name: "新增廣告", description: "新增店家廣告", enabled: true },
        { id: "b_ads.edit", name: "編輯廣告", description: "編輯店家廣告", enabled: true },
      ]
    },
    {
      id: "business_reports",
      name: "報表分析",
      description: "店家數據分析",
      permissions: [
        { id: "b_reports.view", name: "查看報表", description: "查看店家報表", enabled: true },
        { id: "b_reports.export", name: "匯出報表", description: "匯出店家報表", enabled: true },
      ]
    },
  ]);
  
  // Mock data for admins
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      name: "系統管理員", 
      email: "admin@beautifyhub.com", 
      role: "super", 
      lastActive: "今天 14:25",
      status: "active"
    },
    { 
      id: 2, 
      name: "李小華", 
      email: "lee@beautifyhub.com", 
      role: "normal", 
      lastActive: "昨天 10:15",
      status: "active"
    },
    { 
      id: 3, 
      name: "張小明", 
      email: "zhang@beautifyhub.com", 
      role: "normal", 
      lastActive: "3天前",
      status: "active"
    },
  ]);
  
  // Mock data for business admins
  const [businessAdmins, setBusinessAdmins] = useState([
    { 
      id: 1, 
      name: "王經理", 
      business: "美麗髮廊",
      email: "wang@example.com", 
      role: "super", 
      lastActive: "今天 09:30",
      status: "active"
    },
    { 
      id: 2, 
      name: "林店長", 
      business: "時尚美甲",
      email: "lin@example.com", 
      role: "super", 
      lastActive: "昨天 16:45",
      status: "active"
    },
    { 
      id: 3, 
      name: "陳小姐", 
      business: "專業SPA中心",
      email: "chen@example.com", 
      role: "normal", 
      lastActive: "3天前",
      status: "active"
    },
    { 
      id: 4, 
      name: "黃先生", 
      business: "自然美容",
      email: "huang@example.com", 
      role: "normal", 
      lastActive: "上週",
      status: "inactive"
    },
  ]);
  
  const togglePermission = (categoryId: string, permissionId: string) => {
    if (activeTab === "admin") {
      setAdminPermissionCategories(prev => prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            permissions: category.permissions.map(permission => {
              if (permission.id === permissionId) {
                return { ...permission, enabled: !permission.enabled };
              }
              return permission;
            })
          };
        }
        return category;
      }));
    } else {
      setBusinessPermissionCategories(prev => prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            permissions: category.permissions.map(permission => {
              if (permission.id === permissionId) {
                return { ...permission, enabled: !permission.enabled };
              }
              return permission;
            })
          };
        }
        return category;
      }));
    }
  };
  
  const filterCategories = (categories: PermissionCategory[]) => {
    if (!searchTerm) return categories;
    
    return categories.map(category => {
      const filteredPermissions = category.permissions.filter(permission => 
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return {
        ...category,
        permissions: filteredPermissions
      };
    }).filter(category => category.permissions.length > 0);
  };
  
  const handleSavePermissions = () => {
    toast({
      title: "權限已更新",
      description: "所有權限設定已成功儲存",
    });
  };
  
  const handleAddAdmin = () => {
    setShowAddAdminDialog(false);
    toast({
      title: "管理員已新增",
      description: "已成功新增系統管理員",
    });
  };
  
  const handleAddBusinessAdmin = () => {
    setShowAddBusinessAdminDialog(false);
    toast({
      title: "商家管理員已新增",
      description: "已成功新增商家管理員",
    });
  };
  
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "users": return <Users className="h-5 w-5" />;
      case "businesses": return <Store className="h-5 w-5" />;
      case "appointments":
      case "business_appointments": return <Calendar className="h-5 w-5" />;
      case "advertisements":
      case "business_ads": return <ImageIcon className="h-5 w-5" />;
      case "notifications": return <BellRing className="h-5 w-5" />;
      case "reports":
      case "business_reports": return <LineChart className="h-5 w-5" />;
      case "system": return <Settings className="h-5 w-5" />;
      case "business_profile": return <Store className="h-5 w-5" />;
      case "services": return <FileText className="h-5 w-5" />;
      case "staff": return <Users className="h-5 w-5" />;
      case "portfolio": return <Database className="h-5 w-5" />;
      default: return <ShieldCheck className="h-5 w-5" />;
    }
  };
  
  const filteredAdminCategories = filterCategories(adminPermissionCategories);
  const filteredBusinessCategories = filterCategories(businessPermissionCategories);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">權限管理</h1>
            <p className="text-beauty-muted">管理系統和商家管理員權限</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋權限..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === "admin" ? (
              <Button onClick={() => setShowAddAdminDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                新增系統管理員
              </Button>
            ) : (
              <Button onClick={() => setShowAddBusinessAdminDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                新增商家管理員
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="admin">系統管理員權限</TabsTrigger>
            <TabsTrigger value="business">商家管理員權限</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {admins.map(admin => (
                <Card key={admin.id} className={admin.status === "inactive" ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{admin.name}</CardTitle>
                        <CardDescription>{admin.email}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded ${admin.role === "super" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                          {admin.role === "super" ? "最高管理員" : "一般管理員"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-beauty-muted">上次活動: {admin.lastActive}</span>
                      <span className={`${admin.status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {admin.status === "active" ? "活躍" : "停用"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>一般管理員權限設定</CardTitle>
                <CardDescription>設定一般系統管理員可使用的功能權限</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {filteredAdminCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.id)}
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-beauty-muted">{category.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between space-x-2 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <Label htmlFor={permission.id}>{permission.name}</Label>
                            <p className="text-sm text-beauty-muted">
                              {permission.description}
                            </p>
                          </div>
                          <Switch
                            id={permission.id}
                            checked={permission.enabled}
                            onCheckedChange={() => togglePermission(category.id, permission.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {filteredAdminCategories.length === 0 && (
                  <div className="py-8 text-center text-beauty-muted">
                    <p>沒有找到符合搜尋條件的權限</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={handleSavePermissions}>儲存權限設定</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {businessAdmins.map(admin => (
                <Card key={admin.id} className={admin.status === "inactive" ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{admin.name}</CardTitle>
                        <CardDescription>{admin.email}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded ${admin.role === "super" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                          {admin.role === "super" ? "最高管理員" : "一般管理員"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">{admin.business}</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-beauty-muted">上次活動: {admin.lastActive}</span>
                        <span className={`${admin.status === "active" ? "text-green-600" : "text-red-600"}`}>
                          {admin.status === "active" ? "活躍" : "停用"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>一般商家管理員權限設定</CardTitle>
                <CardDescription>設定一般商家管理員可使用的功能權限</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {filteredBusinessCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.id)}
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-beauty-muted">{category.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between space-x-2 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <Label htmlFor={permission.id}>{permission.name}</Label>
                            <p className="text-sm text-beauty-muted">
                              {permission.description}
                            </p>
                          </div>
                          <Switch
                            id={permission.id}
                            checked={permission.enabled}
                            onCheckedChange={() => togglePermission(category.id, permission.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {filteredBusinessCategories.length === 0 && (
                  <div className="py-8 text-center text-beauty-muted">
                    <p>沒有找到符合搜尋條件的權限</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={handleSavePermissions}>儲存權限設定</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add System Admin Dialog */}
      <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增系統管理員</DialogTitle>
            <DialogDescription>
              新增一個系統管理員帳號，並設定其權限等級。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                姓名
              </Label>
              <Input id="name" placeholder="請輸入管理員姓名" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                電子郵件
              </Label>
              <Input id="email" placeholder="請輸入電子郵件" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                權限等級
              </Label>
              <Select defaultValue="normal">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="選擇權限等級" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super">最高管理員</SelectItem>
                  <SelectItem value="normal">一般管理員</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAdminDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddAdmin}>確認新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Business Admin Dialog */}
      <Dialog open={showAddBusinessAdminDialog} onOpenChange={setShowAddBusinessAdminDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增商家管理員</DialogTitle>
            <DialogDescription>
              為指定商家新增一個管理員帳號，並設定其權限等級。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="business" className="text-right">
                商家
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="選擇商家" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">美麗髮廊</SelectItem>
                  <SelectItem value="2">時尚美甲</SelectItem>
                  <SelectItem value="3">專業SPA中心</SelectItem>
                  <SelectItem value="4">自然美容</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                姓名
              </Label>
              <Input id="name" placeholder="請輸入管理員姓名" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                電子郵件
              </Label>
              <Input id="email" placeholder="請輸入電子郵件" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                權限等級
              </Label>
              <Select defaultValue="normal">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="選擇權限等級" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super">最高管理員</SelectItem>
                  <SelectItem value="normal">一般管理員</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBusinessAdminDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddBusinessAdmin}>確認新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Permissions;
