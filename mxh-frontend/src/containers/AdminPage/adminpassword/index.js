import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePassword } from "../../../validation/validation";
import "./../../../css/style.css";
import Loading from "../../LoadingPage/index";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { adminApi } from "../../../axiosApi/api/adminApi";
const AdminPassword = () => {
  const [loading, setLoading] = useState(false);
  const [cookies, ,] = useCookies("auth");
  const [hidden, setHidden] = useState({
    oldpassword: false,
    password: false,
    confirm: false,
  });
  const [showEye, setShowEye] = useState({
    oldpassword: false,
    password: false,
    confirm: false,
  });
  const handleChangePassword = async (data, props) => {
    setLoading(true);
    try {
      await adminApi.adminchangePassword(cookies.auth.tokens.access.token, {
        oldPassword: data.oldpassword,
        password: data.password,
      });
      setLoading(false);
      props.setSubmitting(true);
      Swal.fire({
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      props.resetForm();
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
  const handleCancel = (props) => {
    props.resetForm();
  };
  return (
    <>
      <div className="bg-white-500 pt-20 pb-28 px-3 md:px-8 h-auto">
        {loading && <Loading />}
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <Formik
              initialValues={{ oldpassword: "", password: "", confirm: "" }}
              validationSchema={changePassword}
              onSubmit={handleChangePassword}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <div className="">
                    <div className="customDate">
                      <Field
                        as={TextField}
                        name="oldpassword"
                        error={errors.oldpassword}
                        type={hidden.oldpassword ? "text" : "password"}
                        label="Old Password"
                        variant="outlined"
                        onFocus={() => {
                          setShowEye({ ...showEye, password: true });
                        }}
                        helperText={
                          <ErrorMessage name="oldpassword">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
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
                                      oldpassword: !hidden.oldpassword,
                                    });
                                  }}
                                >
                                  {hidden.oldpassword ? (
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
                        name="password"
                        error={errors.password}
                        type={hidden.password ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        onFocus={() => {
                          setShowEye({ ...showEye, password: true });
                        }}
                        helperText={
                          <ErrorMessage name="password">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
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
                        error={errors.confirm}
                        label="Confirm Password"
                        variant="outlined"
                        helperText={
                          <ErrorMessage name="confirm">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
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
                  </div>
                  <div className="flex justify-end items-center space-x-2 mt-2">
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      disabled={props.isSubmitting}
                    >
                      {props.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      className=" bg-red-600"
                      onClick={() => handleCancel(props)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPassword;
