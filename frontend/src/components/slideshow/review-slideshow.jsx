import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function ModernCarousel(images) {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(idx);
    console.log(images);
  const trend = idx > prevIdx ? 1 : -1;

//   const imageIndex = Math.abs(idx % images.images.length);

  return (
    <div className="h-[50vw] max-h-[200px] relative overflow-hidden" style={{marginTop: '80px', marginLeft: '10px', marginRight: '10px', borderRadius: '20px'}}>
      <button
        onClick={() => {
          setPrevIdx(idx);
          setIdx((pv) => pv - 1);
        }}
        className="bg-white/10 hover:bg-black/60 h-[30px] transition-colors text-white p-1 absolute z-10 left-0 top-1/2 transform -translate-y-1/2"

      >
        <FiChevronLeft />
      </button>

      <div className="absolute inset-0 z-[5] backdrop-blur-xl">
        <AnimatePresence initial={false} custom={trend}>
          <motion.img
            variants={imgVariants}
            custom={trend}
            initial="initial"
            animate="animate"
            exit="exit"
            key={images[imageIndex].id}
            src={images[imageIndex].src}
            // alt={images[imageIndex].title}
            style={{ y: "-50%", x: "-50%" }}
            className="aspect-square mx-auto bg-black object-cover shadow-2xl absolute left-1/2 top-1/2 "
          />
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setPrevIdx(idx);
          setIdx((pv) => pv + 1);
        }}
        className="bg-white/10 hover:bg-black/60 h-[30px] transition-colors text-white p-1 absolute z-10 right-0 top-0 bottom-0 top-1/2 transform -translate-y-1/2"
      >
        <FiChevronRight />
      </button>

      {/* <AnimatePresence initial={false} custom={trend}>
        <motion.span
          custom={trend}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={images[imageIndex].id}
          className="text-white text-xl md:text-2xl p-2 rounded-lg bg-white/10 backdrop-blur-lg font-semibold shadow-lg absolute z-20 left-10 bottom-4"
        >
          {images[imageIndex].title}
        </motion.span>
      </AnimatePresence> */}

      <AnimatePresence initial={false}>
        <motion.div
          key={images[imageIndex].id + images.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 object-fill z-0"
          style={{
            backgroundImage: `url(${images[imageIndex].src})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

const imgVariants = {
  initial: (trend) => ({
    x: trend === 1 ? "200%" : "-200%",
    opacity: 0,
  }),
  animate: { x: "-50%", opacity: 1 },
  exit: (trend) => ({
    x: trend === 1 ? "-200%" : "200%",
    opacity: 0,
  }),
};

const titleVariants = {
  initial: (trend) => ({
    y: trend === 1 ? 20 : -20,
    opacity: 0,
  }),
  animate: { y: 0, opacity: 1 },
  exit: (trend) => ({
    y: trend === 1 ? -20 : 20,
    opacity: 0,
  }),
};

// const images = [
//   {
//     src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
//     id: 1,
//   },
//   {
//     src: "https://images.unsplash.com/photo-1637141816287-4a55cfeecda2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//     id: 2,
//   },
//   {
//     src: "https://images.unsplash.com/photo-1633774712811-53b489597e78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
//     id: 3,
//   },
// ];


