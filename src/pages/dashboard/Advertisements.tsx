
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
import { Eye, CheckCircle, XCircle, Search, ImagePlus, Pencil, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdvertisementManagementDialog } from "@/components/dashboard/AdvertisementManagementDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

interface Advertisement {
  id: string | number;
  title: string;
  business: string;
  startDate: string;
  endDate: string;
  position?: string;
  status: string;
  imageUrl?: string;
}

const AdvertisementsPage = () => {
  const { toast } = useToast();
  
  // Dummy data for demonstration
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    { id: 1, title: "春季美容優惠", business: "美麗髮廊", startDate: "2025-04-01", endDate: "2025-04-30", position: "一般", status: "待審核" },
    { id: 2, title: "母親節特惠", business: "時尚美甲", startDate: "2025-05-01", endDate: "2025-05-15", position: "優先", status: "已核准" },
    { id: 3, title: "週年慶活動", business: "專業SPA中心", startDate: "2025-06-01", endDate: "2025-06-30", position: "次要", status: "已拒絕" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState<Advertisement | undefined>(undefined);

  const statuses = [
    { value: "待審核", label: "待審核" },
    { value: "已核准", label: "已核准" },
    { value: "已拒絕", label: "已拒絕" },
  ];

  const filteredAds = advertisements.filter(ad => {
    // Text search filter
    const matchesSearchTerm = 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.business.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatusFilter = statusFilter.length === 0 || 
      statusFilter.includes(ad.status);
    
    return matchesSearchTerm && matchesStatusFilter;
  });

  const handleAddAdvertisement = (adData: {
    title: string;
    business: string;
    startDate: string;
    endDate: string;
    position: "優先" | "一般" | "次要";
    status: "待審核" | "已核准" | "已拒絕";
    imageUrl?: string;
  }) => {
    const newAd = {
      id: advertisements.length + 1,
      title: adData.title,
      business: adData.business,
      startDate: adData.startDate,
      endDate: adData.endDate,
      position: adData.position,
      status: adData.status,
      imageUrl: adData.imageUrl,
    };
    
    setAdvertisements([...advertisements, newAd]);
    
    toast({
      title: "新增成功",
      description: `廣告 "${adData.title}" 已成功新增`,
    });
  };

  const handleEditAdvertisement = (adData: {
    id?: string | number;
    title: string;
    business: string;
    startDate: string;
    endDate: string;
    position: "優先" | "一般" | "次要";
    status: "待審核" | "已核准" | "已拒絕";
    imageUrl?: string;
  }) => {
    if (!adData.id) return;
    
    setAdvertisements(advertisements.map(ad => 
      ad.id === adData.id
        ? { 
            ...ad, 
            title: adData.title, 
            business: adData.business, 
            startDate: adData.startDate, 
            endDate: adData.endDate,
            position: adData.position,
            status: adData.status,
            imageUrl: adData.imageUrl,
          }
        : ad
    ));
    
    toast({
      title: "更新成功",
      description: `廣告 "${adData.title}" 的資訊已更新`,
    });
  };

  const handleReviewAdvertisement = (adData: {
    id?: string | number;
    title: string;
    business: string;
    startDate: string;
    endDate: string;
    position: "優先" | "一般" | "次要";
    status: "待審核" | "已核准" | "已拒絕";
    imageUrl?: string;
  }) => {
    if (!adData.id) return;
    
    setAdvertisements(advertisements.map(ad => 
      ad.id === adData.id
        ? { 
            ...ad, 
            title: adData.title, 
            business: adData.business, 
            startDate: adData.startDate, 
            endDate: adData.endDate,
            position: adData.position,
            status: adData.status,
            imageUrl: adData.imageUrl,
          }
        : ad
    ));
    
    toast({
      title: adData.status === "已核准" ? "廣告已核准" : "廣告已拒絕",
      description: adData.status === "已核准" 
        ? `廣告 "${adData.title}" 已設置為${adData.position}輪播位置`
        : `廣告 "${adData.title}" 已被拒絕`,
    });
  };

  const handleRejectAdvertisement = () => {
    if (!currentAd) return;
    
    setAdvertisements(advertisements.map(ad => 
      ad.id === currentAd.id
        ? { ...ad, status: "已拒絕" }
        : ad
    ));
    
    toast({
      title: "廣告已拒絕",
      description: `廣告 "${currentAd.title}" 已被拒絕`,
    });
    
    setIsRejectDialogOpen(false);
  };

  const approveAdvertisement = (adId: string | number) => {
    const ad = advertisements.find(ad => ad.id === adId);
    if (!ad) return;
    
    setCurrentAd(ad);
    setIsReviewDialogOpen(true);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">廣告管理</h1>
            <p className="text-beauty-muted">管理和審核商家的廣告申請</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <ImagePlus className="mr-2 h-4 w-4" />
            新增廣告
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>廣告申請列表</CardTitle>
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
                    placeholder="搜尋廣告..."
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
                  <TableHead>商家</TableHead>
                  <TableHead>輪播位置</TableHead>
                  <TableHead>開始日期</TableHead>
                  <TableHead>結束日期</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAds.length > 0 ? (
                  filteredAds.map((ad) => (
                    <TableRow key={ad.id.toString()}>
                      <TableCell>{ad.id}</TableCell>
                      <TableCell>{ad.title}</TableCell>
                      <TableCell>{ad.business}</TableCell>
                      <TableCell>{ad.position || "未設置"}</TableCell>
                      <TableCell>{ad.startDate}</TableCell>
                      <TableCell>{ad.endDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ad.status === "已核准" 
                            ? "bg-green-100 text-green-800"
                            : ad.status === "待審核"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}>
                          {ad.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon"
                            onClick={() => {
                              setCurrentAd(ad);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {ad.status === "待審核" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600"
                                onClick={() => approveAdvertisement(ad.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600"
                                onClick={() => {
                                  setCurrentAd(ad);
                                  setIsRejectDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      沒有找到符合條件的廣告
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Advertisement Dialog */}
      <AdvertisementManagementDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddAdvertisement}
        mode="add"
      />

      {/* Edit Advertisement Dialog */}
      {currentAd && (
        <AdvertisementManagementDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          advertisement={currentAd}
          onSave={handleEditAdvertisement}
          mode="edit"
        />
      )}

      {/* Review Advertisement Dialog */}
      {currentAd && (
        <AdvertisementManagementDialog
          isOpen={isReviewDialogOpen}
          onClose={() => setIsReviewDialogOpen(false)}
          advertisement={currentAd}
          onSave={handleReviewAdvertisement}
          mode="review"
        />
      )}

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要拒絕此廣告？</AlertDialogTitle>
            <AlertDialogDescription>
              你確定要拒絕 "{currentAd?.title}" 的廣告申請嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleRejectAdvertisement} className="bg-red-600 hover:bg-red-700">
              拒絕
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default AdvertisementsPage;
