import React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Form } from "formik";
import { Field } from "formik";
import TextField from "@mui/material/TextField";
import { ErrorMessage } from "formik";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { userLogin } from "./../../validation/validation";
const LoginToContinute = (props) => {
  const [open, setOpen] = useState(true);
  const [showEye, setShowEye] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    document.body.className = "overflow-hidden";
  }, []);

  return (
    <div>
      <div
        className=" post-show fixed w-full h-screen opacity-70 bg-transparent z-40 top-0 left-0 flex justify-end items-start "
        style={{ background: "#575757" }}
      >
        <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
          <i
            className="fas fa-times fa-2x cursor-pointer mr-4"
            style={{ color: "#e5e5e5" }}
            onClick={() => setOpen(false)}
          ></i>
        </div>
      </div>
      <div className=" text-white text-md font-normal rounded-md shadow-xl  fixed z-50 transform -translate-x-1/2  left-1/2 top-32">
        <p className="">Please login to continue</p>
      </div>
      <div
        className=" rounded-md shadow-xl bg-white fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ width: "400px", height: "480px" }}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center items-center justify-items-center">
            <p className=" font-avatar text-2xl p-5">Vn-Social</p>
            <div className=" absolute right-0 top-1">
              <i
                className="fas fa-times fa-2x cursor-pointer mr-4 text-gray-300"
                onClick={() => setOpen(false)}
              ></i>
            </div>
          </div>
          <div className="flex justify-center items-center justify-items-center mt-5">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={userLogin}
              //   onSubmit={handleSubmit}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <div className="mt-2 mb-10 w-72 h-24">
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      error={errors.email}
                      type="text"
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="email">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                    <div className="mt-2"></div>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      type={hidden ? "text" : "password"}
                      id="outlined-basic"
                      error={errors.password}
                      label="Password"
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="password">
                          {(msg) => (
                            <span style={{ color: "red", display: "absolute" }}>
                              {msg}
                            </span>
                          )}
                        </ErrorMessage>
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setHidden(!hidden);
                                }}
                              >
                                {hidden ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            }
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Login..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex justify-center space-x-2 items-center">
            <hr className="w-32 text-gray-600" />
            <p className=" text-sm text-white flex bg-gray-400 rounded-full w-5 h-5 justify-center">
              or
            </p>
            <hr className="w-32 text-gray-600" />
          </div>
          <div className="flex justify-center items-center">
            <GoogleButton
              onClick={() => {
                console.log("Google button clicked");
              }}
              type="dark"
              style={{ marginTop: "10px", width: "18rem" }}
            />
          </div>
          <div className=" flex justify-center items-center">
            <p className=" cursor-pointer text-blue-500 font-normal p-5">
              Don't have an account ?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginToContinute;
