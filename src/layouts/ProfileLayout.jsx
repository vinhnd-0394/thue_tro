/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/Header";
import { ProfileSidebar } from "../components/Sidebar";

const ProfileLayout = () => {
  return (
    <div>
      <MainHeader />
      <div>
        <div className="fixed min-w-[310px]">
          <ProfileSidebar />
        </div>
        <div className="ml-[310px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
