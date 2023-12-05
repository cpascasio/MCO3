import React from "react";
import "./full-review-modal.css";

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);

    // Replace slashes with dashes
  return formattedDate.replace(/\//g, '-');
  }
  
  

const FullReview = ({ review, onClose }) => {
  console.log('Full Review Data: ', review)
  console.log('Close?: ', onClose)

  return (
    <div className="modal-box w-11/12 max-w-5xl" style={{ backgroundColor: '#f4f0ec', color: '#885133', width: '50rem'}}>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
      </form>
      <div className="flex items-center mb-2">
        <img
          src={review?.image}
          alt="User Profile"
          className="rounded-full mr-4"
          style={{height: '5rem', width: '5rem'}}
        />
        <div>
          <h3 className="font-bold text-lg" style={{color: '#9c1a1d', fontSize: '2rem'}}>{review?.name}</h3>
          <p className="mb-2" style={{color: '#885133', fontSize: '12px'}}>{formatDate(review?.date)}</p>
        </div>
      </div>
      <hr style={{borderColor: '#885133'}}/>
      {review?.reviewImages && (
        <div className="flex mt-4 mb-5">
          {review.reviewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review Image ${index + 1}`}
              className="w-40 h-32 object-cover mr-2 rounded"
            />
          ))}
        </div>
      )}
      <div className="flex items-center mb-4 mt-5">
        <img
          src={review?.storeImage}
          alt="Restaurant Icon"
          className="w-12 h-12 rounded-full mr-4"
        />
        <span className="font-bold text-lg" style={{color: '#9c1a1d', fontSize: '1.5rem'}}>{review?.storeName}</span>
      </div>
      <p className="mb-2">Rating: {[...Array(review?.rating)].map((_, index) => (
            <span key={index} role="img" aria-label="star" className="text-yellow-500">⭐</span>
          ))}</p>
      {/* Render the dynamic content based on the review */}
      <h2 className="review-title text-justify">{review?.title}</h2>
      <p className="review-body mt-3 text-justify">{review?.body}</p>
     
    </div>
  );
};

export default FullReview;
