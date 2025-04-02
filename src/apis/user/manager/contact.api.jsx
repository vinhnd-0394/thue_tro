import baseApi from '../../http.api';

export const apiCreateContact = async (payload) => {
  return await baseApi.post('/manager/contacts', payload);
};

export const apiGetAllContacts = async (params) => {
  return await baseApi.get('/manager/contacts', {
    params: params,
  });
};

export const apiConfirmContact = async (contactId) => {
  return await baseApi.put(`/manager/contacts/${contactId}`);
};
export const apiRejectContact = async (contactId) => {
  return await baseApi.delete(`/manager/contacts/${contactId}`);
};
