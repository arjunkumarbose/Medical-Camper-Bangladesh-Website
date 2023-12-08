import { useEffect, useState } from "react";
import Container from "../../../Layout/Container";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import Title from "../../../components/shared/Title";
import { motion } from "framer-motion";

const Organizers = ({ slice }) => {
  const [organizers, steOrganizers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/organizers`)
      .then(function (response) {
        // handle success
        steOrganizers(response.data);
      })
      .catch(function (error) {
        // handle error
        toast.error(error);
      });
  }, []);

  return (
    <div className="mt-24">
      <Container>
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Our Organizers
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="9a29985a-fc16-419b-ae53-1670f5ca4491"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#9a29985a-fc16-419b-ae53-1670f5ca4491)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">The</span>
            </span>{" "}
            organizers makes it possible!
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Our organizers are the best in the business. They are the ones who
            make it possible for us to host these camps. We are grateful to
            them.
          </p>
        </div>

        <div className="grid gridcol md:grid-cols-2 lg:grid-cols-3 gap-5 mb-32 ">
          {organizers?.slice(0, slice)?.map((organizer) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
              key={organizer._id}
            >
              <div>
                <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                  <img
                    className="absolute object-cover w-full h-full rounded"
                    src={organizer?.photoURL}
                    alt="Person"
                  />
                </div>
                <div className="flex flex-col sm:text-center">
                  <p className="text-lg font-bold">{organizer?.name}</p>
                  <p className="mb-5 text-xs text-gray-800">
                    {organizer?.email}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Organizers;
