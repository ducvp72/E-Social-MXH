import React from "react";
import axiosApi from "./../apiFrame/axiosApi";

export const postApi = {
  createPost() {
    return axiosApi(`post/create-post-image`);
  },
  getUserPost(userID) {
    return axiosApi(`post?owner=${userID}`);
  },
};
