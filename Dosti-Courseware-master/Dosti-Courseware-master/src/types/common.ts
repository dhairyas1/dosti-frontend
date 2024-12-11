import type { ColProps, RowProps } from 'antd';

// Common interfaces for courses
export interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  description?: string;
  price?: number;
  author?: string;
  progress?: number;
  enrolledDate?: string;
  lastAccessedDate?: string;
}

// Common interfaces for paths/lessons
export interface Lesson {
  _id: string;
  title: string;
  videoUrl: string;
  duration: number;
  isDone?: boolean;
}

export interface Section {
  _id: string;
  title: string;
  lessons: Lesson[];
}

export interface Path {
  _id: string;
  title: string;
  description: string;
  sections: Section[];
  progress?: number;
}

// Common layout props
export const commonLayoutProps = {
  row: {
    gutter: [24, 24]
  } as RowProps,
  
  cols: {
    full: { xs: 24 } as ColProps,
    half: { xs: 24, md: 12 } as ColProps,
    third: { xs: 24, md: 8 } as ColProps,
    quarter: { xs: 24, sm: 12, md: 8, lg: 6 } as ColProps
  }
}; 