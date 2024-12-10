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
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: string;
  author: string;
  topics: string[];
  duration: number;
  rating?: number;
  reviews?: number;
  students?: number;
  createdAt?: string;
  updatedAt?: string;
}

// When is use is enrolled ? (bought the course, click enroll if course is free)
