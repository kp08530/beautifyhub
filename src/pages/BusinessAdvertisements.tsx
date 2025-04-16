
import { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, Trash2, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Define interfaces for type safety
interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: string;
}

// 示範用的假資料
const mockAds: Advertisement[] = [
  {
    id: "ad1",
    title: "春季美容特惠",
    imageUrl: "/placeholder.svg",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    status: "審核中"
  },
  {
    id: "ad2",
    title: "母親節感恩活動",
    imageUrl: "/placeholder.svg",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    status: "已核准"
  },
  {
    id: "ad3",
    title: "週年慶全館85折",
    imageUrl: "/placeholder.svg",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "已拒絕"
  }
];

const BusinessAdvertisements = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<Advertisement[]>(mockAds);
  const [adDialog, setAdDialog] = useState<{ open: boolean; mode: 'add' | 'edit'; data: Advertisement | null }>({ open: false, mode: 'add', data: null });
  const [viewDialog, setViewDialog] = useState<{ open: boolean; data: Advertisement | null }>({ open: false, data: null });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: '' });
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'status'> & { id?: string; status?: string }>({ 
    title: '', 
    imageUrl: '/placeholder.svg', 
    startDate: '', 
    endDate: '' 
  });

  const openAddAdDialog = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    setNewAd({ 
      title: '', 
      imageUrl: '/placeholder.svg', 
      startDate: today.toISOString().split('T')[0], 
      endDate: nextMonth.toISOString().split('T')[0] 
    });
    setAdDialog({ open: true, mode: 'add', data: null });
  };

  const openEditAdDialog = (ad: Advertisement) => {
    setNewAd({ ...ad });
    setAdDialog({ open: true, mode: 'edit', data: ad });
  };

  const openViewAdDialog = (ad: Advertisement) => {
    setViewDialog({ open: true, data: ad });
  };

  const handleAdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAd(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdSubmit = () => {
    if (adDialog.mode === 'add') {
      const newAdWithId: Advertisement = {
        ...newAd,
        id: `ad${ads.length + 1}`,
        status: '審核中'
      };
      setAds([...ads, newAdWithId]);
      toast({
        title: "廣告申請已送出",
        description: "您的廣告申請已送出，等待審核",
      });
    } else {
      const updatedAds = ads.map(ad => 
        ad.id === adDialog.data?.id ? { ...newAd, id: ad.id, status: ad.status } as Advertisement : ad
      );
      setAds(updatedAds);
      toast({
        title: "廣告已更新",
        description: "廣告資訊已更新成功",
      });
    }
    setAdDialog({ open: false, mode: 'add', data: null });
  };

  const handleAdDelete = (id: string) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = () => {
    const updatedAds = ads.filter(ad => ad.id !== deleteDialog.id);
    setAds(updatedAds);
    toast({
      title: "廣告已刪除",
      description: "該廣告已從您的清單中刪除",
    });
    setDeleteDialog({ open: false, id: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">廣告管理</h1>
            <p className="text-beauty-muted">管理您的行銷廣告</p>
          </div>
          <Button onClick={openAddAdDialog}>
            <Plus className="mr-2 h-4 w-4" /> 申請新廣告
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>廣告列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium">標題</th>
                    <th className="px-4 py-3 text-sm font-medium">開始日期</th>
                    <th className="px-4 py-3 text-sm font-medium">結束日期</th>
                    <th className="px-4 py-3 text-sm font-medium">狀態</th>
                    <th className="px-4 py-3 text-sm font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ads.map(ad => (
                    <tr key={ad.id}>
                      <td className="px-4 py-4">{ad.title}</td>
                      <td className="px-4 py-4">{ad.startDate}</td>
                      <td className="px-4 py-4">{ad.endDate}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ad.status === '已核准' 
                            ? 'bg-green-100 text-green-800' 
                            : ad.status === '審核中'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openViewAdDialog(ad)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditAdDialog(ad)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleAdDelete(ad.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>廣告指南</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <ImageIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">廣告尺寸規範</h3>
                  <p className="text-sm text-beauty-muted">建議尺寸為 1200 x 400 像素，檔案格式支援 JPG、PNG，大小不超過 2MB。</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">廣告內容規範</h3>
                  <p className="text-sm text-beauty-muted">廣告內容須與您的商家服務相關，不得含有誤導性、違法或不當內容。</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">審核時間</h3>
                  <p className="text-sm text-beauty-muted">廣告審核通常需要 1-2 個工作天，審核通過後會立即顯示在平台上。</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisement Dialog */}
      <Dialog open={adDialog.open} onOpenChange={(open) => !open && setAdDialog({ open: false, mode: 'add', data: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{adDialog.mode === 'add' ? '申請新廣告' : '編輯廣告'}</DialogTitle>
            <DialogDescription>
              請填寫以下資訊以{adDialog.mode === 'add' ? '申請' : '編輯'}廣告
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">廣告標題</label>
              <input
                type="text"
                name="title"
                value={newAd.title}
                onChange={handleAdChange}
                className="beauty-input w-full"
                placeholder="輸入廣告標題"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">開始日期</label>
                <input
                  type="date"
                  name="startDate"
                  value={newAd.startDate}
                  onChange={handleAdChange}
                  className="beauty-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">結束日期</label>
                <input
                  type="date"
                  name="endDate"
                  value={newAd.endDate}
                  onChange={handleAdChange}
                  className="beauty-input w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">廣告圖片</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="mb-2">
                  <img 
                    src={newAd.imageUrl} 
                    alt="廣告預覽" 
                    className="h-32 mx-auto object-cover"
                  />
                </div>
                <button className="beauty-button-outline text-sm">
                  上傳圖片
                </button>
                <p className="text-xs text-beauty-muted mt-2">
                  建議尺寸: 1200 x 400 像素，檔案大小不超過 2MB
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdDialog({ open: false, mode: 'add', data: null })}>
              取消
            </Button>
            <Button onClick={handleAdSubmit}>
              {adDialog.mode === 'add' ? '送出申請' : '儲存變更'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Advertisement Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => !open && setViewDialog({ open: false, data: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>廣告詳情</DialogTitle>
          </DialogHeader>
          
          {viewDialog.data && (
            <div className="space-y-4 py-2">
              <div className="mb-4">
                <img 
                  src={viewDialog.data.imageUrl} 
                  alt={viewDialog.data.title} 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-beauty-muted">廣告標題</p>
                  <p className="font-medium">{viewDialog.data.title}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">狀態</p>
                  <p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      viewDialog.data.status === '已核准' 
                        ? 'bg-green-100 text-green-800' 
                        : viewDialog.data.status === '審核中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {viewDialog.data.status}
                    </span>
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">開始日期</p>
                  <p className="font-medium">{viewDialog.data.startDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-beauty-muted">結束日期</p>
                  <p className="font-medium">{viewDialog.data.endDate}</p>
                </div>
              </div>
              
              {viewDialog.data.status === '已拒絕' && (
                <div>
                  <p className="text-sm text-beauty-muted mb-1">拒絕原因</p>
                  <p className="p-3 bg-red-50 text-red-800 rounded-md">
                    廣告內容不符合平台規範，建議調整後重新提交。
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialog({ open: false, data: null })}>
              關閉
            </Button>
            {viewDialog.data?.status === '已拒絕' && (
              <Button onClick={() => {
                setViewDialog({ open: false, data: null });
                openEditAdDialog(viewDialog.data);
              }}>
                編輯廣告
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, id: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除此廣告嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, id: '' })}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              確認刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BusinessAdvertisements;
