import { useContext, useState } from "react";
import Title from "../../../components/shared/Title";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const EnrolledEvents = () => {
  const { user } = useContext(AuthContext);
  const [paidEvents, setPaidEvents] = useState([]);

  const { refetch, data: selectedEvent = [] } = useQuery({
    queryKey: ["paidevents", user?.email],
    queryFn: async () => {
      axios
        .get(`${import.meta.env.VITE_URL}/paidevents/${user?.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then(function (response) {
          setPaidEvents(response.data);
        })
        .catch(function (error) {
          toast.error(error);
        });
    },
  });

  // Add state variables for modal visibility and data
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    eventId: "",
    eventName: "",
    feedbackText: "",
    username: "",
    picture: "",
    rating: 1, // Initialize rating to 1 by default
  });

  // Modify handleGiveFeedback function
  const handleGiveFeedback = (paidevent) => {
    // Populate modalData with event and user details
    setModalData({
      eventId: paidevent._id,
      eventName: paidevent.eventName,
      username: user.username,
      picture: user.picture,
      feedbackText: "",
    });
    setShowModal(true); // Open the modal
  };

  const handleDeleteEvent = (paidevent) => {
    fetch(`${import.meta.env.VITE_URL}/deleteenrolledevent/${paidevent?._id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("event removed");
        }
      });
  };

  return (
    <div>
      <Title title={"MY Events"}></Title>

      {paidEvents.length < 1 ? (
        <>
          <div className="text-center text-3xl font-bold">
            {" "}
            <h3>You don't have Enrolled any events yet!</h3>
            <Link to={"/events"} className="btn btn-error my-4">
              Enroll
            </Link>
          </div>
        </>
      ) : (
        <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-0 ">
          <table className="table w-full overflow-x-auto table-zebra">
            {/* head */}
            <thead className="bg-[#0f172a] text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paidEvents?.map((paidevent, i) => (
                <tr key={paidevent?._id}>
                  <th>{1 + i}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={paidevent?.eventImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{paidevent?.eventName}</div>
                        <div className="text-sm opacity-50">
                          ${paidevent?.eventPrice}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">{paidevent?.email}</td>
                  <td>{paidevent?.eventPrice}</td>
                  <th>
                    <p className="btn btn-success btn-xs">
                      {paidevent?.status}
                    </p>
                  </th>
                  <th>
                    <button
                      onClick={() => handleGiveFeedback(paidevent)}
                      className="btn btn-warning btn-xs"
                    >
                      Give Feedback
                    </button>
                    {/* Render Modal conditionally */}
                    {showModal && (
                      <Modal
                        isOpen={showModal}
                        onRequestClose={() => setShowModal(false)}
                        style={{
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1000,
                          },
                          content: {
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            maxWidth: "80%",
                            maxHeight: "80%",
                            overflow: "auto",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "20px",
                            zIndex: 1100,
                          },
                        }}
                      >
                        <h2 className="text-center font-bold">
                          Give Feedback for: {modalData.eventName}
                        </h2>

                        <div className="w-full px-10 pb-4">
                          <label htmlFor="rating">Rating</label>
                          <select
                            value={modalData.rating}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                rating: e.target.value,
                              })
                            }
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                        <div className="pb-4">
                          <label htmlFor="feedbackText">Feedback</label>
                          <input
                            type="text"
                            className="w-full border-2 pb-20 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="Your feedback"
                            value={modalData.feedbackText}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                feedbackText: e.target.value,
                              })
                            }
                          />
                        </div>

                        <button
                          className="btn btn-success w-full btn-xs"
                          onClick={() => {
                            if (!modalData.feedbackText.trim()) {
                              toast.error("Please write something");
                            } else {
                              axios
                                .post(
                                  `${import.meta.env.VITE_URL}/storefeedback`,
                                  {
                                    eventId: modalData.eventId,
                                    eventName: modalData.eventName,
                                    feedbackText: modalData.feedbackText,
                                    username: user?.displayName,
                                    picture: user?.photoURL,
                                    email: user?.email,
                                    rating: modalData.rating,
                                  }
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  setShowModal(false);
                                  toast.success(
                                    "Feedback submitted successfully"
                                  );
                                })
                                .catch((error) => {
                                  console.error(error);
                                  toast.error("Failed to submit feedback");
                                });
                            }
                          }}
                        >
                          Submit Feedback
                        </button>
                      </Modal>
                    )}
                  </th>
                  <th>
                    <button
                      onClick={() => handleDeleteEvent(paidevent)}
                      className="btn btn-error btn-xs"
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledEvents;
