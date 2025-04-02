/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/app.context';
import { AdminHeader, MainHeader } from '../components/Header';

const MainLayout = ({ children }) => {
  const { profile } = useContext(AppContext);
  return (
    <div>
      {profile?.role === 1 ? <AdminHeader /> : <MainHeader />}
      <Outlet />
      {children}
    </div>
  );
};

export default MainLayout;
