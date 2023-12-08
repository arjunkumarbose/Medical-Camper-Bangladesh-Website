import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllEventTable = ({ events, i, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [interestCount, setInterestCount] = useState(0);

  useEffect(() => {
    axiosPublic.get(`/get-interest-event-list/${events._id}`).then((res) => {
      console.log(res.data.interests.length);
      setInterestCount(res.data.interests.length);
    });
  }, [axiosPublic, events]);

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
          </div>
        </div>
      </td>
      <td className="text-center">{events?.availableSeats}</td>
      <td className="text-center">{interestCount}</td>
      <td className="text-center">{events?.members}</td>
      <td className="text-center">{events?.venue}</td>
      <td className="text-center">{events?.audience}</td>
      <td>
        <div className="flex items-center w-24">
          <div>
            <div className="font-bold">{events?.date}</div>
          </div>
        </div>
      </td>
      <th>
        <Link to={`/eventdetails/${events?._id}`}>
          <button className="btn btn-warning btn-xs">View</button>
        </Link>
      </th>
    </tr>
  );
};

export default AllEventTable;
