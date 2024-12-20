import { ICourse } from './course.type';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  USER = 'USER'
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  bio?: string;
  activities?: string[];
  courses?: ICourse[];
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  tags?: string[];
  providerId?: string;
  fbUserId?: string;
  resetToken?: string;
  resetTokenExpiration?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
}
