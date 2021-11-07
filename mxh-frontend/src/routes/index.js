import React from "react";

import Home from "./../pages/HomePage/home/Home";
import Profile from "../pages/HomePage/profile/profile";
import NotFound from "./../pages/AuthPage/error/Error";
import Inbox from "../pages/HomePage/inbox/Inbox";
import Account from "./../pages/HomePage/account/account";
import Admin from "./../pages/HomePage/admin/admin";
import Login from "./../pages/HomePage/home/Login";

import { HOME } from "./routes";
import { SIGNIN } from "./routes";
import { SIGNUP } from "./routes";
import { FORGOT_PASSWORD } from "./routes";
import { PROFILE } from "./routes";
import { NOT_FOUND } from "./routes";
import { INBOX } from "./routes";
import { ACCOUNT } from "./routes";
import { ADMIN } from "./routes";
import { CHANGE_PASSWORD } from "./routes";
import { VERIFYING_EMAIL } from "./routes";
import { VERIFYING_SUCCESS } from "./routes";
import Userdasboard from "../pages/HomePage/admin/userdashboard/userdasboard";
import Postdashboard from "./../pages/HomePage/admin/postdashboard/postdashboard";
import Groupchat from "./../pages/HomePage/admin/groupchat/groupchat";
import Adminpassword from "./../pages/HomePage/admin/adminpassword/adminpassword";
import Welcomeadmin from "./../pages/HomePage/admin/welcomeadmin";
import { NewPassword } from "./../pages/AuthPage/forgot/newPassword";
import EmailVerify from "./../pages/EmailVerify";
import SuccesVerify from "./../pages/SuccesVerify";
import Loading from "../pages/LoadingPage";

export const routeHomePage = [
  {
    exact: true,
    path: HOME,
    component: Home,
  },
  {
    exact: false,
    path: PROFILE,
    component: Profile,
  },
  {
    exact: false,
    path: INBOX,
    component: Inbox,
  },
  {
    exact: false,
    path: ACCOUNT,
    component: Account,
  },
];

export const routeAuthPage = [
  {
    exact: false,
    path: SIGNUP,
    component: Login,
  },
  {
    exact: false,
    path: SIGNIN,
    component: Login,
  },
  {
    exact: false,
    path: FORGOT_PASSWORD,
    component: Login,
  },
  {
    exact: false,
    path: CHANGE_PASSWORD,
    component: NewPassword,
  },
  {
    exact: false,
    path: ADMIN,
    component: Admin,
  },
  {
    exact: false,
    path: VERIFYING_EMAIL,
    component: EmailVerify,
  },
  {
    exact: false,
    path: VERIFYING_SUCCESS,
    component: SuccesVerify,
  },
  {
    exact: false,
    path: "/testpage",
    component: Loading,
  },
  {
    exact: false,
    path: NOT_FOUND,
    component: NotFound,
  },
];

export const routeManage = [
  {
    exact: true,
    path: "/admin",
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
    path: "/admin/groupchat",
    component: Groupchat,
  },
  {
    exact: false,
    path: "/admin/change-password",
    component: Adminpassword,
  },
];
