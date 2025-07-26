import React, { useEffect, useState } from 'react';
import type { Movie } from '@entities/movie';
import { Button } from '@shared/ui';
import { movieUtils } from '@shared/lib/movieUtils';
import './FeaturedMovie.css';

interface FeaturedMovieProps {
  movie: Movie | null;
  onPlayClick?: () => void;
  onMoreInfoClick?: () => void;
}

export const FeaturedMovie: React.FC<FeaturedMovieProps> = ({
  movie,
  onPlayClick,
  onMoreInfoClick,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    if (movie) {
      setBackgroundImage(movie.coverImage);
      setShowVideo(false);
    }
  }, [movie]);

  useEffect(() => {
    const handlePlayBackgroundVideo = (event: CustomEvent) => {
      setTimeout(() => {
        setShowVideo(true);
      }, 2000);
    };

    window.addEventListener('playBackgroundVideo', handlePlayBackgroundVideo as EventListener);
    
    return () => {
      window.removeEventListener('playBackgroundVideo', handlePlayBackgroundVideo as EventListener);
    };
  }, []);

  if (!movie) {
    return (
      <div className="featured-movie featured-movie--loading">
        <div className="featured-movie__placeholder">
          Loading featured content...
        </div>
      </div>
    );
  }

  return (
    <div className="featured-movie">
      <div className="featured-movie__background">
        {showVideo ? (
          <video
            className="featured-movie__video"
            src={movie.videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            className="featured-movie__image"
            src={backgroundImage}
            alt={movie.title}
          />
        )}
        <div className="featured-movie__overlay" />
      </div>

      <div className="featured-movie__content">
        <div className="featured-movie__category">{movie.category}</div>
        
        {movie.logoImage && (
          <img
            className="featured-movie__logo"
            src={movie.logoImage}
            alt={`${movie.title} logo`}
          />
        )}
        
        <div className="featured-movie__info">
          <div className="featured-movie__meta">
            <span className="featured-movie__year">{movie.year}</span>
            <span className="featured-movie__rating">{movie.rating}</span>
            <span className="featured-movie__duration">
              {movieUtils.formatDuration(movie.duration)}
            </span>
          </div>
          
          <p className="featured-movie__description">
            {movie.description}
          </p>
        </div>

        <div className="featured-movie__actions">
          <Button
            variant="primary"
            size="large"
            onClick={onPlayClick}
            className="featured-movie__play-btn"
          >
            ▶ Play
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={onMoreInfoClick}
            className="featured-movie__info-btn"
          >
            ℹ More Info
          </Button>
        </div>
      </div>
    </div>
  );
};
