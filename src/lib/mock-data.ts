import { TrendingContent, Platform, Genre, PlatformConfig, GenreConfig } from '@/types/trends';

export const platformConfigs: PlatformConfig[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    icon: '📷',
    description: 'Visual stories and reels'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: 'bg-gradient-to-r from-black to-red-500',
    icon: '🎵',
    description: 'Short-form viral videos'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    icon: '▶️',
    description: 'Video content and shorts'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    color: 'bg-gradient-to-r from-blue-400 to-blue-500',
    icon: '🐦',
    description: 'Real-time conversations'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: 'bg-gradient-to-r from-blue-600 to-blue-700',
    icon: '👥',
    description: 'Social networking posts'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: 'bg-gradient-to-r from-blue-700 to-blue-800',
    icon: '💼',
    description: 'Professional content'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    color: 'bg-gradient-to-r from-red-500 to-pink-500',
    icon: '📌',
    description: 'Visual discovery'
  }
];

export const genreConfigs: GenreConfig[] = [
  {
    id: 'fashion',
    name: 'Fashion',
    color: 'bg-gradient-to-r from-pink-300 to-purple-300',
    description: 'Style trends and outfit inspiration'
  },
  {
    id: 'technology',
    name: 'Technology',
    color: 'bg-gradient-to-r from-blue-300 to-cyan-300',
    description: 'Latest tech innovations and reviews'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    color: 'bg-gradient-to-r from-green-300 to-blue-300',
    description: 'Gaming content and esports'
  },
  {
    id: 'food',
    name: 'Food',
    color: 'bg-gradient-to-r from-orange-300 to-red-300',
    description: 'Recipes and food culture'
  },
  {
    id: 'travel',
    name: 'Travel',
    color: 'bg-gradient-to-r from-teal-300 to-blue-300',
    description: 'Travel destinations and experiences'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    color: 'bg-gradient-to-r from-red-300 to-orange-300',
    description: 'Workout routines and wellness'
  },
  {
    id: 'business',
    name: 'Business',
    color: 'bg-gradient-to-r from-gray-300 to-blue-300',
    description: 'Entrepreneurship and business tips'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: 'bg-gradient-to-r from-purple-300 to-pink-300',
    description: 'Movies, music, and pop culture'
  },
  {
    id: 'education',
    name: 'Education',
    color: 'bg-gradient-to-r from-indigo-300 to-purple-300',
    description: 'Learning and educational content'
  },
  {
    id: 'diy',
    name: 'DIY & Crafts',
    color: 'bg-gradient-to-r from-green-300 to-yellow-300',
    description: 'Do-it-yourself projects and crafts'
  }
];

export const mockTrendingContent: TrendingContent[] = [
  {
    id: '1',
    title: 'Autumn Fashion Transition Looks',
    description: 'How to style your summer pieces for fall weather with layering techniques',
    platform: 'instagram',
    contentType: 'reel',
    genre: ['fashion'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e58df64-4b3b-4d47-b70b-729464202c05.png',
    engagement: {
      views: 2340000,
      likes: 185000,
      shares: 23000,
      comments: 8500,
      engagementRate: 9.2
    },
    hashtags: ['#AutumnFashion', '#Layering', '#FallStyle', '#OutfitTransition', '#CozyVibes'],
    creator: {
      username: '@styleinfluencer',
      followerCount: 890000,
      verified: true
    },
    postedAt: new Date('2024-01-15T10:30:00Z'),
    trendingScore: 95,
    aiInsights: {
      whyTrending: 'Seasonal transition content performs well as people seek practical styling advice',
      keyElements: ['Layering techniques', 'Warm color palette', 'Accessible styling tips'],
      suggestions: ['Create similar content with budget-friendly alternatives', 'Focus on versatile pieces']
    }
  },
  {
    id: '2',
    title: 'AI Productivity Hacks for 2024',
    description: 'Top 10 AI tools that will revolutionize your workflow and boost productivity',
    platform: 'youtube',
    contentType: 'video',
    genre: ['technology', 'business'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c473688c-a174-4fbb-8ae7-02c0c5e92083.png',
    engagement: {
      views: 1850000,
      likes: 92000,
      shares: 15000,
      comments: 12000,
      engagementRate: 6.4
    },
    hashtags: ['#AI', '#Productivity', '#TechTips', '#WorkflowOptimization', '#FutureOfWork'],
    creator: {
      username: '@techguru2024',
      followerCount: 1200000,
      verified: true
    },
    postedAt: new Date('2024-01-14T14:15:00Z'),
    trendingScore: 88,
    aiInsights: {
      whyTrending: 'AI productivity content is highly sought after as professionals look for efficiency gains',
      keyElements: ['Practical tool demonstrations', 'Clear value propositions', 'Step-by-step guides'],
      suggestions: ['Create content about specific AI use cases', 'Compare different AI tools']
    }
  },
  {
    id: '3',
    title: 'Gaming Setup Tour 2024',
    description: 'Ultimate gaming room setup with RGB lighting, custom PC build, and streaming gear',
    platform: 'tiktok',
    contentType: 'short',
    genre: ['gaming', 'technology'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e26823e-5e43-47e9-b90c-69fb0be0849a.png',
    engagement: {
      views: 5600000,
      likes: 620000,
      shares: 89000,
      comments: 34000,
      engagementRate: 13.3
    },
    hashtags: ['#GamingSetup', '#PCBuild', '#RGBLighting', '#StreamingSetup', '#GamingRoom'],
    creator: {
      username: '@gamingsetups',
      followerCount: 2100000,
      verified: true
    },
    postedAt: new Date('2024-01-13T19:45:00Z'),
    trendingScore: 92,
    aiInsights: {
      whyTrending: 'Setup tours combine aspiration with practical inspiration for gaming enthusiasts',
      keyElements: ['Visual appeal of RGB lighting', 'Detailed equipment breakdown', 'Aesthetic organization'],
      suggestions: ['Show budget-friendly setup alternatives', 'Include setup building process']
    }
  },
  {
    id: '4',
    title: '15-Minute Mediterranean Bowl',
    description: 'Quick and healthy Mediterranean-inspired bowl recipe perfect for busy weeknights',
    platform: 'instagram',
    contentType: 'reel',
    genre: ['food', 'fitness'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0622d876-7860-4a6d-b208-16cc5f157379.png',
    engagement: {
      views: 3200000,
      likes: 245000,
      shares: 45000,
      comments: 18000,
      engagementRate: 9.6
    },
    hashtags: ['#MediterraneanDiet', '#HealthyRecipes', '#QuickMeals', '#MealPrep', '#CleanEating'],
    creator: {
      username: '@healthyfoodlove',
      followerCount: 1580000,
      verified: true
    },
    postedAt: new Date('2024-01-12T12:00:00Z'),
    trendingScore: 89,
    aiInsights: {
      whyTrending: 'Quick healthy recipes appeal to busy professionals seeking nutritious options',
      keyElements: ['Time efficiency', 'Visual appeal of ingredients', 'Health benefits highlighted'],
      suggestions: ['Create meal prep versions', 'Show ingredient substitutions']
    }
  },
  {
    id: '5',
    title: 'Remote Work Productivity System',
    description: 'How I manage multiple projects and stay productive while working from home',
    platform: 'linkedin',
    contentType: 'post',
    genre: ['business', 'technology'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f9d648cd-b86e-461f-8054-2ca92a019593.png',
    engagement: {
      views: 890000,
      likes: 45000,
      shares: 8900,
      comments: 3200,
      engagementRate: 6.4
    },
    hashtags: ['#RemoteWork', '#Productivity', '#WorkFromHome', '#ProjectManagement', '#DigitalNomad'],
    creator: {
      username: '@productivitypro',
      followerCount: 450000,
      verified: true
    },
    postedAt: new Date('2024-01-11T09:30:00Z'),
    trendingScore: 76,
    aiInsights: {
      whyTrending: 'Remote work content resonates with distributed workforce seeking optimization',
      keyElements: ['Systematic approach', 'Tool recommendations', 'Personal experience sharing'],
      suggestions: ['Create content about specific productivity tools', 'Share daily routine breakdowns']
    }
  },
  {
    id: '6',
    title: 'DIY Minimalist Home Decor',
    description: 'Transform your space with these simple, budget-friendly minimalist decor ideas',
    platform: 'pinterest',
    contentType: 'post',
    genre: ['diy'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4311577b-df1a-4189-98c3-79adb54516a3.png',
    engagement: {
      views: 1650000,
      likes: 125000,
      shares: 78000,
      comments: 5400,
      engagementRate: 12.6
    },
    hashtags: ['#MinimalistDecor', '#DIYHome', '#BudgetDecor', '#HomeDesign', '#InteriorStyling'],
    creator: {
      username: '@minimalhome',
      followerCount: 780000,
      verified: false
    },
    postedAt: new Date('2024-01-10T16:20:00Z'),
    trendingScore: 84,
    aiInsights: {
      whyTrending: 'Minimalist aesthetics combined with DIY affordability appeals to wide audience',
      keyElements: ['Clean aesthetic appeal', 'Budget consciousness', 'Step-by-step instructions'],
      suggestions: ['Show before/after transformations', 'Include cost breakdowns']
    }
  },
  {
    id: '7',
    title: 'Travel Photography Tips',
    description: 'How to capture stunning travel photos with just your smartphone',
    platform: 'youtube',
    contentType: 'video',
    genre: ['travel', 'education'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4592b3e8-76b0-4628-bfdd-edaa6761dd85.png',
    engagement: {
      views: 2100000,
      likes: 156000,
      shares: 28000,
      comments: 11500,
      engagementRate: 9.3
    },
    hashtags: ['#TravelPhotography', '#SmartphonePhotography', '#PhotoTips', '#TravelContent', '#Photography101'],
    creator: {
      username: '@travelphotographer',
      followerCount: 950000,
      verified: true
    },
    postedAt: new Date('2024-01-09T11:45:00Z'),
    trendingScore: 87,
    aiInsights: {
      whyTrending: 'Accessible photography education appeals to travelers wanting to improve their content',
      keyElements: ['Smartphone accessibility', 'Practical techniques', 'Visual examples'],
      suggestions: ['Create location-specific photography guides', 'Show editing techniques']
    }
  },
  {
    id: '8',
    title: 'Home Workout Challenge',
    description: '30-day no-equipment fitness challenge that actually works - see my results!',
    platform: 'tiktok',
    contentType: 'short',
    genre: ['fitness'],
    thumbnailUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0dbb2e5c-d22f-4fa4-a7b1-d04ceb27110c.png',
    engagement: {
      views: 8900000,
      likes: 1200000,
      shares: 156000,
      comments: 67000,
      engagementRate: 16.0
    },
    hashtags: ['#HomeWorkout', '#FitnessChallenge', '#NoEquipment', '#BodyweightWorkout', '#FitnessJourney'],
    creator: {
      username: '@fitnessathome',
      followerCount: 3400000,
      verified: true
    },
    postedAt: new Date('2024-01-08T07:30:00Z'),
    trendingScore: 96,
    aiInsights: {
      whyTrending: 'Challenge format with visible results creates strong engagement and motivation',
      keyElements: ['Transformation evidence', 'Accessibility', 'Community challenge aspect'],
      suggestions: ['Create beginner variations', 'Document daily progress']
    }
  }
];

export function getTrendingContent(
  platforms?: Platform[],
  genres?: Genre[],
  searchQuery?: string
): TrendingContent[] {
  let filtered = mockTrendingContent;

  if (platforms && platforms.length > 0) {
    filtered = filtered.filter(content => platforms.includes(content.platform));
  }

  if (genres && genres.length > 0) {
    filtered = filtered.filter(content => 
      content.genre.some(g => genres.includes(g))
    );
  }

  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(content =>
      content.title.toLowerCase().includes(query) ||
      content.description.toLowerCase().includes(query) ||
      content.hashtags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered.sort((a, b) => b.trendingScore - a.trendingScore);
}

export function getPlatformConfig(platform: Platform): PlatformConfig | undefined {
  return platformConfigs.find(config => config.id === platform);
}

export function getGenreConfig(genre: Genre): GenreConfig | undefined {
  return genreConfigs.find(config => config.id === genre);
}