import React from "react";
import { Link } from "react-router-dom";
import { Container } from "postcss";
import "./store.css";
import StoreCard from "../../components/cards/StoreCard";
import { store, reviews } from "../../../data/store.js";
import { useState, useEffect } from "react";
import Rating from "../../components/rating";
import useFetch from "../../../hooks/useFetch.js";

const Store = () => {

    const [pageNum, setPageNum] = useState(1);
    const itemsPerPage = 5;
    const [stores, setStores] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    
    // const [showAllStores, setShowAllStores] = useState(true); // New state
    const { error, loading, data } = useFetch("/api/stores");

    useEffect(() => {
        if (data) {
            // Apply filters based on selectedRating
            const filteredStores = data.filter((store) => {
                return selectedRating ? store.rating === parseInt(selectedRating) : true;
            });
    
            setStores(filteredStores);
        }
    }, [data, selectedRating]);
    

    useEffect(() => {
        if (data) {
            console.log(data);
            setStores(data);
        }
    }, [data]);

    const totalPages = Math.ceil(store.length / itemsPerPage);

    const indexOfLastItem = pageNum * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filterReviews = (storeID) => {
        const filteredReviews = reviews.filter((review) => {
            return review.storeID === storeID;
        });
        return filteredReviews;
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    style={{
                        cursor: "pointer",
                    }}
                    className={`rounded-full px-3 py-1 m-2 text-md text-gray-500 ${
                        pageNum === i ? "bg-[#9c1a1d] text-white font-bold" : ""
                    }`}
                    onClick={() => setPageNum(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    const handleNextPage = () => {
        setPageNum(pageNum + 1);
    };

    const handlePreviousPage = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };

    const areStringsSimilar = (str1, str2, threshold = 1) => {
        if (typeof str1 !== "string" || typeof str2 !== "string") {
            throw new Error("Both inputs must be strings");
        }

        const normalize = (s) => s.toLowerCase().trim();
        const normalizedStr1 = normalize(str1);
        const normalizedStr2 = normalize(str2);

        const minLength = Math.min(
            normalizedStr1.length,
            normalizedStr2.length
        );
        let matchingCharacters = 0;

        for (let i = 0; i < minLength; i++) {
            if (normalizedStr1[i] === normalizedStr2[i]) {
                matchingCharacters++;
            }
        }

        const similarity = matchingCharacters / minLength;

        return similarity >= threshold;
    };
    const handleSearch = (e) => {
        if (!e.target.value) {
            setStores(data);
            return;
        }
        const filteredStores = data.filter((store) => {
            return areStringsSimilar(store.storeName, e.target.value.trim(), 1);
        });
        setStores(filteredStores);
    };
    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setSelectedRating(newRating);
    };
    const handleShowAllStores = () => {
        setSelectedRating(null);
        setPageNum(1); // Reset page number to 1 when showing all stores
    };

    return (
        <div
            className="w-full min-h-screen flex flex-row justify-center items-center"
            style={{ backgroundColor: "#f0e6d7" }}
        >
            {" "}
            <div className="flex w-full h-full  flex-col">
                <div className="mx-60 flex w-full flex-start p-4 items-center justify-start">
                    <h1 className="font-bold text-[#9c1a1d] text-xl">
                        RESTAURANTS
                    </h1>
                </div>

                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center justify-center w-[100%] flex-col">
                        <div className="flex flex-nowrap w-[70%] p-5 pt-1">
                            {" "}
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="input w-full rounded-r-none bg-white search-bar"
                                onChange={handleSearch}
                            />
                            <button className="btn rounded-l-none bg-[#9c1a1d] border-none text-[#FFF6EA]">
                                Search
                            </button>
                        </div>

                        <div className="w-[68%] flex items-start justify-start gap-2">
                            <div className="rating w-full justify-end">
                                <Rating handleRatingChange={handleRatingChange}/>
                            </div>
                            {/* Add the "Show All Stores" button */}
                            <button
                                className="btn bg-[#FFF6EA] text-[#9c1a1d] hover:bg-[#9C1A1D] hover:text-[#FFF6EA] border-none p-2 rounded-md"
                                onClick={handleShowAllStores}
                                style={{height: 'fit-content', width: '5rem', marginRight: '25rem'}}
                            >
                                Show All Stores
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-72 mx-0 divider w-full before:bg-[#D62300] after:bg-[#D62300]"></div>

                <div className="flex px-64 w-full items-center justify-center">
                    <div
                        style={{
                            // flex: 1,
                            display: "flex",
                            // marginTop: "20px",
                            // flexDirection: "row",
                            justifyContent: "center", // Center the pagination
                            // paddingLeft: "10px",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                padding: "20px",
                                // border: "solid 2px black",
                                width: "100%",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <button
                                onClick={handlePreviousPage}
                                disabled={pageNum === 1}
                                className="font-bold text-xl text-gray-500"
                            >
                                {`<`}
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={handleNextPage}
                                disabled={pageNum === totalPages}
                                className="font-bold text-xl text-gray-500"
                            >
                                {`>`}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-start flex-row flex-wrap w-full h-fit p-5 items-center justify-center ">
                    <div className="flex items-center justify-center p-5 border bg-[#9c1a1d] rounded-lg">
                        <div className="grid grid-cols-5 gap-5 p-5 rounded-lg border-4 border-[#F06E71] bg-[#9c1a1d]  ">
                            {stores
                                ?.slice(indexOfFirstItem, indexOfLastItem)
                                .map((store, index) => (
                                    <StoreCard
                                        key={store._id}
                                        store={store}
                                        index={index}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
