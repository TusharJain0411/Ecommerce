import API from "./api";

export const getAllOrders = async (token) => {
  return API.get("/project1/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
