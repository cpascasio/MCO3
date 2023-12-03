import React, { useState } from "react";
import Rating from "../rating";
import Edit from "../../../public/assets/mingcute_edit-4-fill.svg"
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useUserContext } from "../../../hooks/useUserContext";


const EditReviewModal = ({ setStoreReviews, review }) => {
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [modified, setModified] = useState(false);
    const { user } = useUserContext();


    const toastID = useRef(null);


    // Event handler to update selected stars
    const handleRatingChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setRating(selectedValue);
        setModified(true);
    };


    

    

    const handlePostReview = async (event) => {

        // Check if both title and review are provided
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        if(modified){
            console.log("MODIFIED")
            const form = new FormData();

    // Display loading notification
    toastID.current = toast.loading("Updating review now...");

    if(title !== review.title && title !== ""){
        console.log(title + " " + review.title)
        form.append("title", title);
    }

    if(body !== review.body && body !== ""){
        console.log(body + " " + review.body)
        form.append("body", body);
    }

    if(rating !== review.rating){
        form.append("rating", rating);
    }

    console.log("FORM IN EDIT REVIEW MODAL");
    console.log(form);

    
    
    await axios
      .patch(import.meta.env.VITE_BASE_URL + `/api/posts/update_post/${review._id}`, form, config)
      .then(() => {
        toast.update(toastID.current, {
          render: "Review successfully updated!!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });
        setTitle("");
        setBody("");
        setRating(5);
        setFile(null);

    }).catch((error) => {
      console.log(error);
      toast.update(toastID.current, {
        render: "Error updating review. Please try again.",
        autoClose: 3000,
        closeButton: true,
        isLoading: false,
        type: "error",
      });
    }


    );

    axios.get(
        import.meta.env.VITE_BASE_URL + `/api/posts/get_store_posts/${review.storeID}`
        )
        .then((res) => {
            setStoreReviews(res.data);
            console.log("GOT STORE REVIEWS IN REVIEW MODAL");
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });


        setTitle(review.title);
        setBody(review.body);
        setRating(review.rating);
        setModified(false);
        document.getElementById(`my_modal_${review._id}+edit`).close();

        }else{

            setError("Please make a change to the review before submitting.");

            setTitle(review.title);
        setBody(review.body);
        setRating(review.rating);
        setModified(false);


        }

    
    

    
    
    // Perform the post review action or submit the form


    };

    const handleCloseModal = () => {
        setTitle(review.title);
        setBody(review.body);
        setRating(review.rating);
        setModified(false);
        setError("");
        document.getElementById(`my_modal_${review._id}+edit`).close();
    };

    return (
        <>
            <button
    className="btn bg-[#FFF6EA] m-2 border-2 border-[#885133] hover:bg-[#FFF6EA] hover:border-2 hover:border-[#885133]"
    onClick={() => {
        setRating(review.rating);
        setTitle(review.title);
        setBody(review.body);
        setModified(false);
        setError("");
        document.getElementById(`my_modal_${review._id}+edit`).showModal();
    }}
>
                <img className="pr-2" src={Edit} alt="Location" />{" "}
                <h1 className="text-[#885133]">Edit</h1>
            </button>
            <dialog id={`my_modal_${review._id}+edit`} className="modal ">
                <div
                    className="modal-box p-5"
                    style={{ backgroundColor: "#885133", maxWidth: "45rem" }}
                >
                    <h3
                        className="font-bold text-lg"
                        style={{ color: "white", marginBottom: "10px" }}
                    >
                        Edit a Review
                    </h3>

                    <Rating backgroundColor={"#885133"} handleRatingChange={handleRatingChange} />
                    <p className="text-white">{rating} stars are highlighted.</p>
                    <div className=" bg-[#885133] divider w-full before:bg-[#f0e6d7] after:bg-[#f0e6d7]"></div>

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
                        onChange={(e) => {setTitle(e.target.value); setModified(true)}}
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
                        value={body}
                        onChange={(e) => {setBody(e.target.value); setModified(true)}}
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
                    <div className="modal-action rounded-r-full ">
                        <form method="dialog">
                            <button
                                className="btn rounded-l-none w-full flex items-center justify-center"
                                style={{
                                    backgroundColor: "#9C1A1D",
                                    color: "white",
                                    borderColor: "#9C1A1D",
                                }}
                                onClick={(event) => {handlePostReview(event)}}
                            >
                                Done
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default EditReviewModal;