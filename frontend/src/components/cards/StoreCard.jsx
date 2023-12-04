import { useEffect } from "react";
import Stars from "../rating/Stars";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const StoreCard = ({ store }) => {
    const price = () => {
        let price = store.price;

        if (price === 1) {
            return "₱";
        } else if (price === 2) {
            return "₱₱";
        } else {
            return "₱₱₱";
        }
    };

    function generateStars(rating) {
        const starElements = [];
    
        for (let k = 0; k < rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701688573/assets/11eee29d41b299c842010ceef873b6c7.svg"
                    className="w-4"

                />
            );
        }
        for (let k = 0; k < 5 - rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701688673/assets/efd52e5c7c3499f414b909fc3a42a2a7.svg"
                    className="w-4"
                />
            );
        }
    
        return starElements;
    }

    useEffect(() => {
        console.log(store);
        console.log(store.storeID);
        console.log(store.storeName);
        console.log(store.description);
        //console.log(reviews[0]);
    }, []);

    return (
        <>
            <Link
                to={`/store/${store._id}`}
                style={{ backgroundColor: "#9c1a1d" }}
                className="h-fit"
            >
                <div
                    className="card card-compact w-64 h-80 border-2 border-[#690000] shadow-2xl p-0 mx-1 my-1 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50"
                    style={{ backgroundColor: "#9c1a1d" }}
                >
                    <div className="thumbnail-image relative overflow-hidden  h-2/3 w-full object-center flex justify-center items-center rounded-t-2xl ">
                            <img
                                className="h-full object-cover w-full hover:transform hover:scale-110 transition duration-300 ease-in-out "
                                src={store.image}
                                alt="Shoes"
                            />
                    </div>
                    <div className="bg-white p-0 gap-0 card-body rounded-b-2xl flex justify-center h-1/3 w-full">
                        <h2
                            className="card-title px-0 font-bold"
                            style={{ color: "#885133" }}
                        >
                            {store.storeName}
                        </h2>

                        <div className="pb-1 px-0 flex flex-row w-full h-full bg-white ">
                            {generateStars(store.rating)}
                        </div>

                        <div className="card-actions bg-white px-0 pb-1">
                            <p
                                className="truncate bg-white"
                                style={{ color: "#885133" }}
                            >
                                {price()}
                            </p>
                        </div>

                        <div className="card-actions bg-white px-0 pb-1">
                            <p
                                className="truncate bg-white"
                                style={{ color: "#885133" }}
                            >
                                {store.description}
                            </p>

                            </div>


                        
                    </div>
                    
                </div>
            </Link>
        </>
    );
};

export default StoreCard;
