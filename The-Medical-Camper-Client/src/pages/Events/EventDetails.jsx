import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import useOrganizer from "../../Hooks/useOrganizer";
import useHealthProfessional from "../../Hooks/useHealthProfessional";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isOrganizer] = useOrganizer();
  const [isHealthProfessional] = useHealthProfessional();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState(null);

  const isEventClosed = (date) => {
    const currentDate = new Date();
    return new Date(date) < currentDate;
  };

  const [participantInfo, setParticipantInfo] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    gender: "",
    address: "",
    healthInfo: "",
    emergencyContact: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/event/${id}`)
      .then((response) => response.json())
      .then((data) => setEventDetails(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);

  const handleSelect = (events) => {
    const memberEmail = user?.email;

    const {
      name,
      _id,
      email,
      eventName,
      availableSeats,
      price,
      eventImage,
      status,
      members,
    } = events;

    const eventInfo = {
      name,
      email,
      eventImage,
      eventName,
      availableSeats,
      price,
      audience: [],
      services: [],
      professionals: [],
      status: "Payment pending",
      members,
      eventId: _id,
      memberEmail,
    };

    fetch(`${import.meta.env.VITE_URL}/selectevents`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Event Selected");
          setShowModal(true);
        } else {
          toast.error("Already Selected");
        }
      });
  };

  const handleSelectEventAndOpenModal = () => {
    setShowModal(true);
  };

  const handleInterestList = () => {
    console.log(eventDetails, "eventdetails");
    eventDetails.isApproved = "pending";
    axios
      .post(
        `${import.meta.env.VITE_URL}/add-interest/${user.email}`,
        eventDetails
      )
      .then((res) => {
        if (res.data) {
          toast.success("Added to interest list");
        }
      });
  };

  const handleModalSubmit = () => {
    const {
      name,
      email,
      phone,
      gender,
      address,
      healthInfo,
      emergencyContact,
    } = participantInfo;

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      gender.trim() === "" ||
      address.trim() === "" ||
      healthInfo.trim() === "" ||
      emergencyContact.trim() === ""
    ) {
      return toast.error("Please fill in all required fields.");
    }
    fetch(`${import.meta.env.VITE_URL}/storeParticipantInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        handleSelect(eventDetails);
        console.log("Participant information stored:", data);
        toast.success("Participant information stored successfully");
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Error storing participant information");
        console.error("Error storing participant information:", error);
      });
  };

  return (
    <div>
      {eventDetails && (
        <>
          {eventDetails && (
            <>
              <img
                className="object-cover w-full h-64"
                src={eventDetails.eventImage}
                alt={eventDetails.eventName}
              />
              <div className="p-6">
                <div>
                  <span className="text-lg text-center flex justify-center text-blue-600 uppercase ">
                    {eventDetails.eventName}
                  </span>

                  <span className="text-md text-center flex justify-center text-black font-bold py-4 uppercase ">
                    <p>Campaign Date: {eventDetails.date}</p>
                    <p className="px-2">at</p>
                    <p className="text-red-600">{eventDetails.venue}</p>
                    <p className="px-2">on 11:00 AM to 4:00 PM</p>
                  </span>

                  <span className="text-md text-center  flex justify-center text-green-600 font-bold py-4 ">
                    <p className="outline p-4 border rounded-lg">
                      Booking Fee: ${eventDetails.price}
                    </p>
                  </span>

                  <span className="text-md text-center flex justify-around text-black font-bold py-4 uppercase ">
                    <p>Available Seats: {eventDetails.availableSeats}</p>
                    <p>Members Enrolled: {eventDetails.members}</p>
                  </span>

                  <p className="text-center flex justify-center text-red-400 font-bold py-4">
                    Specialized Services Provided:{" "}
                    {eventDetails.services.join(", ")}
                  </p>

                  <p className="text-center flex justify-center text-red-400 font-bold py-4">
                    Health Professionals attending:{" "}
                    {eventDetails.professionals.join(", ")}
                  </p>

                  <div className="text-center">
                    <p className="mt-4 text-md text-black font-bold">
                      Event Details
                    </p>
                    <hr />
                    <p>{eventDetails.details}</p>
                  </div>

                  <div className="text-center py-4">
                    <p className="mt-4 text-md text-black font-bold">
                      Audience
                    </p>
                    <hr />
                    <p>{eventDetails.audience.join(", ")}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="flex justify-center font-bold">Organized By</p>
                  <hr />
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <img
                        className="object-cover h-10 rounded-full"
                        src={eventDetails.organizerImg}
                        alt="Organizer Avatar"
                      />
                      <a
                        href="#"
                        className="mx-2 font-semibold text-gray-700 "
                        tabIndex="0"
                        role="link"
                      >
                        {eventDetails.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {eventDetails.availableSeats < 1 ||
          isEventClosed(eventDetails.date) ? (
            <div className="flex justify-center">
              <button className="text-center btn outline text-red-500 mt-4">
                Registration Closed
              </button>
            </div>
          ) : !isHealthProfessional ? (
            !isAdmin &&
            !isOrganizer && (
              <div className="flex justify-center items-center text-center pb-10">
                <button
                  onClick={handleSelectEventAndOpenModal}
                  className="p-4 mx-10 bg-green-400 w-1/3 text-black font-semibold text-lg rounded-lg shadow-md"
                >
                  Join Now
                </button>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center text-center pb-10">
              <button
                onClick={handleInterestList}
                className="p-4 mx-2 flex justify-center bg-red-400  text-black font-semibold text-lg rounded-lg shadow-md"
              >
                Mark as interested
                <div className="flex justify-center pt-1 pl-2 text-center items-center">
                  <FaHeart className="mx-auto"></FaHeart>
                </div>
              </button>
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md">
                <h1 className="text-center text-2xl font-bold mb-4">
                  Participant Information
                </h1>
                <hr />
                <div className=" text-left text-md font-bold my-2">
                  <p>Event Name: {eventDetails.eventName}</p>
                  <p>
                    Event Price:{" "}
                    <span className="text-red-400">${eventDetails.price}</span>
                  </p>
                </div>
                <hr />

                <label className="block mb-2 text-sm">Name</label>
                <input
                  className=" mb-4 text-black font-bold text-center"
                  type="text"
                  placeholder={user?.displayName}
                  value={participantInfo.name}
                  readOnly
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      name: e.target.value,
                    })
                  }
                />
                <label className="block mb-2 text-sm">Email</label>
                <input
                  className=" mb-4 font-bold  text-black text-center"
                  type="text"
                  placeholder={user?.email}
                  value={participantInfo.email}
                  readOnly
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  className=" mb-4"
                  type="number"
                  placeholder="Phone"
                  required
                  value={participantInfo.phone}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  className=" mb-4"
                  type="date"
                  placeholder="Date of Birth"
                  required
                  value={participantInfo.dob}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      dob: e.target.value,
                    })
                  }
                />

                <select
                  className="mb-4"
                  value={participantInfo.gender}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  className=" mb-4"
                  type="text"
                  placeholder="Address"
                  required
                  value={participantInfo.address}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      address: e.target.value,
                    })
                  }
                />

                <input
                  className=" mb-4"
                  type="text"
                  placeholder="Health Info"
                  required
                  value={participantInfo.healthInfo}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      healthInfo: e.target.value,
                    })
                  }
                />
                <input
                  className=" mb-4"
                  type="number"
                  placeholder="Emergency Contact"
                  required
                  value={participantInfo.emergencyContact}
                  onChange={(e) =>
                    setParticipantInfo({
                      ...participantInfo,
                      emergencyContact: e.target.value,
                    })
                  }
                />

                {/* Buttons for submit and cancel */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleModalSubmit}
                    className="bg-green-400 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="ml-4 bg-red-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetails;
