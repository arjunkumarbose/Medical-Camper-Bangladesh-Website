import { FaCheckCircle, FaRegEdit, FaBan } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageEventTable = ({ events, i, refetch }) => {
  const handleApprove = (events) => {
    fetch(`${import.meta.env.VITE_URL}/approveevent/${events?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
        toast.success(`${events?.eventName} is Approved`);
      });
  };

  const handleDied = (events) => {
    fetch(`${import.meta.env.VITE_URL}/deniedevent/${events?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
        toast.error(`${events?.eventName} is Denied`);
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
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{events?.name}</div>
            <div className="text-sm opacity-50">{events?.email}</div>
          </div>
        </div>
      </td>
      <td className="">{events?.availableSeats}</td>
      <th>
        <button className="btn btn-ghost btn-xs">{events?.status}</button>
      </th>
      <th>
        <div className="space-x-2 flex">
          <button
            className={`${
              events?.status === "approved" || events?.status === "denied"
                ? "rounded-full btn-disabled"
                : "text-success"
            }`}
            onClick={() => handleApprove(events)}
            title="Approve"
          >
            <FaCheckCircle className="text-2xl"></FaCheckCircle>
          </button>

          <button
            className={`${
              events?.status === "denied" || events?.status === "approved"
                ? "rounded-full btn-disabled"
                : "text-error"
            }`}
            onClick={() => handleDied(events)}
            title="Deny"
          >
            <FaBan className="text-2xl"></FaBan>
          </button>
        </div>
      </th>
      <th>
        <Link to={`/eventdetails/${events?._id}`}>
          <button className="btn btn-warning btn-xs">View</button>
        </Link>
      </th>
    </tr>
  );
};

export default ManageEventTable;
