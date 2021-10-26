
// import  {checkAuth, verifyEmail} from './../context/actions/register';
// import { useHistory } from 'react-router-dom';
// import { useCookies } from "react-cookie";
// import * as ROUTES from "../../../routes/routes";
// const CheckAuthentication = () => {

// const [cookies, setCookie, removeCookie] = useCookies(["tokens","isVerify"]);
// let history = useHistory();
//   if (cookies.isVerify === "true") {
//     setShowVerify(false);
//   } else {
//     const getToken = () => {
//       console.log("token", cookies.tokens);
//       verifyEmail(cookies.tokens.access);
//     };
//     getToken();
//     setShowVerify(true);
//   }
//   if (cookies.tokens) {
//       if(checkAuth(cookies.tokens.access)) {
//         history.push(ROUTES.HOME);
//   } else {
//     history.push(ROUTES.SIGNIN);
//   }
// }};

// export default CheckAuthentication ;