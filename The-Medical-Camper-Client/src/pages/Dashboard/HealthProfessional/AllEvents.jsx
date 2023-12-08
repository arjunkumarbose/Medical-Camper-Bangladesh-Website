import { useContext } from "react";
import Title from "../../../components/shared/Title";
import AllEventTable from "./AllEventTable";
import useAxiosSecure from "../../../apis/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AllEvents = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: allEvent = [] } = useQuery({
    queryKey: ["allevents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/allevents");
      return res.data;
    },
  });

  return (
    <div>
      <Title title={"All Events"}></Title>
      <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg">
        <table className="table w-full overflow-x-auto table-zebra mx-auto">
          {/* head */}
          <thead className="bg-slate-900 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Organizer</th>
              <th>Seats Available</th>
              <th>Interested</th>
              <th>Enrolled</th>
              <th>Location</th>
              <th>Audience</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {allEvent?.map((events, i) => (
              <AllEventTable
                events={events}
                i={i}
                key={events?._id}
                refetch={refetch}
              ></AllEventTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvents;
