import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./../../../components-Admin/Sidebar";
import "../styles/tailwind.css";
import { UserDashboard } from "./../userdashboard/index";
import { PostDB } from "./../postdashboard/index";
import GroupChatDB from "./../groupchat/index";
import AdminPassword from "./../adminpassword/index";
import { Paganigation } from "./../paganigation";

const AdminController = () => {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path="/admin/User-Dashboard" component={UserDashboard} />
          <Route exact path="/admin/Post-Dashboard" component={PostDB} />
          <Route
            exact
            path="/admin/GropChat-Dashboard"
            component={GroupChatDB}
          />
          <Route
            exact
            path="/admin/Admin-ChangePassword"
            component={AdminPassword}
          />
          {/* <Redirect from="*" to="/admin" /> */}
        </Switch>
        {/* <UserDashboard /> */}
        <PostDB />
        {/* <GroupChatDB /> */}
        {/* <AdminPassword /> */}
        {/* <Paganigation /> */}
      </div>
    </div>
  );
};

export default AdminController;
