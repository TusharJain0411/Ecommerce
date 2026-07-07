const Order = require("../models/Order");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Cart =require("../models/cart");
const Inventory =require("../models/inventory");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      totalPrice,
      address,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment",
      });
    }

    const totalQty = products.reduce((sum, item) => sum + item.quantity, 0);
  

  
  

    const order = await Order.create({
      user: req.user.id,

      items: products.map((item) => ({
        productId: item.product._id,
        title: item.product.title,
        price: Number(item.product.price),
        quantity: item.quantity,
        img: item.product.img,
      })),

      totalQty,
      totalPrice,

      paymentInfo: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },

      paymentStatus: "paid",
    });

    for (const item of products) {
      await Inventory.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        { new: true },
      );
    }

    await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          items: [],
        },
      },
    );

    res.status(200).json({
      success: true,
      message: "Payment Successful",
      order,
    });
  } catch (err) {

   
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports={createOrder,verifyPayment};