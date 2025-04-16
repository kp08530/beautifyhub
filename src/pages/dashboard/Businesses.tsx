
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
import { Search, Store, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const BusinessesPage = () => {
  // Dummy data for demonstration
  const businesses = [
    { id: 1, name: "美麗髮廊", owner: "李小花", location: "台北市", services: 12, status: "已認證" },
    { id: 2, name: "時尚美甲", owner: "張美美", location: "台中市", services: 8, status: "已認證" },
    { id: 3, name: "專業SPA中心", owner: "林大明", location: "高雄市", services: 15, status: "審核中" },
    { id: 4, name: "自然美容", owner: "王小敏", location: "台南市", services: 6, status: "已認證" },
    { id: 5, name: "精緻美容中心", owner: "陳小華", location: "台北市", services: 10, status: "未認證" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">商家管理</h1>
            <p className="text-beauty-muted">管理和查看平台上的所有商家</p>
          </div>
          <Button>
            <Store className="mr-2 h-4 w-4" />
            新增商家
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>商家列表</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋商家..."
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
                  <TableHead>商家名稱</TableHead>
                  <TableHead>負責人</TableHead>
                  <TableHead>地點</TableHead>
                  <TableHead>服務數量</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell>{business.id}</TableCell>
                    <TableCell>{business.name}</TableCell>
                    <TableCell>{business.owner}</TableCell>
                    <TableCell>{business.location}</TableCell>
                    <TableCell>{business.services}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        business.status === "已認證" 
                          ? "bg-green-100 text-green-800" 
                          : business.status === "審核中"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {business.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4 text-red-600" />
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

export default BusinessesPage;
