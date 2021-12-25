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
import { useCookies } from "react-cookie";
import { adminLogin } from "../../../validation/validation";
import { adminApi } from "../../../axiosApi/api/adminApi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { actLoginSuccess } from "../../../reducers/authReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import Loading from "../../LoadingPage/index";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "20px",
    color: "#f70714",
    fontWeight: "700",
  },
}));
const LoginForm = (props) => {
  const [hidden, setHidden] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "tokens",
    "rm_pswAdmin",
  ]);
  const [loading, setLoading] = useState(false);
  const initValue = cookies.rm_pswAdmin || { adminName: "", password: "" };
  const [isSave, setIsSave] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    // document.body.className = "overflow-hidden";
    setIsSave(cookies.rm_pswAdmin ? true : false);
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    if (isSave) setCookie("rm_pswAdmin", data);
    else removeCookie("rm_pswAdmin");
    try {
      const resData = await adminApi.signIn(data);
      dispatch(actLoginSuccess(resData.data.user));
      // console.log("resDAta Amdmin", resData.data.user);
      setLoading(false);
      setCookie("auth", resData.data, { path: "/" });
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
    <div>
      <div className=" z-50">{loading && <Loading />}</div>
      <div
        className=" post-show fixed w-full h-screen opacity-70 bg-transparent z-20 top-0 left-0 flex justify-end items-start "
        style={{ background: "#575757" }}
      ></div>

      <div
        className=" rounded-md shadow-xl bg-white fixed z-40 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ width: "400px", height: "350px" }}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center items-center justify-items-center">
            <p className=" font-avatar text-2xl p-5">Vn-Social</p>
            <div className=" absolute right-0 top-1">
              {/* <i
                className="fas fa-times fa-2x cursor-pointer mr-4 text-gray-300"
                onClick={() => setOpen(false)}
              ></i> */}
            </div>
          </div>
          <div className="flex justify-center items-center justify-items-center mt-5">
            <Formik
              initialValues={initValue}
              validationSchema={adminLogin}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <div className="mt-2  w-72">
                    <Field
                      as={TextField}
                      fullWidth
                      name="adminName"
                      error={!!errors.adminName}
                      type="text"
                      label="Username"
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="adminName">
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
                      error={!!errors.password}
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

                  <FormControlLabel
                    className={classes.label}
                    name="savePasswordAdmin"
                    control={
                      <Checkbox
                        defaultChecked={cookies.rm_pswAdmin ? true : false}
                      />
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Login..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
