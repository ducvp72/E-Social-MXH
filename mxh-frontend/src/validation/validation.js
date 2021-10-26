import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
  .required("Không được bỏ trống tên !")
  .min(5, "Tên từ 5 kí tự trở lên !")
  .max(30, "Tên phải dưới 30 kí tự !"),
  namedisplay: yup
    .string()
    .required("Tên người dùng không được bỏ trống !")
    .min(6, "Tên tài khoản tối thiểu 6 kí tự !")
    .max(16, "Tên tài khoản tối đa 16 kí tự !"),
  email: yup.string().email().required("Trường email không được bỏ trống !"),
  phone: yup
    .string()
    .required("Số điện thoại đang trống !")
    .matches(phoneRegExp, "Số điện thoại không đúng định dạng !"),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male", "other"], "Giới tính chưa được chọn !"),
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