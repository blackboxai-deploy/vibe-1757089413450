export type Platform = 
  | 'instagram' 
  | 'tiktok' 
  | 'youtube' 
  | 'twitter' 
  | 'facebook' 
  | 'linkedin' 
  | 'pinterest';

export type Genre = 
  | 'fashion' 
  | 'technology' 
  | 'gaming' 
  | 'food' 
  | 'travel' 
  | 'fitness' 
  | 'business' 
  | 'entertainment' 
  | 'education' 
  | 'diy';

export type ContentType = 'reel' | 'story' | 'post' | 'video' | 'short';

export interface TrendingContent {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  contentType: ContentType;
  genre: Genre[];
  thumbnailUrl: string;
  engagement: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    engagementRate: number;
  };
  hashtags: string[];
  creator: {
    username: string;
    followerCount: number;
    verified: boolean;
  };
  postedAt: Date;
  trendingScore: number;
  aiInsights?: {
    whyTrending: string;
    keyElements: string[];
    suggestions: string[];
  };
}

export interface UserPreferences {
  subscribedPlatforms: Platform[];
  selectedGenres: Genre[];
  savedContent: string[]; // Array of content IDs
}

export interface FilterOptions {
  platforms: Platform[];
  genres: Genre[];
  contentTypes: ContentType[];
  minEngagement?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface GenreConfig {
  id: Genre;
  name: string;
  color: string;
  description: string;
}