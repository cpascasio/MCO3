import React, { useState } from "react";
import Rating from "../rating";
import Edit from "../../../public/assets/mingcute_edit-4-fill.svg"
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";


const EditCommentModal = ({ setComments, comment }) => {
    const [title, setTitle] = useState(comment.title);
    const [body, setBody] = useState(comment.body);
    const [error, setError] = useState("");
    const [modified, setModified] = useState(false);

    const toastID = useRef(null);

    // Event handler to update selected stars
   
    const handlePostReview = async (event) => {

        // Check if both title and review are provided
        event.preventDefault();

        if(modified){
            const form = new FormData();

    // Display loading notification
    toastID.current = toast.loading("Updating comment now...");

    if(title !== comment.title && title !== ""){
        console.log(title + " " + comment.title)
        form.append("title", title);
    }

    if(body !== comment.body && body !== ""){
        console.log(body + " " + comment.body)
        form.append("body", body);
    }


    console.log("FORM IN EDIT REVIEW MODAL");
    console.log(form);

    
    
    await axios
      .patch(import.meta.env.VITE_BASE_URL + `/api/comments/update_comment/${comment._id}`, form)
      .then(() => {
        toast.update(toastID.current, {
          render: "Comment successfully updated!!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });
        setTitle("");
        setBody("");

    }).catch((error) => {
      console.log(error);
      toast.update(toastID.current, {
        render: "Error updating comment. Please try again.",
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


        setTitle(comment.title);
        setBody(comment.body);
        setModified(false);
        document.getElementById(`my_modal_${comment._id}+comment`).close();

        }else{

            setError("Please make a change to the review before submitting.");

            setTitle(comment.title);
        setBody(comment.body);
        setModified(false);


        }

    
    

    
    
    // Perform the post review action or submit the form


    };

    const handleCloseModal = () => {
        setTitle(comment.title);
        setBody(comment.body);
        setModified(false);
        setError("");
        document.getElementById(`my_modal_${comment._id}+comment`).close();
    };

    return (
        <>
            <button
    className="btn bg-[#FFF6EA] m-2 border-2 border-[#885133] hover:bg-[#FFF6EA] hover:border-2 hover:border-[#885133]"
    onClick={() => {
        setTitle(comment.title);
        setBody(comment.body);
        setModified(false);
        setError("");
        document.getElementById(`my_modal_${comment._id}+comment`).showModal();
    }}
>
                <img className="pr-2" src={Edit} alt="Location" />{" "}
                <h1 className="text-[#885133]">Edit</h1>
            </button>
            <dialog id={`my_modal_${comment._id}+comment`} className="modal ">
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
                            src="https://res.cloudinary.com/dpzerkzhi/image/upload/v1701689276/assets/300a05fc7791bad7e118f3d7121ab626.svg"
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
                                onClick={(event) => handlePostReview(event)}
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

export default EditCommentModal;