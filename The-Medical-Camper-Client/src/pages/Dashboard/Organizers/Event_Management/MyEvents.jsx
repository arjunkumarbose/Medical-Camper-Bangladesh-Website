import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Title from "../../../../components/shared/Title";
import EventTable from "./EventTable";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [allEvents, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/events/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then(function (response) {
        // handle success
        setEvents(response.data);
      })
      .catch(function (error) {
        // handle error
        toast.error(error);
      });
  }, [user]);

  return (
    <div>
      <Title title={"My Events"}></Title>

      {allEvents.length < 1 ? (
        <>
          <div className="text-center text-3xl font-bold">
            {" "}
            <h3 className="text-red-400 font-bold">
              You don't have any event yet! :(
            </h3>
            <Link to={"/dashboard/addevent"} className="btn btn-error my-4">
              Add Now
            </Link>
          </div>
        </>
      ) : (
        <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg">
          <table className="table w-full overflow-x-auto table-zebra">
            {/* head */}
            <thead className="bg-slate-900 text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Available Seats</th>
                <th>Enrolled Members</th>
                <th>Status</th>
                <th>Details</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allEvents?.map((events, i) => (
                <EventTable
                  key={events?._id}
                  events={events}
                  i={i}
                ></EventTable>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
