import React from "react";
import "./syles.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/routes";

const myStyles = makeStyles((theme) => ({
  "MuiPaper-root": {
    overflow: "hidden",
  },
  red: {
    color: "#fd1013",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Notuser = () => {
  const classes = myStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div
      className="post-show fixed w-full h-screen opacity-80 z-40 top-0 left-0 flex justify-center items-center"
      style={{ backgroundColor: "#7d7d7d" }}
    >
      <Dialog
    //   style={classes["MuiPaper-root"]}
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        overflow="hidden"
      >
        <DialogTitle>
          <span className=" font-black text-blue-500">Thông báo</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span className=" font-medium text-red-500">
              Opp...! Bạn vui lòng đằng nhập hoặc đăng ký để truy cập website !
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={ROUTES.SIGNUP} arial-label="Vn-Social logo>">
              <div className="p-4">
                <button className="p-2 shadow-2xl rounded-sm transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 text-white transform hover:-translate-y-1 hover:scale-110">
                  <span className="">Đăng ký</span>
                </button>
              </div>
          </Link>
          <Link to={ROUTES.SIGNIN} arial-label="Vn-Social logo>">
              <div className="pr-2">
                <button className=" p-2  shadow-2xl rounded-sm transition duration-500 ease-in-out bg-green-500 hover:bg-red-600 text-white transform hover:-translate-y-1 hover:scale-110">
                  <span className="">Đăng nhập</span>
                </button>
              </div>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};
