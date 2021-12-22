import React, { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormLabel from "@mui/material/FormLabel";
import { changeInfomation } from "./../../../validation/validation";
import "./../../../css/style.css";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import { useDispatch } from "react-redux";
import { actUpdateUser } from "../../../reducers/authReducer";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { userApi } from "./../../../axiosApi/api/userApi";
import { SkeletonAvatarSideBar } from "./../../../skeletons/Skeletons";
import Loading from "../../LoadingPage/index";
const EditProfile = (props) => {
  const { onClose, open, userData } = props;
  const dispatch = useDispatch();
  const [errDob, setErrDob] = useState(false);
  const [dob, setDob] = useState(userData?.birthday);
  const [cookies, ,] = useCookies(["auth"]);
  const [userInfo, setUserInfo] = useState(null);
  const [skt, setSkt] = useState(true);
  const [loading, setLoading] = useState(false);
  const onChangeDob = (newDob) => {
    setDob(newDob);
    if (new Date().getUTCFullYear() - newDob.getUTCFullYear() < 13) {
      setErrDob(true);
      return;
    }
    setErrDob(false);
    return newDob;
  };
  useEffect(() => {
    if (cookies.auth) {
      setUserInfo({ ...cookies.auth.user });
      const birthday = cookies.auth.user.birthday.toString().split("/");
      setDob(new Date(birthday[1] + "/" + birthday[0] + "/" + birthday[2]));
      // const birthday = moment(dob).format("MM/DD/YYYY")
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (userInfo) setSkt(false);
    }, 1500);
  }, [userInfo]);

  const initValue = {
    fullname: userInfo?.fullname,
    facebook: userInfo?.facebook,
    story: userInfo?.story,
    phone: userInfo?.phone,
    gender: userInfo?.gender,
  };

  const handleSubmitChange = (data, props) => {
    const birthday = moment(dob).format("DD/MM/YYYY");
    if (errDob) {
      setErrDob(true);
      return;
    }
    setUserInfo({
      ...data,
    });
    data.birthday = birthday;
    userApi
      .changeUserProfile(cookies.auth.tokens.access.token, data)
      .then((result) => {
        //Update User Information
        dispatch(actUpdateUser(cookies.auth.tokens.access.token));
        Swal.fire({
          icon: "success",
          title: "Successfully updated Profile !",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // Swal.fire({
        //   icon: "error",
        //   title: error.response.data.message,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        console.log("err", error.response.data.message);
      });
    onClose();
  };
  const handleCancel = (props) => {
    props.resetForm();
    onClose();
  };

  return (
    <div className="">
      {loading && <Loading />}
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <div className="p-5">
          <div className="flex space-x-4 mb-4 ">
            <div className="flex justify-start">
              {skt ? (
                <SkeletonAvatarSideBar />
              ) : (
                <img
                  className="rounded-full h-10 w-10 md:h-16 md:w-16 "
                  src={
                    userData?.image
                      ? userData.image
                      : "/assets/image/defaultAvatar.png"
                  }
                  alt={`profile`}
                />
              )}
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <p className="">
                <span className="text-xl font-avatar">
                  Hi! {userInfo?.fullname ? userInfo?.fullname : null}
                </span>
              </p>
            </div>
          </div>
          <Formik
            initialValues={initValue}
            validationSchema={changeInfomation}
            onSubmit={handleSubmitChange}
          >
            {({ errors, touched, ...props }) => (
              <Form>
                <div className="">
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
                    <Field
                      as={TextField}
                      name="facebook"
                      id="outlined-basic"
                      label="Facebook"
                      variant="outlined"
                      error={errors.facebook}
                      helperText={
                        <ErrorMessage name="facebook">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </div>
                  <div className="customDate">
                    <Field
                      as={TextField}
                      name="phone"
                      id="outlined-basic"
                      label="Phone number"
                      variant="outlined"
                      error={errors.phone}
                      helperText={
                        <ErrorMessage name="phone">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </div>
                  <div className="customDate">
                    <Field
                      as={TextField}
                      name="story"
                      id="outlined-basic"
                      label="Story"
                      variant="outlined"
                      error={errors.story}
                      helperText={
                        <ErrorMessage name="story">
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
                        // value={"08/15/2001"}
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
                      <Field
                        as={RadioGroup}
                        name="gender"
                        row
                        aria-label="gender"
                      >
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
      </Dialog>
    </div>
  );
};
export default EditProfile;
