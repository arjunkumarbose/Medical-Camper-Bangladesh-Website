import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/shared/Loading";
import useHealthProfessional from "../Hooks/useHealthProfessional";

const HealthProfessionalRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isHealthProfessional, healthProfessionalLoading] =
    useHealthProfessional();
  const location = useLocation();

  if (loading || healthProfessionalLoading) {
    return <Loading></Loading>;
  }
  if (user && isHealthProfessional) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};
export default HealthProfessionalRoute;
