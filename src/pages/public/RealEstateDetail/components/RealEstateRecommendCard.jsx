/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { generateNameId } from "../../../../utils/stringUtils";
import { iconMapMarker } from "../../../../assets/images";

const RealEstateRecommendCard = ({ realEstate }) => {
  return (
    <Link
      key={realEstate.id}
      to={`/${generateNameId({
        name: realEstate.title,
        realEstateId: realEstate.id,
      })}`}
    >
      <div className="border rounded-md shadow-md cursor-pointer hover:shadow-xl">
        <div className="p-2 rounded">
          <div className="relative bg-gray-200">
            <div className="w-full pt-[100%]">
              <img
                src={realEstate.thumb}
                alt={realEstate.title}
                className="absolute top-0 left-0 object-cover w-full h-full p-2"
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="overflow-hidden overflow-ellipsis">
            <span className="text-sm text-nowrap whitespace-nowrap">
              {realEstate.title}
            </span>
          </div>
          <p className="font-bold">{realEstate.rentPrice} Triệu/Tháng</p>
          <p className="flex items-center text-xs leading-6 text-gray-500">
            <i
              style={{
                backgroundImage: `url(${iconMapMarker})`,
                backgroundSize: "contain",
              }}
              className="inline-block w-[15px] h-[15px]"
            ></i>
            <span>{realEstate.district + ", " + realEstate.province}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RealEstateRecommendCard;
