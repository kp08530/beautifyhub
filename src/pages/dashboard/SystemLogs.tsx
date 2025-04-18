
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  Check, 
  Calendar, 
  Download, 
  Filter,
  RefreshCcw
} from "lucide-react";
import { format, subDays } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  source: string;
  message: string;
  details?: string;
  userId?: string;
  userName?: string;
}

// Sample data generator
const generateLogs = (days: number = 7): SystemLog[] => {
  const logs: SystemLog[] = [];
  const sources = [
    "用戶管理",
    "商家管理",
    "訂單系統",
    "付款系統",
    "預約系統",
    "身份驗證",
    "資料庫操作",
    "系統更新"
  ];
  
  const errorMessages = [
    "資料庫連線失敗",
    "API回應逾時",
    "非法訪問嘗試",
    "資料驗證失敗",
    "權限不足",
    "服務不可用"
  ];
  
  const warningMessages = [
    "資料庫使用量高",
    "API響應緩慢",
    "使用者多次登入失敗",
    "系統資源不足警告",
    "存儲空間不足",
    "記憶體使用量高"
  ];
  
  const infoMessages = [
    "使用者登入",
    "使用者登出",
    "資料更新",
    "系統啟動",
    "系統關閉",
    "排程任務執行",
    "資料庫備份",
    "系統更新檢查"
  ];
  
  const successMessages = [
    "備份完成",
    "資料庫最佳化完成",
    "系統更新完成",
    "使用者註冊成功",
    "資料同步完成"
  ];
  
  const users = [
    { id: "user1", name: "系統管理員" },
    { id: "user2", name: "李小明" },
    { id: "user3", name: "王大華" },
    { id: "user4", name: "張美美" }
  ];
  
  for (let i = 0; i < 100; i++) {
    const dayOffset = Math.floor(Math.random() * days);
    const hourOffset = Math.floor(Math.random() * 24);
    const minuteOffset = Math.floor(Math.random() * 60);
    const secondOffset = Math.floor(Math.random() * 60);
    
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - dayOffset);
    timestamp.setHours(hourOffset, minuteOffset, secondOffset);
    
    const levelRand = Math.random();
    let level: "info" | "warning" | "error" | "success";
    let message: string;
    
    if (levelRand < 0.1) {
      level = "error";
      message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    } else if (levelRand < 0.25) {
      level = "warning";
      message = warningMessages[Math.floor(Math.random() * warningMessages.length)];
    } else if (levelRand < 0.35) {
      level = "success";
      message = successMessages[Math.floor(Math.random() * successMessages.length)];
    } else {
      level = "info";
      message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
    }
    
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    const includeUser = Math.random() < 0.7;
    const user = includeUser ? users[Math.floor(Math.random() * users.length)] : undefined;
    
    logs.push({
      id: `log-${i}`,
      timestamp: format(timestamp, "yyyy-MM-dd HH:mm:ss"),
      level,
      source,
      message,
      details: Math.random() < 0.3 ? `日誌詳細資訊 ${i}...` : undefined,
      userId: user?.id,
      userName: user?.name
    });
  }
  
  return logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

const SystemLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allLogs] = useState<SystemLog[]>(generateLogs());
  const [logs, setLogs] = useState<SystemLog[]>(allLogs);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [showLogDetails, setShowLogDetails] = useState(false);
  
  const sources = Array.from(new Set(allLogs.map(log => log.source)));

  const applyFilters = () => {
    let filtered = [...allLogs];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply level filter
    if (levelFilter.length > 0) {
      filtered = filtered.filter(log => levelFilter.includes(log.level));
    }
    
    // Apply source filter
    if (sourceFilter.length > 0) {
      filtered = filtered.filter(log => sourceFilter.includes(log.source));
    }
    
    // Apply date range
    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      let toDate: Date;
      if (dateRange.to) {
        toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
      } else {
        toDate = new Date(fromDate);
        toDate.setHours(23, 59, 59, 999);
      }
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= fromDate && logDate <= toDate;
      });
    }
    
    setLogs(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLevelFilter([]);
    setSourceFilter([]);
    setDateRange({
      from: subDays(new Date(), 7),
      to: new Date()
    });
    setLogs(allLogs);
  };

  const toggleLevelFilter = (level: string) => {
    setLevelFilter(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleSourceFilter = (source: string) => {
    setSourceFilter(prev => 
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleViewLogDetails = (log: SystemLog) => {
    setSelectedLog(log);
    setShowLogDetails(true);
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            錯誤
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
            警告
          </Badge>
        );
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
            資訊
          </Badge>
        );
      case "success":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            成功
          </Badge>
        );
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">系統日誌</h1>
            <p className="text-beauty-muted">檢視系統運行日誌與錯誤報告</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={resetFilters}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>系統日誌清單</CardTitle>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex-1 md:flex-none">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Calendar className="h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "yyyy-MM-dd")} 至 {format(dateRange.to, "yyyy-MM-dd")}
                            </>
                          ) : (
                            format(dateRange.from, "yyyy-MM-dd")
                          )
                        ) : (
                          "選擇日期範圍"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                      <div className="flex items-center justify-end gap-2 p-3 border-t">
                        <Button size="sm" onClick={() => {
                          setDateRange({
                            from: subDays(new Date(), 7),
                            to: new Date()
                          });
                        }} variant="outline">近7天</Button>
                        <Button size="sm" onClick={() => {
                          setDateRange({
                            from: subDays(new Date(), 30),
                            to: new Date()
                          });
                        }} variant="outline">近30天</Button>
                        <Button size="sm" onClick={() => applyFilters()}>套用</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-4 w-4" />
                      {levelFilter.length > 0 ? `已篩選級別 ${levelFilter.length}` : "日誌級別"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>日誌級別</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={levelFilter.includes("error")}
                      onCheckedChange={() => toggleLevelFilter("error")}
                    >
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      錯誤
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={levelFilter.includes("warning")}
                      onCheckedChange={() => toggleLevelFilter("warning")}
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      警告
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={levelFilter.includes("info")}
                      onCheckedChange={() => toggleLevelFilter("info")}
                    >
                      <Info className="h-4 w-4 text-blue-500 mr-2" />
                      資訊
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={levelFilter.includes("success")}
                      onCheckedChange={() => toggleLevelFilter("success")}
                    >
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      成功
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setLevelFilter([]);
                    }}>
                      清除篩選
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-4 w-4" />
                      {sourceFilter.length > 0 ? `已篩選來源 ${sourceFilter.length}` : "日誌來源"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>日誌來源</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sources.map(source => (
                      <DropdownMenuCheckboxItem
                        key={source}
                        checked={sourceFilter.includes(source)}
                        onCheckedChange={() => toggleSourceFilter(source)}
                      >
                        {source}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setSourceFilter([]);
                    }}>
                      清除篩選
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋日誌..."
                    className="pl-8 h-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                
                <Button size="sm" className="h-8" onClick={handleSearch}>
                  搜尋
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">時間</TableHead>
                    <TableHead className="w-[100px]">級別</TableHead>
                    <TableHead className="w-[150px]">來源</TableHead>
                    <TableHead>訊息</TableHead>
                    <TableHead className="w-[150px]">使用者</TableHead>
                    <TableHead className="w-[80px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getLogLevelIcon(log.level)}
                            <span>{getLogLevelBadge(log.level)}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.source}</TableCell>
                        <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {log.message}
                        </TableCell>
                        <TableCell>{log.userName || "-"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewLogDetails(log)}
                          >
                            詳情
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        沒有符合條件的日誌記錄
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Popover open={showLogDetails} onOpenChange={setShowLogDetails}>
        <PopoverContent className="w-[400px]" align="end">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">日誌詳情</h3>
              <div className="flex items-center space-x-2">
                {selectedLog && getLogLevelIcon(selectedLog.level)}
                <span>{selectedLog && getLogLevelBadge(selectedLog.level)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-beauty-muted">時間</p>
                <p className="font-mono text-xs">{selectedLog?.timestamp}</p>
              </div>
              <div>
                <p className="text-sm text-beauty-muted">來源</p>
                <p>{selectedLog?.source}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-beauty-muted">訊息</p>
              <p className="font-medium">{selectedLog?.message}</p>
            </div>
            
            {selectedLog?.userName && (
              <div>
                <p className="text-sm text-beauty-muted">使用者</p>
                <p>{selectedLog.userName} (ID: {selectedLog.userId})</p>
              </div>
            )}
            
            {selectedLog?.details && (
              <div>
                <p className="text-sm text-beauty-muted">詳細資訊</p>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-32">
                  {selectedLog.details}
                </pre>
              </div>
            )}
            
            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowLogDetails(false)}>
                關閉
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </DashboardLayout>
  );
};

export default SystemLogsPage;
