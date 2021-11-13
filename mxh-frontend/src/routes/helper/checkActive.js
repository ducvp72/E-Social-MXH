import { Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Redirect, useLocation } from "react-router-dom";
const CheckActive = ({ children, ...rest }) => {
  const [cookies] = useCookies(["auth"]);
  const location = useLocation();
  const referer = location.state && location.state.referer;
  return (
    <Route
      {...rest}
      render={() => {
        console.log(referer);
        if (!cookies?.auth) {
          return children;
        }
        if (cookies.auth.user.role === "admin") {
          return <Redirect to="/admin" />;
        }
        return <Redirect to="/user/home" />;
      }}
    />
  );
};

export default CheckActive;
