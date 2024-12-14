import { ICourse, ICourseEnrolledByUser } from './course.type';

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

export interface IUserDetail extends Omit<IUser, 'courses'> {
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
