/* eslint-disable react/prop-types */
import { createSearchParams, Link } from 'react-router-dom';
import {
  iconRight,
  iconShare,
  iconHeart,
  iconTag,
  iconClock,
  iconExpand,
  iconMapMarker,
  iconMap,
} from '../../../../assets/images';
import momentUtils from '../../../../utils/momentUtils';

const TopHeader = ({ realEstate, handleScrollToMap }) => {
  const { locationDetails, district, province, rentPrice, area, title } =
    realEstate;

  return (
    <div>
      <div className="my-3">
        <ol className="flex text-sm text-blue-500 list-none">
          <li className="inline-block">
            <Link to="/"> Trang chủ</Link>
            <span
              className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
              style={{ backgroundImage: `url(${iconRight})` }}
            ></span>
          </li>
          <li className="inline-block">
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  province: province,
                }).toString(),
              }}
            >
              Thuê trọ {province}
            </Link>
            <span
              className="inline-block w-2 h-2 ml-1 bg-center bg-no-repeat bg-contain opacity-50"
              style={{ backgroundImage: `url(${iconRight})` }}
            ></span>
          </li>
          <li className="inline-block">
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  province: province,
                  district: district,
                }).toString(),
              }}
            >
              Thuê trọ {district}
            </Link>
          </li>
        </ol>
      </div>
      <h1 className="text-3xl font-bold text-[#E13427] leading-10 mx-2 mb-1">
        {title}
      </h1>
      <p className="flex items-center my-3 leading-5 text-md">
        <i
          style={{
            backgroundImage: `url(${iconMapMarker})`,
            backgroundSize: 'contain',
          }}
          className="inline-block w-4 h-4"
        ></i>
        <span className="text-nowrap inline-block max-w-[500px] text-sm">
          {locationDetails}
        </span>
        <span className="ml-6 cursor-pointer" onClick={handleScrollToMap}>
          <i
            style={{
              backgroundImage: `url(${iconMap})`,
              backgroundSize: 'contain',
            }}
            className="inline-block w-4 h-4 mr-1"
          ></i>
          <span className="text-blue-500">Xem bản đồ</span>
        </span>
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-5 ">
          <span className="flex items-center font-bold">
            <i
              style={{
                backgroundImage: `url(${iconTag})`,
                backgroundSize: 'contain',
              }}
              className="inline-block w-5 h-5 mr-1"
            ></i>
            <span className="text-lg text-green-500">
              {rentPrice} triệu/tháng
            </span>
          </span>
          <span className="flex items-center text-md">
            <i
              style={{
                backgroundImage: `url(${iconExpand})`,
                backgroundSize: 'contain',
              }}
              className="inline-block w-4 h-4 mr-1"
            ></i>
            <span>
              {area} m<sup>2</sup>
            </span>
          </span>
          <span className="flex items-center text-md">
            <i
              style={{
                backgroundImage: `url(${iconClock})`,
                backgroundSize: 'contain',
              }}
              className="inline-block w-4 h-4 mr-1"
            ></i>
            <span>{momentUtils(realEstate.approvedAt).fromNow()}</span>
          </span>
        </div>
        <div className="flex gap-5 pt-1">
          <span className="flex items-center cursor-pointer">
            <i
              style={{
                backgroundImage: `url(${iconHeart})`,
                backgroundSize: 'contain',
              }}
              className="inline-block w-4 h-4 mr-1"
            ></i>
            <span className="underline text-md">Lưu tin này</span>
          </span>
          <span className="flex items-center text-md">
            <i
              style={{
                backgroundImage: `url(${iconShare})`,
                backgroundSize: 'contain',
              }}
              className="inline-block w-4 h-4 mr-1"
            ></i>
            <span>Chia sẻ</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
