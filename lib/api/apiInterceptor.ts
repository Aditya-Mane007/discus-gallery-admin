import axios from 'axios';
import { AUTH_API } from '../API_URL';
import { getCookie } from '../utils';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: () => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we receive a 401 during OTP verification, the session has expired.
      // We check the cookie, the current page URL, or the error message to be robust.
      if (typeof window !== 'undefined') {
        const temSessionId = getCookie('tem_session_id');
        const isOnVerifyPage = window.location.pathname.includes('/verify');
        const isSessionExpiredMsg = error.response?.data?.message
          ?.toLowerCase()
          ?.includes('expire');

        if (temSessionId || isOnVerifyPage || isSessionExpiredMsg) {
          // if (temSessionId || isOnVerifyPage) {
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }

      // Do not attempt to refresh if refresh endpoint itself fails.
      if (originalRequest.url?.includes('/auth/refresh-token')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.get(AUTH_API + '/auth/refresh-token', {
          withCredentials: true,
        });

        processQueue(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
