/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { userDefault } from '../../../../assets/images';
import { AppContext } from '../../../../contexts/app.context';

const OwnerInfo = ({ owner, setOpen }) => {
  const { usersOnline, isAuthenticated, profile } = useContext(AppContext);
  const [isShowPhone, setIsShowPhone] = useState(false);
  const ownerInfoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= 1000) {
        ownerInfoRef.current.classList.remove('sticky', 'top-[100px]');
      } else {
        ownerInfoRef.current.classList.add('sticky', 'top-[100px]');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickPhoneNumber = () => {
    if (!isShowPhone) {
      setIsShowPhone(true);
      return;
    }
    navigator.clipboard.writeText(owner.phoneNumber);
    toast('Đã copy số điện thoại', {
      position: 'top-center',
      autoClose: 2500,
      closeOnClick: true,
      draggable: true,
      pauseOnHover: false,
      theme: 'light',
      type: 'success',
    });
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setOpen('chat');
    } else {
      toast.error('Vui lòng đăng nhập');
    }
  };

  return (
    <div
      className="w-full bg-white border rounded-sm top-[100px] sticky"
      ref={ownerInfoRef}
    >
      <div className="p-4 shadow-xl">
        <div className="flex gap-4 pb-2 border-b">
          <div className="border-4 border-orange-500 rounded-full">
            <img
              src={owner.avatar || userDefault}
              alt={owner.name}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <div className="text-[12px]">
            <h4 className="font-bold overflow-hidden max-w-[230px] text-nowrap overflow-ellipsis text-base">
              {owner.name}
            </h4>
            <p className="text-blue-500">Xem trang cá nhân</p>
            <div>
              {usersOnline?.some((userId) => userId == owner.id) ? (
                <span>
                  <i className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></i>
                  <span className="text-[#bdb9b9] text-sm">Đang hoạt động</span>
                </span>
              ) : (
                <span className="text-xs">Offline</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            className="flex items-center justify-center w-full gap-3 p-2 my-2 font-bold text-white bg-green-700 rounded-md shadow-md"
            onClick={handleClickPhoneNumber}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            {isShowPhone ? (
              <span>{owner.phoneNumber}</span>
            ) : (
              <>
                <span>{owner.phoneNumber.replace(/\d(?=\d{3})/g, '*')}</span>
                <span>Bấm để hiển số</span>
              </>
            )}
          </button>
        </div>
        {profile?.role !== 1 && (
          <>
            <div>
              <button
                className="flex items-center justify-center w-full gap-3 p-2 my-2 font-bold text-blue-500 border border-blue-500 rounded-md shadow-md"
                onClick={handleOpenModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span>Nhắn tin với người này</span>
              </button>
            </div>
            <div>
              <button
                className="flex items-center justify-center w-full gap-3 p-2 font-bold text-orange-500 border border-orange-400 rounded-md shadow-md"
                onClick={() => setOpen('confirm')}
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span>Yêu cầu liên lạc lại</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerInfo;
