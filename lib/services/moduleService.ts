// /admin/delmosu;

import api from '../api/apiInterceptor';
import { AUTH_API } from '../API_URL';

export const getModuleListController = async (formData: any) => {
  console.log('FORM DATA : ', formData);
  const page = Number(formData?.page ?? 1);
  const pageSize = Number(formData?.pageSize ?? 10);

  const formatedData = {
    limit: pageSize,
    offset: (page - 1) * pageSize,
    ...(formData?.sortBy && {
      order_by: `${formData.sortBy} ${String(formData?.sortDir).toUpperCase() ?? 'ASC'}`,
    }),

    ...(formData?.q && { q: formData.q }),
  };
  const res = await api.get(AUTH_API + '/modules/get-modules', {
    params: formatedData,
    withCredentials: true,
  });

  return res;
};
