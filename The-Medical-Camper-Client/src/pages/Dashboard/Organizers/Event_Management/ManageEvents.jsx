import { useContext } from "react";
import Title from "../../../../components/shared/Title";
import useAxiosSecure from "../../../../apis/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ManageEventTable from "./ManageEventTable";

const ManageEvents = () => {
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
      <Title title={"Manage All Events"}></Title>

      <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg">
        <table className="table w-full overflow-x-auto table-zebra">
          {/* head */}
          <thead className="bg-slate-900 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Organizer</th>
              <th>Available Seats</th>
              <th>Status</th>
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {allEvent?.map((events, i) => (
              <ManageEventTable
                events={events}
                i={i}
                key={events?._id}
                refetch={refetch}
              ></ManageEventTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
