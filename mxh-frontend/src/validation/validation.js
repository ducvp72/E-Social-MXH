import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const phoneRegExpVn = /(+84|84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const allCountryRegex =
  /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;
const fb =
  /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
export const userSignUpSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Không được bỏ trống tên !")
    .min(5, "Tên từ 5 kí tự trở lên !")
    .max(30, "Tên phải dưới 30 kí tự !"),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male", "other"], "Giới tính chưa được chọn !"),
  email: yup.string().email().required("Trường email không được bỏ trống !"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu phải từ 8 kí tự trở lên, bao gồm ít nhất 1 chữ hoa và 1 chữ thường"
    ),
  confirm: yup
    .string()
    .required("Hãy xác nhận mật khẩu !")
    .matches()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp !"),
});

export const userforgotPassword = yup.object().shape({
  email: yup.string().email().required("Trường email không được bỏ trống !"),
});

export const userLogin = yup.object().shape({
  email: yup.string().email().required("Trường email không được bỏ trống !"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu phải từ 8 kí tự trở lên, bao gồm ít nhất 1 chữ hoa và 1 chữ thường"
    ),
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
  phone: yup.string().matches(phoneRegExp, "Number invalid"),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male", "other"], "Gender was not selected !"),
});

export const changePassword = yup.object().shape({
  oldpassword: yup
    .string()
    .required("Mật khẩu không được bỏ trống !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu phải từ 8 kí tự trở lên, bao gồm ít nhất 1 chữ hoa và 1 chữ thường"
    ),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu phải từ 8 kí tự trở lên, bao gồm ít nhất 1 chữ hoa và 1 chữ thường"
    ),
  confirm: yup
    .string()
    .required("Hãy xác nhận mật khẩu !")
    .matches()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp !"),
});

export const recoverPassword = yup.object().shape({
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu phải từ 8 kí tự trở lên, bao gồm ít nhất 1 chữ hoa và 1 chữ thường"
    ),
  confirm: yup
    .string()
    .required("Hãy xác nhận mật khẩu !")
    .matches()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp !"),
});
