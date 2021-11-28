import React from "react";
import axiosApi from "./../apiFrame/axiosApi";

export const postApi = {
  createPost(token, data) {
    return axiosApi(`post/create-post-file`, `POST`, data, null, token);
  },
  getAllPost() {
    return axiosApi(`post`, `GET`);
  },
  getMyPost(token, page, limit) {
    return axiosApi(
      `post/get-my-post?page=${page}&limit=${limit}
      &sortBy=createdAt:desc`,
      `GET`,
      null,
      null,
      token
    );
  },
  likePost(token, id) {
    return axiosApi(`post/like`, `PUT`, id, null, token);
  },
  getUserPost(userID, page, limit) {
    return axiosApi(`post?owner=${userID}&page=${page}&limit=${limit}`);
  },
  getUserPostTest(userID) {
    return axiosApi(`post?owner=${userID}`);
  },
  getTwoComments(postId) {
    return axiosApi(
      `comment?postId=${postId}&limit=${2}&sortBy=createdAt:desc`,
      `Get`
    );
  },
  userComment(token, data) {
    return axiosApi(`post/comment`, `PUT`, data, null, token);
  },
};
