
export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
  createdAt: string;
  updatedAt?: string;
  description?: string;
  coverImage?: string;
  isPublic?: boolean;
  tags?: string[];
  order?: number; // For drag and drop sorting
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  createdAt: string;
  hashtags?: string[];
  order?: number; // For drag and drop sorting
  isLiked?: boolean;
  isBookmarked?: boolean;
  isFeatured?: boolean;
}

export interface FavoriteBusiness {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  isFavorite?: boolean;
  distance?: number; // Distance from user in km
  tags?: string[];
  specialOffers?: string[];
  order?: number; // For drag and drop sorting
}

export interface CollectionFilter {
  category?: string[];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'newest' | 'oldest' | 'popular' | 'alphabetical';
  searchTerm?: string;
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  fields: string[];
  includeImages: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
