import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../apis/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOrganizer = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isOrganizer, isLoading: organizerLoading } = useQuery({
    queryKey: ["isOrganizer", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      if (!user) {
        return false;
      }
      const res = await axiosSecure.get(`/users/organizer/${user?.email}`);
      return res.data.organizer;
    },
  });
  return [isOrganizer, organizerLoading];
};

export default useOrganizer;
