const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {getLogin,getVerifyToken,Profile,register,logout,updateProfile}=require("../controllers/userController");
const upload = require("../multer/userMulter");
const{verifyToken}=require("../middlewares/verifytoken");


router.post("/login", getLogin);

router.get("/verify-token", verifyToken, getVerifyToken);

router.get("/profile", verifyToken, Profile);

router.post("/register", upload.single("userprofile"), register);

router.post("/logout", verifyToken, logout);

router.put("/profile",verifyToken,upload.single("userprofile"), updateProfile,
);

module.exports = router;
