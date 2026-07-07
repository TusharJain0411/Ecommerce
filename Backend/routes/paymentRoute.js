const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

router.post("/create-order", verifyToken, createOrder);

router.post("/verify-payment", verifyToken, verifyPayment);

module.exports = router;
