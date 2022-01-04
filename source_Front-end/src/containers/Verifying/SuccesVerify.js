import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userApi } from "./../../axiosApi/api/userApi";
import { useDispatch } from "react-redux";
import { actLoginSuccess } from "./../../reducers/authReducer";
const SuccesVerify = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["tempTokens", "auth"]);
  const [query] = useState(new URLSearchParams(useLocation().search));
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    const tokens = query.get("token");
    if (tokens) {
      const resolveAfter = new Promise((resolve) => setTimeout(resolve, 3000));
      toast.promise(resolveAfter, {
        pending: {
          render() {
            return "Verifying your email...";
          },
          hideProgressBar: true,
          position: toast.POSITION.TOP_CENTER,
        },
        success: {
          render() {
            return "Successfully! Let's go to your Home page";
          },
          hideProgressBar: true,
          theme: "light",
          autoClose: 1000,
        },
      });

      verifyEmail({ token: tokens });
    } else {
      return;
    }
  }, [query]);

  const verifyEmail = async (token) => {
    try {
      await userApi.confirmMail(token);

      const resData = await userApi.getAuthentication(
        cookies.tempTokens.tokens.access.token
      );
      console.log("User after verifying email", resData.data);
      setCookie("auth", {
        ...cookies.tempTokens,
        user: { ...cookies.tempTokens.user, isEmailVerified: true },
      });
      removeCookie("tempTokens");
      dispatch(actLoginSuccess(resData.data));
      // history.push("/user/home");
      window.location.replace("/user/home");
    } catch (error) {
      return;
    }
  };
  return (
    <>
      <Helmet>
        <title>Vn-Social</title>
      </Helmet>
      <ToastContainer transition={Zoom} />
      <div className="bg-gray-background overflow-x-auto">
        <div className="bg-gray-500 block" style={{ marginTop: "2rem" }}></div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg "></div>
      </div>
    </>
  );
};

export default SuccesVerify;
