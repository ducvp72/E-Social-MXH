import React from "react";
import { Route, Redirect } from "react-router-dom";
const QuestAuthRoute = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default QuestAuthRoute;
