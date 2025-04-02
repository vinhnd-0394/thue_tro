/* eslint-disable react/prop-types */

import useQueryParams from "../../hooks/useQueryParams";
import { formatDistrictName } from "../../utils/stringUtils";
import DropdownSample from "../Dropdown/DropdownSample";

const DistrictSearch = ({ handleClickDropdownItem, districts }) => {
  const { queryParams } = useQueryParams();

  const convertData = () => {
    return districts.length > 0
      ? districts.map((item) => {
          return {
            id: item.Id,
            value: formatDistrictName(item.Name),
          };
        })
      : [];
  };
  return (
    <DropdownSample
      data={convertData()}
      title="Quận / Huyện"
      defaultValue="Tất cả"
      value={queryParams.district ? queryParams.district : null}
      handleClick={handleClickDropdownItem}
    />
  );
};

export default DistrictSearch;
