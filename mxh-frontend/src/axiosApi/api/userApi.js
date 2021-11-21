import axiosApi from "../apiFrame/axiosApi";

export const userApi = {
  verifyEmail(token) {
    return axiosApi(`auth/send-verification-email`, `POST`, null, null, token);
  },
  confirmMail(token) {
    return axiosApi(`auth/verify-email`, `POST`, null, token, null);
  },
  refreshToken(token) {
    return axiosApi(`auth/refresh-token`, `POST`, token);
  },
  forgotPassword(email) {
    return axiosApi(`auth/forgot-password`, `POST`, email);
  },
  recoverPassword(token, Password) {
    return axiosApi(`auth/reset-password`, `POST`, Password, token, null);
  },
  checkUserAuth(token) {
    return axiosApi(`auth/reset-password`, `POST`, null, null, token);
  },
  signIn(user) {
    return axiosApi(`auth/login`, `POST`, user);
  },
  signUp(data) {
    return axiosApi(`auth/register`, `POST`, {
      fullname: data.fullname,
      birthday: data.birthday,
      gender: data.gender,
      email: data.email,
      password: data.password,
    });
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
    return axiosApi(`profile/change-profile`, `PUT`, userProfile, null, token);
  },
  getAuthentication(token) {
    return axiosApi(`auth/check-token`, `POST`, null, null, token);
  },
  userchangePassword(token, newPassword) {
    return axiosApi(`profile/change-password`, `PUT`, newPassword, null, token);
  },
  userRefreshApi(token) {
    return axiosApi(`auth/refresh-tokens`, `POST`, token);
  },
  getUserSummary(userID) {
    return axiosApi(`profile/get-summary/${userID}`, `GET`);
  },
  getUserEmail(userEmail) {
    return axiosApi(`find?email=${userEmail}`, `GET`);
  },
  getUserNameSearch(token, userfullname) {
    return axiosApi(`find?fullname=${userfullname}`, `GET`, null, null, token);
  },
  getUserNameSearchTest(userfullname) {
    return axiosApi(`find/user?fullname=${userfullname}`, `GET`);
  },
  getUserName(token, userfullname, page, limit) {
    return axiosApi(
      `find?fullname=${userfullname}&page=${page}&limit=${limit}`,
      `GET`,
      null,
      null,
      token
    );
  },
  getAllUser() {
    return axiosApi(`find`, `GET`);
  },
  userFollow(token, userId) {
    console.log("abf");
    return axiosApi(`follow`, `PUT`, { followingId: userId }, null, token);
  },
};
