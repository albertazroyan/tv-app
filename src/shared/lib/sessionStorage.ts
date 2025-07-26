import { SESSION_STORAGE_KEYS } from '@shared/config/constants';

export const sessionStorageService = {
  getLastViewedMovies(): string[] {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEYS.LAST_VIEWED_MOVIES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  setLastViewedMovies(movieIds: string[]): void {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.LAST_VIEWED_MOVIES, JSON.stringify(movieIds));
    } catch (error) {
      console.error('Failed to save last viewed movies:', error);
    }
  },

  addViewedMovie(movieId: string): void {
    const lastViewed = this.getLastViewedMovies();
    const filtered = lastViewed.filter(id => id !== movieId);
    const updated = [movieId, ...filtered];
    this.setLastViewedMovies(updated);
  },

  getSelectedMovie(): string | null {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEYS.SELECTED_MOVIE);
    } catch {
      return null;
    }
  },

  setSelectedMovie(movieId: string): void {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SELECTED_MOVIE, movieId);
    } catch (error) {
      console.error('Failed to save selected movie:', error);
    }
  },
};
