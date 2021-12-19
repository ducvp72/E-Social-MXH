import React from "react";
import axiosApi from "./../apiFrame/axiosApi";
import axiosFrmMulti from "./../apiFrame/axiosFrmMulti";

export const postApi = {
  createPost(token, data, call) {
    return axiosFrmMulti(
      `post/create-post-file`,
      `POST`,
      data,
      null,
      token,
      call
    );
  },
  createPostTest(token, data, call) {
    return axiosFrmMulti(
      `post/create-post-text`,
      `POST`,
      data,
      null,
      token,
      call
    );
  },
  getAllPost() {
    return axiosApi(`post`, `GET`);
  },
  getMyPost(token, page, limit) {
    return axiosApi(
      `post/get-my-post?page=${page}&limit=${limit}&sortBy=createdAt:desc`,
      `GET`,
      null,
      null,
      token
    );
  },
  deleteMyPost(token, data) {
    return axiosApi(`post`, `DELETE`, data, null, token);
  },
  likePost(token, id) {
    return axiosApi(`post/like`, `PUT`, id, null, token);
  },
  getUserPost(token, userID, page, limit) {
    return axiosApi(
      `post?owner=${userID}&page=${page}&limit=${limit}&sortBy=createdAt:desc`,
      `GET`,
      null,
      null,
      token
    );
  },
  getUserPostTest(userID) {
    return axiosApi(`post?owner=${userID}`);
  },
  getAllComments(postId, page, limit) {
    return axiosApi(
      `comment?postId=${postId}&page=${page}&limit=${limit}&sortBy=createdAt:desc`,
      `GET`
    );
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
  getMyNotification(token, page, limit) {
    return axiosApi(
      `notification?page=${page}&limit=${limit}&sortBy=createdAt:desc`,
      "GET",
      null,
      null,
      token
    );
  },
  deleteAllNotify(token) {
    return axiosApi(`notification`, "DELETE", null, null, token);
  },
  updateTextPost(token, postId, text) {
    return axiosApi(
      `post`,
      "PUT",
      {
        postId,
        text,
      },
      null,
      token
    );
  },
};
