import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditPost(props) {
  const { openDialog, onClose, postInfo } = props;

  const checkFile = () => {
    if (postInfo) {
      if (postInfo?.fileTypes === "IMAGE") {
        return (
          <>
            <div
              className="flex items-center justify-center cursor-pointer"
              style={{ border: "1px solid #efefef" }}
            >
              <img
                src={`https://mxhld.herokuapp.com/v1/file/${postInfo?.file}`}
                alt="userpost"
                className="w-full object-cover "
                width="500px"
                style={{ height: "500px" }}
              />
            </div>
          </>
        );
      }
      if (postInfo?.fileTypes === "VIDEO") {
        return (
          <div className="flex items-center justify-center cursor-pointer bg-black ">
            <video className="w-full outline-none h-full " controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${postInfo?.file}`}
              />
            </video>
          </div>
        );
      }
      if (postInfo?.fileTypes === "AUDIO") {
        return (
          <div className=" items-center justify-center cursor-pointer">
            <img
              src="/assets/image/audio.png"
              className="h-full p-10"
              alt="nocaption"
            />
          </div>
        );
      }
    }
    return (
      <>
        <div className=" items-center justify-center cursor-pointer">
          <img
            src="/assets/image/no-pictures.png"
            className="h-full p-10"
            alt="nocaption"
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullWidth
        maxWidth="lg"
        height="400px"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <div className="flex items-center space-x-4">
            <Avatar
              alt="Remy Sharp"
              src={`https://mxhld.herokuapp.com/v1/image/${postInfo?.user?.avatar}`}
            />
            <Typography variant="h6">{postInfo?.user?.fullname}</Typography>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <div className=" shadow boder mb-5">{checkFile()}</div>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className=" boder border-2 mb-4">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Text"
                  style={{ width: 550, color: "#a5a5a5" }}
                  value={postInfo?.text || ""}
                  disabled
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Like"
                variant="outlined"
                disabled
                sx={{ marginBottom: "1rem" }}
                value={postInfo?.likes}
              />
              <TextField
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                disabled
                sx={{ marginBottom: "1rem" }}
                value={postInfo?.comments}
              />

              <TextField
                id="outlined-basic"
                label="DateCreate"
                variant="outlined"
                disabled
                sx={{ marginBottom: "1rem" }}
                value={postInfo?.createdAt}
              />
              <TextField
                id="outlined-basic"
                label="Reporers"
                variant="outlined"
                disabled
                sx={{ marginBottom: "1rem" }}
                value={postInfo?.reporters}
              />
            </Box>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus variant="contained" color="error" onClick={onClose}>
            Cancle
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
