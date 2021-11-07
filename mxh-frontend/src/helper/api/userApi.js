import axiosApi from "../apiFrame/axiosApi";

export const userApi = {
  signIn(user) {
    return axiosApi(`auth/login`, `POST`, user);
  },
  logOut(refreshToken) {
    return axiosApi(`auth/logout`, `POST`, refreshToken);
  },
  getUserById(userID) {
    return axiosApi(`profile/${userID}`, `GET`, userID);
  },
  changeUserAvatar(token, formData) {
    return axiosApi(`profile/changeAvatar`, `PUT`, formData, null, token);
  },
  changeUserProfile(token, userProfile) {
    console.log("token", token);
    console.log("usser", userProfile);
    return axiosApi(`profile/change-profile`, `PUT`, userProfile, null, token);
  },
  getAuthentication(token) {
    return axiosApi(`auth/check-token`, `POST`, null, null, token);
  },
  userchangePassword(token, newPassword) {
    return axiosApi(`profile/change-password`, `PUT`, newPassword, null, token);
  },
};
