import { NextRequest, NextResponse } from 'next/server'
import { analyzeTrendingContent } from '@/lib/ai-analysis'
import { mockTrendingContent } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentId, userGenres } = body

    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Find the content by ID
    const content = mockTrendingContent.find(item => item.id === contentId)
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    // Analyze the trending content using AI
    const analysis = await analyzeTrendingContent({
      content,
      userGenres: userGenres || []
    })

    return NextResponse.json({
      success: true,
      analysis,
      contentId
    })

  } catch (error) {
    console.error('Trends analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze trending content' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return basic trends data without AI analysis
    return NextResponse.json({
      success: true,
      trending: mockTrendingContent.slice(0, 10), // Return top 10 trends
      totalCount: mockTrendingContent.length
    })
  } catch (error) {
    console.error('Failed to fetch trends:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending content' },
      { status: 500 }
    )
  }
}