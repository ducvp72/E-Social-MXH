import axiosApi from "./../apiFrame/axiosApi";
import axiosFrmMulti from "./../apiFrame/axiosFrmMulti";
export const chatApi = {
  createMessText(token, idConver, text) {
    return axiosApi(
      `message`,
      `POST`,
      { conversationId: idConver, text: text },
      null,
      token
    );
  },

  createMessMedia(token, data, call) {
    return axiosFrmMulti(`message/media`, `POST`, data, null, token, call);
  },

  getMessByIdConver(token, idConver) {
    return axiosApi(
      `message/${idConver}?sortBy=createdAt`,
      `GET`,
      null,
      null,
      token
    );
  },

  // getMessByIdConver(token, idConver, page, limit) {
  //   return axiosApi(
  //     `message/${idConver}?page=${page}&limit=${limit}&sortBy=createdAt:desc`,
  //     `GET`,
  //     null,
  //     null,
  //     token
  //   );
  // },

  createConver(token, idUser) {
    return axiosApi(
      `conversation/private`,
      `POST`,
      { userId: idUser },
      null,
      token
    );
  },

  getConverByToken(token, page, limit) {
    return axiosApi(
      `conversation?page=${page}&limit=${limit}&sortBy=updatedAt:desc`,
      `GET`,
      null,
      null,
      token
    );
  },

  //Same as "getMessByIdCover"
  getMessPrivate(token, idUser, page, limit) {
    return axiosApi(
      `message/private&page=${page}&limit=${limit}`,
      `GET`,
      { userId: idUser },
      null,
      token
    );
  },

  likeMess(token, idConver) {
    return axiosApi(`message/like/${idConver}`, "POST", null, null, token);
  },
  loveMess(token, idConver) {
    return axiosApi(`message/love/${idConver}`, "POST", null, null, token);
  },

  recallMess(token, idConver, idMess) {
    return axiosApi(
      `message`,
      "PUT",
      { conversationId: idConver, messageId: idMess },
      null,
      token
    );
  },
};
