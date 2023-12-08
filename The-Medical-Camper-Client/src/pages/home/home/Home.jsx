import { Gallery } from "../../../components/Gallery";
import { Testimonials } from "../../../components/Testimonials";
import UpcomingEvents from "../../../components/UpcomingEvents";
import Events from "../../Events/Events";
import About from "../About/About";
import Organizers from "../Organizers/Organizers";
import HealthProfessionals from "../healthprofessionals/HealthProfessionals";
import Slider from "../slider/Slider";

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <Events slice={6}></Events>
      <About></About>
      <Organizers slice={6}></Organizers>
      <UpcomingEvents slice={6}></UpcomingEvents>
      <Gallery></Gallery>
      <HealthProfessionals slice={6}></HealthProfessionals>
      <Testimonials></Testimonials>
    </>
  );
};

export default Home;
