import React, { useEffect } from "react";
import StarRating from "../stars/StarRating";
import sphere from "../../../public/assets/Ellipse1.svg";
import "./commentCardV2.css";
import { useState } from "react";
import EditCommentModal from "../modal/edit-comment-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useUserContext } from "../../../hooks/useUserContext";
import Trash from "../../../public/assets/mdi_trash.svg";
import useFetch from "../../../hooks/useFetch";

const CommentCardV2 = ({  setComments, comment, userLoggedIn }) => {
    const [helpfulClicked, setHelpfulClicked] = useState(false);
    const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);
    const [helpfulCount, setHelpfulCount] = useState(comment.helpful); // State for helpful count
    const [notHelpfulCount, setNotHelpfulCount] = useState(comment.notHelpful); // State for not helpful count
    const { user } = useUserContext();
    const { data: commentUser } = useFetch(`/api/users/id/${comment.userID}`);



    useEffect(() => {
        if (userLoggedIn) {
            if (userLoggedIn.upvotes.includes(comment._id)) {
                setHelpfulClicked(true);
            }
            if (userLoggedIn.downvotes.includes(comment._id)) {
                setNotHelpfulClicked(true);
            }

        }
    }, [userLoggedIn]);

    const toastID = useRef(null);

    
    const handleDeleteComment = async (event) => {

        // Check if both title and review are provided
        event.preventDefault();

        const config = {
            headers: {
              "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
              "Content-Type": "multipart/form-data",
            },
          };

    // Display loading notification
    toastID.current = toast.loading("Deleting Comment...");

    
    await axios
      .delete(import.meta.env.VITE_BASE_URL + `/api/comments/delete_comment/${comment._id}`, config)
      .then(() => {
        toast.update(toastID.current, {
          render: "Comment successfully deleted!!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });

    }).catch((error) => {
      console.log(error);
      toast.update(toastID.current, {
        render: "Error deleting comment. Please try again.",
        autoClose: 3000,
        closeButton: true,
        isLoading: false,
        type: "error",
      });
    }

    );

    axios.get(
        import.meta.env.VITE_BASE_URL + `/api/comments/get_review_comments/${comment.sourceID}`
        )
        .then((res) => {
            setComments(res.data);
            console.log("GOT STORE REVIEWS IN REVIEW MODAL");
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

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
                import.meta.env.VITE_BASE_URL + `/api/comments/upvote_comment/${comment._id}/${userLoggedIn._id}`, config
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
                import.meta.env.VITE_BASE_URL + `/api/comments/undo_upvote_comment/${comment._id}/${userLoggedIn._id}`, config
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
                import.meta.env.VITE_BASE_URL + `/api/comments/downvote_comment/${comment._id}/${userLoggedIn._id}`, config
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
                import.meta.env.VITE_BASE_URL + `/api/comments/undo_downvote_comment/${comment._id}/${userLoggedIn._id}`, config
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

    return (
        <div className="w-full h-fit bg-[#9C1A1D] mt-5 flex flex-col justify-center items-center p-5 rounded-lg">
            <div
                className="flex border-2 border-[#F06E71] bg-[#9C1A1D] w-full gap-5 p-2 mx-5 rounded-md items-center justify-start"
                style={{ borderWidth: "3px" }}
            >
                <div className="avatar bg-transparent ">
                    {commentUser && (
                        <div className="w-24 rounded-full bg-[#9C1A1D] overflow-hidden border-white border-2">
                            <img src={commentUser.image} />
                        </div>
                    )}
                </div>
                {commentUser && (
                    <div className="flex flex-col w-full bg-[#9C1A1D] text-white">
                        <p className="text-4xl font-bold">
                            {commentUser.username}
                        </p>
                    </div>
                )}

                <div className="flex bg-[#9C1A1D] items-center justify-end w-full">
                    <div className="flex w-2/3 bg-[#9C1A1D] justify-end">
                        {/* <div className="text-wrapper">(1)</div> */}
                        <div className="helpful-btn1 bg-transparent border-2 border-[#F9C8C8] p-1 rounded-md ">
                            <div className="helpful-ctr1 bg-transparent">
                                {helpfulCount}
                            </div>
                            <img
                                className={`mdi-helpful-outline1 ${
                                    notHelpfulClicked ? "disabled" : ""
                                }`}
                                alt="Mdi helpful outline"
                                src={
                                    helpfulClicked
                                        ? "../../../public/assets/store-like-shaded.svg"
                                        : "../../../public/assets/store-like-outline.svg"
                                }
                                onClick={userLoggedIn && (helpfulClicked ? handleUndoUpvote : handleUpvote)}
                                title="Helpful"
                            />
                        </div>
                        <div className="nothelpful-btn1 border-2 bg-transparent border-[#F9C8C8]  p-1 rounded-md">
                            <div className="nothelpful-ctr1 bg-transparent ">
                                {notHelpfulCount}
                            </div>
                            <img
                                className={`mdi-not-helpful1 ${
                                    helpfulClicked ? "disabled" : ""
                                }`}
                                alt="Mdi not helpful"
                                src={
                                    notHelpfulClicked
                                        ? "../../../public/assets/store-dislike-shaded.svg"
                                        : "../../../public/assets/store-dislike-outline.svg"
                                }
                                onClick={userLoggedIn && (notHelpfulClicked ? handleUndoDownvote : handleDownvote)}
                                title="Not Helpful"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col mt-4 px-4 border-[#F06E71] w-full rounded-md bg-[#9C1A1D]"
                style={{ borderWidth: "3px" }}
            >
                <div className="rating flex bg-[#9C1A1D] justify-start items-center">
                    {commentUser && (
                        <p className="text-xl text-[#FFC700]  font-bold">
                            {commentUser.status}
                        </p>
                    )}
                    <img className="p-5" src={sphere} alt="Location" />{" "}
                    <span className="text-[#F06E71] font-bold text-lg">
                        {comment.date}
                    </span>
                </div>
                <div className="text-white text-2xl font-bold bg-[#9C1A1D] ">
                    {comment.title}
                </div>
                <div className="text-[#F9C8C8] bg-[#9C1A1D] text-lg font-medium text-justify py-2">
                    {comment.body}
                </div>

                <div className="flex bg-[#9C1A1D] justify-start items-center gap-4 py-2">
                    {comment?.image?.map((image) => (
                        <img
                            className="rounded-md"
                            src={image}
                            width={200}
                            height={200}
                        />
                    ))}
                </div>
                <div className="flex justify-end bg-[#9C1A1D] mt-2">

                    {
                        comment && userLoggedIn?._id === comment.userID &&(
                            <EditCommentModal setComments={setComments} comment={comment}/>
                        )
                    }
                    {
                        comment && userLoggedIn?._id === comment.userID &&(
                            <button className="btn m-2 bg-[#FFF6EA] border-2 border-[#D62300] hover:bg-[#FFF6EA] hover:border-[#D62300]" onClick={(event) => {handleDeleteComment(event)}}>
                        <img className="pr-2" src={Trash} alt="Location" />{" "}
                        <h1 className="text-[#D62300]">DELETE</h1>
                    </button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default CommentCardV2;
