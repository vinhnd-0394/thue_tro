import React from 'react';
import { realEstateStatus } from '../../constants/sampleConstant';

const StatusSearch = ({ handleSelectedStatus, status, queryParams }) => {
  return (
    <select
      className="w-[300px] p-3 outline-none bg-white border-r rounded border"
      onChange={handleSelectedStatus}
      value={status || queryParams.status}
      name="status"
    >
      <option className="p-3" value="">
        ---Trạng thái---
      </option>
      {realEstateStatus.map((item) => (
        <option className="p-3" value={item.id} key={item.id}>
          {item.note}
        </option>
      ))}
    </select>
  );
};

export default StatusSearch;
