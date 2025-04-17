
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserFormData {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "活躍" | "停用";
}

interface UserManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  onSave: (userData: UserFormData) => void;
  mode: "add" | "edit" | "assign";
  businessId?: string;
  businessName?: string;
}

// Mock existing users for searching
const mockUsers = [
  { id: "user1", name: "王大明", email: "wang@example.com", role: "user", status: "活躍" },
  { id: "user2", name: "李小美", email: "li@example.com", role: "user", status: "活躍" },
  { id: "user3", name: "張小華", email: "zhang@example.com", role: "user", status: "活躍" },
  { id: "user4", name: "陳美麗", email: "chen@example.com", role: "business", status: "活躍" },
  { id: "user5", name: "劉大寶", email: "liu@example.com", role: "user", status: "停用" },
];

export function UserManagementDialog({
  isOpen,
  onClose,
  user,
  onSave,
  mode,
  businessId,
  businessName,
}: UserManagementDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  
  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: (user?.role as UserRole) || (mode === "assign" ? "business" : "user"),
    status: (user?.status as "活躍" | "停用") || "活躍",
  });

  // Reset form when dialog opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        role: (user?.role as UserRole) || (mode === "assign" ? "business" : "user"),
        status: (user?.status as "活躍" | "停用") || "活躍",
      });
      setActiveTab("existing");
      setSearchTerm("");
      setSelectedUser(null);
    }
  }, [isOpen, user, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "existing" && mode === "assign") {
      if (!selectedUser) {
        toast({
          title: "請選擇用戶",
          description: "請選擇一個現有用戶或新增一個用戶",
          variant: "destructive",
        });
        return;
      }
      
      onSave({
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: "business",
        status: selectedUser.status as "活躍" | "停用",
      });
      
      onClose();
      return;
    }
    
    if (!formData.name || !formData.email || (mode === "add" && !formData.password)) {
      toast({
        title: "欄位不完整",
        description: "請填寫所有必填欄位",
        variant: "destructive",
      });
      return;
    }
    
    onSave(formData);
    onClose();
  };

  const filteredUsers = mockUsers.filter(
    mockUser => 
      (mockUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       mockUser.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      mockUser.status === "活躍"
  );

  const handleSelectExistingUser = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" 
                ? "新增用戶" 
                : mode === "edit" 
                  ? "編輯用戶" 
                  : `指派管理員到 ${businessName || "商家"}`}
            </DialogTitle>
            <DialogDescription>
              {mode === "add" 
                ? "填寫以下資訊以新增用戶" 
                : mode === "edit" 
                  ? "修改用戶資訊" 
                  : `設定用戶為 ${businessName || "商家"} 的管理員`}
            </DialogDescription>
          </DialogHeader>
          
          {mode === "assign" && (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "existing" | "new")} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">選擇已有用戶</TabsTrigger>
                <TabsTrigger value="new">新增用戶</TabsTrigger>
              </TabsList>
              
              <TabsContent value="existing" className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋用戶名稱或 Email"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="h-[220px] overflow-y-auto pr-1 border rounded-md">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div 
                        key={user.id}
                        className={`p-3 border-b flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedUser?.id === user.id ? 'bg-beauty-primary/10' : ''
                        }`}
                        onClick={() => handleSelectExistingUser(user)}
                      >
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {user.role === "admin" ? "管理員" : user.role === "business" ? "商家" : "用戶"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      {searchTerm ? "沒有找到符合的用戶" : "請輸入搜尋條件"}
                    </div>
                  )}
                </div>
                
                {selectedUser && (
                  <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">已選擇: {selectedUser.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => setSelectedUser(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="new" className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    密碼
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          {(mode !== "assign" || activeTab === "new") && (
            <div className="grid gap-4 py-4">
              {mode === "edit" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    ID
                  </Label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              )}
              
              {mode !== "assign" && activeTab !== "new" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      姓名
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      {mode === "add" ? "密碼" : "新密碼"}
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder={mode === "edit" ? "不變更請留空" : ""}
                      required={mode === "add"}
                    />
                  </div>
                </>
              )}
              
              {mode !== "assign" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      角色
                    </Label>
                    <Select
                      name="role"
                      value={formData.role}
                      onValueChange={(value) => handleSelectChange("role", value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="選擇角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">用戶</SelectItem>
                        <SelectItem value="business">商家</SelectItem>
                        <SelectItem value="admin">管理員</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      狀態
                    </Label>
                    <Select
                      name="status"
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="選擇狀態" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="活躍">活躍</SelectItem>
                        <SelectItem value="停用">停用</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              {mode === "assign" && activeTab === "new" && (
                <div className="text-sm text-muted-foreground mt-2">
                  此操作將創建新用戶並授予管理 {businessName || "該商家"} 的權限。
                </div>
              )}
              
              {mode === "assign" && activeTab === "existing" && selectedUser && (
                <div className="text-sm text-muted-foreground mt-2">
                  此操作將授予用戶 {selectedUser.name} 管理 {businessName || "該商家"} 的權限。
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              {mode === "add" 
                ? "新增" 
                : mode === "edit" 
                  ? "保存" 
                  : activeTab === "existing" 
                    ? "指派" 
                    : "新增並指派"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
