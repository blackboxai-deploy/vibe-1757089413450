'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SearchFilters({ searchQuery, onSearchChange }: SearchFiltersProps) {
  const [tempQuery, setTempQuery] = useState(searchQuery)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(tempQuery)
  }

  const handleClearSearch = () => {
    setTempQuery('')
    onSearchChange('')
  }

  // Popular search terms for suggestions
  const popularSearches = [
    'fashion', 'gaming', 'food', 'travel', 'fitness', 
    'tech', 'diy', 'music', 'dance', 'beauty'
  ]

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium text-sm mb-2">Search Trends</h3>
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <Input
            placeholder="Search trending content..."
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
        
        {searchQuery && (
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline" className="text-xs">
              Searching: "{searchQuery}"
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="text-xs h-6 px-2"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {!searchQuery && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2">
            Popular Searches
          </h4>
          <div className="flex flex-wrap gap-1">
            {popularSearches.map((term) => (
              <Badge
                key={term}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  setTempQuery(term)
                  onSearchChange(term)
                }}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p>🔍 Search by title, description, or hashtags</p>
      </div>
    </div>
  )
}