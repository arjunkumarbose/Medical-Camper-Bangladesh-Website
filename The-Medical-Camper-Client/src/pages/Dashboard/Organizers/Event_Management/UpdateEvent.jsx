import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const Image_Hosting_token = import.meta.env.VITE_IMAGE_upload;

const UpdateEvent = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const myEvent = useLoaderData();

  // Submit function
  const onSubmit = async (data) => {
    if (typeof data.audience === "string") {
      data.audience = data.audience.split(",");
    }

    if (typeof data.professionals === "string") {
      data.professionals = data.professionals.split(",");
    }

    if (typeof data.services === "string") {
      data.services = data.services.split(",");
    }
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
      }
    } catch (error) {
      console.log(error);
    }

    // add to databse
    fetch(`${import.meta.env.VITE_URL}/updateevent/${myEvent?._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("event Updated");
      });
  };
  return (
    <div className="flex w-full">
      <div className="flex flex-col  p-6 rounded-md w-full">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Update Events</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6  w-full"
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
                  readOnly
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
                  readOnly
                  {...register("email")}
                  defaultValue={user?.email}
                  id="email"
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
                  defaultValue={myEvent?.eventName}
                  placeholder={myEvent?.eventName}
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
                  defaultValue={parseInt(myEvent?.availableSeats)}
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
                  defaultValue={myEvent?.venue}
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
                  {...register("date")}
                  defaultValue={myEvent?.date}
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
                  defaultValue={myEvent?.details}
                  placeholder="Details"
                  className="px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="md:flex justify-between gap-5">
              <div className="w-full">
                <label htmlFor="services" className="block mb-2 text-sm">
                  Specialized Services Provided,
                </label>
                <input
                  type="textarea"
                  {...register("services")}
                  defaultValue={
                    Array.isArray(myEvent?.services)
                      ? myEvent?.services.join(",")
                      : myEvent?.services
                  }
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
                  defaultValue={
                    Array.isArray(myEvent?.audience)
                      ? myEvent?.audience.join(",")
                      : myEvent?.audience
                  }
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
                  defaultValue={
                    Array.isArray(myEvent?.professionals)
                      ? myEvent?.professionals.join(",")
                      : myEvent?.professionals
                  }
                  placeholder="Professionals Attending"
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
                  defaultValue={myEvent?.price}
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
                  required
                  {...register("eventImage")}
                  accept="image/*"
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
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
