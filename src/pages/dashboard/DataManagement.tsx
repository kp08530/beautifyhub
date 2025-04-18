
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Server,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  FileArchive,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart,
  Activity,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { format, subDays } from "date-fns";

interface BackupRecord {
  id: string;
  date: string;
  size: string;
  type: "自動" | "手動";
  status: "成功" | "失敗";
}

interface MaintenanceTask {
  id: string;
  name: string;
  lastRun: string;
  nextRun: string;
  status: "排程中" | "執行中" | "已完成" | "失敗";
  description: string;
}

interface SystemStatistics {
  totalUsers: number;
  totalBusinesses: number;
  totalAppointments: number;
  databaseSize: string;
  storageUsed: string;
  totalStorageCapacity: string;
  totalLogins: {
    lastDay: number;
    lastWeek: number;
    lastMonth: number;
  };
  newUsers: {
    lastDay: number;
    lastWeek: number;
    lastMonth: number;
  };
  activeUsers: {
    lastDay: number;
    lastWeek: number;
    lastMonth: number;
  };
}

// Sample data for the page
const mockBackups: BackupRecord[] = [
  { id: "1", date: "2025-04-18 03:00:00", size: "458 MB", type: "自動", status: "成功" },
  { id: "2", date: "2025-04-17 03:00:00", size: "455 MB", type: "自動", status: "成功" },
  { id: "3", date: "2025-04-16 03:00:00", size: "453 MB", type: "自動", status: "成功" },
  { id: "4", date: "2025-04-15 03:00:00", size: "450 MB", type: "自動", status: "成功" },
  { id: "5", date: "2025-04-14 15:32:21", size: "448 MB", type: "手動", status: "成功" },
  { id: "6", date: "2025-04-14 03:00:00", size: "447 MB", type: "自動", status: "失敗" },
  { id: "7", date: "2025-04-13 03:00:00", size: "445 MB", type: "自動", status: "成功" },
];

const mockTasks: MaintenanceTask[] = [
  {
    id: "task1",
    name: "資料庫備份",
    lastRun: "2025-04-18 03:00:00",
    nextRun: "2025-04-19 03:00:00",
    status: "已完成",
    description: "自動備份所有資料庫內容"
  },
  {
    id: "task2",
    name: "資料庫最佳化",
    lastRun: "2025-04-15 01:30:00",
    nextRun: "2025-04-22 01:30:00",
    status: "排程中",
    description: "清理無用資料並最佳化資料表結構"
  },
  {
    id: "task3",
    name: "檔案存儲清理",
    lastRun: "2025-04-12 02:15:00",
    nextRun: "2025-04-19 02:15:00",
    status: "排程中",
    description: "清理暫存檔案與過期內容"
  },
  {
    id: "task4",
    name: "系統健康檢查",
    lastRun: "2025-04-18 00:00:00",
    nextRun: "2025-04-19 00:00:00",
    status: "已完成",
    description: "檢查系統服務與資源使用狀況"
  },
  {
    id: "task5",
    name: "資料統計分析",
    lastRun: "2025-04-18 01:00:00",
    nextRun: "2025-04-19 01:00:00",
    status: "執行中",
    description: "生成系統資料使用統計報告"
  }
];

const mockStats: SystemStatistics = {
  totalUsers: 5847,
  totalBusinesses: 253,
  totalAppointments: 28692,
  databaseSize: "458 MB",
  storageUsed: "12.8 GB",
  totalStorageCapacity: "50 GB",
  totalLogins: {
    lastDay: 412,
    lastWeek: 2834,
    lastMonth: 12056
  },
  newUsers: {
    lastDay: 24,
    lastWeek: 158,
    lastMonth: 642
  },
  activeUsers: {
    lastDay: 389,
    lastWeek: 1876,
    lastMonth: 4321
  }
};

const DataManagementPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [backups, setBackups] = useState<BackupRecord[]>(mockBackups);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);
  const [stats] = useState<SystemStatistics>(mockStats);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [backupType, setBackupType] = useState<"全量備份" | "增量備份">("全量備份");
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [showDeleteBackupDialog, setShowDeleteBackupDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupRecord | null>(null);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"全部" | "自動" | "手動">("全部");
  const [filterStatus, setFilterStatus] = useState<"全部" | "成功" | "失敗">("全部");

  const triggerBackup = () => {
    setBackupInProgress(true);
    setBackupProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          const newBackup: BackupRecord = {
            id: `${backups.length + 1}`,
            date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            size: "460 MB",
            type: "手動",
            status: "成功"
          };
          
          setBackups([newBackup, ...backups]);
          
          toast({
            title: "備份完成",
            description: `${backupType}已成功完成，大小：460 MB`,
          });
          
          setShowBackupDialog(false);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleDeleteBackup = () => {
    if (!selectedBackup) return;
    
    setBackups(backups.filter(backup => backup.id !== selectedBackup.id));
    
    toast({
      title: "備份已刪除",
      description: `備份項目 (${format(new Date(selectedBackup.date), "yyyy-MM-dd HH:mm:ss")}) 已成功刪除`,
    });
    
    setShowDeleteBackupDialog(false);
    setSelectedBackup(null);
  };
  
  const handleRestoreBackup = () => {
    if (!selectedBackup) return;
    
    // Simulate restore process
    toast({
      title: "開始還原備份",
      description: "系統將從所選備份還原資料，此過程可能需要數分鐘",
    });
    
    setTimeout(() => {
      toast({
        title: "備份還原成功",
        description: `已成功從 ${format(new Date(selectedBackup.date), "yyyy-MM-dd HH:mm:ss")} 的備份還原資料`,
      });
    }, 3000);
    
    setShowRestoreDialog(false);
  };
  
  const runTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId
        ? { ...task, status: "執行中" as const }
        : task
    ));
    
    toast({
      title: "任務已啟動",
      description: `維護任務已啟動，將在背景執行`,
    });
    
    // Simulate task completion
    setTimeout(() => {
      setTasks(tasks.map(task => 
        task.id === taskId
          ? { 
              ...task, 
              status: "已完成" as const,
              lastRun: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
              nextRun: format(subDays(new Date(), -7), "yyyy-MM-dd HH:mm:ss"),
            }
          : task
      ));
      
      toast({
        title: "任務已完成",
        description: `維護任務已成功完成`,
      });
    }, 5000);
  };
  
  const filteredBackups = backups.filter(backup => {
    let matchesSearch = true;
    let matchesType = true;
    let matchesStatus = true;
    
    if (searchTerm) {
      matchesSearch = backup.date.includes(searchTerm) || 
                      backup.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      backup.type.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    if (filterType !== "全部") {
      matchesType = backup.type === filterType;
    }
    
    if (filterStatus !== "全部") {
      matchesStatus = backup.status === filterStatus;
    }
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">數據管理</h1>
            <p className="text-beauty-muted">系統數據備份、維護與優化</p>
          </div>
          <div>
            <Button onClick={() => setActiveTab("backup")}>
              <FileArchive className="mr-2 h-4 w-4" />
              數據備份
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              <BarChart className="mr-2 h-4 w-4" />
              系統概覽
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex-1">
              <Database className="mr-2 h-4 w-4" />
              數據備份
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1">
              <Server className="mr-2 h-4 w-4" />
              系統維護
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">資料庫大小</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.databaseSize}</div>
                  <p className="text-xs text-muted-foreground">
                    最後備份: {backups[0]?.date || "未備份"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">存儲空間使用</CardTitle>
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.storageUsed} / {stats.totalStorageCapacity}</div>
                  <Progress className="mt-2" value={(parseInt(stats.storageUsed) / parseInt(stats.totalStorageCapacity)) * 100} />
                  <p className="text-xs text-muted-foreground mt-1">
                    已使用 {((parseInt(stats.storageUsed) / parseInt(stats.totalStorageCapacity)) * 100).toFixed(0)}% 存儲空間
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總數據量</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">{stats.totalUsers}</div>
                      <p className="text-xs text-muted-foreground">用戶總數</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats.totalBusinesses}</div>
                      <p className="text-xs text-muted-foreground">商家總數</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats.totalAppointments}</div>
                      <p className="text-xs text-muted-foreground">預約數量</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>系統活躍度</CardTitle>
                  <CardDescription>用戶活躍度統計</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>指標</TableHead>
                        <TableHead>今日</TableHead>
                        <TableHead>本週</TableHead>
                        <TableHead>本月</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">總登入次數</TableCell>
                        <TableCell>{stats.totalLogins.lastDay}</TableCell>
                        <TableCell>{stats.totalLogins.lastWeek}</TableCell>
                        <TableCell>{stats.totalLogins.lastMonth}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">新增用戶</TableCell>
                        <TableCell>{stats.newUsers.lastDay}</TableCell>
                        <TableCell>{stats.newUsers.lastWeek}</TableCell>
                        <TableCell>{stats.newUsers.lastMonth}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">活躍用戶</TableCell>
                        <TableCell>{stats.activeUsers.lastDay}</TableCell>
                        <TableCell>{stats.activeUsers.lastWeek}</TableCell>
                        <TableCell>{stats.activeUsers.lastMonth}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>系統健康狀態</CardTitle>
                  <CardDescription>關鍵系統元件狀態</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium">資料庫連線</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        正常
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium">API 服務</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        正常
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium">檔案存儲</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        正常
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium">排程任務</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                        注意
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium">伺服器資源</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        正常
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-beauty-muted">上次檢查時間: 2025-04-18 08:30:00</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重新檢查系統狀態
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>數據備份</CardTitle>
                    <CardDescription>管理系統數據備份</CardDescription>
                  </div>
                  <Button onClick={() => setShowBackupDialog(true)}>
                    <Download className="mr-2 h-4 w-4" />
                    建立備份
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜尋備份..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="備份類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="全部">全部類型</SelectItem>
                      <SelectItem value="自動">自動備份</SelectItem>
                      <SelectItem value="手動">手動備份</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="備份狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="全部">全部狀態</SelectItem>
                      <SelectItem value="成功">成功</SelectItem>
                      <SelectItem value="失敗">失敗</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>備份時間</TableHead>
                        <TableHead>大小</TableHead>
                        <TableHead>類型</TableHead>
                        <TableHead>狀態</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBackups.length > 0 ? (
                        filteredBackups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell className="font-mono">{backup.date}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {backup.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={backup.status === "成功" ? "success" : "destructive"}>
                                {backup.status === "成功" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {backup.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedBackup(backup);
                                    setShowRestoreDialog(true);
                                  }}
                                  disabled={backup.status === "失敗"}
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  還原
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedBackup(backup);
                                    setShowDeleteBackupDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  刪除
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            沒有符合條件的備份記錄
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm text-beauty-muted">
                    自動備份設定: 每日凌晨 3:00
                  </p>
                  <p className="text-sm text-beauty-muted">
                    保留最近 30 天備份
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>系統維護任務</CardTitle>
                <CardDescription>管理系統自動維護任務</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-beauty-muted">{task.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            ${task.status === "已完成" ? "bg-green-100 text-green-800 border-green-200" : ""} 
                            ${task.status === "排程中" ? "bg-blue-100 text-blue-800 border-blue-200" : ""} 
                            ${task.status === "執行中" ? "bg-amber-100 text-amber-800 border-amber-200" : ""} 
                            ${task.status === "失敗" ? "bg-red-100 text-red-800 border-red-200" : ""}
                          `}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-beauty-muted mr-2" />
                          <div>
                            <p className="text-xs text-beauty-muted">上次執行</p>
                            <p className="text-sm">{task.lastRun}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-beauty-muted mr-2" />
                          <div>
                            <p className="text-xs text-beauty-muted">下次執行</p>
                            <p className="text-sm">{task.nextRun}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => runTask(task.id)}
                          disabled={task.status === "執行中"}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          立即執行
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>建立新備份</DialogTitle>
            <DialogDescription>
              選擇備份類型並開始備份過程
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">備份類型</label>
              <Select
                value={backupType}
                onValueChange={(value) => setBackupType(value as "全量備份" | "增量備份")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇備份類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全量備份">全量備份</SelectItem>
                  <SelectItem value="增量備份">增量備份</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-beauty-muted mt-1">
                {backupType === "全量備份" 
                  ? "全量備份將包含所有系統數據" 
                  : "增量備份僅包含自上次全量備份後的變更數據"}
              </p>
            </div>
            
            {backupInProgress && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-sm">備份進度</label>
                  <span className="text-sm">{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)} disabled={backupInProgress}>
              取消
            </Button>
            <Button onClick={triggerBackup} disabled={backupInProgress}>
              {backupInProgress ? "備份中..." : "開始備份"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showDeleteBackupDialog} onOpenChange={setShowDeleteBackupDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認刪除備份</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要刪除 {selectedBackup && format(new Date(selectedBackup.date), "yyyy-MM-dd HH:mm:ss")} 的備份嗎？此操作無法復原。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBackup} className="bg-red-600 hover:bg-red-700">
              確認刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認還原備份</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要從 {selectedBackup && format(new Date(selectedBackup.date), "yyyy-MM-dd HH:mm:ss")} 的備份還原系統嗎？這將覆蓋當前數據。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreBackup}>
              確認還原
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default DataManagementPage;
