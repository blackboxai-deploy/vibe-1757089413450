'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Platform } from '@/types/trends'
import { platformConfigs } from '@/lib/mock-data'
import { updateSubscribedPlatforms } from '@/lib/storage'

interface PlatformSelectorProps {
  selectedPlatforms: Platform[]
  onPlatformsChange: (platforms: Platform[]) => void
  showDescription?: boolean
}

export function PlatformSelector({ 
  selectedPlatforms, 
  onPlatformsChange, 
  showDescription = false 
}: PlatformSelectorProps) {
  
  const handlePlatformToggle = (platformId: Platform, checked: boolean) => {
    let newPlatforms: Platform[]
    
    if (checked) {
      newPlatforms = [...selectedPlatforms, platformId]
    } else {
      newPlatforms = selectedPlatforms.filter(p => p !== platformId)
    }
    
    onPlatformsChange(newPlatforms)
    updateSubscribedPlatforms(newPlatforms)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Platforms</h3>
        <Badge variant="secondary" className="text-xs">
          {selectedPlatforms.length}/{platformConfigs.length}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {platformConfigs.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id)
          
          return (
            <div 
              key={platform.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <Checkbox
                id={platform.id}
                checked={isSelected}
                onCheckedChange={(checked) => 
                  handlePlatformToggle(platform.id, checked as boolean)
                }
                className="mt-1"
              />
              
              <div className="flex-1 space-y-1">
                <label 
                  htmlFor={platform.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span className="font-medium text-sm">{platform.name}</span>
                </label>
                
                {showDescription && (
                  <p className="text-xs text-muted-foreground">
                    {platform.description}
                  </p>
                )}
              </div>
              
              {isSelected && (
                <Badge 
                  className={`${platform.color} text-white border-0 text-xs`}
                >
                  Active
                </Badge>
              )}
            </div>
          )
        })}
      </div>
      
      {selectedPlatforms.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Select platforms to see trending content
        </p>
      )}
      
      {selectedPlatforms.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>Tracking content from {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}</span>
          <button
            onClick={() => {
              onPlatformsChange([])
              updateSubscribedPlatforms([])
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