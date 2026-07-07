const express = require("express");
const router = express.Router();
const {
getProducts,
  addProduct,
  setAddProduct,
  deleteProduct,
  dashboard,
  editProduct,
  setEditProduct,
  viewProduct,
  saleProduct,
} = require("../controllers/adminCRUDController");

const upload = require("../multer/userMulter");

router.get("/products", getProducts);

router.post("/add-product", upload.single("img"), setAddProduct);

router.get("/viewproduct/:id", viewProduct);

router.delete("/deleteproduct/:id", deleteProduct );

router.post("/sale-product/:id", saleProduct);

router.get("/dashboard",dashboard);

router.get("/edit-product/:id",editProduct );
 router.post(
  "/edit-product/:id",
  upload.single("img"),
  setEditProduct
);

module.exports = router;