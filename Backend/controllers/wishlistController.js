const Wishlist = require("../models/wishlist");



const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const exist = await Wishlist.findOne({ userId, productId });

    if (exist) {
      const wishlist = await Wishlist.find({ userId }).populate("productId");

      return res.json({
        success: true,
        message: "Already in wishlist",
        wishlist,
      });
    }

    await Wishlist.create({
      userId,
      productId,
    });

    const wishlist = await Wishlist.find({ userId }).populate("productId");

    return res.json({
      success: true,
      message: "Added to wishlist",
      wishlist
    });
  } catch (err) {
    console.error(err); 
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.json({
      success: true,
      wishlist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await Wishlist.findOneAndDelete({
      userId,
      productId,
    });

    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.json({
      success: true,
      message: "Removed",
      wishlist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {addWishlist,getWishlist,removeWishlist};
