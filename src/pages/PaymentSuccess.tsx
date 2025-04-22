
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentInfo = location.state || {
    plan: '未知方案',
    amount: 0,
    transactionId: '未知',
    date: new Date().toISOString()
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">付款成功</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">訂閱方案</p>
                  <p className="font-semibold">{paymentInfo.plan}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">付款金額</p>
                  <p className="font-semibold">NT${paymentInfo.amount} / 月</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">交易編號</p>
                  <p className="font-mono text-sm">{paymentInfo.transactionId}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">交易時間</p>
                  <p className="text-sm">{new Date(paymentInfo.date).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button className="w-full" asChild>
                  <Link to="/dashboard">
                    前往商家後台
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/support">
                    需要幫助？
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentSuccess;
