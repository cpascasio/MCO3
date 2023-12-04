import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CARD_WIDTH = 400;
const CARD_HEIGHT = 400;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const CardCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-slate-100" style={{backgroundColor: "#690000", padding: "100px 90px"}}ref={ref}>
      <div className="relative overflow-hidden p-4">
        {/* CARDS */}
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-4xl font-bold" style={{color: "#f06e71", textShadow: "1px 1px 1px"}}>
            <span className="text-500" style={{color:"#FFF6EA"}}> <FontAwesomeIcon icon={faMapPin} style={{ marginRight: "8px" }} /> Trending </span> Restaurants
          </p>
          <motion.div
            animate={{
              x: offset,
            }}
            className="flex"
          >
            {items.map((item) => {
              return <Card key={item.id} {...item} />;
            })}
          </motion.div>
        </div>

        {/* BUTTONS */}
        <>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </section>
  );
};

const Card = ({ url, category, title, description }) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/80 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase text-yellow-300"> 
        <FontAwesomeIcon icon={faStar} style={{ marginRight: "4px" }} /> {/* stars*/}
        <FontAwesomeIcon icon={faStar} style={{ marginRight: "4px" }} />
        <FontAwesomeIcon icon={faStar} style={{ marginRight: "4px" }} />
        <FontAwesomeIcon icon={faStar} style={{ marginRight: "4px" }} />
        <FontAwesomeIcon icon={faStar} style={{ marginRight: "4px" }} />
          {category}
        </span>
        <p className="my-2 text-3xl font-bold">{title}</p>
        <p className="text-lg text-slate-300">{description}</p>
      </div>
    </div>
  );
};

const items = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701667014/assets/4c7f7f718e4effa62a4eff89632c273c.jpg",
    category: "",
    title: "Kanto Freestyle",
    description:
      "",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701666823/assets/26798746d248b5f37d9dbacaa339fc78.jpg",
    category: "",
    title: "Ola Frango",
    description:
      "This casual eatery serves up a fantastic chicken and rice bowl with a side of crispy chips. ",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701666828/assets/77f2fb5fa41242558d547ec4f6a924f0.jpg",
    category: "",
    title: "El Poco",
    description:
      "Tacos, tacos, tacos! This taqueria knows how to do them right. It's a small, hidden gem that every taco lover should try",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701666839/assets/e8c9efbd536c69cd5ed9fd7f7e5f0b53.jpg",
    category: "",
    title: "24 Chicken",
    description:
      "24 Chicken isn't just a place to eat; it's a destination for chicken lovers.  ",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701667013/assets/f5737f5414bdfa4ff87b0b6e0d6b934a.jpg",
    category: "",
    title: "Al Makkah",
    description:
      "Experience a culinary journey to the heart of the Middle East at our restaurant. Our menu features a mouthwatering selection of dishes that celebrate the rich and diverse flavors of the region.",
  },
];

export default CardCarousel;