import API from "./api";

export const LoginUser = (data) => {
  return API.post(`/project1/auth/login`, data);
};

export const verifyUserToken = (token) => {
  return API.get(`/project1/auth/verify-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = (token) => {
  return API.get(`/project1/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = (token) => {
  return API.post(
    "/project1/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateProfile = (token, formData) => {
  return API.put("/project1/auth/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
