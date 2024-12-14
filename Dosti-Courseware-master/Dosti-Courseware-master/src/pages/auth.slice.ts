import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types/user.type';

interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
  email: string;
}

interface AdminDecodedToken extends DecodedToken {
  adminRole: UserRole;
}

interface IUserDetail {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  phone?: string;
  courses: ICourseEnrolledByUser[];
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  userId: string;
  adminId: string;
  isAuth: boolean;
  isAdminAuth: boolean;
  token: string | null;
  adminToken: string | null;
  isOpenAuthModal: boolean;
  adminRole: UserRole | null;
  user?: IUserDetail;
}

const initialState: AuthState = {
  userId: '',
  adminId: '',
  isAuth: false,
  isAdminAuth: false,
  token: null,
  adminToken: null,
  isOpenAuthModal: false,
  adminRole: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUserCredentials: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    setAuthenticated(state, action: PayloadAction<string>) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(action.payload);
        state.isAuth = true;
        state.token = action.payload;
        state.userId = decodedToken.userId;
      } catch (error) {
        console.error('Invalid token:', error);
        state.isAuth = false;
        state.token = null;
        state.userId = '';
      }
    },
    setAdminAuthenticated(state, action: PayloadAction<string>) {
      try {
        const decodedToken = jwtDecode<AdminDecodedToken>(action.payload);
        state.isAdminAuth = true;
        state.adminToken = action.payload;
        state.adminId = decodedToken.userId;
        state.adminRole = decodedToken.adminRole;
      } catch (error) {
        console.error('Invalid admin token:', error);
        state.isAdminAuth = false;
        state.adminToken = null;
        state.adminId = '';
        state.adminRole = null;
      }
    },
    setUnauthenticated(state) {
      state.isAuth = false;
      state.token = null;
      state.userId = '';
      localStorage.removeItem('token');
    },
    setAdminUnauthenticated(state) {
      state.isAdminAuth = false;
      state.adminToken = null;
      state.adminId = '';
      state.adminRole = null;
      localStorage.removeItem('adminToken');
    },
    openAuthModal(state) {
      state.isOpenAuthModal = true;
    },
    closeAuthModal(state) {
      state.isOpenAuthModal = false;
    },
    logout(state) {
      state.userId = '';
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    adminLogout(state) {
      state.adminId = '';
      state.isAdminAuth = false;
      state.adminToken = null;
      state.adminRole = null;
      localStorage.removeItem('adminToken');
    }
  }
});

const authReducer = authSlice.reducer;
export const {
  checkUserCredentials,
  setAuthenticated,
  setUnauthenticated,
  setAdminAuthenticated,
  setAdminUnauthenticated,
  openAuthModal,
  closeAuthModal,
  logout,
  adminLogout
} = authSlice.actions;
export default authReducer;
