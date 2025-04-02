import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../contexts/app.context';
import { userDefault } from '../../assets/images';

const ProfileSidebar = () => {
  const { profile, handleLogout } = useContext(AppContext);

  return (
    <div className="flex flex-col w-full h-screen text-sm text-gray-700 border-r">
      <div className="flex items-center gap-4 p-4">
        <div className="w-[50px] h-[50px] relative">
          <img
            src={profile?.avatar || userDefault}
            alt="avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-black">
            {profile?.name}
          </span>
          <span className="text-sm">{profile?.phoneNumber}</span>
        </div>
      </div>
      <hr className="w-[80%] mx-auto" />
      <div>
        <ul className="flex flex-col text-black">
          <li>
            <NavLink
              to="/user/real-estates"
              className={({ isActive }) => {
                return `pl-5 flex items-center gap-2 py-2 transition-all ${
                  isActive
                    ? ' bg-blue-500 text-white font-bold'
                    : 'hover:bg-blue-200'
                }
                  `;
              }}
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
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
              <span>Quản lý tin đăng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/request-contact"
              className={({ isActive }) => {
                return `pl-5 flex items-center gap-2 py-2 transition-all ${
                  isActive
                    ? ' bg-blue-500 text-white font-bold'
                    : 'hover:bg-blue-200'
                }
                  `;
              }}
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span>Yêu cầu liên lạc</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/payment-history"
              className={({ isActive }) => {
                return `pl-5 flex items-center gap-2 py-2 transition-all ${
                  isActive
                    ? ' bg-blue-500 text-white font-bold'
                    : 'hover:bg-blue-200'
                }
                  `;
              }}
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <span>Lịch sử thanh toán</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/chats"
              className={({ isActive }) => {
                return `pl-5 flex items-center gap-2 py-2 transition-all ${
                  isActive
                    ? ' bg-blue-500 text-white font-bold'
                    : 'hover:bg-blue-200'
                }
                  `;
              }}
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
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <span>Cuộc trò chuyện</span>
            </NavLink>
          </li>
          <li>
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 py-2 pl-5 font-bold transition-all cursor-pointer hover:bg-blue-200"
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

              <span>Đăng xuất</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
