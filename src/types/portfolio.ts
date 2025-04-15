
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  hashtags: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
