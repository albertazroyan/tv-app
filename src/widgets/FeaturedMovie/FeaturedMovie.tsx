import React, { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error('Failed to enter fullscreen:', err);
        });
      }
    }
  };

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
          <>
            <video
              ref={videoRef}
              className="featured-movie__video"
              // NOTE: movie.videoUrl currently does not work or is unavailable.
              // That's why we're using a placeholder URL for now.
              src={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
              autoPlay
              muted
              loop
              playsInline
            />
            <button onClick={handleFullscreen} className="featured-movie__fullscreen-btn">
              ⛶ Fullscreen
            </button>
          </>
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

      {!showVideo && (
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
              More Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
