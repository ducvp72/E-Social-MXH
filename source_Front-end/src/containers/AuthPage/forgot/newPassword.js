import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { recoverPassword } from "./../../../validation/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { userApi } from "./../../../axiosApi/api/userApi";
import Swal from "sweetalert2";
import Loading from "../../LoadingPage";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Vni-Social
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const theme = createTheme();

export const NewPassword = () => {
  const [query] = useState(new URLSearchParams(useLocation().search));
  const [hidden, setHidden] = useState({ password: false, confirm: false });
  const [showEye, setShowEye] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (data, props) => {
    setLoading(true);
    try {
      const tokens = query.get("token");
      // const value = {
      //   password: data.password,
      //   token,
      // };
      // await recoverPass(value);
      console.log("token parrams", tokens);
      console.log("password", data.password);
      await userApi.recoverPassword(
        { token: tokens },
        { password: data.password }
      );
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Your account was recovered ",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: error.data.response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const init = {
    password: "",
    confirm: "",
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loading />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5" color="error">
            Recover your password
          </Typography>
          <Box
            // component="form"
            // noValidate
            sx={{ mt: 1 }}
          >
            <Formik
              initialValues={init}
              validationSchema={recoverPassword}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
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

                  <div className="mt-2"></div>
                  <Field
                    as={TextField}
                    fullWidth
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Submiting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
