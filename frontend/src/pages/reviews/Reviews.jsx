import "./reviews.css";
import ReviewBox from "../../components/review-box/ReviewBox";
import SearchBar from "../../components/reviews-search-bar";
import RatingFilter from "../../components/rating-filter/reviews-filter";
import useFetch from "../../../hooks/useFetch";
import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const [selectedFilter, setSelectedFilter] = useState('0');
    const [refetch, setRefetch] = useState(false); // Define refetch state
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState("");

    // const { data: review } = useFetch('/api/posts/get_modified_posts');
    const { data: review, error} = useFetch(`/api/posts/get_modified_posts?keywords=${searchQuery}`);

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

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value);
    // };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        console.log('Search Query:', searchQuery);
    
        if (review) {
            console.log('Review data:', review);
        }
        if (error) {
            console.error('Error fetching reviews:', error);
        }
    }, [review, error, searchQuery]);
    

    return (
        <div className="w-full h-full flex flex-col justify-center" style={{ backgroundColor: '#f0e6d7' }}>
            <div className="label">
                <div className="page-title-review">Reviews</div>
            </div>
            <div className="flex justify-between items-center z-10">
                <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} handleSearchChange={handleSearchChange}/>
                <RatingFilter selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
            </div>
            <div className="reviews-container flex flex-wrap justify-center items-center" style={{ backgroundColor: '#f0e6d7', marginBottom: '5rem' }}>
                {review && (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;