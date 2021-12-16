import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { postApi } from "./../../axiosApi/api/postApi";
import { useCookies } from "react-cookie";
import { toast, ToastContainer, Zoom } from "react-toastify";
import ChangePost from "./../changePost/index";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogChange,
  setDialogCloseAll,
} from "./../../reducers/changePostDialog";

export default function DialogActionPost(props) {
  const {
    onClose,
    open,
    state,
    item,
    getFirstPage,
    getUserPost,
    getSummary,
    handleCloseCaro,
  } = props;
  const [cookies, ,] = useCookies("auth");
  const openChangePost = useSelector((state) => state.changePost);
  const [status, SetStatus] = useState();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(
  //     "dialog render",
  //     item,
  //     status?.user.userId,
  //     cookies.auth.user.id
  //   );
  // }, []);

  useEffect(() => {
    checkStatus();
    // return () => {
    //   SetStatus();
    // };
  }, [state, item]);

  const checkStatus = () => {
    if (item) {
      console.log("item heee", item);
      SetStatus(item);
      return;
    } else {
      console.log("state here");
      SetStatus(state);
    }
  };

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

      if (state) {
        await getUserPost();
        setTimeout(() => {
          getSummary();
        }, 1000);
        handleCloseCaro();
      }

      if (item) {
        getFirstPage();
      }

      //Dong cua sổ
      dispatch(setDialogCloseAll());
    } catch (error) {
      onClose();
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
      handleCloseCaro();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <ChangePost
          open={openChangePost.showChange}
          status={status}
          getFirstPage={getFirstPage}
          getUserPost={getUserPost}
          getSummary={getUserPost}
          handleCloseCaro={handleCloseCaro}
        />
        <ToastContainer transition={Zoom} />
        <div className="w-64 divide-y divide-gray-300">
          {status?.user.userId === cookies.auth.user.id && (
            <>
              {state && (
                <div
                  onClick={() => dispatch(setDialogChange(true))}
                  className=" cursor-pointer bg-gradient-to-r py-2 px-4  hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center"
                >
                  Edit
                </div>
              )}

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
            onClick={() => dispatch(setDialogCloseAll())}
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
