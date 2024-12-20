import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../constant/backend-domain';
import { IUser } from '../types/user.type';
import { CustomError } from '../utils/helpers';

/**
 * Mô hình sync dữ liệu danh sách bài post dưới local sau khi thêm 1 bài post
 * Thường sẽ có 2 cách tiếp cận
 * Cách 1: Đây là cách những video trước đây mình dùng
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành lấy data đó thêm vào state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * ====> Rủi ro cách này là nếu khi gọi request add post mà server trả về data không đủ các field để
 * chúng ta hiển thị thì sẽ gặp lỗi. Nếu có nhiều người cùng add post thì data sẽ sync thiếu,
 * Chưa kể chúng ta phải quản lý việc cập nhật state nữa, hơi mệt!
 *
 *
 * Cách 2: Đây là cách thường dùng với RTK query
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành fetch lại API get Authentication để cập nhật state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * =====> Cách này giúp data dưới local sẽ luôn mới nhất, luôn đồng bộ với server
 * =====> Khuyết điểm là chúng ta sẽ tốn thêm một lần gọi API. Thực ra thì điều này có thể chấp nhận được
 */

interface loginResponse {
  token: string;
  userId: string;
  message: string;
}
interface signupResponse {
  userId: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi', // Tên field trong Redux state
  tagTypes: ['Authentication'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/auth`,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      const adminToken = localStorage.getItem('adminToken');
      const token = localStorage.getItem('token');
      
      if (adminToken) {
        headers.set('Authorization', `Bearer ${adminToken}`);
        headers.set('adminRole', 'admin');
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('userRole', 'user');
      }
      
      return headers;
    },
    fetchFn: async (input: RequestInfo | URL, init?: RequestInit) => {
      const modifiedInit: RequestInit = {
        ...init,
        mode: 'cors',
        credentials: 'include'
      };
      return fetch(input, modifiedInit);
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    login: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        try {
          return {
            url: 'login',
            method: 'POST',
            body,
            credentials: 'include',
            validateStatus: (response, result) => 
              response.status === 200 || response.status === 401 || response.status === 422
          };
        } catch (error: any) {
          console.error('Login error:', error);
          throw new CustomError(error.message || 'Login failed');
        }
      },
      invalidatesTags: (result, error, body) => {
        if (error) {
          console.error('Login error:', error);
          return [];
        }
        return [{ type: 'Authentication', id: 'LIST' }];
      }
    }),
    logout: build.mutation<loginResponse, void>({
      query() {
        return {
          url: 'logout',
          method: 'POST',
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    adminLogout: build.mutation<loginResponse, void>({
      query() {
        return {
          url: 'admin/logout',
          method: 'POST',
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),

    updateLastLogin: build.mutation<loginResponse, { userId: string; lastLogin: Date }>({
      query(body) {
        return {
          url: `${body.userId}/last-login`,
          method: 'PATCH',
          body: { lastLogin: body.lastLogin },
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),

    adminLogin: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        return {
          url: 'admin-login',
          method: 'POST',
          body,
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Authentication', id: 'LIST' }])
    }),
    signup: build.mutation<signupResponse, Omit<IUser, '_id'>>({
      query(body) {
        try {
          return {
            url: 'signup',
            method: 'PUT',
            body,
            credentials: 'include',
            validateStatus: (response, result) => 
              response.status === 201 || response.status === 422
          };
        } catch (error: any) {
          console.error('Signup error:', error);
          throw new CustomError(error.message || 'Signup failed');
        }
      },
      invalidatesTags: (result, error, data) => {
        if (error) {
          console.error('Signup invalidation error:', error);
          return [];
        }
        return [{ type: 'Authentication', id: 'LIST' }];
      }
    }),
    resetPassword: build.mutation<IUser, { id: string; body: IUser }>({
      query(data) {
        return {
          url: 'signup',
          method: 'PUT',
          body: data.body,
          credentials: 'include'
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Authentication', id: data.id }])
    })
  })
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useUpdateLastLoginMutation,
  useLogoutMutation,
  useAdminLogoutMutation
} = authApi;
