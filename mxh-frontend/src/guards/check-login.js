import { useCookies } from "react-cookie";
import * as ROUTES from "../routes/routes";
import { useDispatch } from "react-redux";
import { actLoginIDE } from "../reducers/authReducer";
import { withRouter } from "react-router";
import MyBrowserRouter from "../routes/browserRouter";

const CheckLogin = (cookies) => {
  console.log("test", cookies);
  if (cookies.tokens) {
    // history.push(ROUTES.HOME);
    new MyBrowserRouter().history.push(ROUTES.HOME);
    return true;
  }
  return false;
};
export default CheckLogin;
