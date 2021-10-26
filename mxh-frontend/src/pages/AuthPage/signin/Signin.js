import React, { useEffect, useState } from "react";
// import "../../css/style.css"
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes/routes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./signin.css";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { login } from "../../../context/actions/register";
import { makeStyles } from "@mui/styles";
import { useCookies } from "react-cookie";
import { confirmMail } from "./../../../context/actions/register";
import { userLogin } from "./../../../validation/validation";
import { SuccessAlert } from "../../../components/alert/alert";
import { ErrorAlert } from "./../../../components/alert/alert";
import Login from "./../../HomePage/home/Login";
import checkLogin from "../../../guards/check-login";
const useStyles = makeStyles(() => ({
  label: {
    fontSize: "20px",
    color: "#f70714",
    fontWeight: "700",
  },
}));
const Signin = () => {
  useEffect(() => {
    document.title = "Login to Vn-Social";
  }, []);
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "rm_psw","isVerify"]);
  // const [query] = useState(new URLSearchParams(useLocation().search));
  // const [message, setMessage] = useState({ status: "IDE", msg: "" });
  const [loginCheck, setShowLogin] = useState({ isShow: false, errMsg: "" });
  const [isSave, setIsSave] = useState(false);
  let history = useHistory();

  // useEffect(() => {
  //   const token = query.get("token");
  //   if (token) {
  //     setMessage({ status: "loading", msg: "loading" });
  //     verifyEmail(token);
  //   }
  // }, [query]);

  //#region Ham chung
  // const verifyEmail = async (token) => {
  //   try {
  //     await axios.post(
  //       " https://mxhld.herokuapp.com/v1/auth/verify-email",
  //       null,
  //       {
  //         params: { token: token },
  //       }
  //     );
  //     setMessage({ status: "success", msg: "xac nhan mail thanh cong" });
  //   } catch (err) {
  //     console.log(err)
  //     setMessage({ status: "error", msg: "xac nhan mail that bai" });
  //   }
  // };
  //#endregion

  // const verifyEmail = async (token) => {
  //   try {
  //     console.log(message);
  //     await confirmMail(token);
  //     setCookie("isVerify", "true");
  //     setMessage({ status: "success", msg: "xac nhan mail thanh cong" });
  //   } catch (err) {
  //     console.log("err");
  //     setMessage({ status: "error", msg: "xac nhan mail that bai" });
  //   }
  // };

  useEffect(() => {
    setIsSave(cookies.rm_psw ? true : false);
    checkLogin(history, cookies)
  }, []);

  const initValue = cookies.rm_psw || { email: "", password: "" };

  const handleSubmit = async (data, props) => {
    try {
      console.log(data);
      const resData = await login(data);
      setCookie("tokens", resData.data.tokens);
      setCookie("userId", resData.data.user.id);
      setCookie("isVerify", resData.data.user.isEmailVerified);
      // console.log("Status ", resData.status);
      props.setSubmitting(false);
      props.resetForm();
      history.push(ROUTES.HOME);
      if (isSave) return setCookie("rm_psw", data);
      removeCookie("rm_psw");
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;
      setShowLogin({
        ...loginCheck,
        isShow: true,
        errMsg:
          err.response.data.message + " (code: " + err.response.status + ")",
      });
    }
  };

  const showError = () => {
    return <Alert severity="error">{loginCheck.errMsg}</Alert>;
  };

  // const loadMessage = () => {
  //   switch (message.status) {
  //     case "loading":
  //       return <Alert severity="info">{message.msg}</Alert>;
  //     case "error":
  //       return <Alert severity="error">{message.msg}</Alert>;
  //     case "success":
  //       return <Alert severity="success">{message.msg}</Alert>;
  //     default:
  //       return;
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showEyes, setShowEyes] = useState(false);

  return (
    <div className="container">

      {/* {loadMessage()} */}

      {loginCheck.isShow === true && (
        <ErrorAlert setShowLogin={setShowLogin} message={loginCheck.errMsg} />
      )}

      <Formik
        validationSchema={userLogin}
        initialValues={initValue}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, ...props }) => (
          <Form className="py-16 flex flex-col justify-center items-center">
            <img
              src="/assets/access/avatar.svg"
              alt="avatar"
              className="w-32 hover:scale-150 transition-all duration-500 transform mx-auto"
            />
            <h2 className="py-9 font-display font-bold text-2xl text-gray-700 text-center ">
              Welcome to Vn-Social Network
            </h2>
            <div className="w-5/12">
              <div className=" customDate">
                <Field
                  as={TextField}
                  name="email"
                  id="outlined-basic"
                  label="Email"
                  type=""
                  placeholder="Example@gmail.com"
                  variant="outlined"
                  error={errors.email}
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </div>
              <div className="customDate">
                <Field
                  as={TextField}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  error={errors.password}
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  onFocus={() => setShowEyes(true)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          // showEye.password &&
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        }
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  className={classes.label}
                  name="savePassword"
                  control={
                    <Checkbox defaultChecked={cookies.rm_psw ? true : false} />
                  }
                  onChange={(e) => {
                    setIsSave(e.target.checked);
                  }}
                  label={
                    <span className=" text-red-500 font-bold text-md">
                      Ghi nhớ mật khẩu
                    </span>
                  }
                  labelPlacement="end"
                />
              </div>
            </div>

            {/* <Link to={ROUTES.HOME} arial-label="Vn-Social logo>"> */}
            <button
              type="submit"
              href="#"
              className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? "Login..." : "Login"}
            </button>
            {/* </Link> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
