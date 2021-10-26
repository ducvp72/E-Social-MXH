import React from "react";
import { Route } from 'react-router-dom';

const LayoutAuthPage = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

const AuthPage = (props) => {
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
