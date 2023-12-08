import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { parse } from "postcss";

const Image_Hosting_token = import.meta.env.VITE_IMAGE_upload;

const AddEvent = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  // Submit class function
  const onSubmit = async (data) => {
    data.availableSeats = parseInt(data.availableSeats);
    data.status = "pending";
    data.date = new Date(data.date).toLocaleDateString();
    data.name = user?.displayName;
    data.email = user?.email;
    data.members = 0;
    data.organizerImg = user?.photoURL;
    data.services = data.services.split(",");
    data.audience = data.audience.split(",");
    data.professionals = data.professionals.split(",");

    // uploading to imgbb
    try {
      const formData = new FormData();
      formData.append("image", data.eventImage[0]);
      formData.append("key", Image_Hosting_token);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        data.eventImage = result.data.display_url;
        reset();
      }
    } catch (error) {
      console.log(error);
    }

    // add to databse
    fetch(`${import.meta.env.VITE_URL}/event`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((eventData) => {
        if (eventData.insertedId) {
          toast.success("event Added");
        }
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col  md:p-6 rounded-md w-full">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Add Events</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 w-full border-2 p-5"
        >
          <div className="space-y-4">
            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="Event Name"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Event Name
                </label>
                <input
                  type="text"
                  {...register("eventName")}
                  placeholder="Event Name"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Available seats
                </label>
                <input
                  type="number"
                  {...register("availableSeats")}
                  required
                  placeholder="Available seats"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="venue" className="block mb-2 text-sm">
                  Venue
                </label>
                <input
                  type="text"
                  {...register("venue")}
                  required
                  placeholder="Venue"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>

              <div className="w-full">
                <label htmlFor="date" className="block mb-2 text-sm">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  {...register("date")}
                  required
                  placeholder="date"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="details" className="block mb-2 text-sm">
                  Details
                </label>
                <input
                  type="textarea"
                  {...register("details")}
                  placeholder="Details"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="services" className="block mb-2 text-sm">
                  Specialized Services Provided
                </label>
                <input
                  type="textarea"
                  {...register("services")}
                  placeholder="Services Provided"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="audience" className="block mb-2 text-sm">
                  Target Audience
                </label>
                <input
                  type="text"
                  {...register("audience")}
                  required
                  placeholder="Target Audience"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>

              <div className="w-full">
                <label htmlFor="professionals" className="block mb-2 text-sm">
                  Name of the Health Care Professionals Attending
                </label>
                <input
                  type="text"
                  {...register("professionals")}
                  required
                  placeholder="John Doe, Jane Doe..."
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Price
                </label>
                <input
                  type="text"
                  {...register("price")}
                  placeholder="Price"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Event Image
                </label>
                <input
                  type="file"
                  name="eventImage"
                  {...register("eventImage")}
                  accept="image/*"
                  required
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-error w-full rounded-md py-3 text-white"
            >
              Add Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
