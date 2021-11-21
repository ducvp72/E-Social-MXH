import axiosInstance from "./../../axiosApi/apiFrame/axiosClient";

export const register = (obj) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/register", {
        fullname: obj.fullname,
        birthday: obj.birthday,
        gender: obj.gender,
        email: obj.email,
        password: obj.password,
      })
      .then((res) => {
        console.log("User Status", res.data);
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const login = (obj) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/login", {
        email: obj.email,
        password: obj.password,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

export const verifyEmail = (obj) => {
  new Promise((resolve, reject) => {
    console.log("Axios", obj.token);
    const config = {
      headers: {
        Authorization: `Bearer ${obj.token}`,
      },
    };

    axiosInstance
      .post("/auth/send-verification-email", null, config)
      .then((res) => {
        console.log("Send mail successfully !!!", res);
        return true;
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        console.log("err", err.response.status);
        return false;
      });
  });
};

export const refresh = (obj) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/refresh-tokens", {
        refreshToken: obj,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const confirmMail = (obj) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/verify-email", null, {
        params: { token: obj },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const LogOut = async (obj) => {
  return axiosInstance.post("/auth/logout", {
    refreshToken: obj,
  });
};

export const forgotPassword = (obj) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post("/auth/forgot-password", {
        email: obj.email,
      })
      .then((res) => {
        console.log(obj.email);
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const recoverPass = ({ token, password }) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        "/auth/reset-password",
        {
          password: password,
        },
        { params: { token } }
      )
      .then((res) => {
        console.log(password);
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const checkAuth = (obj) => {
  new Promise((resolve, reject) => {
    console.log("Axios", obj.token);
    const config = {
      headers: {
        Authorization: `Bearer ${obj.token}`,
      },
    };

    axiosInstance
      .post("/auth/check-auth", null, config)
      .then((res) => {
        console.log("Login ok:", res);
        return true;
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        console.log("err", err.response.status);
        return false;
      });
  });
};
