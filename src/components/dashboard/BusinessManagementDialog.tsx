
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessFormData {
  id?: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  businessType: string;
  status: "已認證" | "審核中" | "未認證" | "停用";
}

interface BusinessManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  business?: {
    id?: number | string;
    name: string;
    owner: string;
    location: string;
    status: string;
    email?: string;
    phone?: string;
    description?: string;
    services?: number;
    businessType?: string;
  };
  onSave: (businessData: BusinessFormData) => void;
  mode: "add" | "edit" | "approve";
}

const businessTypes = [
  { value: "hair", label: "美髮" },
  { value: "skin", label: "美容" },
  { value: "nail", label: "美甲" },
  { value: "makeup", label: "彩妝" },
  { value: "spa", label: "SPA" },
  { value: "other", label: "其他" },
];

export function BusinessManagementDialog({
  isOpen,
  onClose,
  business,
  onSave,
  mode,
}: BusinessManagementDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BusinessFormData>({
    id: business?.id?.toString() || "",
    name: business?.name || "",
    owner: business?.owner || "",
    email: business?.email || "",
    phone: business?.phone || "",
    location: business?.location || "",
    description: business?.description || "",
    businessType: business?.businessType || "hair",
    status: (business?.status as "已認證" | "審核中" | "未認證" | "停用") || "審核中",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.owner || !formData.location) {
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
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" 
                ? "新增商家" 
                : mode === "edit" 
                  ? "編輯商家資訊" 
                  : "審核商家申請"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add" 
                ? "填寫以下資訊以新增商家" 
                : mode === "edit"
                  ? "修改商家資訊"
                  : "審核並更新商家資訊"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {mode !== "add" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  readOnly={mode === "approve"}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                商家名稱
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
              <Label htmlFor="businessType" className="text-right">
                營業類型
              </Label>
              <Select
                name="businessType"
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange("businessType", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="選擇營業類型" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="owner" className="text-right">
                負責人
              </Label>
              <Input
                id="owner"
                name="owner"
                value={formData.owner}
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
              <Label htmlFor="phone" className="text-right">
                電話
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                地點
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                描述
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
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
                  <SelectItem value="已認證">已認證</SelectItem>
                  <SelectItem value="審核中">審核中</SelectItem>
                  <SelectItem value="未認證">未認證</SelectItem>
                  <SelectItem value="停用">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              {mode === "add" 
                ? "新增" 
                : mode === "edit" 
                  ? "保存" 
                  : "核准"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
