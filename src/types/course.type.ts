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

// Base interface with required fields
export interface ICourseBase {
  _id: string;
  name: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  finalPrice: number;
  level: CourseLevel;
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
}

// Main course interface extending base with optional fields
export interface ICourse extends ICourseBase {
  rating?: number;
  reviews?: number;
  students?: number;
  createdAt?: string;
  updatedAt?: string;
  subTitle?: string;
  willLearns?: string[];
  lessons?: number;
  sections?: number;
  numOfReviews?: number;
  totalVideosLength?: number;
  avgRatingStars?: number;
  isBought?: boolean;
  requirements?: string[];
  tags?: string[];
}

// Interface for enrolled courses
export interface ICourseEnrolledByUser extends Omit<ICourse, 'lessons' | 'sections'> {
  progress: number;
  totalVideosLengthDone: number;
  isBought: boolean;
  lessons: ILesson[];
  lessonsDone: string[];
  sections: ISection[];
}

// Interface for course details
export interface ICourseDetail extends ICourse {
  lessons: number;
  sections: number;
  numOfReviews: number;
  totalVideosLength: number;
  avgRatingStars: number;
  students: number;
  isBought: boolean;
  createdAt: string;
  updatedAt: string;
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
