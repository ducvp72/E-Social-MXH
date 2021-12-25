import { Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Redirect, useHistory } from "react-router-dom";

const CheckActive = ({ children, ...rest }) => {
  const [cookies] = useCookies(["auth"]);

  const history = useHistory();
  return (
    <Route
      {...rest}
      render={() => {
        if (!cookies?.auth) {
          return children;
        }
        // console.log(cookies.auth);
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
