import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../contexts/app.context';
import { userDefault } from '../../assets/images';

const AdminSidebar = () => {
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
        </div>
      </div>
      <hr className="w-[80%] mx-auto" />
      <div>
        <ul className="flex flex-col text-black">
          <li>
            <NavLink
              to="/admin/real-estates"
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
              to="/admin/users"
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
              <span>Quản lý người dùng</span>
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

export default AdminSidebar;
