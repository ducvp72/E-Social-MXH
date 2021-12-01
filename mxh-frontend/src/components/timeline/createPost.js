import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Picker from "emoji-picker-react";
import "./postshow.css";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CircularStatic from "./../../containers/LoadingPage/upfileLoading";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 50,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CreatePost = (props) => {
  const { onClose, open } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [uploadFile, setUploadFile] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const onhandleSubmit = () => {
    alert("Click");
    // if (showPicker) {
    //   setShowPicker(false);
    // }
    // setUploadFile(!uploadFile);
    // setTimeout(() => {
    //   setUploadFile(false);
    // }, 1500);
  };

  const checkDisabled = (inputText, imgBool) => {
    if (inputText.length < 1) {
      if (!imgBool) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div>
      <BootstrapDialog open={open} aria-labelledby="customized-dialog-title">
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <div className=" z-50 flex text-mygrey justify-center items-center justify-items-center  font-medium text-2xl">
            Create your post
          </div>
        </BootstrapDialogTitle>
        {uploadFile && <CircularStatic />}
        {/* <form className="overflow-hidden"> */}
        <DialogContent dividers>
          <textarea
            placeholder="what are you thinking?"
            cols="58"
            rows="4"
            className=" font-normal text-lg text-black focus:outline-none"
            value={inputStr || ""}
            onChange={(e) => setInputStr(e.target.value)}
          />

          {showPicker ? (
            <div className=" post-show flex justify-center bg-gray-400 w-full mb-2">
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{ width: "100%" }}
              />
            </div>
          ) : null}

          {showMedia && (
            <div className="post-show flex justify-center w-full mt-2 mb-2 border border-gray-200  rounded-sm ">
              <img
                src={"/assets/person/lam5.png"}
                alt="filemdia"
                className="w-full h-96 p-2"
              />
            </div>
          )}
        </DialogContent>
        <BootstrapDialogTitle id="customized-dialog-title">
          <div className="flex justify-end">
            <div className=" flex space-x-2">
              <img
                className="rounded w-8 cursor-pointer"
                src={"/assets/image/picture.png"}
                alt="imgpost"
                onClick={() => setShowMedia(!showMedia)}
              />
              <img
                className="rounded w-8 cursor-pointer"
                src={"/assets/image/emoji.png"}
                alt="emokiimg"
                onClick={() => setShowPicker(!showPicker)}
              />
            </div>
          </div>
        </BootstrapDialogTitle>

        <div className=" flex p-2 mb-2">
          <button
            type="button"
            className={`${checkDisabled(inputStr, showMedia) && "opacity-25"} 
           w-full p-2 bg-primarycolor rounded-full text-white font-bold uppercase text-lg  transform hover:translate-y-1 transition-all duration-700`}
            disabled={checkDisabled(inputStr, showMedia)}
            onClick={() => {
              onhandleSubmit();
            }}
          >
            Post
          </button>
        </div>
        {/* </form> */}
      </BootstrapDialog>
    </div>
  );
};

export default CreatePost;
