
import { useState } from "react";
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
import { Search, Store, Pencil, UserCog, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BusinessManagementDialog } from "@/components/dashboard/BusinessManagementDialog";
import { UserManagementDialog } from "@/components/dashboard/UserManagementDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserRole } from "@/contexts/AuthContext";

interface Business {
  id: string | number;
  name: string;
  owner: string;
  location: string;
  services: number;
  status: string;
  email?: string;
  phone?: string;
}

const BusinessesPage = () => {
  const { toast } = useToast();
  
  // Dummy data for demonstration
  const [businesses, setBusinesses] = useState<Business[]>([
    { id: 1, name: "美麗髮廊", owner: "李小花", location: "台北市", services: 12, status: "已認證" },
    { id: 2, name: "時尚美甲", owner: "張美美", location: "台中市", services: 8, status: "已認證" },
    { id: 3, name: "專業SPA中心", owner: "林大明", location: "高雄市", services: 15, status: "審核中" },
    { id: 4, name: "自然美容", owner: "王小敏", location: "台南市", services: 6, status: "已認證" },
    { id: 5, name: "精緻美容中心", owner: "陳小華", location: "台北市", services: 10, status: "未認證" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignAdminDialogOpen, setIsAssignAdminDialogOpen] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState<Business | undefined>(undefined);

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBusiness = (businessData: {
    name: string;
    owner: string;
    email: string;
    phone: string;
    location: string;
    description: string;
    status: "已認證" | "審核中" | "未認證" | "停用";
  }) => {
    const newBusiness = {
      id: businesses.length + 1,
      name: businessData.name,
      owner: businessData.owner,
      location: businessData.location,
      services: 0,
      status: businessData.status,
      email: businessData.email,
      phone: businessData.phone,
    };
    
    setBusinesses([...businesses, newBusiness]);
    
    toast({
      title: "新增成功",
      description: `商家 ${businessData.name} 已成功新增`,
    });
  };

  const handleEditBusiness = (businessData: {
    id?: string;
    name: string;
    owner: string;
    email: string;
    phone: string;
    location: string;
    description: string;
    status: "已認證" | "審核中" | "未認證" | "停用";
  }) => {
    if (!businessData.id) return;
    
    setBusinesses(businesses.map(business => 
      business.id.toString() === businessData.id
        ? { 
            ...business, 
            name: businessData.name, 
            owner: businessData.owner, 
            location: businessData.location, 
            status: businessData.status,
            email: businessData.email,
            phone: businessData.phone,
          }
        : business
    ));
    
    toast({
      title: "更新成功",
      description: `商家 ${businessData.name} 的資訊已更新`,
    });
  };

  const handleApproveBusiness = (businessData: {
    id?: string;
    name: string;
    owner: string;
    email: string;
    phone: string;
    location: string;
    description: string;
    status: "已認證" | "審核中" | "未認證" | "停用";
  }) => {
    if (!businessData.id) return;
    
    setBusinesses(businesses.map(business => 
      business.id.toString() === businessData.id
        ? { 
            ...business, 
            name: businessData.name, 
            owner: businessData.owner, 
            location: businessData.location, 
            status: businessData.status,
            email: businessData.email,
            phone: businessData.phone,
          }
        : business
    ));
    
    toast({
      title: "審核完成",
      description: businessData.status === "已認證" 
        ? `商家 ${businessData.name} 已通過認證` 
        : `商家 ${businessData.name} 未通過認證`,
    });
  };

  const handleDeleteBusiness = () => {
    if (!currentBusiness) return;
    
    setBusinesses(businesses.filter(business => business.id !== currentBusiness.id));
    
    toast({
      title: "刪除成功",
      description: `商家 ${currentBusiness.name} 已成功刪除`,
    });
    
    setIsDeleteDialogOpen(false);
  };

  const handleAssignAdmin = (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: "活躍" | "停用";
  }) => {
    // In a real application, this would create a new user with business admin permissions
    toast({
      title: "管理員已指派",
      description: `已為商家 ${currentBusiness?.name} 指派 ${userData.name} 為管理員`,
    });
  };

  const toggleBusinessStatus = (businessId: string | number) => {
    setBusinesses(businesses.map(business => 
      business.id === businessId
        ? { 
            ...business, 
            status: business.status === "已認證" ? "停用" : business.status === "停用" ? "已認證" : business.status 
          }
        : business
    ));
    
    const targetBusiness = businesses.find(business => business.id === businessId);
    if (!targetBusiness) return;
    
    const newStatus = targetBusiness.status === "已認證" ? "停用" : "已認證";
    
    toast({
      title: newStatus === "已認證" ? "商家已啟用" : "商家已停用",
      description: `商家 ${targetBusiness.name} 已被${newStatus === "已認證" ? "啟用" : "停用"}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">商家管理</h1>
            <p className="text-beauty-muted">管理和查看平台上的所有商家</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredBusinesses.map((business) => (
                  <TableRow key={business.id.toString()}>
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
                            : business.status === "停用"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}>
                        {business.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon"
                          onClick={() => {
                            setCurrentBusiness(business);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="icon"
                          onClick={() => {
                            setCurrentBusiness(business);
                            setIsAssignAdminDialogOpen(true);
                          }}
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        
                        {business.status === "審核中" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8"
                            onClick={() => {
                              setCurrentBusiness(business);
                              setIsApproveDialogOpen(true);
                            }}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        
                        {(business.status === "已認證" || business.status === "停用") && (
                          <Button variant="ghost" size="icon"
                            onClick={() => toggleBusinessStatus(business.id)}
                          >
                            {business.status === "已認證" ? (
                              <ToggleRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon"
                          onClick={() => {
                            setCurrentBusiness(business);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
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

      {/* Add Business Dialog */}
      <BusinessManagementDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddBusiness}
        mode="add"
      />

      {/* Edit Business Dialog */}
      {currentBusiness && (
        <BusinessManagementDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          business={currentBusiness}
          onSave={handleEditBusiness}
          mode="edit"
        />
      )}

      {/* Approve Business Dialog */}
      {currentBusiness && (
        <BusinessManagementDialog
          isOpen={isApproveDialogOpen}
          onClose={() => setIsApproveDialogOpen(false)}
          business={currentBusiness}
          onSave={handleApproveBusiness}
          mode="approve"
        />
      )}

      {/* Assign Admin Dialog */}
      {currentBusiness && (
        <UserManagementDialog
          isOpen={isAssignAdminDialogOpen}
          onClose={() => setIsAssignAdminDialogOpen(false)}
          onSave={handleAssignAdmin}
          mode="add"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此商家？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷，商家 {currentBusiness?.name} 的所有資料將被永久刪除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBusiness} className="bg-red-600 hover:bg-red-700">
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default BusinessesPage;
