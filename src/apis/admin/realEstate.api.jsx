import baseApi from '../http.api';

export const apiGetAllRealEstate = async (params = null) => {
  return await baseApi.get('/admin/real-estates', {
    params: params,
  });
};

export const apiGetRealEstatesDetail = async (realEstateId) => {
  return await baseApi.get(`/admin/real-estates/${realEstateId}`);
};

export const approveRealEstateById = async (realEstateId) => {
  return await baseApi.put(`/admin/real-estates/${realEstateId}/approve`);
};
