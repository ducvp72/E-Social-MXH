import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userApi } from "./../../axiosApi/api/userApi";

const EmailVerify = () => {
  const [cookies] = useCookies(["tempTokens"]);
  let history = useHistory();
  useEffect(() => {
    userApi.verifyEmail(cookies.tempTokens.tokens.access.token);
    const resolveAfter = new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(resolveAfter, {
      pending: {
        render() {
          return "Sending verify to your email...";
        },
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
      },
      success: {
        render() {
          return "Successfully. Please verifying email before login!";
        },
        hideProgressBar: true,
        theme: "light",
        autoClose: 1000,
      },
    });

    setTimeout(() => {
      toast.info("Redirect to Login page in a few second", {
        appendPosition: true,
        enter: "zoomOut",
        autoClose: false,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        pauseOnFocusLoss: false,
        onOpen: () => {
          setTimeout(() => {
            history.replace("/");
          }, 3000);
        },
      });
    }, 4500);
  }, []);

  return (
    <>
      <Helmet>
        <title>Vn-Social</title>
      </Helmet>
      {/* {showVerify && <Alertverify setShowVerify={setShowVerify}></Alertverify>} */}
      <ToastContainer transition={Zoom} />
      <div className="bg-gray-background overflow-x-auto">
        <div className="bg-gray-500 block" style={{ marginTop: "2rem" }}></div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg "></div>
      </div>
    </>
  );
};

export default EmailVerify;
