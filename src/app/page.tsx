'use client'

import React, { useState, useEffect } from 'react'
import { TrendsGrid } from '@/components/TrendsGrid'
import { PlatformSelector } from '@/components/PlatformSelector'
import { GenreFilter } from '@/components/GenreFilter'
import { SearchFilters } from '@/components/SearchFilters'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Platform, Genre } from '@/types/trends'
import { getUserPreferences } from '@/lib/storage'
import { getTrendingContent } from '@/lib/mock-data'

export default function HomePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load user preferences on mount
  useEffect(() => {
    const preferences = getUserPreferences()
    setSelectedPlatforms(preferences.subscribedPlatforms)
    setSelectedGenres(preferences.selectedGenres)
    setIsLoading(false)
  }, [])

  // Get filtered trending content
  const trendingContent = getTrendingContent(
    selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
    selectedGenres.length > 0 ? selectedGenres : undefined,
    searchQuery
  )

  const activeFiltersCount = selectedPlatforms.length + selectedGenres.length + (searchQuery ? 1 : 0)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your trends dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TrendScope
                </h1>
              </div>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-4">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                {trendingContent.length} trending items
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SearchFilters 
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                    
                    <PlatformSelector
                      selectedPlatforms={selectedPlatforms}
                      onPlatformsChange={setSelectedPlatforms}
                    />
                    
                    <GenreFilter
                      selectedGenres={selectedGenres}
                      onGenresChange={setSelectedGenres}
                    />
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Content</span>
                        <span className="text-sm font-medium">{trendingContent.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Platforms</span>
                        <span className="text-sm font-medium">{selectedPlatforms.length || 'All'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Genres</span>
                        <span className="text-sm font-medium">{selectedGenres.length || 'All'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <TrendsGrid 
                  content={trendingContent}
                  isLoading={false}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analyze" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Analysis</CardTitle>
                <p className="text-muted-foreground">
                  Get AI-powered insights on trending content and personalized suggestions for your niche.
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Analysis Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    Click on any trending content card to get detailed AI analysis and content suggestions.
                  </p>
                  <Button disabled>
                    Start Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Subscriptions</CardTitle>
                  <p className="text-muted-foreground">
                    Choose which platforms you want to track for trending content.
                  </p>
                </CardHeader>
                <CardContent>
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onPlatformsChange={setSelectedPlatforms}
                    showDescription={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Genres</CardTitle>
                  <p className="text-muted-foreground">
                    Select your areas of interest to get more relevant trending content.
                  </p>
                </CardHeader>
                <CardContent>
                  <GenreFilter
                    selectedGenres={selectedGenres}
                    onGenresChange={setSelectedGenres}
                    showDescription={true}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}