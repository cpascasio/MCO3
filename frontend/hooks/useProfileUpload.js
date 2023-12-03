import { toast } from "react-toastify";
import axios from "axios";
import { useRef, useState } from "react";

const useProfileUpload = () => {
  const toastID = useRef(null);

  const uploadPhoto = (form, setModal, setRefetch) => {
    toastID.current = toast.loading("Uploading changes now...");
    axios.post(import.meta.env.VITE_BASE_URL + "/api/users/update_image", form)
      .then(() => {
        toast.update(toastID.current, {
          render: "Photo successfully updated!",
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
