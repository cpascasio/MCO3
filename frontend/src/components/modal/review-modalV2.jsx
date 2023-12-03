import React, { useRef, useState } from "react";
import Rating from "../rating";
import addReview from "../../assets/addrev.svg";
import { useUserContext } from "../../../hooks/useUserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";


// Export the ReviewModalV2 component at the top level
export default function ReviewModalV2({ setStoreReviews, storeID }) {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  

  const fileRef = useRef(null);
  const toastID = useRef(null);

  useEffect(() => {
    console.log("FILEINPUT");
    console.log(fileRef.current);
    console.log(file)

    }, [fileRef]);


  // Event handler to update selected stars
  const handleRatingChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setRating(selectedValue);
  };

  // Function to handle deleting the selected media
  const handleDeleteMedia = () => {
    fileRef.current.value = null; // Clear the file input
    setFile(null); // Clear the file state

  };

  const handlePostReview = async (event) => {
    // Check if both title and review are provided
    event.preventDefault();
    if (title.trim() === "" || review.trim() === "") {
      toast("Please provide a review and title", {
        type: "error",
      });
      return;
    }

    // Check if a file is selected
    const selectedFile = fileRef.current.files[0];
    console.log("Selected File:", selectedFile);

    const form = new FormData();

    // Display loading notification
    toastID.current = toast.loading("Uploading review now...");

    form.append("rating", rating);
    form.append("title", title);
    form.append("body", review);
    form.append("userID", user.id);
    form.append("storeID", storeID);
    form.append("img", selectedFile);
    
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
        "Content-Type": "multipart/form-data",
      },
    };

    // Perform the post review action or submit the form
    await axios
      .post(import.meta.env.VITE_BASE_URL + "/api/posts/create_post", form, config)
      .then(() => {
        toast.update(toastID.current, {
          render: "Review successfully added!!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });
        setTitle("");
        setReview("");
        setRating(5);
        setFile(null);


        axios
          .get(
            import.meta.env.VITE_BASE_URL + `/api/posts/get_store_posts/${storeID}`
          )
          .then((res) => {
            setStoreReviews(res.data);
            console.log("GOT STORE REVIEWS IN REVIEW MODAL");
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        setError(""); // Clear any previous error messages
        setFile(null);
        setRating(5);
        setTitle("");
        setReview("");
        fileRef.current.value = null;
        
        document.getElementById("my_modal_1").close();
      })
      .catch(() => {
        toast.update(toastID.current, {
          render: "Something went wrong!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "false",
        });
      });
  };

  const handleCloseModal = () => {
    setTitle("");
    setReview("");
    setRating(5);
    setFile(null);
    fileRef.current.value = null;


    document.getElementById("my_modal_1").close();
  };

  // Return the JSX code outside the `handlePostReview` function
  return (
    <>



      <button
        className="btn mt-5 flex w-[45%] bg-[#D62300] hover:bg-[#992710] text-white font-bold py-2 px-4 items-center justify-center border-none"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <img className="pr-2" src={addReview} alt="Location" />{" "}
        <h1 className="text-[#F9C8C8]">Add Review</h1>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div
          className="modal-box"
          style={{ backgroundColor: "#f0e6d7", maxWidth: "45rem" }}
        >
          <h3
            className="font-bold text-lg"
            style={{ color: "black", marginBottom: "10px" }}
          >
            Write a Review
          </h3>

          <Rating
            backgroundColor={"#f0e6d7"}
            handleRatingChange={handleRatingChange}
          />
          <p>{rating} stars are highlighted.</p>
          <div className=" bg-[#f0e6d7] divider w-full before:bg-[#885133] after:bg-[#885133]"></div>

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

          {/* Display selected media */}
          {file && (
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <img
                src={URL.createObjectURL(fileRef.current.files[0])}
                alt="Selected Media"
                style={{ width: '450px' }}
              />
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={handleDeleteMedia}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: '#885133',
                  color: 'white',
                }}
              >
                X
              </button>
            </div>
          )}

          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
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
            <label htmlFor="mediaInput" style={{ cursor: "pointer" }}>
              <img
                src="../../../public/assets/add-media.svg"
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
                const selectedFile = event.target.files[0];
                setFile(selectedFile);
                console.log("ADDED FILE ACKNOWLEDGED");
              }
              }

              style={{ display: "none" }}
            />
          </button>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn rounded-l-none"
                style={{
                  backgroundColor: "#885133",
                  color: "white",
                  borderColor: "#885133",
                }}
                onClick={(event) =>  user ? handlePostReview(event) : null}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
