const express = require("express");
const router = express.Router();
const {
  getInventory,
  getSingleProduct,
} = require("../controllers/inventoryControllers");


router.get("/",getInventory );

router.get("/:id", getSingleProduct);

module.exports = router;
