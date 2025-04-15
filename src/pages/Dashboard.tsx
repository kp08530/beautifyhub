
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">歡迎回來</h1>
          <p className="text-beauty-muted">查看您的業務概況</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">今日預約</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">本月營收</h3>
            <p className="text-2xl font-bold">NT$ 145,000</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">活躍客戶</h3>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
