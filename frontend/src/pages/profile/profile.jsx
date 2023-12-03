import "../people/people.css";
import "./profile.css";
import ProfileCard from "../../components/profile-cards/profile-card";
// import peopleData from "../../../data/people-data.js";
// import reviewData from "../../../data/review-data.js";
import ReviewBox from "../../components/review-box/ReviewBox";
import UserReviewBox from "../../components/review-box/UserReviewBox.jsx";
import React from "react";
import { useParams } from "react-router-dom";
import useDynamicFetch from "../../../hooks/useDynamicFetch.js";
import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
// import UserReviewBox from "../../components/review-box/UserReviewBox.jsx";

const Profile = () => {
    const { username } = useParams();
    const [refetch, setRefetch] = useState(false);

    const {
        loading: userLoading,
        error: userError,
        data: userData,
    } = useDynamicFetch(`/api/users/${username}`, refetch);

    const {
        loading: reviewLoading,
        error: reviewError,
        data: userReviews,
    } = useDynamicFetch(`/api/posts/get_user_posts/${username}`, refetch);

    // const { loading: storeLoading, error: storeError, data: storeData } = useDynamicFetch(
    //   `/api/posts/get_modified_posts/`,
    //   refetch,
    // );

    // const { data: storeData } = useFetch('/api/posts/get_modified_posts');

    const {
        loading: storeLoading,
        error: storeError,
        data: storeData,
    } = useFetch("/api/posts/get_modified_posts");

    useEffect(() => {
        console.log(userData);
    }, [userData]);

  useEffect(() => {
    console.log(userReviews);
  }, [userReviews]);

    // useEffect(() => {
    //   console.log(storeData);
    // }, [storeData]);

    // if (userLoading || reviewLoading) {
    //   // Loading state: You can add a loading spinner or message here
    //   return <div>Loading...</div>;
    // }

    // if (userError || reviewError) {
    //   // Error state: You can add an error message here
    //   return <div>Error loading data.</div>;
    // }

    if (userLoading || reviewLoading || storeLoading) {
        // Loading state: You can add a loading spinner or message here
        return <div>Loading...</div>;
    }

    if (userError || reviewError || storeError) {
        // Error state: You can add an error message here
        return <div>Error loading data.</div>;
    }

  return (
    <>
      {userData &&
        (
          <div className="w-full h-full">
            <div className="profile-container flex flex-wrap justify-center items-center">
              <ProfileCard
                name={userData?.username}
                isOwner={userData?.isOwner}
                userID={userData?._id}
                image={userData.image}
                setRefetch={setRefetch}
                description={userData.description}
              />
            </div>
            <h1
              className="text-2xl font-bold mb-4 flex flex-wrap justify-center items-center"
              style={{ color: "#f06e71" }}
            >
              Latest Reviews
            </h1>
            <div
              className="flex flex-wrap justify-center items-center user-review-box"
              style={{ marginBottom: "5rem" }}
            >
             {userReviews && userReviews.map((reviewData, index) => (
                <UserReviewBox
                  key={index}
                  username={userData?.username}
                  userID={userData?._id}
                  rating={reviewData.rating}
                  title={reviewData.title}
                  comment={reviewData.body}
                  image={userData.image}
                  storeName={reviewData.storeName}
                  storeImage={reviewData.storeImage}
                  reviewImage={reviewData.media}
                />
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default Profile;
