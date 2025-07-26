import type { Movie } from '@shared/config/types';
import type { ApiData } from '@shared/config/apiTypes';
import { transformApiMovieToMovie } from '@shared/config/apiTypes';
import { movieUtils } from './movieUtils';
import data from '@shared/data/data.json';

export class DataService {
  private static instance: DataService;
  private apiData: ApiData;

  private constructor() {
    this.apiData = data as ApiData;
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public async loadMovies(): Promise<Movie[]> {
    // Transform featured movie
    const featuredMovie = transformApiMovieToMovie(this.apiData.Featured, true);
    
    // Transform trending movies
    const trendingMovies = this.apiData.TendingNow.map(item => 
      transformApiMovieToMovie(item, false)
    );

    // Combine all movies
    const allMovies = [featuredMovie, ...trendingMovies];
    
    // Sort by last viewed movies on load
    return movieUtils.sortMoviesByLastViewed(allMovies);
  }

  public async getFeaturedMovie(): Promise<Movie> {
    return transformApiMovieToMovie(this.apiData.Featured, true);
  }

  public async getTrendingMovies(maxCount: number = 50): Promise<Movie[]> {
    const trendingMovies = this.apiData.TendingNow
      .slice(0, maxCount)
      .map(item => transformApiMovieToMovie(item, false));
    
    return movieUtils.sortMoviesByLastViewed(trendingMovies);
  }
}

export const dataService = DataService.getInstance();
