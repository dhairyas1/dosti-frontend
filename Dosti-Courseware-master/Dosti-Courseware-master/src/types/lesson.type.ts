export interface ILesson {
  _id: string;
  name: string;
  videoUrl: string;
  description: string;
  isDone?: boolean;
}

export interface ISection {
  _id: string;
  name: string;
  lessons: ILesson[];
  courseId?: string;
}

export interface IsLessonDone {
  userId: string;
  lessonId: string;
  isDone: boolean;
}
