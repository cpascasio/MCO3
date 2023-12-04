import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import "./hero.css";
import useFetch from "../../../hooks/useFetch";

const DragShuffleHero = ({reviews}) => {
    const reversedReviews = reviews ? [...reviews].reverse() : [];
    const dragProgress = useMotionValue(0);
    const [order, setOrder] = useState(["front", "middle", "back"]);
    const [dragging, setDragging] = useState(false);
    const { data, loading, error } = useFetch("/api/users");
    useEffect(() => console.log(data), [data]);
    const handleDragEnd = () => {
        const x = dragProgress.get();
        if (x <= -50) {
            const orderCopy = [...order];
            orderCopy.unshift(orderCopy.pop());
            setOrder(orderCopy);
        }
    };



    useEffect(() => {
        const FIVE_SECONDS = 5000;

        // Automatically shuffle the list ever 5 seconds, so long
        // as it isn't being dragged
        const intervalRef = setInterval(() => {
            const x = dragProgress.get();
            if (x === 0) {
                setOrder((pv) => {
                    const orderCopy = [...pv];
                    orderCopy.unshift(orderCopy.pop());
                    return orderCopy;
                });
            }
        }, FIVE_SECONDS);

        return () => clearInterval(intervalRef);
    }, []);

    return (
        <section
            style={{
                pointerEvents: dragging ? "none" : undefined,
                padding: "120px 0px",
                backgroundImage: 'url("/taft3.svg")', // Replace with your image path
                backgroundSize: "cover", // You can adjust this property
                //backgroundAttachment: 'fixed', // Add this line
                backgroundRepeat: "no-repeat", // You can adjust this property
                backgroundColor: "#FFF6EA",
            }}
            className="overflow-hidden bg-slate-900 px-8 py-24 text-slate-50"
        >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
                <div>
                    <h1
                        className="text-5xl font-black leading-[1.25] md:text-7xl"
                        style={{
                            color: "white",
                            textShadow: "1px 1px 1px",
                            marginTop: "150px",
                        }}
                    >
                        Welcome to Taft Buds!
                    </h1>

                    <p
                        className="mb-8 mt-4 text-lg text-slate-400 font-semibold"
                        style={{ color: "white" }}
                    >
                        Discover the perfect{" "}
                        <span style={{ color: "#f49294" }}> Taft </span>{" "}
                        restaurant to statisfy your taste{" "}
                        <span style={{ color: "#f49294" }}> buds </span>!
                    </p>
                </div>

                <motion.div
                    whileTap={{ scale: 0.985 }}
                    className="relative h-[450px] w-[350px]"
                >
                    {/* Check if reviews is not null or undefined before mapping */}
                    {reversedReviews &&
                        reversedReviews.map((review, index) => (
                            <Card
                                key={index}
                                imgUrl={review.storeImage}
                                testimonial={review.title}
                                author={review.storeName}
                                handleDragEnd={handleDragEnd}
                                dragProgress={dragProgress}
                                position={order[index]}
                                dragging={dragging}
                                setDragging={setDragging}
                            />
                        ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({
    handleDragEnd,
    dragProgress,
    testimonial,
    position,
    imgUrl,
    author,
    setDragging,
    dragging,
}) => {
    const dragX = useMotionValue(0);

    useMotionValueEvent(dragX, "change", (latest) => {
        // When component first mounts, dragX will be a percentage
        // due to us setting the initial X value in the animate prop.
        if (typeof latest === "number" && dragging) {
            dragProgress.set(latest);
        } else {
            // Default back to 0 so that setInterval can continue
            dragProgress.set(0);
        }
    });

    const onDragStart = () => setDragging(true);

    const onDragEnd = () => {
        setDragging(false);
        handleDragEnd();
    };

    const x =
        position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
    const rotateZ =
        position === "front"
            ? "-6deg"
            : position === "middle"
            ? "0deg"
            : "6deg";
    const zIndex =
        position === "front" ? "2" : position === "middle" ? "1" : "0";

    const draggable = position === "front";

    return (
        <motion.div
            style={{
                zIndex,
                x: dragX,
                backgroundColor: "#e7ded3", // Change this line to set the background color d6c2aa
                opacity: 0.9,
                borderColor: "#9c1a1d",
                marginTop: "120px",
                marginLeft: "80px",
            }}
            animate={{ rotate: rotateZ, x }}
            drag
            dragElastic={0.15}
            dragListener={draggable}
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            transition={{
                duration: 0.55,
            }}
            className={`absolute left-0 top-0 grid h-[325px] w-[325px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
                draggable ? "cursor-grab active:cursor-grabbing" : ""
            }`}
        >
            <img
                src={imgUrl}
                alt={`Image of ${author}`}
                className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
                style={{ borderColor: "#9c1a1d" }}
            />
            <span
                className="text-center text-lg italic text-slate-400 font-bold"
                style={{ color: "#b78465", fontSize: "24px" }}
            >
                "{testimonial}"
            </span>
            <span
                className="text-center text-sm font-medium text-indigo-400"
                style={{ color: "#653a2f", fontSize: "20px" }}
            >
                {author}
            </span>
        </motion.div>
    );
};

export default DragShuffleHero;
