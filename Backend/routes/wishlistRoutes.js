const router = require("express").Router();
const {verifyToken} = require("../middlewares/verifytoken");
const {addWishlist,getWishlist,removeWishlist}=require("../controllers/wishlistController") 



router.post("/add", verifyToken, addWishlist);

router.get("/", verifyToken, getWishlist);

router.delete("/remove", verifyToken, removeWishlist);


module.exports = router;
