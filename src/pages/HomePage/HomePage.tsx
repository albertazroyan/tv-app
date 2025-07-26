import React, { useState, useEffect } from 'react';
import type { Movie } from '@entities/movie';
import type { User } from '@entities/user';
import { FeaturedMovie } from '@widgets/FeaturedMovie';
import { TrendingCarousel } from '@widgets/TrendingCarousel';
import { MainMenu } from '@app/components/MainMenu';
import { useSelectMovie } from '@features/selectMovie';
import { movieUtils } from '@shared/lib/movieUtils';
import { sessionStorageService } from '@shared/lib/sessionStorage';
import { dataService } from '@shared/lib/dataService';
import { TRENDING_CAROUSEL_CONFIG } from '@shared/config/constants';
import { UserEntity } from '@entities/user/model';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [user] = useState<User>(UserEntity.createDefault().toJSON());
  const [isLoading, setIsLoading] = useState(true);

  const selectMovieHandler = useSelectMovie(setFeaturedMovie);

  useEffect(() => {
    // Load real data from data service
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Load all movies from data service
        const allMovies = await dataService.loadMovies();
        // Set featured movie (either from session storage or default)
        const selectedMovieId = sessionStorageService.getSelectedMovie();
        let featured = null;
        
        if (selectedMovieId) {
          featured = allMovies.find(movie => movie.id === selectedMovieId);
        }
        
        if (!featured) {
          featured = await dataService.getFeaturedMovie();
        }
        
        setFeaturedMovie(featured);

        // Set trending movies
        const trending = await dataService.getTrendingMovies(TRENDING_CAROUSEL_CONFIG.maxItems);
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Failed to load movie data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMenuItemClick = (itemId: string) => {
    console.log('Menu item clicked:', itemId);
    // Handle menu navigation here
  };

  const handlePlayClick = () => {
    console.log('Play clicked for:', featuredMovie?.title);
    // Handle play action
  };

  const handleMoreInfoClick = () => {
    console.log('More info clicked for:', featuredMovie?.title);
    // Handle more info action
  };

  if (isLoading) {
    return (
      <div className="home-page home-page--loading">
        <div className="home-page__loader">
          <div className="home-page__spinner"></div>
          <p>Loading your entertainment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <MainMenu user={user} onMenuItemClick={handleMenuItemClick} />
      
      <main className="home-page__content">
        <div className="home-page__featured">
          <FeaturedMovie
            movie={featuredMovie}
            onPlayClick={handlePlayClick}
            onMoreInfoClick={handleMoreInfoClick}
          />
        </div>

        <div className="home-page__trending">
          <TrendingCarousel
            movies={trendingMovies}
            onMovieClick={selectMovieHandler}
          />
        </div>
      </main>
    </div>
  );
};
