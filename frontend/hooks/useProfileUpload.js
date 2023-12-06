import { toast } from "react-toastify";
import axios from "axios";
import { useRef, useState } from "react";
import { useUserContext } from "./useUserContext";

const useProfileUpload = () => {
  const toastID = useRef(null);
  const { user } = useUserContext();


  const uploadPhoto = (form, setModal, setRefetch) => {

    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`, // Replace with your actual access token
        "Content-Type": "multipart/form-data",
      },
    };



    toastID.current = toast.loading("Uploading changes now...");
    axios.post(import.meta.env.VITE_BASE_URL + "/api/users/update_image", form, config)
      .then(() => {
        toast.update(toastID.current, {
          render: "Profile successfully updated!",
          autoClose: 3000,
          closeButton: true,
          isLoading: false,
          type: "success",
        });
        setModal(false);
        setRefetch((r) => !r);
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

  return { uploadPhoto };
};

export default useProfileUpload;
