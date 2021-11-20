import React from "react";
import { Route, Redirect } from "react-router-dom";
const SearchAuth = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default SearchAuth;
