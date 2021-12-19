import React, { useEffect } from "react";
import "./css/style.css";
import Routes from "./routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { actGetMyNotify } from "./reducers/notificationReducer";
import { actUpdateUser } from "./reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  const [cookies, ,] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);

  useEffect(() => {
    // console.log("current", currentUser?.id);
    // console.log("cookie", cookies?.auth.tokens.access.token);
  });

  // useEffect(()=>{
  //   if (currentUser) dispatch(actUpdateUser(currentUser.?));
  // })

  // useEffect(() => {
  //   console.log("cookie", cookies?.auth.tokens.access.token);
  //   if (currentUser?.role === "user") {
  //     dispatch(actGetMyNotify(cookies?.auth?.tokens?.access?.token, 1, 5));
  //   } else {
  //     return;
  //   }
  // }, [dispatch, currentUser]);

  return <Routes />;
};

export default App;
