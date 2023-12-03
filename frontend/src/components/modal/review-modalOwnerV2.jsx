import React, { useEffect, useRef, useState } from "react";
import Rating from "../rating";
import Reply from "../../../public/assets/ic_baseline-reply.svg"
import { useUserContext } from "../../../hooks/useUserContext";
import { toast } from "react-toastify";
import axios from "axios";

const ReviewModalOwner = ({ setComments, reviewID  }) => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const toastID = useRef(null);

  // Event handler to update selected stars
  
  useEffect(() => {
    console.log("REVIEW ID IN REVIEW MODAL")

    console.log(reviewID);
    }, [reviewID]);

  const handlePostReview = async (event) => {
    // Check if both title and review are provided
    event.preventDefault();
    if (title.trim() === "" || review.trim() === "") {
      toast("Please provide review and title", {
        type: "error",
      });
      return;
    }

    const form = new FormData();

    //toastID.current = toast.loading("Uploading review now...");
    form.append("title", title);
    form.append("body", review);
    form.append("userID", user.id);
    form.append("sourceID", reviewID);
    
    

    // Perform the post review action or submit the form
    await axios.post(
      import.meta.env.VITE_BASE_URL + `/api/comments/create_comment/`,
      form,
    )
      .then(() => {
        toast.update(toastID.current, {
          render: "Reply successfully added!!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });
        console.log("FORM IN REVIEW MODAL")
        console.log(reviewID);
        setTitle("");
        setReview("");

        axios.get(
          import.meta.env.VITE_BASE_URL + `/api/comments/get_review_comments/${reviewID}`,
        )
          .then((res) => {
            setComments(res.data);
            console.log("GOT COMMENTS IN REVIEW MODAL")
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });


        setError(""); // Clear any previous error messages
        document.getElementById(`my_modal_${reviewID}`).close();
      })
      .catch((e) => {
        console.log(e);

        toast.update(toastID.current, {
          render: "Something went wrong!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "false",
        });
      });


    // const res = await fetch(
    //   import.meta.env.VITE_BASE_URL + "/api/posts/create_post",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(post),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );

    // const newReview = {
    //   name: "Lebron James",
    //   rating: rating,
    //   title: title,
    //   comment: review,
    //   date: "2023-10-22",
    //   userID: 1,
    //   icon: "../../../public/profile-pictures/sample.jpg",
    // };
    // addReviewToStore(newReview);
  };

  const handleCloseModal = () => {
    setTitle("");
    setReview("");
    document.getElementById(`my_modal_${reviewID}`).close();
  };

  return (
    <>
    <div className="ml-5 px-2 flex items-center justify-start w-full">
      <button
        className="btn  justify-center items-center flex w-[30%] bg-transparent border-2 hover:bg-transparent"
        onClick={() => document.getElementById(`my_modal_${reviewID}`).showModal()}
      >
        <img className="pr-2" src={Reply} alt="Location" />{" "}
        <h1 className="text-black">Reply</h1>
      </button>
      </div>

      <dialog id={`my_modal_${reviewID}`} className="modal">
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

          <div className=" bg-[#9C1A1D] divider w-full before:bg-[#FFF6EA] after:bg-[#FFF6EA]">

          </div>

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
          <div modal-action rounded-r-full>
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
