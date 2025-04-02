/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';
import { AppContext } from '../../../../contexts/app.context';
import useQueryParams from '../../../../hooks/useQueryParams';
import {
  formatDistrictName,
  formatProvinceName,
} from '../../../../utils/stringUtils';
import {
  DistrictSearch,
  ProvinceSearch,
  StatusSearch,
  WardSearch,
} from '../../../../components/Search';
import path from '../../../../constants/path';

const Search = () => {
  const { addressData } = useContext(AppContext);
  const { queryParams, navigate, pathname } = useQueryParams();
  const [status, setStatus] = useState('');
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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

  const handleSelectedStatus = (e) => {
    if (e.target.value) {
      setStatus(e.target.value);
      navigate({
        pathname: `${path.admin}/${path.realEstates}`,
        search: createSearchParams(
          omitBy(
            {
              ...queryParams,
              status: e.target.value,
            },
            isUndefined
          )
        ).toString(),
      });
    } else {
      setStatus('');
      navigate({
        pathname: `${path.admin}/${path.realEstates}`,
        search: createSearchParams(
          omitBy(
            {
              ...queryParams,
              status: undefined,
            },
            isUndefined
          )
        ).toString(),
      });
    }
  };

  return (
    <div className="w-full h-[300px] bg-slate-600 flex items-center justify-center">
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
        <StatusSearch
          status={status}
          queryParams={queryParams}
          handleSelectedStatus={handleSelectedStatus}
        />
      </div>
    </div>
  );
};

export default Search;
