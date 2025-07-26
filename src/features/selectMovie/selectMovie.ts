import type { Movie } from '@entities/movie';
import { sessionStorageService } from '@shared/lib/sessionStorage';

export interface SelectMovieParams {
  movie: Movie;
  onMovieSelected: (movie: Movie) => void;
}

export const selectMovie = ({ movie, onMovieSelected }: SelectMovieParams) => {
  // Add to viewed movies in session storage
  sessionStorageService.addViewedMovie(movie.id);
  sessionStorageService.setSelectedMovie(movie.id);
  
  onMovieSelected(movie);
  
  setTimeout(() => {
    const event = new CustomEvent('playBackgroundVideo', { 
      detail: { videoUrl: movie.videoUrl } 
    });
    window.dispatchEvent(event);
  }, 2000);
};

export const useSelectMovie = (onMovieSelected: (movie: Movie) => void) => {
  return (movie: Movie) => {
    selectMovie({ movie, onMovieSelected });
  };
};
