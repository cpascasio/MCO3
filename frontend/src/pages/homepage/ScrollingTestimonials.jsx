import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ScrollingTestimonials = ({ reviews }) => {
  return (
      <div className="bg-slate-950 py-12" style={{ backgroundColor: "#FFF6EA", padding: "100px 0px" }}>
        <div className="mb-8 px-4">
          <h3 className="text-slate-50 text-4xl font-bold text-center" style={{ color: "#885133", textShadow: "1px 1px 1px" }}>
            <FontAwesomeIcon icon={faStar} style={{ color: "goldenrod" }} /> Latest Reviews{" "}
            <FontAwesomeIcon icon={faStar} style={{ color: "goldenrod" }} />
          </h3>
          <p className="text-center text-slate-400 text-lg font-semibold mt-2 max-w-lg mx-auto" style={{ color: "#9c1a1d" }}>
            Explore some recent reviews of Taft restaurants!
          </p>
        </div>
        <div className="p-4 overflow-x-hidden relative">
          <div className="flex items-center mb-4">
            <TestimonialList list={reviews} duration={50} />
            <TestimonialList list={reviews} duration={50} />
            <TestimonialList list={reviews} duration={50} />
          </div>
          <div className="flex items-center mb-4">
            <TestimonialList list={reviews} duration={50} reverse />
            <TestimonialList list={reviews} duration={50} reverse />
            <TestimonialList list={reviews} duration={50} reverse />
          </div>
        </div>
      </div>
  );
};

const TestimonialList = ({ list, reverse = false, duration = 500 }) => {
  // Check if list is null or undefined, and provide an empty array as a fallback
  const testimonialList = list || [];

  return (
      <motion.div
          initial={{ translateX: reverse ? "-100%" : "0%" }}
          animate={{ translateX: reverse ? "0%" : "-100%" }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 px-2"
      >
        {testimonialList.map((t) => {
          return (
              <div
                  key={t.id}
                  className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
              >
                <img src={t.image} className="w-full h-44 object-cover" />
                <div className="bg-slate-900 text-slate-50 p-4" style={{ backgroundColor: "#9C1A1D" }}>
              <span className="block font-semibold text-2xl mb-1" style={{ padding: "10px 0px 0px 0px" }}>
                {t.name}
              </span>
                  <span className="block mb-3 text-lg font-semibold" style={{ color: "#f49294", padding: "0px 0px 10px 0px" }}>
                {t.title}
              </span>
                  <span className="block text-lg text-slate-300 font-medium" style={{ color: "#FFF6EA" }}>
                {t.info}
              </span>
                </div>
                <span className="text-7xl absolute top-2 right-2 text-slate-700" style={{ color: "#f9c8c8" }}>
              &rdquo;
            </span>
              </div>
          );
        })}
      </motion.div>
  );
};

export default ScrollingTestimonials;
