import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { iconRight } from '../../../assets/images';
import useQueryParams from '../../../hooks/useQueryParams';
import Pagination from '../../../components/Pagination/Pagination';
import { apiGetAllUser } from '../../../apis/admin/user.api';
import { UserList } from './layouts';

const UserManager = () => {
  const { queryParams } = useQueryParams();
  const [usersData, setUsersData] = useState({
    users: [],
    totalCounts: 0,
  });

  const fetchUsersManager = useCallback(async () => {
    const response = await apiGetAllUser(queryParams);
    if (response.status === 200) {
      setUsersData({ ...response.data });
    }
  }, [queryParams]);

  useEffect(() => {
    fetchUsersManager();
  }, [fetchUsersManager]);

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
          <Link to="/admin/users">Quản lý người dùng</Link>
          <span
            className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
            style={{ backgroundImage: `url(${iconRight})` }}
          ></span>
        </li>
      </ol>
      <h1 className="my-5 text-3xl font-bold">Quản lý người dùng</h1>
      <table className="w-full text-sm text-center text-gray-500 border">
        <thead className="text-xs font-bold text-white uppercase bg-blue-500 border-b ">
          <tr>
            <th className="px-6 py-3">STT</th>
            <th className="px-6 py-3">Ảnh đại diện</th>
            <th className="px-6 py-3">Tên</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Số điện thoại</th>
            <th className="px-6 py-3">Số bài đăng</th>
            <th className="px-6 py-3">Ngày tham gia</th>
            <th className="px-6 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {usersData.users.length > 0 ? (
            <UserList users={usersData.users} />
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
            </tr>
          )}
        </tbody>
      </table>
      {usersData.totalCounts ? (
        <div className="mx-auto my-10">
          <Pagination totalCounts={usersData.totalCounts || 0} />
        </div>
      ) : null}
    </div>
  );
};

export default UserManager;
