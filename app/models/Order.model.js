const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User/Buyer Id is required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "product ID is required"],
    },
  ],
  totalPrice: Number,
  trackingId: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
