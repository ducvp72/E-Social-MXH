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

  getMessByIdConver(token, idConver, page, limit) {
    return axiosApi(
      `message/${idConver}&page=${page}&limit=${limit}`,
      `GET`,
      null,
      null,
      token
    );
  },

  createConver(token, idUser) {
    return axiosApi(
      `conversation/create-private`,
      `POST`,
      { userId: idUser },
      null,
      token
    );
  },

  getConverByToken(token, page, limit) {
    return axiosApi(
      `conversation&page=${page}&limit=${limit}`,
      `GET`,
      null,
      null,
      token
    );
  },

  //   getConverByToken(token) {
  //     return axiosApi(`conversation`, `GET`, null, null, token);
  //   },

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
};
