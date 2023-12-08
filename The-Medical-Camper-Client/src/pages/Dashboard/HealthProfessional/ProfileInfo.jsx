import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ProfileInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/healthprofessionalInfo/${user?.email}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Error fetching profile info:", error));
  }, [user?.email]);

  return (
    <div className="mt-10">
      {profileData ? (
        <div>
          <div>
            <div className="outline rounded-lg shadow-lg p-10">
              <h1 className="text-center font-bold text-blue-800">
                Profile Info (Health Care Professional)
              </h1>
              <hr />

              <div className="py-4">
                <p className="font-bold">Name: {user?.displayName}</p>
                <p className="font-bold">Email: {profileData.email}</p>
              </div>

              <p className="font-bold">
                Medical Specialty: {profileData.medicalSpecialty}
              </p>
              <p className="font-bold">
                Certifications: {profileData.certifications}
              </p>
              <div className="py-2">
                <p className="font-bold">
                  Contact Information: {profileData.contactInfo}
                </p>
                <p className="font-bold">Address: {profileData.address}</p>
              </div>

              <p className="font-bold">Interest: {profileData.interest}</p>
            </div>
          </div>
          <div className="flex justify-center pt-10">
            <NavLink to={"/dashboard/updateprofileinfo"}>
              <button className="btn btn-error outline">
                Update Profile Info
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <p>Loading Profile information...</p>
      )}
    </div>
  );
};

export default ProfileInfo;
