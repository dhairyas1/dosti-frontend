import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from '../../../types/course.type';

interface CourseState {
  courses: ICourse[];
  course: ICourse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  course: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
    setCourse(state, action: PayloadAction<ICourse>) {
      state.course = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setCourses,
  setCourse,
  setLoading,
  setError,
} = courseSlice.actions;

export default courseSlice.reducer;
