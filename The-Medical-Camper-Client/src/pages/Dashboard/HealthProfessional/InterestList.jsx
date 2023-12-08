import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Title from "../../../components/shared/Title";

const InterestList = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/get-interest-list/${user?.email}`).then((res) => {
      setWishList(res.data.interests);
      console.log(res.data.interests, "1555");
    });
  }, [axiosPublic, user.email]);

  return (
    <div>
      <Title title={"Interested List"}></Title>
      <table className="table w-full overflow-x-auto table-zebra mx-auto">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Organizer</th>
            <th>Location</th>
            <th>Date</th>
            <th>Available Seats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {wishList.length > 0 &&
            wishList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.event.eventName}</td>
                <td>{item.event.name}</td>
                <td>{item.event.venue}</td>
                <td>{item.event.date}</td>
                <td>{item.event.availableSeats}</td>
                <td>
                  <Link to={`/eventdetails/${item.event?._id}`}>
                    <button className="btn btn-warning btn-xs">View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterestList;
