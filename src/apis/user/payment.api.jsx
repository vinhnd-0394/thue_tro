import baseApi from '../http.api';

export const apiCreatePaymentLink = async (payload) => {
  return await baseApi.post('/payments/create-payment-link', payload);
};

export const apiCheckPaymentLink = async (payload) => {
  return await baseApi.post('/payments/check-payment-link', payload);
};
