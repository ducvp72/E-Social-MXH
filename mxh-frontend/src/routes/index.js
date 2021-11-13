import React from "react";
import Home from "./../containers/HomePage/home/Home";
import Profile from "../containers/AccountPage/profile/profile";
import NotFound from "../containers/error/Error";
import Login from "./../containers/HomePage/home/Login";
import Adminpassword from "./../containers/AdminPage/adminpassword/adminpassword";
import Loading from "./../containers/LoadingPage/index";
import EmailVerify from "./../containers/Verifying/EmailVerify";
import SuccesVerify from "./../containers/Verifying/SuccesVerify";
import Welcomeadmin from "./../containers/AdminPage/adminControler/welcomeadmin";
import Postdashboard from "./../containers/AdminPage/postdashboard/postdashboard";
import { NewPassword } from "./../containers/AuthPage/forgot/newPassword";
import Userdasboard from "./../containers/AdminPage/userdashboard/userdasboard";
import * as ROUTES from "../routes/instant/routes";
export const routeHomePage = [
  {
    exact: true,
    path: ROUTES.HOME,
    component: Home,
  },
  {
    exact: false,
    path: `/profile/:username`,
    component: Profile,
  },
  {
    exact: false,
    path: `/:username/:postID`,
  },
  {
    exact: false,
    path: ROUTES.NOT_FOUND,
    component: NotFound,
  },
];

export const routeAcountPage = [
  {
    exact: false,
    path: `/profile/:username`,
    component: Profile,
  },
  {
    exact: false,
    path: `/:username/:postID`,
    component: Loading,
  },
];

export const routeAuthPage = [
  {
    exact: false,
    path: ROUTES.SIGNUP,
    component: Login,
  },
  {
    exact: false,
    path: ROUTES.SIGNIN,
    component: Login,
  },
  {
    exact: false,
    path: ROUTES.FORGOT_PASSWORD,
    component: Login,
  },
  {
    exact: false,
    path: ROUTES.CHANGE_PASSWORD,
    component: NewPassword,
  },
  {
    exact: false,
    path: ROUTES.VERIFYING_EMAIL,
    component: EmailVerify,
  },
  {
    exact: false,
    path: ROUTES.VERIFYING_SUCCESS,
    component: SuccesVerify,
  },
  // {
  //   exact: false,
  //   path: `/profile/:username`,
  //   component: Profile,
  // },
  // {
  //   exact: false,
  //   path: "/testpage",
  //   component: Loading,
  // },
];

export const routeManage = [
  {
    exact: true,
    path: "/",
    component: Welcomeadmin,
  },
  {
    exact: false,
    path: "/admin/user",
    component: Userdasboard,
  },
  {
    exact: false,
    path: "/admin/post",
    component: Postdashboard,
  },
  {
    exact: false,
    path: "/admin/change-password",
    component: Adminpassword,
  },
];
