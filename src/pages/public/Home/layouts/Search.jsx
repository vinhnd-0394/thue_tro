/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';
import useQueryParams from '../../../../hooks/useQueryParams';
import {
  formatDistrictName,
  formatProvinceName,
} from '../../../../utils/stringUtils';
import MapSearchModal from '../../../../components/Modal/map-search-modal/MapSearchModal';
import {
  AreaSearch,
  DistrictSearch,
  ProvinceSearch,
  RentPriceSearch,
  WardSearch,
} from '../../../../components/Search';

const Search = ({ addressData }) => {
  const { queryParams, navigate, pathname } = useQueryParams();
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [open, setOpen] = useState(false);

  const updateSearchParams = useCallback(
    (newParams) => {
      navigate({
        pathname,
        search: createSearchParams(
          omitBy({ ...queryParams, ...newParams }, isUndefined)
        ).toString(),
      });
    },
    [navigate, pathname, queryParams]
  );

  useEffect(() => {
    if (addressData && queryParams.province) {
      const selectedProvince = addressData.find(
        (pro) => formatProvinceName(pro.Name) === queryParams.province
      );
      if (selectedProvince) {
        setProvince(selectedProvince);
        setDistricts(selectedProvince.Districts);
      }
    }
  }, [addressData, queryParams.province]);

  useEffect(() => {
    if (province && queryParams.district) {
      const selectedDistrict = province.Districts.find(
        (dist) => formatDistrictName(dist.Name) === queryParams.district
      );
      if (selectedDistrict) {
        setWards(selectedDistrict.Wards);
      } else {
        updateSearchParams({ district: undefined });
      }
    }
  }, [province, queryParams.district, updateSearchParams]);

  const handleSelectedProvince = (e) => {
    const provinceName = e.target.getAttribute('data-value') || undefined;
    const selectedProvince = addressData.find(
      (pro) => formatProvinceName(pro.Name) === provinceName
    );
    if (selectedProvince) {
      setProvince(selectedProvince);
      setDistricts(selectedProvince.Districts);
    } else {
      setDistricts([]);
    }
    setWards([]);
    updateSearchParams({
      province: provinceName,
      district: undefined,
      wards: undefined,
    });
  };

  const handleSelectedDistrict = (e) => {
    const districtName = e.target.getAttribute('data-value') || undefined;
    const selectedDistrict = province.Districts.find(
      (dist) => formatDistrictName(dist.Name) === districtName
    );
    if (selectedDistrict) {
      setWards(selectedDistrict.Wards);
    } else {
      setWards([]);
    }
    updateSearchParams({ district: districtName, wards: undefined });
  };

  const handleSelectedWard = (e) => {
    const wardName = e.target.getAttribute('data-value') || undefined;
    updateSearchParams({ wards: wardName });
  };

  const handleClose = () => {
    setOpen(false);
    navigate(pathname);
  };

  return (
    <div>
      <div className="w-full h-[300px] bg-slate-600 flex justify-center items-center">
        <div>
          <div className="flex gap-2 bg-white rounded-lg">
            <ProvinceSearch
              handleClickDropdownItem={handleSelectedProvince}
              provinces={addressData}
            />
            <DistrictSearch
              handleClickDropdownItem={handleSelectedDistrict}
              districts={districts}
            />
            <WardSearch
              handleClickDropdownItem={handleSelectedWard}
              wards={wards}
            />
            <RentPriceSearch />
            <AreaSearch />
          </div>
          <div
            className="p-2 mt-2 font-bold text-white bg-blue-500 rounded-lg cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <span className="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>Tìm kiếm trên bản đồ</span>
            </span>
          </div>
        </div>
      </div>
      {open && (
        <MapSearchModal
          open={open}
          handleClose={handleClose}
          updateSearchParams={updateSearchParams}
        />
      )}
    </div>
  );
};

export default Search;
