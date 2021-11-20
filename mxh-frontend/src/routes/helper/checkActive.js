import { Link, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { history } from "./../browserRouter";
const CheckActive = ({ children, ...rest }) => {
  const [cookies] = useCookies(["auth"]);
  const location = useLocation();
  const history = useHistory();
  const referer = location.state && location.state.referer;
  return (
    <Route
      {...rest}
      render={() => {
        if (!cookies?.auth) {
          return children;
        }

        console.log(cookies.auth);
        if (
          cookies.auth.user.role === "admin" ||
          cookies.auth.user.role === "superadmin"
        ) {
          // return <Redirect to="/admin" replace />;
          return history.replace("/admin");
        }
        return <Redirect to="/user/home" />;
      }}
    />
  );
};

export default CheckActive;
