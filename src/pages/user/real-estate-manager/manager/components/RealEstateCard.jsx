/* eslint-disable react/prop-types */
import moment from 'moment';
import { Link } from 'react-router-dom';
import { checkMediaTypeFromUrl } from '../../../../../utils/stringUtils';
import {
  apiCheckPaymentLink,
  apiCreatePaymentLink,
} from '../../../../../apis/user/payment.api';
import { realEstateStatus } from '../../../../../constants/sampleConstant';
import { useMemo } from 'react';

const RealEstateCard = ({ realEstate }) => {
  const handleCheckout = async () => {
    const payload = {
      referenceId: realEstate.id,
      referenceModel: 'RealEstate',
    };
    const checkPaymentLink = await apiCheckPaymentLink(payload);
    if (
      checkPaymentLink.status === 200 &&
      checkPaymentLink.data.status !== 'PAID'
    ) {
      const payload = {
        referenceId: realEstate.id,
        referenceModel: 'RealEstate',
        amount: checkPaymentLink.data.amount,
        description: 'Tạo mới tin đăng',
        cancelUrl: `${window.location.origin}/user/real-estates`,
        returnUrl: `${window.location.origin}/user/real-estates`,
      };

      const createPaymentLinkResponse = await apiCreatePaymentLink(payload);
      if (createPaymentLinkResponse.status === 201) {
        window.location.href = createPaymentLinkResponse.data.checkoutUrl;
      }
    }
  };

  const status = useMemo(() => {
    return realEstateStatus.find(
      (item) => item.id === realEstate.statuses[0]?.status
    );
  }, [realEstate.statuses]);

  return (
    <div className="grid grid-cols-12 mb-4 text-xs text-gray-500 border rounded">
      <div className="flex col-span-7 p-4 mb-4 duration-200">
        <div className="relative w-[170px] h-[170px] bg-gray-200">
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
        <div className="flex-1 px-4">
          <h3 className="mb-3 text-sm font-medium text-gray-700">
            {realEstate.title}
          </h3>
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
            <span className="ml-1">{`${realEstate.district} - ${realEstate.province}`}</span>
          </p>
          <div className="flex gap-4">
            <div>
              <span className="block">Ngày bắt đầu</span>
              <span>
                {realEstate.approvedAt
                  ? moment(realEstate.approvedAt).format('YYYY/MM/DD hh:mm:ss')
                  : '#'}
              </span>
            </div>
            <div>
              <span className="block">Ngày hết hạn</span>
              <span>
                {realEstate.expiredAt
                  ? moment(realEstate.expiredAt).format('YYYY/MM/DD hh:mm:ss')
                  : '#'}
              </span>
            </div>
            <div>
              <span className="block">Số lượt xem</span>
              <span>{realEstate.approvedAt ? realEstate.viewCounts : '#'}</span>
            </div>
          </div>
          <div className="mt-5 text-gray-900">
            <Link
              to={`/user/real-estates/update/${realEstate.id}`}
              className="inline-flex items-center gap-2 p-2 mr-5 font-bold border border-gray-200 rounded"
            >
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              <span>Sửa tin</span>
            </Link>
            {status?.id === 9 && (
              <button
                className="inline-flex items-center gap-2 p-2 font-bold border border-gray-200 rounded"
                onClick={handleCheckout}
              >
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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

                <span>Thanh toán ngay</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-5 p-4">
        <div className="flex items-center justify-center w-full h-full text-lg font-bold border border-gray-200 rounded bg-gray-50">
          {status?.id === 9 && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-orange-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="text-orange-400">{status.note}</span>
            </div>
          )}
          {(status?.id === 1 || status?.id === 6) && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-orange-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="text-orange-400">{status?.note}</span>
            </div>
          )}
          {(status?.id === 2 || status?.id === 5) && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <span className="text-green-400">{status?.note}</span>
            </div>
          )}
          {(status?.id === 3 || status?.id === 4 || status?.id === 7) && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-red-500 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>

              <span className="text-red-500">{status?.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstateCard;
