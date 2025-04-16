
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const AppointmentsPage = () => {
  // Dummy data for demonstration
  const appointments = [
    { id: 1, user: "王小明", business: "美麗髮廊", service: "剪髮", date: "2025-04-18", time: "14:00", status: "已確認" },
    { id: 2, user: "張美美", business: "時尚美甲", service: "指甲彩繪", date: "2025-04-19", time: "10:30", status: "已確認" },
    { id: 3, user: "李小花", business: "專業SPA中心", service: "全身按摩", date: "2025-04-20", time: "15:00", status: "待確認" },
    { id: 4, user: "陳大偉", business: "美麗髮廊", service: "染髮", date: "2025-04-21", time: "16:30", status: "已確認" },
    { id: 5, user: "林美麗", business: "自然美容", service: "臉部護理", date: "2025-04-22", time: "11:00", status: "已取消" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">預約管理</h1>
            <p className="text-beauty-muted">查看和管理系統中的所有預約</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            查看日曆視圖
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>預約列表</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋預約..."
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>顧客</TableHead>
                  <TableHead>商家</TableHead>
                  <TableHead>服務</TableHead>
                  <TableHead>日期</TableHead>
                  <TableHead>時間</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.user}</TableCell>
                    <TableCell>{appointment.business}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === "已確認" 
                          ? "bg-green-100 text-green-800" 
                          : appointment.status === "待確認"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
