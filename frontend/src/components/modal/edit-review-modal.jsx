import React, { useState } from "react";
import Rating from "../rating";
import Edit from "../../../public/assets/mingcute_edit-4-fill.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useUserContext } from "../../../hooks/useUserContext";

const EditReviewModal = ({ setStoreReviews, review }) => {
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [reviewImage, setReviewImage] = useState(review.media);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [modified, setModified] = useState(false);
    const { user } = useUserContext();
    const [changedImage, setChangedImage] = useState(false);

    const [newImage, setNewImage] = useState(null);
    // console.log(review.media.length === 0)
    const fileRef = useRef(null);

    const toastID = useRef(null);

    // Event handler to update selected stars
    const handleRatingChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setRating(selectedValue);
        setModified(true);
    };

    // const handleImageChange = (event) => {
    //     const fileUploaded = event.target.files[0];
    //     setNewImage(fileUploaded);
    //     setModified(true);

    // };

    const handleImageChange = (event) => {
        console.log(event)
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
        setModified(true);
    };

    const handleDeleteCurrentMedia = () => {
        setReviewImage(null); // Clear the current media state
        setFile(null);
        setModified(true);
    };

    // Function to handle deleting the selected media
    const handleDeleteMedia = () => {
        fileRef.current.value = ""; // Clear the file input
        setFile(null); // Clear the file state

        handleDeleteCurrentMedia();
        setModified(true);
    };

    const handlePostReview = async (event) => {
        // Check if both title and review are provided
        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`, // Replace with your actual access token
                "Content-Type": "multipart/form-data",
            },
        };

        if (modified) {
            console.log("MODIFIED");
            const form = new FormData();

            // Check if a file is selected
            console.log(file)
            if (file) {
                const selectedFile = file;
                console.log("Selected File:", selectedFile);
                form.append("img", selectedFile);
            }

            // Display loading notification
            toastID.current = toast.loading("Updating review now...");

            if (title !== review.title && title !== "") {
                console.log(title + " " + review.title);
                form.append("title", title);
            }

            if (body !== review.body && body !== "") {
                console.log(body + " " + review.body);
                form.append("body", body);
            }

            if (rating !== review.rating) {
                form.append("rating", rating);
            }

            console.log("FORM IN EDIT REVIEW MODAL");
            console.log(form);

            await axios
                .patch(
                    import.meta.env.VITE_BASE_URL +
                        `/api/posts/update_post/${review._id}`,
                    form,
                    config
                )
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
                })
                .catch((error) => {
                    console.log(error);
                    toast.update(toastID.current, {
                        render: "Error updating review. Please try again.",
                        autoClose: 3000,
                        closeButton: true,
                        isLoading: false,
                        type: "error",
                    });
                });

            axios
                .get(
                    import.meta.env.VITE_BASE_URL +
                        `/api/posts/get_store_posts/${review.storeID}`
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
            setFile(review.newImage);
            setModified(false);


            
            fileRef.current.value = null;

            document.getElementById(`my_modal_${review._id}+edit`).close();
        } else {
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
        setReviewImage(review.media.length === 0 ? null : review.media);
        setModified(false);
        setError("");
        setFile(null);
        if(fileRef.current){
            fileRef.current.value = null;
        }
        document.getElementById(`my_modal_${review._id}+edit`).close();
    };
    console.log(review.title);
    console.log("REVIEW IMAGE: ", review.media);
    return (
        <>
            <button
                className="btn bg-[#FFF6EA] m-2 border-2 border-[#885133] hover:bg-[#FFF6EA] hover:border-2 hover:border-[#885133]"
                onClick={() => {
                    setRating(review.rating);
                    setTitle(review.title);
                    setBody(review.body);
                    setReviewImage(
                        review.media.length === 0 ? null : review.media
                    );
                    setModified(false);
                    setError("");
                    document
                        .getElementById(`my_modal_${review._id}+edit`)
                        .showModal();
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

                    <Rating
                        backgroundColor={"#885133"}
                        handleRatingChange={handleRatingChange}
                    />
                    <p className="text-white">
                        {rating} stars are highlighted.
                    </p>
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
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setModified(true);
                        }}
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
                        onChange={(e) => {
                            setBody(e.target.value);
                            setModified(true);
                        }}
                        required
                    />
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                    </div>

                    {/* Display the current review image */}
                    {reviewImage && (
                        <div
                            style={{
                                position: "relative",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                src={reviewImage}
                                alt="Current Media"
                                style={{ width: "450px" }}
                            />
                            <button
                                className="btn btn-sm btn-circle btn-ghost"
                                onClick={handleDeleteCurrentMedia}
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    backgroundColor: "#885133",
                                    color: "white",
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}

                    {/* Display selected media */}
                    {file && (
                        <div
                            style={{
                                position: "relative",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Selected Media"
                                style={{ width: "450px" }}
                            />

                            <button
                                className="btn btn-sm btn-circle btn-ghost"
                                onClick={handleDeleteMedia}
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    backgroundColor: "#885133",
                                    color: "white",
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}

                    {/* Display "Add Media" button only if reviewImage is deleted */}
                    {!reviewImage && (
                        <>
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
                                {/* Added label for better accessibility */}
                                <label
                                    htmlFor="mediaInput"
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701689276/assets/300a05fc7791bad7e118f3d7121ab626.svg"
                                        style={{ width: "1rem" }}
                                        alt="Add Media"
                                    />
                                </label>
                                {/* Ref added to file input */}
                                <input
                                    type="file"
                                    id="mediaInput"
                                    ref={fileRef}
                                    onChange={(event) => {
                                        const selectedFile =
                                            event.target.files[0];
                                        setFile(selectedFile);
                                        setModified(true);
                                        console.log("ADDED FILE ACKNOWLEDGED");
                                    }}
                                    style={{ display: "none" }}
                                />
                            </button>
                        </>
                    )}

                    <div className="modal-action rounded-r-full ">
                        <form method="dialog">
                            <button
                                className="btn rounded-l-none w-full flex items-center justify-center"
                                style={{
                                    backgroundColor: "#9C1A1D",
                                    color: "white",
                                    borderColor: "#9C1A1D",
                                }}
                                onClick={(event) => {
                                    handlePostReview(event);
                                }}
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
