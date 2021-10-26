import { useCookies } from "react-cookie";
import * as ROUTES from "../routes/routes";

const CheckLogin = (history, cookies) => {
  console.log(cookies);
  if (cookies.tokens) {
    history.push(ROUTES.HOME);
  }
};
export default CheckLogin;
