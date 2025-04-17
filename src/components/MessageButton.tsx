
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface MessageButtonProps {
  businessId: string;
  businessName: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const MessageButton = ({ 
  businessId, 
  businessName, 
  variant = "default", 
  size = "default",
  className = ""
}: MessageButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能發送訊息給商家",
        variant: "destructive",
      });
      
      navigate('/login');
      return;
    }
    
    setIsDialogOpen(true);
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "無法發送",
        description: "請輸入訊息內容",
        variant: "destructive",
      });
      return;
    }
    
    setIsDialogOpen(false);
    navigate(`/messages?business=${businessId}`);
    
    toast({
      title: "訊息已送出",
      description: `您的訊息已發送給 ${businessName}`,
    });
  };
  
  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        onClick={handleClick}
        className={className}
      >
        <MessageCircle className="mr-2" size={16} />
        聯絡商家
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>傳送訊息給 {businessName}</DialogTitle>
            <DialogDescription>
              填寫您想詢問的問題或預約需求，商家將盡快回覆您。
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="在此輸入您的訊息..."
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSendMessage}>
              發送訊息
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageButton;
