import React from "react";
import { useParams } from "react-router-dom";
import { reviews, store } from "../../../data/store";
import StorePageCard from "../../components/cards/StorePageCard";
import StarRating from "../../components/stars/StarRating";
import CommentCard from "../../components/cards/CommentCard";
import Location from "../../assets/octicon_location-16.svg";
import Time from "../../assets/zondicons_time.svg";
import Price from "../../assets/pepicons-pop_peso.svg";
import Resto from "../../assets/material-symbols_food-bank-outline.svg";
import addReview from "../../assets/addrev.svg";
import ReviewModal from "../../components/modal/review-modalV2";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch.js";
import { useUserContext } from "../../../hooks/useUserContext";


const STARS = [1, 2, 3, 4, 5];

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 0; // Default to 0 if there are no reviews
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  // only gets the whole number
  return Math.floor(averageRating);
};





const StorePage = () => {
  const { id } = useParams();

  const { user, dispatch } = useUserContext();

  const { error, loading, data } = useFetch(`/api/stores/${id}`);

  const { data: userFetched } = useFetch(`/api/users/id/${user ? user?.id : 'null'}`)

  const { data: reviews } = useFetch(`/api/posts/get_store_posts/${id}`);

  const [siteStoreReviews, setStoreReviews] = useState([]);



  useEffect(() => {
    setStoreReviews(reviews);
  }, [reviews]);

  //const datacopy = store.find((item) => 1 === 1);
  //const Reviews = reviews.filter((item) => item.storeID.toString() === id);

  /*

  const [storeReviews, setStoreReviews] = useState(Reviews);

  const addReviewToStore = (newReview) => {
    setStoreReviews([newReview, ...storeReviews]);
  };

  const deleteCommentCard = (key) => {
    setStoreReviews((storeReviews) =>
      storeReviews.filter((_, index) => index !== key)
    );
  };

  */

  const averageRating = calculateAverageRating(siteStoreReviews);

  return (
    <div className=" w-full min-h-screen flex justify-center items-start px-5 bg-[]">
      <div className="flex flex-col w-3/5 items-start justify-start p-5">

        {data && <StorePageCard data={data[0]} averageRating={averageRating} />}
        
        {data && (userFetched || reviews) && siteStoreReviews?.map((review, key) => (
          <CommentCard
            setStoreReviews={setStoreReviews}
            review={review}
            userLoggedIn={userFetched}
            key={key}
            reviewID={review._id}
            ownerID={data[0]?.ownerID}
          />
        ))}
      </div>
      <div className="flex flex-col w-2/5 items-center justify-center p-5">
        <div className="flex w-full items-center justify-left p-5">
          <img className="p-5" src={Location} alt="Location" />{" "}
          {/* Use img tag */}
          {data && (
            <h1 className="text-[#885133] overflow-hidden">
              {data[0]?.location}
            </h1>
          )}
        </div>
        <div className="flex w-full flex-row items-center justify-left p-5">
          <img className="p-5" src={Time} alt="Location" /> {/* Use img tag */}
          <div className="flex flex-col items-left justify-center">
            {data &&
              data[0]?.schedule?.map((item, key) => (
                <h1 key={key} className="text-[#885133]">{item}</h1>
              ))}
          </div>
        </div>
        <div className="flex w-full items-left justify-left px-10">
          <h1 className="text-[#885133] ml-12">{data && data[0]?.contact}</h1>
        </div>

        <div className="flex w-full items-center justify-left p-5">
          <img className="ml-1 p-5" src={Price} alt="Location" />{" "}
          {/* Use img tag */}
          <h1 className="text-[#885133]">{data && data[0]?.priceRange}</h1>
        </div>

        <div className="flex w-full items-center justify-left p-5">
          <img className="p-5" src={Resto} alt="Location" /> {/* Use img tag */}
          <h1 className="text-[#885133]">{data && data[0]?.mode}</h1>
        </div>

        <div className="divider w-full before:bg-[#D62300] after:bg-[#D62300] px-10">
        </div>

        <div className="flex w-full items-center justify-center">
          {data && user &&
            (
              <ReviewModal
                storeID={data[0]?._id}
                setStoreReviews={setStoreReviews}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
