import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import RatingFilter from "../../components/rating-filter/reviews-filter";
import "./reviews.css";
import ReviewBox from "../../components/review-box/ReviewBox";
import ReviewModal from "../../components/review-modal/review-modal";
import SearchBar from "../../components/reviews-search-bar";
import "./reviews.css";

const Reviews = () => {
    const [selectedFilter, setSelectedFilter] = useState("0");
    const [refetch, setRefetch] = useState(false); // Define refetch state
    const [searchParams, setSearchParams] = useSearchParams({
        page: "0",
        keywords: "",
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const { data: review } = useFetch(
        `/api/posts/get_modified_posts?page=${searchParams.get(
            "page"
        )}&keywords=${searchParams.get("keywords")}`
    );

    useEffect(() => {
        if (review) console.log(review);
    }, [review]);



    const { data: amtPages } = useFetch("/api/posts/get_amount_pages");
    useEffect(() => {
        setSearchParams({ page: currentPage, keywords: search });
    }, [currentPage]);

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);
    };

    const handleHelpfulClick = () => {
        // Modify the refetch state here
        setRefetch(!refetch);
    };

    const handleNotHelpfulClick = () => {
        // Modify the refetch state here
        setRefetch(!refetch);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // const handleSearch = () => {
    //     const keywordsArray = search.split(" ").filter(Boolean); // Split by spaces and remove empty strings
    //     const keywordsString = keywordsArray.join("+"); // Join with '+' as separator
    
    //     searchParams.set("keywords", keywordsString);
    //     setSearchParams(searchParams);
    // };

    const handleSearch = () => {
        // searchParams.set("keywords", search);
        // setSearchParams(searchParams);

        searchParams.set("keywords", search);
        searchParams.set("page", "0"); // Reset the page to 0 when performing a new search
        setSearchParams(searchParams);
        setCurrentPage(0); // Reset the current page in state
    };

    const handleBackPage = (e) => {
        e.preventDefault();

        if (currentPage <= 0) {
            toast("No more last page!", {
                type: "warning",
            });
            return;
        }

        setCurrentPage((old) => old - 1);
        setSearchParams({ page: `${currentPage - 1}`, keywords: `${searchParams.get("keywords")}` });
    };

    const handleForward = (e) => {
        e.preventDefault();
        console.log(currentPage);
        console.log(amtPages - 1);
        if (currentPage >= amtPages.numberPages - 1) {
            toast("No more next page!", {
                type: "warning",
            });
            return;
        }

        setCurrentPage((old) => old + 1);
        setSearchParams({ page: `${currentPage + 1}`, keywords: `${searchParams.get("keywords")}` });
    };

    

    return (
        <div
            className="w-full h-full flex flex-col justify-center"
            style={{ backgroundColor: "#f0e6d7" }}
        >
            {/* <h1>KEYWORD: {searchParams}</h1> */}
            <div className="label">
                <div className="page-title-review">Reviews</div>
            </div>
            <div className="flex justify-between items-center z-10">
                <SearchBar
                    handleSearch={handleSearch}
                    handleSearchChange={handleSearchChange}
                />
                <RatingFilter
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                />
            </div>
            <div
                className="reviews-container flex flex-wrap justify-center items-center"
                style={{ backgroundColor: "#f0e6d7", marginBottom: "5rem" }}
            >
                {review &&
                    review?.map((reviewData, index) => (
                        <ReviewBox
                            key={index}
                            username={reviewData.username}
                            name={reviewData.name}
                            rating={reviewData.rating}
                            title={reviewData.title}
                            comment={reviewData.body}
                            image={reviewData.image}
                            storeName={reviewData.storeName}
                            userID={reviewData.userID}
                            storeImage={reviewData.storeImage}
                            reviewImage={reviewData.reviewImages}
                            selectedFilter={selectedFilter}
                            upvote={reviewData.upvotes}
                            downvote={reviewData.downvotes}
                            onHelpfulClick={handleHelpfulClick}
                            onNotHelpfulClick={handleNotHelpfulClick}
                 
                        />
                    ))}
            </div>
            <div className="w-full flex justify-center items-center" style={{marginBottom: '1rem'}}>
                <div className="join">
                    <button
                        className="join-item btn bg-[#f4f0ec] border-[#885133] text-red-500 hover:bg-[#885133]"
                        onClick={(e) => handleBackPage(e)}
                    >
                        {"<<"}
                    </button>
                    <button className="join-item btn bg-[#f4f0ec] border-[#885133] text-red-500 hover:bg-[#885133]">
                        {searchParams.get("page")}
                    </button>
                    <button
                        className="join-item btn bg-[#f4f0ec] border-[#885133] text-red-500 hover:bg-[#885133]"
                        onClick={(e) => handleForward(e)}
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
