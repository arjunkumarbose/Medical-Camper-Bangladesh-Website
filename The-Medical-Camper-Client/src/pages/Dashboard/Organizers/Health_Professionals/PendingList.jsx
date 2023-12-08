import React from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Title from "../../../../components/shared/Title";

const PendingList = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pendings = [], refetch } = useQuery({
    queryKey: "get-pending-events",
    queryFn: async () => {
      const response = await axiosPublic.get("/get-interest-lists");
      return response.data.interests;
    },
  });

  const handleApprove = async (pendingId) => {
    // Implement the logic to approve the event

    // Assuming there's an API endpoint to handle approval
    await axiosPublic.patch(`/update-interest-list/${pendingId}`);

    // Refetch the data after approval
    refetch();
  };

  return (
    <div>
      <Title title={"Pending Interested List"}></Title>
      <table className="table w-full overflow-x-auto table-zebra mx-auto">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Doctor Email</th>
            <th>Doctor Name</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {pendings.map((pending, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pending.event.eventName}</td>
              <td>{pending.event.name}</td>
              <td>{pending.userEmail}</td>
              <td>
                <button
                  className="btn btn-success btn-xs"
                  onClick={() => handleApprove(pending._id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingList;
