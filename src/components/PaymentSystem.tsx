
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentSystemProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  amount: number;
  onSuccess?: () => void;
}

const PaymentSystem = ({ isOpen, onClose, plan, amount, onSuccess }: PaymentSystemProps) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表單驗證
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast({
        title: "請填寫所有欄位",
        variant: "destructive",
      });
      return;
    }
    
    // 簡單的信用卡號驗證 (只是示例, 實際應使用專業的驗證庫)
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "信用卡號無效",
        description: "請輸入有效的16位信用卡號",
        variant: "destructive",
      });
      return;
    }
    
    // 模擬付款處理
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "付款成功",
        description: `您已成功訂閱${plan}方案`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    }, 2000);
  };

  // 格式化信用卡號碼 4位一組
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // 格式化有效期限
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>完成付款</DialogTitle>
          <DialogDescription>
            訂閱 {plan} 方案，每月 NT${amount}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handlePayment}>
          <div className="space-y-6 py-4">
            <Card>
              <CardContent className="p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500">訂閱總額</p>
                  <p className="text-2xl font-bold">NT${amount} / 月</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">信用卡號碼</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>
              
              <div>
                <Label htmlFor="cardName">持卡人姓名</Label>
                <Input
                  id="cardName"
                  placeholder="王小明"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="expiry">有效期限</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                </div>
                
                <div className="w-24">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>此為模擬付款系統，請勿輸入真實信用卡資訊。</p>
              <p>在實際產品中，應整合第三方支付服務如Stripe或綠界科技。</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose} disabled={isProcessing}>
              取消
            </Button>
            <Button type="submit" isLoading={isProcessing}>
              {isProcessing ? '處理中...' : '確認付款'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSystem;
