import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Timeline } from "./../../../components/timeline/timeline";
import { Sidebar } from "./../../../components/sidebar/sidebar";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { actLogout } from "./../../../reducers/authReducer";
import { userApi } from "./../../../axiosApi/api/userApi";
import { actLogoutConver } from "./../../../reducers/converReducer";
import { actLogoutMess } from "../../../reducers/messageReducer";
import { actLogoutFile } from "../../../reducers/fileReducer";
import { actLogoutMedia } from "../../../reducers/mediaReducer";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth",
    "tempTokens",
    "tokens",
    "rm_psw",
  ]);
  const currentUser = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    userApi
      .getAuthentication(cookies.auth.tokens.access.token)
      .then((rs) => {
        // console.log("CheckToken", rs);
        return;
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Your login session has expired",
          showConfirmButton: false,
          timer: 4000,
        });
        // history.replace("/");
        // window.location.href("/login");
        handlelogout();
      });
  }, []);

  const handlelogout = () => {
    try {
      // dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
      // dispatch(actLogoutConver());
      // dispatch(actLogoutMess());
      // dispatch(actLogoutFile());
      // dispatch(actLogoutMedia());
      localStorage.clear();
      removeCookie("auth", { path: "/" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(cookies.auth);
    if (cookies.auth)
      if (cookies.auth.user.isEmailVerified === true) {
        return;
      } else {
        userApi.verifyEmail(cookies.auth.tokens.access);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please verify your email before Login. Click ok to redirect Login page or you will redirect to home after 5s",
          timer: 5000,
          allowOutsideClick: false,
        }).then(() => {
          dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
          setCookie("tempTokens", cookies.auth);
          removeCookie("auth");
          history.push("/");
          return;
        });
      }
  }, []);

  return (
    <>
      <Helmet>
        <title>Vn-Social</title>
      </Helmet>
      <div className="bg-white overflow-x-auto">
        <div className="bg-white block" style={{ marginTop: "2rem" }}></div>
        <div className=" bg-white grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg ">
          <Timeline />
          <Sidebar currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default Home;
