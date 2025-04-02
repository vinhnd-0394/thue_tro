/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { apiGetPlaceDetailByPlaceId } from '../../../apis/goong-map/mapApi';
import useQueryParams from '../../../hooks/useQueryParams';
import { getPublishRealEstates } from '../../../apis/user/realEstate.api';
import { Link } from 'react-router-dom';
import { generateNameId } from '../../../utils/stringUtils';
import moment from 'moment';
import Pagination from '../../Pagination/Pagination';
import { MapSearch } from '../../Map';
import { AreaSearch, RentPriceSearch } from '../../Search';

const MapSearchModal = ({ open, handleClose, updateSearchParams }) => {
  const [input, setInput] = useState('');
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [, setPlaceDetail] = useState('');

  const [viewport, setViewport] = useState({
    latitude: 21.0055991285865,
    longitude: 105.84034199116422,
    zoom: 13,
    bearing: 0,
    transitionDuration: 500,
  });

  const { queryParams } = useQueryParams();
  const [realEstates, setRealEstates] = useState([]);

  const fetchPublishRealEstates = useCallback(async () => {
    const response = await getPublishRealEstates(queryParams);
    if (response.status === 200) {
      setRealEstates(response.data);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchPublishRealEstates();
  }, [fetchPublishRealEstates]);

  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Lỗi khi lấy tọa độ:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Trình duyệt của bạn không hỗ trợ API Geolocation.');
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleChange = (e) => {
    setShowPredictions(true);
    setInput(e.target.value);
  };
  const handleSelectPlace = async (place) => {
    setInput(place.description);
    setShowPredictions(false);
    const getPlace = await apiGetPlaceDetailByPlaceId({
      place_id: place.place_id,
    });
    if (getPlace.status === 'OK') {
      setPlaceDetail(getPlace.result);
      setViewport((prev) => {
        return {
          ...prev,
          latitude: getPlace.result.geometry.location.lat,
          longitude: getPlace.result.geometry.location.lng,
          zoom: 16,
        };
      });
      updateSearchParams({
        latitude: getPlace.result.geometry.location.lat,
        longitude: getPlace.result.geometry.location.lng,
      });
    }
  };

  if (typeof document === 'undefined') return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 modal ${
        open ? '' : 'opacity-0 invisible'
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-25 overlay"
        onClick={handleClose}
      ></div>
      <div className="relative z-10 w-full h-full p-10 bg-white rounded-lg modal-content">
        <span
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4 hover:bg-gray-200"
          onClick={handleClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
              fill="#84878B"
            />
          </svg>
        </span>
        <div className="grid grid-cols-3 gap-5">
          <div className="h-full col-span-2 bg-red-100 min-h-[700px] border">
            <MapSearch
              input={input}
              setPredictions={setPredictions}
              viewport={viewport}
              setInput={setInput}
              setViewport={setViewport}
              realEstates={realEstates?.realEstates || []}
              updateSearchParams={updateSearchParams}
            />
          </div>
          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 font-bold transition-all border border-gray-300 rounded-md outline-none focus:border-blue-500"
                  placeholder="Tìm kiếm nhà trọ tại Phòng trọ mới"
                  onChange={handleChange}
                  value={input}
                />
                {showPredictions && predictions.length > 0 && (
                  <ul
                    className={`z-10 top-full left-0 w-full rounded-md bg-white absolute max-h-[400px] border border-gray-400 overflow-y-auto${
                      showPredictions ? '' : 'opacity-0 invisible'
                    }`}
                  >
                    {predictions.map((place) => (
                      <li
                        key={place.place_id}
                        onClick={() => handleSelectPlace(place)}
                        className="p-2 border-t cursor-pointer hover:bg-blue-100"
                      >
                        {place.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2">
                <RentPriceSearch />
                <AreaSearch />
              </div>
              {realEstates.totalCounts > 0 ? (
                <div className="flex flex-col justify-between pt-2">
                  <div className="max-h-[650px] overflow-y-auto border">
                    {realEstates.realEstates.map((realEstate) => {
                      return (
                        <Link
                          key={realEstate.id}
                          to={`${generateNameId({
                            name: realEstate.title,
                            realEstateId: realEstate.id,
                          })}`}
                          target="_blank"
                        >
                          <div className="flex gap-2 p-1 duration-200 border rounded-sm hover:shadow-xl">
                            <div className="relative w-[100px] h-[100px] bg-gray-200 min-w-[150px]">
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
                                    <span className="ml-1">
                                      {realEstate.area} m²
                                    </span>
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
                                <div className="mt-5 text-xs text-right">
                                  <span className="inline-flex items-center text-gray-400">
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
                                      {moment(realEstate.updatedAt)
                                        .startOf('days')
                                        .fromNow()}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-5">
                    <Pagination totalCounts={realEstates.totalCounts || 0} />
                  </div>
                </div>
              ) : (
                <p>Không có phòng trọ nào ở đây</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};
export default MapSearchModal;
