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
import ListUserSearch from "./ListUserSearch";
import { ListComment } from "./../../../components/timeline/ListComment";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "tempTokens"]);
  const currentUser = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const history = useHistory();
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
          {/* <ListUserSearch /> */}
          {/* <ListComment /> */}
          <Timeline />
          <Sidebar currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default Home;
