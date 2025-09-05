'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { TrendingContent } from '@/types/trends'
import { getPlatformConfig, getGenreConfig } from '@/lib/mock-data'
import { toggleSavedContent, isContentSaved } from '@/lib/storage'
import { formatNumber, formatDate } from '@/lib/utils'

interface TrendCardProps {
  content: TrendingContent
}

export function TrendCard({ content }: TrendCardProps) {
  const [isSaved, setIsSaved] = useState(isContentSaved(content.id))
  const [showDetails, setShowDetails] = useState(false)
  
  const platformConfig = getPlatformConfig(content.platform)
  
  const handleSaveToggle = () => {
    const newSavedState = toggleSavedContent(content.id)
    setIsSaved(newSavedState)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/654b1fb2-f234-4ab3-93fb-0be482d25fb7.png 50))}`
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
          
          {/* Platform Badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              className={`${platformConfig?.color} text-white border-0 shadow-lg`}
            >
              {platformConfig?.icon} {platformConfig?.name}
            </Badge>
          </div>
          
          {/* Save Button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleSaveToggle}
          >
            {isSaved ? '❤️' : '🤍'}
          </Button>
          
          {/* Trending Score */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="destructive" className="bg-red-500 text-white">
              🔥 {content.trendingScore}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        {/* Title & Description */}
        <div>
          <h3 className="font-semibold text-base line-clamp-2 mb-1">
            {content.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {content.description}
          </p>
        </div>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {content.genre.slice(0, 2).map((genre) => {
            const genreConfig = getGenreConfig(genre)
            return (
              <Badge
                key={genre}
                variant="outline"
                className={`text-xs ${genreConfig?.color} border-0 text-gray-700`}
              >
                {genreConfig?.name}
              </Badge>
            )
          })}
          {content.genre.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{content.genre.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Engagement Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Views</span>
            <span className="font-medium">{formatNumber(content.engagement.views)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Engagement</span>
            <span className="font-medium text-green-600">
              {content.engagement.engagementRate}%
            </span>
          </div>
        </div>
        
        {/* Creator Info & Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">by</span>
            <span className="text-sm font-medium">
              {content.creator.username}
              {content.creator.verified && <span className="ml-1 text-blue-500">✓</span>}
            </span>
          </div>
          
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{content.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Image */}
                <img
                  src={content.thumbnailUrl}
                  alt={content.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={handleImageError}
                />
                
                {/* Platform & Genre Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${platformConfig?.color} text-white`}>
                    {platformConfig?.icon} {platformConfig?.name}
                  </Badge>
                  {content.genre.map((genre) => {
                    const genreConfig = getGenreConfig(genre)
                    return (
                      <Badge
                        key={genre}
                        variant="outline"
                        className={genreConfig?.color}
                      >
                        {genreConfig?.name}
                      </Badge>
                    )
                  })}
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground">{content.description}</p>
                
                {/* Detailed Engagement */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{formatNumber(content.engagement.views)}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{formatNumber(content.engagement.likes)}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{formatNumber(content.engagement.shares)}</div>
                    <div className="text-sm text-muted-foreground">Shares</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">{formatNumber(content.engagement.comments)}</div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </div>
                </div>
                
                {/* Hashtags */}
                <div>
                  <h4 className="font-semibold mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-1">
                    {content.hashtags.map((hashtag) => (
                      <Badge key={hashtag} variant="secondary" className="text-xs">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Creator Info */}
                <div>
                  <h4 className="font-semibold mb-2">Creator</h4>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">
                        {content.creator.username}
                        {content.creator.verified && <span className="ml-2 text-blue-500">✓ Verified</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(content.creator.followerCount)} followers
                      </div>
                    </div>
                    <Badge variant="outline">
                      {content.contentType}
                    </Badge>
                  </div>
                </div>
                
                {/* AI Insights */}
                {content.aiInsights && (
                  <div>
                    <h4 className="font-semibold mb-3">🤖 AI Insights</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-1">Why It's Trending</h5>
                        <p className="text-sm text-muted-foreground">
                          {content.aiInsights.whyTrending}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Key Elements</h5>
                        <div className="flex flex-wrap gap-1">
                          {content.aiInsights.keyElements.map((element, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {element}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Content Suggestions</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {content.aiInsights.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Posted {formatDate(content.postedAt)}</span>
                  <Button
                    size="sm"
                    variant={isSaved ? "default" : "outline"}
                    onClick={handleSaveToggle}
                  >
                    {isSaved ? "❤️ Saved" : "🤍 Save"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}