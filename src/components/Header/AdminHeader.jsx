import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app.context';
import useClickOutSide from '../../hooks/useClickOutSide';
import { userDefault } from '../../assets/images';
const AdminHeader = () => {
  const { profile, isAuthenticated, handleLogout } = useContext(AppContext);

  const { show, setShow, nodeRef } = useClickOutSide();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="sticky top-0 left-0 z-[3] flex items-center justify-between w-full p-4 bg-blue-500 text-white font-bold">
      <Link to="/" className="font-bold text-white border-none">
        Phongtromoi
      </Link>
      <div className="flex items-center gap-5 mr-5">
        {isAuthenticated ? (
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
                  to="/admin"
                  className="inline-block w-full p-2 text-sm rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Trang quản lý
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
      </div>
    </div>
  );
};

export default AdminHeader;
