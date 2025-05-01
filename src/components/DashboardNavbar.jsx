import { useState } from "react";
import { User } from "lucide-react";
import Profile from "../dashboard/student/Profile";

function DashboardNavbar() {
  const [showProfile, setShowProfile] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <div className="flex h-14 justify-between items-center px-6 shadow sticky top-0 left-0 z-30 bg-white">
        <div className=""></div>
        {/* onClick={toggleProfile} */}
        <div 
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

      {/* Profile Modal/Overlay */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start pt-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Profile />
            <button 
              onClick={toggleProfile}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardNavbar;