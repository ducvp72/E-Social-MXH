import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./signin.css";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import { useCookies } from "react-cookie";
import { userLogin } from "./../../../validation/validation";
import { actLoginSuccess } from "../../../reducers/authReducer";
import { useDispatch } from "react-redux";
import Loading from "../../LoadingPage";
import Swal from "sweetalert2";
import { userApi } from "./../../../axiosApi/api/userApi";
import { actGetMyConver } from "../../../reducers/converReducer";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "20px",
    color: "#f70714",
    fontWeight: "700",
  },
}));
const Signin = (props) => {
  useEffect(() => {
    document.title = "Vn-Social";
  }, []);
  const classes = useStyles();
  // const [cookies, setCookie, removeCookie] = useCookies(["tokens", "rm_psw"]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth",
    "tempTokens",
    "tokens",
    "rm_psw",
  ]);
  const [isSave, setIsSave] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setShowEyes] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSave(cookies.rm_psw ? true : false);
    return () => {
      setIsSave("");
    };
  }, []);

  const initValue = cookies.rm_psw || { email: "", password: "" };

  const handleSubmit = async (data) => {
    setLoading(true);
    if (isSave) setCookie("rm_psw", data);
    else removeCookie("rm_psw");
    try {
      const resData = await userApi.signIn(data);
      dispatch(actLoginSuccess(resData.data.user));
      //get 10 conver list first
      dispatch(actGetMyConver(resData.data.tokens.access.token, 1, 10));
      // dispatch(actGetMyNotify(resData.data.tokens.access.token, 1, 10));
      setLoading(false);
      setCookie("auth", resData.data, { path: "/" });
      console.log("user", cookies.tokens.access.token);
      if (resData.data.user.role === "user") {
        history.replace("/user/home");
      } else {
        console.log("admin");
        history.replace("/admin");
      }
    } catch (err) {
      setLoading(false);
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
              Welcome to Vn-Social
            </h2>
            <div className="w-5/12">
              <div className=" customDate">
                <Field
                  as={TextField}
                  name="email"
                  id="outlined-basic-email"
                  label="Email"
                  type="text"
                  placeholder="Example@gmail.com"
                  variant="outlined"
                  error={!!errors.email}
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
                  id="outlined-basic-password"
                  label="Password"
                  variant="outlined"
                  error={!!errors.password}
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
                      Remember me
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
