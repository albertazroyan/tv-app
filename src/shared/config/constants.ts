export const MENU_ITEMS = [
  { id: 'search', label: 'Search', icon: '/icons/ICON - Search.png' },
  { id: 'home', label: 'Home', icon: '/icons/Group 46.png' },
  { id: 'tv-shows', label: 'TV Shows', icon: '/icons/Group 47.png' },
  { id: 'movies', label: 'Movies', icon: '/icons/Group 53.png' },
  { id: 'genres', label: 'Genres', icon: '/icons/Group 54.png' },
  { id: 'watch-later', label: 'Watch Later', icon: '/icons/Group 56.png' },
];

export const PROFILE_MENU_ITEMS = [
  { id: 'language', label: 'Language' },
  { id: 'help', label: 'Get Help' },
  { id: 'exit', label: 'Exit' }
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
