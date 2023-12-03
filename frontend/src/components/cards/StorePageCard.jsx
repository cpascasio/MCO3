import React from "react";
import StarRating from "../stars/StarRating";
import sphere from "../../../public/assets/Ellipse1.svg";
import { useEffect } from "react";

const StorePageCard = ({ data, averageRating }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);

    function generateStars(rating) {
        const starElements = [];

        for (let k = 0; k < rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="../../assets/yellow-star.svg"
                    className="w-9 mx-1"
                />
            );
        }
        for (let k = 0; k < 5 - rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="../../assets/gray-star.svg"
                    className="w-9 mx-1"
                />
            );
        }

        return starElements;
    }

    console.log(averageRating)

    return (
        <>
            <div className="w-full flex items-start bg-[#9C1A1D] justify-start p-4 rounded-t-lg">
                <div className=" p-5 flex w-full items-center border-4 rounded-lg gap-5 bg-[#9C1A1D] text-[#FFF6EA] justify-start border-[#F06E71]">
                    <div className="avatar bg-transparent">
                        <div className="w-24 rounded-full overflow-hidden border-white border-2">
                            <img src={data?.icon} />
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#9C1A1D] text-[#FFF6EA]">
                        <p className="text-6xl font-bold py-2">
                            {data?.storeName}
                        </p>
                        <div className="rating bg-[#9C1A1D] ">
                            {generateStars(averageRating)}
                            <img
                                className="px-5 py-3"
                                src={sphere}
                                alt="Location"
                            />{" "}
                            <p className="text-green-500 font-bold text-2xl">
                                Open
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start bg-[#9C1A1D] p-4 rounded-b-lg">
                <div className="border-4 flex flex-col items-center justify-center bg-[#9C1A1D] border-[#F06E71] rounded-md p-4">
                    <img src={data?.image} className="mb-4 rounded-md" />
                    <div className="text-justify flex justify-center items-center p-5 bg-[#9C1A1D] text-white">
                        {data?.description}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorePageCard;
