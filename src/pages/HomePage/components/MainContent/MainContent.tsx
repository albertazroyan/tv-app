import React from 'react';
import type { Movie } from '@entities/movie';
import { VideoState } from '@shared/config/types';
import { FeaturedMovie } from '@widgets/FeaturedMovie';
import { TrendingCarousel } from '@widgets/TrendingCarousel';
import './MainContent.css';

interface MainContentProps {
  featuredMovie: Movie | null;
  trendingMovies: Movie[];
  videoState: VideoState;
  onPlayClick: (movie: Movie) => void;
  onMoreInfoClick: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  featuredMovie,
  trendingMovies,
  videoState,
  onPlayClick,
  onMoreInfoClick,
}) => {
  return (
    <main className="main-content">
      <div className="main-content__featured">
        <FeaturedMovie
          videoState={videoState}
          movie={featuredMovie}
          onPlayClick={onPlayClick}
          onMoreInfoClick={onMoreInfoClick}
        />
      </div>

      <div className="main-content__trending">
        <TrendingCarousel
          movies={trendingMovies}
          onMovieClick={onPlayClick}
        />
      </div>
    </main>
  );
};
