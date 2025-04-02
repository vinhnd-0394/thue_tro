import { useCallback, useEffect, useState } from 'react';
import { apiGetAllOrders } from '../../../apis/user/manager/order.api';
import useQueryParams from '../../../hooks/useQueryParams';
import momentUtils from '../../../utils/momentUtils';
import Pagination from '../../../components/Pagination/Pagination';

const PaymentHistory = () => {
  const { queryParams } = useQueryParams();
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    const response = await apiGetAllOrders({
      limit: queryParams.limit,
      page: queryParams.page,
    });
    if (response.status === 200) {
      setOrders(response.data);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">Lịch sử giao dịch</h1>
      <div className="p-10">
        <table className="w-full text-sm text-left text-gray-500 border ">
          <thead className="text-xs font-bold text-center text-white uppercase bg-blue-500 border-b">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Giá tiền</th>
              <th className="px-6 py-3">Mô tả</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {orders.totalCounts ? (
              orders.orders.map((item, index) => (
                <tr
                  className="text-center text-black bg-white border-b cursor-pointer hover:bg-gray-100"
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
                    {momentUtils(item.paidAt).format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
              </tr>
            )}
          </tbody>
        </table>
        {orders.totalCounts > 0 ? (
          <div className="mx-auto my-10">
            <Pagination totalCounts={orders.totalCounts || 0} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentHistory;
