const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  getLogin,
  getVerifyToken,
  Profile,
  register,
  logout,
  getAllAdmins,
  deleteAdmin,
  updateAdmin
} = require("../controllers/adminController");
const upload = require("../multer/userMulter");
const { verifyAdminToken } = require("../middlewares/verifytoken");

router.post("/login", getLogin);

router.get("/verify-token", verifyAdminToken, getVerifyToken);

router.get("/profile", verifyAdminToken, Profile);

router.post("/register", upload.single("userprofile"), register);

router.post("/logout", verifyAdminToken, logout);

router.get("/admin-list", verifyAdminToken, getAllAdmins);

router.delete("/delete-admin/:id", verifyAdminToken, deleteAdmin);

router.put("/update-admin/:id",verifyAdminToken,upload.single("userprofile"),updateAdmin);

module.exports = router;
