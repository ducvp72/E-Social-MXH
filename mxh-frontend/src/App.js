import * as React from "react";
import "./css/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthPage from "./containers/AuthPage/index";
import HomePage from "./containers/HomePage/index";
import AdminPage from "./containers/AdminPage/index";
import Routes from "./routes/routes";
import { createAxiosResponseInterceptor } from "./utils/handleRefresh";
// createAxiosResponseInterceptor();

const App = () => {
  return <Routes />;
};

export default App;
