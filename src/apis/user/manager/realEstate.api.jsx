import baseApi from '../../http.api';

export const apiGetRealEstatesManager = async (params = null) => {
  return await baseApi.get('/manager/real-estates', {
    params: params,
  });
};

export const apiGetRealEstatesDetail = async (realEstateId) => {
  return await baseApi.get(`/manager/real-estates/${realEstateId}`);
};

export const apiUpdateRealEstateByUser = async ({ formData, realEstateId }) => {
  return await baseApi.put(`/manager/real-estates/${realEstateId}`, formData);
};

export const apiCreateRealEstateByUser = async ({ formData }) => {
  return await baseApi.post('/manager/real-estates', formData);
};
