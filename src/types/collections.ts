
export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
  createdAt: string;
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
}
