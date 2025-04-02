/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';

import { AdminSidebar } from '../components/Sidebar';
import { AdminHeader } from '../components/Header';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <div className="fixed min-w-[310px]">
          <AdminSidebar />
        </div>
        <div className="ml-[310px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
