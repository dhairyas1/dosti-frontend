export enum AccessStatus {
  PAID = 'PAID',
  DRAFT = 'DRAFT',
  COMMING_SOON = 'COMMING_SOON',
  ENROLLMENT_CLOSED = 'ENROLLMENT_CLOSED',
  FREE = 'FREE',
  PRIVATE = 'PRIVATE'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface ICourse {
  _id: string;
  name: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  finalPrice: number;
  level: string;
  author: string;
  topics: string[];
  duration: number;
  access: AccessStatus;
  courseSlug: string;
  categoryId: {
    _id: string;
    name: string;
  };
  userId: {
    _id: string;
    name: string;
    avatar: string;
  };
  rating?: number;
  reviews?: number;
  students?: number;
  createdAt?: string;
  updatedAt?: string;
  subTitle?: string;
} 