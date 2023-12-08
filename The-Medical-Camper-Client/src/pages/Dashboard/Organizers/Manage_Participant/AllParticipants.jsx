import { useQuery } from "@tanstack/react-query";
import Title from "../../../../components/shared/Title";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../apis/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaBan } from "react-icons/fa";

const AllParticipants = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  // get all users
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["allusers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/allusers");
      return res.data;
    },
  });

  // Filter users to show only participants
  const participants = users.filter((user) => user?.role === "participant");

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_URL}/removeuser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("User Deleted");
          refetch();
        }
      });
  };

  const handleApprove = (id) => {
    fetch(`${import.meta.env.VITE_URL}/approve-participant/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Participant Approved");
        refetch();
      });
  };

  const handleDeny = (id) => {
    fetch(`${import.meta.env.VITE_URL}/deny-participant/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        toast.error("Participant Denied");
        refetch();
      });
  };

  return (
    <div>
      {/* title */}
      <Title title={"All Participants"}></Title>
      {/* main table */}
      <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg md:p-5">
        <table className="table table-zebra overflow-x-auto text-center">
          {/* head */}
          <thead className="bg-slate-900 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Status</th>
              <th>Approve/Deny</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {participants?.map((part, i) => (
              <tr key={part._id}>
                <th>{1 + i}</th>
                <td>{part?.name}</td>
                <td>{part?.email}</td>
                <td>{part?.role ? part?.role : "participant"}</td>
                <td>
                  <div className="flex flex-col gap-2">
                    <td>
                      <Link
                        to={`/dashboard/viewparticipant/${part?.email}`}
                        className="btn btn-primary btn-xs"
                      >
                        View
                      </Link>
                    </td>
                  </div>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">
                    {part?.status === "approved"
                      ? "Approved"
                      : part?.status === "denied"
                      ? "Denied"
                      : "Pending"}
                  </button>
                </td>
                <td>
                  <div className="space-x-2 flex">
                    <button
                      className={`${
                        part.status && "btn-disabled"
                      } text-success rounded-full`}
                      onClick={() => handleApprove(part?._id)}
                      title="Approve"
                    >
                      <FaCheckCircle className="text-2xl"></FaCheckCircle>
                    </button>
                    <button
                      className={`${
                        part.status && "btn-disabled"
                      } text-error rounded-full`}
                      onClick={() => handleDeny(part?._id)}
                      title="Deny"
                    >
                      <FaBan className="text-2xl"></FaBan>
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(part?._id)}
                    className="btn btn-error btn-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParticipants;
