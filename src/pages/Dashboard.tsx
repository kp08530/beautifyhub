
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Calendar, DollarSign, UserPlus, Users, Store, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dummy data for the overview chart
  const weeklyData = [
    { day: '週一', 收入: 20000, 預約: 15 },
    { day: '週二', 收入: 25000, 預約: 20 },
    { day: '週三', 收入: 30000, 預約: 25 },
    { day: '週四', 收入: 22000, 預約: 18 },
    { day: '週五', 收入: 35000, 預約: 30 },
    { day: '週六', 收入: 40000, 預約: 35 },
    { day: '週日', 收入: 28000, 預約: 22 },
  ];

  // Dummy data for recent activities
  const recentActivities = [
    { id: 1, type: "新用戶", user: "林小美", time: "10 分鐘前" },
    { id: 2, type: "新預約", user: "王大明", business: "美麗髮廊", service: "剪髮", time: "25 分鐘前" },
    { id: 3, type: "新商家", business: "晶亮美甲", time: "1 小時前" },
    { id: 4, type: "評價", user: "陳小華", business: "自然美容", rating: 5, time: "3 小時前" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">歡迎回來</h1>
          <p className="text-beauty-muted">查看您的業務概況</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日預約</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +10% 相比昨天
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月營收</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NT$ 245,000</div>
              <p className="text-xs text-muted-foreground">
                +25% 相比上個月
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活躍商家</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +5% 相比上個月
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活躍用戶</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,204</div>
              <p className="text-xs text-muted-foreground">
                +12% 相比上個月
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>本週概況</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="收入" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="預約" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>最近活動</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    {activity.type === "新用戶" && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "新預約" && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "新商家" && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Store className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "評價" && (
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <div className="text-xs font-bold">⭐</div>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.type === "新用戶" && `新用戶 ${activity.user} 註冊了帳號`}
                        {activity.type === "新預約" && `${activity.user} 預約了 ${activity.business} 的 ${activity.service}`}
                        {activity.type === "新商家" && `新商家 ${activity.business} 加入了平台`}
                        {activity.type === "評價" && `${activity.user} 給 ${activity.business} 評價了 ${activity.rating} 星`}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/dashboard/reports">
                  查看更多活動
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
