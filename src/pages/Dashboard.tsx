import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Edit, Trash2, Search, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { DatePicker } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const Dashboard = () => {
  const navigate = useNavigate();
  const { authData, logout, refreshAuthData } = useAuth();
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isExporting, setIsExporting] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Define a type for the logs tab to ensure we use consistent values
  type LogsTabType = 'admin_logs' | 'system_logs' | 'login_logs';

  // Update the state type
  const [logsActiveTab, setLogsActiveTab] = useState<LogsTabType>('admin_logs');

  useEffect(() => {
    if (!authData?.token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${authData?.token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
        setBusinesses(data.businesses);
        setAdmins(data.admins);
      } catch (error) {
        console.error("Could not fetch data:", error);
      }
    };

    fetchData();
  }, [authData?.token, navigate, logout]);

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleEditBusiness = (businessId) => {
    navigate(`/businesses/${businessId}/edit`);
  };

  const handleDeleteBusiness = (businessId) => {
    setSelectedBusinessId(businessId);
    setIsDeleteModalOpen(true);
  };

  const handleEditAdmin = (adminId) => {
    navigate(`/admins/${adminId}/edit`);
  };

  const handleDeleteAdmin = (adminId) => {
    setSelectedAdminId(adminId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      let deleteUrl = '';
      let idToDelete = null;

      if (selectedUserId) {
        deleteUrl = `${process.env.REACT_APP_API_URL}/admin/users/${selectedUserId}`;
        idToDelete = selectedUserId;
      } else if (selectedBusinessId) {
        deleteUrl = `${process.env.REACT_APP_API_URL}/admin/businesses/${selectedBusinessId}`;
        idToDelete = selectedBusinessId;
      } else if (selectedAdminId) {
        deleteUrl = `${process.env.REACT_APP_API_URL}/admin/admins/${selectedAdminId}`;
        idToDelete = selectedAdminId;
      }

      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authData?.token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to delete:', response.status);
        return;
      }

      // After successful deletion, update the state
      if (selectedUserId) {
        setUsers(users.filter(user => user.id !== idToDelete));
      } else if (selectedBusinessId) {
        setBusinesses(businesses.filter(business => business.id !== idToDelete));
      } else if (selectedAdminId) {
        setAdmins(admins.filter(admin => admin.id !== idToDelete));
      }

      // Reset the selected IDs and close the modal
      setIsDeleteModalOpen(false);
      setSelectedUserId(null);
      setSelectedBusinessId(null);
      setSelectedAdminId(null);

    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleExport = async () => {
    setIsExporting(true);
    console.log('Exporting data for date:', selectedDate);
    setIsExporting(false);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(users.length / itemsPerPage)));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const currentBusinesses = businesses.slice(indexOfFirstItem, indexOfLastItem);
  const currentAdmins = admins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">管理員後台</h1>

      {/* Users Section */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">消費者帳號管理</TabsTrigger>
          <TabsTrigger value="businesses">商家帳號管理</TabsTrigger>
          <TabsTrigger value="admins">管理員帳號管理</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">消費者帳號管理</h2>
            <Button onClick={() => navigate('/create-user')}>建立新帳號</Button>
          </div>

          <Table>
            <TableCaption>所有消費者帳號列表。</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">頭像</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>信箱</TableHead>
                <TableHead>電話</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>建立日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          編輯
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          刪除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              上一頁
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
            >
              下一頁
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="businesses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">商家帳號管理</h2>
            <Button onClick={() => navigate('/create-business')}>建立新商家</Button>
          </div>

          <Table>
            <TableCaption>所有商家帳號列表。</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">頭像</TableHead>
                <TableHead>商家名稱</TableHead>
                <TableHead>負責人姓名</TableHead>
                <TableHead>信箱</TableHead>
                <TableHead>電話</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>建立日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={business.imageUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>{business.ownerName}</TableCell>
                  <TableCell>{business.email}</TableCell>
                  <TableCell>{business.phone}</TableCell>
                  <TableCell>{business.address}</TableCell>
                  <TableCell>{business.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditBusiness(business.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          編輯
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteBusiness(business.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          刪除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              上一頁
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
            >
              下一頁
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">管理員帳號管理</h2>
            <Button onClick={() => navigate('/create-admin')}>建立新管理員</Button>
          </div>

          <Table>
            <TableCaption>所有管理員帳號列表。</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">頭像</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>信箱</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>建立日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={admin.imageUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditAdmin(admin.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          編輯
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteAdmin(admin.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          刪除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              上一頁
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
            >
              下一頁
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Modals */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            刪除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此消費者帳號？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷。這將永久刪除該消費者帳號及其所有相關數據。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>確認刪除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            刪除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此商家帳號？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷。這將永久刪除該商家帳號及其所有相關數據。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>確認刪除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            刪除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此管理員帳號？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷。這將永久刪除該管理員帳號及其所有相關數據。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>確認刪除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Logs Section */}
      <TabsContent value="logs" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">系統日誌管理</h2>
        </div>
        
        <Tabs defaultValue="admin_logs" className="w-full" onValueChange={(value) => setLogsActiveTab(value as LogsTabType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admin_logs">管理員操作日誌</TabsTrigger>
            <TabsTrigger value="system_logs">系統日誌</TabsTrigger>
            <TabsTrigger value="login_logs">登入日誌</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin_logs" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="搜尋管理員日誌..."
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  搜尋
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <DatePicker />
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  匯出報表
                </Button>
              </div>
            </div>
            
            <Table>
              <TableCaption>管理員操作日誌列表。</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>管理員</TableHead>
                  <TableHead>操作</TableHead>
                  <TableHead>時間</TableHead>
                  <TableHead>IP地址</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>刪除了使用者帳號</TableCell>
                  <TableCell>2024-07-15 14:30:00</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>修改了商家資訊</TableCell>
                  <TableCell>2024-07-15 15:45:00</TableCell>
                  <TableCell>192.168.1.2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                上一頁
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
              >
                下一頁
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="system_logs" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="搜尋系統日誌..."
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  搜尋
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <DatePicker />
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  匯出報表
                </Button>
              </div>
            </div>
            
            <Table>
              <TableCaption>系統日誌列表。</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>時間</TableHead>
                  <TableHead>事件</TableHead>
                  <TableHead>描述</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-07-15 16:00:00</TableCell>
                  <TableCell>伺服器啟動</TableCell>
                  <TableCell>伺服器成功啟動</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-07-15 16:05:00</TableCell>
                  <TableCell>資料庫連線</TableCell>
                  <TableCell>成功連線至資料庫</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                上一頁
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
              >
                下一頁
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="login_logs" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="搜尋登入日誌..."
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  搜尋
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <DatePicker />
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  匯出報表
                </Button>
              </div>
            </div>
            
            <Table>
              <TableCaption>登入日誌列表。</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>使用者</TableHead>
                  <TableHead>登入時間</TableHead>
                  <TableHead>IP地址</TableHead>
                  <TableHead>狀態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2024-07-15 10:00:00</TableCell>
                  <TableCell>192.168.1.100</TableCell>
                  <TableCell>成功</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2024-07-15 11:30:00</TableCell>
                  <TableCell>192.168.1.101</TableCell>
                  <TableCell>失敗</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                上一頁
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
              >
                下一頁
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  );
};

export default Dashboard;
