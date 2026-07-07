import API from "./api";

const BASE_URL = "/project1/wishlist";

const token = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${token()}`,
  },
});

export const getWishlist = () => {
  return API.get(BASE_URL, config());
};

export const addWishlist = (productId) => {
  return API.post(`${BASE_URL}/add`, { productId }, config());
};

export const removeWishlist = (productId) => {
  return API.delete(`${BASE_URL}/remove`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    data: {
      productId,
    },
  });
};
