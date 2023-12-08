import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../apis/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useHealthProfessional = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isHealthProfessional, isLoading: healthprofessionalLoading } =
    useQuery({
      queryKey: ["isHealthProfessional", user?.email],
      enabled:
        !loading && !!user?.email && !!localStorage.getItem("access-token"),
      queryFn: async () => {
        if (!user) {
          return false;
        }
        const res = await axiosSecure.get(
          `/users/healthprofessional/${user?.email}`
        );
        return res.data.health_professional;
      },
    });
  return [isHealthProfessional, healthprofessionalLoading];
};

export default useHealthProfessional;
