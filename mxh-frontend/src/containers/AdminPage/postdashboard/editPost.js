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
  console.log("Post", postInfo);
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullWidth
        maxWidth="lg"
        height="600px"
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
              <div className=" shadow boder">
                <img
                  alt="anh2"
                  // src={`https://mxhld.herokuapp.com/v1/image/${params.row.user.avatar}`}
                  src={`/assets/image/defaultAvatar.png`}
                  className="object-cover p-5"
                  width="480px"
                  style={{ height: "480px" }}
                />
              </div>
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
