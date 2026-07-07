import API from "./api";

export const LoginAdmin = (data) => {
  return API.post(
    `/project1/admin/login`,
    data,
  );
};

export const verifyAdminToken = (token) => {
  return API.get(`/project1/admin/verify-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = (token) => {
  return API.get("/project1/admin/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutAmin = (token) => {
  return API.post(
    "/project1/admin/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAdminList = (token) => {
  return API.get("/project1/admin/admin-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerAdmin = (formData) => {
  return API.post("/project1/admin/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAdmin = (id, token) => {
  return API.delete(
    `/project1/admin/delete-admin/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateAdmin = (id, formData, token) => {
  return API.put(
    `/project1/admin/update-admin/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
