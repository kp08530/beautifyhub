
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
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, parse } from "date-fns";

interface AdvertisementFormData {
  id?: string | number;
  title: string;
  business: string;
  startDate: string;
  endDate: string;
  position: "優先" | "一般" | "次要";
  status: "待審核" | "已核准" | "已拒絕";
  imageUrl?: string;
}

interface AdvertisementManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  advertisement?: {
    id?: string | number;
    title: string;
    business: string;
    startDate: string;
    endDate: string;
    position?: string;
    status: string;
    imageUrl?: string;
  };
  onSave: (adData: AdvertisementFormData) => void;
  mode: "add" | "edit" | "review";
}

export function AdvertisementManagementDialog({
  isOpen,
  onClose,
  advertisement,
  onSave,
  mode,
}: AdvertisementManagementDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AdvertisementFormData>({
    id: advertisement?.id || "",
    title: advertisement?.title || "",
    business: advertisement?.business || "",
    startDate: advertisement?.startDate || format(new Date(), "yyyy-MM-dd"),
    endDate: advertisement?.endDate || format(addDays(new Date(), 7), "yyyy-MM-dd"),
    position: (advertisement?.position as "優先" | "一般" | "次要") || "一般",
    status: (advertisement?.status as "待審核" | "已核准" | "已拒絕") || "待審核",
    imageUrl: advertisement?.imageUrl || "",
  });

  const [startDate, setStartDate] = useState<Date | undefined>(
    advertisement?.startDate 
      ? parse(advertisement.startDate, "yyyy-MM-dd", new Date())
      : new Date()
  );
  
  const [endDate, setEndDate] = useState<Date | undefined>(
    advertisement?.endDate 
      ? parse(advertisement.endDate, "yyyy-MM-dd", new Date())
      : addDays(new Date(), 7)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        startDate: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        endDate: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.business || !formData.startDate || !formData.endDate) {
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
                ? "新增廣告" 
                : mode === "edit" 
                  ? "編輯廣告" 
                  : "審核廣告申請"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add" 
                ? "填寫以下資訊以新增廣告" 
                : mode === "edit"
                  ? "修改廣告資訊"
                  : "審核並設置廣告展示資訊"}
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
                  readOnly
                  className="col-span-3"
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                廣告標題
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="business" className="text-right">
                商家
              </Label>
              <Input
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="col-span-3"
                readOnly={mode === "review"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                圖片URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">開始日期</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={startDate}
                  setDate={handleStartDateChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">結束日期</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={endDate}
                  setDate={handleEndDateChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                輪播位置
              </Label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="優先">優先</option>
                <option value="一般">一般</option>
                <option value="次要">次要</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                狀態
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="待審核">待審核</option>
                <option value="已核准">已核准</option>
                <option value="已拒絕">已拒絕</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              {mode === "add" ? "新增" : mode === "edit" ? "保存" : "核准"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
