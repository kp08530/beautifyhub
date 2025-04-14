
export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    day: string;
    hours: string;
  }[];
  imageUrl: string;
  rating: number;
  services: string[];
  categories: string[];
  featured: boolean;
}

export const businesses: Business[] = [
  {
    id: "1",
    name: "美麗空間 Beauty Space",
    description: "提供高品質美容服務的專業沙龍，專注於面部護理和美甲服務。",
    address: "台北市信義區松高路123號",
    phone: "02-2345-6789",
    email: "info@beautyspace.com",
    openingHours: [
      { day: "星期一", hours: "10:00 - 20:00" },
      { day: "星期二", hours: "10:00 - 20:00" },
      { day: "星期三", hours: "10:00 - 20:00" },
      { day: "星期四", hours: "10:00 - 20:00" },
      { day: "星期五", hours: "10:00 - 20:00" },
      { day: "星期六", hours: "10:00 - 18:00" },
      { day: "星期日", hours: "休息" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    services: ["1", "2", "3"],
    categories: ["美容", "美甲"],
    featured: true
  },
  {
    id: "2",
    name: "時尚髮型 Fashion Hair",
    description: "專業髮型設計沙龍，提供剪髮、染髮、燙髮等全方位髮型服務。",
    address: "台北市大安區忠孝東路四段101號",
    phone: "02-2765-4321",
    email: "contact@fashionhair.com",
    openingHours: [
      { day: "星期一", hours: "休息" },
      { day: "星期二", hours: "11:00 - 21:00" },
      { day: "星期三", hours: "11:00 - 21:00" },
      { day: "星期四", hours: "11:00 - 21:00" },
      { day: "星期五", hours: "11:00 - 21:00" },
      { day: "星期六", hours: "10:00 - 21:00" },
      { day: "星期日", hours: "10:00 - 18:00" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    services: ["4", "5", "6"],
    categories: ["美髮"],
    featured: true
  },
  {
    id: "3",
    name: "完美肌膚 Perfect Skin",
    description: "專注於皮膚護理的美容中心，提供專業的面部護理和身體護理服務。",
    address: "台北市中山區南京東路三段25號",
    phone: "02-2504-9876",
    email: "service@perfectskin.com",
    openingHours: [
      { day: "星期一", hours: "10:00 - 19:00" },
      { day: "星期二", hours: "10:00 - 19:00" },
      { day: "星期三", hours: "10:00 - 19:00" },
      { day: "星期四", hours: "10:00 - 19:00" },
      { day: "星期五", hours: "10:00 - 19:00" },
      { day: "星期六", hours: "10:00 - 17:00" },
      { day: "星期日", hours: "休息" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    services: ["7", "8", "9"],
    categories: ["美容", "護膚"],
    featured: false
  },
  {
    id: "4",
    name: "夢幻美甲 Dream Nails",
    description: "專業美甲沙龍，提供美甲、手足護理等服務，讓您擁有完美指尖。",
    address: "台北市松山區民生東路四段132號",
    phone: "02-2718-5432",
    email: "hello@dreamnails.com",
    openingHours: [
      { day: "星期一", hours: "11:00 - 20:00" },
      { day: "星期二", hours: "11:00 - 20:00" },
      { day: "星期三", hours: "11:00 - 20:00" },
      { day: "星期四", hours: "11:00 - 20:00" },
      { day: "星期五", hours: "11:00 - 20:00" },
      { day: "星期六", hours: "11:00 - 20:00" },
      { day: "星期日", hours: "12:00 - 18:00" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    services: ["10", "11", "12"],
    categories: ["美甲"],
    featured: true
  }
];

export const getBusinessById = (id: string): Business | undefined => {
  return businesses.find(business => business.id === id);
};

export const getFeaturedBusinesses = (): Business[] => {
  return businesses.filter(business => business.featured);
};

export const getBusinessesByCategory = (category: string): Business[] => {
  return businesses.filter(business => business.categories.includes(category));
};
