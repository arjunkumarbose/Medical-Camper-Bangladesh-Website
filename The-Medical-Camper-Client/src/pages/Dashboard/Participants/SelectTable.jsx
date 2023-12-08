import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const SelectTable = ({ selected, i, refetch }) => {
  const handleDeleteEvent = (selected) => {
    fetch(`${import.meta.env.VITE_URL}/deleteselectevent/${selected?._id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("event Removed");
        }
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
                src={selected?.eventImage}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{selected?.eventName}</div>
            <div className="text-sm opacity-50">${selected?.price}</div>
          </div>
        </div>
      </td>
      <td className="">{selected?.email}</td>
      <td>{selected?.price}</td>
      <th>
        <Link to={`/dashboard/payment/${selected?._id}`}>
          <button className="btn btn-success btn-xs">{selected?.status}</button>
        </Link>
      </th>
      <th>
        <button
          onClick={() => handleDeleteEvent(selected)}
          className="btn btn-error btn-xs"
        >
          Remove
        </button>
      </th>
    </tr>
  );
};

export default SelectTable;
