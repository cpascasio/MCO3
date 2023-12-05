import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";

const CARD_WIDTH = 400;
const CARD_HEIGHT = 400;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};



  
const CardCarousel = ({stores, length}) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * (length - CARD_BUFFER);

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



  // const [ref, { width }] = useMeasure();
  // const [offset, setOffset] = useState(0);

  // console.log('My Stores:', stores);

  // const CARD_BUFFER =
  //   width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  // const CAN_SHIFT_LEFT = offset < 0;

 
  // const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * ((stores && stores.length) || 0 - CARD_BUFFER);

  // const shiftLeft = () => {
  //   if (!CAN_SHIFT_LEFT) {
  //     return;
  //   }
  //   setOffset((pv) => (pv += CARD_SIZE));
  // };

  // const shiftRight = () => {
  //   if (!CAN_SHIFT_RIGHT) {
  //     return;
  //   }
  //   setOffset((pv) => (pv -= CARD_SIZE));
  // };

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
            {stores?.map((store) => {
              return <Card key={store.id} {...store} />;
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

const Card = ({ image, storeName, description, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ marginRight: "4px" }} />);
    }
    return stars;
  };

  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/80 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase text-yellow-300">
          {renderStars()} 
        </span>
        <p className="my-2 text-3xl font-bold">{storeName}</p>
        <p className="text-lg text-slate-300 text-justify">{description}</p>
      </div>
    </div>
  );
};



export default CardCarousel;

