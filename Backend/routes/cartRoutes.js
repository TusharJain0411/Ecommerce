const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.get("/", verifyToken, getCart);

router.post("/add", verifyToken, addToCart);

router.put("/update", verifyToken, updateQuantity);

router.delete("/remove/:productId", verifyToken, removeItem);

router.delete("/clear", verifyToken, clearCart);

module.exports = router;
