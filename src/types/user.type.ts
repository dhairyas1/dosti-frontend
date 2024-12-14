export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  INSTRUCTOR = 'INSTRUCTOR'
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  phone?: string;
  courses: string[];
  createdAt?: string;
  updatedAt?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
  lastLogin?: string;
  providerId?: string;
  fbUserId?: string;
}

export interface IUserDetail extends IUser {
  // No need to override courses since we're using simple string array
} 