import React from "react";
import Button from "@material-tailwind/react/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
const alertConfirm = () => {
  return (
    <div className="right-1/2 left-1/2 top-1/2 absolute z-50 bg-green-700 cursor-pointer">
      <Dialog
        //   open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Disagree</Button>
          <Button autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default alertConfirm;
