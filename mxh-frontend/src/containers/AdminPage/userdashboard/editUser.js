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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Swal from "sweetalert2";
import { adminApi } from "./../../../axiosApi/api/adminApi";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";

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

export default function EditUser(props) {
  const { openDialog, onClose, user } = props;
  const [userInfo, setuserInfo] = useState(user);
  const [block, setUnblock] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["auth"]);
  useEffect(() => {
    return () => {
      setuserInfo(user);
    };
  }, [user]);
  const handleBlock = async (userID) => {
    console.log("auth", cookies.auth.tokens.access.token);
    try {
      await adminApi.blockUser(cookies.auth.tokens.access.token, userID);
      if (user.isBlocked === false) {
        setUnblock(true);
        onClose();
        Swal.fire({
          icon: "success",
          title: "User have been block",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setUnblock(false);
        onClose();
        Swal.fire({
          icon: "success",
          title: "UnBlock the User",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <div className="flex items-center space-x-4">
            <Avatar
              alt="Remy Sharp"
              src={`https://mxhld.herokuapp.com/v1/image/${user.avatar}`}
            />
            <Typography variant="h6">{userInfo.fullname}</Typography>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              value={user.email}
            />

            <TextField
              id="outlined-basic"
              label="Confirm Mail"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              value={user.isEmailVerified}
            />

            <TextField
              id="outlined-basic"
              label="Phone"
              disabled
              variant="outlined"
              sx={{ marginBottom: "1rem" }}
              value={user.phone}
            />
            <TextField
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              value={user.birthday}
            />
            <TextField
              id="outlined-basic"
              label="Posts"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Followers"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              // value={user.follower}
            />

            <TextField
              id="outlined-basic"
              label="Followings"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              // value={user.follower}
            />

            <TextField
              id="outlined-basic"
              label="DateCreate"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              value={user.createdAt}
            />
            <TextField
              id="outlined-basic"
              label="Reporers"
              variant="outlined"
              disabled
              sx={{ marginBottom: "1rem" }}
              // value={user.follower}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                defaultValue={user.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  disabled
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  disabled
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color={block ? "info" : "warning"}
            onClick={() => {
              handleBlock(user.id);
            }}
          >
            {block ? "UnBlock" : "Block"}
          </Button>
          <Button autoFocus variant="contained" color="error" onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
