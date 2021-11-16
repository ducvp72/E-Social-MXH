import React from "react";
import { Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import SinginToContinue from "../../components/SinginToContinue";

const UserAuthRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(["auth"]);
  return (
    <Route
      {...rest}
      render={() => {
        return cookies.auth && cookies.auth.user.role === `user` ? (
          children
        ) : (
          <SinginToContinue />
        );
      }}
    />
  );
};

export default UserAuthRoute;
