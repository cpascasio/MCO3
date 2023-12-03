import React, { useState } from "react";
import Rating from "../rating";
import Reply from "../../../public/assets/ic_baseline-reply.svg"


const ReviewModalOwner = ({ addReviewToReponse }) => {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [error, setError] = useState("");

    // Event handler to update selected stars
    const handleRatingChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setRating(selectedValue);
    };

    const handlePostReview = (event) => {
        // Check if both title and review are provided
        event.preventDefault();
        if (title.trim() === "" || review.trim() === "") {
            setError("Please provide a title and a review.");
        } else {
            // Perform the post review action or submit the form
            setError(""); // Clear any previous error messages
            const newReview = {
                name: "Lebron James",
                rating: rating,
                title: title,
                comment: review,
                date: "2023-10-22",
                userID: 1,
                icon: "../../../public/assets/profile3.png",
                
            };
            addReviewToReponse(newReview);
            setTitle("");
            setReview("");
            setRating(5);

            document.getElementById("my_modal_3").close();
        }
    };

    const handleCloseModal = () => {
        setTitle("");
        setReview("");
        setRating(5);
        document.getElementById("my_modal_3").close();
    };

    return (
        <>
        <div className="ml-5 px-2 flex items-center justify-start w-full">
        <button
                className="btn  justify-center items-center flex w-[30%] bg-transparent border-2 hover:bg-transparent"
                onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                }
            >
                <img className="pr-2" src={Reply} alt="Location" />{" "}
                <h1 className="text-black">Reply</h1>
            </button>
        </div>
            
            <dialog id="my_modal_3" className="modal">
                <div
                    className="modal-box"
                    style={{ backgroundColor: "#9C1A1D", maxWidth: "45rem" }}
                >
                    <h3
                        className="font-bold text-lg"
                        style={{ color: "white", marginBottom: "10px" }}
                    >
                        Write a Review as Owner
                    </h3>
                    <div className=" bg-[#9C1A1D] divider w-full before:bg-[#FFF6EA] after:bg-[#FFF6EA]"></div>

                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleCloseModal}
                    >
                        ✕
                    </button>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Add title..."
                        style={{
                            backgroundColor: "#f4f0ec",
                            color: "black",
                            marginBottom: "10px",
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="textarea w-full"
                        placeholder="Write your review..."
                        style={{
                            backgroundColor: "#f4f0ec",
                            overflow: "auto",
                            height: "200px",
                            color: "black",
                            resize: "none",
                        }}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                    </div>
                    <button
                        style={{
                            width: "2rem",
                            height: "2rem",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="../../../public/assets/add-media.svg"
                            style={{ width: "1rem" }}
                            alt="Add Media"
                        />
                    </button>
                    <div className="modal-action rounded-r-full">
                        <form method="dialog">
                            <button
                                className="btn rounded-l-none"
                                style={{
                                    backgroundColor: "#885133",
                                    color: "white",
                                    borderColor: "#885133",
                                }}
                                onClick={(event) => handlePostReview(event)}
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ReviewModalOwner;
