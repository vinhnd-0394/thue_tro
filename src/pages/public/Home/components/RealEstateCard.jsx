/* eslint-disable react/prop-types */
import moment from 'moment';
import { Link } from 'react-router-dom';
import { generateNameId } from '../../../../utils/stringUtils';
import { userDefault } from '../../../../assets/images';
import DOMPurify from 'dompurify';

const RealEstateCard = (props) => {
  const { realEstate } = props;
  return (
    <Link
      to={`${generateNameId({
        name: realEstate.title,
        realEstateId: realEstate.id,
      })}`}
      target="_blank"
    >
      <div className="flex p-4 mb-4 duration-200 border rounded-sm cursor-pointer hover:shadow-xl">
        <div className="relative w-[200px] h-[200px] bg-gray-200">
          <div className="w-full pt-[100%]">
            <img
              src={realEstate.thumb}
              alt={realEstate.title}
              className="absolute top-0 left-0 object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 px-4 text-sm">
          <h3 className="mb-3 text-lg font-medium">{realEstate.title}</h3>
          <p className="inline-flex items-center mb-2">
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
            <span className="ml-1">{`${realEstate.wards} - ${realEstate.district} - ${realEstate.province}`}</span>
          </p>
          <div className="flex gap-6">
            <span className="text-base font-medium text-red-500">
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
              {realEstate.area} m²
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span className="ml-1">
                {moment(realEstate.updatedAt).startOf('days').fromNow()}
              </span>
            </span>
          </div>
          <p
            className="my-2 text-xs"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(realEstate.description),
            }}
          ></p>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src={realEstate.owner.avatar || userDefault}
                alt={realEstate.owner.name}
                className="w-[40px] h-[40px] rounded-full mr-2"
              />
              <span className="text-ellipsis whitespace-nowrap">
                {realEstate.owner.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RealEstateCard;
