export enum AccessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FREE = 'FREE',
  PAID = 'PAID',
  DRAFT = 'DRAFT'
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
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  finalPrice: number;
  level: CourseLevel;
  author: string;
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
  progress?: number;
  isBought?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sections?: ISection[];
  lessons?: ILesson[];
  numOfLessons?: number;
  totalVideosLength?: number;
  subTitle?: string;
  willLearns?: string[];
  requirements?: string[];
  tags?: string[];
  rating?: number;
  reviews?: number;
  students?: number;
  avgRatingStars?: number;
}

// Interface for enrolled courses
export interface ICourseEnrolledByUser extends ICourse {
  progress: number;
  totalVideosLengthDone: number;
  isBought: boolean;
  lessonsDone: string[];
}

// Interface for course details
export interface ICourseDetail extends ICourse {
  numOfReviews: number;
  totalVideosLength: number;
  avgRatingStars: number;
  students: number;
  isBought: boolean;
  createdAt: string;
  updatedAt: string;
  sections: ISection[];
  lessons: ILesson[];
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
