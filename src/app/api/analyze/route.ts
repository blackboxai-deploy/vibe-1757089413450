import { NextRequest, NextResponse } from 'next/server'
import { generateContentIdeas } from '@/lib/ai-analysis'
import { getTrendingContent } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userGenres, platform, limit = 5 } = body

    if (!userGenres || !Array.isArray(userGenres)) {
      return NextResponse.json(
        { error: 'User genres array is required' },
        { status: 400 }
      )
    }

    // Get current trending content for context
    const currentTrends = getTrendingContent(
      platform ? [platform] : undefined,
      userGenres.length > 0 ? userGenres : undefined
    ).slice(0, 10) // Top 10 for context

    // Generate content ideas using AI
    const contentIdeas = await generateContentIdeas({
      userGenres,
      platform: platform || 'instagram',
      currentTrends
    })

    return NextResponse.json({
      success: true,
      ideas: contentIdeas.slice(0, limit),
      basedOnTrends: currentTrends.slice(0, 3).map(trend => ({
        id: trend.id,
        title: trend.title,
        platform: trend.platform,
        engagementRate: trend.engagement.engagementRate
      }))
    })

  } catch (error) {
    console.error('Content ideas generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate content ideas',
        fallbackIdeas: [
          'Create a trending challenge in your niche',
          'Share behind-the-scenes content',
          'Make educational content about your expertise',
          'React to current trends in your field',
          'Collaborate with other creators'
        ]
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return general trending insights
    const allTrends = getTrendingContent()
    
    // Calculate some basic analytics
    const platformStats = allTrends.reduce((acc, trend) => {
      acc[trend.platform] = (acc[trend.platform] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const genreStats = allTrends.reduce((acc, trend) => {
      trend.genre.forEach(genre => {
        acc[genre] = (acc[genre] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    const averageEngagement = allTrends.reduce((sum, trend) => 
      sum + trend.engagement.engagementRate, 0) / allTrends.length

    return NextResponse.json({
      success: true,
      analytics: {
        totalTrends: allTrends.length,
        platformDistribution: platformStats,
        genreDistribution: genreStats,
        averageEngagementRate: Math.round(averageEngagement * 10) / 10,
        topPerformers: allTrends
          .sort((a, b) => b.engagement.engagementRate - a.engagement.engagementRate)
          .slice(0, 5)
          .map(trend => ({
            id: trend.id,
            title: trend.title,
            platform: trend.platform,
            engagementRate: trend.engagement.engagementRate
          }))
      }
    })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}