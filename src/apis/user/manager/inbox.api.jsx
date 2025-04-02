import baseApi from '../../http.api';

export const apiGetAllMyInboxes = async () => {
  return await baseApi.get('/manager/inboxes');
};

export const apiGetInboxById = async (inboxId) => {
  // return await baseApi.get(`/manager/inboxes/${inboxId}`);
  try {
    return await baseApi.get(`/manager/inboxes/${inboxId}`);
  } catch (error) {
    return error;
  }
};
