import React, { useRef, useState, useEffect } from 'react';
import type { Movie } from '@entities/movie';
import { TRENDING_CAROUSEL_CONFIG } from '@shared/config/constants';
import './TrendingCarousel.css';

interface TrendingCarouselProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  movies,
  onMovieClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { visibleItems } = TRENDING_CAROUSEL_CONFIG;
  const maxIndex = Math.max(0, movies.length - visibleItems);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    
    const itemWidth = carouselRef.current.scrollWidth / movies.length;
    carouselRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleMovieClick = (movie: Movie) => {
    if (!isDragging) {
      onMovieClick(movie);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, maxIndex]);

  if (movies.length === 0) {
    return (
      <div className="trending-carousel trending-carousel--empty">
        <h2 className="trending-carousel__title">Trending Now</h2>
        <div className="trending-carousel__placeholder">
          No trending movies available
        </div>
      </div>
    );
  }

  return (
    <div className="trending-carousel">
      <div className="trending-carousel__header">
        <h2 className="trending-carousel__title">Trending Now</h2>
      </div>

      <div
        ref={carouselRef}
        className="trending-carousel__container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="trending-carousel__track">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="trending-carousel__item"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="trending-carousel__poster">
                <img
                  src={movie.coverImage}
                  alt={movie.title}
                  className="trending-carousel__image"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
