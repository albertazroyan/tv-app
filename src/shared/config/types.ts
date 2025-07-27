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

export enum VideoState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing'
}
