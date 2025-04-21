
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
