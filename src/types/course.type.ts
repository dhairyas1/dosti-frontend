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
  ADVANCED = 'ADVANCED'
}

// Base interface with common fields
export interface ICourseBase {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: CourseLevel;
  author: string;
  createdAt?: string;
  updatedAt?: string;
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
  willLearns?: string[];
  requirements?: string[];
  tags?: string[];
  rating?: number;
  reviews?: number;
  students?: number;
  avgRatingStars?: number;
  totalTime?: number;
  objectives?: string[];
  forWho?: string[];
  courseState?: string;
  numOfReviews?: number;
  totalStudents?: number;
  totalReviews?: number;
  isPublished?: boolean;
  status?: string;
  totalSections?: number;
  totalVideosLengthDone?: number;
}

// Interface for enrolled courses
export interface ICourseEnrolled extends ICourse {
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
}

export interface ISection {
  _id: string;
  title: string;
  description?: string;
  lessons: ILesson[];
  order: number;
  courseId: string;
  access?: string;
  numOfLessons?: number;
  totalVideosLength?: number;
}

export interface ILesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  sectionId: string;
  courseId: string;
  isCompleted?: boolean;
  content?: string;
  access?: string;
  videoLength?: number;
} 