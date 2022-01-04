import React, { useState } from "react";
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
import moment from "moment";
import { useHistory } from "react-router-dom";
import { userSignUpSchema } from "./../../../validation/validation";
import Swal from "sweetalert2";
import { userApi } from "./../../../axiosApi/api/userApi";
import Loading from "./../../LoadingPage/index";
import { useCookies } from "react-cookie";
const Signup = () => {
  const [, setCookie] = useCookies(["tempTokens"]);
  const [hidden, setHidden] = useState({ password: false, confirm: false });
  const [showEye, setShowEye] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(
    new Date(new Date().setUTCFullYear(new Date().getUTCFullYear()))
  );
  const [errDob, setErrDob] = useState(true);
  const initRegisterUser = {
    fullname: "",
    gender: "",
    email: "",
    password: "",
    confirm: "",
  };
  let history = useHistory();
  const handleSubmit = async (data, props) => {
    const birthday = moment(dob).format("DD/MM/YYYY");
    if (errDob) {
      setErrDob(true);
      props.setSubmitting(false);
      return;
    }
    data.birthday = birthday;
    setLoading(true);
    try {
      const resData = await userApi.signUp(data);
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setCookie("tempTokens", resData.data);
      history.replace("/send-email");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const onChangeDob = (newDob) => {
    setDob(newDob);
    if (new Date()?.getUTCFullYear() - newDob?.getUTCFullYear() < 13) {
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
      {loading && <Loading />}
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
                  error={!!errors.fullname}
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
                    value={dob || ""}
                    views={["year", "month", "day"]}
                    onChange={(e) => onChangeDob(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {errDob && (
                  <div className=" ml-4 text-red-500 text-xs">
                    Over 13 years old !
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
                  error={!!errors.email}
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
                  error={!!errors.password}
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
                  id="outlined-basic"
                  error={!!errors.confirm}
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
