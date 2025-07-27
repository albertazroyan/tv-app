import React from 'react';
import type { Movie } from '@entities/movie';
import type { SearchMovieResult } from '@features/searchMovie';
import './SearchBar.css';

interface SearchBarProps {
  searchQuery: string;
  showSearchResults: boolean;
  searchResults: SearchMovieResult;
  onSearchChange: (query: string) => void;
  onSearchResultClick: (movie: Movie) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  showSearchResults,
  searchResults,
  onSearchChange,
  onSearchResultClick,
}) => {
  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-bar__input"
          autoFocus
        />
        {showSearchResults && searchResults.totalCount > 0 && (
          <div className="search-bar__results">
            <h3>Found {searchResults.totalCount} movies</h3>
            <div className="search-bar__grid">
              {searchResults.results.map((movie, index) => (
                <div
                  key={`${movie.id}-${movie.title}-${index}`}
                  className="search-bar__item"
                  onClick={() => onSearchResultClick(movie)}
                >
                  <img src={movie.coverImage} alt={movie.title} className="search-bar__poster" />
                  <div className="search-bar__info">
                    <h4>{movie.title}</h4>
                    <p>{movie.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showSearchResults && searchQuery.trim() && searchResults.totalCount === 0 && (
          <div className="search-bar__results">
            <p>No movies found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
