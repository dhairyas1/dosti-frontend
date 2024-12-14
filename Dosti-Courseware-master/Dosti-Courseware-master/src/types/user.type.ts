import { ICourse } from './course.type';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  INSTRUCTOR = 'instructor'
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  courses: ICourse[];
  createdAt?: string;
  updatedAt?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
}
