import { useLoaderData } from "react-router-dom";

const ViewParticipant = () => {
  const profileData = useLoaderData();
  console.log("profileData", profileData);

  return (
    <div className="mt-10">
      {profileData ? (
        <div>
          <div>
            <div className="outline rounded-lg shadow-lg p-10">
              <h1 className="text-center font-bold text-blue-800">
                Profile Info
              </h1>
              <hr />

              <div className="py-4">
                <p className="font-bold">Name: {profileData.name}</p>
                <p className="font-bold">Email: {profileData.email}</p>
              </div>

              <p className="font-bold">Phone: {profileData.phone}</p>
              <p className="font-bold">Gender: {profileData.gender}</p>
              <div className="py-2">
                <p className="font-bold">
                  Health Information: {profileData.healthInfo}
                </p>
                <p className="font-bold">
                  Emergency Contact: {profileData.emergencyContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-center item-center">
          <p className="text-red-400 text-2xl font-bold">
            User haven't updated profile yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewParticipant;
