import React from "react";
import axiosApi from "./../apiFrame/axiosApi";
import axiosFrmMulti from "./../apiFrame/axiosFrmMulti";

export const postApi = {
  createPost(token, data) {
    return axiosApi(`post/create-post-file`, `POST`, data, null, token);
  },
  getAllPost() {
    return axiosApi(`post`, `GET`);
  },
  getUserPost(userID, page, limit) {
    return axiosApi(`post?owner=${userID}&page=${page}&limit=${limit}`);
  },

  getUserPostTest(userID) {
    return axiosApi(`post?owner=${userID}`);
  },
};
