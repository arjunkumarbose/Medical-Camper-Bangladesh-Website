import { toast } from "react-hot-toast";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = () => {
    if (!email) {
      toast.error("Enter an email first!");
    } else if (!validateEmail(email)) {
      toast.error("Email is invalid!");
    } else {
      toast.success("Subscribed successfully!", {
        duration: 4000,
      });
      setEmail("");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="bg-[#0f172a]">
      <footer className="flex justify-center px-4 text-gray-800 bg-white ">
        <div className="container px-6 py-6">
          <h1 className="text-lg font-bold text-center lg:text-2xl">
            Join 31,000+ other and never miss <br /> out on new camps, events,
            and more.
          </h1>

          <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
            <input
              id="email"
              type="email"
              className="px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />

            <button
              onClick={handleSubscribe}
              className="w-full px-6 py-2.5 text-sm font-medium  text-white transition-colors duration-300  md:w-auto md:mx-4 focus:outline-none bg-red-400 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Subscribe
            </button>
          </div>

          <hr className="h-px bg-gray-200 border-none my-7" />

          <div className="flex flex-col items-center justify-between md:flex-row">
            <a href="#">
              <img
                className="w-auto h-12"
                src="https://i.ibb.co/MZGj452/Black-and-Red-Simple-Minimalist-Hospital-and-Medical-Care-Logo-transformed-1.png"
                alt=""
              />
            </a>
            <p> &copy; Arjun Kumar Bose 2023</p>

            <div className="flex mt-4 md:m-0">
              <div className="-mx-4">
                <a
                  href="#"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 hover:underline"
                >
                  About
                </a>
                <a
                  href="#"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 hover:underline"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 hover:underline"
                >
                  News
                </a>
                <a
                  href="#"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 hover:underline"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
