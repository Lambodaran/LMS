import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell } from 'lucide-react';
import Notification from '../dashboard/student/Notification';

function DashboardNavbar() {
  const userInfo = JSON.parse(localStorage.getItem('loginData'));
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize mock data on mount
  useEffect(() => {
    setIsLoading(true);
    const mockNotifications = [
      { id: '1', text: 'titanic hollywood movie', isRead: false },
      { id: '2', text: 'haihai new notification', isRead: false },
      { id: '3', text: 'level up keep up', isRead: false },
      { id: '4', text: 'memorial remember', isRead: false },
      { id: '5', text: 'hi ma hello', isRead: false },
    ];
    setNotifications(mockNotifications);
    setIsLoading(false);
  }, []);

  // Calculate number of unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const goToProfile = () => {
    navigate('/student/Profile');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative flex h-14 justify-between items-center px-6 shadow sticky top-0 left-0 z-30 bg-white">
      <div></div>
      <div className="flex items-center gap-4">
        <div
          onClick={goToProfile}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
        >
          <div className="size-10 rounded-full bg-gray-200 grid place-content-center">
            <User />
          </div>
          <div className="leading-5">
            <p className="font-medium hidden lg:block">{userInfo.user.username}</p>
            <p className="text-sm text-gray-500 hidden lg:block">{userInfo.user.email}</p>
          </div>
        </div>
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {isDropdownOpen && (
            <Notification
              notifications={notifications}
              setNotifications={setNotifications}
              isLoading={isLoading}
              error={error}
              onClose={toggleDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;