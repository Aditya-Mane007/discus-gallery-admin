import axios from 'axios';
import { AUTH_API } from '../API_URL';
import api from '../api/apiInterceptor';

export const changeOrganization = async (formData: any) => {
  const res = await api.patch(
    AUTH_API + '/organization/changeUserOrganization',
    formData,
    {
      withCredentials: true,
    },
  );
  return res;
};
