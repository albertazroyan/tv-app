import type { Movie } from '@entities/movie';
import { sessionStorageService } from '@shared/lib/sessionStorage';

export interface SelectMovieParams {
  movie: Movie;
  onMovieSelected: (movie: Movie) => void;
  immediate?: boolean;
}

export const selectMovie = ({ movie, onMovieSelected, immediate = false }: SelectMovieParams) => {
  // Add to viewed movies in session storage
  sessionStorageService.addViewedMovie(movie.id);
  sessionStorageService.setSelectedMovie(movie.id);
  
  onMovieSelected(movie);
  
  const playVideo = () => {
    const event = new CustomEvent('playBackgroundVideo', { 
      detail: { videoUrl: movie.videoUrl } 
    });
    window.dispatchEvent(event);
  };
  
  if (immediate) {
    playVideo();
  } else {
    setTimeout(playVideo, 2000);
  }
};

export const useSelectMovie = (onMovieSelected: (movie: Movie) => void) => {
  return (movie: Movie) => {
    selectMovie({ movie, onMovieSelected });
  };
};
