import React from "react";
import { Topbar } from "./../../components/topbar/topbar";
import { Route } from 'react-router-dom';

const LayoutHomePage = (props) => {
  return (
    <>
      <Topbar />
      {props.children}  
    </>
  );
};

const HomePage = (props) => {
  return (
    <LayoutHomePage>
      <Route
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    </LayoutHomePage>
  );
};

export default HomePage;
