
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, ShieldAlert, Shield, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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

interface BusinessManagersDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  businessId: string | number;
  businessName: string;
}

interface Manager {
  id: string | number;
  name: string;
  email: string;
  role: "商家擁有者" | "商家管理員" | "一般管理員";
  avatar?: string;
  lastActive: string;
  permissions: string[];
}

export function BusinessManagersDialog({
  open,
  setOpen,
  businessId,
  businessName,
}: BusinessManagersDialogProps) {
  const { toast } = useToast();
  
  // Dummy managers data
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: 1,
      name: "李小花",
      email: "xiaohua@example.com",
      role: "商家擁有者",
      lastActive: "今天",
      permissions: ["全部權限"],
    },
    {
      id: 2,
      name: "王小明",
      email: "xiaoming@example.com",
      role: "商家管理員",
      lastActive: "2天前",
      permissions: ["使用者管理", "預約管理", "服務管理"],
    },
    {
      id: 3,
      name: "張大華",
      email: "dahua@example.com",
      role: "一般管理員",
      lastActive: "1週前",
      permissions: ["預約管理", "服務管理"],
    },
  ]);

  const [managerToRemove, setManagerToRemove] = useState<Manager | null>(null);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);

  const handleRemoveManager = () => {
    if (!managerToRemove) return;
    
    setManagers(managers.filter((manager) => manager.id !== managerToRemove.id));
    
    toast({
      title: "成功移除管理員",
      description: `${managerToRemove.name} 已從 ${businessName} 的管理團隊中移除`,
    });
    
    setShowRemoveAlert(false);
    setManagerToRemove(null);
  };

  const handleAddNewManager = () => {
    // In a real application, this would open a form to add a new manager
    toast({
      title: "新增管理員功能",
      description: "此功能正在開發中",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{businessName} 的管理團隊</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">
                共 {managers.length} 位管理員
              </h3>
              <Button size="sm" onClick={handleAddNewManager}>
                <UserPlus className="h-4 w-4 mr-2" />
                新增管理員
              </Button>
            </div>
            
            <div className="space-y-4">
              {managers.map((manager) => (
                <div 
                  key={manager.id.toString()} 
                  className="flex items-center justify-between bg-card p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {manager.avatar ? (
                        <AvatarImage src={manager.avatar} alt={manager.name} />
                      ) : (
                        <AvatarFallback>{getInitials(manager.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {manager.name}
                        <Badge variant={manager.role === "商家擁有者" ? "default" : "secondary"} className="ml-2">
                          {manager.role === "商家擁有者" && <ShieldAlert className="h-3 w-3 mr-1" />}
                          {manager.role === "商家管理員" && <Shield className="h-3 w-3 mr-1" />}
                          {manager.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{manager.email}</div>
                      <div className="text-xs mt-1">
                        上次活動: {manager.lastActive}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast({ title: "編輯管理員", description: "此功能正在開發中" })}>
                          編輯資料
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast({ title: "變更權限", description: "此功能正在開發中" })}>
                          變更權限
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {manager.role !== "商家擁有者" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => {
                          setManagerToRemove(manager);
                          setShowRemoveAlert(true);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showRemoveAlert} onOpenChange={setShowRemoveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要移除此管理員？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作將移除 {managerToRemove?.name} 作為 {businessName} 的管理員。此操作可以被撤銷。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveManager} className="bg-red-600 hover:bg-red-700">
              移除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
