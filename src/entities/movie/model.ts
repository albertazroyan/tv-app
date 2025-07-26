import type { Movie } from '@shared/config/types';

export class MovieEntity {
  constructor(private movie: Movie) {}

  get id(): string {
    return this.movie.id;
  }

  get title(): string {
    return this.movie.title;
  }

  get category(): string {
    return this.movie.category;
  }

  get year(): number {
    return this.movie.year;
  }

  get rating(): string {
    return this.movie.rating;
  }

  get duration(): string {
    return this.movie.duration;
  }

  get description(): string {
    return this.movie.description;
  }

  get coverImage(): string {
    return this.movie.coverImage;
  }

  get logoImage(): string {
    return this.movie.logoImage;
  }

  get videoUrl(): string {
    return this.movie.videoUrl;
  }

  get isTrending(): boolean {
    return this.movie.isTrending;
  }

  get isFeatured(): boolean {
    return this.movie.isFeatured;
  }

  get createdAt(): string {
    return this.movie.createdAt;
  }

  toJSON(): Movie {
    return { ...this.movie };
  }

  static fromJSON(data: Movie): MovieEntity {
    return new MovieEntity(data);
  }
}
