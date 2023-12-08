import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const UpdateProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    medicalSpecialty: "",
    certifications: "",
    contactInfo: "",
    address: "",
    interest: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/healthprofessionalInfo/${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setProfileInfo(data);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [user?.email]);

  const handleProfileUpdate = () => {
    fetch(`${import.meta.env.VITE_URL}/healthprofessionalInfo/${user?.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updated:", data);
        toast.success("Profile Updated");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="outline rounded-lg shadow-lg p-10 mt-10">
      <h1 className="text-center font-bold text-blue-800">
        Update Info (Health Care Professional)
      </h1>
      <hr />

      <div className="pt-4 ">
        <label className="font-bold">Name</label>
        <input
          className="w-full mb-2"
          type="text"
          readOnly
          placeholder={user?.displayName}
          value={profileInfo.name}
          defaultValue={user?.displayName}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, name: e.target.value })
          }
        />
        <label className="font-bold">Email</label>
        <input
          className="w-full mb-2"
          type="email"
          readOnly
          placeholder={user?.email}
          value={profileInfo.email}
          defaultValue={user?.email}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, email: e.target.value })
          }
        />

        <label className="font-bold">Medical Specialty</label>
        <input
          className="w-full mb-2"
          type="text"
          placeholder="Medical Specialty"
          value={profileInfo.medicalSpecialty}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, medicalSpecialty: e.target.value })
          }
        />

        <label className="font-bold">Certifications</label>
        <input
          className="w-full mb-2"
          type="text"
          placeholder="Certifications"
          value={profileInfo.certifications}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, certifications: e.target.value })
          }
        />

        <label className="font-bold">Contact Information</label>
        <input
          className="w-full mb-2"
          type="text"
          placeholder="Contact Information"
          value={profileInfo.contactInfo}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, contactInfo: e.target.value })
          }
        />

        <label className="font-bold">Address</label>
        <input
          className="w-full mb-2"
          type="text"
          placeholder="Adderess"
          value={profileInfo.address}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, address: e.target.value })
          }
        />

        <label className="font-bold">Interest</label>
        <input
          className="w-full mb-2"
          type="text"
          placeholder="Interest"
          value={profileInfo.interest}
          onChange={(e) =>
            setProfileInfo({ ...profileInfo, interest: e.target.value })
          }
        />
      </div>
      <div className="text-center">
        <button
          className="btn rounded-md shadow-lg bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 mt-4"
          onClick={handleProfileUpdate}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileInfo;
