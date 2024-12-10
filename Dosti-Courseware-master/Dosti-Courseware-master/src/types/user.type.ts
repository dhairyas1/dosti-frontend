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
  avatar?: string;
  bio?: string;
  activities?: string[];
  // Add other user fields as needed
}
