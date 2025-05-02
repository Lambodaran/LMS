import React, { useState, useEffect } from 'react';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Format date for display (reused from AdminNotification)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Mock data for demo (same as AdminNotification)
  useEffect(() => {
    setIsLoading(true);
    const mockNotifications = [
      {
        _id: '6805e88d86355dc131e80512',
        title: 'New Lecture',
        message: 'Join the live session at 6PM',
        type: 'announcement',
        readBy: [],
        createdAt: '2025-04-21T06:41:17.975Z',
        isRead: false,
      },
      {
        _id: '6805eade86355dc131e80527',
        title: 'System Maintenance',
        message: 'The system will be down for maintenance tomorrow from 2AM to 4AM',
        type: 'alert',
        readBy: [],
        createdAt: '2025-04-20T12:30:45.675Z',
        isRead: true,
      },
    ];
    setNotifications(mockNotifications);
    setIsLoading(false);
  }, []);

  // Handle marking notification as read
  const handleMarkAsRead = async (id) => {
    setIsLoading(true);
    setError(null);

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      setNotifications(
        notifications.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to mark notification as read');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
        Notifications
      </h1>

      {isLoading && (
        <div className="text-center text-gray-500 text-sm sm:text-base">Loading...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 sm:mb-8 text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {notifications.length === 0 && !isLoading ? (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center text-gray-500 text-sm sm:text-base">
            No notifications available.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                notification.type === 'alert'
                  ? 'border-red-500'
                  : notification.type === 'reminder'
                  ? 'border-yellow-500'
                  : 'border-green-500'
              }`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="mb-3 sm:mb-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                      {notification.title}
                    </h2>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        notification.type === 'alert'
                          ? 'bg-red-100 text-red-800'
                          : notification.type === 'reminder'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {notification.type}
                    </span>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="p-2 text-gray-500 hover:text-green-600"
                      title="Mark as read"
                      disabled={isLoading}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <p className="text-gray-600 my-3 sm:my-4 text-sm sm:text-base">
                  {notification.message}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 border-t pt-3 mt-3">
                  <div className="mb-2 sm:mb-0">
                    <span
                      className={`inline-flex items-center ${
                        notification.isRead ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {notification.isRead ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Read
                        </>
                      ) : (
                        'Unread'
                      )}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span>Posted on {formatDate(notification.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;