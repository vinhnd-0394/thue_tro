import { useCallback, useState } from 'react';
import DropdownSample from '../Dropdown/DropdownSample';
import useQueryParams from '../../hooks/useQueryParams';
import { createSearchParams } from 'react-router-dom';
import { isUndefined, omitBy } from 'lodash';
import { areaSearch } from '../../constants/sampleConstant';

const AreaSearch = () => {
  const [value, setValue] = useState('');
  const { queryParams, navigate, pathname } = useQueryParams();

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

  const handleSelectedArea = (e) => {
    const areaSelected = e.target.getAttribute('data-value') || undefined;
    const area = areaSearch.find((area) => area.value == areaSelected);
    setValue(areaSelected);
    updateSearchParams({
      area: area ? area.keySearch : undefined,
    });
  };

  return (
    <DropdownSample
      data={areaSearch}
      title="Diện tích"
      defaultValue="Tất cả"
      value={value}
      handleClick={handleSelectedArea}
    />
  );
};

export default AreaSearch;
