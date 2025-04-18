
import { useState } from 'react';
import { 
  Database, 
  FileStack, 
  Upload, 
  Download, 
  CheckCircle, 
  XCircle,
  Trash2,
  FileJson,
  FileSpreadsheet,
  FileCog,
  Filter,
  Search,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface DataFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: string;
  description?: string;
}

interface DataExport {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'processing' | 'completed' | 'failed';
  requestDate: string;
  completionDate?: string;
}

interface DataImport {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'processing' | 'completed' | 'failed' | 'pending';
  progress: number;
  startDate: string;
  completionDate?: string;
  errorMessage?: string;
}

const mockFiles: DataFile[] = [
  { 
    id: 'file-1', 
    name: 'businesses_data_2025.json', 
    type: 'JSON', 
    size: '2.4 MB', 
    status: 'approved', 
    uploadDate: '2025-04-01',
    description: '美容院業者資料'
  },
  { 
    id: 'file-2', 
    name: 'users_april.csv', 
    type: 'CSV', 
    size: '5.1 MB', 
    status: 'approved', 
    uploadDate: '2025-04-10',
    description: '用戶資料'
  },
  { 
    id: 'file-3', 
    name: 'transactions_q1.csv', 
    type: 'CSV', 
    size: '8.7 MB', 
    status: 'pending', 
    uploadDate: '2025-04-15',
    description: '第一季交易紀錄'
  },
  { 
    id: 'file-4', 
    name: 'services_catalog.json', 
    type: 'JSON', 
    size: '1.2 MB', 
    status: 'rejected', 
    uploadDate: '2025-04-12',
    description: '服務項目目錄 (格式錯誤)'
  }
];

const mockExports: DataExport[] = [
  { 
    id: 'export-1', 
    name: 'users_full_export.csv', 
    type: 'CSV', 
    size: '24.8 MB', 
    status: 'completed', 
    requestDate: '2025-04-10',
    completionDate: '2025-04-10'
  },
  { 
    id: 'export-2', 
    name: 'transactions_march.xlsx', 
    type: 'XLSX', 
    size: '18.3 MB', 
    status: 'processing', 
    requestDate: '2025-04-17'
  },
  { 
    id: 'export-3', 
    name: 'appointments_q1.csv', 
    type: 'CSV', 
    size: '5.7 MB', 
    status: 'completed', 
    requestDate: '2025-04-01',
    completionDate: '2025-04-01'
  },
  { 
    id: 'export-4', 
    name: 'analytics_dashboard.json', 
    type: 'JSON', 
    size: '1.5 MB', 
    status: 'failed', 
    requestDate: '2025-04-16'
  }
];

const mockImports: DataImport[] = [
  { 
    id: 'import-1', 
    name: 'new_businesses.csv', 
    type: 'CSV', 
    size: '3.2 MB', 
    status: 'completed', 
    progress: 100,
    startDate: '2025-04-15',
    completionDate: '2025-04-15'
  },
  { 
    id: 'import-2', 
    name: 'services_update.json', 
    type: 'JSON', 
    size: '2.1 MB', 
    status: 'processing', 
    progress: 65,
    startDate: '2025-04-17'
  },
  { 
    id: 'import-3', 
    name: 'categories_list.csv', 
    type: 'CSV', 
    size: '0.8 MB', 
    status: 'failed', 
    progress: 42,
    startDate: '2025-04-16',
    errorMessage: '行 143: 格式無效'
  },
  { 
    id: 'import-4', 
    name: 'business_hours.csv', 
    type: 'CSV', 
    size: '1.3 MB', 
    status: 'pending', 
    progress: 0,
    startDate: '2025-04-17'
  }
];

const DataManagementPage = () => {
  const [files, setFiles] = useState<DataFile[]>(mockFiles);
  const [exports, setExports] = useState<DataExport[]>(mockExports);
  const [imports, setImports] = useState<DataImport[]>(mockImports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [exportType, setExportType] = useState('csv');
  const [exportData, setExportData] = useState(['users']);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    const matchesType = typeFilter === 'all' || file.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleFileDelete = (id: string) => {
    setSelectedFileId(id);
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = () => {
    setFiles(files.filter(file => file.id !== selectedFileId));
    setShowDeleteDialog(false);
    
    toast({
      title: "檔案已刪除",
      description: "檔案已成功從系統中移除",
    });
  };
  
  const handleApprove = (id: string) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, status: 'approved' } : file
    ));
    
    toast({
      title: "檔案已核准",
      description: "檔案已成功核准並新增至系統",
    });
  };
  
  const handleReject = (id: string) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, status: 'rejected' } : file
    ));
    
    toast({
      title: "檔案已拒絕",
      description: "檔案已被標記為拒絕",
      variant: "destructive",
    });
  };
  
  const startExport = () => {
    setExporting(true);
    
    setTimeout(() => {
      const newExport: DataExport = {
        id: `export-${exports.length + 1}`,
        name: `${exportData.join('_')}_export.${exportType}`,
        type: exportType.toUpperCase(),
        size: '0 MB',
        status: 'processing',
        requestDate: new Date().toISOString().split('T')[0]
      };
      
      setExports([newExport, ...exports]);
      setExporting(false);
      setShowExportDialog(false);
      
      toast({
        title: "匯出任務已開始",
        description: "您將在完成後收到通知",
      });
      
      // Simulate export completion after 3 seconds
      setTimeout(() => {
        setExports(exports => exports.map(exp => 
          exp.id === newExport.id ? {
            ...exp,
            status: 'completed',
            size: '12.4 MB',
            completionDate: new Date().toISOString().split('T')[0]
          } : exp
        ));
        
        toast({
          title: "匯出已完成",
          description: "資料已可供下載",
          variant: "default",
        });
      }, 3000);
    }, 1500);
  };
  
  const startImport = () => {
    setImporting(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate import process
    setTimeout(() => {
      const newImport: DataImport = {
        id: `import-${imports.length + 1}`,
        name: "uploaded_file.csv",
        type: "CSV",
        size: "2.8 MB",
        status: 'processing',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0]
      };
      
      setImports([newImport, ...imports]);
      setImporting(false);
      setShowImportDialog(false);
      setUploadProgress(0);
      clearInterval(interval);
      
      toast({
        title: "檔案已上傳",
        description: "資料匯入處理已開始",
      });
      
      // Simulate import progress and completion
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        
        if (progress <= 100) {
          setImports(imports => imports.map(imp => 
            imp.id === newImport.id ? {
              ...imp,
              progress,
              status: progress < 100 ? 'processing' : 'completed',
              completionDate: progress >= 100 ? new Date().toISOString().split('T')[0] : undefined
            } : imp
          ));
        }
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          toast({
            title: "匯入已完成",
            description: "資料已成功匯入至系統",
            variant: "default",
          });
        }
      }, 200);
    }, 3000);
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">數據管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            匯出資料
          </Button>
          <Button onClick={() => setShowImportDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            匯入資料
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="files" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="files" className="flex items-center">
            <FileStack className="mr-2 h-4 w-4" />
            資料檔案
          </TabsTrigger>
          <TabsTrigger value="exports" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            匯出紀錄
          </TabsTrigger>
          <TabsTrigger value="imports" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            匯入紀錄
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="files">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜尋檔案..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有狀態</SelectItem>
                    <SelectItem value="approved">已核准</SelectItem>
                    <SelectItem value="pending">審核中</SelectItem>
                    <SelectItem value="rejected">已拒絕</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <FileCog className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="檔案類型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有類型</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 text-left">檔案名稱</th>
                    <th className="py-3 px-4 text-left">格式</th>
                    <th className="py-3 px-4 text-left">大小</th>
                    <th className="py-3 px-4 text-left">上傳日期</th>
                    <th className="py-3 px-4 text-left">狀態</th>
                    <th className="py-3 px-4 text-left">操作</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-100">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {file.type === 'CSV' && <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />}
                            {file.type === 'JSON' && <FileJson className="h-5 w-5 mr-2 text-blue-600" />}
                            <div>
                              <div className="font-medium">{file.name}</div>
                              {file.description && (
                                <div className="text-sm text-gray-500">{file.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{file.type}</td>
                        <td className="py-3 px-4">{file.size}</td>
                        <td className="py-3 px-4">{file.uploadDate}</td>
                        <td className="py-3 px-4">
                          {file.status === 'approved' && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              已核准
                            </Badge>
                          )}
                          {file.status === 'pending' && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              審核中
                            </Badge>
                          )}
                          {file.status === 'rejected' && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              已拒絕
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {file.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleApprove(file.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleReject(file.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFileDelete(file.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        沒有找到符合條件的檔案
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="exports">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 text-left">匯出名稱</th>
                    <th className="py-3 px-4 text-left">格式</th>
                    <th className="py-3 px-4 text-left">大小</th>
                    <th className="py-3 px-4 text-left">請求日期</th>
                    <th className="py-3 px-4 text-left">完成日期</th>
                    <th className="py-3 px-4 text-left">狀態</th>
                    <th className="py-3 px-4 text-left">操作</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-100">
                  {exports.map((exp) => (
                    <tr key={exp.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex items-center">
                          {exp.type === 'CSV' && <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />}
                          {exp.type === 'JSON' && <FileJson className="h-5 w-5 mr-2 text-blue-600" />}
                          {exp.type === 'XLSX' && <FileSpreadsheet className="h-5 w-5 mr-2 text-indigo-600" />}
                          {exp.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">{exp.type}</td>
                      <td className="py-3 px-4">{exp.size}</td>
                      <td className="py-3 px-4">{exp.requestDate}</td>
                      <td className="py-3 px-4">{exp.completionDate || '-'}</td>
                      <td className="py-3 px-4">
                        {exp.status === 'completed' && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            已完成
                          </Badge>
                        )}
                        {exp.status === 'processing' && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            處理中
                          </Badge>
                        )}
                        {exp.status === 'failed' && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            失敗
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {exp.status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={exp.status === 'processing'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="imports">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 text-left">檔案名稱</th>
                    <th className="py-3 px-4 text-left">格式</th>
                    <th className="py-3 px-4 text-left">大小</th>
                    <th className="py-3 px-4 text-left">開始日期</th>
                    <th className="py-3 px-4 text-left">完成日期</th>
                    <th className="py-3 px-4 text-left">進度</th>
                    <th className="py-3 px-4 text-left">狀態</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-100">
                  {imports.map((imp) => (
                    <tr key={imp.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex items-center">
                          {imp.type === 'CSV' && <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />}
                          {imp.type === 'JSON' && <FileJson className="h-5 w-5 mr-2 text-blue-600" />}
                          {imp.name}
                        </div>
                        {imp.errorMessage && (
                          <div className="text-sm text-red-500 mt-1">{imp.errorMessage}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">{imp.type}</td>
                      <td className="py-3 px-4">{imp.size}</td>
                      <td className="py-3 px-4">{imp.startDate}</td>
                      <td className="py-3 px-4">{imp.completionDate || '-'}</td>
                      <td className="py-3 px-4 w-[200px]">
                        <div className="w-full">
                          <Progress value={imp.progress} className="h-2" />
                          <span className="text-xs text-gray-500 mt-1 block">{imp.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {imp.status === 'completed' && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            已完成
                          </Badge>
                        )}
                        {imp.status === 'processing' && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            處理中
                          </Badge>
                        )}
                        {imp.status === 'failed' && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            失敗
                          </Badge>
                        )}
                        {imp.status === 'pending' && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            等待中
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>匯出資料</DialogTitle>
            <DialogDescription>
              選擇您想匯出的資料類型和格式
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">資料範圍</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="users"
                    checked={exportData.includes('users')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportData(prev => [...prev, 'users']);
                      } else {
                        setExportData(prev => prev.filter(item => item !== 'users'));
                      }
                    }}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="users" className="ml-2 text-sm text-gray-700">用戶資料</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="businesses"
                    checked={exportData.includes('businesses')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportData(prev => [...prev, 'businesses']);
                      } else {
                        setExportData(prev => prev.filter(item => item !== 'businesses'));
                      }
                    }}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="businesses" className="ml-2 text-sm text-gray-700">商家資料</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="appointments"
                    checked={exportData.includes('appointments')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportData(prev => [...prev, 'appointments']);
                      } else {
                        setExportData(prev => prev.filter(item => item !== 'appointments'));
                      }
                    }}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="appointments" className="ml-2 text-sm text-gray-700">預約資料</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="services"
                    checked={exportData.includes('services')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportData(prev => [...prev, 'services']);
                      } else {
                        setExportData(prev => prev.filter(item => item !== 'services'));
                      }
                    }}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="services" className="ml-2 text-sm text-gray-700">服務項目</label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">匯出格式</label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="選擇格式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">XLSX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              取消
            </Button>
            <Button 
              onClick={startExport} 
              disabled={exporting || exportData.length === 0}
            >
              {exporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  處理中...
                </>
              ) : (
                '開始匯出'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>匯入資料</DialogTitle>
            <DialogDescription>
              上傳您的資料檔案以匯入系統
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">選擇檔案</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-8 text-center">
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                    點擊上傳
                  </label>
                  <input id="file-upload" type="file" className="sr-only" />
                  <p className="text-xs text-gray-500">支援 CSV、JSON 或 XLSX 格式</p>
                </div>
              </div>
            </div>
            
            {uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>上傳進度</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">資料類型</label>
              <Select defaultValue="users">
                <SelectTrigger>
                  <SelectValue placeholder="選擇資料類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">用戶資料</SelectItem>
                  <SelectItem value="businesses">商家資料</SelectItem>
                  <SelectItem value="services">服務項目</SelectItem>
                  <SelectItem value="appointments">預約資料</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">匯入選項</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="override"
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="override" className="ml-2 text-sm text-gray-700">覆蓋現有資料</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="validate"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked
                  />
                  <label htmlFor="validate" className="ml-2 text-sm text-gray-700">匯入前驗證資料</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              取消
            </Button>
            <Button 
              onClick={startImport} 
              disabled={importing}
            >
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  處理中...
                </>
              ) : (
                '開始匯入'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除此檔案嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              確認刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataManagementPage;
