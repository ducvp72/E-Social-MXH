import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Picker from "emoji-picker-react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { postApi } from "./../../axiosApi/api/postApi";
import { useCookies } from "react-cookie";
import Loading from "./../../containers/LoadingPage/index";
import { useOnClickOutside } from "./../../utils/handleRefresh";
import { useSelector, useDispatch } from "react-redux";
import { setDialogCloseAll } from "../../reducers/changePostDialog";

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
  const dispatch = useDispatch();
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onConfirm ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            dispatch(setDialogCloseAll(false));
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

const ChangePost = (props) => {
  const {
    onClose,
    open,
    getFirstPage,
    getSummary,
    getUserPost,
    status,
    state,
    item,
    handleCloseCaro,
  } = props;
  const [inputStr, setInputStr] = useState([]);
  const [active, setActive] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const [confirm, setonConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, ,] = useCookies("auth");
  const [process, setProcess] = useState(0);

  const dispatch = useDispatch();
  useOnClickOutside(buttonRef, modalRef, () => setActive(false));

  useEffect(() => {
    //Nhan du lieu tu hook tam la status
    setInputStr(status?.text);
    // console.log("status data", status);
  }, [status]);

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

  const checkDisabled = (inputText, fileMedia) => {
    // console.log("FileMdia ", fileMedia);
    if (inputText?.length >= 1) {
      return false;
    }
    return true;
  };

  const onhandleSubmit = async () => {
    // console.log("UserImage", userImage);
    setLoading(true);
    postText();
    return;
  };

  const postText = async () => {
    try {
      await postApi.updateTextPost(
        cookies.auth.tokens.access.token,
        status?.id,
        inputStr
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
        handleCloseCaro();
      }

      //Gợi ở profile
      if (state) {
        await getUserPost();
        setTimeout(() => {
          getSummary();
        }, 1000);
      }

      //Gọi ở timeline
      if (item) {
        getFirstPage();
      }

      setInputStr(null);
      dispatch(setDialogCloseAll());
    } catch (error) {
      setLoading(false);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(setDialogCloseAll());
      handleCloseCaro();
    }
  };

  const checkFile = () => {
    if (status) {
      if (status?.fileTypes === "IMAGE") {
        return (
          <div className="flex justify-center h-full">
            <img
              src={`https://mxhld.herokuapp.com/v1/file/${status?.file}`}
              alt="userpost"
              className="w-full object-cover "
            />
          </div>
        );
      }
      if (status?.fileTypes === "VIDEO") {
        return (
          <div
            style={{ border: "1px solid #91a3b0" }}
            className="flex justify-center bg-black "
          >
            <video
              style={{
                height: "550px",
              }}
              className="w-full focus:outline-none"
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${status?.file}`}
              />
            </video>
          </div>
        );
      }
      if (status?.fileTypes === "AUDIO") {
        return (
          <div className="flex h-full w-full justify-center items-center bg-gradient-to-r from-green-400 via-yellow-500 to-pink-500">
            <audio
              className="w-4/5 focus:outline-none"
              src={`https://mxhld.herokuapp.com/v1/file/${status?.file}`}
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${status?.file}`}
              />
            </audio>
          </div>
        );
      }
    }
    return (
      <div className="flex justify-center h-full">
        <img
          src="/assets/image/no-pictures.png"
          alt="userpost"
          className="w-full object-cover p-24"
        />
      </div>
    );
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
            <div className="flex-1"></div>
            <div className="flex-none">
              <p className="text-mygrey font-medium text-2xl">
                Change your post
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
                Edit
              </button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default ChangePost;
