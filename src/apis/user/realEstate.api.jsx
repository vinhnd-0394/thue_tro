import baseApi from '../http.api';

export const getPublishRealEstates = async (params = null) => {
  return await baseApi.get('/real-estates', {
    params: params,
  });
};

export const getPremiumRealEstates = async () => {
  return await baseApi.get('/real-estates/premium');
};

export const apiGetRealEstatesManager = async (params = null) => {
  return await baseApi.get('/real-estates/manager', {
    params: params,
  });
};

export const getRealEstatesDetail = async (realEstateId) => {
  return await baseApi.get(`/real-estates/${realEstateId}`);
};

export const getPublicOtherRealEstatesOwner = async ({
  ownerId,
  realEstateId,
}) => {
  return await baseApi.get(`/real-estates/${realEstateId}/${ownerId}/other`, {
    params: { limit: 5 },
  });
};

export const approveRealEstateById = async (realEstateId) => {
  return await baseApi.put(`/admin/real-estates/${realEstateId}/approve`);
};
