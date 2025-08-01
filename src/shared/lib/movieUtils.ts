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

  formatDuration(duration: string): string {
    const seconds = parseInt(duration);
    
    if (isNaN(seconds) || seconds <= 0) {
      return '';
    }

    // Convert seconds to minutes
    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes}m`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  },
};
