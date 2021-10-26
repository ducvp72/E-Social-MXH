import React from "react";
import "./syles.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@mui/styles";

const myStyles = makeStyles((theme) => ({
  red: {
    color: "#fd1013",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Alertverify = (props) => {
  const {setShowVerify} = props
  const classes = myStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div
      className="post-show  fixed w-full h-screen opacity-80 z-40 top-0 left-0 flex justify-center items-center"
      style={{ backgroundColor: "#7d7d7d" }}
    >
      <Dialog
        // onClose={() => setOpen(false)}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <LinearProgress
          variant="indeterminate"
          className={classes.red}
          color="error"
        />
        <DialogTitle>
          <span className=" font-black text-red-500">Thông báo</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span className=" font-medium text-red-500">
              Bạn vui lòng Email đã đăng ký để xác nhận tài khoản nhé !
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="p-4">
            <button onClick={()=>setShowVerify(false)} className="p-2 shadow-2xl rounded-sm transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 text-white transform hover:-translate-y-1 hover:scale-110">
              <span className="">Đóng</span>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
