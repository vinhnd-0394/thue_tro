import baseApi from '../http.api';

export const apiCreateContactWithoutLogin = async (payload) => {
  return await baseApi.post('/contacts', payload);
};
