/* eslint-disable react/prop-types */

import useQueryParams from "../../hooks/useQueryParams";
import { formatProvinceName } from "../../utils/stringUtils";
import DropdownSample from "../Dropdown/DropdownSample";


const ProvinceSearch = ({ handleClickDropdownItem, provinces }) => {
  const { queryParams } = useQueryParams();

  const convertData = () => {
    return provinces.map((item) => {
      return {
        id: item.Id,
        value: formatProvinceName(item.Name),
      };
    });
  };

  return (
    <DropdownSample
      data={convertData()}
      title="Tỉnh / Thành phố"
      defaultValue="Tất cả"
      value={queryParams.province ? queryParams.province : null}
      handleClick={handleClickDropdownItem}
    />
  );
};

export default ProvinceSearch;
