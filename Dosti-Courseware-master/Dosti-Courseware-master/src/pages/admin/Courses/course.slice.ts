import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse, ISection } from '../../../types/course.type';

interface CourseState {
  course: ICourse | null;
  courses: ICourse[];
  isLoading: boolean;
  error: string | null;
  selectedSection: ISection | null;
  formData: {
    title?: string;
    slug?: string;
    price?: number;
    access?: string;
    thumb?: string;
    [key: string]: any;
  };
  courseId?: string;
  sectionId?: string;
  chartName?: string;
  previousDaysSelected?: number;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  isLoading: false,
  error: null,
  selectedSection: null,
  formData: {},
  courseId: undefined,
  sectionId: undefined,
  chartName: undefined,
  previousDaysSelected: undefined
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse(state, action: PayloadAction<ICourse | null>) {
      state.course = action.payload;
      if (action.payload) {
        state.courseId = action.payload._id;
      } else {
        state.courseId = undefined;
      }
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
      if (action.payload) {
        state.sectionId = action.payload._id;
      } else {
        state.sectionId = undefined;
      }
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
    selectPreviousDays(state, action: PayloadAction<number>) {
      state.previousDaysSelected = action.payload;
    },
    showChart(state, action: PayloadAction<string>) {
      state.chartName = action.payload;
    },
    setCourseId(state, action: PayloadAction<string | undefined>) {
      state.courseId = action.payload;
    },
    setSectionId(state, action: PayloadAction<string | undefined>) {
      state.sectionId = action.payload;
    }
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
  selectPreviousDays,
  showChart,
  setCourseId,
  setSectionId
} = courseSlice.actions;

export default courseSlice.reducer;
