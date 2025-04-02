import { useCallback, useState } from 'react';
import DropdownSample from '../Dropdown/DropdownSample';
import useQueryParams from '../../hooks/useQueryParams';
import { createSearchParams } from 'react-router-dom';
import { isUndefined, omitBy } from 'lodash';
import { rentPriceSearch } from '../../constants/sampleConstant';

const RentPriceSearch = () => {
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

  const handleSelectedRentPrice = (e) => {
    const rentPriceSelected = e.target.getAttribute('data-value') || undefined;
    const rentPrice = rentPriceSearch.find(
      (price) => price.value == rentPriceSelected
    );
    setValue(rentPriceSelected);
    updateSearchParams({
      price: rentPrice ? rentPrice.keySearch : undefined,
    });
  };

  return (
    <DropdownSample
      data={rentPriceSearch}
      title="Giá thuê"
      defaultValue="Tất cả"
      value={value}
      handleClick={handleSelectedRentPrice}
    />
  );
};

export default RentPriceSearch;
