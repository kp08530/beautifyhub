
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
import { Eye, CheckCircle, XCircle } from "lucide-react";

const AdvertisementsPage = () => {
  // Dummy data for demonstration
  const advertisements = [
    { id: 1, title: "春季美容優惠", business: "美麗髮廊", startDate: "2025-04-01", endDate: "2025-04-30", status: "待審核" },
    { id: 2, title: "母親節特惠", business: "時尚美甲", startDate: "2025-05-01", endDate: "2025-05-15", status: "已核准" },
    { id: 3, title: "週年慶活動", business: "專業SPA中心", startDate: "2025-06-01", endDate: "2025-06-30", status: "已拒絕" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">廣告管理</h1>
            <p className="text-beauty-muted">管理和審核商家的廣告申請</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>廣告申請列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>標題</TableHead>
                  <TableHead>商家</TableHead>
                  <TableHead>開始日期</TableHead>
                  <TableHead>結束日期</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advertisements.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>{ad.id}</TableCell>
                    <TableCell>{ad.title}</TableCell>
                    <TableCell>{ad.business}</TableCell>
                    <TableCell>{ad.startDate}</TableCell>
                    <TableCell>{ad.endDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ad.status === "已核准" 
                          ? "bg-green-100 text-green-800"
                          : ad.status === "待審核"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {ad.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
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

export default AdvertisementsPage;
