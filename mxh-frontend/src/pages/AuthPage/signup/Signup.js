import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./signup.css";
import { Helmet } from "react-helmet-async";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { FormHelperText, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { register } from "../../../context/actions/register";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { userSignUpSchema } from "./../../../validation/validation";
import { Alertverify } from "../../../components/alert/alertverify";
import { ErrorAlert } from "./../../../components/alert/alert";
import * as ROUTES from "./../../../routes/routes";

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokens",
    "userId",
    "isVerify",
  ]);
  const [hidden, setHidden] = useState({ password: false, confirm: false });
  const [showEye, setShowEye] = useState({ password: false, confirm: false });
  const [registerCheck, setRegisterCheck] = useState({
    isShow: false,
    msgErr: "",
  });
  const [dob, setDob] = useState(
    new Date(new Date().setUTCFullYear(new Date().getUTCFullYear()))
  );
  const [errDob, setErrDob] = useState(true);
  const initRegisterUser = {
    fullname: "Stephen Vo",
    gender: "other",
    email: "long@gmail.com",
    password: "123456789Du",
    confirm: "123456789Du",
  };
  const [showVerify, setShowVerify] = useState(false);
  // useEffect(() => {
  //   setShowVerify(showVerify);
  //   document.body.className = "overflow-hidden";
  //   console.log("show", showVerify);
  // }, [showVerify]);

  let history = useHistory();

  // const watiting = (veryf) => {
  //   setTimeout(() => {
  //     veryf.resetForm();
  //     veryf.setSubmitting(false);
  //     setShowVerify(!showVerify);
  //   }, 5000);
  // };

  const handleSubmit = async (data, props) => {
    const birthday = moment(dob).format("MM/DD/YYYY");
    if (errDob) {
      setErrDob(true);
      props.setSubmitting(false);
      return;
    }
    data.birthday = birthday;
    // console.log(data)
    try {
      const resData = await register(data);
      setCookie("tokens", resData.tokens);
      setCookie("userId", resData.user.id);
      setCookie("isVerify", resData.user.isEmailVerified);
      history.replace(ROUTES.VERIFYING_EMAIL);
      // console.log(resData.tokens);
      // console.log("Response", resData)
      // console.log(resData.user.isEmailVerified)

      // setRegisterCheck({
      //   ...registerCheck,
      //   isShow: true,
      //   msgErr: "Please try to register again ( code: "+ resData.status +")"
      // })
    } catch (err) {
      setRegisterCheck({
        ...registerCheck,
        isShow: true,
        msgErr:
          "Please try to register again ( code: " + err.response.status + ")",
      });
    }
  };

  // console.log('tokens all', cookies.tokens)
  // console.log('tokens access', cookies.tokens.access.token);
  // console.log('tokens refresh',cookies.tokens.refresh.token);

  const onChangeDob = (newDob) => {
    setDob(newDob);
    if (new Date().getUTCFullYear() - newDob.getUTCFullYear() < 13) {
      setErrDob(true);
      return;
    }
    setErrDob(false);
    return newDob;
  };
  return (
    <div className="container">
      <Helmet>
        <title>Sign up</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {/* {showVerify && <Alertverify setShowVerify={setShowVerify}></Alertverify>} */}

      {registerCheck.isShow === true && (
        <ErrorAlert message={registerCheck.msgErr} />
      )}

      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-display font-bold text-primarycolor">
          Create Your Account
        </h1>

        <Formik
          initialValues={initRegisterUser}
          validationSchema={userSignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, ...props }) => (
            <Form className="w-3/6">
              <div className="customDate">
                <Field
                  as={TextField}
                  name="fullname"
                  id="outlined-basic"
                  label="Fullname"
                  variant="outlined"
                  error={errors.fullname}
                  helperText={
                    <ErrorMessage name="fullname">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </div>
              <div className="customDate">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    name="dob"
                    variant="filled"
                    openTo="year"
                    label="Date of birth"
                    value={dob}
                    views={["year", "month", "day"]}
                    onChange={(e) => onChangeDob(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {errDob && (
                  <div className=" ml-4 text-red-500 text-xs">
                    Người dùng phải từ 13 tuổi trở lên !
                  </div>
                )}
              </div>

              <div className="mt-2">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <Field as={RadioGroup} name="gender" row aria-label="gender">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </Field>
                </FormControl>
                <div className=" ml-4">
                  <FormHelperText>
                    <ErrorMessage name="gender">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  </FormHelperText>
                </div>
              </div>

              <div className="customDate">
                <Field
                  as={TextField}
                  name="email"
                  error={errors.email}
                  placeholder="Example@gmail.com"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
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
                  name="password"
                  error={errors.password}
                  type={hidden.password ? "text" : "password"}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onFocus={() => {
                    setShowEye({ ...showEye, password: true });
                  }}
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          // showEye.password &&
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setHidden({
                                ...hidden,
                                password: !hidden.password,
                              });
                            }}
                          >
                            {hidden.password ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        }
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="customDate">
                <Field
                  as={TextField}
                  name="confirm"
                  type={hidden.confirm ? "text" : "password"}
                  // onFocus={()=>{setShowEye({...showEye, confirm: true})}}
                  id="outlined-basic"
                  error={errors.confirm}
                  label="Confirm Password"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="confirm">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          // showEye.confirm &&
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setHidden({
                                ...hidden,
                                confirm: !hidden.confirm,
                              });
                            }}
                          >
                            {hidden.confirm ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        }
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700 items-center"
                  style={{ boxShadow: "0 0 10px 0 gray" }}
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Verifying..." : "Sign up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className=" h-10" />
      </div>
    </div>
  );
};

export default Signup;
