import axios from 'axios';
import { AUTH_API } from '../API_URL';
import api from '../api/apiInterceptor';

export const registerController = async (formData: any) => {
  const res = await api.post(AUTH_API + '/auth/register', formData, {
    withCredentials: true,
  });
  return res;
};

export const loginController = async (formData: any) => {
  const res = await api.post(AUTH_API + '/auth/login', formData, {
    withCredentials: true,
  });
  return res;
};

export const logoutController = async () => {
  const res = await api.get(AUTH_API + '/auth/logout', {
    withCredentials: true,
  });

  return res;
};

export const getRefreshToken = async () => {
  const res = await api.get(AUTH_API + '/auth/refresh-token', {
    withCredentials: true,
  });

  return res;
};

export const getUserController = async () => {
  const res = await api.get(AUTH_API + '/auth/me', {
    withCredentials: true,
  });

  console.log('RES : ', res);

  return res;
};

export const getOtpStatus = async () => {
  const res = await api.get(AUTH_API + '/auth/getOtpStatus', {
    withCredentials: true,
  });

  return res;
};

export const sendEmailVerifictionOtp = async (formData: any) => {
  const res = await api.get(AUTH_API + '/auth/generateOTP', {
    withCredentials: true,
  });

  return res;
};

export const otpVerification = async (formData: any) => {
  const res = await api.post(AUTH_API + '/auth/verifyOTP', formData, {
    withCredentials: true,
  });

  console.log('OTP VERIFY DATA : ', res);

  return res;
};

export const routeInfo = async () => {
  const res = await api.get(AUTH_API + '/auth/routeInfo', {
    withCredentials: true,
  });
};

export const getPermission = async () => {
  const res = await api.get(AUTH_API + '/permission/get-permissions', {
    withCredentials: true,
  });

  return res;
};

