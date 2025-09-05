import { TrendingContent } from '@/types/trends';

const AI_API_CONFIG = {
  endpoint: 'https://oi-server.onrender.com/chat/completions',
  headers: {
    'customerId': 'cus_Szde3rnRXMofEO',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xxx'
  },
  model: 'openrouter/anthropic/claude-sonnet-4'
};

export interface TrendAnalysisRequest {
  content: TrendingContent;
  userGenres: string[];
}

export interface TrendAnalysisResponse {
  whyTrending: string;
  keyElements: string[];
  suggestions: string[];
  hashtags: string[];
  contentIdeas: string[];
}

export async function analyzeTrendingContent(request: TrendAnalysisRequest): Promise<TrendAnalysisResponse> {
  try {
    const systemPrompt = `You are a social media trend analyst helping content creators understand viral content and generate ideas. Analyze the provided trending content and provide actionable insights.

Focus on:
1. Why the content is trending (psychology, timing, relevance)
2. Key elements that make it successful
3. Actionable suggestions for similar content
4. Relevant hashtags for maximum reach
5. Content ideas inspired by this trend

User's interests: ${request.userGenres.join(', ')}

Provide concise, actionable advice that a content creator can immediately implement.`;

    const userPrompt = `Analyze this trending content:

Title: ${request.content.title}
Description: ${request.content.description}
Platform: ${request.content.platform}
Genre: ${request.content.genre.join(', ')}
Engagement Rate: ${request.content.engagement.engagementRate}%
Views: ${request.content.engagement.views.toLocaleString()}
Current Hashtags: ${request.content.hashtags.join(', ')}

Please provide analysis in JSON format with the following structure:
{
  "whyTrending": "explanation of why this content is viral",
  "keyElements": ["element1", "element2", "element3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "contentIdeas": ["idea1", "idea2", "idea3"]
}`;

    const response = await fetch(AI_API_CONFIG.endpoint, {
      method: 'POST',
      headers: AI_API_CONFIG.headers,
      body: JSON.stringify({
        model: AI_API_CONFIG.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No AI response received');
    }

    // Parse the JSON response
    const analysis = JSON.parse(aiResponse);
    
    return {
      whyTrending: analysis.whyTrending || 'Analysis unavailable',
      keyElements: analysis.keyElements || [],
      suggestions: analysis.suggestions || [],
      hashtags: analysis.hashtags || [],
      contentIdeas: analysis.contentIdeas || []
    };

  } catch (error) {
    console.error('AI analysis error:', error);
    
    // Fallback response if AI fails
    return {
      whyTrending: 'This content combines trending topics with engaging presentation',
      keyElements: ['Strong visual appeal', 'Relevant timing', 'Clear value proposition'],
      suggestions: ['Create similar content with your unique perspective', 'Use trending hashtags', 'Post at optimal times'],
      hashtags: ['#trending', '#viral', '#content'],
      contentIdeas: ['Put your own spin on this trend', 'Create a response video', 'Make a tutorial version']
    };
  }
}

export interface ContentIdeaRequest {
  userGenres: string[];
  platform: string;
  currentTrends: TrendingContent[];
}

export async function generateContentIdeas(request: ContentIdeaRequest): Promise<string[]> {
  try {
    const systemPrompt = `You are a creative social media strategist helping content creators generate viral content ideas. Based on current trends and user interests, suggest 5 unique, actionable content ideas.

User's focus areas: ${request.userGenres.join(', ')}
Target platform: ${request.platform}

Make ideas specific, trendy, and achievable. Focus on what's currently working in their niche.`;

    const trendsSummary = request.currentTrends.slice(0, 3).map(trend => 
      `${trend.title} (${trend.platform}) - ${trend.engagement.engagementRate}% engagement`
    ).join('\n');

    const userPrompt = `Based on these current trends:
${trendsSummary}

Generate 5 content ideas that could go viral. Return as a simple array of strings:
["idea 1", "idea 2", "idea 3", "idea 4", "idea 5"]`;

    const response = await fetch(AI_API_CONFIG.endpoint, {
      method: 'POST',
      headers: AI_API_CONFIG.headers,
      body: JSON.stringify({
        model: AI_API_CONFIG.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Content idea generation failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No AI response received');
    }

    const ideas = JSON.parse(aiResponse);
    return Array.isArray(ideas) ? ideas : [];

  } catch (error) {
    console.error('Content idea generation error:', error);
    
    // Fallback ideas
    return [
      'Create a trending challenge in your niche',
      'Make a "day in the life" content series',
      'Share behind-the-scenes of your creative process',
      'React to trending topics in your field',
      'Create educational content about your expertise'
    ];
  }
}