
import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Calendar, 
  Search,
  Filter,
  RefreshCw,
  Download,
  Code,
  Database,
  Lock,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  category: 'system' | 'security' | 'database' | 'api' | 'user';
  message: string;
  details?: string;
  service?: string;
  userAgent?: string;
  ipAddress?: string;
}

const mockLogs: SystemLog[] = [
  {
    id: "log-1",
    timestamp: "2025-04-18 08:32:15",
    level: "error",
    category: "database",
    message: "無法連接到資料庫",
    details: "連接至資料庫時發生錯誤，連接超時",
    service: "database-service",
    ipAddress: "10.0.0.5"
  },
  {
    id: "log-2",
    timestamp: "2025-04-18 08:30:22",
    level: "warning",
    category: "security",
    message: "多次登入嘗試失敗",
    details: "用戶 john@example.com 5分鐘內嘗試登入失敗3次",
    service: "auth-service",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    ipAddress: "203.0.113.42"
  },
  {
    id: "log-3",
    timestamp: "2025-04-18 08:29:47",
    level: "info",
    category: "system",
    message: "系統自動備份完成",
    service: "backup-service"
  },
  {
    id: "log-4",
    timestamp: "2025-04-18 08:25:33",
    level: "debug",
    category: "api",
    message: "API 呼叫 - GET /api/users",
    details: "請求處理時間: 125ms, 回應狀態: 200",
    service: "api-gateway",
    ipAddress: "203.0.113.17"
  },
  {
    id: "log-5",
    timestamp: "2025-04-18 08:20:05",
    level: "error",
    category: "api",
    message: "API 錯誤 - 無效請求",
    details: "POST /api/appointments: 無效的請求格式",
    service: "api-gateway",
    userAgent: "PostmanRuntime/7.28.4",
    ipAddress: "198.51.100.73"
  },
  {
    id: "log-6",
    timestamp: "2025-04-18 08:15:52",
    level: "info",
    category: "user",
    message: "新使用者註冊",
    details: "用戶 ID: user-573, 電子郵件: linda.chen@example.com",
    service: "user-service",
    ipAddress: "203.0.113.89"
  },
  {
    id: "log-7",
    timestamp: "2025-04-18 08:10:17",
    level: "warning",
    category: "system",
    message: "高記憶體使用率",
    details: "記憶體使用率: 87%",
    service: "system-monitor"
  },
  {
    id: "log-8",
    timestamp: "2025-04-18 08:05:39",
    level: "info",
    category: "security",
    message: "管理員登入成功",
    details: "管理員 admin@beautyapp.com 登入管理介面",
    service: "auth-service",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    ipAddress: "203.0.113.10"
  },
  {
    id: "log-9",
    timestamp: "2025-04-18 08:01:22",
    level: "debug",
    category: "database",
    message: "資料庫查詢執行",
    details: "查詢 businesses 表格，耗時: 42ms",
    service: "database-service"
  },
  {
    id: "log-10",
    timestamp: "2025-04-18 08:00:05",
    level: "info",
    category: "system",
    message: "系統啟動完成",
    details: "所有服務正常啟動",
    service: "system-service"
  },
  {
    id: "log-11",
    timestamp: "2025-04-17 23:55:18",
    level: "error",
    category: "security",
    message: "未經授權的API存取嘗試",
    details: "IP 185.156.73.42 嘗試存取受限API，已阻擋",
    service: "api-gateway",
    ipAddress: "185.156.73.42"
  },
  {
    id: "log-12",
    timestamp: "2025-04-17 23:50:44",
    level: "warning",
    category: "database",
    message: "資料庫查詢緩慢",
    details: "查詢 transactions 表，耗時超過 3 秒",
    service: "database-service"
  }
];

const SystemLogsPage = () => {
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    // Basic date filtering
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return matchesSearch && 
             matchesCategory && 
             matchesLevel && 
             log.timestamp.includes(today);
    }
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRefresh = () => {
    // In a real app, this would fetch fresh logs from the server
    setLogs([...mockLogs]);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a log file
    alert('下載日誌功能將在實際操作中啟用');
  };

  const toggleLogDetails = (logId: string) => {
    if (expandedLogId === logId) {
      setExpandedLogId(null);
    } else {
      setExpandedLogId(logId);
    }
  };

  const renderLogIcon = (category: string) => {
    switch (category) {
      case 'system':
        return <Code className="w-5 h-5" />;
      case 'security':
        return <Lock className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'api':
        return <Network className="w-5 h-5" />;
      case 'user':
        return <FileText className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const renderLogBadge = (level: string) => {
    switch (level) {
      case 'error':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            錯誤
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            警告
          </Badge>
        );
      case 'info':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <Info className="w-3 h-3 mr-1" />
            資訊
          </Badge>
        );
      case 'debug':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            <Code className="w-3 h-3 mr-1" />
            除錯
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">系統日誌</h1>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="flex-1 sm:flex-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              className="flex-1 sm:flex-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              下載日誌
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜尋日誌..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="日誌等級" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有等級</SelectItem>
                  <SelectItem value="error">錯誤</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="info">資訊</SelectItem>
                  <SelectItem value="debug">除錯</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="類別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有類別</SelectItem>
                  <SelectItem value="system">系統</SelectItem>
                  <SelectItem value="security">安全</SelectItem>
                  <SelectItem value="database">資料庫</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="user">使用者</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="日期" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="all">所有日期</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">時間戳記</th>
                  <th className="py-3 px-4 text-left">等級</th>
                  <th className="py-3 px-4 text-left">類別</th>
                  <th className="py-3 px-4 text-left">訊息</th>
                  <th className="py-3 px-4 text-left">服務</th>
                  <th className="py-3 px-4 text-left">詳情</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 divide-y divide-gray-100">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr 
                        className={`hover:bg-gray-50 ${expandedLogId === log.id ? 'bg-gray-50' : ''}`}
                        onClick={() => toggleLogDetails(log.id)}
                      >
                        <td className="py-3 px-4 text-sm font-mono">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4">
                          {renderLogBadge(log.level)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className={`
                              p-1 rounded-md mr-2
                              ${log.category === 'system' ? 'bg-purple-100 text-purple-700' : ''}
                              ${log.category === 'security' ? 'bg-red-100 text-red-700' : ''}
                              ${log.category === 'database' ? 'bg-blue-100 text-blue-700' : ''}
                              ${log.category === 'api' ? 'bg-green-100 text-green-700' : ''}
                              ${log.category === 'user' ? 'bg-yellow-100 text-yellow-700' : ''}
                            `}>
                              {renderLogIcon(log.category)}
                            </div>
                            <span className="capitalize">{log.category}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {log.message}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {log.service || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      {expandedLogId === log.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={6} className="p-4">
                            <div className="text-sm">
                              <h4 className="font-medium mb-2">詳細資訊</h4>
                              <div className="bg-gray-100 p-3 rounded-md mb-3 font-mono text-xs">
                                {log.details || '無詳細資訊'}
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {log.ipAddress && (
                                  <div>
                                    <span className="font-medium">IP 地址:</span> {log.ipAddress}
                                  </div>
                                )}
                                
                                {log.userAgent && (
                                  <div>
                                    <span className="font-medium">用戶代理:</span>
                                    <div className="truncate max-w-xs" title={log.userAgent}>
                                      {log.userAgent}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      沒有找到符合條件的日誌記錄
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogsPage;
