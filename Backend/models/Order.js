const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      img: String,
    }
  ],

  totalQty: Number,
  totalPrice: Number,

  paymentInfo: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "paid",
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);