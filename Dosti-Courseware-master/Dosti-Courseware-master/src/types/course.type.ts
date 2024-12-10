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
  name?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  finalPrice?: number;
  level?: CourseLevel;
  author?: string;
  topics?: string[];
  duration?: number;
  access?: AccessStatus;
  courseSlug?: string;
  categoryId?: {
    _id: string;
    name: string;
  };
  userId?: {
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
  willLearns?: string[];
  lessons?: number | ILesson[];
  sections?: number | ISection[];
  numOfReviews?: number;
  totalVideosLength?: number;
  avgRatingStars?: number;
  isBought?: boolean;
  requirements?: string[];
}

export interface ILesson {
  _id: string;
  name: string;
  sectionId: string;
  type: string;
  content: string;
  access: string;
  description: string;
  videoLength: number;
  isDone?: boolean;
}

export interface ISection {
  _id: string;
  name: string;
  courseId: string;
  description: string;
  access: string;
  numOfLessons?: number;
  totalVideosLength?: number;
}

// When is use is enrolled ? (bought the course, click enroll if course is free)
