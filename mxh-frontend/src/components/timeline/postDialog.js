import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Picker from "emoji-picker-react";
import "./postshow.css";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useOnClickOutside } from "./../../utils/handleRefresh";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { toast, ToastContainer, Zoom } from "react-toastify";
import Loading from "./../../containers/LoadingPage/index";
import { postApi } from "./../../axiosApi/api/postApi";
import { useCookies } from "react-cookie";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "450px",
  },
  "& .MuiPaper-root": {
    overflow: "hidden",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, onConfirm, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onConfirm ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            // onClose();
            onConfirm();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 30,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const PostDialog = (props) => {
  const { onClose, open, getFirstPage, getSummary, getUserPost } = props;
  const [inputStr, setInputStr] = useState([]);
  const [active, setActive] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.data);
  const hiddenFileInput = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const [confirm, setonConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, ,] = useCookies("auth");
  const [process, setProcess] = useState(0);

  useOnClickOutside(buttonRef, modalRef, () => setActive(false));

  const getProcess = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percent = Math.round((loaded / total) * 100 * 100) / 100;
    setProcess(percent);
  };

  const onEmojiClick = (e, emojiObject) => {
    if (inputStr?.length >= 2200) {
      return;
    }
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setActive(false);
  };

  const handleInput = (event) => {
    if (event.target.value?.length >= 2200) {
      return;
    }
    setInputStr(event.target.value);
  };

  const handleConfirm = () => {
    setonConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSelectedImage(null);
    setUserImage(null);
    setInputStr(null);
    setonConfirm(false);
    onClose();
  };

  const handleCloseConfirmSave = () => {
    setonConfirm(false);
    onClose();
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const imageFileHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setUserImage(window.URL.createObjectURL(event.target.files[0]));
  };

  const delelteCurrentImage = () => {
    setSelectedImage(null);
    setUserImage(null);
    document.getElementById("fileChoosen").value = "";
  };

  const checkDisabled = (inputText, fileMedia) => {
    // console.log("FileMdia ", fileMedia);
    if (inputText?.length >= 1) {
      return false;
    }
    return true;
  };

  const FormData = require("form-data");

  const onhandleSubmit = async () => {
    // console.log("UserImage", userImage);
    setLoading(true);
    if (!userImage) {
      postText();
      getFirstPage();

      return;
    } else {
      await postMedia();
      getFirstPage();
    }
  };

  const postText = async () => {
    try {
      await postApi.createPostTest(
        cookies.auth.tokens.access.token,
        {
          text: inputStr,
        },
        getProcess
      );
      setLoading(false);
      toast.success("Let's see your post 😀", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
      });
      if (getUserPost) {
        await getUserPost();
        setTimeout(() => {
          getSummary();
        }, 1000);
      }
      setInputStr(null);

      onClose();
    } catch (error) {
      setLoading(false);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };
  const postMedia = async () => {
    try {
      let formData = new FormData();
      formData.append("text", inputStr);
      formData.append("file", selectedImage);
      await postApi.createPost(
        cookies.auth.tokens.access.token,
        formData,
        getProcess
      );
      setLoading(false);
      toast.success("Let's see your post 😀", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
      });
      if (getUserPost) {
        await getUserPost();
        setTimeout(() => {
          getSummary();
        }, 1000);
      }
      setInputStr(null);
      delelteCurrentImage();
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const checkFile = () => {
    if (userImage) {
      if (
        selectedImage?.type === "image/jpeg" ||
        selectedImage?.type === "image/png" ||
        selectedImage?.type === "image/gif"
      ) {
        return (
          <img
            style={{
              width: "550px",
              height: "550px",
            }}
            src={userImage}
            alt="img"
            className="z-30"
          />
        );
      }
      if (selectedImage?.type === "video/mp4") {
        return (
          <video
            style={{
              width: "550px",
              height: "550px",
            }}
            className="z-30"
            controls
          >
            <source src={userImage} />
          </video>
        );
      }
      if (
        selectedImage?.type === "audio/ogg" ||
        selectedImage?.type === "audio/mpeg" ||
        selectedImage?.type === "audio/mp3"
      ) {
        return (
          <audio className=" flex w-4/5  items-center z-30 " controls>
            <source src={userImage} />
          </audio>
        );
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <ToastContainer transition={Zoom} />
      <BootstrapDialog
        maxWidth="lg"
        height="600px"
        open={open}
        aria-labelledby="customized-dialog-title"
      >
        <div className="z-50"> {loading && <Loading process={process} />}</div>
        {
          <div className="right-1/2 left-1/2 top-1/2 absolute z-50 bg-green-700 cursor-pointer">
            <Dialog
              open={confirm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you want sure to cancle ?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleCloseConfirmSave();
                  }}
                >
                  Close but save status
                </Button>
                <Button
                  onClick={() => {
                    handleCloseConfirm();
                  }}
                  variant="contained"
                  color="error"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setonConfirm(false);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onConfirm={handleConfirm}
        >
          <div className=" z-30 flex justify-center items-center justify-items-center ">
            <div className="flex-1">
              {userImage && (
                <button
                  className="bg-red-500 rounded-md  focus:outline-none
              transform hover:translate-y-1 transition-all duration-700"
                  onClick={() => delelteCurrentImage()}
                >
                  <p className="p-1 text-white text-base font-medium">
                    Delete File
                  </p>
                </button>
              )}
            </div>
            <div className="flex-none">
              <p className="text-mygrey font-medium text-2xl">
                Create new post
              </p>
            </div>
            <div className="flex-1"></div>
          </div>
        </BootstrapDialogTitle>

        <div className="grid grid-cols-5 gap-0.5">
          <div
            className={`${
              selectedImage?.type === "video/mp4" && "bg-black"
            } col-span-3 border-2 border-light-gray-700`}
          >
            <div
              style={{
                width: "550px",
                height: "550px",
              }}
              className="flex justify-center items-center"
            >
              {checkFile()}

              <div className="absolute z-20">
                <button
                  onClick={handleClick}
                  className={`${
                    selectedImage && "hidden"
                  } mr-2 cursor-pointer border-2 border-gray-400 bg-white p-1 rounded-md text-gray-400 font-medium`}
                >
                  Upload a file
                </button>
                <input
                  className=" hidden cursor-pointer left-0 top-1  font-medium absolute text-blue-500 text-sm "
                  type="file"
                  // accept="image/*,/video/mp4,video/x-m4v,video/*"
                  accept="video/*,audio/*,image/gif,image/jpeg,image/png,.gif,.jpeg,.jpg,.png"
                  onChange={imageFileHandler}
                  id="fileChoosen"
                  ref={hiddenFileInput}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 border-2 border-light-gray-700 divide-y-2">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "5px",
              }}
            >
              <div className="flex items-center mt-2 ">
                <img
                  className="rounded-full h-10 w-10 mr-3"
                  src={`https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`}
                  alt=""
                />
                <div className="flex-1 pr-4 flex items-center justify-between">
                  <Link
                    to={`/user/${currentUser?.fullname.replaceAll(" ", ".")}`}
                  >
                    <p className="font-bold text-md">username</p>
                  </Link>
                </div>
              </div>
              <textarea
                placeholder="what are you thinking?"
                cols=""
                rows="8"
                className=" resize-none boder-2 mt-2 font-normal text-lg text-black focus:outline-none"
                value={inputStr || ""}
                onChange={handleInput}
                maxLength={2200}
              />
              <div className="flex justify-between items-center">
                <img
                  className="rounded w-7 h-7 cursor-pointer"
                  src={"/assets/image/emoji.png"}
                  alt="emokiimg"
                  onClick={() => setActive(!active)}
                  ref={buttonRef}
                />
                <p className="text-gray-400 text-xs font-semibold">
                  {inputStr?.length}/2,200
                </p>
              </div>
              {active ? (
                <div
                  ref={modalRef}
                  className="absolute top-2/4 z-50 transform translate-y-20"
                >
                  <Picker
                    onEmojiClick={onEmojiClick}
                    disableSearchBar={true}
                    pickerStyle={{ width: "100%" }}
                  />
                </div>
              ) : null}
            </Box>
            <div className=" flex p-2 mb-2">
              <button
                type="button"
                className={`${
                  checkDisabled(inputStr, userImage) && "opacity-25"
                } 
           w-full p-2 bg-primarycolor rounded-full text-white font-bold uppercase text-lg  transform hover:translate-y-1 transition-all duration-700`}
                disabled={checkDisabled(inputStr, userImage)}
                onClick={() => {
                  onhandleSubmit();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default PostDialog;
