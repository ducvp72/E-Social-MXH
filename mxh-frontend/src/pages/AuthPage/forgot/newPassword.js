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
import { recoverPass } from "../../../context/actions/register";
import { useHistory, useLocation } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showEyes, setShowEyes] = useState(false);

  // useEffect(() => {
  //   const token = query.get("token");
  //   if (token) {
      
  //   }
  // }, [query]);

  const verifying = (veryf) => {
    setTimeout(() => {
      veryf.resetForm();
      veryf.setSubmitting(false);
    }, 2000);
  };

  const handleSubmit = async (data, props) => {
    try {
      const token = query.get("token");
      const value = {
        password:data.password,
        token
      }
      console.log(token);
      await recoverPass(value);
    } catch (err) {
      console.log(err);
    }
  };

  const init = {
    password: "",
    confirm: "",
  };

  return (
    <ThemeProvider theme={theme}>
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
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                              {showPassword ? (
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

                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    name="confirm"
                    label="Confirm password"
                    type="password"
                    id="confirm"
                    autoComplete="current-password"
                    error={errors.confirm}
                    helperText={
                      <ErrorMessage name="confirm">
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
                              {showPassword ? (
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
