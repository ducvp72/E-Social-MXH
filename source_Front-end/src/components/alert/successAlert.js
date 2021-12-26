import React from "react";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  myStyle: {
    "&.MuiPaper-root": {
      background: "#fff",
      "& > .MuiAlert-message": {
        "& > p": {
          // nhung p sau cai class
          color: "#61b865",
          fontWeight: "bold",
        },
      },
    },
  },
}));

const SuccessAlert = () => {
  const classes = useStyles();
  return (
    <>
      <div
        className="post-show fixed w-full h-full opacity-10 z-40 top-0 left-0 bottom-0 flex justify-center items-center"
        style={{ background: "#fff" }}
      >
        <div className=" flex justify-center items-center justify-items-center rounded-full bg-none "></div>
      </div>

      <div className="fixed z-50  transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div
          className="p-2 border-2  border-green-700 border-opacity-50 rounded-md"
          style={{ backgroundColor: "white" }}
        >
          <Alert severity="success" className={classes.myStyle}>
            <p className=" font-semibold text-md">Save</p>
          </Alert>
        </div>
      </div>
    </>
  );
};

export default SuccessAlert;
