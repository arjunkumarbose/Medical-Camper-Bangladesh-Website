import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { NavLink, useLoaderData } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ViewHealthProfessional = () => {
  const profileData = useLoaderData();
  console.log("profileData", profileData);

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
                <p className="font-bold">Name: {profileData.name}</p>
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
        </div>
      ) : (
        <p>Loading Profile information...</p>
      )}
    </div>
  );
};

export default ViewHealthProfessional;
