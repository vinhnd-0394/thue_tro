import baseApi from '../../http.api';

export const apiGetAllOrders = async ({ limit, page }) => {
  return await baseApi.get('/manager/orders', {
    params: {
      limit,
      page,
    },
  });
};
