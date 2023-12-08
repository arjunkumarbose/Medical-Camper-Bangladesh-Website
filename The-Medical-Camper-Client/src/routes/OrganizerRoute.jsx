import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/shared/Loading";
import useOrganizer from "../Hooks/useOrganizer";

const OrganizerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isOrganizer, organizerLoading] = useOrganizer();
  const location = useLocation();

  if (loading || organizerLoading) {
    return <Loading></Loading>;
  }
  if (user && isOrganizer) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};
export default OrganizerRoute;
