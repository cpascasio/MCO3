import React, { useRef, useState } from "react";
import useProfileUpload from "../../../hooks/useProfileUpload";

const EditProfile = ({ imageSrc, userId, setRefetch, descriptionDefault }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(descriptionDefault);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const { uploadPhoto } = useProfileUpload();
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handlePostReview = () => {
    // Check if both title and review are provided
    // Perform the post review action or submit the form
    setError(""); // Clear any previous error messages

    const form = new FormData();

    form.append("userId", userId);
    if (fileInputRef.current.value !== "") {
      console.log(userId);
      form.append("img", image);
    }
    form.append("description", description);
    // Reset the file input value
    uploadPhoto(form, setOpen, setRefetch);
  };

  const closeModal = () => {
    setOpen(false);
    fileInputRef.current.value = "";
  };

  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };

  return (
    <>
      {!open && (
        <button
          className="btn"
          style={{
            background: "#885133",
            color: "white",
            position: "absolute",
            top: "2rem",
            right: "1.5rem",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit Profile
        </button>
      )}
      {open && (
        <div className="w-full h-screen fixed flex justify-center items-center z-10">
          <div
            className="w-full h-screen absolute bg-black/50 z-20"
            onClick={closeModal}
          />
          <div
            className="z-30 rounded-lg p-5"
            style={{ backgroundColor: "#f0e6d7", maxWidth: "45rem" }}
          >
            <h3
              className="font-bold text-lg"
              style={{ color: "black", marginBottom: "10px" }}
            >
              Edit Profile
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="profile-icon-edit-modal"
                alt="Profile icon"
                src={imageSrc}
                style={{
                  borderRadius: "50%",
                  borderColor: "#9c1a1d",
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  position: "relative",
                  marginBottom: "0.5rem",
                }}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="file-input file-input-ghost w-full max-w-xs"
              style={{ color: "#885133", marginBottom: "2rem" }}
              onChange={handleFileChange}
            />
            <textarea
              className="textarea w-full"
              placeholder="Add description..."
              style={{
                backgroundColor: "#f4f0ec",
                overflow: "auto",
                height: "200px",
                color: "black",
                resize: "none",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#885133",
                    color: "white",
                    borderColor: "#885133",
                  }}
                  onClick={handlePostReview}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
