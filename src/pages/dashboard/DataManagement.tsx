
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Database, Upload, Download, RefreshCw, HardDrive, FileText, Archive, AlertTriangle, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const DataManagementPage = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>("users");
  const [currentTab, setCurrentTab] = useState("import-export");
  const [showPurgeDialog, setShowPurgeDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [databases, setDatabases] = useState([
    { id: "db1", name: "主要資料庫", server: "台北主機", size: "2.4 GB", lastBackup: "2025-04-17 08:30:22", status: "正常" },
    { id: "db2", name: "備份資料庫", server: "高雄備援", size: "2.2 GB", lastBackup: "2025-04-17 06:15:11", status: "正常" },
  ]);
  const [backups, setBackups] = useState([
    { id: "bk1", date: "2025-04-17 08:30:22", size: "2.4 GB", type: "完整備份", status: "可用" },
    { id: "bk2", date: "2025-04-16 08:15:05", size: "2.3 GB", type: "完整備份", status: "可用" },
    { id: "bk3", date: "2025-04-15 08:00:31", size: "2.2 GB", type: "完整備份", status: "可用" },
    { id: "bk4", date: "2025-04-14 07:45:12", size: "2.1 GB", type: "完整備份", status: "可用" },
  ]);
  
  const tables = [
    { id: "users", name: "用戶資料", recordCount: 2584, lastUpdated: "2025-04-18 09:15:32" },
    { id: "businesses", name: "商家資料", recordCount: 376, lastUpdated: "2025-04-18 10:22:45" },
    { id: "appointments", name: "預約資料", recordCount: 12453, lastUpdated: "2025-04-18 11:03:17" },
    { id: "services", name: "服務項目", recordCount: 983, lastUpdated: "2025-04-17 16:45:09" },
    { id: "ads", name: "廣告資料", recordCount: 125, lastUpdated: "2025-04-17 14:32:50" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      toast({
        title: "請選擇檔案",
        description: "請先選擇要匯入的檔案",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    
    // 模擬匯入處理
    setTimeout(() => {
      setIsImporting(false);
      setSelectedFile(null);
      toast({
        title: "匯入成功",
        description: `已成功匯入 ${selectedTable} 資料表`,
      });
    }, 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // 模擬匯出處理
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "匯出成功",
        description: `已成功匯出 ${selectedTable} 資料表`,
      });
    }, 2000);
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    
    // 模擬備份處理
    setTimeout(() => {
      setIsBackingUp(false);
      
      // 新增備份到列表
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      const newBackup = {
        id: `bk${backups.length + 1}`,
        date: formattedDate,
        size: "2.5 GB",
        type: "完整備份",
        status: "可用"
      };
      
      setBackups([newBackup, ...backups]);
      
      // 更新資料庫最後備份時間
      const updatedDatabases = databases.map(db => ({
        ...db,
        lastBackup: formattedDate
      }));
      
      setDatabases(updatedDatabases);
      
      toast({
        title: "備份成功",
        description: "資料庫已成功備份",
      });
    }, 3000);
  };

  const handlePurgeData = () => {
    setShowPurgeDialog(false);
    
    toast({
      title: "清除資料",
      description: `已成功清除 ${selectedTable} 資料表的歷史資料`,
    });
  };

  const handleRestoreBackup = () => {
    setShowRestoreDialog(false);
    
    toast({
      title: "還原備份",
      description: "資料庫已成功還原至指定備份點",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">數據管理</h1>
            <p className="text-beauty-muted">管理系統資料、備份與還原</p>
          </div>
        </div>

        <Tabs defaultValue="import-export" onValueChange={setCurrentTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="import-export" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              資料匯入匯出
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              資料庫管理
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center">
              <Archive className="h-4 w-4 mr-2" />
              備份與還原
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="import-export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>資料匯入與匯出</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 匯入區塊 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">匯入資料</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">選擇資料表</label>
                        <Select 
                          value={selectedTable} 
                          onValueChange={setSelectedTable}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="選擇資料表" />
                          </SelectTrigger>
                          <SelectContent>
                            {tables.map(table => (
                              <SelectItem key={table.id} value={table.id}>
                                {table.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">選擇檔案</label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="file-upload" 
                            type="file" 
                            onChange={handleFileChange}
                            accept=".csv, .json, .xlsx"
                          />
                        </div>
                        <p className="text-xs text-beauty-muted mt-1">支援 CSV、JSON、Excel 格式</p>
                      </div>
                      
                      <Button 
                        onClick={handleImport}
                        disabled={!selectedFile || isImporting}
                        className="w-full"
                      >
                        {isImporting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            匯入中...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            開始匯入
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* 匯出區塊 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">匯出資料</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">選擇資料表</label>
                        <Select 
                          value={selectedTable} 
                          onValueChange={setSelectedTable}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="選擇資料表" />
                          </SelectTrigger>
                          <SelectContent>
                            {tables.map(table => (
                              <SelectItem key={table.id} value={table.id}>
                                {table.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">匯出格式</label>
                        <Select defaultValue="csv">
                          <SelectTrigger>
                            <SelectValue placeholder="選擇匯出格式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className="w-full"
                      >
                        {isExporting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            匯出中...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            開始匯出
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">資料表資訊</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>資料表名稱</TableHead>
                          <TableHead>紀錄數量</TableHead>
                          <TableHead>最後更新</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tables.map(table => (
                          <TableRow key={table.id}>
                            <TableCell className="font-medium">{table.name}</TableCell>
                            <TableCell>{table.recordCount.toLocaleString()}</TableCell>
                            <TableCell>{table.lastUpdated}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedTable(table.id);
                                  setShowPurgeDialog(true);
                                }}
                              >
                                清除歷史資料
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>資料庫管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>資料庫名稱</TableHead>
                        <TableHead>伺服器</TableHead>
                        <TableHead>資料庫大小</TableHead>
                        <TableHead>最後備份</TableHead>
                        <TableHead>狀態</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {databases.map(db => (
                        <TableRow key={db.id}>
                          <TableCell className="font-medium">{db.name}</TableCell>
                          <TableCell>{db.server}</TableCell>
                          <TableCell>{db.size}</TableCell>
                          <TableCell>{db.lastBackup}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {db.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => {
                      toast({
                        title: "資料庫優化",
                        description: "資料庫優化作業已啟動，這可能需要幾分鐘的時間",
                      });
                    }}
                  >
                    <HardDrive className="mr-2 h-4 w-4" />
                    優化資料庫
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => {
                      toast({
                        title: "資料庫檢查",
                        description: "資料庫健康檢查已完成，未發現任何問題",
                      });
                    }}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    資料庫檢查
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>備份與還原</CardTitle>
                  <Button 
                    onClick={handleBackupNow}
                    disabled={isBackingUp}
                  >
                    {isBackingUp ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        備份中...
                      </>
                    ) : (
                      <>
                        <Archive className="mr-2 h-4 w-4" />
                        立即備份
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>備份時間</TableHead>
                        <TableHead>大小</TableHead>
                        <TableHead>類型</TableHead>
                        <TableHead>狀態</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {backups.map(backup => (
                        <TableRow key={backup.id}>
                          <TableCell className="font-medium">{backup.date}</TableCell>
                          <TableCell>{backup.size}</TableCell>
                          <TableCell>{backup.type}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {backup.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-beauty-primary hover:text-beauty-primary/90 hover:bg-beauty-primary/10"
                                onClick={() => setShowRestoreDialog(true)}
                              >
                                還原
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-beauty-dark hover:text-beauty-dark/90 hover:bg-beauty-dark/10"
                                onClick={() => {
                                  toast({
                                    title: "下載備份",
                                    description: `備份 ${backup.date} 開始下載`,
                                  });
                                }}
                              >
                                下載
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">自動備份設定</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          系統目前設定為每日凌晨 3:00 自動備份，保留最近 30 天的備份記錄。
                          可在系統設定中修改備份排程。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 清除資料確認對話框 */}
      <AlertDialog open={showPurgeDialog} onOpenChange={setShowPurgeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認清除歷史資料？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作將清除所選資料表中符合條件的歷史資料。此操作無法撤銷，請確認您已備份所需資料。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePurgeData}
              className="bg-red-600 hover:bg-red-700"
            >
              確認清除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* 還原備份確認對話框 */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認還原資料庫？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作將把資料庫還原至選定的備份點。還原操作會覆蓋現有資料，請確認您已備份當前資料。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRestoreBackup}
              className="bg-orange-600 hover:bg-orange-700"
            >
              確認還原
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default DataManagementPage;
