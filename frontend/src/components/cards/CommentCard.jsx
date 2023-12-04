import React from "react";
import StarRating from "../stars/StarRating";
import sphere from "../../../public/assets/Ellipse1.svg";
import "./commentCard-store.css";
import { useState } from "react";
import EditReviewModal from "../modal/edit-review-modal";
import CommentCardV2 from "./CommentCardV2";
import ReviewModalOwner from "../modal/review-modalOwnerV2";
import Trash from "../../../public/assets/mdi_trash.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import useFetch from "../../../hooks/useFetch.js";
import { useUserContext } from "../../../hooks/useUserContext";
import axios from "axios";
import { toast } from "react-toastify";

const CommentCard = ({ setStoreReviews, review, ownerID, userLoggedIn }) => {
    const { data: userOwner } = useFetch(`/api/users/id/${review.userID}`);

    const { data: fetchComments } = useFetch(
        `/api/comments/get_review_comments/${review._id}`
    );

    const [helpfulClicked, setHelpfulClicked] = useState(false);
    const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);
    const [helpfulCount, setHelpfulCount] = useState(review.helpful); // State for helpful count
    const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful); // State for not helpful count

    const { user, dispatch } = useUserContext();

    const [comments, setComments] = useState([]);

    const toastID = useRef(null);


    
    useEffect(() => {
        setComments(fetchComments);
    }, [fetchComments]);

    useEffect(() => {
        if (userLoggedIn) {
            if (userLoggedIn.upvotes.includes(review._id)) {
                setHelpfulClicked(true);
            }
            if (userLoggedIn.downvotes.includes(review._id)) {
                setNotHelpfulClicked(true);
            }

        }
    }, [userLoggedIn]);

    const handleUpvote = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        

        if(!helpfulClicked && !notHelpfulClicked){
            await axios.patch(
                import.meta.env.VITE_BASE_URL + `/api/posts/upvote_post/${review._id}/${userLoggedIn._id}`, {}, config
            ).then((res) => {
                console.log(res.data);
                console.log("UPVOTED SUCCESS");
                setHelpfulClicked(true);
                setHelpfulCount(helpfulCount + 1); // Increment helpful count
            }).catch((err) => {
                console.log(err);
            })
        }
            

    };

    const handleUndoUpvote = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        if(helpfulClicked && !notHelpfulClicked){
            await axios.patch(
                import.meta.env.VITE_BASE_URL + `/api/posts/undo_upvote_post/${review._id}/${userLoggedIn._id}`, {}, config
            ).then((res) => {
                console.log(res.data);
                console.log("UNDO UPVOTE SUCCESS");
                setHelpfulClicked(false);
                setHelpfulCount(helpfulCount - 1); // Decrement helpful count
            }).catch((err) => {
                console.log(err);
            })
        }
            

    };

    const handleDownvote = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        if(!notHelpfulClicked && !helpfulClicked){
            await axios.patch(
                import.meta.env.VITE_BASE_URL + `/api/posts/downvote_post/${review._id}/${userLoggedIn._id}`, {}, config
            ).then((res) => {
                console.log(res.data);

                console.log("DOWNVOTED SUCCESS");
                setNotHelpfulClicked(true);
                setNotHelpfulCount(notHelpfulCount + 1); // Increment helpful count
            }).catch((err) => {
                console.log(err);
            })

        }
            

    };


    const handleUndoDownvote = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        if(notHelpfulClicked && !helpfulClicked){
            await axios.patch(
                import.meta.env.VITE_BASE_URL + `/api/posts/undo_downvote_post/${review._id}/${userLoggedIn._id}`, {}, config
            ).then((res) => {
                console.log(res.data);
                console.log("UNDO DOWNVOTE SUCCESS");
                setNotHelpfulClicked(false);
                setNotHelpfulCount(notHelpfulCount - 1); // Decrement helpful count
            }).catch((err) => {
                console.log(err);
            })
        }
            

    };


    const handleDelete = async (event) => {
        // Check if both title and review are provided
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

        // Display loading notification
        toastID.current = toast.loading("Deleting Review...");

        await axios
            .delete(
                import.meta.env.VITE_BASE_URL +
                    `/api/posts/delete_post/${review._id}`, config
            )
            .then(() => {
                toast.update(toastID.current, {
                    render: "Review successfully deleted!!",
                    autoClose: 3000,
                    closeButton: true,
                    isLoading: false,
                    type: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.update(toastID.current, {
                    render: "Error deleting review. Please try again.",
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
    };

    function generateStars(rating) {
        const starElements = [];

        for (let k = 0; k < rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="../../assets/yellow-star.svg"
                    className="w-7"
                />
            );
        }
        for (let k = 0; k < 5 - rating; k++) {
            starElements.push(
                <img
                    alt="Star"
                    src="../../assets/gray-star.svg"
                    className="w-7"
                />
            );
        }

        return starElements;
    }


    return (
        <div className="w-full h-fit border-2 border-[#D62300] mt-5 flex flex-col justify-start p-5 rounded-lg">
            <div className="h-fit flex w-full gap-5 items-center justify-start">
                <div className="avatar bg-transparent">
                    {userOwner && (
                        <div className="w-24 rounded-full overflow-hidden border-[#9C1A1D] border-2">
                            <img src={userOwner.image} />
                        </div>
                    )}
                </div>
                {userOwner && (
                    <Link to={`/profile/${userOwner.username}`}>
                        <div className="flex flex-col w-full text-[#9C1A1D]">
                            <p className="text-4xl font-bold">
                                {userOwner.username}
                            </p>
                        </div>
                    </Link>
                )}

                <div className="flex items-center justify-end w-full">
                    <div className="flex w-2/3 justify-end">
                        {/* <div className="text-wrapper">(1)</div> */}
                        <div className="helpful-btn1 border-2 border-[#885133] p-1 rounded-md ">
                            <div
                                className="helpful-ctr1"
                                style={{ color: "#885133" }}
                            >
                                {helpfulCount}
                            </div>
                            <img
                                className={`mdi-helpful-outline1 ${
                                    notHelpfulClicked ? "disabled" : ""
                                }`}
                                alt="Mdi helpful outline"
                                src={
                                    helpfulClicked
                                        ? "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701688984/assets/387fdf5dfd84b43308fc6cba3a6732ca.svg"
                                        : "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701688984/assets/99ecb77ccd1ee8378c52c3422bcebe20.svg"
                                }
                                onClick={userLoggedIn && (helpfulClicked ? handleUndoUpvote : handleUpvote)}
                                title="Helpful"
                            />
                        </div>
                        <div className="nothelpful-btn1 border-2 border-[#885133] p-1 rounded-md">
                            <div
                                className="nothelpful-ctr1 "
                                style={{ color: "#885133" }}
                            >
                                {notHelpfulCount}
                            </div>
                            <img
                                className={`mdi-not-helpful1 ${
                                    helpfulClicked ? "disabled" : ""
                                }`}
                                alt="Mdi not helpful"
                                src={
                                    notHelpfulClicked
                                        ? "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701689055/assets/5db701d948ba98f09175e7f2bc44a2bd.svg"
                                        : "https://res.cloudinary.com/dpzerkzhi/image/upload/v1701689055/assets/77508c01ac162c3d09d49fa1241810df.svg"
                                }
                                onClick={userLoggedIn && (notHelpfulClicked ? handleUndoDownvote : handleDownvote)}
                                title="Not Helpful"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="p-1 mb-1 divider w-full before:bg-[#D62300] after:bg-[#D62300]"></div>
            </div>
            <div className="flex flex-col px-1">
                <div className="rating pb-2 bg-transparent flex justify-start items-center">
                    {review && (
                        <>
                            <div className="flex h-full">
                                {generateStars(review.rating)}
                            </div>
                            <img className="p-5" src={sphere} alt="Location" />{" "}
                            <span className="text-[#F06E71] font-bold text-lg">
                                {review.date}
                            </span>
                        </>
                    )}
                </div>
                {review && (
                    <>
                        <div className="text-2xl font-bold text-[#9C1A1D]">
                            {review.title}
                        </div>
                        <div className="text-[#885133] text-lg font-medium text-justify py-2">
                            {review.body}
                        </div>
                        <div className="text-[#885133] text-lg font-medium text-justify py-2"></div>
                    </>
                )}
            </div>
            {review && (
                <div className="flex justify-start items-center gap-4 py-2">
                    {review?.media?.map((image, key) => (
                        <img
                            key={key}
                            className="rounded-md"
                            src={image}
                            width={200}
                            height={200}
                        />
                    ))}
                </div>
            )}

            {comments && (
                <div className="flex flex-col w-full items-start justify-center p-5">
                    {comments?.map((response, key) => (
                        <CommentCardV2
                            comment={response}
                            userLoggedIn={userLoggedIn}
                            key={key}
                            setComments={setComments}
                        />
                    ))}
                </div>
            )}

            <div className="flex justify-end">
                {ownerID === user?.id && (
                    <div className="flex w-full justify-start">
                        <ReviewModalOwner
                            reviewID={review._id}
                            setComments={setComments}
                        />
                    </div>
                )}

                <div className="flex justify-end">
                    {review && user?.id === review.userID && (
                        <EditReviewModal
                            setStoreReviews={setStoreReviews}
                            review={review}
                        />
                    )}

                    {user?.id === review.userID && (
                        <button
                            className="btn m-2 bg-[#FFF6EA] border-2 border-[#D62300] hover:bg-[#FFF6EA] hover:border-[#D62300]"
                            onClick={(event) => handleDelete(event)}
                        >
                            <img className="pr-2" src={Trash} alt="Location" />{" "}
                            <h1 className="text-[#D62300]">DELETE</h1>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
