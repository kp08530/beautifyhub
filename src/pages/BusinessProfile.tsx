import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsList, 
  TabsContent, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Copy, Plus, Settings, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

const BusinessProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("settings");
  const [businessName, setBusinessName] = useState("我的美麗沙龍");
  const [businessDescription, setBusinessDescription] = useState("提供專業美髮服務");
  const [businessCategory, setBusinessCategory] = useState("美髮");
  const [businessAddress, setBusinessAddress] = useState("台北市大安區");
  const [businessPhone, setBusinessPhone] = useState("02-1234-5678");
  const [businessEmail, setBusinessEmail] = useState("service@example.com");
  const [businessWebsite, setBusinessWebsite] = useState("https://example.com");
  const [businessOpeningHours, setBusinessOpeningHours] = useState([
    { day: '星期一', open: '09:00', close: '18:00', isOpen: true },
    { day: '星期二', open: '09:00', close: '18:00', isOpen: true },
    { day: '星期三', open: '09:00', close: '18:00', isOpen: true },
    { day: '星期四', open: '09:00', close: '18:00', isOpen: true },
    { day: '星期五', open: '09:00', close: '18:00', isOpen: true },
    { day: '星期六', open: '10:00', close: '17:00', isOpen: true },
    { day: '星期日', open: '10:00', close: '17:00', isOpen: false },
  ]);
  const [showAddRestDayDialog, setShowAddRestDayDialog] = useState(false);
  const [restDays, setRestDays] = useState<RestDay[]>([
    { id: '1', startDate: '2024-08-15', endDate: '2024-08-15', reason: '中秋節' },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleSaveChanges = () => {
    toast({
      title: "儲存成功",
      description: "您的商家資訊已成功更新",
    });
  };

  const handleOpeningHoursChange = (day: string, field: string, value: string | boolean) => {
    setBusinessOpeningHours(prev =>
      prev.map(item =>
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddRestDay = () => {
    const newId = Date.now().toString();
    const newRestDayWithId: RestDay = { ...newRestDay, id: newId };
    setRestDays([...restDays, newRestDayWithId]);
    setNewRestDay({ startDate: '', endDate: '', reason: '' });
    setShowAddRestDayDialog(false);

    toast({
      title: "新增休息日成功",
      description: `已新增 ${newRestDay.startDate} 至 ${newRestDay.endDate} 的休息日`,
    });
  };

  const handleDeleteRestDay = (id: string) => {
    setRestDays(restDays.filter(restDay => restDay.id !== id));

    toast({
      title: "刪除休息日成功",
      description: "已成功刪除休息日",
    });
  };

  // Update the RestDay interface
  interface RestDay {
    id: string;
    startDate: string;
    endDate: string;
    reason?: string;
  }

  // Update the newRestDay state:
  const [newRestDay, setNewRestDay] = useState<Omit<RestDay, 'id'>>({ 
    startDate: '', 
    endDate: '', 
    reason: '' 
  });

  return (
    <React.Fragment>  {/* Wrap multiple elements in a React.Fragment */}
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">商家檔案</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                基本設定
              </TabsTrigger>
              {/* <TabsTrigger value="services">
                <ListChecks className="mr-2 h-4 w-4" />
                服務項目
              </TabsTrigger>
              <TabsTrigger value="portfolio">
                <ImageIcon className="mr-2 h-4 w-4" />
                作品集
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <MessageSquare className="mr-2 h-4 w-4" />
                評價管理
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="settings">
              <div className="space-y-4">
                {/* Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">商家名稱</Label>
                    <Input
                      type="text"
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessCategory">商家類別</Label>
                    <Select value={businessCategory} onValueChange={setBusinessCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="選擇類別" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="美髮">美髮</SelectItem>
                        <SelectItem value="美甲">美甲</SelectItem>
                        <SelectItem value="美容">美容</SelectItem>
                        {/* Add more categories as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div>
                    <Label htmlFor="businessDescription">商家描述</Label>
                    <Textarea
                      id="businessDescription"
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="詳細描述您的商家..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessAddress">商家地址</Label>
                    <Input
                      type="text"
                      id="businessAddress"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessPhone">商家電話</Label>
                    <Input
                      type="tel"
                      id="businessPhone"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessEmail">商家 Email</Label>
                    <Input
                      type="email"
                      id="businessEmail"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessWebsite">商家網站</Label>
                    <Input
                      type="url"
                      id="businessWebsite"
                      value={businessWebsite}
                      onChange={(e) => setBusinessWebsite(e.target.value)}
                    />
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">營業時間</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessOpeningHours.map(item => (
                      <div key={item.day} className="flex items-center space-x-2">
                        <Label className="w-20">{item.day}</Label>
                        <Switch
                          id={`isOpen-${item.day}`}
                          checked={item.isOpen}
                          onCheckedChange={(checked) => handleOpeningHoursChange(item.day, 'isOpen', checked)}
                        />
                        <Input
                          type="time"
                          value={item.open}
                          onChange={(e) => handleOpeningHoursChange(item.day, 'open', e.target.value)}
                          disabled={!item.isOpen}
                          className="w-24"
                        />
                        <span className="mx-1">至</span>
                        <Input
                          type="time"
                          value={item.close}
                          onChange={(e) => handleOpeningHoursChange(item.day, 'close', e.target.value)}
                          disabled={!item.isOpen}
                          className="w-24"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rest Days */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                    休息日設定
                    <Button variant="outline" size="sm" onClick={() => setShowAddRestDayDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      新增休息日
                    </Button>
                  </h3>
                  
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left text-xs">
                      <tr>
                        <th className="px-4 py-2">起始日期</th>
                        <th className="px-4 py-2">結束日期</th>
                        <th className="px-4 py-2">原因</th>
                        <th className="px-4 py-2">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {restDays.map(restDay => (
                        <tr key={restDay.id}>
                          <td className="px-4 py-2">{restDay.startDate}</td>
                          <td className="px-4 py-2">{restDay.endDate}</td>
                          <td className="px-4 py-2">{restDay.reason || '休息日'}</td>
                          <td className="px-4 py-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteRestDay(restDay.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button onClick={handleSaveChanges}>儲存變更</Button>
              </div>
            </TabsContent>

            {/* <TabsContent value="services">
              <div>服務項目設定</div>
            </TabsContent>

            <TabsContent value="portfolio">
              <div>作品集管理</div>
            </TabsContent>

            <TabsContent value="reviews">
              <div>評價管理</div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>

      {/* Add Rest Day Dialog */}
      <Dialog open={showAddRestDayDialog} onOpenChange={setShowAddRestDayDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增休息日</DialogTitle>
            <DialogDescription>設定店家的休息日或特殊營業時間</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">開始日期</label>
              <Input
                type="date"
                value={newRestDay.startDate}
                onChange={(e) => setNewRestDay(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">結束日期</label>
              <Input
                type="date"
                value={newRestDay.endDate}
                onChange={(e) => setNewRestDay(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">原因 (選填)</label>
              <Input
                type="text"
                value={newRestDay.reason}
                onChange={(e) => setNewRestDay(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="例如：國定假日、內部訓練..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRestDayDialog(false)}>取消</Button>
            <Button onClick={handleAddRestDay}>新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default BusinessProfile;
