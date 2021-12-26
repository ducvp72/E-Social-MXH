import * as yup from "yup";
const phoneRegExp =
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const fb =
  /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
export const userSignUpSchema = yup.object().shape({
  fullname: yup
    .string()
    .required()
    .min(5, "over 5 characters")
    .max(30, "under 30 characters"),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male", "other"], "required !"),
  email: yup.string().email().required("required !"),
  password: yup
    .string()
    .required("required !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
    ),
  confirm: yup
    .string()
    .required()
    .matches()
    .oneOf([yup.ref("password"), null], "Password does not match !"),
});

export const userforgotPassword = yup.object().shape({
  email: yup.string().email().required("required !"),
});

export const userLogin = yup.object().shape({
  email: yup.string().email().required("Required !"),
  password: yup
    .string()
    .required("Password required !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
    ),
});

export const adminLogin = yup.object().shape({
  adminName: yup.string().min(5, "over 5 characters !").required(),
  password: yup.string().required().min(5, "over 5 characters !"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  //   "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
  // ),
});

export const changeInfomation = yup.object().shape({
  fullname: yup
    .string()
    .required("Not null")
    .min(5, "over 5 characters !")
    .max(30, "under 30 character!"),
  facebook: yup
    .string()
    .matches(fb, "Facebook likely https://www.facebook.com/page/"),
  story: yup.string().min(0).max(150, "under 150 characters !"),
  // phone: yup.string().matches(phoneRegExp, "Number invalid"),
  phone: yup.string().min(10, "Number invalid"),
  // .matches(phoneRegExp, "Number invalid")

  gender: yup
    .string()
    .required()
    .oneOf(["female", "male", "other"], "Gender was not selected !"),
});

export const changePassword = yup.object().shape({
  oldpassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
    ),
  confirm: yup
    .string()
    .required("Hãy xác nhận mật khẩu !")
    .matches()
    .oneOf([yup.ref("password"), null], "Password does not match !"),
});

export const recoverPassword = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must more than 8 characters, included at least 1 Upcase and 1 Lowcase"
    ),
  confirm: yup
    .string()
    .required("Hãy xác nhận mật khẩu !")
    .matches()
    .oneOf([yup.ref("password"), null], "Password does not match !"),
});
