import { useCallback, useContext, useEffect, useState } from 'react';

import useQueryParams from '../../../hooks/useQueryParams';
import {
  getPremiumRealEstates,
  getPublishRealEstates,
} from '../../../apis/user/realEstate.api';
import Pagination from '../../../components/Pagination/Pagination';
import { PremiumRealEstateList, RealEstateList, Search } from './layouts';
import { AppContext } from '../../../contexts/app.context';

const Home = () => {
  const { queryParams } = useQueryParams();
  const [realEstates, setRealEstates] = useState([]);
  const { addressData } = useContext(AppContext);
  const [premiumData, setPremiumData] = useState({
    premiumRealEstates: [],
    totalCounts: 0,
  });

  const fetchPremiumRealEstates = async () => {
    const response = await getPremiumRealEstates();
    if (response.status === 200) {
      setPremiumData(response.data);
    }
  };

  const fetchPublishRealEstates = useCallback(async () => {
    const response = await getPublishRealEstates(queryParams);
    if (response.status === 200) {
      setRealEstates(response.data);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchPremiumRealEstates();
  }, []);

  useEffect(() => {
    fetchPublishRealEstates();
  }, [fetchPublishRealEstates]);

  const renderRealEstateCards = () => {
    return (
      realEstates?.realEstates.length > 0 && (
        <RealEstateList realEstates={realEstates.realEstates} />
      )
    );
  };

  return (
    <div>
      <Search addressData={addressData} />
      <div className="w-[70%] mx-auto">
        <div className="p-4 mb-4">
          <PremiumRealEstateList
            totalCounts={premiumData.totalCounts}
            premiumRealEstates={premiumData.premiumRealEstates}
          />
        </div>
        <h2 className="px-4 mt-4 text-2xl font-semibold">
          Cho Thuê Phòng Trọ, Nhà Trọ Giá Rẻ, Cập Nhật 2024
        </h2>
        <div className="flex">
          <div className="w-[70%] p-4">
            {realEstates?.realEstates?.length > 0 ? (
              <>
                <div className="flex justify-between mb-4">
                  <p className="text-sm font-bold text-gray-700">{`Có ${
                    realEstates.totalCounts
                  } tin đăng ở ${
                    queryParams.wards ||
                    queryParams.district ||
                    queryParams.province ||
                    'toàn quốc'
                  }`}</p>
                </div>
                {renderRealEstateCards()}
                <div className="flex float-right my-10">
                  <Pagination totalCounts={realEstates.totalCounts || 0} />
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm font-bold text-gray-700">
                  Có 0 tin đăng tìm thấy
                </p>
                <p className="my-10 text-sm text-center">
                  Không có dữ liệu hiển thị
                </p>
              </div>
            )}
          </div>
          {/* <div className="w-[30%] p-3">
            <div className="p-3 border">
              <p className="font-bold">
                Thuê phòng trọ ở{' '}
                {queryParams.district ||
                  queryParams.province ||
                  'trên toàn quốc'}
              </p>
              <SidebarAddress
                queryParams={queryParams}
                addressData={addressData}
              ></SidebarAddress>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
