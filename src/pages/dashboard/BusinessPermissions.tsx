import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Package, PlusCircle, ShieldCheck, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPermissionSets, getAllPermissions } from "@/components/dashboard/businessUtils";
import { Checkbox } from "@/components/ui/checkbox";

interface Business {
  id: string;
  name: string;
  plan: string;
  owner: string;
  permissionSet: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissionSet: string;
}

const BusinessPermissionsPage = () => {
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([
    { id: "1", name: "美麗髮廊", plan: "專業版", owner: "李小花", permissionSet: "管理員權限" },
    { id: "2", name: "時尚美甲", plan: "基礎版", owner: "張美美", permissionSet: "員工權限" },
    { id: "3", name: "專業SPA中心", plan: "企業版", owner: "林大明", permissionSet: "超級管理員權限" },
    { id: "4", name: "自然美容", plan: "專業版", owner: "王小敏", permissionSet: "基本權限" },
    { id: "5", name: "精緻美容中心", plan: "基礎版", owner: "陳小華", permissionSet: "自訂權限" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [selectedPermissionSet, setSelectedPermissionSet] = useState("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isStaffPermissionDialogOpen, setIsStaffPermissionDialogOpen] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState<{id: string, name: string, category: string}[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  // 新增功能：設定新使用者或付費等級的預設權限
  const defaultPermissionsByPlan = {
    基礎版: ["view_appointments", "view_customers"],
    專業版: ["view_appointments", "view_customers", "create_appointments"],
    企業版: ["view_appointments", "view_customers", "create_appointments", "manage_staff"],
  };

  const handleSetDefaultPermissions = (plan: string) => {
    const defaultPermissions = defaultPermissionsByPlan[plan] || [];
    setSelectedPermissions(defaultPermissions);
    toast({
      title: "預設權限已設置",
      description: `已為 ${plan} 設置預設權限`,
    });
  };

  // 新增功能：針對指定使用者開啟或關閉特定權限
  const togglePermissionForUser = (userId: string, permissionId: string) => {
    setStaffMembers((prevStaff) =>
      prevStaff.map((staff) => {
        if (staff.id === userId) {
          const hasPermission = selectedPermissions.includes(permissionId);
          const updatedPermissions = hasPermission
            ? selectedPermissions.filter((id) => id !== permissionId)
            : [...selectedPermissions, permissionId];

          return { ...staff, permissionSet: "自訂權限", permissions: updatedPermissions };
        }
        return staff;
      })
    );

    toast({
      title: "權限已更新",
      description: `使用者 ${userId} 的權限已更新`,
    });
  };

  // Initialize data
  useEffect(() => {
    // Populate mock staff data for the first business
    const mockStaff = [
      { id: "1", name: "王小明", email: "wang@example.com", role: "店長", permissionSet: "超級管理員權限" },
      { id: "2", name: "李小花", email: "lee@example.com", role: "美髮師", permissionSet: "員工權限" },
      { id: "3", name: "陳大偉", email: "chen@example.com", role: "接待", permissionSet: "基本權限" },
      { id: "4", name: "林美麗", email: "lin@example.com", role: "美髮師", permissionSet: "員工權限" },
      { id: "5", name: "張志明", email: "zhang@example.com", role: "助理", permissionSet: "自訂權限" },
    ];
    setStaffMembers(mockStaff);
    
    // Get all available permissions
    setAvailablePermissions(getAllPermissions());
  }, []);

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setSelectedPermissionSet(business.permissionSet);
  };

  const handleUpdateBusinessPermission = () => {
    if (!selectedBusiness || !selectedPermissionSet) return;

    setBusinesses(businesses.map(business => 
      business.id === selectedBusiness.id
        ? { ...business, permissionSet: selectedPermissionSet }
        : business
    ));

    toast({
      title: "權限已更新",
      description: `${selectedBusiness.name} 的權限已設置為 ${selectedPermissionSet}`,
    });

    setIsPermissionDialogOpen(false);
  };

  const handleSelectStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    const permSets = getPermissionSets();
    
    if (staff.permissionSet === "自訂權限") {
      // Mock custom permissions
      setSelectedPermissions(["view_appointments", "create_appointments", "view_customers", "view_services"]);
    } else {
      // Map from permission set names to permission IDs
      const permissionNames = permSets[staff.permissionSet as keyof typeof permSets] || [];
      const allPerms = getAllPermissions();
      
      const permissionIds = allPerms
        .filter(p => permissionNames.includes(p.name))
        .map(p => p.id);
      
      setSelectedPermissions(permissionIds);
    }
    
    setEditMode(false);
  };

  const handleUpdateStaffPermission = () => {
    if (!selectedStaff) return;

    let permissionSetName = "自訂權限";
    
    // Check if selected permissions match any predefined set
    const permSets = getPermissionSets();
    const allPerms = getAllPermissions();
    
    for (const [setName, permissionNames] of Object.entries(permSets)) {
      if (setName === "自訂權限") continue;
      
      const permissionIds = allPerms
        .filter(p => permissionNames.includes(p.name))
        .map(p => p.id);
      
      // Check if arrays have same elements (regardless of order)
      const setsMatch = permissionIds.length === selectedPermissions.length && 
        permissionIds.every(id => selectedPermissions.includes(id));
      
      if (setsMatch) {
        permissionSetName = setName;
        break;
      }
    }

    setStaffMembers(staffMembers.map(staff => 
      staff.id === selectedStaff.id
        ? { ...staff, permissionSet: permissionSetName }
        : staff
    ));

    toast({
      title: "員工權限已更新",
      description: `${selectedStaff.name} 的權限已設置為 ${permissionSetName}`,
    });

    setIsStaffPermissionDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">商家權限管理</h1>
            <p className="text-beauty-muted">設置和管理商家及其員工的系統權限</p>
          </div>
        </div>

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="businesses" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              商家權限
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              員工權限
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              權限模板
            </TabsTrigger>
          </TabsList>

          {/* 商家權限 Tab */}
          <TabsContent value="businesses">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>商家列表</CardTitle>
                  <div>
                    <Input
                      placeholder="搜尋商家..."
                      className="w-64"
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
                      <TableHead>訂閱方案</TableHead>
                      <TableHead>負責人</TableHead>
                      <TableHead>權限組合</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBusinesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell>{business.id}</TableCell>
                        <TableCell>{business.name}</TableCell>
                        <TableCell>
                          <Badge className={
                            business.plan === "企業版" 
                              ? "bg-purple-100 text-purple-800" 
                              : business.plan === "專業版" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-gray-100 text-gray-800"
                          }>
                            {business.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{business.owner}</TableCell>
                        <TableCell>{business.permissionSet}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              handleSelectBusiness(business);
                              setIsPermissionDialogOpen(true);
                            }}
                          >
                            設置權限
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 員工權限 Tab */}
          <TabsContent value="staff">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>員工權限管理</CardTitle>
                <CardDescription>
                  管理特定商家下的員工權限
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="business-select">選擇商家</Label>
                  <Select onValueChange={(value) => {
                    // In a real app, this would load staff members for the selected business
                    console.log("Selected business ID:", value);
                  }}>
                    <SelectTrigger className="w-full md:w-1/3">
                      <SelectValue placeholder="選擇商家" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>商家</SelectLabel>
                        {businesses.map(business => (
                          <SelectItem key={business.id} value={business.id}>
                            {business.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>職位</TableHead>
                      <TableHead>權限組合</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffMembers.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>{staff.permissionSet}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              handleSelectStaff(staff);
                              setIsStaffPermissionDialogOpen(true);
                            }}
                          >
                            設置權限
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 權限模板 Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>權限模板</CardTitle>
                <CardDescription>
                  查看系統預設的權限組合，以及各訂閱方案可使用的權限
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(getPermissionSets()).filter(([name]) => name !== "自訂權限").map(([name, permissions]) => (
                    <Card key={name} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                          {name}
                          <Badge variant="outline" className="ml-2">
                            {permissions.length} 項權限
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                          {permissions.map((permission, index) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-sm">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-center text-muted-foreground">建立自訂模板</p>
                    <Button variant="outline" className="mt-4">
                      新增模板
                    </Button>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">方案權限對照表</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>權限</TableHead>
                        <TableHead>基礎版</TableHead>
                        <TableHead>專業版</TableHead>
                        <TableHead>企業版</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAllPermissions().map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell className="font-medium">{permission.name}</TableCell>
                          <TableCell>
                            {["view_appointments", "view_customers", "view_services"].includes(permission.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <span className="text-red-500">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {!["delete_customers", "delete_services", "export_reports", "system_settings"].includes(permission.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <span className="text-red-500">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Check className="h-4 w-4 text-green-500" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 商家權限設置對話框 */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>設置商家權限</DialogTitle>
          </DialogHeader>
          
          {selectedBusiness && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">商家</Label>
                <Input id="business-name" value={selectedBusiness.name} readOnly className="bg-gray-50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permission-set">權限組合</Label>
                <Select value={selectedPermissionSet} onValueChange={setSelectedPermissionSet}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇權限組合" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(getPermissionSets()).map((setName) => (
                      <SelectItem key={setName} value={setName}>
                        {setName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPermissionSet && (
                <div className="space-y-2 border p-3 rounded-md bg-gray-50">
                  <Label>權限內容</Label>
                  <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin">
                    {getPermissionSets()[selectedPermissionSet as keyof ReturnType<typeof getPermissionSets>]?.map((permission, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdateBusinessPermission}>
              確認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 員工權限設置對話框 */}
      <Dialog open={isStaffPermissionDialogOpen} onOpenChange={setIsStaffPermissionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>設置員工權限</DialogTitle>
          </DialogHeader>
          
          {selectedStaff && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-name">員工姓名</Label>
                  <Input id="staff-name" value={selectedStaff.name} readOnly className="bg-gray-50" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="staff-role">職位</Label>
                  <Input id="staff-role" value={selectedStaff.role} readOnly className="bg-gray-50" />
                </div>
              </div>
              
              <div className="space-y-2">
                {!editMode ? (
                  <>
                    <div className="flex justify-between items-center">
                      <Label>權限組合</Label>
                      <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
                        自訂權限
                      </Button>
                    </div>
                    <div className="border p-3 rounded-md bg-gray-50">
                      <div className="font-medium mb-2">{selectedStaff.permissionSet}</div>
                      <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                        {selectedPermissions.map((permId, index) => {
                          const perm = availablePermissions.find(p => p.id === permId);
                          return (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-sm">{perm?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <Label>自訂權限</Label>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setEditMode(false);
                        handleSelectStaff(selectedStaff);
                      }}>
                        使用預設組合
                      </Button>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto border p-3 rounded-md scrollbar-thin">
                      {Object.entries(
                        availablePermissions.reduce((acc, perm) => {
                          if (!acc[perm.category]) acc[perm.category] = [];
                          acc[perm.category].push(perm);
                          return acc;
                        }, {} as Record<string, typeof availablePermissions>)
                      ).map(([category, perms]) => (
                        <div key={category} className="mb-3">
                          <h4 className="font-medium mb-2">{category}</h4>
                          <div className="space-y-2 pl-2">
                            {perms.map((perm) => (
                              <div key={perm.id} className="flex items-center">
                                <Checkbox
                                  id={perm.id}
                                  checked={selectedPermissions.includes(perm.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedPermissions([...selectedPermissions, perm.id]);
                                    } else {
                                      setSelectedPermissions(
                                        selectedPermissions.filter(id => id !== perm.id)
                                      );
                                    }
                                  }}
                                />
                                <Label htmlFor={perm.id} className="ml-2 text-sm font-normal">
                                  {perm.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStaffPermissionDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdateStaffPermission}>
              確認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BusinessPermissionsPage;
