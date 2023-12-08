import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Title from "../../components/shared/Title";

const MinDashBoard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Title title={`Welcome ${user?.displayName}`}></Title>
      <p className="font-bold text-center text-cyan-400">
        Email: {user?.email}
      </p>
    </div>
  );
};

export default MinDashBoard;
