
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Store, Calendar, Clipboard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "overview"
                      ? "bg-beauty-primary/10 text-beauty-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Clipboard size={16} className="mr-2" />
                  總覽
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "users"
                      ? "bg-beauty-primary/10 text-beauty-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users size={16} className="mr-2" />
                  用戶管理
                </button>
                <button
                  onClick={() => setActiveTab("businesses")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "businesses"
                      ? "bg-beauty-primary/10 text-beauty-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Store size={16} className="mr-2" />
                  商家管理
                </button>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "appointments"
                      ? "bg-beauty-primary/10 text-beauty-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Calendar size={16} className="mr-2" />
                  預約管理
                </button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3">系統設定</h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  網站設定
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  權限管理
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  帳號設定
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pl-64 w-full">
          <div className="p-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="overview">總覽</TabsTrigger>
                <TabsTrigger value="users">用戶管理</TabsTrigger>
                <TabsTrigger value="businesses">商家管理</TabsTrigger>
                <TabsTrigger value="appointments">預約管理</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">儀表板總覽</h2>
                
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
              </TabsContent>
              
              <TabsContent value="users">
                <h2 className="text-2xl font-bold mb-6">用戶管理</h2>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>用戶列表</CardTitle>
                      <Button size="sm">新增用戶</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">用戶名稱</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">註冊日期</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">角色</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4">陳小明</td>
                            <td className="py-3 px-4">chen123@example.com</td>
                            <td className="py-3 px-4">2025-02-15</td>
                            <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">用戶</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">刪除</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">李美麗</td>
                            <td className="py-3 px-4">beauty@example.com</td>
                            <td className="py-3 px-4">2025-03-05</td>
                            <td className="py-3 px-4"><span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">商家</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">刪除</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">王大明</td>
                            <td className="py-3 px-4">wang@example.com</td>
                            <td className="py-3 px-4">2025-03-10</td>
                            <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">用戶</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">刪除</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">4</td>
                            <td className="py-3 px-4">林曉華</td>
                            <td className="py-3 px-4">admin@example.com</td>
                            <td className="py-3 px-4">2025-01-20</td>
                            <td className="py-3 px-4"><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">管理員</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">刪除</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="businesses">
                <h2 className="text-2xl font-bold mb-6">商家管理</h2>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>商家列表</CardTitle>
                      <Button size="sm">新增商家</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">商家名稱</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">分類</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">電話</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">狀態</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4">美綺美髮沙龍</td>
                            <td className="py-3 px-4">美髮沙龍</td>
                            <td className="py-3 px-4">02-2345-6789</td>
                            <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">營業中</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">停用</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">晶晶美甲工作室</td>
                            <td className="py-3 px-4">美甲服務</td>
                            <td className="py-3 px-4">02-3456-7890</td>
                            <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">營業中</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">停用</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">自然美SPA中心</td>
                            <td className="py-3 px-4">美容護膚</td>
                            <td className="py-3 px-4">02-4567-8901</td>
                            <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">審核中</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-green-500">核准</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">4</td>
                            <td className="py-3 px-4">光采美妍中心</td>
                            <td className="py-3 px-4">面部護理</td>
                            <td className="py-3 px-4">02-5678-9012</td>
                            <td className="py-3 px-4"><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已停用</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">編輯</Button>
                              <Button variant="ghost" size="sm" className="text-green-500">啟用</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <h2 className="text-2xl font-bold mb-6">預約管理</h2>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>預約記錄</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">匯出資料</Button>
                        <Button size="sm">新增預約</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">用戶</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">商家</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">服務項目</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">預約時間</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">狀態</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4">陳小明</td>
                            <td className="py-3 px-4">美綺美髮沙龍</td>
                            <td className="py-3 px-4">精緻剪髮造型</td>
                            <td className="py-3 px-4">2025-04-15 14:30</td>
                            <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">已確認</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">詳情</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">取消</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">王大明</td>
                            <td className="py-3 px-4">晶晶美甲工作室</td>
                            <td className="py-3 px-4">日式美甲</td>
                            <td className="py-3 px-4">2025-04-16 10:00</td>
                            <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">已完成</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">詳情</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">李美麗</td>
                            <td className="py-3 px-4">自然美SPA中心</td>
                            <td className="py-3 px-4">全身按摩</td>
                            <td className="py-3 px-4">2025-04-17 15:00</td>
                            <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">待確認</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">詳情</Button>
                              <Button variant="ghost" size="sm" className="text-blue-500">確認</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">4</td>
                            <td className="py-3 px-4">林曉華</td>
                            <td className="py-3 px-4">光采美妍中心</td>
                            <td className="py-3 px-4">保濕面膜護理</td>
                            <td className="py-3 px-4">2025-04-15 11:30</td>
                            <td className="py-3 px-4"><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">已取消</span></td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">詳情</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
