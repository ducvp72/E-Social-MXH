import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutAuthPage = (props) => {
  return <>{props.children}</>;
};

const AuthPage = (props) => {
  const currentUser = useSelector((state) => state.auth.data);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <LayoutAuthPage>
      <Route
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    </LayoutAuthPage>
  );
};

export default AuthPage;
