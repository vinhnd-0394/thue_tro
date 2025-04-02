import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app.context';
import useClickOutSide from '../../hooks/useClickOutSide';
import { userDefault } from '../../assets/images';
const MainHeader = () => {
  const { profile, isAuthenticated, handleLogout, unreadCounts } =
    useContext(AppContext);

  const { show, setShow, nodeRef } = useClickOutSide();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="sticky top-0 left-0 z-[3] flex items-center justify-between w-full p-4 bg-blue-500 text-white font-bold">
      <Link to="/" className="font-bold text-white border-none">
        Phongtromoi
      </Link>
      <div className="flex items-center gap-5">
        {isAuthenticated ? (
          <>
            <Link
              to="/user/chats"
              className="relative flex items-center justify-between gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              {unreadCounts ? (
                <span className="absolute -top-3 -right-3 w-[20px] h-[20px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCounts}
                </span>
              ) : null}
            </Link>
            <div
              className="relative cursor-pointer"
              ref={nodeRef}
              onClick={handleClick}
            >
              <div className="relative flex items-center justify-center h-10 gap-2">
                <div className="relative w-[50px] h-[50px] bg-gray-200 rounded-full">
                  <div className="w-full pt-[100%]">
                    <img
                      className="absolute top-0 left-0 object-contain w-full h-full rounded-full"
                      src={profile?.avatar || userDefault}
                    />
                  </div>
                </div>
                <div>{profile?.name}</div>
              </div>
              {show && (
                <div className="absolute bg-white text-black border border-gray-200 rounded-lg min-w-[200px] z-[10] top-[40px] right-[-50px]">
                  <Link
                    to="/user/real-estates"
                    className="inline-block w-full p-2 text-sm rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Quản lý tin đăng
                  </Link>
                  <Link
                    to="/user/chats"
                    className="inline-block w-full p-2 text-sm rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Cuộc trò chuyện
                  </Link>
                  <Link
                    to="/user/payment-history"
                    className="inline-block w-full p-2 text-sm rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Lịch sử thanh toán
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="w-full p-2 text-sm rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="flex items-center justify-between gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Đăng ký
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-between gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
              Đăng nhập
            </Link>
          </>
        )}
        <Link
          to="/user/real-estates/create"
          className="flex items-center justify-between gap-1 p-2 text-white bg-red-600 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Đăng tin
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
