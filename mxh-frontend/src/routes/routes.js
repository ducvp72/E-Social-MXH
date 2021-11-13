import React from "react";
import * as ROUTES from "../routes/instant/routes";
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
import NotFound from "./../containers/error/Error";
import AdminAuthRoute from "./helper/AdminAuthRoute";
import Admin from "./../containers/AdminPage/adminControler/admin";
import UserAuthRoute from "./helper/userAuthRoute";
import SuccesVerify from "./../containers/Verifying/SuccesVerify";
import EmailVerify from "./../containers/Verifying/EmailVerify";
import Account from "./../containers/AccountPage/account/account";
import Inbox from "./../containers/AccountPage/inbox/Inbox";
import { NewPassword } from "./../containers/AuthPage/forgot/newPassword";
import CheckActive from "./helper/checkActive";
import OtherProfile from "./../containers/AccountPage/otherProfile/otherProfile";
import QuestAuthRoute from "./helper/QuestAuthRoute";

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
              <Route path="/user/:userName" exact component={Profile} />
              <Route path="/user/setting/:userName" exact component={Account} />
              <Route path="/user/inbox/:userName" exact component={Inbox} />
              <Route path="*" exact>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </DefaultLayout>
        </UserAuthRoute>
        <QuestAuthRoute path="/profile">
          <Switch>
            <Route path="/profile/:userId" exact component={OtherProfile} />
          </Switch>
        </QuestAuthRoute>
        <AdminAuthRoute path="/admin">
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="*" exact>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </AdminAuthRoute>
        <CheckActive>
          <Switch>
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
