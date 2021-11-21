import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./../../../components-Admin/Sidebar";
import "../styles/tailwind.css";
import { UserDashboard } from "./../userdashboard/index";
import { PostDB } from "./../postdashboard/index";
import GroupChatDB from "./../groupchat/index";
import AdminPassword from "./../adminpassword/index";

const AdminController = () => {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path="/admin" component={UserDashboard} />
          <Route path="/admin/post-dashboard" component={PostDB} />
          <Route path="/admin/groupchat-dashboard" component={GroupChatDB} />
          <Route path="/admin/admin-changePassword" component={AdminPassword} />
          <Redirect from="*" to="/admin" />
        </Switch>
        {/* <QuickFilteringGrid /> */}
        {/* <UserDashboard /> */}
        {/* <PostDB /> */}
        {/* <GroupChatDB /> */}
        {/* <AdminPassword /> */}
        {/* <Paganigation /> */}
      </div>
    </div>
  );
};

export default AdminController;
