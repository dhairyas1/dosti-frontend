import { ICourseEnrolledByUser } from './course.type';

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
  avatar?: string;
  phone?: string;
  courses: ICourseEnrolledByUser[];
  role: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserDetail extends IUser {
  courses: ICourseEnrolledByUser[];
}

export interface AuthState {
  userId: string;
  adminId: string;
  isAuth: boolean;
  isAdminAuth: boolean;
  token: string | null;
  adminToken: string | null;
  isOpenAuthModal: boolean;
  adminRole: UserRole | null;
  user?: IUserDetail;
}
