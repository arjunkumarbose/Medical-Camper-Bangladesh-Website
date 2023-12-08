export const Gallery = () => {
  return (
    <div className="py-10">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Gallery
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
            <span className="relative">We</span>
          </span>{" "}
          never hasitate to make people smile!
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Here are some wholesome pictures of out previous camps.
        </p>
      </div>

      <div className="relative max-w-screen-xl p-4 px-4 mx-auto bg-white sm:px-6 lg:px-8 py-26 lg:mt-20">
        <div className="relative">
          <div className="flex justify-center flex-col lg:flex-row">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                <div className="relative space-y-4">
                  <div className="flex items-end justify-center space-x-4 lg:justify-start">
                    <img
                      className="w-32 rounded-lg shadow-lg md:w-56"
                      width="200"
                      src="https://ivhq.imgix.net/images/projects/india-kerala/volunteer-abroad-in-india-ivhq-delhi-medical-campaign.jpg?auto=format,compress"
                      alt="1"
                    />
                    <img
                      className="w-40 rounded-lg shadow-lg md:w-64"
                      width="260"
                      src="https://www.volunteerhq.org/images/projects/india-kerala/volunteer-abroad-in-india-ivhq-kerala-medical.jpg"
                      alt="2"
                    />
                  </div>
                  <div className="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                    <img
                      className="w-24 rounded-lg shadow-lg md:w-40"
                      width="170"
                      src="https://www.volunteeringindia.com/blog/wp-content/uploads/2017/07/IMG_0273.jpg"
                      alt="3"
                    />
                    <img
                      className="w-32 rounded-lg shadow-lg md:w-56"
                      width="200"
                      src="https://image.volunteerworld.com/9bfd2999a022f5c86dc5b0954828f66dc16b3c7c/f11.jpeg?auto=format&max-w=722"
                      alt="4"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                <div className="relative space-y-4">
                  <div className="flex items-end justify-center space-x-4 lg:justify-start">
                    <img
                      className="w-32 rounded-lg shadow-lg md:w-56"
                      width="200"
                      src="https://ivhq.imgix.net/images/about/united-nations/un-sustainable-development-goal-project-ivhq-good-health.jpg?w=585&h=360&crop=faces,center&fit=crop&q=85&auto=format,compress"
                      alt="1"
                    />
                    <img
                      className="w-40 rounded-lg shadow-lg md:w-64"
                      width="260"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREccWvKgcyXj3nIAGo79LoTaibat1te53TrOKTZn2KP_GRDUqi3afCwywjH_QWsxBldp8&usqp=CAU"
                      alt="2"
                    />
                  </div>
                  <div className="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                    <img
                      className="w-24 rounded-lg shadow-lg md:w-40"
                      width="170"
                      src="https://archive.businessday.ng/wp-content/uploads/2018/09/healthcare.jpg"
                      alt="3"
                    />
                    <img
                      className="w-32 rounded-lg shadow-lg md:w-56"
                      width="200"
                      src="https://image.volunteerworld.com/15770653aac31e31769cfdbe144389a75063ba9c/IMG9813.jpg?auto=format&max-w=722"
                      alt="4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
