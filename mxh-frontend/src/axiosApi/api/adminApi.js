import { axios } from "axios";
import axiosApi from "./../apiFrame/axiosApi";

export const adminApi = {
  signIn(admin) {
    return axiosApi(`auth/admin/login`, `POST`, admin);
  },
  deleteUser(token, userID) {
    return axiosApi(`users/${userID}`, `DELETE`, null, null, token);
  },
  changePassword(token, newPassword) {
    return axiosApi();
  },
  createNewAdmin(token, newPassword) {
    return axiosApi();
  },
  blockUser(token, userId) {
    return axiosApi(`admin/blockUser/${userId}`, `PUT`, null, null, token);
  },
};
