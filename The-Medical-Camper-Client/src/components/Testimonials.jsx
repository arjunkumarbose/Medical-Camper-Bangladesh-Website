import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Testimonials = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data from your API
    axios
      .get(`${import.meta.env.VITE_URL}/storefeedback`)
      .then((response) => {
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="pb-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Testimonials
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
          user reviews!
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Here are some reviews from our users. How they feel about our camps.
        </p>
      </div>
      <div className="flex items-center justify-center px-5 py-5">
        <div className="w-full max-w-xl px-5 pt-5 pb-10 mx-auto  rounded-lg shadow-lg bg-gray-800 text-gray-50">
          {feedbackData.length > 0 && (
            <Carousel
              showStatus={false}
              showThumbs={false}
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              emulateTouch={true}
              stopOnHover={true}
              showIndicators={false}
              swipeable={true}
            >
              {feedbackData.map((feedback, index) => (
                <div key={index}>
                  {/* Your carousel item content */}
                  <div className="bg-gray-800 w-max mx-auto rounded-xl p-8 ">
                    <p className="text-white w-96">
                      <span className="text-lg font-bold text-indigo-500">
                        “
                      </span>
                      {feedback.feedbackText}
                      <span className="text-lg font-bold text-indigo-500">
                        ”
                      </span>
                    </p>

                    <p className="py-2">
                      <span className="text-lg font-bold text-orange-400 ">
                        {renderStars(feedback.rating)}
                      </span>{" "}
                    </p>

                    <p className="text-white py-4">
                      <span className="text-lg font-bold w-full text-cyan-400 ">
                        Event: {feedback.eventName}
                      </span>
                    </p>

                    <div className="flex justify-center text-center">
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="relative block rounded-full h-10 w-10"
                        >
                          <img
                            alt="profil"
                            src={feedback.picture}
                            className="mx-auto object-cover rounded-full h-10 w-10 "
                          />
                        </a>
                        <div className="flex  text-center items-center justify-between ml-2">
                          <span className="text-sm text-center items-center font-semibold text-indigo-500">
                            {feedback.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};
