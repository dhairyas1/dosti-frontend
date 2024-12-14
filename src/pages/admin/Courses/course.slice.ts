import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse, ISection } from '../../../types/course.type';

interface CourseState {
  course: ICourse | null;
  courses: ICourse[];
  isLoading: boolean;
  error: string | null;
  selectedSection: ISection | null;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  isLoading: false,
  error: null,
  selectedSection: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse(state, action: PayloadAction<ICourse | null>) {
      state.course = action.payload;
    },
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSelectedSection(state, action: PayloadAction<ISection | null>) {
      state.selectedSection = action.payload;
    },
  },
});

export const {
  setCourse,
  setCourses,
  setLoading,
  setError,
  setSelectedSection,
} = courseSlice.actions;

export default courseSlice.reducer; 