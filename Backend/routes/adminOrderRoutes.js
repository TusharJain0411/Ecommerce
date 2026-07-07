const express = require("express");
const router = express.Router();

const { verifyAdminToken } = require("../middlewares/verifytoken");
const { getAllOrders } = require("../controllers/adminOrderController");

router.get("/", verifyAdminToken, getAllOrders);

module.exports = router;
