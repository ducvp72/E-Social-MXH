import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UseStyles from "./style";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changePassword } from "./../../../validation/validation";
import "./../../../css/style.css";
import EditProfile from "./editProfile";
import { useCookies } from "react-cookie";
import { actUpdateUser } from "../../../reducers/authReducer";
import SuccessAlert from "./../../../components/alert/successAlert";
import Swal from "sweetalert2";
import { userApi } from "./../../../axiosApi/api/userApi";
import { SkeletonAvatarSideBar } from "./../../../skeletons/Skeletons";
import Loading from "../../LoadingPage/index";
function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className="w-full p-4"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Account = () => {
  const classNamees = UseStyles();
  const [value, setValue] = React.useState(0);
  const currentUser = useSelector((state) => state.auth.data);
  const [edit, setEdit] = useState(false);
  const [dob, setDob] = useState(new Date(currentUser?.birthday));
  const hiddenFileInput = React.useRef(null);
  const [alert, showAlert] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["tokens"]);
  const [cookies, ,] = useCookies("auth");
  const [skt, setSkt] = useState(true);
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState(
    `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
  );
  const [selectedImage, setSelectedImage] = useState(null);
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

  const [loading, setLoading] = useState(false);

  // let { userName } = useParams();
  useEffect(() => {
    if (currentUser) {
      const birthday = currentUser.birthday.toString().split("/");
      setDob(birthday[1] + "/" + birthday[0] + "/" + birthday[2]);
      setUserImage(
        `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
      );
    }
    // return () => {
    //   userImage && URL.revokeObjectURL(userImage);
    // };
  }, [currentUser]);

  useEffect(() => {
    if (currentUser)
      setTimeout(() => {
        setSkt(false);
      }, 1500);
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = (props) => {
    props.resetForm();
  };
  const onClose = () => {
    setEdit(false);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const imageFileHandler = (event) => {
    setSelectedImage(event.target.files[0]);
    if (selectedImage?.length !== 0)
      setUserImage(URL.createObjectURL(event.target.files[0]));
  };

  const changeAvatar = () => {
    console.log("file dc chon", selectedImage);
    let frmData = new FormData();
    frmData.append("file", selectedImage);
    // frmData.append("name", "userUpfile");
    console.log("frmData", frmData);
    setLoading(true);
    userApi
      .changeUserAvatar(cookies.auth.tokens.access.token, frmData)
      .then((result) => {
        //Update User Avatar
        dispatch(actUpdateUser(cookies.auth.tokens.access.token));
        showAlert(true);
        setTimeout(() => {
          showAlert(false);
        }, 1000);
        setSelectedImage(false);
        Swal.fire({
          icon: "success",
          title: "Your avatar upadated !",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      });
  };

  const handleChangePassword = async (data, props) => {
    console.log(data);
    console.log("token there", cookies.auth.tokens.access.token);

    setTimeout(() => {
      props.setSubmitting(false);
    }, 2000);
    try {
      await userApi.userchangePassword(cookies.auth.tokens.access.token, {
        oldPassword: data.oldpassword,
        password: data.password,
      });
      Swal.fire({
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      props.resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Setting Account</title>
        <meta name="descr--iption" content="Helmet application" />
      </Helmet>
      <EditProfile
        userData={{ ...currentUser, image: userImage }}
        open={edit}
        onClose={onClose}
        dobUser={dob}
      />
      {alert && <SuccessAlert />}
      {loading && <Loading />}
      <div
        className=" absolute left-1/2 transform -translate-x-1/2  shadow-md border-2 w-2/3"
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            color="secondary"
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classNamees.tab}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
            <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <div className="pl-16 flex space-x-4 mb-4">
              <div className="flex space-x-4 mb-4 ">
                <div className="flex justify-start">
                  {skt ? (
                    <SkeletonAvatarSideBar />
                  ) : (
                    <img
                      className="rounded-full h-10 w-10 md:h-16 md:w-16 "
                      src={
                        userImage
                          ? userImage
                          : `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                          ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                          : "/assets/image/defaultAvatar.png"
                      }
                      alt={`profile`}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <p className="">
                    <span className="text-xl font-avatar">
                      Hi! {currentUser ? currentUser.fullname : null}
                    </span>
                  </p>
                  <div className=" relative flex">
                    <button
                      onClick={handleClick}
                      className=" mr-2 cursor-pointer border-2 border-gray-400 bg-white p-1 rounded-md text-gray-400 font-medium"
                    >
                      Upload a file
                    </button>
                    <input
                      className=" hidden cursor-pointer left-0 top-1  font-medium absolute text-blue-500 text-sm "
                      type="file"
                      accept="image/*"
                      onChange={imageFileHandler}
                      ref={hiddenFileInput}
                    />
                    {selectedImage && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => changeAvatar()}
                      >
                        Save
                      </Button>
                    )}
                    {selectedImage && (
                      <div className="ml-2">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setSelectedImage(!selectedImage);
                            setUserImage(
                              `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                            );
                          }}
                        >
                          Cancle
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <form className="w-full">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Full Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="text"
                      value={currentUser?.fullname}
                      name="fullname"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Facebook
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="text"
                      value={currentUser?.facebook}
                      name="facebook"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Phone number
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="text"
                      value={currentUser?.phone}
                      name="phone"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Story
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none w-full border-2  border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="text"
                      value={currentUser?.story}
                      name="story"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Date of birth
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="text"
                      value={currentUser?.birthday}
                      name="phone"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      for="inline-password"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="gender"
                        value={currentUser?.gender.toString()}
                        name="gender"
                        disabled
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                          disabled
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                          disabled
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                          disabled
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-2 mt-2">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => setEdit(!edit)}
                  >
                    Edit
                  </Button>
                </div>
              </form>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
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
                        // id="outlined-basic"
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
                        // id="outlined-basic"
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
                        id="outlined-basic"
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
                  <div className="flex justify-end mt-4">
                    <p className=" font-medium text-blue-500 cursor-pointer">
                      Quên mật khẩu?
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Account;
