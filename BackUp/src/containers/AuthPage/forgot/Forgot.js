import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { userforgotPassword } from "./../../../validation/validation";
import { TextField } from "@mui/material";
import "./styles.css";
import { userApi } from "./../../../axiosApi/api/userApi";
import Swal from "sweetalert2";
import Loading from "./../../LoadingPage/index";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const onhandleSubmit = async (data) => {
    setLoading(true);
    try {
      await userApi.forgotPassword(data);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Verify code in your Email !",
        showConfirmButton: false,
        timer: 1500,
      });
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

  return (
    <div className="container">
      <Helmet>
        <title>Forgot password</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {loading && <Loading />}
      <Formik
        validationSchema={userforgotPassword}
        initialValues={{ email: "" }}
        onSubmit={onhandleSubmit}
      >
        {({ errors, touched, ...props }) => (
          <Form className="py-16 flex flex-col justify-center items-center">
            <img
              src="/assets/access/Forgotpassword.svg"
              alt="forgot"
              className="w-32 hover:scale-150 transition-all duration-500 transform mx-auto"
            />
            <h2 className="py-9 font-display font-bold text-2xl text-gray-700 text-center ">
              Are you forgot password? Don't worry !
            </h2>
            <div className="customDate w-5/12">
              <Field
                as={TextField}
                name="email"
                placeholder="Example@gmail.com"
                id="outlined-basic"
                label="email"
                variant="outlined"
                error={errors.email}
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
              />
            </div>
            <button
              type="submit"
              href="#"
              className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? "Verifying your Email..." : "Confirm"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forgot;
