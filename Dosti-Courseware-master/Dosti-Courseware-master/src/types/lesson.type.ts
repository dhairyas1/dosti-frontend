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
