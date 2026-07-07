const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");

const {
  getUserOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/orderController");


router.get("/", verifyToken, getUserOrders);


router.get("/:id", verifyToken, getSingleOrder);


router.post("/", verifyToken, createOrder);


router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;
