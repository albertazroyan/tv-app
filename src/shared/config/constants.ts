export const MENU_ITEMS = [
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'tv-shows', label: 'TV Shows', icon: '📺' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'genres', label: 'Genres', icon: '🎭' },
  { id: 'watch-later', label: 'Watch Later', icon: '⏰' },
];

export const PROFILE_MENU_ITEMS = [
  { id: 'language', label: 'Language', icon: '🌐' },
  { id: 'help', label: 'Get Help', icon: '❓' },
  { id: 'exit', label: 'Exit', icon: '🚪' },
];

export const TRENDING_CAROUSEL_CONFIG = {
  maxItems: 50,
  visibleItems: 8,
  autoPlayDelay: 2000,
};

export const SESSION_STORAGE_KEYS = {
  LAST_VIEWED_MOVIES: 'lastViewedMovies',
  SELECTED_MOVIE: 'selectedMovie',
} as const;
