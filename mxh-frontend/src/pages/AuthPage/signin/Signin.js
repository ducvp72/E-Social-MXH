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
import checkLogin from "../../../guards/check-login";
import { actLogin, actLoginSuccess } from "../../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../LoadingPage";
import { userApi } from "../../../helper/api/userApi";
import Swal from "sweetalert2";
const useStyles = makeStyles(() => ({
  label: {
    fontSize: "20px",
    color: "#f70714",
    fontWeight: "700",
  },
}));
const Signin = (props) => {
  useEffect(() => {
    document.title = "Login to Vn-Social";
  }, []);
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokens",
    "rm_psw",
    "isVerify",
  ]);
  const [isSave, setIsSave] = useState(false);
  const history = useHistory();
  const [errLogin, setErrLogin] = useState({ isError: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsSave(cookies.rm_psw ? true : false);
    checkLogin(history, cookies);
  }, []);

  const initValue = cookies.rm_psw || { email: "", password: "" };

  const currentUser = useSelector((state) => state.auth);
  const handleSubmit = async (data) => {
    console.count("submit");
    setLoading(true);
    if (isSave) setCookie("rm_psw", data);
    else removeCookie("rm_psw");
    // dispatch(actLogin(data, history));
    try {
      const resData = await userApi.signIn(data?.data);
      console.log("resdata day ne", resData);
      dispatch(actLoginSuccess(resData.data.user));
      setLoading(false);
      setCookie("tokens", resData.data.tokens);
      history.replace("/");
    } catch (err) {
      setLoading(false);
      // setErrLogin({ isError: true, msg: err.response.data.message });
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container">
      {/* {errLogin.isError ? <ErrorAlert message={errLogin.msg} /> : null} */}
      {loading && <Loading />}

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

            <button
              type="submit"
              href="#"
              className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
