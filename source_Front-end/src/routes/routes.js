import React from "react";
import Login from "./../containers/HomePage/home/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./../containers/HomePage/home/Home";
import Profile from "./../containers/AccountPage/profile/profile";
import DefaultLayout from "../layout/defaultLayout";
import SearchLayout from "../layout/searchLayout";
import NotFound from "./../containers/error/Error";
import AdminAuthRoute from "./helper/AdminAuthRoute";
import UserAuthRoute from "./helper/userAuthRoute";
import SuccesVerify from "./../containers/Verifying/SuccesVerify";
import EmailVerify from "./../containers/Verifying/EmailVerify";
import Account from "./../containers/AccountPage/account/account";
import Inbox from "./../containers/AccountPage/inbox/Inbox";
import { NewPassword } from "./../containers/AuthPage/forgot/newPassword";
import CheckActive from "./helper/checkActive";
import OtherProfile from "./../containers/AccountPage/otherProfile/otherProfile";
import QuestAuthRoute from "./helper/QuestAuthRoute";
import AdminController from "./../containers/AdminPage/adminControler/adminController";
import AdminLogin from "./../containers/AdminPage/adminLogin/index";
import SearchAuth from "./helper/SearchAuth";
import ListUserSearch from "./../containers/HomePage/home/ListUserSearch";
import CallLayout from "./../layout/callLayoute";
import VideoCall from "./../containers/AccountPage/inbox/componentCall/index";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/send-email" exact component={EmailVerify} />
        <Route path="/verifying-email" exact component={SuccesVerify} />
        <Route path="/recover-password" exact component={NewPassword} />
        <Route path="/change-password" exact component={NewPassword} />
        <Route path="/404" component={NotFound} />
        <UserAuthRoute path="/user">
          <DefaultLayout>
            <Switch>
              <Route path="/user/home" exact component={Home} />
              <Route path="/user/inbox/:userId" exact component={Inbox} />
              <Route path="/user/inbox" exact component={Inbox} />
              <Route path="/user/:userName" exact component={Profile} />
              <Route path="/user/setting/:userName" exact component={Account} />
              <Route path="*" exact>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </DefaultLayout>
        </UserAuthRoute>
        <UserAuthRoute path="/profile">
          <DefaultLayout>
            <Switch>
              <Route path="/profile/:username" exact component={OtherProfile} />
              <Route path="*" exact>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </DefaultLayout>
        </UserAuthRoute>

        <UserAuthRoute path="/contact">
          <CallLayout>
            <Switch>
              <Route
                path="/contact/videocall/:userId"
                exact
                component={VideoCall}
              />
              <Route path="*" exact>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </CallLayout>
        </UserAuthRoute>

        <UserAuthRoute path="/search">
          <SearchLayout>
            <Switch>
              <Route path="/search/top" exact component={ListUserSearch} />
              <Route path="*" exact>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </SearchLayout>
        </UserAuthRoute>
        <AdminAuthRoute path="/admin">
          <Switch>
            <Route path="/admin" component={AdminController} />
            <Route path="*" exact>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </AdminAuthRoute>
        <CheckActive>
          <Switch>
            <Route path="/auth" exact component={AdminLogin} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Login} />
            <Route path="/forgotpassword" exact component={Login} />
            <Route path="*" exact>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </CheckActive>
        <Route path="*" exact>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
