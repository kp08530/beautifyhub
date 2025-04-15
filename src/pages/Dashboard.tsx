
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, Store, Calendar, Clipboard, ArrowLeft, UserCog, 
  Building2, Star, FileText, Settings, BarChart3, Gift, 
  Bell, History, ShieldCheck, Unlock, Lock, UserPlus, User,
  ShoppingBag, MessageSquare, Edit, Trash2, Key, Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";

// Dashboard overview component
const DashboardOverview = () => {
  // Sample data for charts
  const userStats = [
    { month: '一月', users: 150 },
    { month: '二月', users: 230 },
    { month: '三月', users: 280 },
    { month: '四月', users: 310 },
    { month: '五月', users: 410 },
    { month: '六月', users: 520 },
  ];

  const appointmentStats = [
    { month: '一月', appointments: 80 },
    { month: '二月', appointments: 120 },
    { month: '三月', appointments: 190 },
    { month: '四月', appointments: 220 },
    { month: '五月', appointments: 280 },
    { month: '六月', appointments: 350 },
  ];

  const pieData = [
    { name: '美甲服務', value: 35 },
    { name: '美容護膚', value: 25 },
    { name: '美髮沙龍', value: 20 },
    { name: '其他服務', value: 20 },
  ];

  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">儀表板總覽</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">總用戶數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,892</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+11.2%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">商家數量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+4.3%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月預約數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+25.0%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月營業額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$56,890</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+18.7%</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>用戶增長趨勢</CardTitle>
            <CardDescription>過去六個月的用戶增長數據</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8B5CF6" name="用戶數量" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>預約數據分析</CardTitle>
            <CardDescription>過去六個月的預約數據</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#D946EF" name="預約數量" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>服務類型分布</CardTitle>
            <CardDescription>各類服務的預約佔比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>系統公告</CardTitle>
            <CardDescription>最新系統公告與更新資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-beauty-primary pl-4 py-2">
                <p className="font-medium">系統更新通知</p>
                <p className="text-sm text-muted-foreground mt-1">預約系統功能已全面更新，支援多時段預約。</p>
                <p className="text-xs text-muted-foreground mt-2">2025-04-10</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="font-medium">新功能預告</p>
                <p className="text-sm text-muted-foreground mt-1">行動支付功能即將上線，敬請期待。</p>
                <p className="text-xs text-muted-foreground mt-2">2025-04-05</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">商家入駐優惠</p>
                <p className="text-sm text-muted-foreground mt-1">新商家入駐享首月免服務費優惠，截止日期 2025-05-15。</p>
                <p className="text-xs text-muted-foreground mt-2">2025-04-01</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// User Management Tab
const UserManagement = () => {
  const [userType, setUserType] = useState<'consumer' | 'business' | 'admin'>('consumer');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">用戶管理</h2>
      
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={userType === 'consumer' ? 'default' : 'outline'} 
          onClick={() => setUserType('consumer')}
        >
          <User className="mr-2 h-4 w-4" /> 消費者帳號
        </Button>
        <Button 
          variant={userType === 'business' ? 'default' : 'outline'} 
          onClick={() => setUserType('business')}
        >
          <Store className="mr-2 h-4 w-4" /> 業者帳號
        </Button>
        <Button 
          variant={userType === 'admin' ? 'default' : 'outline'} 
          onClick={() => setUserType('admin')}
        >
          <UserCog className="mr-2 h-4 w-4" /> 管理員帳號
        </Button>
      </div>
      
      {userType === 'consumer' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>消費者帳號列表</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Lock className="mr-2 h-4 w-4" /> 批量封鎖
                </Button>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" /> 新增消費者
                </Button>
              </div>
            </div>
            <CardDescription>查看和管理消費者帳號資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>用戶名稱</TableHead>
                    <TableHead>電子郵件</TableHead>
                    <TableHead>電話</TableHead>
                    <TableHead>註冊日期</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>陳小明</TableCell>
                    <TableCell>chen123@example.com</TableCell>
                    <TableCell>0912-345-678</TableCell>
                    <TableCell>2025-02-15</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>林美麗</TableCell>
                    <TableCell>lin@example.com</TableCell>
                    <TableCell>0923-456-789</TableCell>
                    <TableCell>2025-03-01</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>王大華</TableCell>
                    <TableCell>wang@example.com</TableCell>
                    <TableCell>0934-567-890</TableCell>
                    <TableCell>2025-03-10</TableCell>
                    <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已封鎖</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-500">
                        <Unlock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {userType === 'business' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>業者帳號列表</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">待審核 (3)</Button>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" /> 新增業者
                </Button>
              </div>
            </div>
            <CardDescription>查看和管理美容業者帳號資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>商家名稱</TableHead>
                    <TableHead>帳號等級</TableHead>
                    <TableHead>電子郵件</TableHead>
                    <TableHead>電話</TableHead>
                    <TableHead>註冊日期</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>美綺美髮沙龍</TableCell>
                    <TableCell>高級方案</TableCell>
                    <TableCell>meiki@example.com</TableCell>
                    <TableCell>02-2345-6789</TableCell>
                    <TableCell>2025-01-15</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>晶晶美甲工作室</TableCell>
                    <TableCell>基礎方案</TableCell>
                    <TableCell>jing@example.com</TableCell>
                    <TableCell>02-3456-7890</TableCell>
                    <TableCell>2025-02-10</TableCell>
                    <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">待審核</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-500">審核通過</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">拒絕</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>自然美SPA中心</TableCell>
                    <TableCell>進階方案</TableCell>
                    <TableCell>spa@example.com</TableCell>
                    <TableCell>02-4567-8901</TableCell>
                    <TableCell>2025-02-20</TableCell>
                    <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已封鎖</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-500">
                        <Unlock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {userType === 'admin' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>管理員帳號列表</CardTitle>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> 新增管理員
              </Button>
            </div>
            <CardDescription>查看和管理系統管理員帳號</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>管理員名稱</TableHead>
                    <TableHead>電子郵件</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>最後登入時間</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>系統管理員</TableCell>
                    <TableCell>admin@example.com</TableCell>
                    <TableCell>超級管理員</TableCell>
                    <TableCell>2025-04-15 10:30</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>內容管理員</TableCell>
                    <TableCell>content@example.com</TableCell>
                    <TableCell>內容管理</TableCell>
                    <TableCell>2025-04-14 16:45</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>客服專員</TableCell>
                    <TableCell>service@example.com</TableCell>
                    <TableCell>客服管理</TableCell>
                    <TableCell>2025-04-15 09:15</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">正常</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Business Management Tab
const BusinessManagement = () => {
  const [businessType, setBusinessType] = useState<'info' | 'services'>('info');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">商家管理</h2>
      
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={businessType === 'info' ? 'default' : 'outline'} 
          onClick={() => setBusinessType('info')}
        >
          <Building2 className="mr-2 h-4 w-4" /> 商家資訊
        </Button>
        <Button 
          variant={businessType === 'services' ? 'default' : 'outline'} 
          onClick={() => setBusinessType('services')}
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> 服務項目
        </Button>
      </div>
      
      {businessType === 'info' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>商家列表</CardTitle>
              <Button size="sm">
                <Store className="mr-2 h-4 w-4" /> 新增商家
              </Button>
            </div>
            <CardDescription>查看和管理商家資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>商家名稱</TableHead>
                    <TableHead>分類</TableHead>
                    <TableHead>地址</TableHead>
                    <TableHead>電話</TableHead>
                    <TableHead>評分</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>美綺美髮沙龍</TableCell>
                    <TableCell>美髮沙龍</TableCell>
                    <TableCell>台北市信義區松仁路100號</TableCell>
                    <TableCell>02-2345-6789</TableCell>
                    <TableCell className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span>4.8</span>
                    </TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">營業中</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>晶晶美甲工作室</TableCell>
                    <TableCell>美甲服務</TableCell>
                    <TableCell>台北市大安區敦化南路50號</TableCell>
                    <TableCell>02-3456-7890</TableCell>
                    <TableCell className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span>4.6</span>
                    </TableCell>
                    <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">暫停營業</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>自然美SPA中心</TableCell>
                    <TableCell>美容護膚</TableCell>
                    <TableCell>台北市中山區南京東路200號</TableCell>
                    <TableCell>02-4567-8901</TableCell>
                    <TableCell className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span>4.9</span>
                    </TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">營業中</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {businessType === 'services' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>服務項目列表</CardTitle>
              <Button size="sm">
                <ShoppingBag className="mr-2 h-4 w-4" /> 新增服務
              </Button>
            </div>
            <CardDescription>查看和管理商家提供的服務項目</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>服務名稱</TableHead>
                    <TableHead>商家名稱</TableHead>
                    <TableHead>分類</TableHead>
                    <TableHead>價格</TableHead>
                    <TableHead>服務時長</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>基礎面部護理</TableCell>
                    <TableCell>自然美SPA中心</TableCell>
                    <TableCell>面部護理</TableCell>
                    <TableCell>NT$1,200</TableCell>
                    <TableCell>60分鐘</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">上架中</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>時尚剪髮</TableCell>
                    <TableCell>美綺美髮沙龍</TableCell>
                    <TableCell>美髮</TableCell>
                    <TableCell>NT$800</TableCell>
                    <TableCell>60分鐘</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">上架中</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>凝膠美甲</TableCell>
                    <TableCell>晶晶美甲工作室</TableCell>
                    <TableCell>美甲</TableCell>
                    <TableCell>NT$800</TableCell>
                    <TableCell>60分鐘</TableCell>
                    <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">下架中</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">詳情</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-500">上架</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Booking Management Tab
const BookingManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">預約管理</h2>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>預約記錄</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">匯出資料</Button>
              <Button size="sm">新增預約</Button>
            </div>
          </div>
          <CardDescription>查看和管理所有預約記錄</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>消費者</TableHead>
                  <TableHead>商家</TableHead>
                  <TableHead>服務項目</TableHead>
                  <TableHead>預約時間</TableHead>
                  <TableHead>價格</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>陳小明</TableCell>
                  <TableCell>美綺美髮沙龍</TableCell>
                  <TableCell>精緻剪髮造型</TableCell>
                  <TableCell>2025-04-15 14:30</TableCell>
                  <TableCell>NT$800</TableCell>
                  <TableCell><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">已確認</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">取消</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>王大明</TableCell>
                  <TableCell>晶晶美甲工作室</TableCell>
                  <TableCell>日式美甲</TableCell>
                  <TableCell>2025-04-16 10:00</TableCell>
                  <TableCell>NT$800</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已完成</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>李美麗</TableCell>
                  <TableCell>自然美SPA中心</TableCell>
                  <TableCell>全身按摩</TableCell>
                  <TableCell>2025-04-17 15:00</TableCell>
                  <TableCell>NT$1,800</TableCell>
                  <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">待確認</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm" className="text-blue-500">確認</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">拒絕</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>林曉華</TableCell>
                  <TableCell>光采美妍中心</TableCell>
                  <TableCell>保濕面膜護理</TableCell>
                  <TableCell>2025-04-15 11:30</TableCell>
                  <TableCell>NT$1,200</TableCell>
                  <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已取消</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Review Management Tab
const ReviewManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">評價與評論管理</h2>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>評價列表</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">待審核 (5)</Button>
              <Button variant="outline" size="sm">已檢舉 (2)</Button>
            </div>
          </div>
          <CardDescription>查看和管理用戶評價</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>用戶</TableHead>
                  <TableHead>商家</TableHead>
                  <TableHead>服務項目</TableHead>
                  <TableHead>評分</TableHead>
                  <TableHead>評論內容</TableHead>
                  <TableHead>發布時間</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>陳小明</TableCell>
                  <TableCell>美綺美髮沙龍</TableCell>
                  <TableCell>精緻剪髮造型</TableCell>
                  <TableCell className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>5.0</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">設計師非常專業，髮型很滿意！推薦給大家！</TableCell>
                  <TableCell>2025-04-10</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>王大明</TableCell>
                  <TableCell>晶晶美甲工作室</TableCell>
                  <TableCell>日式美甲</TableCell>
                  <TableCell className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>4.5</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">美甲師很細心，作品很精緻，就是等待時間有點久。</TableCell>
                  <TableCell>2025-04-12</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>李美麗</TableCell>
                  <TableCell>自然美SPA中心</TableCell>
                  <TableCell>全身按摩</TableCell>
                  <TableCell className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>3.0</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">服務一般，環境不錯，但是價格偏高。</TableCell>
                  <TableCell>2025-04-13</TableCell>
                  <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">待審核</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm" className="text-green-500">通過</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">拒絕</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>林曉華</TableCell>
                  <TableCell>光采美妍中心</TableCell>
                  <TableCell>保濕面膜護理</TableCell>
                  <TableCell className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>2.0</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">不推薦，服務很糟糕，效果也不好。</TableCell>
                  <TableCell>2025-04-14</TableCell>
                  <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已檢舉</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">詳情</Button>
                    <Button variant="ghost" size="sm" className="text-amber-500">處理檢舉</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// CMS Management Tab
const ContentManagement = () => {
  const [contentType, setContentType] = useState<'homepage' | 'articles' | 'faq' | 'pages'>('homepage');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">內容管理</h2>
      
      <div className="flex space-x-2 mb-4 flex-wrap">
        <Button 
          variant={contentType === 'homepage' ? 'default' : 'outline'} 
          onClick={() => setContentType('homepage')}
          className="mb-2"
        >
          <FileText className="mr-2 h-4 w-4" /> 首頁內容
        </Button>
        <Button 
          variant={contentType === 'articles' ? 'default' : 'outline'} 
          onClick={() => setContentType('articles')}
          className="mb-2"
        >
          <FileText className="mr-2 h-4 w-4" /> 文章管理
        </Button>
        <Button 
          variant={contentType === 'faq' ? 'default' : 'outline'} 
          onClick={() => setContentType('faq')}
          className="mb-2"
        >
          <FileText className="mr-2 h-4 w-4" /> 常見問題
        </Button>
        <Button 
          variant={contentType === 'pages' ? 'default' : 'outline'} 
          onClick={() => setContentType('pages')}
          className="mb-2"
        >
          <FileText className="mr-2 h-4 w-4" /> 頁面管理
        </Button>
      </div>
      
      {contentType === 'homepage' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>首頁內容管理</CardTitle>
              <Button size="sm">保存變更</Button>
            </div>
            <CardDescription>編輯網站首頁顯示的內容</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">輪播圖片管理</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881" alt="輪播圖1" className="w-full h-40 object-cover rounded-md mb-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">輪播圖1</span>
                      <div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c" alt="輪播圖2" className="w-full h-40 object-cover rounded-md mb-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">輪播圖2</span>
                      <div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md p-4 border-dashed flex items-center justify-center">
                    <Button variant="outline" className="h-full w-full flex flex-col items-center justify-center py-8">
                      <span className="text-2xl mb-2">+</span>
                      <span>新增輪播圖</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">推薦商家</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">順序</TableHead>
                        <TableHead>商家名稱</TableHead>
                        <TableHead>推薦理由</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>美綺美髮沙龍</TableCell>
                        <TableCell>本月最受歡迎商家</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>晶晶美甲工作室</TableCell>
                        <TableCell>特色推薦</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button variant="outline" className="w-full">
                            + 新增推薦商家
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">最新公告</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead>標題</TableHead>
                        <TableHead>發布時間</TableHead>
                        <TableHead>狀態</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>系統更新通知</TableCell>
                        <TableCell>2025-04-10</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>新功能預告</TableCell>
                        <TableCell>2025-04-05</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Button variant="outline" className="w-full">
                            + 新增公告
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {contentType === 'articles' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>文章管理</CardTitle>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" /> 新增文章
              </Button>
            </div>
            <CardDescription>管理美容相關文章與部落格</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>標題</TableHead>
                    <TableHead>分類</TableHead>
                    <TableHead>作者</TableHead>
                    <TableHead>發布時間</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>如何保持肌膚水嫩的10個技巧</TableCell>
                    <TableCell>護膚技巧</TableCell>
                    <TableCell>美容編輯</TableCell>
                    <TableCell>2025-04-10</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>2025年最新美甲趨勢</TableCell>
                    <TableCell>美甲</TableCell>
                    <TableCell>美甲專家</TableCell>
                    <TableCell>2025-04-05</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>選擇適合髮質的洗髮精</TableCell>
                    <TableCell>美髮</TableCell>
                    <TableCell>髮型師</TableCell>
                    <TableCell>2025-04-01</TableCell>
                    <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">草稿</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-500">發布</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {contentType === 'faq' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>常見問題管理</CardTitle>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" /> 新增問題
              </Button>
            </div>
            <CardDescription>管理網站FAQ內容</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">順序</TableHead>
                    <TableHead>問題</TableHead>
                    <TableHead>分類</TableHead>
                    <TableHead>最後更新</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>如何預約美容服務？</TableCell>
                    <TableCell>預約問題</TableCell>
                    <TableCell>2025-04-10</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>如何取消或更改預約？</TableCell>
                    <TableCell>預約問題</TableCell>
                    <TableCell>2025-04-05</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>BeautifyHub接受哪些付款方式？</TableCell>
                    <TableCell>付款問題</TableCell>
                    <TableCell>2025-04-01</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {contentType === 'pages' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>頁面管理</CardTitle>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" /> 新增頁面
              </Button>
            </div>
            <CardDescription>管理網站靜態頁面</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>頁面標題</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>最後更新</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>關於我們</TableCell>
                    <TableCell>/about</TableCell>
                    <TableCell>2025-04-10</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>服務條款</TableCell>
                    <TableCell>/terms</TableCell>
                    <TableCell>2025-04-05</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>隱私權政策</TableCell>
                    <TableCell>/privacy</TableCell>
                    <TableCell>2025-04-01</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已發布</span></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">預覽</Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// System Settings Tab
const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">系統設定</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本設定</CardTitle>
            <CardDescription>網站基本資訊設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">網站名稱</label>
              <input type="text" className="w-full p-2 border rounded-md" value="BeautifyHub" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">網站描述</label>
              <textarea className="w-full p-2 border rounded-md" rows={3}>BeautifyHub是台灣首屈一指的美容服務預約平台，連結消費者與優質美容業者。</textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">網站 Logo</label>
              <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/150x50" alt="Logo" className="h-12" />
                <Button variant="outline" size="sm">更換 Logo</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">客服電子郵件</label>
              <input type="email" className="w-full p-2 border rounded-md" value="support@beautifyhub.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">客服電話</label>
              <input type="text" className="w-full p-2 border rounded-md" value="02-1234-5678" />
            </div>
            <Button>保存變更</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>郵件設定</CardTitle>
            <CardDescription>郵件伺服器與模板設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP 伺服器</label>
              <input type="text" className="w-full p-2 border rounded-md" value="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP 端口</label>
              <input type="text" className="w-full p-2 border rounded-md" value="587" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">郵件帳號</label>
              <input type="text" className="w-full p-2 border rounded-md" value="noreply@beautifyhub.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">郵件密碼</label>
              <input type="password" className="w-full p-2 border rounded-md" value="********" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">寄件人名稱</label>
              <input type="text" className="w-full p-2 border rounded-md" value="BeautifyHub 客服中心" />
            </div>
            <Button>測試連接</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>支付設定</CardTitle>
            <CardDescription>支付方式與金流設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <input type="checkbox" id="creditCard" className="mr-2" checked />
                <label htmlFor="creditCard">信用卡支付</label>
              </div>
              <Button variant="outline" size="sm">設定</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <input type="checkbox" id="linePay" className="mr-2" checked />
                <label htmlFor="linePay">LINE Pay</label>
              </div>
              <Button variant="outline" size="sm">設定</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <input type="checkbox" id="applePay" className="mr-2" />
                <label htmlFor="applePay">Apple Pay</label>
              </div>
              <Button variant="outline" size="sm">設定</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <input type="checkbox" id="atm" className="mr-2" checked />
                <label htmlFor="atm">ATM 轉帳</label>
              </div>
              <Button variant="outline" size="sm">設定</Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">交易手續費</label>
              <input type="text" className="w-full p-2 border rounded-md" value="3%" />
            </div>
            <Button>保存變更</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>安全設定</CardTitle>
            <CardDescription>系統安全設定與防護</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">兩步驗證</p>
                <p className="text-sm text-muted-foreground">為管理員登入啟用兩步驗證</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="twoFactor" className="h-4 w-4" checked />
                <label htmlFor="twoFactor" className="text-sm">啟用</label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">登入嘗試限制</p>
                <p className="text-sm text-muted-foreground">每 IP 每日最多登入嘗試次數</p>
              </div>
              <input type="number" className="w-20 p-2 border rounded-md" value="5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">密碼有效期</p>
                <p className="text-sm text-muted-foreground">管理員密碼過期天數</p>
              </div>
              <input type="number" className="w-20 p-2 border rounded-md" value="90" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">IP 白名單</label>
              <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="每行輸入一個 IP 地址"></textarea>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">資料庫自動備份</p>
                <p className="text-sm text-muted-foreground">啟用每日資料庫自動備份</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="dbBackup" className="h-4 w-4" checked />
                <label htmlFor="dbBackup" className="text-sm">啟用</label>
              </div>
            </div>
            <Button>保存變更</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Marketing Management Tab
const MarketingManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">行銷與推廣</h2>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>優惠券管理</CardTitle>
            <Button size="sm">
              <Tag className="mr-2 h-4 w-4" /> 新增優惠券
            </Button>
          </div>
          <CardDescription>管理平台優惠券與折扣碼</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>優惠碼</TableHead>
                  <TableHead>折扣類型</TableHead>
                  <TableHead>折扣值</TableHead>
                  <TableHead>適用範圍</TableHead>
                  <TableHead>有效期限</TableHead>
                  <TableHead>使用次數</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>WELCOME20</TableCell>
                  <TableCell>百分比</TableCell>
                  <TableCell>20%</TableCell>
                  <TableCell>所有服務</TableCell>
                  <TableCell>2025-05-31</TableCell>
                  <TableCell>85 / 100</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">啟用中</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>HAIRSPA100</TableCell>
                  <TableCell>固定金額</TableCell>
                  <TableCell>NT$100</TableCell>
                  <TableCell>美髮服務</TableCell>
                  <TableCell>2025-06-30</TableCell>
                  <TableCell>45 / 200</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">啟用中</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>SUMMER2025</TableCell>
                  <TableCell>百分比</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>所有服務</TableCell>
                  <TableCell>2025-04-10</TableCell>
                  <TableCell>150 / 150</TableCell>
                  <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已結束</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>促銷活動管理</CardTitle>
            <Button size="sm">
              <Gift className="mr-2 h-4 w-4" /> 新增活動
            </Button>
          </div>
          <CardDescription>管理平台促銷活動</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>活動名稱</TableHead>
                  <TableHead>活動類型</TableHead>
                  <TableHead>開始時間</TableHead>
                  <TableHead>結束時間</TableHead>
                  <TableHead>適用範圍</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>母親節特惠</TableCell>
                  <TableCell>限時折扣</TableCell>
                  <TableCell>2025-05-01</TableCell>
                  <TableCell>2025-05-15</TableCell>
                  <TableCell>SPA 服務</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">即將開始</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>新會員專屬</TableCell>
                  <TableCell>首次預約優惠</TableCell>
                  <TableCell>2025-04-01</TableCell>
                  <TableCell>2025-06-30</TableCell>
                  <TableCell>所有服務</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">進行中</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>週末限定</TableCell>
                  <TableCell>買一送一</TableCell>
                  <TableCell>2025-04-01</TableCell>
                  <TableCell>2025-04-30</TableCell>
                  <TableCell>美甲服務</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">進行中</span></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Reports and Analytics Tab
const ReportsAnalytics = () => {
  // Sample data for charts
  const monthlyData = [
    { month: '一月', users: 150, businesses: 25, appointments: 320, revenue: 45000 },
    { month: '二月', users: 230, businesses: 28, appointments: 420, revenue: 58000 },
    { month: '三月', users: 280, businesses: 32, appointments: 510, revenue: 72000 },
    { month: '四月', users: 310, businesses: 35, appointments: 580, revenue: 81000 },
    { month: '五月', users: 410, businesses: 40, appointments: 650, revenue: 92000 },
    { month: '六月', users: 520, businesses: 48, appointments: 720, revenue: 105000 },
  ];
  
  const categoryData = [
    { name: '美甲服務', value: 35 },
    { name: '美容護膚', value: 25 },
    { name: '美髮沙龍', value: 20 },
    { name: '其他服務', value: 20 },
  ];
  
  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">報表與分析</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月新增使用者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+26.8%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月新增商家</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+20.0%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月預約數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">580</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+13.7%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月平台收入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$81,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              較上月 <span className="text-green-500">+12.5%</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>月度增長趨勢</CardTitle>
            <CardDescription>過去六個月的主要數據增長趨勢</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8B5CF6" name="使用者" />
                  <Bar dataKey="businesses" fill="#D946EF" name="商家" />
                  <Bar dataKey="appointments" fill="#F97316" name="預約數" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>營收趨勢</CardTitle>
            <CardDescription>過去六個月的平台營收趨勢</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0EA5E9" name="營收 (NT$)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>服務類型分布</CardTitle>
            <CardDescription>各類服務的預約佔比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>熱門報表下載</CardTitle>
            <CardDescription>常用報表快速匯出</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">月度預約報表</p>
                  <p className="text-sm text-muted-foreground">本月所有預約的詳細數據</p>
                </div>
                <Button size="sm" variant="outline">匯出 CSV</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">商家績效報表</p>
                  <p className="text-sm text-muted-foreground">所有商家的預約與評價統計</p>
                </div>
                <Button size="sm" variant="outline">匯出 CSV</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">收入明細報表</p>
                  <p className="text-sm text-muted-foreground">所有交易與手續費收入明細</p>
                </div>
                <Button size="sm" variant="outline">匯出 CSV</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">用戶活躍度報表</p>
                  <p className="text-sm text-muted-foreground">使用者登入與活動分析</p>
                </div>
                <Button size="sm" variant="outline">匯出 CSV</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const menuItems = [
    { id: "overview", label: "總覽", icon: <Clipboard size={16} className="mr-2" /> },
    { id: "users", label: "用戶管理", icon: <Users size={16} className="mr-2" /> },
    { id: "businesses", label: "商家管理", icon: <Store size={16} className="mr-2" /> },
    { id: "appointments", label: "預約管理", icon: <Calendar size={16} className="mr-2" /> },
    { id: "reviews", label: "評價管理", icon: <Star size={16} className="mr-2" /> },
    { id: "cms", label: "內容管理", icon: <FileText size={16} className="mr-2" /> },
    { id: "settings", label: "系統設定", icon: <Settings size={16} className="mr-2" /> },
    { id: "marketing", label: "行銷推廣", icon: <Gift size={16} className="mr-2" /> },
    { id: "reports", label: "報表分析", icon: <BarChart3 size={16} className="mr-2" /> },
    { id: "logs", label: "操作日誌", icon: <History size={16} className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-4 bg-white shadow-sm border-b fixed top-0 w-full z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-beauty-primary font-bold text-xl font-serif">BeautifyHub</span>
            </Link>
            <span className="text-gray-400 text-xl">|</span>
            <h1 className="text-xl font-bold">管理者後台</h1>
          </div>
          <Link to="/" className="flex items-center text-beauty-muted hover:text-beauty-dark transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            返回首頁
          </Link>
        </div>
      </div>

      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r h-full fixed left-0 top-16 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3">主選單</h3>
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === item.id
                        ? "bg-beauty-primary/10 text-beauty-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pl-64 w-full">
          <div className="p-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                {menuItems.map(item => (
                  <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="overview">
                <DashboardOverview />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="businesses">
                <BusinessManagement />
              </TabsContent>
              
              <TabsContent value="appointments">
                <BookingManagement />
              </TabsContent>
              
              <TabsContent value="reviews">
                <ReviewManagement />
              </TabsContent>
              
              <TabsContent value="cms">
                <ContentManagement />
              </TabsContent>
              
              <TabsContent value="settings">
                <SystemSettings />
              </TabsContent>
              
              <TabsContent value="marketing">
                <MarketingManagement />
              </TabsContent>
              
              <TabsContent value="reports">
                <ReportsAnalytics />
              </TabsContent>
              
              <TabsContent value="logs">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">操作日誌</h2>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>系統操作日誌</CardTitle>
                        <Button variant="outline" size="sm">匯出日誌</Button>
                      </div>
                      <CardDescription>記錄管理員的所有操作行為</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">ID</TableHead>
                              <TableHead>管理員</TableHead>
                              <TableHead>操作行為</TableHead>
                              <TableHead>目標對象</TableHead>
                              <TableHead>IP 地址</TableHead>
                              <TableHead>操作時間</TableHead>
                              <TableHead className="text-right">詳情</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>系統管理員</TableCell>
                              <TableCell>新增商家</TableCell>
                              <TableCell>美綺美髮沙龍</TableCell>
                              <TableCell>192.168.1.1</TableCell>
                              <TableCell>2025-04-15 10:30</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">詳情</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2</TableCell>
                              <TableCell>內容管理員</TableCell>
                              <TableCell>編輯文章</TableCell>
                              <TableCell>如何保持肌膚水嫩的10個技巧</TableCell>
                              <TableCell>192.168.1.2</TableCell>
                              <TableCell>2025-04-15 09:45</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">詳情</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>3</TableCell>
                              <TableCell>系統管理員</TableCell>
                              <TableCell>審核評論</TableCell>
                              <TableCell>評論 ID: 123</TableCell>
                              <TableCell>192.168.1.1</TableCell>
                              <TableCell>2025-04-15 09:30</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">詳情</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>4</TableCell>
                              <TableCell>客服專員</TableCell>
                              <TableCell>回覆評論</TableCell>
                              <TableCell>評論 ID: 122</TableCell>
                              <TableCell>192.168.1.3</TableCell>
                              <TableCell>2025-04-15 09:15</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">詳情</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
