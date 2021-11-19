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
import { adminLogin } from "./../../validation/validation";
import { adminApi } from "./../../axiosApi/api/adminApi";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { actLoginSuccess } from "../../reducers/authReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import Loading from "./../../containers/LoadingPage/index";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "20px",
    color: "#f70714",
    fontWeight: "700",
  },
}));
const LoginToContinute = (props) => {
  const [hidden, setHidden] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "rm_psw"]);
  const [loading, setLoading] = useState(false);
  const initValue = cookies.rm_psw || { email: "", password: "" };
  const history = useHistory();
  const [isSave, setIsSave] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = "overflow-hidden";
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    console.log("data admin", data);
    if (isSave) setCookie("rm_psw", data);
    else removeCookie("rm_psw");
    try {
      const resData = await adminApi.signIn(data);
      dispatch(actLoginSuccess(resData.data.user));
      setLoading(false);
      setCookie("auth", resData.data, { path: "/" });
      // if (resData.data.user.role === "user") {
      //   history.replace("/user/home");
      // } else {
      history.replace("/admin");
      // }
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
      {loading && <Loading />}
      <div
        className=" post-show fixed w-full h-screen opacity-70 bg-transparent z-40 top-0 left-0 flex justify-end items-start "
        style={{ background: "#575757" }}
      ></div>

      <div
        className=" rounded-md shadow-xl bg-white fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
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
              initialValues={{
                adminName: "",
                password: "",
              }}
              // validationSchema={adminLogin}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <div className="mt-2 mb-10 w-72 h-24">
                    <Field
                      as={TextField}
                      fullWidth
                      name="adminName"
                      error={errors.adminName}
                      type="text"
                      id="outlined-basic"
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

                  <FormControlLabel
                    className={classes.label}
                    name="savePassword"
                    control={
                      <Checkbox
                        defaultChecked={cookies.rm_psw ? true : false}
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
                    sx={{ mt: 3, mb: 2 }}
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

export default LoginToContinute;
