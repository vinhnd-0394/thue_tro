/* eslint-disable react/prop-types */

import useQueryParams from '../../hooks/useQueryParams';
import { formatWardName } from '../../utils/stringUtils';
import DropdownSample from '../Dropdown/DropdownSample';

const WardSearch = ({ handleClickDropdownItem, wards }) => {
  const { queryParams } = useQueryParams();

  const convertData = () => {
    return wards.length > 0
      ? wards.map((item) => {
          return {
            id: item.Id,
            value: formatWardName(item.Name),
          };
        })
      : [];
  };
  return (
    <DropdownSample
      data={convertData()}
      title="Phường / Xã"
      defaultValue="Tất cả"
      value={queryParams.wards ? queryParams.wards : null}
      handleClick={handleClickDropdownItem}
    />
  );
};

export default WardSearch;
