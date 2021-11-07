import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Timeline } from "./../../../components/timeline/timeline";
import { Sidebar } from "./../../../components/sidebar/sidebar";
import { Notuser } from "../../../components/alert/notuser";
import { useCookies } from "react-cookie";
import { verifyEmail, refresh } from "./../../../context/actions/register";
import { Alertverify } from "./../../../components/alert/alertverify";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../../routes/routes";
import { useSelector } from "react-redux";
const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "isVerify"]);

  const [showVerify, setShowVerify] = useState(false);
  let history = useHistory();
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    console.log("test", currentUser);
    if (currentUser)
      if (currentUser.isEmailVerified === true) {
        setShowVerify(false);
      } else {
        const getToken = () => {
          verifyEmail(cookies.tokens.access);
        };
        getToken();
        setShowVerify(true);
      }
  }, [currentUser]);

  useEffect(() => {
    if (cookies.tokens) {
    } else {
      history.push(ROUTES.SIGNIN);
    }
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
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg ">
          <Timeline />
          <Sidebar currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default Home;
