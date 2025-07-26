import type { Movie } from '@entities/movie';

export interface SearchMovieParams {
  query: string;
  movies: Movie[];
}

export interface SearchMovieResult {
  results: Movie[];
  query: string;
  totalCount: number;
}

export const searchMovie = ({ query, movies }: SearchMovieParams): SearchMovieResult => {
  if (!query.trim()) {
    return {
      results: [],
      query: '',
      totalCount: 0,
    };
  }

  const lowercaseQuery = query.toLowerCase();
  
  const results = movies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.category.toLowerCase().includes(lowercaseQuery) ||
    movie.description.toLowerCase().includes(lowercaseQuery)
  );

  return {
    results,
    query,
    totalCount: results.length,
  };
};

export const useSearchMovie = (movies: Movie[]) => {
  return (query: string) => searchMovie({ query, movies });
};
