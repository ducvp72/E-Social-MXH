import React from "react";
import Alert from "@mui/material/Alert";

export const ErrorAlert = ({ message }) => {
  return (
    <div>
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </div>
  );
};

export const SuccessAlert = () => {
  return (
    <div>
      <Alert variant="filled" severity="success">
        {/* This is a success alert — check it out! */}
      </Alert>
    </div>
  );
};
