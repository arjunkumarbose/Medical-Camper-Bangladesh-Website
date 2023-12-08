import Container from "../../../Layout/Container";
import bgImg from "../../../assets/sliderImg/img4.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className=" hero min-h-screen text-left bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="hero-overlay bg-black bg-opacity-30"></div>
        <div className="w-full">
          <Container>
            <div className="md:w-1/2 text-center mx-auto">
              <h1 className="mb-5 text-5xl md:text-5xl font-semibold text-slate-50">
                About{" "}
                <span className="text-error">Medical Camper Bangladesh</span>{" "}
              </h1>
              <hr className="w-10 text-center border-2 border-error" />
              <p className="mb-5 font-bold text-slate-200 text-lg pt-3">
                Medical Camper Bangladesh is a non-profit organization that
                provides free medical services to the underprivileged people of
                Bangladesh. We are a group of medical members and doctors who
                have come together to provide free medical services to the
                underprivileged people of Bangladesh.
              </p>
              <div className="mb-3">
                <h3 className=" text-3xl md:text-4xl font-semibold text-slate-50">
                  Arjun Kumar Bose
                </h3>
                <span className="text-error">CEO</span>
              </div>
            </div>
          </Container>
        </div>
      </motion.div>
    </>
  );
};

export default About;
