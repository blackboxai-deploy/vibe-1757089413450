'use client';

import { Platform, Genre, UserPreferences } from '@/types/trends';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'trends-app-preferences',
  SAVED_CONTENT: 'trends-app-saved-content'
} as const;

const defaultPreferences: UserPreferences = {
  subscribedPlatforms: ['instagram', 'tiktok', 'youtube'],
  selectedGenres: ['fashion', 'technology', 'food'],
  savedContent: []
};

export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultPreferences;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load user preferences:', error);
  }
  
  return defaultPreferences;
}

export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save user preferences:', error);
  }
}

export function updateSubscribedPlatforms(platforms: Platform[]): void {
  const preferences = getUserPreferences();
  preferences.subscribedPlatforms = platforms;
  saveUserPreferences(preferences);
}

export function updateSelectedGenres(genres: Genre[]): void {
  const preferences = getUserPreferences();
  preferences.selectedGenres = genres;
  saveUserPreferences(preferences);
}

export function toggleSavedContent(contentId: string): boolean {
  const preferences = getUserPreferences();
  const isCurrentlySaved = preferences.savedContent.includes(contentId);
  
  if (isCurrentlySaved) {
    preferences.savedContent = preferences.savedContent.filter(id => id !== contentId);
  } else {
    preferences.savedContent.push(contentId);
  }
  
  saveUserPreferences(preferences);
  return !isCurrentlySaved; // Return new saved state
}

export function isContentSaved(contentId: string): boolean {
  const preferences = getUserPreferences();
  return preferences.savedContent.includes(contentId);
}