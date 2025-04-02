import baseApi from '../http.api';

export const apiGetAllUser = async (params = null) => {
  return await baseApi.get('/admin/users', {
    params: params,
  });
};
