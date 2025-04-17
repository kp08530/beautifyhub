
import React, { useState } from "react";
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
  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: (user?.role as UserRole) || (mode === "assign" ? "business" : "user"),
    status: (user?.status as "活躍" | "停用") || "活躍",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
                placeholder={mode === "edit" || mode === "assign" ? "不變更請留空" : ""}
                required={mode === "add"}
              />
            </div>
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
                  {mode !== "assign" && <SelectItem value="admin">管理員</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            {mode !== "assign" && (
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
            )}
            {mode === "assign" && (
              <div className="text-sm text-muted-foreground mt-2">
                此操作將授予用戶管理 {businessName || "該商家"} 的權限。
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">{mode === "add" ? "新增" : mode === "edit" ? "保存" : "指派"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
