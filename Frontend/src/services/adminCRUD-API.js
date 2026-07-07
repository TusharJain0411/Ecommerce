import API from "./api";

export const addProductAPI = (data) => {
  return API.post(
    "/project1/admincrud/add-product",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const dashboardAPI = (data) => {
  return API.get(`/project1/admincrud/dashboard`, data);
};

export const getSingleProduct = (id) => {
  return API.get(
    `/project1/admincrud/viewproduct/${id}`,
  );
};

export const deleteProduct = (id) => {
  return API.delete(
    `/project1/admincrud/deleteproduct/${id}`,
  );
};

export const updateProduct = (id, data) => {
  return API.post(
    `/project1/admincrud/edit-product/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
