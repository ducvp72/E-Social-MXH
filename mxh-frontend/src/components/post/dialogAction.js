import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { postApi } from "./../../axiosApi/api/postApi";
import { useCookies } from "react-cookie";
import { toast, ToastContainer, Zoom } from "react-toastify";
export default function DialogActionPost(props) {
  const {
    setPopup,
    popup,
    onClose,
    open,
    state,
    item,
    getFirstPage,
    getUserPost,
    getSummary,
  } = props;
  const [cookies, ,] = useCookies("auth");
  const [status, SetStatus] = useState();

  useEffect(() => {
    checkStatus();
    return () => {
      SetStatus(null);
    };
  }, [state, item]);

  const checkStatus = () => {
    if (item) {
      SetStatus(item);
    } else {
      SetStatus(state);
    }
  };

  if (state) {
    console.log("states", state?.id);
  }

  const handleDelete = async () => {
    try {
      onClose();
      await postApi.deleteMyPost(cookies.auth.tokens.access.token, {
        postId: status?.id,
      });
      toast.success("You delete the post 😀", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
      });
      if (popup) {
        setPopup({ ...popup, isShow: false });
      }
      if (state) {
        await getUserPost();
        setTimeout(() => {
          getSummary();
        }, 1000);
      }

      if (item) {
        getFirstPage();
      }
    } catch (error) {
      onClose();
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <ToastContainer transition={Zoom} />
        <div className="w-64 divide-y divide-gray-300">
          {status?.user.userId === cookies.auth.user.id && (
            <>
              <div className=" cursor-pointer bg-gradient-to-r py-2 px-4  hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center">
                Edit
              </div>
              <div
                onClick={() => handleDelete()}
                className="cursor-pointer py-2 px-4  bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center"
              >
                Delete
              </div>
            </>
          )}

          <div className="cursor-pointer py-2 px-4  bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center">
            Report
          </div>
          <div
            onClick={onClose}
            className="  cursor-pointer py-2 px-4 bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-gray-700 text-lg font-medium text-center"
          >
            Cancle
          </div>
        </div>
      </Dialog>
    </>
  );
}

DialogActionPost.propTypes = {
  open: PropTypes.bool.isRequired,
};
