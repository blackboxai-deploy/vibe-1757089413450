'use client'

import React from 'react'
import { TrendCard } from './TrendCard'
import { TrendingContent } from '@/types/trends'

interface TrendsGridProps {
  content: TrendingContent[]
  isLoading?: boolean
}

export function TrendsGrid({ content, isLoading }: TrendsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg border p-6 animate-pulse">
            <div className="space-y-4">
              <div className="w-full h-48 bg-muted rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded w-20"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No trending content found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search query to discover more content.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending Now</h2>
        <p className="text-sm text-muted-foreground">
          {content.length} trending item{content.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <TrendCard
            key={item.id}
            content={item}
          />
        ))}
      </div>
    </div>
  )
}