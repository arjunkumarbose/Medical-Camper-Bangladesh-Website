import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../../Layout/Container";
import Title from "../../components/shared/Title";
import EventCard from "./EventCard";

const Events = ({ slice }) => {
  const [allEvents, setEvents] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/events`)
      .then(function (response) {
        // handle success
        setEvents(response.data);
      })
      .catch(function (error) {
        // handle error
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

  return (
    <div className="mt-24">
      <Container>
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Our Events
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
            current events!
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Here are some glimpses of our upcoming or ongoing events. We are
            coming up with more events in the future. Stay tuned!
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
          {allEvents?.slice(0, slice)?.map((event) => (
            <EventCard
              key={event._id}
              events={event}
              onSortByMembers={sortEventsByMembers}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Events;
