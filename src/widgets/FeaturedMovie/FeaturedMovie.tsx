import React, { useEffect, useRef, useState } from 'react';
import type { Movie } from '@entities/movie';
import { VideoState } from '@shared/config/types';
import { Button } from '@shared/ui';
import { movieUtils } from '@shared/lib/movieUtils';
import './FeaturedMovie.css';

const DEFAULT_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface FeaturedMovieProps {
  movie: Movie | null;
  onPlayClick?: (movie: Movie) => void;
  onMoreInfoClick?: () => void;
  videoState: VideoState;
}

export const FeaturedMovie: React.FC<FeaturedMovieProps> = ({
  movie,
  onPlayClick,
  onMoreInfoClick,
  videoState
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  useEffect(() => {
    if (movie) {
      setBackgroundImage(movie.coverImage);
    }
  }, [movie]);

  if (!movie || videoState === VideoState.LOADING) {
    return (
      <div className="featured-movie featured-movie--loading">
        <div className="featured-movie__placeholder">
          {videoState === VideoState.LOADING ? 'Loading video...' : 'Loading featured content...'}
        </div>
      </div>
    );
  }

  return (
    <div className="featured-movie">
      <div className="featured-movie__background">
        {videoState === VideoState.PLAYING ? (
          <video
            ref={videoRef}
            className="featured-movie__video"
            autoPlay
            preload="auto"
            muted
            loop
            playsInline
            controls
          >
            <source src={DEFAULT_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <>
            <div
              className="featured-movie__image"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="featured-movie__overlay" />
          </>
        )}
      </div>

      {videoState === VideoState.IDLE && (
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
              onClick={() => onPlayClick && onPlayClick(movie)}
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
              More Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
