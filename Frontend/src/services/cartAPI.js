import API from "./api";



export const getCart = (token) =>
  API.get("/project1/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addCart = (productId, token) =>
  API.post(
    "/project1/cart/add",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const updateCartQty = (productId, quantity, token) =>
  API.put(
    "/project1/cart/update",
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const removeCartItem = (productId, token) =>
  API.delete(`/project1/cart/remove/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const clearCartAPI = (token) =>
  API.delete("/cart/clear", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });