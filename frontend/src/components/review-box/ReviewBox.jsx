import "./review-box.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewSlideshow from "../slideshow/review-slideshow";
import Slideshow from "../slideshow/slideshow";


function generateStars(rating) {
    const starElements = [];

    for (let k = 0; k < rating; k++) {
        starElements.push(
            <img
                alt="Star"
                src="../../assets/yellow-star.svg"
            />
        );
    }
    for (let k = 0; k < 5 - rating; k++) {
        starElements.push(
            <img
                alt="Star"
                src="../../assets/gray-star.svg"
            />
        );
    }

    return starElements;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);

    // Replace slashes with dashes
  return formattedDate.replace(/\//g, '-');
  }
  
const ReviewBox = (reviews) => {
    const yellowStars = generateStars(reviews.rating);

    // const [helpfulClicked, setHelpfulClicked] = useState(false);
    // const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);
    // const [helpfulCount, setHelpfulCount] = useState(0); // State for helpful count
    // const [notHelpfulCount, setNotHelpfulCount] = useState(0); // State for not helpful count

    // const toggleHelpful = () => {
    //     if (!notHelpfulClicked) {
    //         setHelpfulClicked(!helpfulClicked);
    //         setHelpfulCount(helpfulCount + 1); // Increment helpful count
    //     }
    // };

    // const toggleNotHelpful = () => {
    //     if (!helpfulClicked) {
    //         setNotHelpfulClicked(!notHelpfulClicked);
    //         setNotHelpfulCount(notHelpfulCount + 1); // Increment not helpful count
    //     }
    // };

    // const toggleHelpful = () => {
    //     if (!notHelpfulClicked) {
    //       setHelpfulClicked(!helpfulClicked);
    //       setHelpfulCount(helpfulCount + 1);
    
    //       // Call the refetch callback
    //       reviews.onHelpfulClick();
    //     }
    //   };
    
    //   const toggleNotHelpful = () => {
    //     if (!helpfulClicked) {
    //       setNotHelpfulClicked(!notHelpfulClicked);
    //       setNotHelpfulCount(notHelpfulCount + 1);
    
    //       // Call the refetch callback
    //       reviews.onNotHelpfulClick();
    //     }
    //   };

    const profileIcon = `../../../public/profile-pictures/${reviews.userID}.jpeg`;

    useEffect(() => {console.log(reviews.storeImage);
    console.log("REVIEW-BOX")},[reviews]);

    if (reviews.selectedFilter !== '0' && reviews.rating !== parseInt(reviews.selectedFilter)) {
        return null;
    }

   

      const formattedDate = formatDate(reviews.date);

    return (
        <>
             <div className={`review-box shadow-xl ${reviews.reviewImage?.length > 0 ? '' : 'no-image'}`}>
                <div className="top-container">
                    <Link to={`/profile/${reviews.name}`}>
                    <img className="profile-icon" alt="Profile icon" src={reviews.image} />
                
                        <div className="text-wrapper">{reviews.name}</div>
                    </Link>
                    <div className="date-container">{formattedDate}</div>
                </div>
                
                {/* {reviews.image && <img className="review-image" alt="Review image" src={reviews.reviewImage} />} */}
                {/* Conditionally render the image if the 'image' prop is provided. */}
                {/* <Slideshow></Slideshow> */}

                {/* Replace static image ren j  n ndering with the Slideshow component */}
                {Array.isArray(reviews.reviewImage) && reviews.reviewImage.length > 0 ? (
                    // <ReviewSlideshow 
                    //     src={reviews.reviewImage} 
                    //     interval={3000} />
                    <img className="review-image" alt="Review image" src={reviews.reviewImage} />
                ) : (
                    <hr className="custom-hr"/>
                )}
                

                {/* <Slideshow></Slideshow> */}
                
                <img className="restaurant-image" alt="Restaurant image" src={reviews.storeImage} />
                <div className="restaurant-name">{reviews.storeName}</div>
                
                <div className="stars-wrapper flex flex-wrap">
                    {yellowStars}
                </div>
                <div className="overlap-group">
                    <div className="review-title overflow-hidden whitespace-nowrap overflow-ellipsis">{reviews.title}</div>
                    {/* <div className="review-title overflow-hidden whitespace-nowrap overflow-ellipsis">hfiuwhfiuwjefjwgefywgefjhwgefygjwehfkhjufksedjfisugkfjnjslkhfkjsnklfr</div> */}
                    <p className="review-body">{reviews.comment}</p>
                    {/* <p className="review-body">hellohellohellohellohellohellovvhellohellohellovvvhellohellohellovvhellohellovvvhellovhellohellovvvhellovvvvhellohellohellohellohellohellovvvhellohellohellovv</p> */}
                </div>
                <div className="votes">
                    {/* <div className="text-wrapper">(1)</div> */}
                    <div className="helpful-btn">
                        {/* <div className="helpful-ctr">{helpfulCount}</div> */}
                        <div className="helpful-ctr">{reviews.upvote}</div>
                        <img
                                className={`mdi-helpful-outline`}
                                // className={`mdi-helpful-outline ${notHelpfulClicked ? 'disabled' : ''}`}
                                alt="Mdi helpful outline"
                                src={'../../assets/mdi-helpful-outline.svg'}
                                // src={helpfulClicked ? '../../assets/mdi-helpful-outline-clicked.svg' : '../../assets/mdi-helpful-outline.svg'}
                                // onClick={toggleHelpful}
                                title="Helpful"
                            />
                    </div>
                    <div className="nothelpful-btn">
                        {/* <div className="nothelpful-ctr">{notHelpfulCount}</div> */}
                        <div className="nothelpful-ctr">{reviews.downvote}</div>
                        <img
                                className={`mdi-not-helpful`}
                                // className={`mdi-not-helpful ${helpfulClicked ? 'disabled' : ''}`}
                                alt="Mdi not helpful"
                                src={'../../assets/mdi-not-helpful-outline.svg'}
                                // onClick={toggleNotHelpful}
                                // src={notHelpfulClicked ? '../../assets/mdi-not-helpful-outline-clicked.svg' : '../../assets/mdi-not-helpful-outline.svg'}
                                title="Not Helpful"
                            />
                    </div>
                </div>
            </div>
            
        </>
    );
}


export default ReviewBox;
