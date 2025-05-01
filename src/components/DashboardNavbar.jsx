import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function DashboardNavbar() {
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/student/Profile");
  };

  return (
    <div className="flex h-14 justify-between items-center px-6 shadow sticky top-0 left-0 z-30 bg-white">
      <div></div>
      <div 
        onClick={goToProfile}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
      >
        <div className="size-10 rounded-full bg-gray-200 grid place-content-center">
          <User />
        </div>
        <div className="leading-5">
          <p className="font-medium hidden lg:block">
            {userInfo.user.username}
          </p>
          <p className="text-sm text-gray-500 hidden lg:block">
            {userInfo.user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
