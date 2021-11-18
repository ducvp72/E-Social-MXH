import { axios } from "axios";
import axiosApi from "./../apiFrame/axiosApi";

export const adminApi = {
  deleteUser(token, userID) {
    return axiosApi(`users/${userID}`, `DELETE`, null, null, token);
  },
};
