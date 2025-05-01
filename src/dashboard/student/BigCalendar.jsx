// // import PageHeader from "../../components/PageHeader";
// import React, { useState, useEffect } from "react";
// // import "./BigCalendar.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// // function Calender() {

// //   return (
// //     <>
// //       <div>
// //         <PageHeader title="Calender" />
// //       </div>
// //     </>
// //   );
// // }

// // export default Calender;
// const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
// function BigCalendar() {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState(null);
//   useEffect(() => {
//     const storedEvents =
//       JSON.parse(localStorage.getItem("calendarEvents")) || [];
//     const formattedEvents = storedEvents.map((event) => ({
//       ...event,
//       start: new Date(event.start),
//       end: new Date(event.end),
//     }));
//     setEvents(formattedEvents);
//   }, []);

//   const saveEventsToStorage = (events) => {
//     localStorage.setItem("calendarEvents", JSON.stringify(events));
//   };

//   const handleAddEvent = () => {
//     if (!newEvent.title || !newEvent.start || !newEvent.end) {
//       alert("Please fill all fields before adding an event.");
//       return;
//     }

//     const startDate = new Date(newEvent.start);
//     const endDate = new Date(newEvent.end);

//     if (startDate >= endDate) {
//       alert("End date must be after start date.");
//       return;
//     }

//     const newEventObj = {
//       id: Date.now(),
//       title: newEvent.title,
//       start: startDate,
//       end: endDate,
//       color: colors[Math.floor(Math.random() * colors.length)],
//     };

//     const updatedEvents = [...events, newEventObj];
//     setEvents(updatedEvents);
//     saveEventsToStorage(updatedEvents);
//     setShowModal(false);
//     setNewEvent({ title: "", start: "", end: "" });
//   };

//   const handleDeleteEvent = () => {
//     if (!eventToDelete || !eventToDelete.id) return;

//     const updatedEvents = events.filter(
//       (event) => event.id !== eventToDelete.id
//     );
//     setEvents(updatedEvents);
//     saveEventsToStorage(updatedEvents);
//     setShowDeleteConfirmation(false);
//   };

//   const handleShowDeleteConfirmation = (event) => {
//     setEventToDelete(event);
//     setShowDeleteConfirmation(true);
//   };

//   return (
//     <div className="react-Big-calendar p-4 lg:p-8">
//       <div className="main-calendar">
//         <div className="flex justify-between items-center mb-4">
//           <h5 className="text-xl font-semibold">Calendar</h5>
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             Add Event
//           </button>
//         </div>
//         <div className="w-full h-full">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             views={["month", "week", "day"]} // enable these views
//             defaultView="month"
//             startAccessor="start"
//             endAccessor="end"
//             className="bg-white p-4 shadow rounded-md"
//             style={{ height: "77vh" }}
//             onSelectEvent={handleShowDeleteConfirmation}
//           />
//         </div>

//         {/* Add Event Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//               <h2 className="text-lg font-semibold mb-4">Add Event</h2>
//               <div className="flex flex-col gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Event Title
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     value={newEvent.title}
//                     onChange={(e) =>
//                       setNewEvent({ ...newEvent, title: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Start Date and Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     value={newEvent.start}
//                     onChange={(e) =>
//                       setNewEvent({ ...newEvent, start: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     End Date and Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     value={newEvent.end}
//                     onChange={(e) =>
//                       setNewEvent({ ...newEvent, end: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//                   onClick={handleAddEvent}
//                 >
//                   Save Event
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteConfirmation && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//               <h2 className="text-lg font-semibold mb-4">Delete Event</h2>
//               <p>Are you sure you want to delete this event?</p>
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//                   onClick={() => setShowDeleteConfirmation(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BigCalendar;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

function BigCalendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const formattedEvents = storedEvents.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setEvents(formattedEvents);
  }, []);

  const saveEventsToStorage = (events) => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields before adding an event.");
      return;
    }

    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    if (startDate >= endDate) {
      alert("End date must be after start date.");
      return;
    }

    const newEventObj = {
      id: Date.now(),
      title: newEvent.title,
      start: startDate,
      end: endDate,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    const updatedEvents = [...events, newEventObj];
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
    setShowModal(false);
    setNewEvent({ title: "", start: "", end: "" });
  };

  const handleDeleteEvent = () => {
    if (!eventToDelete || !eventToDelete.id) return;

    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
    setShowDeleteConfirmation(false);
  };

  const handleShowDeleteConfirmation = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="react-big-calendar p-4 lg:p-8">
      <div className="main-calendar">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">Calendar</h5>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Event
          </button>
        </div>

        <div className="w-full h-full">
          {/* <Calendar
            localizer={localizer}
            events={events}
            // views={["month", "week", "day"]}
            // defaultView="month"
            startAccessor="start"
            endAccessor="end"
            style={{ height: "77vh" }}
            onSelectEvent={handleShowDeleteConfirmation}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
                borderRadius: "4px",
                color: "white",
                border: "none",
              },
            })}
          /> */}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            // eventPropGetter={eventPropGetter}
            style={{ height: "77vh", width: "100%" }}
            onSelectEvent={handleShowDeleteConfirmation}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
                borderRadius: "4px",
                color: "white",
                border: "none",
              },
            })}
          />
        </div>

        {/* Add Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Add Event</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, start: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={handleAddEvent}
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Delete Event</h2>
              <p>Are you sure you want to delete this event?</p>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BigCalendar;
