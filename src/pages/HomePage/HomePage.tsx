import React, { useState, useEffect } from 'react';
import type { Movie } from '@entities/movie';
import type { User } from '@entities/user';
import { VideoState } from '@shared/config/types';
import { MainMenu } from '@app/components/MainMenu';
import { useSelectMovie } from '@features/selectMovie';
import { useSearchMovie } from '@features/searchMovie';
import { sessionStorageService } from '@shared/lib/sessionStorage';
import { dataService } from '@shared/lib/dataService';
import { TRENDING_CAROUSEL_CONFIG } from '@shared/config/constants';
import { UserEntity } from '@entities/user/model';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MainContent } from './components/MainContent';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [user] = useState<User>(UserEntity.createDefault().toJSON());
  const [isLoading, setIsLoading] = useState(true);
  const [videoState, setVideoState] = useState<VideoState>(VideoState.IDLE);
  const [activeMenuItem, setActiveMenuItem] = useState<string>('home');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectMovieHandler = useSelectMovie(setFeaturedMovie);
  const searchMovies = useSearchMovie(allMovies);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        const allMovies = await dataService.loadMovies();
        const selectedMovieId = sessionStorageService.getSelectedMovie();
        let featured = null;
        
        if (selectedMovieId) {
          featured = allMovies.find(movie => movie.id === selectedMovieId);
        }
        
        if (!featured) {
          featured = await dataService.getFeaturedMovie();
        }
        
        setFeaturedMovie(featured);
        setAllMovies(allMovies);

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

  useEffect(() => {
    const handlePlayBackgroundVideo = (event: CustomEvent) => setVideoState(VideoState.PLAYING);
    window.addEventListener('playBackgroundVideo', handlePlayBackgroundVideo as EventListener);
    return () => {
      window.removeEventListener('playBackgroundVideo', handlePlayBackgroundVideo as EventListener);
    };
  }, []);

  const handleMenuItemClick = (itemId: string) => {
    console.log('Menu item clicked:', itemId);
    setActiveMenuItem(itemId);
    
    if (itemId === 'search') {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.trim().length > 0);
  };

  const handleSearchResultClick = (movie: Movie) => {
    handlePlayClick(movie);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handlePlayClick = (currentMovie: Movie) => {
    if (!currentMovie) return;
    setVideoState(VideoState.LOADING);
    selectMovieHandler(currentMovie);
  };

  const handleMoreInfoClick = () => {
    if (!featuredMovie) return;
    console.log('More info clicked for:', featuredMovie?.title);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const searchResults = searchQuery.trim() ? searchMovies(searchQuery) : { results: [], query: '', totalCount: 0 };

  return (
    <div className="home-page">
      <MainMenu 
        user={user} 
        onMenuItemClick={handleMenuItemClick}
        activeMenuItem={activeMenuItem}
      />
      
      {(activeMenuItem === 'search' || showSearchResults) && (
        <SearchBar
          searchQuery={searchQuery}
          showSearchResults={showSearchResults}
          searchResults={searchResults}
          onSearchChange={handleSearchChange}
          onSearchResultClick={handleSearchResultClick}
        />
      )}
      
      {!showSearchResults && (
        <MainContent
          featuredMovie={featuredMovie}
          trendingMovies={trendingMovies}
          videoState={videoState}
          onPlayClick={handlePlayClick}
          onMoreInfoClick={handleMoreInfoClick}
        />
      )}
    </div>
  );
};
