const Inventory = require("../models/inventory");

const getInventory = async (req, res) => {
  try {
    const products = await Inventory.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getSingleProduct = async (req, res) => {
  try {
    const product = await Inventory.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  getSingleProduct,
};

