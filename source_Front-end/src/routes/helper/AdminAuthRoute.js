import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminAuthRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(["auth"]);
  return (
    <Route
      {...rest}
      render={() => {
        return cookies.auth &&
          (cookies.auth.user.role === `admin` ||
            cookies.auth.user.role === `superadmin`) ? (
          children
        ) : (
          <Redirect to="/auth" />
          // <SinginToContinue />
        );
      }}
    />
  );
};

export default AdminAuthRoute;
