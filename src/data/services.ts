export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;  // Optional discount price
  duration: number; // in minutes
  category: string;
  imageUrl?: string;
  businessName?: string;  // Optional business name
}

export const services: Service[] = [
  {
    id: "1",
    businessId: "1",
    name: "基礎面部護理",
    description: "深層清潔，去除黑頭，舒緩肌膚，適合所有膚質。",
    price: 1200,
    duration: 60,
    category: "面部護理",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "2",
    businessId: "1",
    name: "抗衰老面部護理",
    description: "使用高級抗衰老成分，減少細紋，增加膚色亮度。",
    price: 1800,
    duration: 75,
    category: "面部護理",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    businessId: "1",
    name: "經典指甲護理",
    description: "修剪，拋光，滋養指甲，讓您的指甲健康亮麗。",
    price: 600,
    duration: 45,
    category: "美甲",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "4",
    businessId: "2",
    name: "時尚剪髮",
    description: "由專業髮型師為您打造適合您臉型的髮型。",
    price: 800,
    duration: 60,
    category: "美髮",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "5",
    businessId: "2",
    name: "染髮服務",
    description: "使用高品質染髮產品，保護頭髮健康，打造亮麗髮色。",
    price: 1500,
    duration: 120,
    category: "美髮",
    imageUrl: "https://images.unsplash.com/photo-1549236177-f9b1add93f6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "6",
    businessId: "2",
    name: "髮質修復護理",
    description: "針對受損髮質，修復髮絲，增加光澤和彈性。",
    price: 1200,
    duration: 90,
    category: "美髮",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "7",
    businessId: "3",
    name: "深層保濕護理",
    description: "為乾燥肌膚提供深層保濕，恢復肌膚水分平衡。",
    price: 1600,
    duration: 60,
    category: "護膚",
    imageUrl: "https://images.unsplash.com/photo-1571191587685-0c92069639c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "8",
    businessId: "3",
    name: "亮白護理",
    description: "改善膚色不均，淡化黑斑，提亮膚色。",
    price: 1800,
    duration: 75,
    category: "護膚",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "9",
    businessId: "3",
    name: "身體去角質",
    description: "去除死皮，使皮膚光滑細緻，促進血液循環。",
    price: 1200,
    duration: 60,
    category: "���體護理",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "10",
    businessId: "4",
    name: "凝膠美甲",
    description: "使用凝膠材料，打造持久亮麗的指甲。",
    price: 800,
    duration: 60,
    category: "美甲",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "11",
    businessId: "4",
    name: "手部水療",
    description: "深層滋養手部肌膚，使手部柔軟細膩。",
    price: 600,
    duration: 45,
    category: "手部護理",
    imageUrl: "https://images.unsplash.com/photo-1552693673-1bf958298935?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "12",
    businessId: "4",
    name: "足部護理",
    description: "全面足部護理，去除硬皮，滋養足部肌膚。",
    price: 700,
    duration: 50,
    category: "足部護理",
    imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

export const getServicesByBusinessId = (businessId: string): Service[] => {
  return services.filter(service => service.businessId === businessId);
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export interface PortfolioItem {
  id: string;
  businessId: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    businessId: "1",
    title: "自然妝容",
    description: "日常淡妝，適合辦公室或學校場合。",
    imageUrl: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "妝容"
  },
  {
    id: "p2",
    businessId: "1",
    title: "晚宴妝容",
    description: "華麗晚宴妝容，適合特殊場合。",
    imageUrl: "https://images.unsplash.com/photo-1588528902308-2f948f27921c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "妝容"
  },
  {
    id: "p3",
    businessId: "1",
    title: "藝術美甲",
    description: "獨特的美甲設計，展現個人風格。",
    imageUrl: "https://images.unsplash.com/photo-1626784215021-2fdf913731e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "美甲"
  },
  {
    id: "p4",
    businessId: "2",
    title: "經典短髮",
    description: "俐落短髮，簡單易打理。",
    imageUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "髮型"
  },
  {
    id: "p5",
    businessId: "2",
    title: "漸層染髮",
    description: "時尚漸層染髮，展現個性魅力。",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "染髮"
  },
  {
    id: "p6",
    businessId: "3",
    title: "面部按摩",
    description: "放鬆面部肌肉，改善血液循環。",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "面部護理"
  },
  {
    id: "p7",
    businessId: "4",
    title: "法式美甲",
    description: "經典法式美甲，優雅大方。",
    imageUrl: "https://images.unsplash.com/photo-1610992015779-1a4ae408aa5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "美甲"
  },
  {
    id: "p8",
    businessId: "4",
    title: "寶石美甲",
    description: "華麗寶石美甲，適合特殊場合。",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "美甲"
  }
];

export const getPortfolioByBusinessId = (businessId: string): PortfolioItem[] => {
  return portfolioItems.filter(item => item.businessId === businessId);
};

export const getPortfolioItemById = (id: string): PortfolioItem | undefined => {
  return portfolioItems.find(item => item.id === id);
};
