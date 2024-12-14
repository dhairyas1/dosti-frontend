import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from '../../../types/course.type';

interface CourseState {
  isOpenCreateCourse: boolean;
  formData: Partial<ICourse>;
  courseId: string;
  sectionId: string;
  currentStep: number;
}

const initialState: CourseState = {
  isOpenCreateCourse: false,
  formData: {},
  courseId: '',
  sectionId: '',
  currentStep: 0
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    openCreateCourse(state, action: PayloadAction<boolean>) {
      state.isOpenCreateCourse = action.payload;
      if (!action.payload) {
        state.formData = {};
        state.currentStep = 0;
      }
    },
    handleFormData(state, action: PayloadAction<Partial<ICourse>>) {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    setCourseId(state, action: PayloadAction<string>) {
      state.courseId = action.payload;
    },
    setSectionId(state, action: PayloadAction<string>) {
      state.sectionId = action.payload;
    },
    startAddSection(state, action: PayloadAction<string>) {
      state.sectionId = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetCourseForm(state) {
      state.formData = {};
      state.currentStep = 0;
    }
  }
});

export const { 
  openCreateCourse, 
  handleFormData, 
  setCourseId, 
  setSectionId,
  startAddSection,
  setCurrentStep,
  resetCourseForm 
} = courseSlice.actions;

export default courseSlice.reducer;
