export interface Movie {
  id: string;
  title: string;
  category: string;
  year: number;
  rating: string;
  duration: string;
  description: string;
  coverImage: string;
  logoImage: string;
  videoUrl: string;
  isTrending: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface MenuState {
  isOpen: boolean;
  hoveredItem: string | null;
}

export enum VideoState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing'
}

export interface AppState {
  featuredMovie: Movie | null;
  trendingMovies: Movie[];
  selectedMovie: Movie | null;
  user: User | null;
  menuState: MenuState;
  lastViewedMovies: string[];
}
