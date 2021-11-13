import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutAdminPage = (props) => {
  return <>{props.children}</>;
};

const AdminPage = (props) => {
  const currentUser = useSelector((state) => state.auth.data);

  //Not log in
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  //Log in but is not Admin
  if (currentUser && currentUser?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <LayoutAdminPage>
      <Route
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    </LayoutAdminPage>
  );
};

export default AdminPage;
