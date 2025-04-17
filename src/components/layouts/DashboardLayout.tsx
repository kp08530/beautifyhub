
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Calendar,
  LogOut,
  Store,
  LineChart,
  BellRing,
  HelpCircle,
  Mail,
  ImageIcon,
  Home,
  Search,
  ChevronDown,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<"admin" | "business">("admin");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "新商家申請", message: "有3家新商家等待審核", time: "10分鐘前", read: false },
    { id: 2, title: "新廣告申請", message: "有5個新廣告等待審核", time: "30分鐘前", read: false },
    { id: 3, title: "系統更新", message: "系統將於今晚10點進行維護", time: "1小時前", read: true },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, sender: "美麗髮廊", message: "請問如何更新商家資訊？", time: "15分鐘前", read: false },
    { id: 2, sender: "時尚美甲", message: "我們的廣告申請審核進度如何？", time: "2小時前", read: false },
    { id: 3, sender: "系統通知", message: "歡迎使用BeautifyHub管理系統", time: "1天前", read: true },
  ]);

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Dummy businesses for the role dropdown
  const businesses = [
    { id: 1, name: "美麗髮廊" },
    { id: 2, name: "時尚美甲" },
    { id: 3, name: "專業SPA中心" },
    { id: 4, name: "自然美容" },
    { id: 5, name: "精緻美容中心" },
  ];

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleBusinessSelect = (businessId: number, businessName: string) => {
    setSelectedBusiness(businessName);
    setCurrentRole("business");
    setShowDropdown(false);
    setSearchTerm("");
    
    toast({
      title: "角色切換",
      description: `已切換為商家 ${businessName} 的管理員視角`,
    });
  };

  const switchToAdminRole = () => {
    setSelectedBusiness(null);
    setCurrentRole("admin");
    
    toast({
      title: "角色切換",
      description: "已切換為系統管理員視角",
    });
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: "所有通知已標記為已讀",
    });
  };

  const handleMessageClick = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const markAllMessagesAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
    toast({
      title: "所有訊息已標記為已讀",
    });
  };

  const handleHelpClick = () => {
    toast({
      title: "幫助中心",
      description: "系統幫助文檔已打開，您可以在這裡找到使用指南和常見問題解答。",
    });
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center text-white font-bold">B</div>
                <h2 className="text-lg font-bold">BeautifyHub</h2>
              </div>
              <Button variant="ghost" size="icon" asChild className="ml-2" title="返回首頁">
                <Link to="/">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                {currentRole === "admin" 
                  ? "系統管理" 
                  : `${selectedBusiness} 管理`}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                      <Link to="/dashboard">
                        <LayoutDashboard />
                        <span>總覽</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {currentRole === "admin" && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
                          <Link to="/dashboard/users">
                            <Users />
                            <span>用戶管理</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/businesses")}>
                          <Link to="/dashboard/businesses">
                            <Store />
                            <span>商家管理</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/appointments")}>
                      <Link to="/dashboard/appointments">
                        <Calendar />
                        <span>預約管理</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/advertisements")}>
                      <Link to="/dashboard/advertisements">
                        <ImageIcon />
                        <span>廣告管理</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {currentRole === "admin" && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/notifications")}>
                          <Link to="/dashboard/notifications">
                            <BellRing />
                            <span>通知管理</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/reports")}>
                          <Link to="/dashboard/reports">
                            <LineChart />
                            <span>報表分析</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>系統</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                      <Link to="/dashboard/settings">
                        <Settings />
                        <span>設定</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>管</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">管理員</p>
                  <p className="text-xs text-beauty-muted">admin@beautifyhub.com</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                登出
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <SidebarTrigger />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
                    <DropdownMenuTrigger asChild>
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={currentRole === "admin" 
                            ? "目前角色：系統管理員" 
                            : `目前角色：${selectedBusiness} 管理員`}
                          className="pl-8 pr-8"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onClick={() => setShowDropdown(true)}
                        />
                        <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>選擇管理身份</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={switchToAdminRole}>
                        <Users className="mr-2 h-4 w-4" />
                        系統管理員
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>商家管理員</DropdownMenuLabel>
                      {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map(business => (
                          <DropdownMenuItem 
                            key={business.id}
                            onClick={() => handleBusinessSelect(business.id, business.name)}
                          >
                            <Store className="mr-2 h-4 w-4" />
                            {business.name}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          {searchTerm ? "沒有找到商家" : "輸入商家名稱搜尋"}
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <BellRing className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">通知</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs" 
                        onClick={markAllNotificationsAsRead}
                      >
                        全部標為已讀
                      </Button>
                    </div>
                    <div className="max-h-[300px] overflow-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`mb-2 p-2 rounded cursor-pointer ${notification.read ? '' : 'bg-muted'}`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{notification.title}</span>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm">{notification.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          沒有通知
                        </p>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/dashboard/notifications">
                          查看所有通知
                        </Link>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Messages */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Mail className="h-5 w-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadMessages}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">訊息</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs" 
                        onClick={markAllMessagesAsRead}
                      >
                        全部標為已讀
                      </Button>
                    </div>
                    <div className="max-h-[300px] overflow-auto">
                      {messages.length > 0 ? (
                        messages.map(message => (
                          <div 
                            key={message.id}
                            className={`mb-2 p-2 rounded cursor-pointer ${message.read ? '' : 'bg-muted'}`}
                            onClick={() => handleMessageClick(message.id)}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          沒有訊息
                        </p>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/messages">
                          查看所有訊息
                        </Link>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Help */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-2">
                      <h3 className="font-medium">幫助中心</h3>
                      <div className="space-y-1">
                        <div className="p-2 rounded hover:bg-muted cursor-pointer">
                          <div className="flex items-center">
                            <Info className="h-4 w-4 mr-2" />
                            <span className="font-medium">使用指南</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            學習如何有效使用管理系統
                          </p>
                        </div>
                        <div className="p-2 rounded hover:bg-muted cursor-pointer">
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            <span className="font-medium">常見問題</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            查看常見問題解答
                          </p>
                        </div>
                        <div className="p-2 rounded hover:bg-muted cursor-pointer">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span className="font-medium">聯繫支援</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            發送郵件給技術支援團隊
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 text-center">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          前往幫助中心
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
