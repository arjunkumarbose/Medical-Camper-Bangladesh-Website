import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ParticipantInfo = () => {
  const { user } = useContext(AuthContext);
  const [participantData, setParticipantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipantInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/get-participant/${user?.email}`
        );
        setParticipantData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchParticipantInfo();
      console.log(user?.email);
    }
  }, [user?.email]);

  if (loading) {
    return <p>Loading Participant information...</p>;
  }

  if (error) {
    return <p>Error fetching Participant information: {error}</p>;
  }

  return (
    <div className="mt-10">
      {participantData ? (
        <div>
          <div className="outline rounded-lg shadow-lg p-10">
            <h1 className="text-center font-bold text-blue-800">
              Participant Information
            </h1>
            <hr />

            <div className="py-4">
              <p className="font-bold">Name: {participantData.name}</p>
              <p className="font-bold">Email: {participantData.email}</p>
            </div>

            <p className="font-bold">Phone: {participantData.phone}</p>
            <p className="font-bold">Gender: {participantData.gender}</p>
            <p className="font-bold">Address: {participantData.address}</p>
            <p className="font-bold">
              Health Information: {participantData.healthInfo}
            </p>
            <p className="font-bold">
              Emergency Contact: {participantData.emergencyContact}
            </p>
          </div>
          <div className="flex justify-center pt-10">
            <NavLink to={"/dashboard/updateparticipantinfo"}>
              <button className="btn btn-error outline">
                Update Participant Info
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <p>No Participant information available.</p>
      )}
    </div>
  );
};

export default ParticipantInfo;
