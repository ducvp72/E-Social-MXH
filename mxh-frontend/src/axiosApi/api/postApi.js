import React from "react";
import axiosApi from "./../apiFrame/axiosApi";

export const postApi = {
  createPost() {
    return axiosApi(`post/create-post-image`);
  },
  getUserPost(userID, page, limit) {
    return axiosApi(`post?owner=${userID}&page=${page}&limit=${limit}`);
  },
  getUserPostTest(userID) {
    return axiosApi(`post?owner=${userID}`);
  },
};
