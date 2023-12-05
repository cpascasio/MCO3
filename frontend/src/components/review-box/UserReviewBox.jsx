// const UserReviewBox = (reviews) => {


//     return (
//         <>
             {/* <div>
                <img className="profile-icon" alt="Profile icon" src={reviews.image} />
                
                    <div className="text-wrapper">{reviews.name}</div>
    
                    <img className="review-image" alt="Review image" src={reviews.reviewImage} />
     
                

                <img className="restaurant-image" alt="Restaurant image" src={reviews.storeImage} />
                <div className="restaurant-name">{reviews.storeName}</div>
              
          
         
            </div> */}

// UserReviewBox.jsx

import React from "react";
import "./UserReviewBox.css";

function generateStars(rating) {
  const starElements = [];

  for (let k = 0; k < rating; k++) {
    starElements.push(
      <img alt="Star" src="../../assets/yellow-star.svg" key={k} />
    );
  }
  for (let k = 0; k < 5 - rating; k++) {
    starElements.push(
      <img alt="Star" src="../../assets/gray-star.svg" key={k + rating} />
    );
  }

  return starElements;
}

export const UserReviewBox = (reviews) => {
  const yellowStars = generateStars(reviews.rating);

  return (
    <div className={`review-box2 ${reviews.reviewImage ? '' : 'no-image'}`}>
      <div className="text-wrapper2">{reviews.name}</div>
      <div className="content-wrapper">
        <div className="image-wrapper">
          <img
            className="restaurant-image2"
            alt="Restaurant image"
            src={reviews.storeImage}
          />
        </div>
        <div className="info-wrapper">
          <div className="restaurant-name2">{reviews.storeName}</div>
          <div className="stars-wrapper2 flex flex-wrap">
            {yellowStars}
          </div>
        </div>
      </div>
      <div className="overlap">
        <div className="review-title2 overflow-hidden whitespace-nowrap overflow-ellipsis">{reviews.title}</div>
        <p className="review-body2">{reviews.comment}</p>
        </div>
            {Array.isArray(reviews.reviewImage) && reviews.reviewImage.length > 0 && (
                <img className="review-image2" alt="Review image" src={reviews.reviewImage} />
            )}
        </div>

  );
};

export default UserReviewBox;



