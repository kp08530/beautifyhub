
import { useState } from "react";
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
} from "@/components/ui/dropdown-menu";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Dummy businesses for the search dropdown
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

  const handleBusinessSelect = (businessId: number) => {
    // In a real app, this would navigate to the business management page
    // For now, let's just simulate it by navigating to the businesses page
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/dashboard/businesses`);
  };

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
              <Button variant="ghost" size="icon" asChild className="ml-2">
                <Link to="/" title="返回首頁">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>主要功能</SidebarGroupLabel>
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
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/reports")}>
                      <Link to="/dashboard/reports">
                        <LineChart />
                        <span>報表分析</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
                          placeholder="搜尋商家..."
                          className="pl-8 pr-8"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onClick={() => setShowDropdown(true)}
                        />
                        <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map(business => (
                          <DropdownMenuItem 
                            key={business.id}
                            onClick={() => handleBusinessSelect(business.id)}
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
                <Button variant="ghost" size="icon">
                  <BellRing className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
