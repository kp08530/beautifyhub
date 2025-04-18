
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star,
  Ban,
  Clock,
  Calendar,
  Edit,
  PlusCircle,
  Save
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface CustomerRecord {
  id: string;
  date: string;
  service: string;
  price: number;
  staff: string;
  note?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  visits: number;
  lastVisit: string;
  status: "regular" | "vip" | "blacklist";
  note?: string;
  totalSpent: number;
}

interface CustomerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export function CustomerDetailsDialog({
  open,
  onOpenChange,
  customer
}: CustomerDetailsDialogProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [customerData, setCustomerData] = useState<Customer | null>(customer);
  
  // Sample consumption records
  const [records, setRecords] = useState<CustomerRecord[]>([
    {
      id: "1",
      date: "2025-04-10",
      service: "基礎臉部護理",
      price: 1800,
      staff: "王小明",
      note: "客戶對服務很滿意"
    },
    {
      id: "2",
      date: "2025-03-25",
      service: "深層清潔",
      price: 2200,
      staff: "李小花",
      note: "客戶皮膚狀況良好"
    },
    {
      id: "3",
      date: "2025-03-05",
      service: "全臉煥膚",
      price: 2800,
      staff: "張大華",
    }
  ]);
  
  const [newRecord, setNewRecord] = useState<Omit<CustomerRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    service: "",
    price: 0,
    staff: "",
    note: ""
  });

  const handleCustomerChange = (field: keyof Customer, value: any) => {
    if (!customerData) return;
    
    setCustomerData({
      ...customerData,
      [field]: value
    });
  };

  const handleSaveCustomer = () => {
    if (!customerData) return;
    
    toast({
      title: "客戶資料已更新",
      description: `${customerData.name} 的資料已成功更新`,
    });
    
    setIsEditing(false);
  };

  const handleNewRecordChange = (field: keyof Omit<CustomerRecord, 'id'>, value: any) => {
    setNewRecord({
      ...newRecord,
      [field]: field === 'price' ? Number(value) : value
    });
  };

  const handleAddRecord = () => {
    const newRecordWithId: CustomerRecord = {
      ...newRecord,
      id: Date.now().toString()
    };
    
    setRecords([newRecordWithId, ...records]);
    
    // Reset form
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      service: "",
      price: 0,
      staff: "",
      note: ""
    });
    
    setIsAddingRecord(false);
    
    toast({
      title: "消費紀錄已新增",
      description: "客戶的消費紀錄已成功新增",
    });
  };

  const toggleVipStatus = () => {
    if (!customerData) return;
    
    const newStatus = customerData.status === "vip" ? "regular" : "vip";
    
    setCustomerData({
      ...customerData,
      status: newStatus
    });
    
    toast({
      title: newStatus === "vip" ? "已設為VIP客戶" : "已取消VIP狀態",
      description: `${customerData.name} ${newStatus === "vip" ? "已設為VIP客戶" : "已從VIP客戶名單中移除"}`,
    });
  };

  const toggleBlacklist = () => {
    if (!customerData) return;
    
    const newStatus = customerData.status === "blacklist" ? "regular" : "blacklist";
    
    setCustomerData({
      ...customerData,
      status: newStatus
    });
    
    toast({
      title: newStatus === "blacklist" ? "已加入黑名單" : "已從黑名單移除",
      description: `${customerData.name} ${newStatus === "blacklist" ? "已加入黑名單" : "已從黑名單中移除"}`,
    });
  };

  if (!customerData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                {customerData.name}
                {customerData.status === "vip" && (
                  <Badge variant="default" className="bg-amber-500">
                    <Star className="h-3 w-3 mr-1" />
                    VIP
                  </Badge>
                )}
                {customerData.status === "blacklist" && (
                  <Badge variant="destructive">
                    <Ban className="h-3 w-3 mr-1" />
                    黑名單
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                客戶編號: {customerData.id} | 電話: {customerData.phone}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={customerData.status === "vip" ? "default" : "outline"} 
                size="sm"
                onClick={toggleVipStatus}
                className={customerData.status === "vip" ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                <Star className="h-4 w-4 mr-1" />
                {customerData.status === "vip" ? "取消VIP" : "設為VIP"}
              </Button>
              <Button 
                variant={customerData.status === "blacklist" ? "destructive" : "outline"} 
                size="sm"
                onClick={toggleBlacklist}
              >
                <Ban className="h-4 w-4 mr-1" />
                {customerData.status === "blacklist" ? "解除黑名單" : "加入黑名單"}
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="records" className="flex-1">消費紀錄</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">客戶資料</TabsTrigger>
          </TabsList>
          
          <TabsContent value="records" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">消費紀錄</h3>
                <p className="text-sm text-beauty-muted">
                  總消費金額: NT$ {customerData.totalSpent.toLocaleString()} | 消費次數: {customerData.visits}次
                </p>
              </div>
              
              <Button onClick={() => setIsAddingRecord(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                新增消費紀錄
              </Button>
            </div>
            
            {isAddingRecord && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <h4 className="font-medium">新增消費紀錄</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">日期</label>
                    <Input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => handleNewRecordChange('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">服務項目</label>
                    <Input
                      placeholder="輸入服務項目"
                      value={newRecord.service}
                      onChange={(e) => handleNewRecordChange('service', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">金額 (NT$)</label>
                    <Input
                      type="number"
                      placeholder="輸入金額"
                      value={newRecord.price || ''}
                      onChange={(e) => handleNewRecordChange('price', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">服務人員</label>
                    <Input
                      placeholder="輸入服務人員"
                      value={newRecord.staff}
                      onChange={(e) => handleNewRecordChange('staff', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">備註</label>
                  <Textarea
                    placeholder="輸入備註內容（選填）"
                    value={newRecord.note || ''}
                    onChange={(e) => handleNewRecordChange('note', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddRecord}>
                    新增紀錄
                  </Button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>服務項目</TableHead>
                    <TableHead>金額 (NT$)</TableHead>
                    <TableHead>服務人員</TableHead>
                    <TableHead>備註</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.service}</TableCell>
                      <TableCell>{record.price.toLocaleString()}</TableCell>
                      <TableCell>{record.staff}</TableCell>
                      <TableCell>{record.note || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">客戶資料</h3>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (isEditing) {
                      handleSaveCustomer();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      儲存資料
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      編輯資料
                    </>
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">客戶姓名</label>
                  {isEditing ? (
                    <Input
                      value={customerData.name}
                      onChange={(e) => handleCustomerChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 border rounded-md bg-gray-50">{customerData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">電話</label>
                  {isEditing ? (
                    <Input
                      value={customerData.phone}
                      onChange={(e) => handleCustomerChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 border rounded-md bg-gray-50">{customerData.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">電子郵件</label>
                  {isEditing ? (
                    <Input
                      value={customerData.email || ''}
                      onChange={(e) => handleCustomerChange('email', e.target.value)}
                      placeholder="輸入電子郵件（選填）"
                    />
                  ) : (
                    <p className="p-2 border rounded-md bg-gray-50">{customerData.email || '-'}</p>
                  )}
                </div>
                
                <div className="flex gap-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block">來訪次數</label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customerData.visits}次</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">最近造訪</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customerData.lastVisit}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">客戶備註</label>
                {isEditing ? (
                  <Textarea
                    value={customerData.note || ''}
                    onChange={(e) => handleCustomerChange('note', e.target.value)}
                    placeholder="輸入客戶備註（選填）"
                    rows={4}
                  />
                ) : (
                  <p className="p-2 border rounded-md bg-gray-50 min-h-24">
                    {customerData.note || '無客戶備註'}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
