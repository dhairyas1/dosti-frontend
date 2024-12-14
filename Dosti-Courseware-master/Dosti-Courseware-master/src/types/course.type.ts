export enum AccessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FREE = 'FREE',
  PAID = 'PAID',
  DRAFT = 'DRAFT',
  COMMING_SOON = 'COMMING_SOON',
  ENROLLMENT_CLOSED = 'ENROLLMENT_CLOSED'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

// Base interface with required fields
export interface ICourseBase {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  finalPrice: number;
  level: CourseLevel;
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
  videoUrl?: string;
  description?: string;
  isDone?: boolean;
  content?: string;
  access: string;
  videoLength?: number;
  order?: number;
  sectionId: string;
  courseId: string;
  type: 'media' | 'quiz' | 'assignment' | 'text' | 'survey' | 'scorm';
  duration?: number;
  isCompleted?: boolean;
}

export interface ISection {
  _id: string;
  name: string;
  description?: string;
  lessons: ILesson[];
  courseId: string;
  order?: number;
  access?: string;
  numOfLessons?: number;
  totalVideosLength?: number;
}

export interface IsLessonDone {
  userId: string;
  lessonId: string;
  isDone: boolean;
}
