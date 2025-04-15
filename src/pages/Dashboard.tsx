
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  Building2, 
  CalendarDays, 
  MessageSquare, 
  FileText, 
  Settings, 
  BarChart2, 
  Tag, 
  Bell, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  PieChart,
  ArrowUpRight,
  Filter,
  Download,
  UserPlus,
  CheckCircle,
  XCircle,
  Key,
  Mail,
  Clock,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for users
const mockUsers = [
  { id: "1", name: "王小明", email: "wang@example.com", type: "consumer", status: "active", created: "2025-01-15" },
  { id: "2", name: "林美美", email: "lin@example.com", type: "consumer", status: "active", created: "2025-02-10" },
  { id: "3", name: "陳大偉", email: "chen@example.com", type: "consumer", status: "inactive", created: "2025-02-15" },
  { id: "4", name: "美麗世界", email: "beautiful@example.com", type: "business", status: "active", created: "2025-01-05" },
  { id: "5", name: "專業美甲", email: "nails@example.com", type: "business", status: "pending", created: "2025-03-01" },
  { id: "6", name: "時尚髮型", email: "hair@example.com", type: "business", status: "active", created: "2025-02-20" },
  { id: "7", name: "系統管理員", email: "admin@example.com", type: "admin", status: "active", created: "2024-12-01" }
];

// Mock data for businesses
const mockBusinesses = [
  { id: "1", name: "美麗世界", category: "美容", rating: 4.8, services: 12, status: "active" },
  { id: "2", name: "專業美甲", category: "美甲", rating: 4.5, services: 8, status: "active" },
  { id: "3", name: "時尚髮型", category: "美髮", rating: 4.7, services: 15, status: "active" },
  { id: "4", name: "舒適SPA", category: "SPA", rating: 4.9, services: 10, status: "active" },
  { id: "5", name: "美睫專家", category: "美睫", rating: 4.6, services: 6, status: "pending" }
];

// Mock data for bookings
const mockBookings = [
  { id: "1", customer: "王小明", business: "美麗世界", service: "基礎臉部護理", date: "2025-04-20", time: "14:00", status: "confirmed" },
  { id: "2", customer: "林美美", business: "專業美甲", service: "凝膠美甲", date: "2025-04-21", time: "11:30", status: "confirmed" },
  { id: "3", customer: "陳大偉", business: "時尚髮型", service: "男士剪髮", date: "2025-04-19", time: "16:00", status: "completed" },
  { id: "4", customer: "張小華", business: "美麗世界", service: "全臉煥膚", date: "2025-04-22", time: "10:00", status: "cancelled" }
];

// Mock data for reviews
const mockReviews = [
  { id: "1", customer: "王小明", business: "美麗世界", service: "基礎臉部護理", rating: 5, comment: "服務非常好，環境舒適", date: "2025-04-15", status: "approved" },
  { id: "2", customer: "林美美", business: "專業美甲", service: "凝膠美甲", rating: 4, comment: "美甲很漂亮，但時間有點久", date: "2025-04-14", status: "approved" },
  { id: "3", customer: "陳大偉", business: "時尚髮型", service: "男士剪髮", rating: 5, comment: "設計師很專業，很滿意", date: "2025-04-13", status: "pending" },
  { id: "4", customer: "張小華", business: "舒適SPA", service: "全身按摩", rating: 3, comment: "服務一般，價格有點貴", date: "2025-04-12", status: "reported" }
];

// Dashboard component
const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [userFilter, setUserFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: string}>({id: "", type: ""});

  // Filter users based on selected filter
  const filteredUsers = userFilter === "all" 
    ? mockUsers 
    : mockUsers.filter(user => user.type === userFilter);

  // Filter businesses based on selected filter
  const filteredBusinesses = businessFilter === "all" 
    ? mockBusinesses 
    : mockBusinesses.filter(business => business.status === businessFilter);

  // Filter bookings based on selected filter
  const filteredBookings = bookingFilter === "all" 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === bookingFilter);

  // Filter reviews based on selected filter
  const filteredReviews = reviewFilter === "all" 
    ? mockReviews 
    : mockReviews.filter(review => review.status === reviewFilter);

  // Function to handle view action
  const handleView = (id: string, type: string) => {
    toast({
      title: "查看詳情",
      description: `正在查看 ${type} ID: ${id} 的詳細資料`,
    });
  };

  // Function to handle edit action
  const handleEdit = (id: string, type: string) => {
    toast({
      title: "編輯資料",
      description: `正在編輯 ${type} ID: ${id} 的資料`,
    });
  };

  // Function to open delete confirmation dialog
  const handleDeleteConfirm = (id: string, type: string) => {
    setItemToDelete({id, type});
    setShowDeleteDialog(true);
  };

  // Function to handle delete action
  const handleDelete = () => {
    toast({
      title: "刪除成功",
      description: `已刪除 ${itemToDelete.type} ID: ${itemToDelete.id}`,
      variant: "default",
    });
    setShowDeleteDialog(false);
  };

  // Function to handle adding new items
  const handleAdd = (type: string) => {
    toast({
      title: "新增項目",
      description: `正在新增${type}`,
    });
  };

  // Function to handle approving items
  const handleApprove = (id: string, type: string) => {
    toast({
      title: "已核准",
      description: `已核准 ${type} ID: ${id}`,
      variant: "default",
    });
  };

  // Function to handle rejecting items
  const handleReject = (id: string, type: string) => {
    toast({
      title: "已拒絕",
      description: `已拒絕 ${type} ID: ${id}`,
      variant: "destructive",
    });
  };

  // Function to handle reset password
  const handleResetPassword = (id: string, email: string) => {
    toast({
      title: "密碼重設",
      description: `已發送密碼重設信件至 ${email}`,
    });
  };

  // Function to handle exporting data
  const handleExport = (type: string) => {
    toast({
      title: "匯出資料",
      description: `正在匯出${type}資料`,
    });
  };

  // Function to handle account locking/unlocking
  const handleToggleLock = (id: string, status: string, type: string) => {
    const newStatus = status === "active" ? "inactive" : "active";
    toast({
      title: newStatus === "active" ? "帳號已啟用" : "帳號已停用",
      description: `${type} ID: ${id} 狀態已更新`,
      variant: newStatus === "active" ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white shadow-sm h-screen fixed">
          <div className="p-6 border-b">
            <h2 className="font-bold text-2xl text-beauty-primary">管理後台</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "users" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Users size={18} className="mr-3" />
                <span>使用者管理</span>
              </button>
              <button 
                onClick={() => setActiveTab("businesses")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "businesses" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Building2 size={18} className="mr-3" />
                <span>商家管理</span>
              </button>
              <button 
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "bookings" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <CalendarDays size={18} className="mr-3" />
                <span>預約管理</span>
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "reviews" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <MessageSquare size={18} className="mr-3" />
                <span>評價管理</span>
              </button>
              <button 
                onClick={() => setActiveTab("content")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "content" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FileText size={18} className="mr-3" />
                <span>內容管理</span>
              </button>
              <button 
                onClick={() => setActiveTab("system")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "system" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Settings size={18} className="mr-3" />
                <span>系統設定</span>
              </button>
              <button 
                onClick={() => setActiveTab("reports")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "reports" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <BarChart2 size={18} className="mr-3" />
                <span>報表與分析</span>
              </button>
              <button 
                onClick={() => setActiveTab("marketing")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "marketing" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Tag size={18} className="mr-3" />
                <span>行銷與推廣</span>
              </button>
              <button 
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "notifications" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Bell size={18} className="mr-3" />
                <span>通知與提醒</span>
              </button>
              <button 
                onClick={() => setActiveTab("logs")}
                className={`flex items-center w-full p-3 rounded-md text-left ${
                  activeTab === "logs" ? "bg-beauty-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <Activity size={18} className="mr-3" />
                <span>操作日誌</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6">
          {/* Users Management */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">使用者管理</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleAdd("使用者")} className="bg-beauty-primary hover:bg-beauty-primary/90">
                      <UserPlus size={16} className="mr-2" />
                      新增使用者
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>新增使用者</DialogTitle>
                      <DialogDescription>
                        填寫以下資料以新增使用者帳號
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">使用者類型</label>
                        <select className="w-full px-3 py-2 border rounded-md">
                          <option value="consumer">消費者</option>
                          <option value="business">美容業者</option>
                          <option value="admin">管理員</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">姓名</label>
                        <Input placeholder="請輸入姓名" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">電子郵件</label>
                        <Input type="email" placeholder="請輸入電子郵件" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">密碼</label>
                        <Input type="password" placeholder="請輸入密碼" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">取消</Button>
                      </DialogClose>
                      <Button className="bg-beauty-primary hover:bg-beauty-primary/90" onClick={() => {
                        toast({
                          title: "使用者已新增",
                          description: "新使用者帳號已成功建立",
                        });
                      }}>
                        新增
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="consumer">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger 
                        value="consumer" 
                        onClick={() => setUserFilter("consumer")}
                      >
                        消費者
                      </TabsTrigger>
                      <TabsTrigger 
                        value="business" 
                        onClick={() => setUserFilter("business")}
                      >
                        美容業者
                      </TabsTrigger>
                      <TabsTrigger 
                        value="admin" 
                        onClick={() => setUserFilter("admin")}
                      >
                        管理員
                      </TabsTrigger>
                      <TabsTrigger 
                        value="all" 
                        onClick={() => setUserFilter("all")}
                      >
                        全部
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport("使用者")}>
                        <Download size={16} className="mr-2" />
                        匯出
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="搜尋使用者..." 
                          className="pl-9 w-[250px]" 
                        />
                      </div>
                    </div>
                  </div>

                  <TabsContent value="consumer" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>姓名</TableHead>
                            <TableHead>電子郵件</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>註冊日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : user.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {user.status === "active" 
                                    ? "啟用中" 
                                    : user.status === "pending" 
                                    ? "待審核" 
                                    : "已停用"}
                                </span>
                              </TableCell>
                              <TableCell>{user.created}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleView(user.id, "使用者")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEdit(user.id, "使用者")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteConfirm(user.id, "使用者")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleResetPassword(user.id, user.email)}
                                  >
                                    <Key size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleToggleLock(user.id, user.status, "使用者")}
                                  >
                                    {user.status === "active" ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="business" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>商家名稱</TableHead>
                            <TableHead>電子郵件</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>註冊日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : user.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {user.status === "active" 
                                    ? "啟用中" 
                                    : user.status === "pending" 
                                    ? "待審核" 
                                    : "已停用"}
                                </span>
                              </TableCell>
                              <TableCell>{user.created}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleView(user.id, "商家")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEdit(user.id, "商家")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteConfirm(user.id, "商家")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                  {user.status === "pending" && (
                                    <>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleApprove(user.id, "商家申請")}
                                      >
                                        <CheckCircle size={16} className="text-green-600" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleReject(user.id, "商家申請")}
                                      >
                                        <XCircle size={16} className="text-red-600" />
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleResetPassword(user.id, user.email)}
                                  >
                                    <Key size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>管理員名稱</TableHead>
                            <TableHead>電子郵件</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>建立日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {user.status === "active" ? "啟用中" : "已停用"}
                                </span>
                              </TableCell>
                              <TableCell>{user.created}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEdit(user.id, "管理員")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteConfirm(user.id, "管理員")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleResetPassword(user.id, user.email)}
                                  >
                                    <Key size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>名稱</TableHead>
                            <TableHead>電子郵件</TableHead>
                            <TableHead>類型</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>建立日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.type === "consumer" 
                                    ? "bg-blue-100 text-blue-800" 
                                    : user.type === "business" 
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {user.type === "consumer" 
                                    ? "消費者" 
                                    : user.type === "business" 
                                    ? "美容業者"
                                    : "管理員"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : user.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {user.status === "active" 
                                    ? "啟用中" 
                                    : user.status === "pending" 
                                    ? "待審核" 
                                    : "已停用"}
                                </span>
                              </TableCell>
                              <TableCell>{user.created}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleView(user.id, user.type === "consumer" ? "消費者" : user.type === "business" ? "商家" : "管理員")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEdit(user.id, user.type === "consumer" ? "消費者" : user.type === "business" ? "商家" : "管理員")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteConfirm(user.id, user.type === "consumer" ? "消費者" : user.type === "business" ? "商家" : "管理員")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Business Management */}
          {activeTab === "businesses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">商家管理</h1>
                <Button 
                  className="bg-beauty-primary hover:bg-beauty-primary/90"
                  onClick={() => handleAdd("商家")}
                >
                  <Building2 size={16} className="mr-2" />
                  新增商家
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="all">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger 
                        value="all" 
                        onClick={() => setBusinessFilter("all")}
                      >
                        全部商家
                      </TabsTrigger>
                      <TabsTrigger 
                        value="active" 
                        onClick={() => setBusinessFilter("active")}
                      >
                        已啟用
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pending" 
                        onClick={() => setBusinessFilter("pending")}
                      >
                        待審核
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleExport("商家")}
                      >
                        <Download size={16} className="mr-2" />
                        匯出
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="搜尋商家..." 
                          className="pl-9 w-[250px]" 
                        />
                      </div>
                    </div>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>商家名稱</TableHead>
                            <TableHead>類別</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>服務數量</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBusinesses.map(business => (
                            <TableRow key={business.id}>
                              <TableCell>{business.id}</TableCell>
                              <TableCell>{business.name}</TableCell>
                              <TableCell>{business.category}</TableCell>
                              <TableCell>{business.rating}</TableCell>
                              <TableCell>{business.services}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  business.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {business.status === "active" ? "已啟用" : "待審核"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(business.id, "商家")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit(business.id, "商家")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteConfirm(business.id, "商家")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                  {business.status === "pending" && (
                                    <>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleApprove(business.id, "商家")}
                                      >
                                        <CheckCircle size={16} className="text-green-600" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleReject(business.id, "商家")}
                                      >
                                        <XCircle size={16} className="text-red-600" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="active" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>商家名稱</TableHead>
                            <TableHead>類別</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>服務數量</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBusinesses.map(business => (
                            <TableRow key={business.id}>
                              <TableCell>{business.id}</TableCell>
                              <TableCell>{business.name}</TableCell>
                              <TableCell>{business.category}</TableCell>
                              <TableCell>{business.rating}</TableCell>
                              <TableCell>{business.services}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(business.id, "商家")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit(business.id, "商家")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteConfirm(business.id, "商家")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="pending" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>商家名稱</TableHead>
                            <TableHead>類別</TableHead>
                            <TableHead>申請日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBusinesses.map(business => (
                            <TableRow key={business.id}>
                              <TableCell>{business.id}</TableCell>
                              <TableCell>{business.name}</TableCell>
                              <TableCell>{business.category}</TableCell>
                              <TableCell>2025-04-10</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(business.id, "商家申請")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleApprove(business.id, "商家申請")}
                                  >
                                    <CheckCircle size={16} className="text-green-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleReject(business.id, "商家申請")}
                                  >
                                    <XCircle size={16} className="text-red-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Booking Management */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">預約管理</h1>
                <Button 
                  className="bg-beauty-primary hover:bg-beauty-primary/90"
                  onClick={() => handleAdd("預約")}
                >
                  <CalendarDays size={16} className="mr-2" />
                  新增預約
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="all">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger 
                        value="all" 
                        onClick={() => setBookingFilter("all")}
                      >
                        全部預約
                      </TabsTrigger>
                      <TabsTrigger 
                        value="confirmed" 
                        onClick={() => setBookingFilter("confirmed")}
                      >
                        已確認
                      </TabsTrigger>
                      <TabsTrigger 
                        value="completed" 
                        onClick={() => setBookingFilter("completed")}
                      >
                        已完成
                      </TabsTrigger>
                      <TabsTrigger 
                        value="cancelled" 
                        onClick={() => setBookingFilter("cancelled")}
                      >
                        已取消
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleExport("預約")}
                      >
                        <Download size={16} className="mr-2" />
                        匯出
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="搜尋預約..." 
                          className="pl-9 w-[250px]" 
                        />
                      </div>
                    </div>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>預約日期</TableHead>
                            <TableHead>預約時間</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.id}</TableCell>
                              <TableCell>{booking.customer}</TableCell>
                              <TableCell>{booking.business}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date}</TableCell>
                              <TableCell>{booking.time}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === "confirmed" 
                                    ? "bg-green-100 text-green-800" 
                                    : booking.status === "completed" 
                                    ? "bg-blue-100 text-blue-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {booking.status === "confirmed" 
                                    ? "已確認" 
                                    : booking.status === "completed" 
                                    ? "已完成" 
                                    : "已取消"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(booking.id, "預約")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit(booking.id, "預約")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  {booking.status === "confirmed" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          title: "預約已取消",
                                          description: `預約 ID: ${booking.id} 已成功取消`,
                                          variant: "destructive",
                                        });
                                      }}
                                    >
                                      <XCircle size={16} className="text-red-600" />
                                    </Button>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          title: "預約已標記為完成",
                                          description: `預約 ID: ${booking.id} 已標記為完成`,
                                        });
                                      }}
                                    >
                                      <CheckCircle size={16} className="text-green-600" />
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "提醒已發送",
                                        description: `已向客戶發送預約提醒`,
                                      });
                                    }}
                                  >
                                    <Mail size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="confirmed" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>預約日期</TableHead>
                            <TableHead>預約時間</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.id}</TableCell>
                              <TableCell>{booking.customer}</TableCell>
                              <TableCell>{booking.business}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date}</TableCell>
                              <TableCell>{booking.time}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(booking.id, "預約")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "預約已取消",
                                        description: `預約 ID: ${booking.id} 已成功取消`,
                                        variant: "destructive",
                                      });
                                    }}
                                  >
                                    <XCircle size={16} className="text-red-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "預約已標記為完成",
                                        description: `預約 ID: ${booking.id} 已標記為完成`,
                                      });
                                    }}
                                  >
                                    <CheckCircle size={16} className="text-green-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "提醒已發送",
                                        description: `已向客戶發送預約提醒`,
                                      });
                                    }}
                                  >
                                    <Mail size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>預約日期</TableHead>
                            <TableHead>預約時間</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.id}</TableCell>
                              <TableCell>{booking.customer}</TableCell>
                              <TableCell>{booking.business}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date}</TableCell>
                              <TableCell>{booking.time}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(booking.id, "預約")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="cancelled" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>預約日期</TableHead>
                            <TableHead>預約時間</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.id}</TableCell>
                              <TableCell>{booking.customer}</TableCell>
                              <TableCell>{booking.business}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date}</TableCell>
                              <TableCell>{booking.time}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(booking.id, "預約")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "預約已恢復",
                                        description: `預約 ID: ${booking.id} 已恢復為確認狀態`,
                                      });
                                    }}
                                  >
                                    <Clock size={16} className="text-blue-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Review Management */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">評價管理</h1>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleExport("評價")}
                  >
                    <Download size={16} className="mr-2" />
                    匯出評價
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="all">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger 
                        value="all" 
                        onClick={() => setReviewFilter("all")}
                      >
                        全部評價
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pending" 
                        onClick={() => setReviewFilter("pending")}
                      >
                        待審核
                      </TabsTrigger>
                      <TabsTrigger 
                        value="approved" 
                        onClick={() => setReviewFilter("approved")}
                      >
                        已核准
                      </TabsTrigger>
                      <TabsTrigger 
                        value="reported" 
                        onClick={() => setReviewFilter("reported")}
                      >
                        被檢舉
                      </TabsTrigger>
                    </TabsList>

                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="搜尋評價..." 
                        className="pl-9 w-[250px]" 
                      />
                    </div>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>評論</TableHead>
                            <TableHead>日期</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReviews.map(review => (
                            <TableRow key={review.id}>
                              <TableCell>{review.id}</TableCell>
                              <TableCell>{review.customer}</TableCell>
                              <TableCell>{review.business}</TableCell>
                              <TableCell>{review.service}</TableCell>
                              <TableCell>{review.rating}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                              <TableCell>{review.date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  review.status === "approved" 
                                    ? "bg-green-100 text-green-800" 
                                    : review.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {review.status === "approved" 
                                    ? "已核准" 
                                    : review.status === "pending" 
                                    ? "待審核" 
                                    : "被檢舉"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(review.id, "評價")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit(review.id, "評價")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteConfirm(review.id, "評價")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                  {review.status === "pending" && (
                                    <>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleApprove(review.id, "評價")}
                                      >
                                        <CheckCircle size={16} className="text-green-600" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleReject(review.id, "評價")}
                                      >
                                        <XCircle size={16} className="text-red-600" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="pending" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>評論</TableHead>
                            <TableHead>日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReviews.map(review => (
                            <TableRow key={review.id}>
                              <TableCell>{review.id}</TableCell>
                              <TableCell>{review.customer}</TableCell>
                              <TableCell>{review.business}</TableCell>
                              <TableCell>{review.service}</TableCell>
                              <TableCell>{review.rating}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                              <TableCell>{review.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(review.id, "評價")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleApprove(review.id, "評價")}
                                  >
                                    <CheckCircle size={16} className="text-green-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleReject(review.id, "評價")}
                                  >
                                    <XCircle size={16} className="text-red-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="approved" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>評論</TableHead>
                            <TableHead>日期</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReviews.map(review => (
                            <TableRow key={review.id}>
                              <TableCell>{review.id}</TableCell>
                              <TableCell>{review.customer}</TableCell>
                              <TableCell>{review.business}</TableCell>
                              <TableCell>{review.service}</TableCell>
                              <TableCell>{review.rating}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                              <TableCell>{review.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(review.id, "評價")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit(review.id, "評價")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteConfirm(review.id, "評價")}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="reported" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>客戶</TableHead>
                            <TableHead>商家</TableHead>
                            <TableHead>服務項目</TableHead>
                            <TableHead>評分</TableHead>
                            <TableHead>評論</TableHead>
                            <TableHead>檢舉原因</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReviews.map(review => (
                            <TableRow key={review.id}>
                              <TableCell>{review.id}</TableCell>
                              <TableCell>{review.customer}</TableCell>
                              <TableCell>{review.business}</TableCell>
                              <TableCell>{review.service}</TableCell>
                              <TableCell>{review.rating}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                              <TableCell>不當言論</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleView(review.id, "評價")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "評價已移除",
                                        description: `評價 ID: ${review.id} 已被移除`,
                                      });
                                    }}
                                  >
                                    <Trash2 size={16} className="text-red-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "忽略檢舉",
                                        description: `評價 ID: ${review.id} 的檢舉已被忽略`,
                                      });
                                    }}
                                  >
                                    <XCircle size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">內容管理</h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="homepage">
                  <TabsList className="mb-6">
                    <TabsTrigger value="homepage">首頁內容</TabsTrigger>
                    <TabsTrigger value="articles">文章/部落格</TabsTrigger>
                    <TabsTrigger value="faq">常見問題</TabsTrigger>
                    <TabsTrigger value="static">靜態頁面</TabsTrigger>
                    <TabsTrigger value="seo">SEO 設定</TabsTrigger>
                  </TabsList>

                  <TabsContent value="homepage" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>輪播圖片/影片</CardTitle>
                          <CardDescription>管理首頁上方的輪播展示內容</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="border rounded-md p-2 relative group">
                              <img 
                                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                                className="w-full h-32 object-cover rounded" 
                                alt="輪播圖片" 
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white"
                                  onClick={() => handleEdit("1", "輪播圖片")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white"
                                  onClick={() => handleDeleteConfirm("1", "輪播圖片")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="border rounded-md p-2 relative group">
                              <img 
                                src="https://images.unsplash.com/photo-1607779097040-28d8a56e8b07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                                className="w-full h-32 object-cover rounded" 
                                alt="輪播圖片" 
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white"
                                  onClick={() => handleEdit("2", "輪播圖片")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white"
                                  onClick={() => handleDeleteConfirm("2", "輪播圖片")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                            <div 
                              className="border rounded-md p-2 flex items-center justify-center h-32 cursor-pointer bg-gray-50 hover:bg-gray-100"
                              onClick={() => handleAdd("輪播圖片")}
                            >
                              <Plus size={24} className="text-gray-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>推薦商家/服務</CardTitle>
                          <CardDescription>管理首頁展示的精選商家或熱門服務</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 border rounded-md">
                              <div>
                                <h3 className="font-medium">精選商家</h3>
                                <p className="text-sm text-muted-foreground">已選擇 5 個商家</p>
                              </div>
                              <Button 
                                variant="outline"
                                onClick={() => handleEdit("featured-businesses", "精選內容")}
                              >
                                管理精選商家
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded-md">
                              <div>
                                <h3 className="font-medium">熱門服務</h3>
                                <p className="text-sm text-muted-foreground">已選擇 8 個服務</p>
                              </div>
                              <Button 
                                variant="outline"
                                onClick={() => handleEdit("popular-services", "精選內容")}
                              >
                                管理熱門服務
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>最新消息/公告</CardTitle>
                          <CardDescription>管理平台的重要通知與公告</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 border rounded-md">
                              <div className="flex-1">
                                <h3 className="font-medium">春季美容優惠，限時特價</h3>
                                <p className="text-sm text-muted-foreground">發布時間: 2025-04-01</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("1", "公告")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("1", "公告")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded-md">
                              <div className="flex-1">
                                <h3 className="font-medium">系統維護通知</h3>
                                <p className="text-sm text-muted-foreground">發布時間: 2025-04-10</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("2", "公告")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("2", "公告")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button 
                              onClick={() => handleAdd("公告")}
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                            >
                              <Plus size={16} className="mr-2" />
                              新增公告
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="articles" className="mt-0">
                    <div className="flex justify-between mb-4">
                      <div className="relative w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder="搜尋文章..." className="pl-9" />
                      </div>
                      <Button 
                        className="bg-beauty-primary hover:bg-beauty-primary/90"
                        onClick={() => handleAdd("文章")}
                      >
                        <Plus size={16} className="mr-2" />
                        新增文章
                      </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>標題</TableHead>
                            <TableHead>分類</TableHead>
                            <TableHead>作者</TableHead>
                            <TableHead>發布日期</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>10個護膚小技巧，讓你的肌膚煥然一新</TableCell>
                            <TableCell>護膚技巧</TableCell>
                            <TableCell>美容編輯</TableCell>
                            <TableCell>2025-04-10</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已發布</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleView("1", "文章")}
                                >
                                  <Eye size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("1", "文章")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("1", "文章")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>如何挑選適合自己的髮型</TableCell>
                            <TableCell>美髮指南</TableCell>
                            <TableCell>時尚設計師</TableCell>
                            <TableCell>2025-04-05</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已發布</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleView("2", "文章")}
                                >
                                  <Eye size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("2", "文章")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("2", "文章")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2025年春季美甲流行趨勢</TableCell>
                            <TableCell>美甲流行</TableCell>
                            <TableCell>美甲專家</TableCell>
                            <TableCell>2025-04-12</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">草稿</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleView("3", "文章")}
                                >
                                  <Eye size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("3", "文章")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("3", "文章")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="faq" className="mt-0">
                    <div className="flex justify-end mb-4">
                      <Button 
                        className="bg-beauty-primary hover:bg-beauty-primary/90"
                        onClick={() => handleAdd("FAQ")}
                      >
                        <Plus size={16} className="mr-2" />
                        新增問題
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>如何註冊成為美容服務提供者？</CardTitle>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEdit("1", "FAQ")}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteConfirm("1", "FAQ")}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>您可以點擊網站右上角的「註冊」按鈕，選擇「商家註冊」，填寫相關資料後提交審核。我們的團隊會在3個工作日內審核您的申請，審核通過後您將收到確認電子郵件。</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>如何取消或修改我的預約？</CardTitle>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEdit("2", "FAQ")}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteConfirm("2", "FAQ")}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>您可以在個人帳戶中的「我的預約」頁面查看所有預約，點擊特定預約後可以選擇「修改預約」或「取消預約」。請注意，某些商家可能有取消預約的時間限制和相關政策。</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="static" className="mt-0">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>關於我們</CardTitle>
                          <CardDescription>平台介紹與使命</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground mb-4">
                            最後更新時間: 2025-01-15
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => handleEdit("about-us", "靜態頁面")}
                          >
                            編輯頁面
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>服務條款</CardTitle>
                          <CardDescription>使用平台的條款與條件</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground mb-4">
                            最後更新時間: 2025-02-10
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => handleEdit("terms", "靜態頁面")}
                          >
                            編輯頁面
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>隱私權政策</CardTitle>
                          <CardDescription>個人資料處理與保護政策</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground mb-4">
                            最後更新時間: 2025-02-10
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => handleEdit("privacy", "靜態頁面")}
                          >
                            編輯頁面
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>聯絡我們</CardTitle>
                          <CardDescription>聯絡資訊與客服管道</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground mb-4">
                            最後更新時間: 2025-03-05
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => handleEdit("contact", "靜態頁面")}
                          >
                            編輯頁面
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>全站 SEO 設定</CardTitle>
                        <CardDescription>管理網站的基本 SEO 設定</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">網站標題</label>
                            <Input 
                              defaultValue="美容服務預約平台 | 找到專業的美容服務" 
                              className="w-full" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">網站描述</label>
                            <Input 
                              defaultValue="提供全台灣最專業的美容、美髮、美甲、SPA 等服務預約，輕鬆找到附近的美容服務提供者。" 
                              className="w-full" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">關鍵字</label>
                            <Input 
                              defaultValue="美容,美髮,美甲,SPA,按摩,美容預約,美髮預約,台灣美容" 
                              className="w-full" 
                            />
                          </div>
                          <Button 
                            className="bg-beauty-primary hover:bg-beauty-primary/90"
                            onClick={() => {
                              toast({
                                title: "SEO 設定已更新",
                                description: "全站 SEO 設定已成功更新",
                              });
                            }}
                          >
                            儲存設定
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>頁面 SEO 管理</CardTitle>
                        <CardDescription>管理個別頁面的 SEO 設定</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[300px]">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>頁面</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>標題</TableHead>
                                <TableHead>描述</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>首頁</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell className="max-w-[150px] truncate">美容服務預約平台 | 找到專業的美容服務</TableCell>
                                <TableCell className="max-w-[200px] truncate">提供全台灣最專業的美容、美髮、美甲、SPA 等服務預約</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit("home", "頁面 SEO")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>商家列表</TableCell>
                                <TableCell>/businesses</TableCell>
                                <TableCell className="max-w-[150px] truncate">美容商家列表 | 找到附近專業的美容店家</TableCell>
                                <TableCell className="max-w-[200px] truncate">瀏覽台灣各地的美容商家，包含美髮、美甲、SPA 等服務</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit("businesses", "頁面 SEO")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>服務列表</TableCell>
                                <TableCell>/services</TableCell>
                                <TableCell className="max-w-[150px] truncate">美容服務列表 | 瀏覽各種專業美容服務</TableCell>
                                <TableCell className="max-w-[200px] truncate">瀏覽各種美容服務項目，包含美髮、美甲、SPA 等專業服務</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEdit("services", "頁面 SEO")}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Systems Settings */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">系統設定</h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="basic">
                  <TabsList className="mb-6">
                    <TabsTrigger value="basic">基本設定</TabsTrigger>
                    <TabsTrigger value="email">郵件/簡訊</TabsTrigger>
                    <TabsTrigger value="payment">支付設定</TabsTrigger>
                    <TabsTrigger value="security">安全性設定</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>網站基本資訊</CardTitle>
                          <CardDescription>設定網站的基本資訊</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">網站名稱</label>
                              <Input defaultValue="美容服務預約平台" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">網站描述</label>
                              <Input defaultValue="提供美容、美髮、美甲、SPA 等服務預約" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">聯絡電子郵件</label>
                              <Input defaultValue="contact@beautyplatform.com" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">客服電話</label>
                              <Input defaultValue="02-1234-5678" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">網站 Logo</label>
                              <div className="flex items-center space-x-4">
                                <img 
                                  src="https://via.placeholder.com/150x50" 
                                  alt="Logo" 
                                  className="h-10" 
                                />
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "選擇 Logo",
                                      description: "請上傳新的網站 Logo",
                                    });
                                  }}
                                >
                                  更改 Logo
                                </Button>
                              </div>
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "網站基本資訊已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>預設顯示設定</CardTitle>
                          <CardDescription>設定網站的預設顯示選項</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">預設貨幣</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="TWD">新台幣 (TWD)</option>
                                <option value="USD">美元 (USD)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">預設時區</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="Asia/Taipei">台北 (GMT+8)</option>
                                <option value="UTC">UTC</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">每頁顯示商家數量</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                              </select>
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "預設顯示設定已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>功能模組設定</CardTitle>
                          <CardDescription>啟用或停用網站的功能模組</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">評論功能</h4>
                                <p className="text-sm text-muted-foreground">允許使用者對服務進行評論</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "評論功能已啟用",
                                    description: "使用者現在可以發表評論",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">即時通訊功能</h4>
                                <p className="text-sm text-muted-foreground">允許使用者與商家進行即時通訊</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "即時通訊功能已停用",
                                    description: "使用者無法使用即時通訊功能",
                                    variant: "destructive",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">線上支付功能</h4>
                                <p className="text-sm text-muted-foreground">允許使用者在線上支付服務費用</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "線上支付功能已啟用",
                                    description: "使用者現在可以進行線上支付",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>郵件發送設定</CardTitle>
                          <CardDescription>設定郵件發送伺服器資訊</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">SMTP 伺服器</label>
                              <Input defaultValue="smtp.example.com" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">SMTP 埠</label>
                              <Input defaultValue="587" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">發送者電子郵件</label>
                              <Input defaultValue="noreply@beautyplatform.com" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">發送者名稱</label>
                              <Input defaultValue="美容服務預約平台" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">SMTP 使用者名稱</label>
                              <Input defaultValue="smtpuser" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">SMTP 密碼</label>
                              <Input type="password" defaultValue="********" className="w-full" />
                            </div>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "發送測試郵件",
                                  description: "測試郵件已發送，請檢查您的信箱",
                                });
                              }}
                            >
                              發送測試郵件
                            </Button>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "郵件發送設定已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>郵件模板管理</CardTitle>
                          <CardDescription>管理系統發送的郵件模板</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-md">
                              <div className="flex justify-between items-center p-4 border-b">
                                <h4 className="font-medium">使用者註冊確認郵件</h4>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("register", "郵件模板")}
                                >
                                  編輯模板
                                </Button>
                              </div>
                              <div className="p-4">
                                <p className="text-sm text-muted-foreground">發送時機：使用者完成註冊時</p>
                                <p className="text-sm text-muted-foreground">變數：使用者名稱、確認連結</p>
                              </div>
                            </div>
                            <div className="border rounded-md">
                              <div className="flex justify-between items-center p-4 border-b">
                                <h4 className="font-medium">預約確認郵件</h4>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("booking", "郵件模板")}
                                >
                                  編輯模板
                                </Button>
                              </div>
                              <div className="p-4">
                                <p className="text-sm text-muted-foreground">發送時機：使用者完成預約時</p>
                                <p className="text-sm text-muted-foreground">變數：使用者名稱、商家名稱、服務項目、預約時間</p>
                              </div>
                            </div>
                            <div className="border rounded-md">
                              <div className="flex justify-between items-center p-4 border-b">
                                <h4 className="font-medium">預約提醒郵件</h4>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("reminder", "郵件模板")}
                                >
                                  編輯模板
                                </Button>
                              </div>
                              <div className="p-4">
                                <p className="text-sm text-muted-foreground">發送時機：預約前 24 小時</p>
                                <p className="text-sm text-muted-foreground">變數：使用者名稱、商家名稱、服務項目、預約時間</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>簡訊服務設定</CardTitle>
                          <CardDescription>設定簡訊發送服務資訊</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">簡訊服務提供商</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="twilio">Twilio</option>
                                <option value="nexmo">Nexmo</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">API 金鑰</label>
                              <Input defaultValue="YOUR_API_KEY" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">API 密鑰</label>
                              <Input type="password" defaultValue="YOUR_API_SECRET" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">發送者 ID</label>
                              <Input defaultValue="BeautyPlatform" className="w-full" />
                            </div>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "發送測試簡訊",
                                  description: "測試簡訊已發送，請檢查您的手機",
                                });
                              }}
                            >
                              發送測試簡訊
                            </Button>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "簡訊服務設定已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="payment" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>支付方式設定</CardTitle>
                          <CardDescription>設定網站支援的支付方式</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">信用卡支付</h4>
                                <p className="text-sm text-muted-foreground">接受 Visa、MasterCard、JCB 等信用卡支付</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "信用卡支付已啟用",
                                    description: "使用者現在可以使用信用卡支付",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">LINE Pay</h4>
                                <p className="text-sm text-muted-foreground">接受 LINE Pay 支付</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "LINE Pay 已啟用",
                                    description: "使用者現在可以使用 LINE Pay 支付",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">街口支付</h4>
                                <p className="text-sm text-muted-foreground">接受街口支付</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "街口支付已停用",
                                    description: "使用者無法使用街口支付",
                                    variant: "destructive",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>金流服務設定</CardTitle>
                          <CardDescription>設定金流服務提供商資訊</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">金流服務提供商</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="ecpay">綠界科技 (ECPay)</option>
                                <option value="newebpay">藍新金流 (NewebPay)</option>
                                <option value="stripe">Stripe</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">商店代號</label>
                              <Input defaultValue="YOUR_MERCHANT_ID" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">商店金鑰</label>
                              <Input type="password" defaultValue="YOUR_MERCHANT_KEY" className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">交易環境</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="sandbox">測試環境</option>
                                <option value="production">正式環境</option>
                              </select>
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "金流服務設定已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>密碼政策</CardTitle>
                          <CardDescription>設定網站的密碼安全政策</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">最小密碼長度</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="6">6 字元</option>
                                <option value="8" selected>8 字元</option>
                                <option value="10">10 字元</option>
                                <option value="12">12 字元</option>
                              </select>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="require_special" 
                                className="mr-2" 
                                checked 
                              />
                              <label htmlFor="require_special">要求包含特殊字元</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="require_number" 
                                className="mr-2" 
                                checked 
                              />
                              <label htmlFor="require_number">要求包含數字</label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="require_uppercase" 
                                className="mr-2" 
                                checked 
                              />
                              <label htmlFor="require_uppercase">要求包含大寫字母</label>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">密碼有效期</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="0">永久有效</option>
                                <option value="30">30 天</option>
                                <option value="60">60 天</option>
                                <option value="90" selected>90 天</option>
                              </select>
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "密碼政策已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>登入安全</CardTitle>
                          <CardDescription>設定登入的安全措施</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">兩步驟驗證</h4>
                                <p className="text-sm text-muted-foreground">要求管理員使用兩步驟驗證登入</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "兩步驟驗證已啟用",
                                    description: "管理員需要使用兩步驟驗證登入",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">登入失敗鎖定</h4>
                                <p className="text-sm text-muted-foreground">連續登入失敗超過次數限制時鎖定帳號</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "登入失敗鎖定已啟用",
                                    description: "連續登入失敗將導致帳號被鎖定",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">允許連續失敗次數</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="3">3 次</option>
                                <option value="5" selected>5 次</option>
                                <option value="10">10 次</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">鎖定時間</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="15">15 分鐘</option>
                                <option value="30" selected>30 分鐘</option>
                                <option value="60">1 小時</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">IP 白名單</h4>
                                <p className="text-sm text-muted-foreground">限制只有特定 IP 可以訪問管理後台</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "IP 白名單已停用",
                                    description: "任何 IP 都可以訪問管理後台",
                                    variant: "destructive",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1"></div>
                              </div>
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "設定已更新",
                                  description: "登入安全設定已成功更新",
                                });
                              }}
                            >
                              儲存設定
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>資料備份</CardTitle>
                          <CardDescription>設定網站資料的自動備份</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">自動備份</h4>
                                <p className="text-sm text-muted-foreground">定期自動備份網站資料</p>
                              </div>
                              <div 
                                className="w-12 h-6 bg-gray-200 rounded-full px-1 flex items-center cursor-pointer relative"
                                onClick={() => {
                                  toast({
                                    title: "自動備份已啟用",
                                    description: "網站資料將會定期自動備份",
                                  });
                                }}
                              >
                                <div className="w-4 h-4 bg-beauty-primary rounded-full absolute right-1"></div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">備份頻率</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="daily">每日</option>
                                <option value="weekly" selected>每週</option>
                                <option value="monthly">每月</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">保留備份數量</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option value="5">5 個</option>
                                <option value="10" selected>10 個</option>
                                <option value="30">30 個</option>
                              </select>
                            </div>
                            <div className="flex space-x-4">
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  toast({
                                    title: "立即備份",
                                    description: "已開始進行網站資料備份，請稍候",
                                  });
                                }}
                              >
                                立即備份
                              </Button>
                              <Button 
                                className="bg-beauty-primary hover:bg-beauty-primary/90"
                                onClick={() => {
                                  toast({
                                    title: "設定已更新",
                                    description: "資料備份設定已成功更新",
                                  });
                                }}
                              >
                                儲存設定
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">報表與分析</h1>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border rounded-md">
                    <option value="7">最近 7 天</option>
                    <option value="30">最近 30 天</option>
                    <option value="90">最近 90 天</option>
                    <option value="365">最近 1 年</option>
                  </select>
                  <Button 
                    variant="outline"
                    onClick={() => handleExport("報表")}
                  >
                    <Download size={16} className="mr-2" />
                    匯出報表
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">總覽</TabsTrigger>
                    <TabsTrigger value="users">使用者</TabsTrigger>
                    <TabsTrigger value="businesses">商家</TabsTrigger>
                    <TabsTrigger value="services">服務</TabsTrigger>
                    <TabsTrigger value="bookings">預約</TabsTrigger>
                    <TabsTrigger value="reviews">評價</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">總使用者數</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3,254</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">12%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">總商家數</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">157</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">8%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">總預約數</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4,891</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">15%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>使用者成長趨勢</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>預約趨勢分析</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="users" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">消費者數量</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3,087</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">11%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">商家數量</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">157</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">8%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">管理員數量</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">10</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-muted-foreground font-medium">0%</span> 無變化
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>使用者註冊趨勢</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                          <PieChart size={100} className="opacity-20" />
                          <span className="ml-3">圖表將在這裡顯示</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="businesses" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">美髮類商家</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">52</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">10%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">美容類商家</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">63</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">8%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">SPA 類商家</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">42</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">12%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>熱門商家排行榜</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>排名</TableHead>
                              <TableHead>商家名稱</TableHead>
                              <TableHead>類別</TableHead>
                              <TableHead>預約數量</TableHead>
                              <TableHead>評分</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>美麗世界</TableCell>
                              <TableCell>美容</TableCell>
                              <TableCell>257</TableCell>
                              <TableCell>4.8</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2</TableCell>
                              <TableCell>時尚髮型</TableCell>
                              <TableCell>美髮</TableCell>
                              <TableCell>231</TableCell>
                              <TableCell>4.7</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>3</TableCell>
                              <TableCell>舒適SPA</TableCell>
                              <TableCell>SPA</TableCell>
                              <TableCell>198</TableCell>
                              <TableCell>4.9</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>4</TableCell>
                              <TableCell>專業美甲</TableCell>
                              <TableCell>美甲</TableCell>
                              <TableCell>175</TableCell>
                              <TableCell>4.5</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>5</TableCell>
                              <TableCell>美睫專家</TableCell>
                              <TableCell>美睫</TableCell>
                              <TableCell>148</TableCell>
                              <TableCell>4.6</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>商家地區分布</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                          <PieChart size={100} className="opacity-20" />
                          <span className="ml-3">圖表將在這裡顯示</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="services" className="mt-0">
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>熱門服務排行榜</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>排名</TableHead>
                              <TableHead>服務名稱</TableHead>
                              <TableHead>類別</TableHead>
                              <TableHead>預約次數</TableHead>
                              <TableHead>平均評分</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>基礎臉部護理</TableCell>
                              <TableCell>美容</TableCell>
                              <TableCell>324</TableCell>
                              <TableCell>4.7</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2</TableCell>
                              <TableCell>女士剪髮</TableCell>
                              <TableCell>美髮</TableCell>
                              <TableCell>287</TableCell>
                              <TableCell>4.6</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>3</TableCell>
                              <TableCell>全身按摩</TableCell>
                              <TableCell>SPA</TableCell>
                              <TableCell>258</TableCell>
                              <TableCell>4.9</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>4</TableCell>
                              <TableCell>凝膠美甲</TableCell>
                              <TableCell>美甲</TableCell>
                              <TableCell>231</TableCell>
                              <TableCell>4.5</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>5</TableCell>
                              <TableCell>嫁接睫毛</TableCell>
                              <TableCell>美睫</TableCell>
                              <TableCell>194</TableCell>
                              <TableCell>4.6</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>服務類別分布</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>服務價格分布</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="bookings" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">當月預約總數</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">874</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">15%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">當月完成預約</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">762</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">12%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">當月取消預約</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">112</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-muted-foreground font-medium">13%</span> 取消率
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>預約趨勢分析</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>預約高峰時段分析</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">總評價數量</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3,852</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">9%</span> 較上月成長
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">平均評分</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4.6</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight size={14} className="text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">0.2</span> 較上月提升
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">檢舉評價數</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">57</div>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-muted-foreground font-medium">1.5%</span> 檢舉率
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>評分分布</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>各類別服務評分比較</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <PieChart size={100} className="opacity-20" />
                            <span className="ml-3">圖表將在這裡顯示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Marketing */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">行銷與推廣</h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="coupons">
                  <TabsList className="mb-6">
                    <TabsTrigger value="coupons">優惠券管理</TabsTrigger>
                    <TabsTrigger value="promotions">促銷活動</TabsTrigger>
                    <TabsTrigger value="email">電子郵件行銷</TabsTrigger>
                    <TabsTrigger value="ads">廣告管理</TabsTrigger>
                  </TabsList>

                  <TabsContent value="coupons" className="mt-0">
                    <div className="flex justify-between mb-4">
                      <div className="relative w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder="搜尋優惠券..." className="pl-9" />
                      </div>
                      <Button 
                        className="bg-beauty-primary hover:bg-beauty-primary/90"
                        onClick={() => handleAdd("優惠券")}
                      >
                        <Plus size={16} className="mr-2" />
                        新增優惠券
                      </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>代碼</TableHead>
                            <TableHead>名稱</TableHead>
                            <TableHead>折扣類型</TableHead>
                            <TableHead>折扣值</TableHead>
                            <TableHead>有效期限</TableHead>
                            <TableHead>使用限制</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>SPRING25</TableCell>
                            <TableCell>春季優惠</TableCell>
                            <TableCell>百分比</TableCell>
                            <TableCell>25%</TableCell>
                            <TableCell>2025-05-31</TableCell>
                            <TableCell>無最低消費</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已啟用</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("SPRING25", "優惠券")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfir("SPRING25", "優惠券")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>NEWUSER</TableCell>
                            <TableCell>新用戶優惠</TableCell>
                            <TableCell>固定金額</TableCell>
                            <TableCell>NT$200</TableCell>
                            <TableCell>2025-12-31</TableCell>
                            <TableCell>新用戶限定</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已啟用</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("NEWUSER", "優惠券")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfir("NEWUSER", "優惠券")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>BEAUTY15</TableCell>
                            <TableCell>美容服務優惠</TableCell>
                            <TableCell>百分比</TableCell>
                            <TableCell>15%</TableCell>
                            <TableCell>2025-06-30</TableCell>
                            <TableCell>美容類服務</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已啟用</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("BEAUTY15", "優惠券")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfir("BEAUTY15", "優惠券")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="promotions" className="mt-0">
                    <div className="flex justify-between mb-4">
                      <div className="relative w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder="搜尋促銷活動..." className="pl-9" />
                      </div>
                      <Button 
                        className="bg-beauty-primary hover:bg-beauty-primary/90"
                        onClick={() => handleAdd("促銷活動")}
                      >
                        <Plus size={16} className="mr-2" />
                        新增促銷活動
                      </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>活動名稱</TableHead>
                            <TableHead>類型</TableHead>
                            <TableHead>開始日期</TableHead>
                            <TableHead>結束日期</TableHead>
                            <TableHead>適用範圍</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>春季美容特惠</TableCell>
                            <TableCell>限時折扣</TableCell>
                            <TableCell>2025-04-01</TableCell>
                            <TableCell>2025-04-30</TableCell>
                            <TableCell>所有美容服務</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">進行中</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("1", "促銷活動")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("1", "促銷活動")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>母親節感恩回饋</TableCell>
                            <TableCell>買一送一</TableCell>
                            <TableCell>2025-05-01</TableCell>
                            <TableCell>2025-05-12</TableCell>
                            <TableCell>指定 SPA 服務</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">未開始</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("2", "促銷活動")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("2", "促銷活動")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>新會員首月優惠</TableCell>
                            <TableCell>特價</TableCell>
                            <TableCell>2025-01-01</TableCell>
                            <TableCell>2025-12-31</TableCell>
                            <TableCell>所有新會員</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">進行中</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEdit("3", "促銷活動")}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteConfirm("3", "促銷活動")}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="email" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>電子郵件行銷活動</CardTitle>
                          <CardDescription>管理電子郵件行銷活動</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h3 className="font-medium">最新服務優惠通知</h3>
                                <p className="text-sm text-muted-foreground">發送對象: 所有使用者</p>
                                <p className="text-sm text-muted-foreground">預計發送時間: 2025-04-20</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("1", "電子郵件活動")}
                                >
                                  編輯
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "測試郵件已發送",
                                      description: "測試郵件已發送到您的信箱",
                                    });
                                  }}
                                >
                                  發送測試郵件
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h3 className="font-medium">會員回流優惠</h3>
                                <p className="text-sm text-muted-foreground">發送對象: 30 天內未登入的使用者</p>
                                <p className="text-sm text-muted-foreground">預計發送時間: 2025-04-25</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("2", "電子郵件活動")}
                                >
                                  編輯
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "測試郵件已發送",
                                      description: "測試郵件已發送到您的信箱",
                                    });
                                  }}
                                >
                                  發送測試郵件
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => handleAdd("電子郵件活動")}
                            >
                              <Plus size={16} className="mr-2" />
                              新增電子郵件活動
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>郵件訂閱者管理</CardTitle>
                          <CardDescription>管理訂閱電子郵件的使用者</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="relative w-72">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                              <Input placeholder="搜尋訂閱者..." className="pl-9" />
                            </div>
                            <Button 
                              variant="outline"
                              onClick={() => handleExport("訂閱者")}
                            >
                              <Download size={16} className="mr-2" />
                              匯出訂閱者名單
                            </Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>電子郵件</TableHead>
                                <TableHead>姓名</TableHead>
                                <TableHead>訂閱日期</TableHead>
                                <TableHead>訂閱類型</TableHead>
                                <TableHead>狀態</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>wang@example.com</TableCell>
                                <TableCell>王小明</TableCell>
                                <TableCell>2025-03-15</TableCell>
                                <TableCell>所有郵件</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已訂閱</span>
                                </TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "已取消訂閱",
                                        description: "該使用者已被移出訂閱名單",
                                        variant: "destructive",
                                      });
                                    }}
                                  >
                                    取消訂閱
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>lin@example.com</TableCell>
                                <TableCell>林美美</TableCell>
                                <TableCell>2025-02-10</TableCell>
                                <TableCell>促銷活動</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已訂閱</span>
                                </TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "已取消訂閱",
                                        description: "該使用者已被移出訂閱名單",
                                        variant: "destructive",
                                      });
                                    }}
                                  >
                                    取消訂閱
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>chen@example.com</TableCell>
                                <TableCell>陳大偉</TableCell>
                                <TableCell>2025-01-05</TableCell>
                                <TableCell>所有郵件</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已訂閱</span>
                                </TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "已取消訂閱",
                                        description: "該使用者已被移出訂閱名單",
                                        variant: "destructive",
                                      });
                                    }}
                                  >
                                    取消訂閱
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="ads" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>廣告位管理</CardTitle>
                          <CardDescription>管理網站上的廣告位置</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h3 className="font-medium">首頁橫幅廣告</h3>
                                <p className="text-sm text-muted-foreground">位置: 首頁頂部</p>
                                <p className="text-sm text-muted-foreground">尺寸: 1200x300 像素</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("home-banner", "廣告位")}
                                >
                                  編輯
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "查看統計",
                                      description: "正在載入首頁橫幅廣告的統計資料",
                                    });
                                  }}
                                >
                                  查看統計
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h3 className="font-medium">服務列表側欄廣告</h3>
                                <p className="text-sm text-muted-foreground">位置: 服務列表右側欄</p>
                                <p className="text-sm text-muted-foreground">尺寸: 300x600 像素</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("services-sidebar", "廣告位")}
                                >
                                  編輯
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "查看統計",
                                      description: "正在載入服務列表側欄廣告的統計資料",
                                    });
                                  }}
                                >
                                  查看統計
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h3 className="font-medium">商家詳情頁廣告</h3>
                                <p className="text-sm text-muted-foreground">位置: 商家詳情頁底部</p>
                                <p className="text-sm text-muted-foreground">尺寸: 728x90 像素</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => handleEdit("business-detail", "廣告位")}
                                >
                                  編輯
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "查看統計",
                                      description: "正在載入商家詳情頁廣告的統計資料",
                                    });
                                  }}
                                >
                                  查看統計
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => handleAdd("廣告位")}
                            >
                              <Plus size={16} className="mr-2" />
                              新增廣告位
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>廣告內容管理</CardTitle>
                          <CardDescription>管理廣告的內容與排程</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="relative w-72">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                              <Input placeholder="搜尋廣告..." className="pl-9" />
                            </div>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => handleAdd("廣告內容")}
                            >
                              <Plus size={16} className="mr-2" />
                              新增廣告
                            </Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>廣告名稱</TableHead>
                                <TableHead>廣告位置</TableHead>
                                <TableHead>開始日期</TableHead>
                                <TableHead>結束日期</TableHead>
                                <TableHead>狀態</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>春季美容優惠</TableCell>
                                <TableCell>首頁橫幅廣告</TableCell>
                                <TableCell>2025-04-01</TableCell>
                                <TableCell>2025-04-30</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">進行中</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEdit("1", "廣告內容")}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteConfirm("1", "廣告內容")}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>新會員優惠</TableCell>
                                <TableCell>服務列表側欄廣告</TableCell>
                                <TableCell>2025-04-15</TableCell>
                                <TableCell>2025-05-15</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">進行中</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEdit("2", "廣告內容")}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteConfirm("2", "廣告內容")}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>母親節促銷</TableCell>
                                <TableCell>商家詳情頁廣告</TableCell>
                                <TableCell>2025-05-01</TableCell>
                                <TableCell>2025-05-12</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">未開始</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEdit("3", "廣告內容")}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteConfirm("3", "廣告內容")}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">通知與提醒</h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="system">
                  <TabsList className="mb-6">
                    <TabsTrigger value="system">系統通知設定</TabsTrigger>
                    <TabsTrigger value="manual">手動發送通知</TabsTrigger>
                  </TabsList>

                  <TabsContent value="system" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>系統通知設定</CardTitle>
                        <CardDescription>設定系統自動發送的通知</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <h3 className="font-medium">新預約通知</h3>
                              <p className="text-sm text-muted-foreground">當有新預約時，通知商家</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_booking_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="new_booking_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_booking_sms" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="new_booking_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_booking_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="new_booking_app">App 通知</label>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <h3 className="font-medium">預約確認通知</h3>
                              <p className="text-sm text-muted-foreground">當預約被確認時，通知客戶</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_confirmed_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_confirmed_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_confirmed_sms" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_confirmed_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_confirmed_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_confirmed_app">App 通知</label>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <h3 className="font-medium">預約提醒</h3>
                              <p className="text-sm text-muted-foreground">在預約前 24 小時提醒客戶</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_reminder_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_reminder_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_reminder_sms" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_reminder_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_reminder_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_reminder_app">App 通知</label>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <h3 className="font-medium">預約取消通知</h3>
                              <p className="text-sm text-muted-foreground">當預約被取消時，通知相關方</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_cancel_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_cancel_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_cancel_sms" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_cancel_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="booking_cancel_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="booking_cancel_app">App 通知</label>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <h3 className="font-medium">新評論通知</h3>
                              <p className="text-sm text-muted-foreground">當收到新評論時，通知商家</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_review_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="new_review_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_review_sms" 
                                  className="rounded" 
                                />
                                <label htmlFor="new_review_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="new_review_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="new_review_app">App 通知</label>
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="bg-beauty-primary hover:bg-beauty-primary/90"
                            onClick={() => {
                              toast({
                                title: "設定已更新",
                                description: "系統通知設定已成功更新",
                              });
                            }}
                          >
                            儲存設定
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="manual" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>手動發送通知</CardTitle>
                        <CardDescription>向特定用戶群組發送通知</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">通知標題</label>
                            <Input placeholder="請輸入通知標題" className="w-full" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">通知內容</label>
                            <textarea 
                              className="w-full min-h-[150px] px-3 py-2 border rounded-md" 
                              placeholder="請輸入通知內容"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">接收對象</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                              <option value="all">所有使用者</option>
                              <option value="consumers">所有消費者</option>
                              <option value="businesses">所有商家</option>
                              <option value="new_users">新註冊使用者（30天內）</option>
                              <option value="inactive">不活躍使用者（30天未登入）</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">通知方式</label>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="manual_email" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="manual_email">電子郵件</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="manual_sms" 
                                  className="rounded" 
                                />
                                <label htmlFor="manual_sms">簡訊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id="manual_app" 
                                  className="rounded" 
                                  checked 
                                />
                                <label htmlFor="manual_app">App 通知</label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">發送時間</label>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  id="send_now" 
                                  name="send_time" 
                                  checked 
                                />
                                <label htmlFor="send_now">立即發送</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  id="send_later" 
                                  name="send_time" 
                                />
                                <label htmlFor="send_later">排程發送</label>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "發送測試通知",
                                  description: "測試通知已發送到您的帳號",
                                });
                              }}
                            >
                              發送測試通知
                            </Button>
                            <Button 
                              className="bg-beauty-primary hover:bg-beauty-primary/90"
                              onClick={() => {
                                toast({
                                  title: "通知已發送",
                                  description: "通知已成功發送給所選的接收對象",
                                });
                              }}
                            >
                              發送通知
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Logs */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">操作日誌</h1>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleExport("日誌")}
                  >
                    <Download size={16} className="mr-2" />
                    匯出日誌
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between mb-6">
                  <div className="flex space-x-2">
                    <Button 
                      variant={activeTab === "admin_logs" ? "default" : "outline"} 
                      onClick={() => setActiveTab("admin_logs")}
                    >
                      管理員操作
                    </Button>
                    <Button 
                      variant={activeTab === "system_logs" ? "default" : "outline"} 
                      onClick={() => setActiveTab("system_logs")}
                    >
                      系統事件
                    </Button>
                    <Button 
                      variant={activeTab === "login_logs" ? "default" : "outline"} 
                      onClick={() => setActiveTab("login_logs")}
                    >
                      登入記錄
                    </Button>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <Filter size={16} className="text-gray-500" />
                    <select className="px-3 py-2 border rounded-md text-sm">
                      <option value="7">最近 7 天</option>
                      <option value="30">最近 30 天</option>
                      <option value="90">最近 90 天</option>
                    </select>
                  </div>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>時間</TableHead>
                        <TableHead>操作者</TableHead>
                        <TableHead>IP 位址</TableHead>
                        <TableHead>動作</TableHead>
                        <TableHead>詳細資訊</TableHead>
                        <TableHead>狀態</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-04-15 09:15:32</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.100</TableCell>
                        <TableCell>新增使用者</TableCell>
                        <TableCell>新增使用者 ID: 1234</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-15 08:45:12</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.100</TableCell>
                        <TableCell>更新商家資料</TableCell>
                        <TableCell>更新商家 ID: 5678</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-15 08:30:45</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.100</TableCell>
                        <TableCell>刪除評論</TableCell>
                        <TableCell>刪除評論 ID: 9012</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-15 08:15:30</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.100</TableCell>
                        <TableCell>登入系統</TableCell>
                        <TableCell>管理員登入</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-14 17:45:22</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.101</TableCell>
                        <TableCell>退款處理</TableCell>
                        <TableCell>訂單 ID: 7890 退款處理</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-14 16:30:18</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.101</TableCell>
                        <TableCell>更新系統設定</TableCell>
                        <TableCell>更新郵件發送設定</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-14 15:20:33</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.101</TableCell>
                        <TableCell>審核商家</TableCell>
                        <TableCell>審核商家 ID: 3456</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-14 14:10:55</TableCell>
                        <TableCell>系統管理員</TableCell>
                        <TableCell>192.168.1.101</TableCell>
                        <TableCell>發送通知</TableCell>
                        <TableCell>發送系統維護通知</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">成功</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除這個{itemToDelete.type}嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>取消</Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

