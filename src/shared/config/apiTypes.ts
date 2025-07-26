// Types matching the actual JSON data structure
export interface ApiMovieItem {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

export interface ApiData {
  Featured: ApiMovieItem;
  TendingNow: ApiMovieItem[];
}

// Helper function to resolve asset paths
function resolveAssetPath(filename: string): string {
  // Handle different asset path formats
  if (filename.startsWith('http')) {
    return filename; // External URL, return as is
  }
  // For local assets in public directory, Vite serves them from root
  // Files in public/ are served directly at /filename
  return `/${filename}`;
}

// Transform function to convert API data to internal Movie type
export function transformApiMovieToMovie(apiMovie: ApiMovieItem, isFeatured = false): import('./types').Movie {
  return {
    id: apiMovie.Id,
    title: apiMovie.Title,
    category: apiMovie.Category,
    year: parseInt(apiMovie.ReleaseYear),
    rating: apiMovie.MpaRating,
    duration: apiMovie.Duration,
    description: apiMovie.Description,
    coverImage: resolveAssetPath(apiMovie.CoverImage),
    logoImage: resolveAssetPath(apiMovie.TitleImage),
    videoUrl: apiMovie.VideoUrl || '',
    isTrending: true, // All items in TendingNow are trending
    isFeatured,
    createdAt: apiMovie.Date,
  };
}
