import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import * as ROUTES from "./../routes/routes";
import { Alertverify } from "./../components/alert/alertverify";
import { verifyEmail, refresh } from "./../context/actions/register";
const EmailVerify = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "isVerify"]);
  const [showVerify, setShowVerify] = useState(true);
  let history = useHistory();

  useEffect(() => {
    // const userData = await getuser()
    console.log(cookies.isVerify);
    const getToken = () => {
      console.log("token", cookies.tokens);
      // console.log('token',cookies.tokens.access.token)
      // console.log("token before", cookies.tokens.access.token);
      verifyEmail(cookies.tokens.access);
      console.log("Thanh cong gui mai")
    };
    getToken();
  }, []);

  const refreshToken = async () => {
    console.log("check ham");
    try {
      //token refresh hien tai
      const resData = await refresh(cookies.tokens.refresh.token);
      setCookie("tokens", resData.tokens);
      console.log("token after", cookies.tokens);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Vn-Social</title>
      </Helmet>
      {/* <Notuser></Notuser> */}
      {showVerify && <Alertverify setShowVerify={setShowVerify}></Alertverify>}
      <div className="bg-gray-background overflow-x-auto">
        <div className="bg-gray-500 block" style={{ marginTop: "2rem" }}></div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg "></div>
      </div>
    </>
  );
};

export default EmailVerify;
