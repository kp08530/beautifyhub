
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const ReportsPage = () => {
  // Dummy data for revenue chart
  const revenueData = [
    { name: '一月', 收入: 120000 },
    { name: '二月', 收入: 135000 },
    { name: '三月', 收入: 150000 },
    { name: '四月', 收入: 180000 },
    { name: '五月', 收入: 190000 },
    { name: '六月', 收入: 200000 },
  ];

  // Dummy data for user growth
  const userGrowthData = [
    { name: '一月', 新用戶: 50, 總用戶: 300 },
    { name: '二月', 新用戶: 80, 總用戶: 380 },
    { name: '三月', 新用戶: 70, 總用戶: 450 },
    { name: '四月', 新用戶: 90, 總用戶: 540 },
    { name: '五月', 新用戶: 120, 總用戶: 660 },
    { name: '六月', 新用戶: 100, 總用戶: 760 },
  ];

  // Dummy data for service category distribution
  const serviceData = [
    { name: '美髮', value: 40 },
    { name: '美甲', value: 25 },
    { name: '美容', value: 20 },
    { name: 'SPA', value: 15 },
  ];

  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">報表分析</h1>
            <p className="text-beauty-muted">查看平台業務和營收分析報表</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              日期範圍
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              下載報表
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總營收</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NT$ 1,250,000</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-600 inline" />
                <span className="text-green-600">+18%</span> 相比上一季度
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總用戶數</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,480</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-600 inline" />
                <span className="text-green-600">+12%</span> 相比上一季度
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總商家數</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">183</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-600 inline" />
                <span className="text-green-600">+8%</span> 相比上一季度
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>月度營收趨勢</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="收入" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>用戶增長趨勢</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={userGrowthData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="新用戶" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="總用戶" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>服務類別分佈</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
