import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data initialized once on mount
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

  // Handle marking notification as read and remove it
  const handleMarkAsRead = (id) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setNotifications(notifications.filter((notification) => notification.id !== id));
      setIsLoading(false);
    }, 800);
  };

  // Calculate number of unread notifications (used only for internal logic, not display)
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md p-6 w-96 z-40">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800">Welcome back </h2>
        </div>
        {/* Removed unread count badge from notification page */}
      </div>

      {isLoading && (
        <div className="text-center text-gray-500 text-sm">Loading...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {notifications.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 text-sm">No notifications available.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between bg-white rounded-md p-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    notification.isRead ? 'bg-gray-300' : 'bg-black'
                  }`}
                ></span>
                <span className="text-sm text-gray-800">{notification.text}</span>
              </div>
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="bg-white border border-gray-300 text-gray-800 text-sm font-medium py-1 px-4 rounded-lg hover:bg-gray-100 transition-colors w-32 text-center"
                  disabled={isLoading}
                >
                  Mark As Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
