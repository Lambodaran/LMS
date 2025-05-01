import React, { useState, useEffect } from "react";
import { GetAllQueries, CreateQuery } from "../../service/api";

// Debug log to check imports
console.log("Imported GetAllQueries:", GetAllQueries);
console.log("Imported CreateQuery:", CreateQuery);

function Query() {
  // Mock data for fallback
  const mockTickets = [
    {
      _id: "68073b03f9630252a3e1f087",
      raisedBy: "Saran T",
      title: "Doubt in topic X",
      issue: "I didn't understand the concept",
      status: "confirmed",
      requestMessage: "resateasoj",
      requestedDate: "2025-02-21",
      scheduledDate: "2025-02-20",
      time: "11:25",
      meetingLink: "https://meet.google.com/rdj-fmkb-huk",
      purpose: "fcbgcbvcb",
    },
    {
      _id: "68073b03f9630252a3e1f088",
      raisedBy: "Saran TG",
      title: "Issue with assignment Y",
      issue: "Need clarification on submission process",
      status: "confirmed",
      requestMessage: "-",
      requestedDate: "-",
      scheduledDate: "2025-02-20",
      time: "11:25",
      meetingLink: "https://meet.google.com/rdj-fmkb-huk",
      purpose: "dzf",
    },
    {
      _id: "68073b03f9630252a3e1f089",
      raisedBy: "Saran T",
      title: "Another question",
      issue: "Need help with project",
      status: "confirmed",
      requestMessage: "-",
      requestedDate: "-",
      scheduledDate: "2025-02-21",
      time: "15:25",
      meetingLink: "https://meet.google.com/rdj-fmkb-huk",
      purpose: "dfdgd",
    },
    {
      _id: "68073b03f9630252a3e1f090",
      raisedBy: "Saran TG",
      title: "Request for extension",
      issue: "I need more time",
      status: "pending",
      requestMessage: "drgrd",
      requestedDate: "2025-03-14",
      scheduledDate: "Not Scheduled",
      time: "Not Set",
      meetingLink: "No Link",
      purpose: "-",
    },
    {
      _id: "68073b03f9630252a3e1f091",
      raisedBy: "Test",
      title: "Test request",
      issue: "Testing system",
      status: "pending",
      requestMessage: "Test",
      requestedDate: "2000-10-10",
      scheduledDate: "Not Scheduled",
      time: "Not Set",
      meetingLink: "No Link",
      purpose: "-",
    },
  ];

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestedDate: "",
    requestMessage: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Check for token and redirect to login if missing
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (!loginData?.token) {
      console.warn("No token found. Redirecting to login...");
      setError("Authentication required. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 2000);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await GetAllQueries();
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.warn("API response is not an array, using mock data");
          setRequests(mockTickets); // Use mock data if API response is not an array
        }
      } catch (err) {
        console.error("Error fetching queries:", err.message);
        const errorMessage = err.message || "Unknown error occurred";
        if (errorMessage.includes("403")) {
          setError("You are not authorized to fetch queries. Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/login"; // Redirect to login on 403 error
          }, 2000);
        } else {
          setError(`Failed to fetch queries: ${errorMessage}. Using mock data instead.`);
          setRequests(mockTickets); // Use mock data on fetch failure
        }
      }
    };

    fetchQueries();
  }, []);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ requestedDate: "", requestMessage: "" });
    setFormError(null);
    setFormSuccess(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Basic validation
    if (!formData.requestedDate || !formData.requestMessage) {
      setFormError("Please fill in both the date and reason fields.");
      return;
    }

    // Prepare data for API
    const queryData = {
      course: "Default Course", // Placeholder; adjust based on your app's logic
      title: "Meeting Request", // Placeholder; you might want to add a title field in the form
      issue: formData.requestMessage, // Mapping "Enter Reason" to "issue"
      requestedDate: formData.requestedDate,
      requestMessage: formData.requestMessage,
    };

    // Log the queryData for debugging
    console.log("Sending queryData to CreateQuery:", queryData);

    try {
      // Check if CreateQuery is available
      if (typeof CreateQuery !== "function") {
        throw new Error("CreateQuery function is not available. Please check the API module.");
      }

      const response = await CreateQuery(queryData);
      console.log("Create Query Response:", response);
      setFormSuccess("Request submitted successfully!");

      // Refresh the table data
      const updatedData = await GetAllQueries();
      if (Array.isArray(updatedData)) {
        setRequests(updatedData);
      } else {
        setRequests(mockTickets); // Use mock data if refresh fails
      }

      // Close the modal after a short delay to show the success message
      setTimeout(closeModal, 1500);
    } catch (err) {
      console.error("Error creating query:", err.message);
      const errorMessage = err.message || "Unknown error occurred";
      if (errorMessage.includes("403")) {
        setFormError("You are not authorized to create a query. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (errorMessage.includes("500")) {
        setFormError("Server error occurred while creating the query. Please try again later or contact support.");
      } else {
        setFormError(`Failed to submit request: ${errorMessage}. Please try again.`);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Title and Button Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Requests</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Request a Slot
        </button>
      </div>

      {/* Error Message (if API fails) */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Request a Slot</h2>
            <form onSubmit={handleSubmit}>
              {/* Select Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date:
                </label>
                <input
                  type="date"
                  name="requestedDate"
                  value={formData.requestedDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Enter Reason */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Reason:
                </label>
                <textarea
                  name="requestMessage"
                  value={formData.requestMessage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter your reason here..."
                  required
                />
              </div>

              {/* Form Messages */}
              {formError && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-lg">
                  {formSuccess}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Request ID
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Raised By
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Requested Date
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Requested Message
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Scheduled Date
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Scheduled Time
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Meeting Link
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Admin Message
              </th>
              <th className="px-4 py-2 bg-blue-600 text-white text-left text-sm font-semibold uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-4 text-center text-gray-500 text-sm"
                >
                  No requests available
                </td>
              </tr>
            ) : (
              requests.map((request, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request._id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.raisedBy || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.requestedDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.requestMessage}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.scheduledDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.meetingLink === "No Link" ? (
                      "No Link"
                    ) : (
                      <a
                        href={request.meetingLink}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Meeting
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.adminMessage || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {request.purpose || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Query;