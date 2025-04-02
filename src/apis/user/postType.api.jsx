import baseApi from '../http.api';

export const apiGetAllPostTypes = async () => {
  return await baseApi.get('/post-types')
};
