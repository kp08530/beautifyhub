
import { toast } from "@/hooks/use-toast";

// This is a mock function that would be replaced with actual API calls to your backend
export const changePlan = async (businessId: string, newPlan: string) => {
  console.log(`Changing plan for business ${businessId} to ${newPlan}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would call your backend API to update the business plan
  // Return success status
  return { success: true };
};

// This is a utility function to get plan price
export const getPlanPrice = (plan: string): number => {
  switch (plan) {
    case "基礎版":
      return 0;
    case "專業版":
      return 399;
    case "企業版":
      return 1299;
    default:
      return 0;
  }
};

// This is a utility function to get features by plan
export const getPlanFeatures = (plan: string): string[] => {
  const baseFeatures = [
    "基本預約管理",
    "基本客戶管理"
  ];
  
  const proFeatures = [
    ...baseFeatures,
    "進階預約管理",
    "無限員工數量",
    "進階客戶管理",
    "客戶關係管理",
    "數據分析報表"
  ];
  
  const enterpriseFeatures = [
    ...proFeatures,
    "多分店管理",
    "客製化需求",
    "專屬客服支援",
    "API 存取"
  ];
  
  switch (plan) {
    case "基礎版":
      return [...baseFeatures, "最多5位員工"];
    case "專業版":
      return proFeatures;
    case "企業版":
      return enterpriseFeatures;
    default:
      return baseFeatures;
  }
};

// Helper function to determine if a feature is available for a plan
export const isPlanFeatureAvailable = (plan: string, feature: string): boolean => {
  return getPlanFeatures(plan).includes(feature);
};

// Get permission sets
export const getPermissionSets = () => {
  return {
    "基本權限": [
      "查看預約",
      "基本客戶管理",
      "查看服務項目"
    ],
    "員工權限": [
      "查看預約",
      "建立預約",
      "修改預約",
      "基本客戶管理",
      "查看服務項目" 
    ],
    "管理員權限": [
      "查看預約",
      "建立預約",
      "修改預約",
      "取消預約",
      "基本客戶管理",
      "進階客戶管理",
      "查看服務項目",
      "編輯服務項目",
      "查看業績報表"
    ],
    "超級管理員權限": [
      "查看預約",
      "建立預約",
      "修改預約",
      "取消預約",
      "基本客戶管理",
      "進階客戶管理",
      "查看服務項目",
      "編輯服務項目",
      "刪除服務項目",
      "查看業績報表",
      "管理員工",
      "系統設定"
    ],
    "自訂權限": []
  };
};

// Get all possible permissions
export const getAllPermissions = () => {
  return [
    // 預約相關
    { id: "view_appointments", name: "查看預約", category: "預約管理" },
    { id: "create_appointments", name: "建立預約", category: "預約管理" },
    { id: "edit_appointments", name: "修改預約", category: "預約管理" },
    { id: "cancel_appointments", name: "取消預約", category: "預約管理" },
    
    // 客戶相關
    { id: "view_customers", name: "基本客戶管理", category: "客戶管理" },
    { id: "edit_customers", name: "進階客戶管理", category: "客戶管理" },
    { id: "delete_customers", name: "刪除客戶資料", category: "客戶管理" },
    
    // 服務相關
    { id: "view_services", name: "查看服務項目", category: "服務管理" },
    { id: "edit_services", name: "編輯服務項目", category: "服務管理" },
    { id: "delete_services", name: "刪除服務項目", category: "服務管理" },
    
    // 報表相關
    { id: "view_reports", name: "查看業績報表", category: "報表管理" },
    { id: "export_reports", name: "匯出報表", category: "報表管理" },
    
    // 管理相關
    { id: "manage_staff", name: "管理員工", category: "系統管理" },
    { id: "system_settings", name: "系統設定", category: "系統管理" },
  ];
};
