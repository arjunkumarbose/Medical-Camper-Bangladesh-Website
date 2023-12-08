import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UpdateParticipantInfo = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const axiosPublic = useAxiosPublic();
  const [part, setPart] = useState({});

  useEffect(() => {
    axiosPublic.get(`/get-participant/${user.email}`).then((res) => {
      console.log(res.data);
      setPart(res.data);
      setName(user?.displayName);
      setEmail(res.data.email || user.email);
      setPhone(res.data.phone || "");
      setGender(res.data.gender || "");
      setAddress(res.data.address || "");
      setHealthInfo(res.data.healthInfo || "");
      setEmergencyContact(res.data.emergencyContact || "");
    });
  }, [axiosPublic, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.put(
        `/storeParticipantInfo/${user.email}`,
        {
          name,
          email: user.email,
          phone,
          gender,
          address,
          healthInfo,
          emergencyContact,
        }
      );

      console.log("Participant information updated:", response.data);
      toast.success("Participant information updated");
    } catch (error) {
      console.error("Error updating participant information:", error);
      toast.error("Error updating participant information");
    }
  };

  return (
    <div className="outline rounded-lg shadow-lg p-10 mt-10">
      <h1 className="text-center font-bold text-blue-800">
        Update Participant Information
      </h1>
      <hr />

      <form onSubmit={handleSubmit} className="pt-4">
        <div className="mb-2">
          <label className="font-bold">Name:</label>
          <input
            type="text"
            defaultValue={name || user?.displayName}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="font-bold">Email:</label>
          <input type="email" value={email} disabled className="w-full" />
        </div>
        <div className="mb-2">
          <label className="font-bold">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="font-bold">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mb-4"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="font-bold">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-2">
          <label className="font-bold">Health Information:</label>
          <input
            type="text"
            value={healthInfo}
            onChange={(e) => setHealthInfo(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-2">
          <label className="font-bold">Emergency Contact:</label>
          <input
            type="number"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="btn rounded-md shadow-lg bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateParticipantInfo;
