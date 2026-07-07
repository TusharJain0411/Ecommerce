const Cart = require("../models/cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart)
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    item.quantity = quantity;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart)
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports={getCart,addToCart,updateQuantity,removeItem,clearCart};