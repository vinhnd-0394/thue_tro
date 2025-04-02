/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { generateNameId } from '../../../../utils/stringUtils';

const PremiumRealEstateCard = ({ realEstate }) => {
  return (
    <Link
      to={`${generateNameId({
        name: realEstate.title,
        realEstateId: realEstate.id,
      })}`}
      target="_blank"
    >
      <div className="flex gap-2 p-1 duration-200 border rounded-sm hover:shadow-xl">
        <div className="relative w-[180px] h-[150px] bg-gray-200 min-w-[150px]">
          <div className="w-full pt-[100%]">
            <img
              src={realEstate.thumb}
              alt={realEstate.title}
              className="absolute top-0 object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 py-2 overflow-hidden">
          <div className="flex flex-col justify-between">
            <h3 className="text-base font-medium h-[50px] text-wrap overflow-hidden">
              {realEstate.title}
            </h3>
            <div className="flex flex-1 gap-2 mb-2 text-nowrap">
              <span className="font-bold text-red-500">
                {realEstate.rentPrice} Triệu/ Tháng
              </span>
              <span className="inline-flex items-center">
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
                    d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="ml-1">{realEstate.area} m²</span>
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

              <span className="ml-1">{`${realEstate.district} - ${realEstate.province}`}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PremiumRealEstateCard;
