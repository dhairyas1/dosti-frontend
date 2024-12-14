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
  title?: string;  // For backward compatibility
  description: string;
  price: number;
  finalPrice: number;
  access: AccessStatus;
  level: CourseLevel;
  thumbnail: string;
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
  author: string;
  willLearns: string[];
  requirements?: string[];
  objectives?: string[];
  forWho?: string[];
  subTitle?: string;
  totalVideosLength: number;
  avgRatingStars: number;
  numOfReviews: number;
  students: number;
  isBought?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Main course interface extending base with optional fields
export interface ICourse extends ICourseBase {
  sections: ISection[];
  lessons: ILesson[];
}

// Interface for enrolled courses
export interface ICourseEnrolledByUser extends ICourse {
  progress: number;
  totalVideosLengthDone: number;
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

export interface ILesson {
  _id: string;
  name: string;
  title?: string; // For backward compatibility
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

export interface CartItemDisplay {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
}

export interface CartItem extends CartItemDisplay {
  courseId: string;
}

export interface CreateCourseData extends Omit<ICourseBase, '_id'> {
  _id?: string;
  sections?: ISection[];
  lessons?: ILesson[];
}
