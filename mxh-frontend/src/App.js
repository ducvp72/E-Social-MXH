import * as React from "react";
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
import { routeManage } from "./routes/index";
import { useSelector, useDispatch } from "react-redux";
import { createAxiosResponseInterceptor } from "./helper/myFunction/handleRefresh";

createAxiosResponseInterceptor();

const showLayoutHomePage = (routes) => {
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

// const ParentComponent = () => {
//   const [state, setState] = React.useState(0);
//   return (
//     <div
//       style={{
//         width: "100px",
//         height: "100px",
//         background: "blue",
//       }}
//     >
//       Parent: {state}
//       <ChildComponent state={state} setState={setState} />
//     </div>
//   );
// };

// const ChildComponent = ({ state, setState, ...props }) => {
//   return (
//     <div
//       style={{
//         width: "50px",
//         height: "50px",
//         background: "red",
//         zIndex: "10000000",
//       }}
//     >
//       Children
//       <button
//         onClick={() => {
//           console.log("click click");
//           setState(state++);
//         }}
//       >
//         Click here
//       </button>
//     </div>
//   );
// };

const App = () => {
  const account = useSelector((state) => state.account);
  console.log("Redux day ne", account);

  const dispatch = useDispatch();

  // const [test, setTest] = React.useState({
  //   name: {
  //     firstName: "tin",
  //     lastName: "nguyen",
  //   },
  //   age: "18",
  //   address: "HCM",
  // });

  // React.useEffect(() => {
  //   console.log(test);
  // }, [test]);

  return (
    <div className="">
      {/* <ParentComponent /> */}

      {/* <button
        onClick={() => {
          // setTest({
          //   ...test,
          //   name: { ...test.name, lastName: "pd", ac: ":UTe" },
          //   age: "19",
          //   address: "HN",
          // });
          test.name.firstName = "a";
          setTest({
            ...test,
          });
        }}
      >
        Click here
      </button> */}

      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          {showLayoutHomePage(routeHomePage)}
          {showLayoutAuthPage(routeAuthPage)}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
