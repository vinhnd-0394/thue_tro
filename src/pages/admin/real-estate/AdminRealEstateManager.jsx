import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from './layouts/Search';
import { iconRight } from '../../../assets/images';
import useQueryParams from '../../../hooks/useQueryParams';
import Pagination from '../../../components/Pagination/Pagination';
import { apiGetAllRealEstate } from '../../../apis/admin/realEstate.api';
import { RealEstateList } from './layouts';
import { AppContext } from '../../../contexts/app.context';

const AdminRealEstateManager = () => {
  const { queryParams } = useQueryParams();
  const [realEstateData, setRealEstateData] = useState({
    realEstates: [],
    totalCounts: 0,
  });

  const fetchRealEstatesManager = useCallback(async () => {
    const response = await apiGetAllRealEstate(queryParams);
    if (response.status === 200) {
      setRealEstateData(response.data);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchRealEstatesManager();
  }, [fetchRealEstatesManager]);

  return (
    <div className="p-10">
      <ol className="flex text-sm text-blue-500 list-none">
        <li className="inline-block">
          <NavLink to="/admin"> Trang quản lý</NavLink>
          <span
            className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
            style={{ backgroundImage: `url(${iconRight})` }}
          ></span>
        </li>
        <li className="inline-block">
          <Link to="/admin/real-estates">Quản lý tin đăng</Link>
          <span
            className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
            style={{ backgroundImage: `url(${iconRight})` }}
          ></span>
        </li>
      </ol>
      <h1 className="text-3xl font-bold">Quản lý tin đăng</h1>
      <Search />
      <table className="w-full text-sm text-center text-gray-500 border">
        <thead className="text-xs font-bold text-white uppercase bg-blue-500 border-b ">
          <tr>
            <th className="px-6 py-3">STT</th>
            <th className="px-6 py-3">Ảnh / Video</th>
            <th className="px-6 py-3">Chủ bài đăng</th>
            <th className="px-6 py-3">Kiểu bài đăng</th>
            <th className="px-6 py-3">Giá tiền</th>
            <th className="px-6 py-3">Trạng thái</th>
            <th className="px-6 py-3">Ngày tạo</th>
            <th className="px-6 py-3">Ngày xử lý</th>
            <th className="px-6 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {realEstateData.realEstates.length > 0 ? (
            <RealEstateList
              fetchRealEstatesManager={fetchRealEstatesManager}
              realEstates={realEstateData.realEstates}
            />
          ) : (
            <tr>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
              <th className="px-6 py-3">-</th>
            </tr>
          )}
        </tbody>
      </table>
      {realEstateData.totalCounts ? (
        <div className="mx-auto my-10">
          <Pagination totalCounts={realEstateData.totalCounts || 0} />
        </div>
      ) : null}
    </div>
  );
};

export default AdminRealEstateManager;
