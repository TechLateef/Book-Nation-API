const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    required: [true, "User/Buyer Id is required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "product ID is required"],
    },
  ],
  totalPrice: Number,
  trackingId: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
