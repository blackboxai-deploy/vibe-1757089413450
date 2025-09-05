'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Genre } from '@/types/trends'
import { genreConfigs } from '@/lib/mock-data'
import { updateSelectedGenres } from '@/lib/storage'

interface GenreFilterProps {
  selectedGenres: Genre[]
  onGenresChange: (genres: Genre[]) => void
  showDescription?: boolean
}

export function GenreFilter({ 
  selectedGenres, 
  onGenresChange, 
  showDescription = false 
}: GenreFilterProps) {
  
  const handleGenreToggle = (genreId: Genre, checked: boolean) => {
    let newGenres: Genre[]
    
    if (checked) {
      newGenres = [...selectedGenres, genreId]
    } else {
      newGenres = selectedGenres.filter(g => g !== genreId)
    }
    
    onGenresChange(newGenres)
    updateSelectedGenres(newGenres)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Content Genres</h3>
        <Badge variant="secondary" className="text-xs">
          {selectedGenres.length}/{genreConfigs.length}
        </Badge>
      </div>
      
      <div className="space-y-2">
        {genreConfigs.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id)
          
          return (
            <div 
              key={genre.id}
              className={`flex items-start space-x-3 p-2 rounded-lg border transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <Checkbox
                id={genre.id}
                checked={isSelected}
                onCheckedChange={(checked) => 
                  handleGenreToggle(genre.id, checked as boolean)
                }
                className="mt-1"
              />
              
              <div className="flex-1 space-y-1">
                <label 
                  htmlFor={genre.id}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{genre.name}</span>
                    {isSelected && (
                      <div className={`w-2 h-2 rounded-full ${genre.color.replace('bg-gradient-to-r from-', 'bg-').split('-')[0]}-${genre.color.split('-')[1]}-400`}></div>
                    )}
                  </div>
                </label>
                
                {showDescription && (
                  <p className="text-xs text-muted-foreground">
                    {genre.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {selectedGenres.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Select genres to filter content
        </p>
      )}
      
      {selectedGenres.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>Filtering by {selectedGenres.length} genre{selectedGenres.length !== 1 ? 's' : ''}</span>
          <button
            onClick={() => {
              onGenresChange([])
              updateSelectedGenres([])
            }}
            className="text-destructive hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}