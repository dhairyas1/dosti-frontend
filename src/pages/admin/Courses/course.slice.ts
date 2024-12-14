import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse, ISection } from '../../../types/course.type';

interface CourseState {
  course: ICourse | null;
  courses: ICourse[];
  isLoading: boolean;
  error: string | null;
  selectedSection: ISection | null;
  formData: any;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  isLoading: false,
  error: null,
  selectedSection: null,
  formData: {},
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
    handleFormData(state, action: PayloadAction<{ field: string; value: any }>) {
      state.formData = {
        ...state.formData,
        [action.payload.field]: action.payload.value,
      };
    },
    startAddSection(state, action: PayloadAction<ISection>) {
      if (state.course) {
        state.course.sections = [...(state.course.sections || []), action.payload];
      }
    },
  },
});

export const {
  setCourse,
  setCourses,
  setLoading,
  setError,
  setSelectedSection,
  handleFormData,
  startAddSection,
} = courseSlice.actions;

export default courseSlice.reducer; 