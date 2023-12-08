import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EventCard from "../pages/Events/EventCard";
import { Link } from "react-router-dom";

const UpcomingEvents = ({ slice }) => {
  const [allEvents, setEvents] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/events`)
      .then(function (response) {
        const sortedEvents = sortEventsFromToday(response.data);
        setEvents(sortedEvents);
      })
      .catch(function (error) {
        toast.error(error);
      });
  }, []);

  const sortEventsByMembers = () => {
    let sortedByMembers = [...allEvents];

    if (sortDirection === "asc") {
      sortedByMembers.sort((a, b) => a.members - b.members);
    } else {
      sortedByMembers.sort((a, b) => b.members - a.members);
    }

    setEvents(sortedByMembers);
    // Toggle sorting direction after sorting
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortEventsByPrice = () => {
    let sortedByPrice = [...allEvents];

    if (sortDirection === "asc") {
      sortedByPrice.sort((a, b) => a.price - b.price);
    } else {
      sortedByPrice.sort((a, b) => b.price - a.price);
    }

    setEvents(sortedByPrice);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Function to sort events from today to later
  const sortEventsFromToday = (events) => {
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Function to format the date in DD, MM, YYYY format
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Function to format the time in 12-hour clock format
  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString("en-US", options);
  };

  // Get the current date and time
  const currentDate = formatDate(new Date());
  const currentTime = formatTime(new Date());

  return (
    <div className="container mx-auto">
      <div className="mt-24">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Our Upcoming Events
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="9a29985a-fc16-419b-ae53-1670f5ca4491"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#9a29985a-fc16-419b-ae53-1670f5ca4491)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">The</span>
            </span>{" "}
            Upcoming Events you don't want to miss!
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Here are the upcoming events those are going to be held soon!
          </p>
          <p className="pt-4 text-2xl font-bold ">
            Current Date:{" "}
            <span className="text-blue-800 ">
              {currentDate} ({currentTime})
            </span>
          </p>
        </div>

        <div className="text-center pb-6">
          <button
            onClick={sortEventsByMembers}
            className="btn btn-outline text-black px-4 mr-4"
          >
            Sort by Participant
          </button>
          <button
            onClick={sortEventsByPrice}
            className="btn btn-outline text-black px-10"
          >
            Sort by Price
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-32">
          {allEvents
            ?.filter((event) => new Date(event.date) >= new Date()) // Filter events from today onwards
            .slice(0, slice)
            .map((event) => (
              <EventCard
                key={event._id}
                events={event}
                onSortByMembers={sortEventsByMembers}
              />
            ))}
        </div>

        <div>
          <div className="grid max-w-screen-lg gap-8 row-gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:mx-auto">
            <img
              className="object-cover w-full h-56 rounded shadow-lg"
              src="https://h1.co/wp-content/uploads/2023/02/June-is-Mens-Health-Month.jpeg"
              alt=""
            />
            <img
              className="object-cover w-full h-56 rounded shadow-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYIFeroMln4rYp_bGhcHXcHaaca0gvJ7vsg&usqp=CAU"
              alt=""
            />
            <img
              className="object-cover w-full h-56 rounded shadow-lg"
              src="https://www.healthwatchwandsworth.co.uk/sites/healthwatchwandsworth.co.uk/files/better%20health%20campaign.jpg"
              alt=""
            />
            <img
              className="object-cover w-full h-56 rounded shadow-lg"
              src=" https://www.unison.org.uk/content/uploads/2016/11/24157_mentalhealth_web.gif"
              alt=""
            />
          </div>
          <div className="flex items-center sm:justify-center">
            <Link to={`/events`} className="btn btn-outline text-black px-10">
              Check Out All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
