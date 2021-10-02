import * as React from "react";
import { lazy, Suspense } from "react";
import "./css/style.css";
import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import Error from "./Error";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import {Helmet} from "react-helmet";

const Homes = lazy(() => import("./pages/home/Home"));
const Logins = lazy(() => import("./pages/home/Login"));
const Not_Founds = lazy(() => import("./Error"));
const Inbox = lazy(() => import("./pages/inbox/Inbox"));

const App = () => {
  return (
    <div className="">
      <Router>
        <Suspense fallback={<p>Loading ...</p>}>
          <Switch>
            <Route path={ROUTES.HOME} component={Homes} />
            <Route path={ROUTES.SIGNIN}  component={Logins} />
            <Route path={ROUTES.NOT_FOUND} component={Not_Founds} />
            <Route path={ROUTES.INBOX} component={Inbox} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
