import type { Movie } from '@shared/config/types';
import { sessionStorageService } from './sessionStorage';

export const movieUtils = {
  sortMoviesByLastViewed(movies: Movie[]): Movie[] {
    const lastViewed = sessionStorageService.getLastViewedMovies();
    
    if (lastViewed.length === 0) {
      return movies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const viewedMovies: Movie[] = [];
    const unviewedMovies: Movie[] = [];

    movies.forEach(movie => {
      if (lastViewed.includes(movie.id)) {
        viewedMovies.push(movie);
      } else {
        unviewedMovies.push(movie);
      }
    });

    // Sort viewed movies by their order in lastViewed array
    viewedMovies.sort((a, b) => {
      const aIndex = lastViewed.indexOf(a.id);
      const bIndex = lastViewed.indexOf(b.id);
      return aIndex - bIndex;
    });

    // Sort unviewed movies by creation date
    unviewedMovies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return [...viewedMovies, ...unviewedMovies];
  },

  getTrendingMovies(movies: Movie[], maxCount: number = 50): Movie[] {
    return movies
      .filter(movie => movie.isTrending)
      .slice(0, maxCount);
  },

  getFeaturedMovie(movies: Movie[]): Movie | null {
    return movies.find(movie => movie.isFeatured) || movies[0] || null;
  },

  formatDuration(duration: string): string {
    // Assuming duration is in minutes, format as "1h 30m"
    const minutes = parseInt(duration);
    if (isNaN(minutes)) return duration;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) return `${remainingMinutes}m`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  },
};
