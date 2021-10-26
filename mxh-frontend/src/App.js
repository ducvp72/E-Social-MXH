import * as React from "react";
import { lazy, Suspense } from "react";
import "./css/style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import * as ROUTES from "./routes/routes";

import HomePage from "./pages/HomePage/index";
import AuthPage from "./pages/AuthPage/index";
import { routeHomePage, routeAuthPage } from "./routes";
import { routeManage } from './routes/index';


const showLayoutHomePage = (routes) => {
  console.log(routes)
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomePage
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      );
    });
  }
};

const showLayoutAuthPage = (routes) => {
  console.log(routes)
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <AuthPage
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      );
    });
  }
};



const App = () => {
  return (
    <div className="">
      <Router>
        <Suspense fallback={<p>Loading ...</p>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {showLayoutHomePage(routeHomePage)}
            {showLayoutAuthPage(routeAuthPage)}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
