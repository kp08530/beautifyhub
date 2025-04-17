
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
import { BellRing, Search, Edit2, Trash2, Eye, Calendar, Image, FileText, Link as LinkIcon, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

type NotificationStatus = "草稿" | "已發送" | "已排程";

interface Notification {
  id: string | number;
  title: string;
  content: string;
  audience: "all" | "admin" | "business" | "user" | "specific";
  recipients?: string[];
  schedule?: Date;
  scheduleSent?: boolean;
  attachment?: {
    type: "image" | "file" | "link";
    url: string;
    name: string;
  };
  createdAt: Date;
  status: NotificationStatus;
}

const NotificationsPage = () => {
  const { toast } = useToast();
  
  // Dummy data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "系統維護通知",
      content: "系統將於5月1日晚上10點進行例行維護，屆時系統將暫停服務約30分鐘。",
      audience: "all",
      createdAt: new Date(2025, 3, 15),
      status: "已發送",
    },
    {
      id: 2,
      title: "新功能上線",
      content: "我們新增了預約提醒功能，現在您可以收到預約前的自動提醒。",
      audience: "user",
      createdAt: new Date(2025, 3, 20),
      status: "已發送",
    },
    {
      id: 3,
      title: "母親節優惠活動",
      content: "母親節即將到來，平台商家紛紛推出優惠活動，趕快來看看吧！",
      audience: "all",
      schedule: new Date(2025, 4, 1),
      scheduleSent: false,
      attachment: {
        type: "image",
        url: "https://source.unsplash.com/random/800x600?mother",
        name: "母親節活動.jpg",
      },
      createdAt: new Date(2025, 3, 25),
      status: "已排程",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  
  // Form data for creating/editing notifications
  const [formData, setFormData] = useState<{
    id?: string | number;
    title: string;
    content: string;
    audience: "all" | "admin" | "business" | "user" | "specific";
    recipients?: string[];
    schedule?: Date;
    attachment?: {
      type: "image" | "file" | "link";
      url: string;
      name: string;
    };
  }>({
    title: "",
    content: "",
    audience: "all",
    recipients: [],
  });

  const statuses: {value: NotificationStatus, label: string}[] = [
    { value: "草稿", label: "草稿" },
    { value: "已發送", label: "已發送" },
    { value: "已排程", label: "已排程" },
  ];

  const filteredNotifications = notifications.filter(notification => {
    // Text search filter
    const matchesSearchTerm = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatusFilter = statusFilter.length === 0 || 
      statusFilter.includes(notification.status);
    
    return matchesSearchTerm && matchesStatusFilter;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "audience") {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value as "all" | "admin" | "business" | "user" | "specific",
        recipients: value === "specific" ? [] : undefined,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date?: Date) => {
    setFormData(prev => ({ ...prev, schedule: date }));
  };

  const handleCreateNotification = (save: boolean = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "欄位不完整",
        description: "請填寫標題和內容",
        variant: "destructive",
      });
      return;
    }
    
    const status: NotificationStatus = save ? "草稿" : formData.schedule ? "已排程" : "已發送";
    
    const newNotification: Notification = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      audience: formData.audience,
      recipients: formData.recipients,
      schedule: formData.schedule,
      attachment: formData.attachment,
      createdAt: new Date(),
      status: status,
      scheduleSent: formData.schedule ? false : undefined,
    };
    
    setNotifications([newNotification, ...notifications]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: save ? "已保存草稿" : formData.schedule ? "通知已排程" : "通知已發送",
      description: save 
        ? "通知已保存為草稿" 
        : formData.schedule 
          ? `通知將在 ${format(formData.schedule, 'yyyy/MM/dd HH:mm')} 發送` 
          : "通知已成功發送給指定的接收者",
    });
    
    resetForm();
  };

  const handleUpdateNotification = (save: boolean = false) => {
    if (!currentNotification) return;
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "欄位不完整",
        description: "請填寫標題和內容",
        variant: "destructive",
      });
      return;
    }
    
    const status: NotificationStatus = save ? "草稿" : formData.schedule ? "已排程" : "已發送";
    
    const updatedNotifications = notifications.map(notification => 
      notification.id === currentNotification.id
        ? {
            ...notification,
            title: formData.title,
            content: formData.content,
            audience: formData.audience,
            recipients: formData.recipients,
            schedule: formData.schedule,
            attachment: formData.attachment,
            status: status,
            scheduleSent: formData.schedule ? false : undefined,
          }
        : notification
    );
    
    setNotifications(updatedNotifications);
    setIsEditDialogOpen(false);
    
    toast({
      title: save ? "已更新草稿" : formData.schedule ? "通知已重新排程" : "通知已更新並發送",
      description: save 
        ? "通知草稿已更新" 
        : formData.schedule 
          ? `通知將在 ${format(formData.schedule, 'yyyy/MM/dd HH:mm')} 發送` 
          : "通知已更新並發送給指定的接收者",
    });
    
    resetForm();
  };

  const handleDeleteNotification = () => {
    if (!currentNotification) return;
    
    setNotifications(notifications.filter(notification => notification.id !== currentNotification.id));
    setIsDeleteDialogOpen(false);
    setCurrentNotification(null);
    
    toast({
      title: "通知已刪除",
      description: "通知已成功刪除",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      audience: "all",
      recipients: [],
    });
    setCurrentNotification(null);
  };

  const openEditDialog = (notification: Notification) => {
    setCurrentNotification(notification);
    setFormData({
      id: notification.id,
      title: notification.title,
      content: notification.content,
      audience: notification.audience,
      recipients: notification.recipients,
      schedule: notification.schedule,
      attachment: notification.attachment,
    });
    setIsEditDialogOpen(true);
  };

  const openPreviewDialog = (notification: Notification) => {
    setCurrentNotification(notification);
    setIsPreviewDialogOpen(true);
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearStatusFilter = () => {
    setStatusFilter([]);
  };

  const formatDate = (date: Date) => {
    return format(date, 'yyyy/MM/dd HH:mm', { locale: zhTW });
  };

  const audienceLabels = {
    all: "所有人",
    admin: "系統管理員",
    business: "商家",
    user: "一般用戶",
    specific: "指定用戶",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">通知管理</h1>
            <p className="text-beauty-muted">管理系統通知和向用戶發送消息</p>
          </div>
          <Button onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}>
            <BellRing className="mr-2 h-4 w-4" />
            發送通知
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>通知列表</CardTitle>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-4 w-4" />
                      {statusFilter.length > 0 ? `已篩選 ${statusFilter.length}` : "篩選狀態"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>狀態篩選</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {statuses.map(status => (
                      <DropdownMenuCheckboxItem
                        key={status.value}
                        checked={statusFilter.includes(status.value)}
                        onCheckedChange={() => toggleStatusFilter(status.value)}
                      >
                        {status.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearStatusFilter}>
                      清除篩選
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋通知..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>標題</TableHead>
                  <TableHead>接收對象</TableHead>
                  <TableHead>附件</TableHead>
                  <TableHead>建立時間</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id.toString()}>
                      <TableCell>{notification.id}</TableCell>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>{audienceLabels[notification.audience]}</TableCell>
                      <TableCell>
                        {notification.attachment ? (
                          <div className="flex items-center">
                            {notification.attachment.type === "image" && <Image size={16} />}
                            {notification.attachment.type === "file" && <FileText size={16} />}
                            {notification.attachment.type === "link" && <LinkIcon size={16} />}
                            <span className="ml-1 text-xs">
                              {notification.attachment.name}
                            </span>
                          </div>
                        ) : (
                          "無"
                        )}
                      </TableCell>
                      <TableCell>{formatDate(notification.createdAt)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          notification.status === "已發送" 
                            ? "bg-green-100 text-green-800"
                            : notification.status === "已排程"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {notification.status}
                          {notification.status === "已排程" && notification.schedule && (
                            <span className="ml-1">
                              ({format(notification.schedule, 'MM/dd')})
                            </span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openPreviewDialog(notification)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {(notification.status === "草稿" || notification.status === "已排程") && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditDialog(notification)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentNotification(notification);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      沒有找到符合條件的通知
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>發送系統通知</DialogTitle>
            <DialogDescription>
              填寫以下內容發送系統通知給用戶
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">通知標題</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="輸入通知標題"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">通知內容</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="輸入通知內容"
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audience">接收對象</Label>
              <Select
                value={formData.audience}
                onValueChange={(value) => handleSelectChange("audience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇接收對象" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有人</SelectItem>
                  <SelectItem value="admin">系統管理員</SelectItem>
                  <SelectItem value="business">商家</SelectItem>
                  <SelectItem value="user">一般用戶</SelectItem>
                  <SelectItem value="specific">指定用戶</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.audience === "specific" && (
              <div className="space-y-2">
                <Label>指定接收用戶</Label>
                <div className="border rounded-md p-3 space-y-2 bg-gray-50">
                  <div className="text-sm text-muted-foreground mb-2">
                    選擇要接收此通知的特定用戶
                  </div>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    新增接收用戶
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>排程發送</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="schedule"
                  checked={!!formData.schedule}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Set default to tomorrow
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(9, 0, 0, 0);
                      setFormData(prev => ({ ...prev, schedule: tomorrow }));
                    } else {
                      setFormData(prev => ({ ...prev, schedule: undefined }));
                    }
                  }}
                />
                <label
                  htmlFor="schedule"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  排程在特定時間發送
                </label>
              </div>
              
              {formData.schedule && (
                <div className="flex items-center mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(formData.schedule, 'yyyy/MM/dd HH:mm')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.schedule}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <div className="flex justify-between items-center">
                          <Label>時間</Label>
                          <div className="flex space-x-2">
                            <Select
                              value={formData.schedule.getHours().toString().padStart(2, '0')}
                              onValueChange={(value) => {
                                const newDate = new Date(formData.schedule as Date);
                                newDate.setHours(parseInt(value));
                                handleDateChange(newDate);
                              }}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={formData.schedule.getMinutes().toString().padStart(2, '0')}
                              onValueChange={(value) => {
                                const newDate = new Date(formData.schedule as Date);
                                newDate.setMinutes(parseInt(value));
                                handleDateChange(newDate);
                              }}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['00', '15', '30', '45'].map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>附件</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  添加圖片
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  添加檔案
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  添加連結
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              取消
            </Button>
            <Button variant="secondary" onClick={() => handleCreateNotification(true)}>
              儲存草稿
            </Button>
            <Button onClick={() => handleCreateNotification(false)}>
              {formData.schedule ? '排程發送' : '立即發送'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notification Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>編輯通知</DialogTitle>
            <DialogDescription>
              修改通知內容和發送設定
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">通知標題</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="輸入通知標題"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">通知內容</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="輸入通知內容"
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audience">接收對象</Label>
              <Select
                value={formData.audience}
                onValueChange={(value) => handleSelectChange("audience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇接收對象" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有人</SelectItem>
                  <SelectItem value="admin">系統管理員</SelectItem>
                  <SelectItem value="business">商家</SelectItem>
                  <SelectItem value="user">一般用戶</SelectItem>
                  <SelectItem value="specific">指定用戶</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.audience === "specific" && (
              <div className="space-y-2">
                <Label>指定接收用戶</Label>
                <div className="border rounded-md p-3 space-y-2 bg-gray-50">
                  <div className="text-sm text-muted-foreground mb-2">
                    選擇要接收此通知的特定用戶
                  </div>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    新增接收用戶
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>排程發送</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-schedule"
                  checked={!!formData.schedule}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Set default to tomorrow
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(9, 0, 0, 0);
                      setFormData(prev => ({ ...prev, schedule: tomorrow }));
                    } else {
                      setFormData(prev => ({ ...prev, schedule: undefined }));
                    }
                  }}
                />
                <label
                  htmlFor="edit-schedule"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  排程在特定時間發送
                </label>
              </div>
              
              {formData.schedule && (
                <div className="flex items-center mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(formData.schedule, 'yyyy/MM/dd HH:mm')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.schedule}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <div className="flex justify-between items-center">
                          <Label>時間</Label>
                          <div className="flex space-x-2">
                            <Select
                              value={formData.schedule.getHours().toString().padStart(2, '0')}
                              onValueChange={(value) => {
                                const newDate = new Date(formData.schedule as Date);
                                newDate.setHours(parseInt(value));
                                handleDateChange(newDate);
                              }}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={formData.schedule.getMinutes().toString().padStart(2, '0')}
                              onValueChange={(value) => {
                                const newDate = new Date(formData.schedule as Date);
                                newDate.setMinutes(parseInt(value));
                                handleDateChange(newDate);
                              }}
                            >
                              <SelectTrigger className="w-16">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['00', '15', '30', '45'].map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>附件</Label>
              {formData.attachment ? (
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    {formData.attachment.type === "image" && <Image className="h-4 w-4 mr-2" />}
                    {formData.attachment.type === "file" && <FileText className="h-4 w-4 mr-2" />}
                    {formData.attachment.type === "link" && <LinkIcon className="h-4 w-4 mr-2" />}
                    <span className="text-sm">{formData.attachment.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setFormData(prev => ({ ...prev, attachment: undefined }))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-2" />
                    添加圖片
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    添加檔案
                  </Button>
                  <Button variant="outline" size="sm">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    添加連結
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button variant="secondary" onClick={() => handleUpdateNotification(true)}>
              儲存草稿
            </Button>
            <Button onClick={() => handleUpdateNotification(false)}>
              {formData.schedule ? '排程發送' : '立即發送'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Notification Dialog */}
      {currentNotification && (
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>通知預覽</DialogTitle>
              <DialogDescription>
                通知內容預覽
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">標題</div>
                <div className="text-lg font-bold">{currentNotification.title}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">內容</div>
                <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                  {currentNotification.content}
                </div>
              </div>
              
              {currentNotification.attachment && (
                <div className="space-y-1">
                  <div className="text-sm font-medium">附件</div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {currentNotification.attachment.type === "image" && (
                      <div>
                        <img 
                          src={currentNotification.attachment.url} 
                          alt={currentNotification.attachment.name}
                          className="w-full h-auto rounded-md mb-2"
                        />
                        <div className="text-sm text-muted-foreground">
                          {currentNotification.attachment.name}
                        </div>
                      </div>
                    )}
                    {currentNotification.attachment.type === "file" && (
                      <div className="flex items-center p-2 border rounded bg-white">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{currentNotification.attachment.name}</span>
                      </div>
                    )}
                    {currentNotification.attachment.type === "link" && (
                      <div className="flex items-center p-2 border rounded bg-white">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        <a 
                          href={currentNotification.attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {currentNotification.attachment.name}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="space-y-1">
                <div className="text-sm font-medium">接收對象</div>
                <div className="text-sm">
                  {audienceLabels[currentNotification.audience]}
                  {currentNotification.recipients && currentNotification.recipients.length > 0 && (
                    <span>
                      ({currentNotification.recipients.length} 位用戶)
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium">建立時間</div>
                  <div className="text-sm">
                    {formatDate(currentNotification.createdAt)}
                  </div>
                </div>
                
                {currentNotification.schedule && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium">排程發送時間</div>
                    <div className="text-sm">
                      {formatDate(currentNotification.schedule)}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">狀態</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentNotification.status === "已發送" 
                      ? "bg-green-100 text-green-800"
                      : currentNotification.status === "已排程"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {currentNotification.status}
                  </span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsPreviewDialogOpen(false)}>
                關閉
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此通知？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作無法撤銷，通知 "{currentNotification?.title}" 將被永久刪除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNotification} className="bg-red-600 hover:bg-red-700">
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default NotificationsPage;
