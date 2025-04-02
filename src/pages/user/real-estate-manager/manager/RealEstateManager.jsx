import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RealEstateList, Search } from './layouts';
import { iconRight } from '../../../../assets/images';
import useQueryParams from '../../../../hooks/useQueryParams';
import Pagination from '../../../../components/Pagination/Pagination';
import { apiGetRealEstatesManager } from '../../../../apis/user/manager/realEstate.api';

const RealEstateManager = () => {
  const { queryParams } = useQueryParams();
  const [realEstateData, setRealEstateData] = useState({
    realEstates: [],
    totalCounts: 0,
  });

  const fetchRealEstatesManager = useCallback(async () => {
    const response = await apiGetRealEstatesManager(queryParams);
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
          <NavLink to="/user"> Trang quản lý</NavLink>
          <span
            className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
            style={{ backgroundImage: `url(${iconRight})` }}
          ></span>
        </li>
        <li className="inline-block">
          <Link to="/user/real-estates">Quản lý tin đăng</Link>
          <span
            className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
            style={{ backgroundImage: `url(${iconRight})` }}
          ></span>
        </li>
      </ol>
      <h1 className="text-3xl font-bold">Quản lý tin đăng</h1>
      <Search />
      {realEstateData.realEstates.length > 0 ? (
        <>
          <RealEstateList realEstates={realEstateData.realEstates} />
          <div className="mx-auto my-10">
            <Pagination totalCounts={realEstateData.totalCounts || 0} />
          </div>
        </>
      ) : (
        <p className="mx-auto my-5 font-bold text-center">
          Không có bài đăng nào
        </p>
      )}
    </div>
  );
};

export default RealEstateManager;
