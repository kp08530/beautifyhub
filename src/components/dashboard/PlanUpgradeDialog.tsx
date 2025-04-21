
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PaymentSystem from '../PaymentSystem';

interface PlanUpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  businessId: string;
  businessName: string;
  onPlanChange: (businessId: string, newPlan: string) => void;
}

interface PlanOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const PlanUpgradeDialog = ({ 
  isOpen, 
  onClose, 
  currentPlan, 
  businessId,
  businessName,
  onPlanChange 
}: PlanUpgradeDialogProps) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>(currentPlan);
  const [showPayment, setShowPayment] = useState(false);
  
  const plans: PlanOption[] = [
    {
      id: "基礎版",
      name: "基礎版",
      price: 0,
      description: "適合小型美容工作室",
      features: [
        "基本預約管理",
        "基本客戶管理",
        "最多5位員工"
      ]
    },
    {
      id: "專業版",
      name: "專業版",
      price: 399,
      description: "適合中型美容沙龍",
      features: [
        "進階預約管理",
        "無限員工數量",
        "進階客戶管理",
        "客戶關係管理",
        "數據分析報表"
      ]
    },
    {
      id: "企業版",
      name: "企業版",
      price: 1299,
      description: "適合連鎖美容集團",
      features: [
        "所有專業版功能",
        "多分店管理",
        "客製化需求",
        "專屬客服支援",
        "API 存取"
      ]
    }
  ];

  const handleContinue = () => {
    // 如果選擇基礎版，不需要顯示付款頁面
    if (selectedPlan === "基礎版") {
      handlePlanChange();
      return;
    }
    
    // 如果選擇的方案與當前相同，不需要操作
    if (selectedPlan === currentPlan) {
      toast({
        title: "您已經使用此方案",
        description: `您目前已經是${currentPlan}方案的用戶`,
      });
      onClose();
      return;
    }
    
    // 顯示付款頁面
    setShowPayment(true);
  };

  const handlePlanChange = () => {
    // 更新方案
    onPlanChange(businessId, selectedPlan);
    
    toast({
      title: "方案已更新",
      description: `${businessName} 已成功更新為 ${selectedPlan}`,
    });
    
    onClose();
  };

  const getSelectedPlanPrice = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return plan ? plan.price : 0;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>變更服務方案</DialogTitle>
            <DialogDescription>
              選擇適合 {businessName} 的服務方案
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedPlan === plan.id ? 'border-beauty-primary ring-2 ring-beauty-primary/20' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold flex items-center">
                            <Package className="w-4 h-4 mr-2" />
                            {plan.name}
                          </h3>
                          {currentPlan === plan.id && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              目前方案
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                        <p className="text-lg font-bold mt-2">
                          {plan.price > 0 ? `NT$${plan.price}/月` : '免費'}
                        </p>
                      </div>
                      
                      <div className="mt-auto">
                        <ul className="text-xs space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleContinue}>
              {selectedPlan === currentPlan ? '確認' : '繼續'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <PaymentSystem 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        plan={selectedPlan}
        amount={getSelectedPlanPrice()}
        onSuccess={handlePlanChange}
      />
    </>
  );
};

export default PlanUpgradeDialog;
