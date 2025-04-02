/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { generateNameId } from '../../utils/stringUtils';

function RealEstateSearchPopup(props) {
  const { realEstate } = props;

  return (
    <Link
      to={`${generateNameId({
        name: realEstate.title,
        realEstateId: realEstate.id,
      })}`}
      target="_blank"
    >
      <div className="flex gap-2 p-1 duration-500 border rounded-sm hover:shadow-xl w-[300px]">
        <div className="relative w-[100px] h-[100px] bg-gray-200 min-w-[100px]">
          <div className="w-full pt-[100%]">
            <img
              src={realEstate.thumb}
              alt={realEstate.title}
              className="absolute top-0 object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 py-2 overflow-hidden text-xs">
          <div className="flex flex-col justify-between gap-2">
            <h3 className="two-lines">{realEstate.title}</h3>
            <div className="flex flex-1 gap-2 text-nowrap">
              <span className="font-bold text-red-500">
                {realEstate.rentPrice} Triệu/ Tháng
              </span>
            </div>
            <p className="inline-flex items-center text-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
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
              <span className="ml-1">{`${realEstate.wards} - ${realEstate.district}`}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(RealEstateSearchPopup);
