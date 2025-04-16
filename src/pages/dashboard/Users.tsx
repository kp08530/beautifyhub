
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
import { Search, UserPlus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Input } from "@/components/ui/input";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UsersPage = () => {
  const { toast } = useToast();
  // Dummy data for demonstration
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "王小明", email: "wang@example.com", role: "user", status: "活躍" },
    { id: "2", name: "李小花", email: "lee@example.com", role: "business", status: "活躍" },
    { id: "3", name: "陳大偉", email: "chen@example.com", role: "user", status: "停用" },
    { id: "4", name: "林美麗", email: "lin@example.com", role: "business", status: "活躍" },
    { id: "5", name: "張志明", email: "zhang@example.com", role: "user", status: "活躍" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: "活躍" | "停用";
  }) => {
    const newUser = {
      id: String(users.length + 1),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "新增成功",
      description: `用戶 ${userData.name} 已成功新增`,
    });
  };

  const handleEditUser = (userData: {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: "活躍" | "停用";
  }) => {
    if (!userData.id) return;
    
    setUsers(users.map(user => 
      user.id === userData.id
        ? { ...user, name: userData.name, email: userData.email, role: userData.role, status: userData.status }
        : user
    ));
    
    toast({
      title: "更新成功",
      description: `用戶 ${userData.name} 的資訊已更新`,
    });
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    setUsers(users.filter(user => user.id !== currentUser.id));
    
    toast({
      title: "刪除成功",
      description: `用戶 ${currentUser.name} 已成功刪除`,
    });
    
    setIsDeleteDialogOpen(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId
        ? { ...user, status: user.status === "活躍" ? "停用" : "活躍" }
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    if (!targetUser) return;
    
    const newStatus = targetUser.status === "活躍" ? "停用" : "活躍";
    
    toast({
      title: `用戶${newStatus === "活躍" ? "啟用" : "停用"}成功`,
      description: `用戶 ${targetUser.name} 已被${newStatus === "活躍" ? "啟用" : "停用"}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">用戶管理</h1>
            <p className="text-beauty-muted">管理和查看系統中的所有用戶</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            新增用戶
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>用戶列表</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋用戶..."
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
                  <TableHead>姓名</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === "admin" ? "管理員" : user.role === "business" ? "商家" : "用戶"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "活躍" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" 
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "活躍" ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-red-600" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon"
                          onClick={() => {
                            setCurrentUser(user);
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

      {/* Add User Dialog */}
      <UserManagementDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddUser}
        mode="add"
      />

      {/* Edit User Dialog */}
      {currentUser && (
        <UserManagementDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          user={currentUser}
          onSave={handleEditUser}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此用戶？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷，用戶 {currentUser?.name} 的所有資料將被永久刪除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default UsersPage;
