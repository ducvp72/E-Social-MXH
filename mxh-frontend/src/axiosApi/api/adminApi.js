import axiosApi from "./../apiFrame/axiosApi";

export const adminApi = {
  signIn(admin) {
    return axiosApi(`auth/admin/login`, `POST`, admin);
  },
  deleteUser(token, userID) {
    return axiosApi(`users/${userID}`, `DELETE`, null, null, token);
  },
  adminchangePassword(token, newPassword) {
    return axiosApi(
      `auth/admin/change-password`,
      `PUT`,
      newPassword,
      null,
      token
    );
  },
  createNewAdmin(token, newPassword) {
    return axiosApi();
  },
  blockUser(token, userId) {
    return axiosApi(`admin/blockUser/${userId}`, `PUT`, null, null, token);
  },
  getAllPost(token) {
    return axiosApi(`post`, `GET`, null, null, token);
  },
  deletePost(token, idPost) {
    return axiosApi(`admin/post`, `DELETE`, idPost, null, token);
  },
};
