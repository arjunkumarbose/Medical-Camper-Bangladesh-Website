import { useContext } from "react";
import { FaUserClock } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import useAdmin from "../../Hooks/useAdmin";
import useOrganizer from "../../Hooks/useOrganizer";

const EventCard = ({ events }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isOrganizer] = useOrganizer();

  const isEventClosed = (date) => {
    const currentDate = new Date();
    return new Date(date) < currentDate;
  };

  const handleSelect = (events) => {
    const memberEmail = user?.email;

    const {
      name,
      _id,
      email,
      eventName,
      availableSeats,
      price,
      eventImage,
      status,
      members,
    } = events;

    const eventInfo = {
      name,
      email,
      eventImage,
      eventName,
      availableSeats,
      price,
      status: "Payment pending",
      members,
      eventId: _id,
      memberEmail,
    };

    fetch(`${import.meta.env.VITE_URL}/selectevents`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Event Selected");
        } else {
          toast.error("Already Selected");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
      className="card md:w-96 bg-base-100 shadow-xl relative"
    >
      <figure>
        <img
          className="w-full h-[250px] md:h-[300px] object-cover object-top"
          src={events?.eventImage}
          alt="event"
        />
      </figure>

      <div
        className={`${
          events?.availableSeats < 1 ? "card-body rounded-b-2xl" : "card-body"
        }`}
      >
        <h2 className="card-title inline-block grow">{events?.eventName}</h2>
        <div className="flex justify-center items-center text-center">
          <div className="badge inline-block badge-success text-white">
            ${events?.price}
          </div>
        </div>
        <div>
          <div className="flex justify-center text-center items-center py-4">
            <div className="pr-4">
              <img
                className=" w-12 h-12 object-cover rounded-full"
                src={events?.organizerImg}
                alt=""
              />
            </div>
            <div>
              <p>
                Organizer: <span className="font-bold">{events?.name} </span>
              </p>
            </div>
          </div>

          <div className="flex py-2 items-center gap-2 justify-between">
            <p className="text-lg font-semibold text-slate-600 flex justify-center text-center">
              Date: {events?.date}
            </p>
          </div>

          <div className="flex py-2 items-center gap-2 justify-between">
            <p className="text-lg font-semibold text-slate-600 flex justify-center text-center">
              Venue: {events?.venue}
            </p>
          </div>
          <div className="flex py-2 items-center gap-2 justify-between">
            <p className="text-lg font-semibold text-slate-600 flex justify-center text-center">
              {" "}
              Available Seats: {events?.availableSeats}{" "}
            </p>
            <p className="text-lg font-semibold text-slate-600 flex justify-center text-center">
              Participant Count: {events?.members}
            </p>
          </div>
        </div>
        <div>
          {user ? (
            <>
              {events?.availableSeats < 1 ? (
                <>
                  {" "}
                  <div className="flex justify-between">
                    <button className=" bg-red-400 btn disabled w-fit text-white btn-disabled">
                      All Seats Booked
                    </button>
                    <div>
                      <Link
                        to={`/eventdetails/${events?._id}`}
                        className="btn btn-outline bg-blue-400 text-white w-full ml-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {isEventClosed(events?.date) ? (
                    <div className="flex justify-between">
                      <div className="btn btn-outline bg-red-400 btn-disabled w-1/2 text-white ml-2">
                        Event Ended
                      </div>
                      <div>
                        <Link
                          to={`/eventdetails/${events?._id}`}
                          className="btn btn-outline bg-blue-400 text-white w-full ml-2"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isAdmin || isOrganizer ? (
                        <Link
                          to={`/eventdetails/${events?._id}`}
                          className="btn btn-outline bg-blue-400 text-white w-full ml-2"
                        >
                          View Details
                        </Link>
                      ) : (
                        <div className="flex justify-center">
                          <Link
                            to={`/eventdetails/${events?._id}`}
                            className="btn btn-outline bg-blue-400 text-white w-full ml-2"
                          >
                            View Details
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <Link to={"/login"} className="btn btn-outline w-full">
              Login to Enroll
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
