import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const EventTable = ({ events, i }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (eventId) => {
    setIsDeleting(true);
    axios
      .delete(`${import.meta.env.VITE_URL}/events/${eventId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((response) => {
        toast.success("Event Deleted!");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <tr>
      <th>{1 + i}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={events?.eventImage}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{events?.eventName}</div>
            <div className="text-sm opacity-50">${events?.price}</div>
          </div>
        </div>
      </td>
      <td className="">{events?.availableSeats}</td>
      <td className="">{events?.members}</td>
      <th>
        <button className="btn btn-ghost btn-xs">{events?.status}</button>
      </th>
      <th>
        <Link
          to={`/eventdetails/${events?._id}`}
          className="btn bg-green-400 text-white btn-xs"
        >
          View
        </Link>
      </th>
      <th>
        <Link
          to={`/dashboard/updateevent/${events?._id}`}
          className="btn btn-info text-white btn-xs"
        >
          Update
        </Link>
      </th>
      <th>
        <button
          onClick={() => handleDelete(events?._id)}
          className="btn btn-error text-white btn-xs"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </th>
    </tr>
  );
};

export default EventTable;
