/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { checkMediaTypeFromUrl } from '../../../../utils/stringUtils';
import { realEstateStatus } from '../../../../constants/sampleConstant';
import momentUtils from '../../../../utils/momentUtils';
import { toast } from 'react-toastify';
import { approveRealEstateById } from '../../../../apis/user/realEstate.api';
const RealEstateCard = ({ realEstate, index, fetchRealEstatesManager }) => {
  const status = useMemo(() => {
    return realEstateStatus.find(
      (item) => item.id === realEstate.statuses[0]?.status
    );
  }, [realEstate]);

  const handleApprove = async (id) => {
    const response = await approveRealEstateById(id);
    if (response.status === 200) {
      toast.success('Bài đăng đã được duyệt thành công');
      fetchRealEstatesManager();
    }
  };

  return (
    <tr
      className="text-black bg-white border-b cursor-pointer hover:bg-gray-100"
      key={realEstate.id}
    >
      <td scope="row" className="w-5 px-6 py-4 font-medium whitespace-nowrap">
        {index}
      </td>
      <td className="px-6 py-4 w-[150px]">
        <div className="relative w-[150px] h-[150px] bg-gray-100">
          <div className="w-full pt-[100%]">
            {checkMediaTypeFromUrl(realEstate.thumb) ? (
              <div className="cursor-pointer">
                <video
                  src={realEstate.thumb}
                  alt={realEstate.title}
                  className="absolute top-0 left-0 object-contain w-full h-full bg-white"
                ></video>
                <div className="absolute z-10 text-red-500 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 hover:scale-125">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <img
                src={realEstate.thumb}
                alt={realEstate.title}
                className="absolute top-0 left-0 object-contain w-full h-full"
              />
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-ellipsis max-w-[150px] text-nowrap overflow-hidden text-left ">
        {realEstate.title}
      </td>
      <td className="px-6 py-4">{realEstate.postType.type}</td>
      <td className="px-6 py-4">{realEstate.postType.price}</td>
      <td className="px-6 py-4">{status?.note}</td>
      <td className="px-6 py-4">
        {momentUtils(realEstate.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </td>
      <td className="px-6 py-4">
        {status?.id === 2 || status?.id === 5
          ? momentUtils(realEstate.approvedAt).format('YYYY-MM-DD HH:mm:ss')
          : '#'}
      </td>
      <td className="px-6 py-4">
        {status?.id === 1 || status?.id === 6 ? (
          <button
            className="bg-blue-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto mr-2"
            onClick={() => handleApprove(realEstate.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
        ) : (
          <span className="w-[40px] h-[40px] inline-block mr-2"></span>
        )}
        <button className="bg-yellow-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </button>
        <button className="bg-red-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default RealEstateCard;
