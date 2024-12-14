export enum AccessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FREE = 'FREE',
  PAID = 'PAID'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

// Base interface with required fields
export interface ICourseBase {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: CourseLevel;
  author: string;
  access: AccessStatus;
}

// Main course interface extending base with optional fields
export interface ICourse extends ICourseBase {
  finalPrice?: number;
  courseSlug?: string;
  progress?: number;
  isBought?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sections?: string[];
  lessons?: string[];
  numOfLessons?: number;
  totalVideosLength?: number;
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
