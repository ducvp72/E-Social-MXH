import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { refresh, confirmMail } from "./../context/actions/register";
import * as ROUTES from "./../routes/routes";
import { Alertverify } from "./../components/alert/alertverify";
import Alert from "@mui/material/Alert";
import { LocalDining } from "@mui/icons-material";
const SuccesVerify = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "isVerify"]);
  const [showVerify, setShowVerify] = useState(true);
  const [query] = useState(new URLSearchParams(useLocation().search));
  const [message, setMessage] = useState({ status: "IDE", msg: "" });
  const [loginCheck, setShowLogin] = useState({ isShow: false, errMsg: "" });
  let history = useHistory();

  useEffect(() => {
    const token = query.get("token");
    if (token) {
      setMessage({ status: "Loading", msg: "Loading" });
      verifyEmail(token);
      setTimeout(() => {
        history.push(ROUTES.HOME);
      }, 4000);
    } else {
      history.push(ROUTES.HOME);
    }
  }, [query]);

  const verifyEmail = async (token) => {
    try {
      console.log(message);
      await confirmMail(token);
      setCookie("isVerify", "true");
      setMessage({ status: "success", msg: "xac nhan mail thanh cong" });
      // setTimeout(() => {
      //   history.replace(ROUTES.HOME)
      // }, 2000);
    } catch (err) {
      console.log("err");
      setMessage({ status: "error", msg: "xac nhan mail that bai" });
    }
  };

  const loadMessage = () => {
    switch (message.status) {
      case "loading":
        return <Alert severity="info">{message.msg}</Alert>;
      case "error":
        return <Alert severity="error">{message.msg}</Alert>;
      case "success":
        return <Alert severity="success">{message.msg}</Alert>;
      default:
        return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Vn-Social</title>
      </Helmet>
      <div className="">{loadMessage()}</div>
      <div className="bg-gray-background overflow-x-auto">
        <div className="bg-gray-500 block" style={{ marginTop: "2rem" }}></div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg "></div>
      </div>
    </>
  );
};

export default SuccesVerify;
