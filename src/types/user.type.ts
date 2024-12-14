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
  courses: ICourseEnrolledByUser[];
  createdAt?: string;
  updatedAt?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
  lastLogin?: string;
  providerId?: string;
  fbUserId?: string;
}

export interface IUserDetail extends Omit<IUser, 'courses'> {
  courses: ICourseEnrolledByUser[];
} 