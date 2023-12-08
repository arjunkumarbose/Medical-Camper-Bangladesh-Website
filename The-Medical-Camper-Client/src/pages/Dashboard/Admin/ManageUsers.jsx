import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/shared/Title";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../apis/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageUsers = () => {
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

  // make admin api call
  const makeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_URL}/user/admin/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is Admin Now`);
          refetch();
        }
      });
  };

  // make organizer api call
  const makeOrganizer = (user) => {
    fetch(`${import.meta.env.VITE_URL}/user/organizer/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is Organizer Now`);
          refetch();
        }
      });
  };

  // make participant api call
  const makeParticipant = (user) => {
    fetch(`${import.meta.env.VITE_URL}/user/participant/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is Participant Now`);
          refetch();
        }
      });
  };

  // make health_professional api call
  const makeHealthProfessional = (user) => {
    fetch(`${import.meta.env.VITE_URL}/user/healthprofessional/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is health professional Now`);
          refetch();
        }
      });
  };

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

  return (
    <div>
      {/* title */}
      <Title title={"Manage Users"}></Title>
      {/* main table */}
      <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 shadow-lg md:p-5">
        <table className="table table-zebra overflow-x-auto text-center">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user._id}>
                <th>{1 + i}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role ? user?.role : "participant"}</td>
                <td>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => makeAdmin(user)}
                      className={`${
                        user?.role === "admin"
                          ? "btn btn-xs btn-disabled"
                          : "btn btn-accent btn-xs"
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => makeOrganizer(user)}
                      className={`${
                        user?.role === "organizer"
                          ? "btn btn-xs btn-disabled "
                          : "btn btn-accent btn-xs  "
                      }`}
                    >
                      Organizer
                    </button>
                    <button
                      onClick={() => makeParticipant(user)}
                      className={`${
                        user?.role === "participant"
                          ? "btn btn-xs btn-disabled "
                          : "btn btn-accent btn-xs  "
                      }`}
                    >
                      Participant
                    </button>
                    <button
                      onClick={() => makeHealthProfessional(user)}
                      className={`${
                        user?.role === "healthprofessional"
                          ? "btn btn-xs btn-disabled "
                          : "btn btn-accent btn-xs  "
                      }`}
                    >
                      Health Professional
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user?._id)}
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

export default ManageUsers;
