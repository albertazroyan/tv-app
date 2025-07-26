import type { User } from '@shared/config/types';

export class UserEntity {
  constructor(private user: User) {}

  get id(): string {
    return this.user.id;
  }

  get name(): string {
    return this.user.name;
  }

  get avatar(): string {
    return this.user.avatar;
  }

  toJSON(): User {
    return { ...this.user };
  }

  static fromJSON(data: User): UserEntity {
    return new UserEntity(data);
  }

  static createDefault(): UserEntity {
    return new UserEntity({
      id: 'default-user',
      name: 'Guest User',
      avatar: '/default-avatar.png'
    });
  }
}
