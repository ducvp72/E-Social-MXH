import React from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const SinginToContinue = () => {
  let history = useHistory();
  React.useEffect(() => {
    toast.warn("Please Login to continue !", {
      appendPosition: true,
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      hideProgressBar: false,
      pauseOnFocusLoss: false,
    });
    setTimeout(() => {
      history.replace("/");
    }, 2500);
  }, [history]);

  return (
    <div>
      <ToastContainer transition={Zoom} />
    </div>
  );
};

export default SinginToContinue;
